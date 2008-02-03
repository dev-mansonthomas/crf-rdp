/* ===================== Exception def ============================== */


function ParseDateException(input, expectedFormat, extraInformation) 
{
  this.input = input;
  this.expectedFormat= expectedFormat;
  this.extraInformation = extraInformation;
  
  this.message = "Bad dateTime format input : '"+this.input+"', expected format : '"+this.expectedFormat+"'" +(extraInformation == null ? "": extraInformation);
  this.toString = function() 
  {
    return this.message
  };
}

var CrfIrpUtils = Class.create();

CrfIrpUtils.prototype.initialize=function()
{
  this.defaultFieldBackgroundColor = "#FFFFFF";
  this.fieldEditBackgroundColor    = "#C8C4FF";
  this.fieldSavingBackgroundColor  = "#CCFEC5";
  this.fieldErrorBackgroundColor   = "#FFD5D6";
  this.fieldWarnBackgroundColor    = "#FEFFD2";
  this.lastEditedField             = null;  
  this.infoWindow                  = null;
  
  this.infoTemplate = new Template('<div class="CrfUtilsInfoWindowElement" onmouseover="highlight(#{fieldId}, true);" onmouseout="highlight(#{fieldId}, false);"><span class="CrfUtilsInfoWindowElementDate">#{myDate}</span>#{msg}</div>');
};

/* ===================== List Handling ============================== */

CrfIrpUtils.prototype.allList=Array();
/***
 * Demande toute les listes statiques au serveur
 */
CrfIrpUtils.prototype.getAllList=function()
{
  MonitorCommons.getAllList(crfIrpUtils.getAllListReturn);
}
/***
 * Initialise toutes les listes statics de la page
 */
CrfIrpUtils.prototype.getAllListReturn=function(allList)
{
  var tmpList = Array();
  var newList = Array();
  
  var listList = ['EtatsDispositif', 'MotifsIntervention', 'OriginesIntervention', 'RolesEquipier', 'RolesUser', 'TypesDispositif', 'EtatsIntervention'];
  
  for(var z=0, listListCount=listList.length; z<listListCount;z++)
  {
    tmpList = allList[listList[z]];
    newList = Array();
    for(var i=0,countgetAllListReturn=tmpList.length; i<countgetAllListReturn; i++)
      newList[tmpList[i].id]={id:tmpList[i].id, label:tmpList[i].label};

    CrfIrpUtils.prototype.allList[listList[z]]=newList;
  }
  
  tmpList = allList['Delegations'];
  newList = Array();
  for(var i=0,countgetAllListReturn=tmpList.length; i<countgetAllListReturn; i++)
    newList[tmpList[i].id]={id:tmpList[i].idDelegation, label:tmpList[i].nom+' ('+tmpList[i].departement+')'};

  CrfIrpUtils.prototype.allList['Delegations']=newList; 
  
  custumEventPS.publish("ListLoaded", null);
}
/***
 * Pour la liste listId, retourne le label de l'objet id
 */
CrfIrpUtils.prototype.getLabelFor=function(listId, id)
{
  var list = CrfIrpUtils.prototype.allList[listId];
  if(list == null)
  {
    alert('Liste '+listId+' inconnu');
    return null;
  }
  
  var listObject = list[id];
  
  if(listObject == null)
  {
    alert('Liste '+listId+', id='+id+' inconnu');
    return null;
  }
  
  return listObject.label;
}

/* ===================== Field Handling ============================== */

/***
 * Sauvegarde l'ancienne valeur,
 * Met la couleur de fond, a la couleur signifiant 'champ en cours d'édition'
 * Met la couleur de fond du précédent champ de saisie à la couleur de fond par défaut.
 * Pointe le champ fieldId comme dernier champ en cours de saisie.
 */
CrfIrpUtils.prototype.fieldEdit=function(fieldId)
{
  var currentField = $(fieldId);

  currentField.oldValue=currentField.value;
  currentField.style.backgroundColor=this.fieldEditBackgroundColor;
  if(this.lastEditedField != null && fieldId != this.lastEditedField)
    this.defaultBackgroundColorForField(this.lastEditedField);
  this.lastEditedField = fieldId;
};

/***
 * Initialise la couleur de fond du champ fieldId à la couleur siginifiant que la sauvegarde de
 * la valeur du champ est en cours.
 */
CrfIrpUtils.prototype.fieldSaving=function(fieldId)
{
  $(fieldId).style.backgroundColor=this.fieldSavingBackgroundColor;
};

/***
 * Initialise la couleur de fond du champ fieldId à la couleur par défaut
 */
CrfIrpUtils.prototype.defaultBackgroundColorForField=function(fieldId)
{
  $(fieldId).style.backgroundColor=this.defaultFieldBackgroundColor;
};
/***
 * Initialise la couleur de fond du champ fieldId à la couleur signifiant une erreur de saisie
 */
