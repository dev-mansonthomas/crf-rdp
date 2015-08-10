var MonitorInputInterventionCs = Class.create();

MonitorInputInterventionCs.prototype.initialize=function()
{
  //MonitorInputIntervention.initScriptSession();
  
  PageBus.subscribe("list.loaded",  this, this.initOriginesIntervention , null, null);
  PageBus.subscribe("list.loaded",  this, this.initMotifsIntervention   , null, null);
  PageBus.subscribe("list.loaded",  this, this.initInterventionListGrids, null, null);
  
  PageBus.subscribe("monitorInput.intervention.ticket.endOfEditionEvent",  this, this.reloadInterventionTicketLists, null, null);
  
  crfIrpUtils.setupCalendar("interventionTicketDHReception", "interventionTicketDHReception_div","interventionTicketDHReception_div",function(event){
  	   miInterventionCs.updateInterventionDateField(event.id, 'DH_reception')
  	});
    
    
  UtilsFocusList['interventionPrenomVictime']='interventionSexeVictimeFemme';
    
};

MonitorInputInterventionCs.prototype.fieldList = [
 'interventionTicketId'          ,
 'interventionTicketOrigine'     ,
 'interventionTicketDHReception' ,
 'interventionTicketRue'         ,
 'interventionTicketCodePostal'  ,
 'interventionTicketVille'       ,
 'interventionTicketBatiment'    ,
 'interventionTicketEtage'       ,
 'interventionTicketPorte'       ,
 'interventionTicketComplementAdresse',
 'interventionTicketMotif'       ,
 'interventionTicketComplementMotif',
 'interventionNomVictime'        ,
 'interventionPrenomVictime'     ,
 'interventionSexeVictimeFemme'  ,
 'interventionSexeVictimeHomme'  ,
 'interventionAgeVictime'        ,
 'interventionNomContactSurPlace',
 'interventionCoordonneesContactSurPlace'];

 MonitorInputInterventionCs.prototype.CreateInterButtons= [{
      text   : 'Publier',
      handler: function()
      {
        miInterventionCs.endOfEditionEvent(); 
      },
      iconCls: 'validateButton',
      xtype  : 'tbbutton'
    },
    {
       text   : 'Supprimer',
       handler: function()
       {
        miInterventionCs.deleteInterventionTicket(false);
       },
       iconCls: 'deleteButton'
    }];
    
    

 MonitorInputInterventionCs.prototype.EditInterAnUnPublishedButton= [{
      text   : 'Publier',
      handler: function()
      {
        miInterventionCs.endOfEditionEvent(); 
      },
      iconCls: 'validateButton',
      xtype  : 'tbbutton'
    },
    {
       text   : 'Supprimer',
       handler: function()
       {
         miInterventionCs.deleteInterventionTicket(true);
       },
       iconCls: 'deleteButton'
    },
    {
       text   : 'Fermer',
       handler: function()
       {
         miInterventionCs.hideInterventionTicket  ();
       },
       iconCls: 'deleteButton'
    }];
    
 MonitorInputInterventionCs.prototype.EditInterAPublishedButton= [
    {
       text   : 'Fermer',
       handler: function()
       {
         miInterventionCs.hideInterventionTicket  ();
       },
       iconCls: 'deleteButton'
    }];
 
 MonitorInputInterventionCs.prototype.CancelInterButtons= [{
      text   : 'Annuler l\'Intervention',
      handler: function()
      {
        miInterventionCs.deleteInterventionTicket(true); 
      },
      iconCls: 'validateButton',
      xtype  : 'tbbutton'
    },
    {
       text   : 'Non, je me suis trompé',
       handler: function()
       {
         miInterventionCs.hideInterventionTicket();
       },
       iconCls: 'deleteButton'
    }]; 
    
 
