//DispositifWindow endOfEditionEvent

var MonitorInputDispositifCs = Class.create();

MonitorInputDispositifCs.prototype.initialize=function()
{
  this.getDispositifTypeDefinition ();
  
  crfIrpUtils.setupCalendar("DispositifDHDebut", function(event){
      miDispositifCs.updateDispositifDateField(event.id, 'DH_debut');
   });
   
  crfIrpUtils.setupCalendar("DispositifDHFin", function(event){
       miDispositifCs.updateDispositifDateField(event.id, 'DH_fin');
       //crfIrpUtils.focusHandling('DispositifDHFin');
    });
  
  
  crfIrpUtils.setupCalendar("DispositifDatePatchAdulte1", function(event){
    miDispositifCs.updateDispositifDateField(event.id, 'dsa_date_adulte_1');
    }, 
    'd/m/Y');
  
  crfIrpUtils.setupCalendar("DispositifDatePatchAdulte2", function(event){
    miDispositifCs.updateDispositifDateField(event.id, 'dsa_date_adulte_2');
    }, 
    'd/m/Y');
  
  crfIrpUtils.setupCalendar("DispositifDatePatchEnfant", function(event){
    miDispositifCs.updateDispositifDateField(event.id, 'dsa_date_enfant');
    }, 
    'd/m/Y');
  
  
  
    
  //initialisation des controles javascripts
  crfIrpUtils.setFieldValidation('DispositifB1V', "/3|5|15/.test(#{value})"      , "5"  );
  crfIrpUtils.setFieldValidation('DispositifB2V', "/3|5|15/.test(#{value})"      , "5"  );
  crfIrpUtils.setFieldValidation('DispositifB3V', "/3|5|15/.test(#{value})"      , "5"  );
  crfIrpUtils.setFieldValidation('DispositifB4V', "/3|5|15/.test(#{value})"      , "5"  );
  crfIrpUtils.setFieldValidation('DispositifB5V', "/3|5|15/.test(#{value})"      , "5"  );
  crfIrpUtils.setFieldValidation('DispositifB1P', "#{value}>=20 && #{value}<=200", "200");
  crfIrpUtils.setFieldValidation('DispositifB2P', "#{value}>=20 && #{value}<=200", "200");
  crfIrpUtils.setFieldValidation('DispositifB3P', "#{value}>=20 && #{value}<=200", "200"); 
  crfIrpUtils.setFieldValidation('DispositifB4P', "#{value}>=20 && #{value}<=200", "200");
  crfIrpUtils.setFieldValidation('DispositifB5P', "#{value}>=20 && #{value}<=200", "200");
  
  
  /*focus handling
  UtilsFocusList['DispositifDHFin'] = function(){
    if($('DispositifEquipierAddIHM').style.display=='none')
      return "DispositifB1V";
    else
      return "DispositifEquipierAdd_Nivol";
  };
  UtilsFocusList['DispositifB1V'  ] = 'DispositifB1P'              ;
  UtilsFocusList['DispositifB2V'  ] = 'DispositifB2P'              ;
  UtilsFocusList['DispositifB3V'  ] = 'DispositifB3P'              ;
  UtilsFocusList['DispositifB4V'  ] = 'DispositifB4P'              ;
  UtilsFocusList['DispositifB5V'  ] = 'DispositifB5P'              ;
  UtilsFocusList['DispositifB1P'  ] = 'DispositifB2V'                   ;   
  UtilsFocusList['DispositifB2P'  ] = 'DispositifB3V'                   ;   
  UtilsFocusList['DispositifB3P'  ] = 'DispositifB4V'                   ;   
  UtilsFocusList['DispositifB4P'  ] = 'DispositifB5V'                   ;   
  UtilsFocusList['DispositifB5P'  ] = 'DispositifDefibrilateurTypeAUCUN';   */

  /*event handling*/
  PageBus.subscribe("list.loaded",  this, this.initDispositif     , null, null);
  PageBus.subscribe("list.loaded",  this, this.initDispositifGrids, null, null);
  
  PageBus.subscribe("monitor.input.dispositif.updateThatChangeLists",  this, this.reloadDispositifLists     , null, null);
};


MonitorInputDispositifCs.prototype.initDispositifGrids=function()
{
  var xg = Ext.grid;
  
  var dispositifListCurrentStore = new Ext.data.Store({
           proxy: new Ext.ux.rs.data.DwrProxy({
               call       : MonitorInputDispositif.getRecentDispositifList,
               args       : [],
               proxyConfig: Ext.ux.rs.data.SIMPLE_PAGING
               }),
           reader: new Ext.ux.rs.data.JsonReader({
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
                       {name: 'dhDebut'           , type: 'date'   },
                       {name: 'dhFin'             , type: 'date'   },
                       {name: 'indicatifVehicule' , type: 'string' },
                       {name: 'autreDelegation'   , type: 'string' }
                   ]
               })
           });
           

  var grid1 = new xg.GridPanel({
        id   :'DispositifListCurrentGrid',
        store: dispositifListCurrentStore,
        cm   : new xg.ColumnModel([
            {id:'idDCurrentCol'                 , header: "Id"              , width: 30 , sortable: true, dataIndex: 'idDispositif'     },
            {id:'idTypeDispositifDCurrentCol'   , header: "Type"            , width: 150, sortable: true, dataIndex: 'idTypeDispositif' , renderer:miDispositifCs.typeCellRenderer},
            {id:'indicatifVehiculeDCurrentCol'  , header: "Indicatif"       , width: 150, sortable: true, dataIndex: 'indicatifVehicule'},
            {id:'dhDebutDCurrentCol'            , header: "Date Début Vac." , width: 120, sortable: true, renderer: Ext.util.Format.dateRenderer('d/m/Y H:i:s'), dataIndex: 'dhDebut'},
            {id:'dhFinDCurrentCol'              , header: "Date Fin Vac."   , width: 120, sortable: true, renderer: Ext.util.Format.dateRenderer('d/m/Y H:i:s'), dataIndex: 'dhFin'},
            {id:'idDelegationDCurrentCol'       , header: "Délégation"      , width: 150, sortable: true, dataIndex: 'idDelegation'     , renderer:miDispositifCs.delegationCellRenderer},
            {id:'idEtatDispositifDCurrentCol'   , header: "Etat"            , width: 150, sortable: true, dataIndex: 'idEtatDispositif' , renderer:miDispositifCs.etatDispositifCellRenderer}
        ]),
        viewConfig: {
            forceFit:true
        },
        collapsible : false,
        animCollapse: false,
        height      : 400,
        iconCls     : 'icon-grid',
        renderTo    : 'DispositifListCurrent',
        listeners   :{
          'rowdblclick':miDispositifCs.gridRowDoubleClickHandler
        },
        bbar:new Ext.PagingToolbar({
          pageSize   : 5,
          store      : dispositifListCurrentStore,
          displayInfo: true,
          displayMsg : 'Dispositifs(s) {0} à {1} de {2}',
          emptyMsg   : 'aucun dispositif actif'
        })
    });
  grid1.getStore().load({params: {start:0, limit:5}});
  

  /*Combo box pour selectionner le type de role a ajouter   Ext.getCmp('dispositifRoleList').selectByValue(9);*/
  var roleToSearchComboBox =  new Ext.form.ComboBox({
                  id:'dispositifRoleList',
                  store: new Ext.data.ArrayStore({
                    idIndex:0,
                    fields: ['id_role', 'label_role']
                  }),
                  valueField    : 'id_role',
                  displayField  : 'label_role',
                  mode          : 'local',
                  editable      : false,
                  triggerAction : 'all',
                  emptyText     : 'Selectionner un role...',
                  applyTo       : 'DispositifEquipierSearchRoleInput',
                  width         : 170,
                  listWidth     : 170,
                  selectOnFocus : true
              })

  
