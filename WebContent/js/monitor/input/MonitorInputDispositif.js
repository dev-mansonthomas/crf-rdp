//DispositifWindow endOfEditionEvent

var MonitorInputDispositifCs = Class.create();

MonitorInputDispositifCs.prototype.initialize=function()
{
  MonitorInputDispositif.initScriptSession();
  this.getDispositifMaps ();
  $('DispositifEquipierRoleToChoose').equipierRankToChoose=1;
    /*Selection de la délégation*/  
   new Autocompleter.DWR( 'DispositifDelegation', 
                          'DispositifDelegation_SelectList', 
                          this.updateListDelegation, 
                          {
                            afterUpdateElement: this.delegationSelected, 
                            valueSelector     : this.delegationValueSelector,
                            displayItemsThatDontMatchInput:true
                          }
                        );
  /*Séléction des équipiers*/
   new Autocompleter.DWR( 'DispositifEquipierAdd_Nivol'     , 
                          'DispositifEquipierAdd_SelectList', 
                          this.updateListEquipierNivol, 
                          {
                            afterUpdateElement: this.equipierSelected, 
                            valueSelector     : this.equipierValueSelector
                          }
                        );
  
  
   new Autocompleter.DWR( 'DispositifEquipierAdd_Nom'       , 
                          'DispositifEquipierAdd_SelectList', 
                          this.updateListEquipierNom, 
                          {
                            afterUpdateElement: this.equipierSelected, 
                            valueSelector     : this.equipierValueSelector
                          }
                        );

  crfIrpUtils.setupCalendar("DispositifDHDebut", function(event){
       miDispositifCs.updateDispositifDateField(event.id, 'DH_debut')
    });

  crfIrpUtils.setupCalendar("DispositifDHFin", function(event){
       miDispositifCs.updateDispositifDateField(event.id, 'DH_fin')
    });
    

    custumEventPS.subscribe("ListLoaded", this.initDispositif     );
    custumEventPS.subscribe("ListLoaded", this.initDispositifGrids);
    
    custumEventPS.subscribe("DispositifEndOfEditionEvent", this.reloadDispositifLists );
};