MonitorInputInterventionCs.prototype.initInterventionListGrids=function()
{

  try
  {
    
  
    
    var xg = Ext.grid;
    
    var dataStore1 = new Ext.data.Store({
             proxy: new Ext.ux.rs.data.DwrProxy({
                 call       : MonitorInputIntervention.getInterventionTicketList,
                 args       : [],
                 proxyConfig: Ext.ux.rs.data.PAGING_WITH_SORT_AND_FILTER,
                 filterCallBack: function()
                 {
                    var objectFilter = new Array();
                    
                    Ext.ux.rs.addFilterFromExtField(objectFilter,'InterventionListGridToolbar-idEtatIntervention', 'idEtatIntervention', '='   ,'');
                    return objectFilter;
                 }
                 }),
             reader: new  Ext.ux.rs.data.JsonReader({
                   root: 'data',
          totalProperty: 'totalCount',
                 fields:
                     [
                         {name: 'idIntervention', type: 'int'    },
                         {name: 'dhReception'   , type: 'date'   },
                         {name: 'nomVictime'    , type: 'string' },
                         {name: 'position.ville', type: 'string' }
                     ]
                 })
             });
             
    var bbar = new Ext.PagingToolbar({
      id         : 'InterventionListGridToolbar',
      pageSize   : 10,
      store      : dataStore1,
      displayInfo: true,
      displayMsg : 'Ticket d\'Intervention(s) {0} à {1} de {2}',
      emptyMsg   : 'aucun Ticket d\'Intervention',
      viewConfig: {
        forceFit:true
    }
    });
    
    var grid1 = new xg.GridPanel({
          id:'InterventionListGrid',
          store: dataStore1,
          cm: new xg.ColumnModel([
              {id:'idITUnfinishedCol'         , header: "Id"            , width: 30 , sortable: true, dataIndex: 'idIntervention'},
              {id:'dhReceptionITUnfinishedCol', header: "Date Récéption", width: 120, sortable: true, renderer: Ext.util.Format.dateRenderer('d/m/Y H:i:s'), dataIndex: 'dhReception'},
              {id:'nomVictimeITUnfinishedCol' , header: "Nom Victime"   , width: 150, sortable: true, dataIndex: 'nomVictime'},
              {id:'villeITUnfinishedCol'      , header: "Ville"         , width: 150, sortable: true, dataIndex: 'position.ville'}
          ]),
          viewConfig: {
              forceFit:true
          },
          collapsible : false,
          animCollapse: false,
          iconCls     : 'icon-grid',
          listeners   : {
            'rowdblclick':miInterventionCs.gridRowDoubleClickHandler
          },
          bbar:bbar,
          tbar: {
            xtype: 'toolbar',
            items: [
               {
                  xtype : 'label',
                  text  : 'Status',
                  style :'padding-right:15px;padding-left:5px;'
               },
               {
                 id           : 'InterventionListGridToolbar-idEtatIntervention',
                 xtype        : 'combo',
                 fieldLabel   : 'Status',
                 anchor       : '100%',
                 mode         : 'local',
                 typeAhead    : true,
                 editable     : false,
                 triggerAction: 'all',
                 displayField : 'label',
                 valueField   : 'id',
                 selectOnFocus: true,
                 
                 store        : new Ext.data.ArrayStore({
                     fields    : ['id', 'label'],
                     data      : crfIrpUtils.getListForSimpleStore('EtatsIntervention'),
                     idIndex   : 0,
                     idProperty: 'idEtatIntervention'
                 }),
                 fireKey   : function(e) {
                   if(e.getKey()==e.ENTER){
                     Ext.getCmp('InterventionListGridToolbar').moveFirst();
                   }
                 }
               }
            ]
         }
      });


    
    
    
    grid1.getStore().load({params: {start:0, limit:5}});
    Ext.getCmp('InterventionListEastPanel').add(grid1);
    grid1.syncSize(); 
  }
  catch(e)
  {
    if(consoleEnabled)
    {
      console.log(e);
    }
    else
    {
      alert(e);
    }
  }
  
};

MonitorInputInterventionCs.prototype.gridRowDoubleClickHandler=function(grid, rowIndex, columnIndex, e)
{
  miInterventionCs.editInterventionTicket(grid.store.getAt(rowIndex).data.idIntervention);
};

MonitorInputInterventionCs.prototype.reloadInterventionTicketLists=function(data)
{
  Ext.getCmp('InterventionListEncoursEditionGrid'    ).getStore().reload();
  //Ext.getCmp('InterventionListNonAffecteeEditionGrid').getStore().reload();
}

MonitorInputInterventionCs.prototype.addIntervention=function()
{
  miInterventionCs.resetInterventionForm();
  MonitorInputIntervention.createEmptyIntervention(this.createNewEmptyInterventionReturn);
  Ext.getCmp('InterventionListEastPanel').collapse();
};

