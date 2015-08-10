var MonitorInputCoRegulateurListCs = Class.create();

MonitorInputCoRegulateurListCs.prototype.initialize=function()
{
};

MonitorInputCoRegulateurListCs.prototype.displayCoRegulateur=function()
{
  MonitorInput.getCoRegulateurs(this.displayCoRegulateurReturn);
};
MonitorInputCoRegulateurListCs.prototype.createCoregulateur=function()
{
  if(miWm.createUserWindows == null)
  {
    miWm.createUserWindows = new Window ('createUser_window', {title: "Création d'un Utilisateur", className: "alphacube2", resizable:true, draggable:true});   
    miWm.createUserWindows.setContent   ('createUser', true, false);
    miWm.createUserWindows.setLocation  (80, 25);
    miWm.createUserWindows.setStatusBar ('Seul des Co-Régulateurs et des Observateurs');
    
    new Autocompleter.DWR( 'CreateUserDelegation', 
                           'CreateUserDelegation_select', 
                            this.updateListDelegation, 
                            {
                              afterUpdateElement: this.createUserDelegationSelected, 
                              valueSelector     : this.createUserDelegationValueSelector,
                              displayItemsThatDontMatchInput:true
                            }
                          );
  }
  miWm.createUserWindows.setSize (570, 400);
  miWm.createUserWindows.toFront ();
  miWm.createUserWindows.show    (); 
};
MonitorInputCoRegulateurListCs.prototype.createUserDelegationSelected=function(inputElement, selectedElement, selectedDelegationObject)
{
  $('CreateUserDelegation_id').value = selectedDelegationObject.idDelegation;
  $('CreateUserDelegation'   ).value = selectedDelegationObject.nom+' ('+ selectedDelegationObject.departement +')';
  if(selectedDelegationObject.idDelegation==1)
  {
    $('DispositifAutreDelegationIdToUpdate').value='CreateUserDelegation';
    if(miWm.autreDelegationWindow==null)
    {
      miWm.autreDelegationWindow = new Window ('autreDelegation_window', {title: "Autre Délégation", className: "alphacube2", resizable:true, draggable:true});   
      miWm.autreDelegationWindow.setContent   ('AutreDelegationEdit', true, false);
      miWm.autreDelegationWindow.setStatusBar ("le Choix Autre (NA) doit être exceptionnel");
    }
    miWm.autreDelegationWindow.setSize(390, 230);
    miWm.autreDelegationWindow.toFront();
    miWm.autreDelegationWindow.showCenter(false); 
  }
};
  //this function extractes string from person object for matching
MonitorInputCoRegulateurListCs.prototype.createUserDelegationValueSelector=function(delegationObject)
{
  return delegationObject.departement +' - ' + delegationObject.nom;
};

MonitorInputCoRegulateurListCs.prototype.updateCoRegulateurList=function(CoRegulateurList)
{
  dwr.util.removeAllRows('coRegulateurList_tbody');
  
  var cellFuncs = [
    function(coregulateur) {return coregulateur.numNivol;},
    function(coregulateur) {return coregulateur.nom+' '+coregulateur.prenom;},
    function(coregulateur) {return crfIrpUtils.getLabelFor('RolesUser',coregulateur.idRole);},
    function(coregulateur) {return '<img src="'+contextPath+'/img/monitorInput/user_delete.png" id="CoRegulateurDel_Button_'+coregulateur.numNivol+'" alt="Supprimer Le Co-Régulateur '+coregulateur.nom+' '+coregulateur.prenom+'"  onClick="removeCoRegulateur(\''+coregulateur.idUser+'\',\''+coregulateur.numNivol+'\',\''+coregulateur.nom+' '+coregulateur.prenom+'\');"/>';}
  ];

  var pair = true;
  dwr.util.addRows('coRegulateurList_tbody', CoRegulateurList, cellFuncs, {
    rowCreator:function(options)
    {
      var row = document.createElement("tr");
      row.id='row_'+options.rowData.numNivol;
      row.styleClass='row'+(pair?'1':'0');
      pair=!pair;
      return row;
    },
    escapeHtml:false
  });  
};
MonitorInputCoRegulateurListCs.prototype.displayCoRegulateurReturn=function(CoRegulateurList)
{
  miCoRegulateurListCs.updateCoRegulateurList(CoRegulateurList);

  if(miWm.coRegulateurListWindow==null)
  {
    miWm.coRegulateurListWindow = new Window ('coRegulateurList_window', {title: "Liste des Co-Régulateurs Dispo", className: "alphacube2", resizable:true, draggable:true});   
    miWm.coRegulateurListWindow.setContent   ('coRegulateurList', true, false);
    miWm.coRegulateurListWindow.setLocation  (60, 5);
    miWm.coRegulateurListWindow.setStatusBar ('Commencer à tapper le N° de nivol ou le nom pour ajouter un CoRégulateur');

     new Autocompleter.DWR( 'CoRegulateurAdd_Nivol'     , 
                            'CoRegulateurAdd_SelectList', 
                            miCoRegulateurListCs.updateListNivol, 
                            {
                              afterUpdateElement: miCoRegulateurListCs.personSelected, 
                              valueSelector     : miCoRegulateurListCs.personValueSelector
                            }
                          );
    
    
     new Autocompleter.DWR( 'CoRegulateurAdd_Nom'       , 
                            'CoRegulateurAdd_SelectList', 
                            miCoRegulateurListCs.updateListNom, 
                            {
                              afterUpdateElement: miCoRegulateurListCs.personSelected, 
                              valueSelector     : miCoRegulateurListCs.personValueSelector
                            }
                          );
  }
  miWm.coRegulateurListWindow.setSize(570, 125+24*CoRegulateurList.length); 
  miWm.coRegulateurListWindow.toFront();
  miWm.coRegulateurListWindow.show   ();                    
};