MonitorInputDispositifCs.prototype.initDispositifGrids=function()
{

  var xg = Ext.grid;
  
  var dataStore1 = new Ext.data.Store({
           proxy: new Ext.ux.rs.data.DwrProxy({
               call: MonitorInputDispositif.getDispositifTicketList,
               args: [true],
               paging: true
               }),
           reader: new Ext.data.JsonReader({
                 root: 'data',
        totalProperty: 'totalCount',
               fields:
                   [
                       {name: 'idDispositif'      , type: 'int'    },
                       {name: 'idTypeDispositif'  , type: 'int'    },
                       {name: 'idEtatDispositif'  , type: 'int'    },
                       {name: 'idDelegation'      , type: 'int'    },
                       {name: 'displayState'      , type: 'int'    },
                       {name: 'creationTerminee'  , type: 'boolean'},
                       {name: 'dhDebut'           , type: 'date'   ,dateFormat:'Y-m-d\\TH:i:s'},
                       {name: 'dhFin'             , type: 'date'   ,dateFormat:'Y-m-d\\TH:i:s'},
                       {name: 'indicatifVehicule' , type: 'string' },
                       {name: 'autreDelegation'   , type: 'string' }
                   ]
               })
           });
           

  var grid1 = new xg.GridPanel({
        id:'DispositifListCurrentGrid',
        store: dataStore1,
        cm: new xg.ColumnModel([
            {id:'idDCurrentCol'                 , header: "Id"              , width: 30 , sortable: true, dataIndex: 'idDispositif'     },
            {id:'idTypeDispositifDCurrentCol'   , header: "Type"            , width: 150, sortable: true, dataIndex: 'idTypeDispositif' },
            {id:'indicatifVehiculeDCurrentCol'  , header: "Indicatif"       , width: 150, sortable: true, dataIndex: 'indicatifVehicule'},
            {id:'dhDebutDCurrentCol'            , header: "Date Début Vac." , width: 120, sortable: true, renderer: Ext.util.Format.dateRenderer('d/m/Y H:i:s'), dataIndex: 'dhDebut'},
            {id:'dhFinDCurrentCol'              , header: "Date Fin Vac."   , width: 120, sortable: true, renderer: Ext.util.Format.dateRenderer('d/m/Y H:i:s'), dataIndex: 'dhFin'},
            {id:'idDelegationDCurrentCol'       , header: "Délégation"      , width: 150, sortable: true, dataIndex: 'idDelegation'    },
            {id:'idEtatDispositifDCurrentCol'   , header: "Etat"            , width: 150, sortable: true, dataIndex: 'idEtatDispositif'}
        ]),
        viewConfig: {
            forceFit:true
        },
        collapsible: false,
        animCollapse: false,
        height:400,
        iconCls: 'icon-grid',
        renderTo: 'DispositifListCurrent',
        listeners:{
          'rowdblclick':miDispositifCs.gridRowDoubleClickHandler
        },
        bbar:new Ext.PagingToolbar({
          pageSize: 5,
          store: dataStore1,
          displayInfo: true,
          displayMsg: 'Dispositifs(s) {0} à {1} de {2}',
          emptyMsg: 'aucun dispositif actif'
        })
    });
  grid1.getStore().load({params: {start:0, limit:5}});
  
  
  
  
  var dataStore2 = new Ext.data.Store({
           proxy: new Ext.ux.rs.data.DwrProxy({
               call: MonitorInputDispositif.getDispositifTicketList,
               args: [false],
               paging: true
               }),
           reader: new Ext.data.JsonReader({
                 root: 'data',
        totalProperty: 'totalCount',
               fields:
                   [
                       {name: 'idDispositif'      , type: 'int'    },
                       {name: 'idTypeDispositif'  , type: 'int'    },
                       {name: 'idDelegation'      , type: 'int'    },
                       {name: 'displayState'      , type: 'int'    },
                       {name: 'creationTerminee'  , type: 'boolean'},
                       {name: 'dhDebut'           , type: 'date'   ,dateFormat:'Y-m-d\\TH:i:s'},
                       {name: 'dhFin'             , type: 'date'   ,dateFormat:'Y-m-d\\TH:i:s'},
                       {name: 'indicatifVehicule' , type: 'string' },
                       {name: 'autreDelegation'   , type: 'string' }
                   ]
               })
           });
           

  var grid2 = new xg.GridPanel({
        id:'DispositifListEncoursEditionGrid',
        store: dataStore2,
        cm: new xg.ColumnModel([
            {id:'idDCurrentCol'                 , header: "Id"              , width: 30 , sortable: true, dataIndex: 'idDispositif'     },
            {id:'idTypeDispositifDCurrentCol'   , header: "Type"            , width: 150, sortable: true, dataIndex: 'idTypeDispositif' },
            {id:'indicatifVehiculeDCurrentCol'  , header: "Indicatif"       , width: 150, sortable: true, dataIndex: 'indicatifVehicule'},
            {id:'dhDebutDCurrentCol'            , header: "Date Début Vac." , width: 120, sortable: true, renderer: Ext.util.Format.dateRenderer('d/m/Y H:i:s'), dataIndex: 'dhDebut'},
            {id:'dhFinDCurrentCol'              , header: "Date Fin Vac."   , width: 120, sortable: true, renderer: Ext.util.Format.dateRenderer('d/m/Y H:i:s'), dataIndex: 'dhFin'},
            {id:'idDelegationDCurrentCol'       , header: "Délégation"      , width: 150, sortable: true, dataIndex: 'idDelegation'    },
            {id:'idEtatDispositifDCurrentCol'   , header: "Etat"            , width: 150, sortable: true, dataIndex: 'idEtatDispositif'}
        ]),
        viewConfig: {
            forceFit:true
        },
        collapsible: false,
        animCollapse: false,
        height:400,
        iconCls: 'icon-grid',
        renderTo: 'DispositifListEncoursEdition',
        listeners:{
          'rowdblclick':miDispositifCs.gridRowDoubleClickHandler
        },
        bbar:new Ext.PagingToolbar({
          pageSize: 5,
          store: dataStore2,
          displayInfo: true,
          displayMsg: 'Dispositif(s) {0} à {1} de {2}',
          emptyMsg: 'aucun dispositif en cours d\'édition'
        })
    });
  grid2.getStore().load({params: {start:0, limit:5}});
};