MonitorInputInterventionCs.prototype.createNewEmptyInterventionReturn=function(intervention)
{
  $('interventionTicketDHReception').value=crfIrpUtils.getFullDate(intervention.dhReception);
  $('interventionTicketId'         ).value=intervention.idIntervention;

  crfIrpUtils.resetToolbar('InterventionPanelTopToolbar', MonitorInputInterventionCs.prototype.CreateInterButtons);
  
  Ext.getCmp('InterventionPanelTopToolbar'   ).setVisible(true);
  Ext.get('InterventionTicket').slideIn();
};

MonitorInputInterventionCs.prototype.initMotifsIntervention=function()
{
  dwr.util.removeAllOptions('interventionTicketMotif');
  dwr.util.addOptions('interventionTicketMotif',
                      crfIrpUtils.allList['MotifsIntervention'],
                      'id',
                      'label');
};
MonitorInputInterventionCs.prototype.initOriginesIntervention=function()
{
  dwr.util.removeAllOptions('interventionTicketOrigine');
  dwr.util.addOptions('interventionTicketOrigine',
                      crfIrpUtils.allList['OriginesIntervention'],
                      'id',
                      'label');
};

MonitorInputInterventionCs.prototype.endOfEditionEvent=function()
{
  if(this.formValidationWindow == null)
  {
    this.formValidationWindow = new Ext.ux.Utils.FormValidationWindow({
       validateFunction       : function()
                                {
                                  miInterventionCs.doEndOfEditionEvent();
                                },
       gridTitle              : 'Vérification du Ticket d\'Intervention',
       mandatoryAlertBoxTitle : 'L\'intervention ne peut pas etre publiée',
       mandatoryAlertBoxText  : 'Des conditions nécessaires ne sont pas remplies, veuillez les corriger'

     }
    );
  }

  
  
  var mandatoryFields=[
      ['interventionTicketOrigine'    ,'L\'origine du ticket est obligatoire'],
      ['interventionTicketDHReception','La date/heure de réception est obligatoire'],
      ['interventionTicketRue'        ,'La rue de l\'intervention est obligatoire'],
      ['interventionTicketCodePostal' ,'Le code postal de l\'intervention est obligatoire'],
      ['interventionTicketVille'      ,'La ville de l\'intervention est obligatoire'],
      ['interventionTicketMotif'      ,'Le motif de l\'intervention est obligatoire']
    ];
    
  var messageList       = [];  
  var fieldInputError = false;
  //on vide le store des éléments a corriger
  Ext.getCmp('FormValidationWindow').getStore().removeAll();
  
  for(var i=0, count=mandatoryFields.length;i<count;i++)
  {
    
    var error = !crfIrpUtils.checkMandatoryField(mandatoryFields[i][0]);
    
    if(error)
    {
      messageList.push([mandatoryFields[i][1],1]);
    }
    
    fieldInputError =  error || fieldInputError;
  }
    

  if(fieldInputError)
  {
    this.formValidationWindow.display(messageList);
    return false;  
  }
  else
  {
    this.doEndOfEditionEvent();  
  }
};

MonitorInputInterventionCs.prototype.doEndOfEditionEvent=function()
{
  
  var numberOfMandatoryItems = Ext.getCmp('FormValidationWindow').getStore().query('testResult',1).getCount();
  if(numberOfMandatoryItems>0)
  {
    Ext.Msg.alert('L\'intervention ne peut pas être publiée','Des conditions nécessaires ne sont pas remplies, veuillez les corriger');
    return false;
  }
  
  MonitorInputIntervention.endOfEditionEvent($('interventionTicketId').value, this.endOfEditionEventReturn);
};


MonitorInputInterventionCs.prototype.endOfEditionEventReturn=function()
{
  miInterventionCs.resetInterventionForm();
  
  Ext.getCmp('InterventionPanelTopToolbar'   ).setVisible(false);
  Ext.get   ('InterventionTicket'            ).slideOut();
  Ext.getCmp('InterventionListEastPanel'     ).expand  ();
  
  PageBus.publish("monitorInput.intervention.ticket.endOfEditionEvent", null);
};
MonitorInputInterventionCs.prototype.resetInterventionForm=function()
{
  var fieldList = MonitorInputInterventionCs.prototype.fieldList;
  for(var i=0,count=fieldList.length;i<count;i++)
  {
    var fieldId = fieldList[i];
    if($(fieldId).tagName =='SELECT')
      $(fieldId).value=0;
    else if($(fieldId).type =='radio')
      $(fieldId).checked = false;
    else
      $(fieldId).value='';
  }
  
  Ext.get('InterventionTicketBusinessId'      ).update("");
  Ext.get('InterventionTicket_id_intervention').update("");
  $('interventionNomPrenomRadio').value='';
  $('googleAdressCheckStatus').src=contextPath+'/img/pix.png';
};

