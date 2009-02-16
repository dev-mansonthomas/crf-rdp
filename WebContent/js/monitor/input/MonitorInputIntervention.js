var MonitorInputInterventionCs = Class.create();

MonitorInputInterventionCs.prototype.initialize=function()
{
  //MonitorInputIntervention.initScriptSession();
  
  PageBus.subscribe("list.loaded",  this, this.initOriginesIntervention , null, null);
  PageBus.subscribe("list.loaded",  this, this.initMotifsIntervention   , null, null);
  PageBus.subscribe("list.loaded",  this, this.initInterventionListGrids, null, null);
  
  PageBus.subscribe("monitorInput.intervention.ticket.endOfEditionEvent",  this, this.reloadInterventionTicketLists, null, null);
  
  crfIrpUtils.setupCalendar("interventionTicketDHReception", function(event){
  	   miInterventionCs.updateInterventionDateField(event.id, 'DH_reception')
  	});
    
    
  UtilsFocusList.push('interventionPrenomVictime','interventionSexeVictimeFemme');
    
};

MonitorInputInterventionCs.prototype.fieldList = [
 'interventionTicketId',
 'interventionTicketOrigine',
 'interventionTicketDHReception',
 'interventionTicketRue',
 'interventionTicketCodePostal',
 'interventionTicketVille',
 'interventionTicketBatiment',
 'interventionTicketEtage',
 'interventionTicketPorte',
 'interventionTicketComplementAdresse',
 'interventionTicketMotif',
 'interventionTicketComplementMotif',
 'interventionNomVictime',
 'interventionPrenomVictime',
 'interventionSexeVictimeFemme',
 'interventionSexeVictimeHomme',
 'interventionAgeVictime',
 'interventionNomContactSurPlace',
 'interventionCoordonneesContactSurPlace'];

 
 
 