/* *************** recherche délégation ***********************/             
              
  var delegationSearchDataStore = new Ext.data.Store({
      proxy: new Ext.ux.rs.data.DwrProxy({
             call           : MonitorInput.searchDelegation,
             args           : [],
             proxyConfig    : Ext.ux.rs.data.PAGING_WITH_SORT_AND_FILTER,
             filterCallBack : function()
             {
                var search = Ext.getCmp('DelegationSearch').getValue();
                
                return [new Ext.ux.rs.data.FilterObject('search',search,'=')]
             }
        }),
        reader: new Ext.ux.rs.data.JsonReader({
                 root: 'data',
        totalProperty: 'totalCount'  ,
                   id: 'idDelegation',
               fields:
                   [
                       {name: 'idDelegation'              , type: 'int'     },
                       {name: 'nom'                       , type: 'string'  },
                       {name: 'departement'               , type: 'string'  }
                       
                   ]
               })
    });

    var resultTplDelegation = new Ext.XTemplate(
        '<tpl for="."><div class="search-item">',
            '<h3><span>{nom}</span>{departement}</h3>',
        '</div></tpl>'
    ); 

    var searchDelegationComboBox = new Ext.form.ComboBox({
        id          : 'DelegationSearch', 
        store       : delegationSearchDataStore,
        displayField: 'nom',
        loadingText : 'Recherche en cours...',
        width       : 200,
        listWidth   : 300,
        pageSize    : 10,
        minChars    : 1,
        hideTrigger : true,
        tpl         : resultTplDelegation,
        itemSelector: 'div.search-item',
        applyTo     : 'DispositifDelegation',
        onSelect    : MonitorInputDispositifCs.prototype.selectDelegation
    });            
              
              
 /* Combo Box de recherche d'équipier*/ 
  var equipierSearchDataStore = new Ext.data.Store({
      proxy: new Ext.ux.rs.data.DwrProxy({
             call           : MonitorInputDispositif.searchEquipier,
             args           : [],
             proxyConfig    : Ext.ux.rs.data.PAGING_WITH_SORT_AND_FILTER,
             filterCallBack : function()
             {
              
                var role   = Ext.getCmp('dispositifRoleList'      ).getValue();
                var search = Ext.getCmp('DispositifEquipierSearch').getValue();
                
                if(role =='')
                  return [];
                
                return [new Ext.ux.rs.data.FilterObject('idRole',role  ,'='),
                        new Ext.ux.rs.data.FilterObject('search',search,'=')]
             }
        }),
        reader: new Ext.ux.rs.data.JsonReader({
                 root: 'data',
        totalProperty: 'totalCount',
                   id: 'idEquipier',
               fields:
                   [
                       {name: 'idEquipier'                , type: 'int'     },
                       {name: 'homme'                     , type: 'boolean' },
                       {name: 'numNivol'                  , type: 'string'  },
                       {name: 'nom'                       , type: 'string'  },
                       {name: 'prenom'                    , type: 'string'  },
                       {name: 'mobile'                    , type: 'string'  },
                       {name: 'email'                     , type: 'string'  },
                       {name: 'delegation.idDelegation'   , type: 'int'     },
                       {name: 'idRoleDansDispositif'      , type: 'int'     },
                       {name: 'enEvaluationDansDispositif', type: 'boolean' }
                   ]
               })
    });

    var resultTpl = new Ext.XTemplate(
        '<tpl for="."><div class="search-item">',
            '<h3><span>{numNivol}</span>{[this.getSexImg(values)]} {prenom} {nom}</h3>',//{delegation.idDelegation}
            '{[this.getDelegation(values)]}',
        '</div></tpl>',
        {
          getDelegation:function(values)
          {
            return crfIrpUtils.getLabelFor("Delegations", values["delegation.idDelegation"]);
          },
          getSexImg:function(values)
          {
            return '<img src="'+contextPath+'/img/monitorInput/user'+(values.homme?'':'_female')+'.png" alt="'+(values.homme?'Homme':'Femme')+'"/> ';
          }
        }
    ); 

    var searchEquipierComboBox = new Ext.form.ComboBox({
        id          : 'DispositifEquipierSearch', 
        store       : equipierSearchDataStore,
        displayField: 'numNivol',
        loadingText : 'Recherche en cours...',
        width       : 300,
        listWidth   : 300,
        pageSize    : 10,
        minChars    : 1,
        hideTrigger : true,
        tpl         : resultTpl,
        itemSelector: 'div.search-item',
        applyTo     : 'DispositifEquipierSearchInput',
        onSelect    : MonitorInputDispositifCs.prototype.addEquipierConfirm
    });
  /* FIN Combo Box de recherche d'équipier*/
  
  