CrfIrpUtils.prototype.errorBackgroundColorForField=function(fieldId)
{
  $(fieldId).style.backgroundColor=this.fieldErrorBackgroundColor;
};

/**
 * Initialise les propriétées valueMatch, defaultOnError de l'objet d'id fieldId
 * Permet à la fonction CrfIrpUtils.prototype.checkField de vérifier la valeur du champ fieldId
 * est correct. (voir la fonction checkFielf)
 * 
 * */
CrfIrpUtils.prototype.setFieldValidation=function(fieldId, valueMatch, defaultOnError)
{
  var currentField = $(fieldId);
  currentField.valueMatch    =new Template(valueMatch);
  currentField.defaultOnError=defaultOnError;
};


/**
 * Note : les propriétées valueMatch, defaultOnError peuvent être définies avec la fonction
 *   CrfIrpUtils.prototype.setFieldValidation
 * 
 * Si une expression régulière est défini dans la propriété valueMatch (sous forme de template prototype)
 * du DOM de l'objet d'id fieldId et que la valeur de l'input est non vide, l'expression régulière 
 * est appliquée à la valeur.
 * 
 * Si l'évaluation de l'expression régulière retourne true, la valeur saise est considérée 
 * comme correcte, la fonction retourne true;
 * 
 * Si l'évaluation de l'expression régulière retourne false, la valeur saisie est considéré comme incorrect.
 * Un message d'erreur est affiché, si la propriété defaultOnError du DOM de l'objet d'id fieldId est définie,
 * alors la fonction écrase la valeur saisie par cette valeur.
 * 
 * */
CrfIrpUtils.prototype.checkField=function(fieldId)
{
  var currentField = $(fieldId);
  if(currentField.valueMatch != null && currentField.value != null && currentField.value != '')
  {
    if( !eval(currentField.valueMatch.evaluate({value:currentField.value})) )
    {
      this.error(fieldId, 'evalution error for field "'+fieldId+'" with expression ="'+$(fieldId).valueMatch.template+'" and value="'+currentField.value+'"');
      if(currentField.defaultOnError)
        currentField.value = currentField.defaultOnError;
      return false;
    }
  }
  return true;
};
/**
 * Vérifie que le champ fieldId est renseigné (!= '' pour les input, !=0 pour les selects)
 * Si le champ est vide, retourn false, et met la couleur de fond à la couleur signifiant, erreur de saisie.
 * */
CrfIrpUtils.prototype.checkMandatoryField=function(fieldId)
{
  var currentField = $(fieldId);
 	if(currentField.tagName == 'SELECT' && currentField.value == 0 || currentField.value == '')
 	{
 		this.error(fieldId,'Ce champ est obligatoire!');
 		return false;
 	}
	return true;
};
/* ===================== Date Function ============================== */

CrfIrpUtils.prototype.setupCalendar=function(inputId)
{
 var datePicker = Ext.DatePicker({
 	id:inputId+'_DatePicker',
 	applyTo:inputId,
 	format:'d/m/Y H:i:s',
 	xfield:'datefield'
 	
 	
 });
	
/*
  Calendar.setup(
    { 
      inputField:inputId,
      ifFormat:"%d/%m/%Y %H:%M",
      button:inputId+"_button",
      singleClick:true,
      step:1,
      weekNumbers:true,
      cache:false,
      showsTime:true
    }
  );*/
};

//TODO check if it's a date before doing anything
CrfIrpUtils.prototype.getFullDate=function(dateObject)
{
  return this.padLeft(dateObject.getDate    ()  , 2, '0')+'/'+
         this.padLeft(dateObject.getMonth   ()+1, 2, '0')+'/'+
                      dateObject.getFullYear()           +' '+
         this.padLeft(dateObject.getHours   ()  , 2, '0')+':'+
         this.padLeft(dateObject.getMinutes ()  , 2, '0');

};
CrfIrpUtils.prototype.getDate=function(dateObject)
{
  return this.padLeft(dateObject.getDate    ()  , 2, '0')+'/'+
         this.padLeft(dateObject.getMonth   ()+1, 2, '0')+'/'+
                      dateObject.getFullYear();
};
CrfIrpUtils.prototype.getTime=function(dateObject)
{
  return this.padLeft(dateObject.getHours   (), 2, '0')+':'+
         this.padLeft(dateObject.getMinutes (), 2, '0');
};

/*Rang :
 *                              111111
 *                   0123456789012345
 * Expected format : dd/MM/yyyy HH:mm*/