MonitorInputDispositifCs.prototype.gridRowDoubleClickHandler=function(grid, rowIndex, columnIndex, e)
{
  miDispositifCs.editDispositif(grid.store.getAt(rowIndex).data.idDispositif);
  Ext.getCmp('InterventionListEastPanel').collapse();
};

MonitorInputDispositifCs.prototype.reloadDispositifLists=function(data)
{
  Ext.getCmp('DispositifListCurrentGrid'       ).getStore().reload();
  Ext.getCmp('DispositifListEncoursEditionGrid').getStore().reload();
}




MonitorInputDispositifCs.prototype.endOfEditionEvent=function()
{
  var displayWarningMsg = false;
  var warningMsg = 'Attention, le dispositif ne respecte pas certains pré-requis :<br/> <ul>';
  
  if(this.equipageInformation['onlyGirlInBack'])
  {
    displayWarningMsg = true;
    warningMsg += '<li> le véhicule n\'a pas d\'homme dans la cellule arrière</li>';
  }

  if(MonitorInputDispositifCs.prototype.updateVolumeAndAutonomie() < 3)
  {
    displayWarningMsg = true;
    warningMsg += '<li> le véhicule n\'a pas le volume réglementaire requis pour un réseau de secours</li>';
  }  
  warningMsg += '</ul><br/><br/>Etes vous sur de vouloir passer ce dispositif comme disponible ?<br/><br/>Cliquez sur OK pour ajouter le dispositif comme disponible, annulez pour ajouter le dispositif comme indisponible.';
  
  if(displayWarningMsg)
  {
//    if(crfIrpUtils.pleaseConfirm(warningMsg, 'Disponible','Indisponible'))

//    else
    
  }

  MonitorInputDispositif.endOfEditionEvent($('dispositif_id_field').value, $('DispositifStatus').value, this.endOfEditionEventReturn);
};

MonitorInputDispositifCs.prototype.endOfEditionEventReturn=function()
{
  miDispositifCs.resetDispositifForm();
  
  Ext.get   ('DispositifEdit'         ).slideOut();
  Ext.getCmp('DispositifListEastPanel').expand  ();
  
  custumEventPS.publish("DispositifEndOfEditionEvent",null);

  
};

MonitorInputDispositifCs.prototype.resetDispositifForm=function()
{
  DWRUtil.removeAllRows('dispositifEquipierList_tbody');

  for(i=0,count=this.fieldList.length;i<count;i++)
    DWRUtil.setValue(this.fieldList[i], '');

};

MonitorInputDispositifCs.prototype.fieldList = [ 
    'dispositif_id_field',
    'DispositifType',
    'DispositifIndicatif',
    'DispositifDelegation',
    'DispositifDelegation_id', 
    'DispositifDelegation_autreNom',
    'DispositifDHDebut',
    'DispositifDHFin',
    'DispositifEquipierAdd_Nivol',
    'DispositifEquipierAdd_Nom',
    'DispositifB1V',
    'DispositifB2V',
    'DispositifB3V',
    'DispositifB4V',
    'DispositifB5V',
    'DispositifB1P',
    'DispositifB2P',
    'DispositifB3P',
    'DispositifB4P',
    'DispositifB5P',
    'DispositifDefibrilateurTypeAUCUN',
    'DispositifDefibrilateurTypeDSA',
    'DispositifDefibrilateurTypeDEA',
    'DispositifDefibrilateurCompletOui',
    'DispositifDefibrilateurCompletNon',
    'horaire_dispo_value',
    'horaire_parti_value',
    'horaire_surPlace_value',
    'horaire_primaire_value',    
    'horaire_secondaire_value',
    'horaire_transport_value',
    'horaire_hopital_value',
    'horaire_base_value',    
    'DispositifSelectifRadio',
    'DispositifTel1',
    'DispositifTel2',
    'DispositifIdentiteMedecin'];

MonitorInputDispositifCs.prototype.getDispositifMaps=function()
{
  MonitorInputDispositif.getMappingPossibilities(this.getDispositifMapsReturn);
};

MonitorInputDispositifCs.prototype.getDispositifMapsReturn=function(dispositifMaps)
{
  MonitorInputDispositifCs.prototype.dispositifMaps = dispositifMaps;
};