MonitorInputInterventionCs.prototype.initInterventionListGrids=function()
{

  var xg = Ext.grid;
  
  var dataStore1 = new Ext.data.Store({
           proxy: new Ext.ux.rs.data.DwrProxy({
               call  : MonitorInputIntervention.getInterventionTicketList,
               args  : [0],
               paging: true
               }),
           reader: new Ext.data.JsonReader({
                 root: 'data',
        totalProperty: 'totalCount',
               fields:
                   [
                       {name: 'idIntervention', type: 'int'    },
                       {name: 'dhReception'   , type: 'date'   ,dateFormat:'Y-m-d\\TH:i:s'},
                       {name: 'nomVictime'    , type: 'string' },
                       {name: 'position.ville', type: 'string' }
                   ]
               })
           });
           

  var grid1 = new xg.GridPanel({
        id:'InterventionListEncoursEditionGrid',
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
        height      : 400,
        iconCls     : 'icon-grid',
        renderTo    : 'InterventionListEncoursEdition',
        listeners   : {
          'rowdblclick':miInterventionCs.gridRowDoubleClickHandler
        },
        bbar        : new Ext.PagingToolbar({
          pageSize   : 5,
          store      : dataStore1,
          displayInfo: true,
          displayMsg : 'Ticket d\'Intervention(s) {0} à {1} de {2}',
          emptyMsg   : 'aucun Ticket d\'Intervention en cours d\'édition'
        })
    });
  grid1.getStore().load({params: {start:0, limit:5}});
  
  
  
  
  var dataStore2 = new Ext.data.Store({
           proxy: new Ext.ux.rs.data.DwrProxy({
               call  : MonitorInputIntervention.getInterventionTicketList,
               args  : [1],
               paging: true
               }),
           reader: new Ext.data.JsonReader({
                 root: 'data',
        totalProperty: 'totalCount',
               fields:
                   [
                       {name: 'idIntervention', type: 'int'    },
                       {name: 'dhReception'   , type: 'date'   ,dateFormat:'Y-m-d\\TH:i:s'},
                       {name: 'nomVictime'    , type: 'string' },
                       {name: 'position.ville', type: 'string' }
                   ]
               })
           });
           

  var grid2 = new xg.GridPanel({
        id   :'InterventionListNonAffecteeEditionGrid',
        store: dataStore2,
        cm   : new xg.ColumnModel([
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
        height      : 400,
        iconCls     : 'icon-grid',
        renderTo    : 'InterventionListUnaffected',
        listeners   : {
          'rowdblclick':miInterventionCs.gridRowDoubleClickHandler
        },
        bbar         : new Ext.PagingToolbar({
          pageSize   : 5,
          store      : dataStore2,
          displayInfo: true,
          displayMsg : 'Ticket d\'Intervention(s) {0} à {1} de {2}',
          emptyMsg   : 'aucun Ticket d\'Intervention non affectée'
        })
    });
  grid2.getStore().load({params: {start:0, limit:5}});
};



MonitorInputInterventionCs.prototype.gridRowDoubleClickHandler=function(grid, rowIndex, columnIndex, e)
{
  miInterventionCs.editInterventionTicket(grid.store.getAt(rowIndex).data.idIntervention);
};



MonitorInputInterventionCs.prototype.reloadInterventionTicketLists=function(data)
{
  Ext.getCmp('InterventionListNonAffecteeEditionGrid').getStore().reload();
  Ext.getCmp('InterventionListEncoursEditionGrid'    ).getStore().reload();
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
  $('AddInterventionDelete'        ).style.display="block";
  $('AddInterventionClose'         ).style.display="none";

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
  var mandatoryFields=[
'interventionTicketOrigine',
'interventionTicketDHReception',
'interventionTicketRue',
'interventionTicketCodePostal',
'interventionTicketVille',
'interventionTicketMotif'];
  var fieldInputError = false;
  for(var i=0, count=mandatoryFields.length;i<count;i++)
    fieldInputError = !crfIrpUtils.checkMandatoryField(mandatoryFields[i]) || fieldInputError;

  if(fieldInputError)
    return false;


  MonitorInputIntervention.endOfEditionEvent($('interventionTicketId').value, this.endOfEditionEventReturn);
};

MonitorInputInterventionCs.prototype.endOfEditionEventReturn=function()
{
  miInterventionCs.resetInterventionForm();
  
  Ext.get   ('InterventionTicket'       ).slideOut();
  Ext.getCmp('InterventionListEastPanel').expand  ();
  
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
  $('googleAdressCheckStatus').src=contextPath+'/img/pix.png';
};

MonitorInputInterventionCs.prototype.editInterventionTicket=function(idIntervention)
{
  this.resetInterventionForm();
  MonitorInputIntervention.getInterventionTicket(idIntervention, this.editInterventionTicketReturn);
};


MonitorInputInterventionCs.prototype.initInterventionTicket=function(interventionTicket)
{
  dwr.util.setValue('interventionTicketBatiment'            , interventionTicket.batiment                            );
  dwr.util.setValue('interventionTicketCodePostal'          , interventionTicket.position.codePostal                 );
  dwr.util.setValue('interventionTicketComplementAdresse'   , interventionTicket.complementAdresse                   );
  dwr.util.setValue('interventionTicketComplementMotif'     , interventionTicket.complementMotif                     );
  dwr.util.setValue('interventionTicketDHReception'         , crfIrpUtils.getFullDate(interventionTicket.dhReception));
  dwr.util.setValue('interventionTicketEtage'               , interventionTicket.etage                               );
  dwr.util.setValue('interventionTicketId'                  , interventionTicket.idIntervention                      );
  dwr.util.setValue('interventionTicketMotif'               , interventionTicket.idMotif                             );
  dwr.util.setValue('interventionTicketOrigine'             , interventionTicket.idOrigine                           );
  dwr.util.setValue('interventionTicketPorte'               , interventionTicket.porte                               );
  dwr.util.setValue('interventionTicketRue'                 , interventionTicket.position.rue                        );
  dwr.util.setValue('interventionTicketVille'               , interventionTicket.position.ville                      );
  dwr.util.setValue('interventionTicketCoordinateLat'       , interventionTicket.position.googleCoordsLat            );
  dwr.util.setValue('interventionTicketCoordinateLong'      , interventionTicket.position.googleCoordsLong           );


  dwr.util.setValue('interventionNomVictime'                ,interventionTicket.nomVictime                           );
  dwr.util.setValue('interventionNomContactSurPlace'        ,interventionTicket.nomContactSurPlace                   );
  dwr.util.setValue('interventionCoordonneesContactSurPlace',interventionTicket.coordonneesContactSurPlace           );
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

  $('AddInterventionDelete').style.display="none";
  $('AddInterventionClose' ).style.display="block";

  $('interventionTicketEditButton'  ).style.display="block";
  $('interventionTicketCancelButton').style.display="none";

  Ext.get('InterventionTicket').slideIn();
};

MonitorInputInterventionCs.prototype.cancelInterventionTicket=function(idIntervention)
{
  MonitorInputIntervention.getInterventionTicket(idIntervention, this.cancelInterventionTicketReturn);
};

MonitorInputInterventionCs.prototype.cancelInterventionTicketReturn=function(interventionTicket)
{
  miInterventionCs.initInterventionTicket(interventionTicket);
  $('interventionTicketEditButton'  ).style.display="none";
  $('interventionTicketCancelButton').style.display="block";
};


MonitorInputInterventionCs.prototype.deleteInterventionTicket=function(notifyOthers)
{
  //if confirm

  MonitorInputIntervention.deleteIntervention($('interventionTicketId').value, notifyOthers, this.deleteInterventionTicketReturn);
};

MonitorInputInterventionCs.prototype.deleteInterventionTicketReturn=function()
{
  miInterventionCs.hideInterventionTicket();
};

MonitorInputInterventionCs.prototype.hideInterventionTicket=function()
{
  Ext.get('InterventionTicket').slideOut();
  Ext.getCmp('InterventionListEastPanel').expand();
  miInterventionCs.resetInterventionForm();
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

  this.updateInterventionStringField(fieldId, fieldName);
  
  if( rue       .value != '' && rue       .oldValue != rue       .value &&
      codePostal.value != '' && codePostal.oldValue != codePostal.value &&
      ville     .value != '' && ville     .oldValue != ville     .value   )
  {// valeur non vide et non différente de la précédente valeur
    googleMapAdressResolver.findCoordinatesForAddress(  rue       .value +', '+
                                                        codePostal.value +', '+
                                                        ville     .value,
                                                        this.updateAddressReturn,
                                                        this.updateAddressErrorReturn);
  }
};

MonitorInputInterventionCs.prototype.updateAddressReturn=function(place)
{
  var coordinates = place.Point.coordinates;
  //ATTENTION, visiblement, les coordonnées google sont fournies dans l'ordre (Longitude,Latitude) alors qu'ils sont utilisé partout ailleurs dans l'ordre (Latitude,Longitude)
  $('interventionTicketCoordinateLat' ).value=coordinates[1];
  $('interventionTicketCoordinateLong').value=coordinates[0];

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