MonitorInputInterventionCs.prototype.editInterventionTicket=function(idIntervention)
{
  window.focus();
  this.resetInterventionForm();
  MonitorInputIntervention.getInterventionTicket(idIntervention, this.editInterventionTicketReturn);
};


MonitorInputInterventionCs.prototype.initInterventionTicket=function(interventionTicket)
{
  Ext.getCmp('interventionTicketDHReception').setValue        (crfIrpUtils.getFullDate(interventionTicket.dhReception));
  
  dwr.util.setValue('interventionTicketBatiment'            , interventionTicket.batiment                            );
  dwr.util.setValue('interventionTicketCodePostal'          , interventionTicket.position.codePostal                 );
  dwr.util.setValue('interventionTicketComplementAdresse'   , interventionTicket.complementAdresse                   );
  dwr.util.setValue('interventionTicketComplementMotif'     , interventionTicket.complementMotif                     );
  dwr.util.setValue('interventionTicketEtage'               , interventionTicket.etage                               );
  dwr.util.setValue('interventionTicketId'                  , interventionTicket.idIntervention                      );
  dwr.util.setValue('interventionTicketMotif'               , interventionTicket.idMotif                             );
  dwr.util.setValue('interventionTicketOrigine'             , interventionTicket.idOrigine                           );
  dwr.util.setValue('interventionTicketPorte'               , interventionTicket.porte                               );
  dwr.util.setValue('interventionTicketRue'                 , interventionTicket.position.rue                        );
  dwr.util.setValue('interventionTicketVille'               , interventionTicket.position.ville                      );
  dwr.util.setValue('interventionTicketCoordinateLat'       , interventionTicket.position.googleCoordsLat            );
  dwr.util.setValue('interventionTicketCoordinateLong'      , interventionTicket.position.googleCoordsLong           );
  dwr.util.setValue('interventionAgeVictime'                , interventionTicket.ageApproxVictime                    );
  
  interventionTicket.victimeHomme ? $('interventionSexeVictimeHomme').checked=true:$('interventionSexeVictimeFemme').checked=true;
  
  dwr.util.setValue('interventionNomVictime'                ,interventionTicket.nomVictime                           );
  dwr.util.setValue('interventionPrenomVictime'             ,interventionTicket.prenomVictime                        );
  
  miInterventionCs.updateNomPrenomRadio();
  
  dwr.util.setValue('interventionNomContactSurPlace'        ,interventionTicket.nomContactSurPlace                   );
  dwr.util.setValue('interventionCoordonneesContactSurPlace',interventionTicket.coordonneesContactSurPlace           );
  
  if(interventionTicket.interventionBusinessId!='')
  {
  	Ext.get("InterventionTicket_id_intervention" ).update('('+interventionTicket.idIntervention+')'           );
  	Ext.get('InterventionTicketBusinessId'		   ).update(crfIrpUtils.formatInterventionBusinessId(interventionTicket.interventionBusinessId));
  	$('InterventionTicketBusinessIdDiv').style.display='block';
  }
  
  if(interventionTicket.position.googleCoordsLat != 0)
    Ext.get('googleAdressCheckStatus').dom.src=contextPath+"/img/famfamfam/accept.png";
  else
    Ext.get('googleAdressCheckStatus').dom.src=contextPath+"/img/pix.png";
    
  
  var centerRegion = Ext.getCmp('monitorInputCenterRegion');
  var currentPanel = centerRegion.getActiveTab();

  if(currentPanel.id != 'monitorInputInterventionPanel')
    centerRegion.activate('monitorInputInterventionPanel');
    
  Ext.getCmp('InterventionListEastPanel').collapse();
};