MonitorInputDispositifCs.prototype.initDispositif=function()
{
  DWRUtil.removeAllOptions('DispositifType');
  DWRUtil.removeAllOptions('DispositifStatus');
  DWRUtil.addOptions( 'DispositifType', 
                      crfIrpUtils.allList['TypesDispositif'],
                      'id',
                      'label');

  DWRUtil.addOptions( 'DispositifStatus', 
                      crfIrpUtils.allList['EtatsDispositif'],
                      'id',
                      'label');
};

MonitorInputDispositifCs.prototype.createNewEmptyDispositif=function()
{
  Ext.getCmp('DispositifListEastPanel').collapse();
  MonitorInputDispositif.createEmptyDispositif(this.createNewEmptyDispositifReturn);
};

MonitorInputDispositifCs.prototype.createNewEmptyDispositifReturn=function(dispositif)
{
  $('dispositif_id_field').value=dispositif.idDispositif;
  DWRUtil.setValue('dispositif_id_span', dispositif.idDispositif);

  $('DispositifDHDebut').value=dispositif.dhDebutStr;
  $('DispositifDHFin'  ).value=dispositif.dhFinStr;
  
   Ext.get('DispositifEdit').slideIn();
};


MonitorInputDispositifCs.prototype.editDispositif=function(idDispositif)
{
  Ext.getCmp('DispositifListEastPanel').collapse();
  this.resetDispositifForm();
  MonitorInputDispositif.getDispositif(idDispositif, this.editDispositifReturn);
};

MonitorInputDispositifCs.prototype.editDispositifReturn=function(Dispositif)
{
  miDispositifCs.initDispositifForm(Dispositif);
  Ext.get('DispositifEdit').slideIn();
};

MonitorInputDispositifCs.prototype.initDispositifForm=function(dispositif)
{
  dwr.util.setValue('dispositif_id_span'            , dispositif.idDispositif);
  dwr.util.setValue('dispositif_id_field'           , dispositif.idDispositif);
  
  dwr.util.setValue('dispositif_title_indicatif'    , dispositif.indicatifVehicule);
  dwr.util.setValue('DispositifIndicatif'           , dispositif.indicatifVehicule);
  dwr.util.setValue('DispositifType'                , dispositif.idTypeDispositif);
  dwr.util.setValue('DispositifDelegation'          , dispositif.idDelegation!=0?crfIrpUtils.getLabelFor('Delegations',dispositif.idDelegation):'N/A');
  dwr.util.setValue('DispositifDelegation_id'       , dispositif.idDelegation);
  dwr.util.setValue('DispositifDelegation_autreNom' , dispositif.autreDelegation);
  
  dwr.util.setValue('DispositifDHDebut'             , crfIrpUtils.getFullDate(dispositif.dhDebut));
  dwr.util.setValue('DispositifDHFin'               , crfIrpUtils.getFullDate(dispositif.dhFin  ));
   
  /*TODO :récupérer les équipiers et les ajouters au tableau*/
  
  
  dwr.util.setValue('DispositifB1V', dispositif.o2B1Volume     );
  dwr.util.setValue('DispositifB2V', dispositif.o2B2Volume     );
  dwr.util.setValue('DispositifB3V', dispositif.o2B3Volume     );
  dwr.util.setValue('DispositifB4V', dispositif.o2B4Volume     );
  dwr.util.setValue('DispositifB5V', dispositif.o2B5Volume     );
  dwr.util.setValue('DispositifB1P', dispositif.o2B1Pression   );
  dwr.util.setValue('DispositifB2P', dispositif.o2B2Pression   );
  dwr.util.setValue('DispositifB3P', dispositif.o2B3Pression   );
  dwr.util.setValue('DispositifB4P', dispositif.o2B4Pression   );
  dwr.util.setValue('DispositifB5P', dispositif.o2B5Pression   );
  
  this.updateVolumeAndAutonomie();
  
  dwr.util.setValue('DispositifDefibrilateurType'   , dispositif.dsaType    );
  dwr.util.setValue('DispositifDefibrilateurComplet', dispositif.dsaComplet?'true':'false' );
  
  dwr.util.setValue('horaire_dispo_value'     , crfIrpUtils.getTime(dispositif.dhDispo          ));    
  dwr.util.setValue('horaire_parti_value'     , crfIrpUtils.getTime(dispositif.dhDepart         ));    
  dwr.util.setValue('horaire_surPlace_value'  , crfIrpUtils.getTime(dispositif.dhSurPlace       ));    
  dwr.util.setValue('horaire_primaire_value'  , crfIrpUtils.getTime(dispositif.dhBilanPrimaire  ));    
  dwr.util.setValue('horaire_secondaire_value', crfIrpUtils.getTime(dispositif.dhBilanSecondaire));    
  dwr.util.setValue('horaire_transport_value' , crfIrpUtils.getTime(dispositif.dhQuitteLesLieux ));    
  dwr.util.setValue('horaire_hopital_value'   , crfIrpUtils.getTime(dispositif.dhArriveeHopital ));    
  dwr.util.setValue('horaire_base_value'      , crfIrpUtils.getTime(dispositif.dhASaBase        ));    
                                                                                                        

  dwr.util.setValue('DispositifSelectifRadio'   , dispositif.contactRadio);
  dwr.util.setValue('DispositifTel1'            , dispositif.contactTel1);
  dwr.util.setValue('DispositifTel2'            , dispositif.contactTel2);
  
  dwr.util.setValue('DispositifIdentiteMedecin' , dispositif.identiteMedecin);
  
  dwr.util.setValue('DispositifStatus'          , dispositif.idEtatDispositif);
  
};