MonitorInputCoRegulateurListCs.prototype.removeCoRegulateur=function(userId,numNivol, nomPrenom)
{
  if(confirm('Etes vous sur de vouloir supprimer l\'accès en écriture sur cette régulation à l\'utilisateur '+nomPrenom+' ('+numNivol+') ?'))
    MonitorInput.removeCoRegulateur(userId, numNivol, miCoRegulateurListCs.removeCoRegulateurReturn);
};

MonitorInputCoRegulateurListCs.prototype.removeCoRegulateurReturn=function(numNivol)
{
  Effect.Fade('row_'+numNivol);
  miWm.coRegulateurListWindow.updateHeight();
};

MonitorInputCoRegulateurListCs.prototype.addCoregulateur=function()
{
  if($('CoRegulateurAdd_Selected_id').value == '')
    return;
 
  MonitorInput.addCoRegulateur($('CoRegulateurAdd_Selected_id').value, miCoRegulateurListCs.addCoregulateurReturn);
};
  
MonitorInputCoRegulateurListCs.prototype.addCoregulateurReturn=function(CoRegulateurList)
{
  //mise a jour
  $('CoRegulateurAdd_Selected_id' ).value='';
  $('CoRegulateurAdd_Nom'         ).value='';
  $('CoRegulateurAdd_Nivol'       ).value='';
  $('CoRegulateurAdd_Selected'    ).value='';
  
  miCoRegulateurListCs.updateCoRegulateurList(CoRegulateurList);
  miWm.coRegulateurListWindow.updateHeight();
};
  
  
  
  
  //java class PeopleService with method getPeople(nameFragment)
  //is exposed by DWR and return list of object Person(firstname, lastname, id)
  
  //update list
MonitorInputCoRegulateurListCs.prototype.updateListNivol=function(autocompleter, token) 
{
  MonitorInput.getAvailableCoRegulateur(  token, 
                                          '',
                                          function(data)
                                          {
                                            autocompleter.setChoices(data)
                                          }
                                        );
};
  
MonitorInputCoRegulateurListCs.prototype.updateListNom=function(autocompleter, token) 
{
  MonitorInput.getAvailableCoRegulateur(  '', 
                                          token,
                                          function(data)
                                          {
                                            autocompleter.setChoices(data)
                                          }
                                        );
};
  //this function is fired when users selects person from list
MonitorInputCoRegulateurListCs.prototype.personSelected=function(inputElement, selectedElement, selectedUserObject)
{
  $('CoRegulateurAdd_Selected_id').value = selectedUserObject.idUser;
  $('CoRegulateurAdd_Selected'   ).value = selectedUserObject.numNivol+' - '+ selectedUserObject.prenom +' '+ selectedUserObject.nom +' ('+selectedUserObject.delegation.nom+')';
};
  //this function extractes string from person object for matching
MonitorInputCoRegulateurListCs.prototype.personValueSelector=function(userObj)
{
  return userObj.numNivol+' - '+ userObj.prenom +' '+ userObj.nom +' ('+userObj.delegation.nom+')';
};