MonitorInputInterventionCs.prototype.editInterventionTicketReturn=function(interventionTicket)
{
  miInterventionCs.initInterventionTicket(interventionTicket);

  if(interventionTicket.idEtat == 0)
  {
    crfIrpUtils.resetToolbar('InterventionPanelTopToolbar', MonitorInputInterventionCs.prototype.EditInterAnUnPublishedButton);    
  }
  else
  {
    crfIrpUtils.resetToolbar('InterventionPanelTopToolbar', MonitorInputInterventionCs.prototype.EditInterAPublishedButton);
  }
  
  Ext.get('InterventionTicket').slideIn();
  Ext.getCmp('InterventionPanelTopToolbar'   ).setVisible(true);
};

MonitorInputInterventionCs.prototype.cancelInterventionTicket=function(idIntervention)
{
  MonitorInputIntervention.getInterventionTicket(idIntervention, this.cancelInterventionTicketReturn);
};

MonitorInputInterventionCs.prototype.cancelInterventionTicketReturn=function(interventionTicket)
{
  miInterventionCs.initInterventionTicket(interventionTicket);
  crfIrpUtils.resetToolbar('InterventionPanelTopToolbar', MonitorInputInterventionCs.prototype.CancelInterButtons);
};



MonitorInputInterventionCs.prototype.deleteInterventionTicket=function(notifyOthers)
{
  Ext.Msg.confirm('Suppression d\'un ticket d\'Intervention', 
                  'Etes vous sur de vouloir supprimer ce ticket d\'intervention ?', 
                  function(btn){
      if(btn == 'yes')
      {
        MonitorInputIntervention.deleteIntervention($('interventionTicketId').value, notifyOthers, miInterventionCs.deleteInterventionTicketReturn);
      }
    });
};

MonitorInputInterventionCs.prototype.deleteInterventionTicketReturn=function()
{
  miInterventionCs.hideInterventionTicket       ();
  miInterventionCs.reloadInterventionTicketLists();
};

MonitorInputInterventionCs.prototype.hideInterventionTicket=function()
{
  Ext.get   ('InterventionTicket'         ).slideOut();
  Ext.getCmp('InterventionPanelTopToolbar').setVisible(false);
  Ext.getCmp('InterventionListEastPanel'  ).expand();
  miInterventionCs.resetInterventionForm ();
};




MonitorInputInterventionCs.prototype.updateNomPrenomRadio=function()
{
  var nomPrenom = $('interventionNomVictime').value+' '+$('interventionPrenomVictime').value;
  $('interventionNomPrenomRadio').value=crfIrpUtils.toRadio(nomPrenom);
};

/************************Gestion*de*l'adresse*****************************************/

MonitorInputInterventionCs.prototype.updateAddress=function(fieldId, fieldName)
{
  var rue       =$('interventionTicketRue'       );
  var codePostal=$('interventionTicketCodePostal');
  var ville     =$('interventionTicketVille'     );

  rue       .value=rue       .value.strip();
  codePostal.value=codePostal.value.strip();
  ville     .value=ville     .value.strip();

  miInterventionCs.updateInterventionStringField(fieldId, fieldName);
  
  if( ( rue       .value != '' && 
        codePostal.value != '' &&
        ville     .value != ''
      ) 
      &&
      (
          rue       .oldValue != rue       .value ||
          codePostal.oldValue != codePostal.value ||
          ville     .oldValue != ville     .value   
      )
    )
  {// valeur non vide et non différente de la précédente valeur
    googleMapAdressResolver.findCoordinatesForAddress(  rue       .value +', '+
                                                        codePostal.value +', '+
                                                        ville     .value,
                                                        miInterventionCs.updateAddressReturn,
                                                        miInterventionCs.updateAddressErrorReturn);
  }
};

MonitorInputInterventionCs.prototype.updateAddressReturn=function(place)
{
  var coordinates = place.Point.coordinates;
  //ATTENTION, visiblement, les coordonnées google sont fournies dans l'ordre (Longitude,Latitude) alors qu'ils sont utilisé partout ailleurs dans l'ordre (Latitude,Longitude)
  $('interventionTicketCoordinateLat' ).value=coordinates[1];
  $('interventionTicketCoordinateLong').value=coordinates[0];

  if(consoleEnabled)
    console.log("coordinates for intervention id='"+$('interventionTicketId').value+"' are : '"+coordinates[1]+"', '"+coordinates[0]+"'");

  
  MonitorInputIntervention.updateGoogleCoordinates(coordinates[1], coordinates[0], $('interventionTicketId').value, miInterventionCs.updateAddressSaveReturn);

  $('googleAdressCheckStatus').src=contextPath+"/img/famfamfam/cog.png";
};
MonitorInputInterventionCs.prototype.updateAddressSaveReturn=function()
{
  $('googleAdressCheckStatus').src=contextPath+"/img/famfamfam/accept.png";
};