CrfIrpUtils.prototype.parseDateTime=function(dateTimeString)
{
  var dateTimeArray = dateTimeString.split(" ");
  
  if(dateTimeArray.length != 2)
    throw new ParseDateException(dateTimeString, "dd/MM/yyyy HH:mm");
  
  var dateArray = dateTimeArray[0].split("/");
  if(dateArray.length != 3)  
    throw new ParseDateException(dateTimeString, "dd/MM/yyyy HH:mm", ", Date part is invalid ('"+dateTimeArray[0]+"')");

  var timeArray = dateTimeArray[1].split(":");
  if(timeArray.length != 2)  
    throw new ParseDateException(dateTimeString, "dd/MM/yyyy HH:mm", ", Time part is invalid ('"+dateTimeArray[1]+"')");
  
  var newDate = new Date();
  newDate.setFullYear (dateArray[2]  );
  newDate.setMonth    (dateArray[1]-1);//les mois commencent a 0...
  newDate.setDate     (dateArray[0]  );
  newDate.setHours    (timeArray[0]  );
  newDate.setMinutes  (timeArray[1]  );
  newDate.setSeconds  (0);
  return newDate;
};
CrfIrpUtils.prototype.parseDate=function(dateString)
{
  var dateArray = dateString.split("/");
  if(dateArray.length != 3)  
    throw new ParseDateException(dateTimeString, "dd/MM/yyyy");
    
  var newDate = new Date();
  newDate.setFullYear (dateArray[2]  );
  newDate.setMonth    (dateArray[1]-1);//les mois commencent a 0...
  newDate.setDate     (dateArray[0]  );
  newDate.setHours    (0);
  newDate.setMinutes  (0);
  newDate.setSeconds  (0);
  
  return newDate;
};
/* ===================== Padding Function ============================== */
CrfIrpUtils.prototype.padLeft=function(myString, wantedLength, paddingChar)
{
  if(myString == null)
    myString = '';
  else    
    myString += '';//cast int to String (.length does not exists for int)
   
  if(myString.length>= wantedLength)  
    return myString;
  
  padding=paddingChar;
  for(var i=1,countPadLeft=wantedLength-myString.length;i<countPadLeft;i++)
    padding+=paddingChar; 
  return padding+myString;
}


CrfIrpUtils.prototype.padRight=function(string, wantedLength, paddingChar)
{
  if(string == null)
    string = '';
  else    
    string += '';//cast int to String (.length does not exists for int)

  if(string.length>= wantedLength)  
    return string;
  
  padding=paddingChar;
  for(var i=1,countpadRight=wantedLength-string.length;i<countpadRight;i++)
    padding+=paddingChar;
    
  return string+padding;
};

/* ===================== Error/Warning/Info Message ============================== */
CrfIrpUtils.prototype.error=function(fieldId, errorMsg)
{
	this.errorBackgroundColorForField(fieldId);
  alert('error on "'+fieldId+'" : '+errorMsg);
};

CrfIrpUtils.prototype.warn=function(fieldId, errorMsg)
{
  alert('warn on "'+fieldId+'" : '+errorMsg);
};

CrfIrpUtils.prototype.info=function(fieldId, infoMsg)
{
  currentDate = this.getFullDate(new Date());
  
  $('CrfUtilsInfoWindowContent').innerHTML = this.infoTemplate.evaluate({fieldId:fieldId, myDate:currentDate, msg:infoMsg})+$('CrfUtilsInfoWindowContent').innerHTML;
  
  if(this.infoWindow==null)
  {
    infoWindowContent = '\
<div id="CrfUtilsInfoWindowDiv" style="display:none">\
  <input type="button" id="CrfUtilsInfoWindowClearButton" value="Clear" onClick="$(\'CrfUtilsInfoWindowContent\').innerHTML=\'\';"/>\
  <div id="CrfUtilsInfoWindowContent">\
  </div>\
</div>\
';
    new Insertion.Bottom('MonitorInputBody', infoWindowContent);    
    this.infoWindow = new Window ('CrfUtilsInfoWindow', {title: "Infos", className: "alphacube2", resizable:true, draggable:true});   
    this.infoWindow.setContent   ('CrfUtilsInfoWindowDiv', true, false);
    this.infoWindow.setLocation  (60, 5);
    this.infoWindow.setSize      (400, 200, false);
  }
  this.infoWindow.show();
};

CrfIrpUtils.prototype.highlighParentNode=function(fieldId, color, isMouseIn)
{
  if(fieldId == null || $(fieldId) == null)
    return;
  fieldParentNode = $(fieldId).parentNode;
  if(fieldParentNode == null)
    return;
  if(isMouseIn)
  {
    fieldParentNode.oldBackgroundColor = fieldParentNode.style.backgroundColor; 
    fieldParentNode.style.backgroundColor=color;
  }
  else
    fieldParentNode.style.backgroundColor=fieldParentNode.oldBackgroundColor;
};

CrfIrpUtils.prototype.pleaseConfirm=function(confirmMsg, YesMsg, NoMsg)
{
  if(!YesMsg)
    YesMsg = 'Oui';
    
  if(!NoMsg)
    NoMsg = 'Non';
  
  return confirm(confirmMsg);
};
/* ******************************** End Of Object *************************************** */
var  crfIrpUtils       = new CrfIrpUtils       ();