/*  var dataStoreForEquipierList = new Ext.data.ArrayStore({
      id:0,
      fields: [
         {name: 'idEquipier'                , type: 'int'     },
         {name: 'numNivol'                                    },
         {name: 'nom'                                         },
         {name: 'prenom'                                      },
         {name: 'homme'                     , type: 'boolean' },
         {name: 'mobile'                                      },
         {name: 'idRoleDansDispositif'      , type: 'int'     },
         {name: 'enEvaluationDansDispositif', type: 'boolean' }
      ]
  }); */

 var dataStoreForEquipierList = new Ext.data.Store({
      proxy: new Ext.ux.rs.data.DwrProxy({
             call           : MonitorInputDispositif.searchEquipier,
             args           : [],
             proxyConfig    : Ext.ux.rs.data.NO_PAGING,
             filterCallBack : Ext.EmptyFn,
             api            :{
                //read  :MonitorInputDispositif.getItemsList,
                //create:MonitorInputDispositif.save,
                update :MonitorInputDispositif.updateEquipierInDispositif,
                destroy:MonitorInputDispositif.deleteEquipierInDispositif
             },
             paramNames     :{
                read  :['filters','start','limit','sort','dir','query'],
                create:['data'],
                update:['data']
             }
        }),  
          reader: new Ext.ux.rs.data.JsonReader({
                 root: 'data',
        totalProperty: 'totalCount',
                   id: 'idEquipier',
               fields:
                   [
                       {name: 'idEquipier'                , type: 'int'     },
                       {name: 'homme'                     , type: 'boolean' },
                       {name: 'numNivol'                  , type: 'string'  },
                       {name: 'nom'                       , type: 'string'  },
                       {name: 'prenom'                    , type: 'string'  },
                       {name: 'mobile'                    , type: 'string'  },
                       {name: 'email'                     , type: 'string'  },
                       {name: 'delegation.idDelegation'   , type: 'int'     },
                       {name: 'idRoleDansDispositif'      , type: 'int'     },
                       {name: 'enEvaluationDansDispositif', type: 'boolean' }
                   ]
               })
    });  

    
  var checkboxSelectionModel = new xg.CheckboxSelectionModel({
      singleSelect: true,
      listeners   : {
          // On selection change, set enabled state of the removeButton
          // which was placed into the GridPanel using the ref config
          selectionchange: function(sm) {
              if (sm.getCount()) 
              {
                dispositifEquipierListGrid.evaluationButton.enable();
                dispositifEquipierListGrid.removeButton    .enable();    
              } 
              else 
              {
                dispositifEquipierListGrid.evaluationButton.disable();
                dispositifEquipierListGrid.removeButton    .disable();
              }
          }
      }
  });
    
    
  var dispositifEquipierListGrid = new xg.GridPanel({
        id   :'DispositifEquipierListGrid',
        store: dataStoreForEquipierList,
        cm   : new xg.ColumnModel([
            checkboxSelectionModel,
            {id:'DELG_nivol'       , header: "Nivol"      , width: 70 , sortable: true , dataIndex: 'numNivol'                                                                        },
            {id:'DELG_nomprenom'   , header: "Nom Prénom" , width: 290, sortable: true , dataIndex: 'nom'                       , renderer:miDispositifCs.DELGNomPrenomCellRenderer   },
            {id:'DELG_mobile'      , header: "Mobile"     , width: 80 , sortable: true , dataIndex: 'mobile'                                                                          },
            {id:'DELG_role'        , header: "Role"       , width: 100, sortable: true , dataIndex: 'idRoleDansDispositif'      , renderer:miDispositifCs.DELGRoleCellRenderer        },
            {id:'DELG_evalutation' , header: "En Eval?"   , width: 50 , sortable: true , dataIndex: 'enEvaluationDansDispositif',
              xtype: 'booleancolumn',
           trueText: 'Oui',
          falseText: 'Non'
          },
            {id:'DELG_delete'      , header: "Suppresion" , width: 80 , sortable: false, dataIndex: 'idEquipier'                , renderer:miDispositifCs.DELGSuppressionCellRenderer ,menuDisabled:true}
        ]),
        sm          : checkboxSelectionModel,
        collapsible : false,
        animCollapse: false,
        height      : 200,
        width       : 700,
        iconCls     : 'icon-grid',
        renderTo    : 'DispositifEquipierList',
        tbar        : [{
            text    : 'Retirer l\'équipier',
            tooltip : 'Retirer l\'équipier du dispositif',
            iconCls : 'removeEquipier',
            handler : MonitorInputDispositifCs.prototype.removeEquipierFromDispositif,
            //Place a reference in the GridPanel
            ref     : '../removeButton',
            disabled: true
        },{
            text    : 'Option d\'évaluation',
            tooltip : 'Cocher un équipier puis cliquer sur ce bouton pour mettre l\'équipier en évaluation',
            iconCls : 'evaluation',
            handler : MonitorInputDispositifCs.prototype.evaluationButtonHandler,

            // Place a reference in the GridPanel
            ref     : '../evaluationButton',
            disabled: true
        }]
    });
};