MonitorInputDispositifCs.prototype.displayCurrentEquipierRoleToAdd=function(equipierRank)
{
  if($('DispositifType').value == 0)
  {
    crfIrpUtils.error('DispositifType', 'Veuillez choisir le type de dispositif avant d\'ajouter des équipiers');
    return;
  }
  
  //Vérifie qu'il n'y pas de trous du a une suppression
  for(i=1;i<equipierRank;i++)
  {
    if( MonitorInputDispositifCs.prototype.equipageInformation['rankInfo'][i] == null)
    {//Un role n'est pas rempli...
      equipierRank = i;
      break;
    }
  }
  
  
  currentMap = this.dispositifMaps[$('DispositifType').value][equipierRank];
 
  if(currentMap == null)
  {//equipage complet
    $('DispositifEquipierAddIHM').style.display="none";
    return;
  }
  
  DWRUtil.removeAllOptions('DispositifEquipierToAddRole');
  for(i = 0; i< currentMap.length; i++)
    DWRUtil.addOptions('DispositifEquipierToAddRole', [{name:crfIrpUtils.getLabelFor('RolesEquipier',currentMap[i]), id:currentMap[i]}], 'id', 'name');
};

MonitorInputDispositifCs.prototype.equipageInformation=Array();

MonitorInputDispositifCs.prototype.updateListEquipierReturn=function(listEquipier)
{
  DWRUtil.removeAllRows('dispositifEquipierList_tbody');
 
  MonitorInputDispositifCs.prototype.equipageInformation = Array();
  MonitorInputDispositifCs.prototype.equipageInformation['rankInfo'] = Array();
  MonitorInputDispositifCs.prototype.equipageInformation['onlyGirlInBack'] = true;
  
  
     
  var cellFuncs = [
      function(equipier) 
      {
        MonitorInputDispositifCs.prototype.equipageInformation['rankInfo'][equipier.equipierRank]=true;

        if( ($('DispositifType').value==1 || $('DispositifType').value==2) && (equipier.idRoleDansDispositif == 4 || equipier.idRoleDansDispositif == 5))
          MonitorInputDispositifCs.prototype.equipageInformation['onlyGirlInBack'] = MonitorInputDispositifCs.prototype.equipageInformation['onlyGirlInBack'] && !equipier.homme;
          
        return equipier.numNivol;
      },
      function(equipier) {return '<img src="'+contextPath+'/img/monitorInput/user'+(equipier.homme?'':'_female')+'.png" alt="'+(equipier.homme?'Homme':'Femme')+'"/> '+equipier.nom+' '+equipier.prenom;},
      function(equipier) {return crfIrpUtils.getLabelFor('RolesEquipier', equipier.idRoleDansDispositif );},
      function(equipier) {return '<img src="'+contextPath+'/img/monitorInput/user_delete.png" ' +
                                      'id="CoRegulateurDel_Button_'+equipier.numNivol+'" alt="Supprimer Le Co-Régulateur '+equipier.nom+' '+equipier.prenom+'"  ' +
                                      'onClick="miDispositifCs.removeEquipierFromDispositif(\''+equipier.idEquipier+'\', \''+equipier.equipierRank+'\', \''+equipier.numNivol+'\',\''+equipier.nom+' '+equipier.prenom+'\');"/>';}
    ];
  
    var pair = true;
    DWRUtil.addRows('dispositifEquipierList_tbody', listEquipier, cellFuncs, {
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
    $('DispositifEquipierRoleToChoose').equipierRankToChoose++;
    miDispositifCs.displayCurrentEquipierRoleToAdd($('DispositifEquipierRoleToChoose').equipierRankToChoose);
    $('DispositifEquipierAdd_Nivol').value='';
    $('DispositifEquipierAdd_Nom').value='';
    $('DispositifEquipierAdd_Nivol').focus();
  
}


MonitorInputDispositifCs.prototype.updateVolumeAndAutonomie=function()
{
  var volumeTotal   =0;
  var autonomieTotal=0;
  
  for(i=1; i<=5;i++)
  {
    var v = $('DispositifB'+i+'V').value;
    var p = $('DispositifB'+i+'P').value;
    
    if( p != null && p != '' && v != null && v != '')
    {
      volumeTotal+=p*v/1000;
      autonomieTotal+=p*v*0.9/15;
    }
  }
  if(volumeTotal > 0)
  {
    $('DispositifVolumeTotal'   ).innerHTML=volumeTotal+" m<sup>3</sup>";
    $('DispositifAutonomieTotal').innerHTML=autonomieTotal+" min";
  
    if(volumeTotal < 3)  
      $('DispositifVolumeTotal'   ).style.backgroundColor='#FEFFCA';
    else
      $('DispositifVolumeTotal'   ).style.backgroundColor='#FFFFFF';
  }
  return volumeTotal;
};

//removeEquipierFromDispositif(int idDispositif, int equipierRank, int equipierId) 
MonitorInputDispositifCs.prototype.removeEquipierFromDispositif=function(equipierId, equipierRank, numNivol, nom, prenom)
{

  if(crfIrpUtils.pleaseConfirm('Confirmez vous la suppression de '+nom+' '+prenom+' ('+numNivol+') ?'))
  {

    MonitorInputDispositif.removeEquipierFromDispositif( $('dispositif_id_field').value,
                                                         equipierRank                  ,
                                                         equipierId                    ,
                                                         miDispositifCs.updateListEquipierReturn
                                                       );
                                                       
    $('DispositifEquipierAddIHM').style.display="block";
    $('DispositifEquipierAddIHM').style.width="100%";
    $('DispositifEquipierAddIHMHeader').style.width="100%";
    $('DispositifEquipierAddIHMInput').style.width="100%";
  }
};


MonitorInputDispositifCs.prototype.updateDispositifRadioField=function(fieldId)
{
  if(fieldId == 'dsa_td')
  {
    $('dsa_td_value').value = DWRUtil.getValue('DispositifDefibrilateurType');
    if($('dsa_td_value').value == 'NO')
    {
      DWRUtil.setValue('DispositifDefibrilateurComplet', 'false');
      $('dsa_complet_td_value').value = 'false';
      $('DispositifDefibrilateurCompletOui').disabled=true;
      $('DispositifDefibrilateurCompletNon').disabled=true;
      this.updateDispositifBooleanField('dsa_complet_td_value', 'dsa_complet', 'dsa_complet_td');
    }
    else
    {
      $('DispositifDefibrilateurCompletOui').disabled=false;
      $('DispositifDefibrilateurCompletNon').disabled=false;    
    }
    this.updateDispositifStringField('dsa_td_value', 'dsa_type', 'dsa_td');
  }
  else
  {
    $('dsa_complet_td_value').value = DWRUtil.getValue('DispositifDefibrilateurComplet');
    this.updateDispositifBooleanField('dsa_complet_td_value', 'dsa_complet', 'dsa_td_value');
  }
};

/************************Méthode*d'update*****************************************/
MonitorInputDispositifCs.prototype.updateDispositifIntField=function(fieldId, fieldName)
{
  crfIrpUtils.checkField (fieldId);
  crfIrpUtils.fieldSaving(fieldId);
  
  fieldValue = $(fieldId).value;
  if(fieldValue!='' && fieldValue != $(fieldId).oldValue)
  {
    MonitorInputDispositif.updateDispositifIntegerField(
                                              $('dispositif_id_field').value, 
                                              fieldName, 
                                              fieldValue, 
                                              function()
                                              {
                                                crfIrpUtils.defaultBackgroundColorForField(fieldId);
                                              });
  }
  else
    crfIrpUtils.defaultBackgroundColorForField(fieldId);
};

MonitorInputDispositifCs.prototype.updateDispositifDateField=function(fieldId, fieldName)
{
  crfIrpUtils.checkField (fieldId);
  crfIrpUtils.fieldSaving(fieldId);
  
  fieldValue = $(fieldId).value;
  if(fieldValue!='' && fieldValue != $(fieldId).oldValue)
  {
    MonitorInputDispositif.updateDispositifDateField(
                                              $('dispositif_id_field').value, 
                                              fieldName, 
                                              crfIrpUtils.parseDateTime(fieldValue), 
                                              function()
                                              {
                                                crfIrpUtils.defaultBackgroundColorForField(fieldId);
                                              });
  }
  else
    crfIrpUtils.defaultBackgroundColorForField(fieldId);
};


MonitorInputDispositifCs.prototype.updateDispositifFloatField=function(fieldId, fieldName)
{
  crfIrpUtils.checkField (fieldId);
  crfIrpUtils.fieldSaving(fieldId);
  fieldValue = $(fieldId).value;
  if(fieldValue!='' && fieldValue != $(fieldId).oldValue)
  {
    MonitorInputDispositif.updateDispositifFloatField(
                                              $('dispositif_id_field').value, 
                                              fieldName, 
                                              fieldValue, 
                                              function()
                                              {
                                                crfIrpUtils.defaultBackgroundColorForField(fieldId);
                                              });
  }
  else
    crfIrpUtils.defaultBackgroundColorForField(fieldId);
};

MonitorInputDispositifCs.prototype.updateDispositifStringField=function(fieldId, fieldName, objectIdForGraphicalEffect)
{
  if(!objectIdForGraphicalEffect)
    objectIdForGraphicalEffect = fieldId;
    
  crfIrpUtils.checkField (fieldId);
  crfIrpUtils.fieldSaving(objectIdForGraphicalEffect);
  fieldValue = $(fieldId).value;
  if(fieldValue!='' && fieldValue != $(fieldId).oldValue)
  {
    MonitorInputDispositif.updateDispositifStringField(
                                              $('dispositif_id_field').value, 
                                              fieldName, 
                                              fieldValue, 
                                              function()
                                              {
                                                crfIrpUtils.defaultBackgroundColorForField(objectIdForGraphicalEffect);
                                              });
  }
  else
    crfIrpUtils.defaultBackgroundColorForField(objectIdForGraphicalEffect);
};

MonitorInputDispositifCs.prototype.updateDispositifBooleanField=function(fieldId, fieldName, objectIdForGraphicalEffect)
{
  if(!objectIdForGraphicalEffect)
    objectIdForGraphicalEffect = fieldId;
    
  crfIrpUtils.checkField (fieldId);
  crfIrpUtils.fieldSaving(objectIdForGraphicalEffect);
  fieldValue = $(fieldId).value;
  if(fieldValue!='' && fieldValue != $(fieldId).oldValue)
  {
    MonitorInputDispositif.updateDispositifBooleanField(
                                              $('dispositif_id_field').value, 
                                              fieldName, 
                                              fieldValue, 
                                              function()
                                              {
                                                crfIrpUtils.defaultBackgroundColorForField(objectIdForGraphicalEffect);
                                              });
  }
  else
    crfIrpUtils.defaultBackgroundColorForField(objectIdForGraphicalEffect);
};


  /** 
   * Function fired when an "Autre Délegation" is validated
   */
MonitorInputDispositifCs.prototype.dispositifSetAutreDelegation=function()
{
  $($('DispositifAutreDelegationIdToUpdate').value+'_autreNom').value =$('DispositifAutreDelegation').value;
  $($('DispositifAutreDelegationIdToUpdate').value).value += ' '+$($('DispositifAutreDelegationIdToUpdate').value).value;
  $($('DispositifAutreDelegationIdToUpdate').value).value='';
};

  /*****************************AUTOCOMPLETE*FUNCTIONS*********************************************************************/
  //AutoComplete : update list functions, fired when the input of the autoComplete Field is changed
MonitorInputDispositifCs.prototype.updateListEquipierNivol=function(autocompleter, token) 
{
  if(token.length>2 && $('DispositifEquipierToAddRole') != null)
    MonitorInputDispositif.getEquipierByNivol( 
                                     $('DispositifType').value,
                                     $('DispositifEquipierToAddRole').value,
                                      token, 
                                      function(data)
                                      {
                                        autocompleter.setChoices(data)
                                      }
                                    );
};
  
MonitorInputDispositifCs.prototype.updateListEquipierNom=function(autocompleter, token) 
{
  if(token.length>2 && $('DispositifEquipierToAddRole') != null)
    MonitorInputDispositif.getEquipierByNom  ( 
                                     $('DispositifType').value,
                                     $('DispositifEquipierToAddRole').value,
                                     token,
                                     function(data)
                                     {
                                       autocompleter.setChoices(data)
                                     }
                                    );
};
  //Fonction pour l'autocomplete du choix de la délégation
MonitorInputDispositifCs.prototype.updateListDelegation=function(autocompleter, token) 
{
  MonitorInput.getDelegationByZipCode  (  token, 
                                          function(data)
                                          {
                                            autocompleter.setChoices(data)
                                          }
                                        );
};
  //End of autoComplete updateList functions  
  
  //AutoComplete : selection Function => these function are fired when users selects an item from an autocomplete list
MonitorInputDispositifCs.prototype.equipierSelected=function(inputElement, selectedElement, selectedUserObject)
{
  MonitorInputDispositif.addEquipierToDispositif(	$('dispositif_id_field'           ).value, 
                                        $('DispositifEquipierRoleToChoose').equipierRankToChoose, 
                                        $('DispositifEquipierToAddRole'   ).value, 
                                        selectedUserObject.idEquipier,
                                        miDispositifCs.updateListEquipierReturn
                                        );
};
 
MonitorInputDispositifCs.prototype.delegationSelected=function(inputElement, selectedElement, selectedDelegationObject)
{
  $('DispositifDelegation_id').value = selectedDelegationObject.idDelegation;
  $('DispositifDelegation'   ).value = selectedDelegationObject.nom+' ('+ selectedDelegationObject.departement +')';

  if(selectedDelegationObject.idDelegation==0)
  {
    $('DispositifAutreDelegationIdToUpdate').value='DispositifDelegation';
    alert('Todo : saisie autre delegation');
  }
  else
  {
    crfIrpUtils.checkField ('DispositifDelegation');
    crfIrpUtils.fieldSaving('DispositifDelegation');
    
    fieldValue = $('DispositifDelegation_id').value;
    if(fieldValue!='' && $('DispositifDelegation').value != $('DispositifDelegation').oldValue)
    {
      MonitorInputDispositif.updateDispositifIntegerField(
                                                $('dispositif_id_field').value, 
                                                'id_delegation_responsable', 
                                                fieldValue, 
                                                function()
                                                {
                                                  crfIrpUtils.defaultBackgroundColorForField('DispositifDelegation');
                                                });
    }
    else
      crfIrpUtils.defaultBackgroundColorForField('DispositifDelegation');
  }
};
  //End of AutoComplete selection function
  
  //AutoComplete valueSelector function : these function extract the string from one object for display.
  //Objects comes from the updateList function returns...
MonitorInputDispositifCs.prototype.equipierValueSelector=function(userObj)
{
  return userObj.numNivol+' - '+ userObj.prenom +' '+ userObj.nom +' ('+userObj.delegation.departement+')';
};
MonitorInputDispositifCs.prototype.delegationValueSelector=function(delegationObject)
{
  return delegationObject.departement +' - ' + delegationObject.nom;
};
  //End of AutoComplete valueSelector function :