MonitorInputInterventionCs.prototype.updateAddressErrorReturn=function(response)
{
  var icon = response.Status.code=='GoogleMapsUnavailable'?'disconnect':'exclamation';
  $('googleAdressCheckStatus').src=contextPath+"/img/famfamfam/"+icon+".png";
};


/************************Méthode*d'update*****************************************/
MonitorInputInterventionCs.prototype.updateInterventionIntegerField=function(fieldId, fieldName)
{
  crfIrpUtils.checkField (fieldId);
  crfIrpUtils.fieldSaving(fieldId);

  fieldValue = $(fieldId).value;
  if(fieldValue!='' && fieldValue != $(fieldId).oldValue)
  {
    MonitorInputIntervention.updateInterventionIntegerField(
                                              $('interventionTicketId').value,
                                              fieldName,
                                              fieldValue,
                                              function()
                                              {
                                                crfIrpUtils.defaultBackgroundColorForField(fieldId);
                                              });
  }
  else
    crfIrpUtils.defaultBackgroundColorForField(fieldId);
  crfIrpUtils.focusHandling(fieldId);
};
MonitorInputInterventionCs.prototype.updateInterventionDateField=function(fieldId, fieldName)
{
  crfIrpUtils.checkField (fieldId);
  crfIrpUtils.fieldSaving(fieldId);

  fieldValue = $(fieldId).value;
  if(fieldValue!='' && fieldValue != $(fieldId).oldValue)
  {
    MonitorInputIntervention.updateInterventionDateField(
                                              $('interventionTicketId').value,
                                              fieldName,
                                              crfIrpUtils.parseDateTime(fieldValue),
                                              function()
                                              {
                                                crfIrpUtils.defaultBackgroundColorForField(fieldId);
                                              });
  }
  else
    crfIrpUtils.defaultBackgroundColorForField(fieldId);
  crfIrpUtils.focusHandling(fieldId);
};
MonitorInputInterventionCs.prototype.updateInterventionFloatField=function(fieldId, fieldName)
{
  crfIrpUtils.checkField (fieldId);
  crfIrpUtils.fieldSaving(fieldId);
  fieldValue = $(fieldId).value;
  if(fieldValue!='' && fieldValue != $(fieldId).oldValue)
  {
    MonitorInputIntervention.updateInterventionFloatField(
                                              $('interventionTicketId').value,
                                              fieldName,
                                              fieldValue,
                                              function()
                                              {
                                                crfIrpUtils.defaultBackgroundColorForField(fieldId);
                                              });
  }
  else
    crfIrpUtils.defaultBackgroundColorForField(fieldId);
  crfIrpUtils.focusHandling(fieldId);
};

MonitorInputInterventionCs.prototype.updateInterventionStringField=function(fieldId, fieldName)
{
  crfIrpUtils.checkField (fieldId);
  crfIrpUtils.fieldSaving(fieldId);
  fieldValue = $(fieldId).value;
  if(fieldValue!='' && fieldValue != $(fieldId).oldValue)
  {
    MonitorInputIntervention.updateInterventionStringField(
                                              $('interventionTicketId').value,
                                              fieldName,
                                              fieldValue,
                                              function()
                                              {
                                                crfIrpUtils.defaultBackgroundColorForField(fieldId);
                                              });
  }
  else
    crfIrpUtils.defaultBackgroundColorForField(fieldId);
  crfIrpUtils.focusHandling(fieldId);
};

MonitorInputInterventionCs.prototype.updateInterventionBooleanField=function(fieldId, fieldName)
{
  crfIrpUtils.checkField (fieldId);
  crfIrpUtils.fieldSaving(fieldId);
  fieldValue = $(fieldId).value;
  if(fieldValue!='' && fieldValue != $(fieldId).oldValue)
  {
    MonitorInputIntervention.updateInterventionBooleanField(
                                              $('interventionTicketId').value,
                                              fieldName,
                                              fieldValue,
                                              function()
                                              {
                                                crfIrpUtils.defaultBackgroundColorForField(fieldId);
                                              });
  }
  else
    crfIrpUtils.defaultBackgroundColorForField(fieldId);
  crfIrpUtils.focusHandling(fieldId);
};