MonitorInputDispositifCs.prototype.evaluationButtonHandler=function(button, event)
{
  var sm     = Ext.getCmp('DispositifEquipierListGrid').getSelectionModel();
  var record = sm.getSelected();
  
  if(record.data.idRoleDansDispositif != 9)
  {
    Ext.Msg.alert('Sélection invalide','Seul un PSE2 peut etre mise en évaluation pour un role supérieur (Chauffeur, CI).<br/><br/>Ex: Un CI A gère le dispositif. Le PSE2 B est en évaluation pour devenir CI. A est ajouter en tant que CI, B en tant que PSE2, évaluer en tant que CI');
    sm.clearSelections();
    return;
  }
  //TODO : window qui propose de cocher en evalution et de choisir le role avec deux bouton, sauver et annuler
  //sur sauvegarde, update en DB et reload de la grid
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

MonitorInputDispositifCs.prototype.DELGNomPrenomCellRenderer=function(value, metadata, record, rowIndex, colIndex, store)
{
  return '<img src="'+contextPath+'/img/monitorInput/user'+(record.data.homme?'':'_female')+'.png" alt="'+(record.data.homme?'Homme':'Femme')+'"/> '+record.data.nom+' '+record.data.prenom;
};

MonitorInputDispositifCs.prototype.DELGRoleCellRenderer=function(value, metadata, record, rowIndex, colIndex, store)
{
  
  //TODO pour le CI 'award_star_gold_1.png'
  return crfIrpUtils.getLabelFor('RolesEquipier', value );
};

MonitorInputDispositifCs.prototype.DELGSuppressionCellRenderer=function(value, metadata, record, rowIndex, colIndex, store)
{
  return '<img src="'+contextPath+'/img/monitorInput/user_delete.png" ' +
         'id="CoRegulateurDel_Button_'+record.data.numNivol+'" alt="Supprimer l\'équipier '+record.data.nom+' '+record.data.prenom+'"  ' +
         'onClick="miDispositifCs.removeEquipierFromDispositif(\''+record.data.idEquipier+'\', \''+record.data.numNivol+'\',\''+record.data.nom+' '+record.data.prenom+'\');"/>';
};




MonitorInputDispositifCs.prototype.delegationCellRenderer=function(value, metadata, record, rowIndex, colIndex, store)
{
  if(value != null)
    return crfIrpUtils.getLabelFor('Delegations', value);
  else
    return "";
};
MonitorInputDispositifCs.prototype.etatDispositifCellRenderer=function(value, metadata, record, rowIndex, colIndex, store)
{
  if(value != null)
    return crfIrpUtils.getLabelFor('EtatsDispositif', value);
  else
    return "";
};
MonitorInputDispositifCs.prototype.typeCellRenderer=function(value, metadata, record, rowIndex, colIndex, store)
{
  if(value != null)
    return crfIrpUtils.getLabelFor('TypesDispositif', value);
  else
    return "";

};

MonitorInputDispositifCs.prototype.endOfEditionEvent=function()
{
  if(this.formValidationWindow == null)
  {
    this.formValidationWindow = new Ext.ux.Utils.FormValidationWindow({
      
       validateFunction: function(){miDispositifCs.doEndOfEditionEvent();},
       gridTitle       : 'Vérification du dispositif',
       mandatoryAlertBoxTitle : 'Le dispositif ne peut pas etre publié',
       mandatoryAlertBoxText  : 'Des conditions nécessaires ne sont pas remplies, veuillez les corriger'
     }
    );
  }
  
  var hasErrorOrWarning = false;
  var messageList       = [];
  var typeDispositif    = Ext.get('DispositifType').dom.value;
  
  //Clean old validation
  Ext.get('DispositifIdentification').dom.style.backgroundColor='#FFFFFF';
  
  if(typeDispositif == 0)
  {
    Ext.get('DispositifIdentification').dom.style.backgroundColor='#FF0000';
    messageList.push(['Veuillez définir le type de dispositif',1]);
    hasErrorOrWarning=true;
  }
  
  if( Ext.get('DispositifIndicatif').dom.value =='')
  {
    Ext.get('DispositifIdentification').dom.style.backgroundColor='#FF0000';
    messageList.push(['Veuillez définir l\'indicatif du dispositif',1]);
    hasErrorOrWarning=true;
  }
  
  if(Ext.get('DispositifDelegation_id').dom.value =='')
  {
    Ext.get('DispositifIdentification').dom.style.backgroundColor='#FF0000';
    messageList.push(['Veuillez définir la délégation responsable du dispositif',1]);
    hasErrorOrWarning=true;
  }
  
  if(
      Ext.get('DispositifDefibrilateurTypeDSA').dom.checked == false &&
      Ext.get('DispositifDefibrilateurTypeDEA').dom.checked == false ||
  
      Ext.get('DispositifDefibrilateurCompletOui').dom.checked == false
    )
  {
    messageList.push(['Votre dispositif n\'a pas de DSA ou DEA Complet, <br/>veuiller faire corriger la situation au dispositif avant de passer le dispositif comme "Disponible"',2]);
    hasErrorOrWarning=true;  
  }
  
  
  
  if(Ext.get('dispositifCurrentAddressRue').dom.value =='')
  {
    messageList.push(['Veuillez définir la position actuelle du dispositif (pour l\'affichage sur la carte)',2]);
    hasErrorOrWarning=true;
  }
  

  
  
  var typeDispositifInfo = CrfIrpUtils.prototype.typeDispositif[typeDispositif];


  var equipierStore = Ext.getCmp('DispositifEquipierListGrid').getStore();
  
  var nbHommeArriere  = 0 ;
  var countByRole     = []; 
  var nbEquipier      = 0 ;
  
  equipierStore.each(function(record){
    //compte total 
    nbEquipier++;
    
    //compte par role
    if(countByRole[record.data.idRoleDansDispositif]==null)
      countByRole[record.data.idRoleDansDispositif]=1;
    else
      countByRole[record.data.idRoleDansDispositif]=countByRole[record.data.idRoleDansDispositif]+1;
    //compte nombre d'homme a l'arriere du camion
    if( (record.data.idRoleDansDispositif == 9   ||
         record.data.idRoleDansDispositif == 10  ||
         record.data.idRoleDansDispositif == 11) &&
         record.data.homme                == true
        )
    {
      nbHommeArriere++;
    }
    
  });
  if(typeDispositif!="0")
  {
    MonitorInputDispositifCs.prototype.dispositifTypeDefinition[typeDispositif].each(function(roleDef){
      
       var count = countByRole[roleDef.idRole];
       if(count == null)
        count = 0;
       var nombreMin = roleDef.nombreMin;
       var nombreMax = roleDef.nombreMax
       
       if(count < nombreMin)
       { 
         messageList.push(['le dispositif n\'a pas sufisament ('+count+'<'+nombreMin+') d\'equipier dont le role est "'+crfIrpUtils.getLabelFor('RolesEquipier',roleDef.idRole)+'"',1]);
         hasErrorOrWarning=true;
       }
       
       if(count > nombreMax)
       {
         messageList.push(['le dispositif a trop ('+count+'>'+nombreMax+') d\'equipier dont le role est "'+crfIrpUtils.getLabelFor('RolesEquipier',roleDef.idRole)+'"',1]);
         hasErrorOrWarning=true;
       }
    });
    if(nbEquipier > typeDispositifInfo.nombreEquipierMax)
    {
      messageList.push(['Le nombre d\'équipier est supérieur au nombre maximum d\'équipier',1]);
      hasErrorOrWarning=true;
    }
   
    if(nbHommeArriere == 0)
    {
      messageList.push(['le véhicule n\'a pas d\'homme dans la cellule arrière',2]);
      hasErrorOrWarning=true;
    }
    
    if(MonitorInputDispositifCs.prototype.updateVolumeAndAutonomie() < 3)
    {
      messageList.push(['le véhicule n\'a pas le volume réglementaire requis pour un réseau de secours',2]);
      hasErrorOrWarning=true;
    } 
  }
  
 
  
  if( Ext.get('DispositifStatus').dom.value =='11' || Ext.get('dispositifActif').dom.value!='' && Ext.get('dispositifActif').dom.value!='true' && Ext.get('DispositifStatus').dom.value != -1)
  {
    Ext.Msg.alert('Publication Impossible', 'Vous ne pouvez plus publier de modification sur ce dispositif car il a fini sa vacation.');
  }
  else
  {
    if(hasErrorOrWarning == true)
    { 
      this.formValidationWindow.display(messageList);
    }
    else
      this.doEndOfEditionEvent();    
  }
};

MonitorInputDispositifCs.prototype.doEndOfEditionEvent=function()
{
  var numberOfMandatoryItems = Ext.getCmp('FormValidationWindow').getStore().query('testResult',1).getCount();
  if(numberOfMandatoryItems>0)
  {
    Ext.Msg.alert('Le dispositif ne peut être ajouté','Des conditions nécessaires ne sont pas remplies, veuillez les corriger');
    return false;
  }
  else
    Ext.getCmp('FormValidationWindow').hide();
  
  var isCreation = Ext.get('dispositif_isCreation_field').getValue();
  MonitorInputDispositif.endOfEditionEvent($('dispositif_id_field').value, $('DispositifStatus').value, isCreation, this.endOfEditionEventReturn);
};





MonitorInputDispositifCs.prototype.endOfEditionEventReturn=function()
{
  miDispositifCs.resetDispositifForm();
  miDispositifCs.hideDispositif();
  PageBus.publish("monitor.input.dispositif.updateThatChangeLists",null);
  
};

MonitorInputDispositifCs.prototype.resetDispositifForm=function()
{


  for(i=0,count=this.fieldList.length;i<count;i++)
    dwr.util.setValue(this.fieldList[i], '');

  Ext.get('DispositifVolumeTotal'   ).update('');
  Ext.get('DispositifAutonomieTotal').update('');
  Ext.get('dispositifCurrentGoogleAdressCheckStatus' ).dom.src=contextPath+"/img/pix.png";
  Ext.get('dispositifPreviousGoogleAdressCheckStatus').dom.src=contextPath+"/img/pix.png"
  
  this.updateVolumeAndAutonomie();
  
  Ext.getCmp('DispositifEquipierSearch'   ).getStore().removeAll();
  Ext.getCmp('DispositifEquipierListGrid' ).getStore().removeAll();
  Ext.getCmp('dispositifRoleList'         ).getStore().removeAll();
  Ext.getCmp('DispositifEquipierSearch'   ).setValue('');
  
  dwr.util.setValue('DispositifStatus',-1);
};


MonitorInputDispositifCs.prototype.fieldList = [ 
    'dispositif_id_field',
    'dispositif_isCreation_field',
    'DispositifType',
    'dispositifActif',
    'DispositifIndicatif',
    'DispositifDelegation',
    'DispositifDelegation_id', 
    'DispositifDelegation_autreNom',
    'DispositifDHDebut',
    'DispositifDHFin',
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
    'DispositifIdentiteMedecin',
    'dispositifCurrentAddressRue'            ,
    'dispositifCurrentAddressCodePostal'     ,
    'dispositifCurrentAddressVille'          ,
    'dispositifCurrentAddressCoordinateLat'  ,
    'dispositifCurrentAddressCoordinateLong' ,
    'dispositifPreviousAddressRue'           ,
    'dispositifPreviousAddressCodePostal'    ,
    'dispositifPreviousAddressVille'         ,
    'dispositifPreviousAddressCoordinateLat' ,
    'dispositifPreviousAddressCoordinateLong'];

MonitorInputDispositifCs.prototype.getDispositifTypeDefinition=function()
{
  MonitorInputDispositif.getDispositifTypeDefinition(this.getDispositifTypeDefinitionReturn);
};

MonitorInputDispositifCs.prototype.getDispositifTypeDefinitionReturn=function(dispositifTypeDefinition)
{
  MonitorInputDispositifCs.prototype.dispositifTypeDefinition = dispositifTypeDefinition;
};


MonitorInputDispositifCs.prototype.addEquipierConfirm=function(record)
{
  Ext.Msg.confirm('Veuillez confirmer l\'ajout de l\'équiper',
  'Etes vous sur de vouloir ajouter l\'équipier : <br/><br/>"<b>'+record.data.nom+' '+record.data.prenom+'</b>" <br/> N°"<b>'+record.data.numNivol+'</b>"<br/> délégation de "<b>'+crfIrpUtils.getLabelFor('Delegations', record.data['delegation.idDelegation'])+'</b>" <br/><br/>au dispositif ?',
  function(btn){
    if(btn == 'yes')
    {
      miDispositifCs.addEquipier(this);//this == record
      Ext.getCmp('DispositifEquipierSearch').setValue('');
      Ext.getCmp('DispositifEquipierSearch').getStore().reload();//Si on refait une recherche avec le meme critere, Ext ne rappel pas le serveur alors que l'équipier n'est plus séléctionnable (puisque ajouté)
    }
  },
  record
  )
};


MonitorInputDispositifCs.prototype.addEquipier=function(record)
{
  var idRole = Ext.getCmp('dispositifRoleList'      ).getValue();
  
  MonitorInputDispositif.addEquipierToDispositif( $('dispositif_id_field'           ).value, 
                                                  idRole, 
                                                  record.data.idEquipier,
                                                  miDispositifCs.updateListEquipierReturn
                                                );

};


MonitorInputDispositifCs.prototype.initDispositif=function()
{
  dwr.util.removeAllOptions('DispositifType');
  dwr.util.removeAllOptions('DispositifStatus');
  dwr.util.addOptions( 'DispositifType', 
                      crfIrpUtils.allList['TypesDispositif'],
                      'id',
                      'label');
  
  dwr.util.addOptions( 'DispositifStatus', 
                       crfIrpUtils.allList['EtatsDispositif'],
                       'id',
                       'label');
};

MonitorInputDispositifCs.prototype.createNewEmptyDispositif=function()
{
  Ext.getCmp('DispositifListEastPanel').collapse();
  this.resetDispositifForm();
  Ext.get('dispositif_isCreation_field').dom.setValue(true);
  MonitorInputDispositif.createEmptyDispositif(this.createNewEmptyDispositifReturn);
};

MonitorInputDispositifCs.prototype.createNewEmptyDispositifReturn=function(dispositif)
{
  $('dispositif_id_field').value=dispositif.idDispositif;
  dwr.util.setValue('dispositif_id_span', dispositif.idDispositif);
  Ext.get('dispositif_title_indicatif').update('Nouveau Dispositif');
  $('DispositifDHDebut').value=dispositif.dhDebutStr;
  $('DispositifDHFin'  ).value=dispositif.dhFinStr;
  
  Ext.get('DispositifEdit').slideIn();
  Ext.getCmp('DispositifPanelTopToolbar').setVisible(true);
};

MonitorInputDispositifCs.prototype.displayInterventionsList=function()
{
   Ext.ux.Utils.InterventionList.displayInterventionList('DISPOSITIF', $('dispositif_id_field').value,
        function(rowData){
          miBilanCs.editBilan(rowData.idIntervention);
          Ext.getCmp('InterventListWindow').hide();
        }
      );
};


MonitorInputDispositifCs.prototype.editDispositif=function(idDispositif)
{
  window.focus();
  this.resetDispositifForm();
  MonitorInputDispositif.getDispositif(idDispositif, this.editDispositifReturn);
};

MonitorInputDispositifCs.prototype.editDispositifReturn=function(dispositif)
{
  miDispositifCs.initDispositifForm(dispositif);
  var centerRegion = Ext.getCmp('monitorInputCenterRegion');
  var currentPanel = centerRegion.getActiveTab();

  if(currentPanel.id != 'monitorInputDispositifPanel')
    centerRegion.activate('monitorInputDispositifPanel');
  
  Ext.getCmp('DispositifListEastPanel').collapse();
  
  Ext.get('dispositif_isCreation_field').dom.setValue(!dispositif.creationTerminee);
  
  var dispositifForm = Ext.get('DispositifEdit');
  if(!dispositifForm.isVisible())
    dispositifForm.slideIn();
  Ext.getCmp('DispositifPanelTopToolbar').setVisible(true);
};






MonitorInputDispositifCs.prototype.deleteDispositifConfirm=function()
{
  var title = 'Suppression du dispositif N°'+$('dispositif_id_field').value+' - '+$('dispositif_title_indicatif').innerHTML;
  var msg   = 'Etes vous sur de vouloir supprimer le dispositif N°'+$('dispositif_id_field').value+' - '+$('dispositif_title_indicatif').innerHTML+' ?';
  
  Ext.Msg.confirm(title, msg, function(btn){
    if(btn == 'yes')
    {
      miDispositifCs.deleteDispositif();
    }
  });  
};



MonitorInputDispositifCs.prototype.deleteDispositif=function()
{
	MonitorInputDispositif.deleteDispositif($('dispositif_id_field').value, this.deleteDispositifReturn);
};

MonitorInputDispositifCs.prototype.deleteDispositifReturn=function()
{  
  miDispositifCs.hideDispositif();
	PageBus.publish("monitor.input.dispositif.updateThatChangeLists",null);
};

MonitorInputDispositifCs.prototype.hideDispositif=function()
{
  Ext.getCmp('DispositifPanelTopToolbar'   ).setVisible(false);
  Ext.get   ('DispositifEdit'              ).slideOut  ();
  Ext.getCmp('DispositifListEastPanel'     ).expand    ();
  
  var dispositifCheckWindow = Ext.getCmp('DispositifCheckWindow'       );
  if(dispositifCheckWindow!=null)
  {
    dispositifCheckWindow.hide      ();  
  }
};


MonitorInputDispositifCs.prototype.endOfVacationConfirm=function()
{
  var title = 'Confirmer la fin de vacation du dispositif N°'+$('dispositif_id_field').value+' - '+$('dispositif_title_indicatif').innerHTML;
  var msg   = 'Etes vous sur de vouloir confirmer la fin de vacation du dispositif N°'+$('dispositif_id_field').value+' - '+$('dispositif_title_indicatif').innerHTML+' ?';
  
  Ext.Msg.confirm(title, msg, function(btn){
    if(btn == 'yes')
    {
      miDispositifCs.endOfVacation();
    }
  });    
};


MonitorInputDispositifCs.prototype.endOfVacation=function()
{
	MonitorInputDispositif.endOfVacation($('dispositif_id_field').value, this.endOfVacationReturn);
};

MonitorInputDispositifCs.prototype.endOfVacationReturn=function(idCurrentIntervention)
{
  if(idCurrentIntervention == 0)
  {
    PageBus.publish("monitor.input.dispositif.updateThatChangeLists",null);
  }
  else
  {
    var title = 'Annulation impossible - intervention affectée';
    var msg   = 'Une intervention est affectée à ce dispositif, veuillez annuler l\'intervention au préalable.<br/></br>Pour editer l\'intervention afin de l\'annuler, cliquez sur Oui'; 
    Ext.Msg.confirm(title, msg, function(btn){
    if(btn == 'yes')
    {
      miBilanCs.editBilan(idCurrentIntervention);
    }
  });    
    
  }
	
};


MonitorInputDispositifCs.prototype.initDispositifForm=function(dispositif)
{
  dwr.util.setValue('dispositif_id_span'            , dispositif.idDispositif);
  dwr.util.setValue('dispositif_id_field'           , dispositif.idDispositif);
  
  dwr.util.setValue('dispositif_title_indicatif'    , dispositif.indicatifVehicule);
  dwr.util.setValue('DispositifIndicatif'           , dispositif.indicatifVehicule);
  dwr.util.setValue('DispositifType'                , dispositif.idTypeDispositif);
  dwr.util.setValue('dispositifActif'               , dispositif.actif);
  if(dispositif.idTypeDispositif!=0)
  {
    miDispositifCs.setRoles(dispositif.idTypeDispositif);
  }
  dwr.util.setValue('DispositifDelegation'          , dispositif.idDelegation!=0?crfIrpUtils.getLabelFor('Delegations',dispositif.idDelegation):'N/A');
  dwr.util.setValue('DispositifDelegation_id'       , dispositif.idDelegation);
  dwr.util.setValue('DispositifDelegation_autreNom' , dispositif.autreDelegation);
  
  dwr.util.setValue('DispositifDHDebut'             , crfIrpUtils.getFullDate(dispositif.dhDebut));
  dwr.util.setValue('DispositifDHFin'               , crfIrpUtils.getFullDate(dispositif.dhFin  ));
  
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

  
  dwr.util.setValue('dispositifCurrentAddressRue'           , dispositif.currentPosition.rue              );
  dwr.util.setValue('dispositifCurrentAddressCodePostal'    , dispositif.currentPosition.codePostal       );
  dwr.util.setValue('dispositifCurrentAddressVille'         , dispositif.currentPosition.ville            );
  dwr.util.setValue('dispositifCurrentAddressCoordinateLat' , dispositif.currentPosition.googleCoordsLat  );
  dwr.util.setValue('dispositifCurrentAddressCoordinateLong', dispositif.currentPosition.googleCoordsLong );

  
  
  if(dispositif.currentPosition.googleCoordsLat != 0)
    Ext.get('dispositifCurrentGoogleAdressCheckStatus').dom.src=contextPath+"/img/famfamfam/accept.png";
  else
    Ext.get('dispositifCurrentGoogleAdressCheckStatus').dom.src=contextPath+"/img/pix.png"
  
  
  dwr.util.setValue('dispositifPreviousAddressRue'           , dispositif.previousPosition.rue             );
  dwr.util.setValue('dispositifPreviousAddressCodePostal'    , dispositif.previousPosition.codePostal      );
  dwr.util.setValue('dispositifPreviousAddressVille'         , dispositif.previousPosition.ville           );
  dwr.util.setValue('dispositifPreviousAddressCoordinateLat' , dispositif.previousPosition.googleCoordsLat );
  dwr.util.setValue('dispositifPreviousAddressCoordinateLong', dispositif.previousPosition.googleCoordsLong);

  if( dispositif.previousPosition.googleCoordsLat != 0)
    Ext.get('dispositifPreviousGoogleAdressCheckStatus').dom.src=contextPath+"/img/famfamfam/accept.png";
  else
    Ext.get('dispositifPreviousGoogleAdressCheckStatus').dom.src=contextPath+"/img/pix.png"

  
  
  this.updateVolumeAndAutonomie();
  if(dispositif.idTypeDispositif!=0)// si pas de type de dispositif, aucun équipier ne  peut etre saisie.
  {
    var listRangeOfEquipier={totalCount:dispositif.equipierList.length, data:dispositif.equipierList};
    this.updateListEquipierReturn(listRangeOfEquipier);
  }
    
};

MonitorInputDispositifCs.prototype.setRoles=function(idTypeDispositif)
{
  var roleListCombo = Ext.getCmp('dispositifRoleList');
  var store         = roleListCombo.getStore();
  store.removeAll();
  var dispositifTypeDefinition = MonitorInputDispositifCs.prototype.dispositifTypeDefinition[idTypeDispositif];
  
  if(dispositifTypeDefinition == null)
    throw "Dispositif type definition is not known";
  
  var arrayOfRole = Array();
  
  for(i=0,count=dispositifTypeDefinition.length;i<count;i++)
  {
    var def = dispositifTypeDefinition[i];
    
    var labelRole = crfIrpUtils.getLabelFor('RolesEquipier', def.idRole );
    
    arrayOfRole[i]=[def.idRole, ' ['+def.nombreMin+' à '+def.nombreMax+']  -  ' +labelRole ];
  }
  
  
  store.loadData(arrayOfRole);
  
  try
  {
    roleListCombo.select(1,true);  
  }
  catch(ex)
  {
    if(consoleEnabled)
    {
      console.log("Error while setting default role (equipier on dispositif",ex);
    }
  }
  
  
};



MonitorInputDispositifCs.prototype.updateListEquipierReturn=function(listRangeOfEquipier)
{
  Ext.getCmp('DispositifEquipierListGrid').getStore().loadData(listRangeOfEquipier);
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
  else 
    $('DispositifVolumeTotal'   ).style.backgroundColor='#FFFFFF';
  return volumeTotal;
};

//removeEquipierFromDispositif(int idDispositif, int equipierRank, int equipierId) 
MonitorInputDispositifCs.prototype.removeEquipierFromDispositif=function(button, event)
{
  var sm     = Ext.getCmp('DispositifEquipierListGrid').getSelectionModel();
  var record = sm.getSelected();

  var idEquipier = record.data.idEquipier , 
      numNivol   = record.data.nivol      , 
      nom        = record.data.nom        , 
      prenom     = record.data.prenom     ;
      
  if(crfIrpUtils.pleaseConfirm('Confirmez vous la suppression de '+nom+' '+prenom+' ('+numNivol+') ?'))
  {
    MonitorInputDispositif.removeEquipierFromDispositif( $('dispositif_id_field').value,
                                                         idEquipier                    ,
                                                         miDispositifCs.updateListEquipierReturn
                                                       );
  }
};


MonitorInputDispositifCs.prototype.updateDispositifRadioField=function(fieldId)
{
  if(fieldId == 'dsa_td')
  {
    $('dsa_td_value').value = dwr.util.getValue('DispositifDefibrilateurType');
    if($('dsa_td_value').value == 'NO')
    {
      dwr.util.setValue('DispositifDefibrilateurComplet', 'false');
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
    $('dsa_complet_td_value').value = dwr.util.getValue('DispositifDefibrilateurComplet');
    this.updateDispositifBooleanField('dsa_complet_td_value', 'dsa_complet', 'dsa_td_value');
  }
};


/************************Gestion*des*adresses*****************************************/

MonitorInputDispositifCs.prototype.updateAddress=function(fieldId, fieldName, current)
{
  var which     = current ? 'Current':'Previous';
  
  var rue       =$('dispositif'+which+'AddressRue'       );
  var codePostal=$('dispositif'+which+'AddressCodePostal');
  var ville     =$('dispositif'+which+'AddressVille'     );

  rue       .value=rue       .value.strip();
  codePostal.value=codePostal.value.strip();
  ville     .value=ville     .value.strip();

  this.updateDispositifStringField(fieldId, fieldName);
  
  if( rue       .value != '' && rue       .oldValue != rue       .value &&
      codePostal.value != '' && codePostal.oldValue != codePostal.value &&
      ville     .value != '' && ville     .oldValue != ville     .value   )
  {// valeur non vide et non différente de la précédente valeur
    googleMapAdressResolver.findCoordinatesForAddress(  rue       .value +', '+
                                                        codePostal.value +', '+
                                                        ville     .value,
                                                        current ? this.updateCurrentAddressReturn      : this.updatePreviousAddressReturn,
                                                        current ? this.updateCurrentAddressErrorReturn : this.updatePreviousAddressErrorReturn);
  }
};

MonitorInputDispositifCs.prototype.updateCurrentAddressReturn=function(place)
{
  MonitorInputDispositifCs.prototype.updateAddressReturn(place, true);
};
MonitorInputDispositifCs.prototype.updatePreviousAddressReturn=function(place)
{
  MonitorInputDispositifCs.prototype.updateAddressReturn(place, false);
};

MonitorInputDispositifCs.prototype.updateAddressReturn=function(place, current)
{
  var coordinates = place.Point.coordinates;
  //ATTENTION, visiblement, les coordonnées google sont fournies dans l'ordre (Longitude,Latitude) alors qu'ils sont utilisés partout ailleurs dans l'ordre (Latitude,Longitude)
  
  var which = current ? 'Current' : 'Previous';
  $('dispositif'+which+'AddressCoordinateLat' ).value=coordinates[1];
  $('dispositif'+which+'AddressCoordinateLong').value=coordinates[0];

  $('dispositif'+which+'GoogleAdressCheckStatus').src=contextPath+"/img/famfamfam/cog.png";
  MonitorInputDispositif.updateGoogleCoordinates(coordinates[1], coordinates[0], $('dispositif_id_field').value, current, MonitorInputDispositifCs.prototype.updateAddressSaveReturn);
};

MonitorInputDispositifCs.prototype.updateAddressSaveReturn=function(current, a, b,c)
{
  var which = current ? 'Current' : 'Previous';
  $('dispositif'+which+'GoogleAdressCheckStatus').src=contextPath+"/img/famfamfam/accept.png";
};

MonitorInputDispositifCs.prototype.updateCurrentAddressErrorReturn=function(response)
{
  MonitorInputDispositifCs.prototype.updateAddressErrorReturn(response, true);
};
MonitorInputDispositifCs.prototype.updatePreviousAddressErrorReturn=function(response)
{
  MonitorInputDispositifCs.prototype.updateAddressErrorReturn(response, false);
};
MonitorInputDispositifCs.prototype.updateAddressErrorReturn=function(response, current)
{
  var icon  = response.Status.code=='GoogleMapsUnavailable'?'disconnect':'exclamation';
  var which = current ? 'Current' : 'Previous';
  $('dispositif'+which+'GoogleAdressCheckStatus').src=contextPath+"/img/famfamfam/"+icon+".png";
};


MonitorInputDispositifCs.prototype.updateDispositifEtat=function(fieldId)
{
  crfIrpUtils.checkField (fieldId);
  crfIrpUtils.fieldSaving(fieldId);
  fieldValue = $(fieldId).value;

  if(fieldValue!='' && fieldValue != $(fieldId).oldValue)
  {
    MonitorInputDispositif.updateDispositifEtat(
                                              $('dispositif_id_field').value, 
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

/************************Méthode*d'update*****************************************/
MonitorInputDispositifCs.prototype.updateDispositifIntField=function(fieldId, fieldName)
{
  crfIrpUtils.checkField (fieldId);
  crfIrpUtils.fieldSaving(fieldId);
  
  var fieldValue = $(fieldId).value;
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
  crfIrpUtils.focusHandling(fieldId);
};

MonitorInputDispositifCs.prototype.updateDispositifDateField=function(fieldId, fieldName)
{
  crfIrpUtils.checkField (fieldId);
  crfIrpUtils.fieldSaving(fieldId);
  
  var fieldValue = $(fieldId).value;
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
  //crfIrpUtils.focusHandling(fieldId);
};


MonitorInputDispositifCs.prototype.updateDispositifFloatField=function(fieldId, fieldName)
{
  crfIrpUtils.checkField (fieldId);
  crfIrpUtils.fieldSaving(fieldId);
  var fieldValue = $(fieldId).value;
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
  crfIrpUtils.focusHandling(fieldId);
};

MonitorInputDispositifCs.prototype.updateDispositifStringField=function(fieldId, fieldName, objectIdForGraphicalEffect)
{
  if(!objectIdForGraphicalEffect)
    objectIdForGraphicalEffect = fieldId;
    
  crfIrpUtils.checkField (fieldId);
  crfIrpUtils.fieldSaving(objectIdForGraphicalEffect);
  var fieldValue = $(fieldId).value;
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
  crfIrpUtils.focusHandling(fieldId);
};

MonitorInputDispositifCs.prototype.updateDispositifBooleanField=function(fieldId, fieldName, objectIdForGraphicalEffect)
{
  if(!objectIdForGraphicalEffect)
    objectIdForGraphicalEffect = fieldId;
    
  crfIrpUtils.checkField (fieldId);
  crfIrpUtils.fieldSaving(objectIdForGraphicalEffect);
  var fieldValue = $(fieldId).value;
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
    
  crfIrpUtils.focusHandling(fieldId);
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

 
 
MonitorInputDispositifCs.prototype.selectDelegation=function(record)
{
  $('DispositifDelegation_id').value = record.data.idDelegation;
  $('DispositifDelegation'   ).value = record.data.nom+' ('+ record.data.departement +')';

  if(record.data.idDelegation==0)
  {
    $('DispositifAutreDelegationIdToUpdate').value='DispositifDelegation';
    alert('Todo : saisie autre delegation');
  }
  else
  {   
    fieldValue = $('DispositifDelegation_id').value;
    if(fieldValue!='' && $('DispositifDelegation').value != $('DispositifDelegation').oldValue)
    {
      MonitorInputDispositif.updateDispositifIntegerField(
                                                $('dispositif_id_field').value, 
                                                'id_delegation_responsable', 
                                                fieldValue, 
                                                function()
                                                {
                                                });
    }
  }
  Ext.getCmp('DelegationSearch').collapse();
};


