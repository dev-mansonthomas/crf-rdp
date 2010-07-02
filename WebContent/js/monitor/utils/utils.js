/*
 *  @include "/crf-rdp/WebContent/js/monitor/utils/CustomEventPublishSubscribe.js"
 **/

/* ===================== Exception def ============================== */
var consoleEnabled = false;

try
{
  console.log("Console test log");
	consoleEnabled = true;
}
catch(e)
{
}

function ParseDateException(method, input, expectedFormat, extraInformation) 
{
  this.input = input;
  this.expectedFormat= expectedFormat;
  this.extraInformation = extraInformation;
  
  this.message = "JSError - "+method+" - Bad dateTime format input : '"+this.input+"', expected format : '"+this.expectedFormat+"'" +(extraInformation == null ? "": extraInformation);
  this.toString = function() 
  {
    return this.message;
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


/* ===================== Radio ============================== */


CrfIrpUtils.prototype.radioAlphabet = {A:"ALPHA"
                                      ,B:"BRAVO"
                                      ,C:"CHARLIE"
                                      ,D:"DELTA"
                                      ,E:"ECHO"
                                      ,F:"FOXTROT"
                                      ,G:"GOLF"
                                      ,H:"HOTEL"
                                      ,I:"INDIA"
                                      ,J:"JULIET"
                                      ,K:"KILO"
                                      ,L:"LIMA"
                                      ,M:"MIKE"
                                      ,N:"NOVEMBER"
                                      ,O:"OSCAR"
                                      ,P:"PAPA"
                                      ,Q:"QUEBEC"
                                      ,R:"ROMEO"
                                      ,S:"SIERRA"
                                      ,T:"TANGO"
                                      ,U:"UNIFORM"
                                      ,V:"VICTOR"
                                      ,W:"WHISKY"
                                      ,X:"X-RAY"
                                      ,Y:"YANKEE"
                                      ,Z:"ZULU"
                                      ," ":" "};


CrfIrpUtils.prototype.toRadio=function(str)
{
  var str2   = str.replace(/é|è|ê|ë/gi,"e").replace(/à|â|ä/gi, "a").replace(/ç/gi, "c").replace(/ù/gi, "u").replace(/î|ï/gi, "i").toUpperCase();
  var result = [];
  
  for(i=0,count=str2.length;i<count;i++)
  {
    tmp = this.radioAlphabet[str2.charAt(i)]
    if(tmp != null)
      result.push(tmp.capitalize()+' ');
    else
      result.push(' ');
  }
  return result.join('');
};

/** Give the focus to the next predefined field, if configured.
 * 
 * a 'UtilsFocusList' array should be defined and filled with values like this :  
 *
 * UtilsFocusList['currentFieldId']='nextFieldId';
 * 
 * or
 * 
 * UtilsFocusList['currentFieldId']= function(){if(<<some condition>>) return "fieldID1"; else "fieldID2";};
 * 
 * So that, on blur of currentFieldId, the focus will be given to 'nextFieldId' instead of the field that follow currentFieldId in the html code.
 * 
 * 
 * 
 * */
CrfIrpUtils.prototype.focusHandling=function(currentFieldId)
{
  if(UtilsFocusList == null)
    return;
  
  var nextFocus = UtilsFocusList[currentFieldId];
  
  if(nextFocus == null)
    return;
  var nextFieldId = null;
  
  if(typeof nextFocus == 'function')
  {
    nextFieldId = nextFocus();
  }
  else
    nextFieldId = nextFocus;
  
  if(consoleEnabled)
    console.log("nextFocus="+nextFieldId);

  $(nextFieldId).focus();
};


CrfIrpUtils.prototype.formatInterventionBusinessId=function(interventionBusinessId)
{
  if(interventionBusinessId == null  || interventionBusinessId == '' || interventionBusinessId == 0)
  {
    return '';
  }
  
  var businessIdElements 	= interventionBusinessId.split('-');
  var businessId 			    = businessIdElements[0]+'-'+businessIdElements[1]+'-<span class="idInterventionNumber">'+businessIdElements[2]+'</span>'; 

  return businessId;
};



/* ===================== List Handling ============================== */

CrfIrpUtils.prototype.allList           =[];
CrfIrpUtils.prototype.allLieu           =[];
CrfIrpUtils.prototype.allTypeLieuOrdered=[];//Type lieu dans l'ordre spécifié par numOrdre
CrfIrpUtils.prototype.allTypeLieu       =[];//Type lieu indexé par idTypeLieu
CrfIrpUtils.prototype.typeDispositif    =[];
/***
 * Demande toute les listes statiques au serveur
 */
CrfIrpUtils.prototype.getAllList=function()
{
  MonitorCommons.getAllList  ( crfIrpUtils.getAllListReturn     );
  MonitorCommons.getLieuType ( crfIrpUtils.getAllTypeLieuReturn );
};
/***
 * Initialise toutes les listes statics de la page
 * 
 * "EtatsDispositif"       
 * "MotifsIntervention"    
 * "EtatsIntervention"     
 * "OriginesIntervention"  
 * "RolesEquipier"         
 * "RolesUser"             
 * "TypesDispositif"       
 * "Delegations"           
 * 
 */
CrfIrpUtils.prototype.getAllListReturn=function(allList)
{
  var tmpList = Array();
  var newList = Array();
  
  var listList = ['EtatsDispositif', 'MotifsIntervention', 'OriginesIntervention', 'RolesEquipier', 'RolesUser', 'TypesDispositif', 'EtatsIntervention', 'MotifsAnnulation'];
  
  for(var z=0, listListCount=listList.length; z<listListCount;z++)
  {
    tmpList = allList[listList[z]];
    newList = Array();
    
    if(listList[z]=='TypesDispositif')
    {
      for(var i=0, countgetAllListReturn=tmpList.length; i<countgetAllListReturn; i++)
      {
        CrfIrpUtils.prototype.typeDispositif[tmpList[i].id]=tmpList[i];
        newList[tmpList[i].id]={id:tmpList[i].id, label:'['+(tmpList[i].nombreEquipierMax==0?'∞':tmpList[i].nombreEquipierMax)+'] - '+tmpList[i].label};
      }
    }
    else  if(listList[z]=='RolesEquipier')
    {
      for(var i=0, countgetAllListReturn=tmpList.length; i<countgetAllListReturn; i++)
      {
        newList[tmpList[i].id]={id:tmpList[i].id, label:tmpList[i].label, evaluable:tmpList[i].evaluable};
      }
    }
    else
    {
      for(var i=0, countgetAllListReturn=tmpList.length; i<countgetAllListReturn; i++)
      {
        newList[tmpList[i].id]={id:tmpList[i].id, label:tmpList[i].label};
      }
    }

    CrfIrpUtils.prototype.allList[listList[z]]=newList;
  }
  
  tmpList = allList['Delegations'];
  newList = Array();
  for(var i=0,countgetAllListReturn=tmpList.length; i<countgetAllListReturn; i++)
    newList[tmpList[i].idDelegation]={id:tmpList[i].idDelegation, label:tmpList[i].nom+' ('+tmpList[i].departement+')'};

  CrfIrpUtils.prototype.allList['Delegations']=newList; 
  
  PageBus.publish("list.loaded", null);
};
CrfIrpUtils.prototype.getAllLieuReturn=function(allLieu)
{
  CrfIrpUtils.prototype.allLieu = allLieu;
  PageBus.publish("listLieu.loaded", allLieu);
};
CrfIrpUtils.prototype.getAllTypeLieuReturn=function(allTypeLieu)
{
  var allTypeLieuIndexed = [];
  for(var i=0,count=allTypeLieu.size();i<count;i++)//de sorte que l'index soit l'idTypeLieu
    allTypeLieuIndexed[allTypeLieu[i].idTypeLieu]=allTypeLieu[i];
    
  CrfIrpUtils.prototype.allTypeLieu        = allTypeLieuIndexed;
  CrfIrpUtils.prototype.allTypeLieuOrdered = allTypeLieu;
  
  PageBus.publish("listTypeLieu.loaded", allTypeLieu);
  
  MonitorCommons.getAllLieu  ( crfIrpUtils.getAllLieuReturn     );
};
CrfIrpUtils.prototype.getTypeLieu=function(idTypeLieu)
{
  if(CrfIrpUtils.prototype.allTypeLieu == null)
    throw 'JSError - CrfIrpUtils.prototype.getTypeLieu - allTypeLieu not initialized';
  
  var typeLieu = CrfIrpUtils.prototype.allTypeLieu[idTypeLieu];
  
  if(typeLieu == null)
    throw 'JSError - CrfIrpUtils.prototype.getTypeLieu - typeLieu with id '+idTypeLieu+' not found';
    
  return typeLieu;
};
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
};
CrfIrpUtils.prototype.getListForSimpleStore=function(listId)
{
  var array = new Array();
  var i=0;
  array[0]=[0,'N/A'];
  
  if(listId == 'allTypeLieuOrdered')
  {
    var list = CrfIrpUtils.prototype.allTypeLieuOrdered;
    for(i=0;i<list.length;i++)
    {
      array[i+1]=[list[i].idTypeLieu,list[i].labelTypeLieu];
    }
    return array;
  }
  else
  {
    var list = CrfIrpUtils.prototype.allList[listId];
    for(i=0;i<list.length;i++)
    {
      array[i+1]=[list[i].id,list[i].label];
    }
    return array;
  }
};

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

  currentField.oldValue=currentField.type =='checkbox'?currentField.checked:currentField.value;
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
CrfIrpUtils.prototype.checkMandatoryField=function(fieldId, displayError)
{
  var currentField = $(fieldId);
 	if(currentField.tagName == 'SELECT' && currentField.value == 0 || currentField.value == '')
 	{
 		this.errorBackgroundColorForField(fieldId);
 		return false;
 	}
	return true;
};
/* ===================== Date Function ============================== */

CrfIrpUtils.prototype.setupCalendar=function(inputId, changeHandler, format)
{
	if(format == null || format == '')
    format = 'd/m/Y H:i';
  
	var myDateSelector = new Ext.form.DateField({
		        id             : inputId,
            width          : 130,
            format         : format,
            allowBlank     : true,
            icon           : '../../../img/famfamfam/calendar.png',
            enableKeyEvents: true,
            listeners      : {
            	'focus':function(event)
            	{
            	  crfIrpUtils.fieldEdit(event.id+'_div');	
            	},
            	'change':changeHandler,
              'blur':function(){
                crfIrpUtils.focusHandling(inputId);
               },
              'keyup':function(obj, event){
               // alert(event.keyCode());
               // crfIrpUtils.focusHandling(inputId);
               }
            }
        });
 
  myDateSelector.render(inputId+'_div');  
};

CrfIrpUtils.prototype.getFullDate=function(dateObject)
{
  if(dateObject == null)
    return 'N/A';
    
  if(!(dateObject instanceof Date))
    throw 'JSError - CrfIrpUtils.prototype.getTypeLieu - '+dateObject+" n'est pas un objet";
    
  return this.padLeft(dateObject.getDate    ()  , 2, '0')+'/'+
         this.padLeft(dateObject.getMonth   ()+1, 2, '0')+'/'+
                      dateObject.getFullYear()           +' '+
         this.padLeft(dateObject.getHours   ()  , 2, '0')+':'+
         this.padLeft(dateObject.getMinutes ()  , 2, '0');

};
CrfIrpUtils.prototype.getDate=function(dateObject)
{
  if(dateObject == null)
    return 'N/A';

  return this.padLeft(dateObject.getDate    ()  , 2, '0')+'/'+
         this.padLeft(dateObject.getMonth   ()+1, 2, '0')+'/'+
                      dateObject.getFullYear();
};
CrfIrpUtils.prototype.getTime=function(dateObject)
{
  if(dateObject == null)
    return '';

  return this.padLeft(dateObject.getHours   (), 2, '0')+':'+
         this.padLeft(dateObject.getMinutes (), 2, '0');
};

CrfIrpUtils.prototype.getTimeWithSeconds=function(dateObject)
{
  if(dateObject == null)
    return '';
  
  return this.padLeft(dateObject.getHours   (), 2, '0')+':'+
         this.padLeft(dateObject.getMinutes (), 2, '0')+':'+
         this.padLeft(dateObject.getSeconds (), 2, '0');
};

/*Rang :
 *                              111111
 *                   0123456789012345
 * Expected format : dd/MM/yyyy HH:mm*/
CrfIrpUtils.prototype.parseDateTime=function(dateTimeString)
{
  var dateTimeArray = dateTimeString.split(" ");
  
  if(dateTimeArray.length != 2)
    throw new ParseDateException('CrfIrpUtils.prototype.parseDateTime',dateTimeString, "dd/MM/yyyy HH:mm");
  
  var dateArray = dateTimeArray[0].split("/");
  if(dateArray.length != 3)  
    throw new ParseDateException('CrfIrpUtils.prototype.parseDateTime',dateTimeString, "dd/MM/yyyy HH:mm", ", Date part is invalid ('"+dateTimeArray[0]+"')");

  var timeArray = dateTimeArray[1].split(":");
  if(timeArray.length != 2)  
    throw new ParseDateException('CrfIrpUtils.prototype.parseDateTime',dateTimeString, "dd/MM/yyyy HH:mm", ", Time part is invalid ('"+dateTimeArray[1]+"')");
  
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
    throw new ParseDateException('CrfIrpUtils.prototype.parseDate',dateString, "dd/MM/yyyy");
    
  var newDate = new Date();
  newDate.setFullYear (dateArray[2]  );
  newDate.setMonth    (dateArray[1]-1);//les mois commencent a 0...
  newDate.setDate     (dateArray[0]  );
  newDate.setHours    (0);
  newDate.setMinutes  (0);
  newDate.setSeconds  (0);
  
  return newDate;
};

CrfIrpUtils.prototype.checkTimeFormat=function(fieldValue)
{
  return !/[0-9]{2,2}:[0-9]{2,2}/.test(fieldValue)
};
/**
 * Compare les temps timeStr1 et timeStr2
 * retourne true si timeStr1 est supérieur (après) a timeStr2
 * false sinon
 * */
CrfIrpUtils.prototype.compareTime=function(timeStr1,timeStr2)
{
  var timeArray1 = timeStr1.split(':');
  var timeComparable1 = timeArray1[0]+timeArray1[1];
  
  var timeArray2 = timeStr2.split(':');
  var timeComparable2 = timeArray2[0]+timeArray2[1];
  
  
  return timeComparable1>timeComparable2;
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
  alert('info on "'+fieldId+'" : '+infoMsg);
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
