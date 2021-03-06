var MonitorInputDispositifCs = Class.create();

MonitorInputDispositifCs.prototype.initialize=function()
{
  this.getDispositifTypeDefinition ();
  
  crfIrpUtils.setupCalendar("DispositifDHDebut","DispositifDHDebut_div","DispositifDHDebut_div", function(event){
      miDispositifCs.updateDispositifDateTimeField(event.id, 'DH_debut');
   });
   
  crfIrpUtils.setupCalendar("DispositifDHFin","DispositifDHFin_div","DispositifDHFin_div", function(event){
       miDispositifCs.updateDispositifDateTimeField(event.id, 'DH_fin');
    });
  
  
  crfIrpUtils.setupCalendar("DispositifDatePatchAdulte1", "DispositifDatePatchAdulte1_div", "DispositifDatePatchAdulte1_th", function(event){
    miDispositifCs.updateDispositifDateField(event.id, 'dsa_date_adulte_1');
    }, 
    'd/m/Y');
  
  crfIrpUtils.setupCalendar("DispositifDatePatchAdulte2", "DispositifDatePatchAdulte2_div","DispositifDatePatchAdulte2_th",  function(event){
    miDispositifCs.updateDispositifDateField(event.id, 'dsa_date_adulte_2');
    }, 
    'd/m/Y');
  
  crfIrpUtils.setupCalendar("DispositifDatePatchEnfant", "DispositifDatePatchEnfant_div", "DispositifDatePatchEnfant_th", function(event){
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
  PageBus.subscribe("list.loaded",  this, this.initDispositif            , null, null);
  PageBus.subscribe("list.loaded",  this, this.initDispositifGrids       , null, null);
  PageBus.subscribe("list.loaded",  this, this.initChooseEvalPersonWindow, null, null);
  
  PageBus.subscribe("monitor.input.dispositif.updateThatChangeLists",  this, this.reloadDispositifLists     , null, null);
};


MonitorInputDispositifCs.prototype.initChooseEvalPersonWindow=function()
{
  
  try
  {
    
    
    var roleEvalueCombo = {
        xtype        : 'combo',
        fieldLabel   : 'Rôle évalué',
        anchor       : '100%',
        id           : 'EvaluationWindowSetRoleEvaluer',
        typeAhead    : true,
        mode         : 'local',
        editable     : false,
        triggerAction: 'all',
        valueField   : 'id',
        displayField : 'label',
        store        : new Ext.data.ArrayStore({
            id      : 0,
            fields  : ['id', 'label'],
            data    : [[0,'Loading...']],
            idIndex : 0
        })
    };
    
    
    var roleEvalueSuivantFunctionButtonHandler = function(button, event)
    {
      
      EvaluationService.getIdEquipierEvaluableForRole(Ext.get   ('dispositif_id_field'           ).getValue(),
                                                      Ext.getCmp('EvaluationWindowSetRoleEvaluer').getValue(),

        function(listEquipier)
        {
          var listEquipierCombo = [];
          var i     = 0;
          
          for(i=0;i<listEquipier.length;i++)
          {
            listEquipierCombo[i] = [listEquipier[i].idEquipier, listEquipier[i].numNivol+' - '+listEquipier[i].prenom+' '+listEquipier[i].nom];
          }
          
          var comboStore = Ext.getCmp('EvaluationWindowSetEquipierEnEval').getStore();
          
          comboStore.removeAll();
          comboStore.loadData(listEquipierCombo);
          
          Ext.getCmp('choose-eval-personl-window-contentCmp-LearnerTab').enable();
          
          var tab = Ext.getCmp('choose-eval-personl-window-contentCmp');
          tab.setActiveTab('choose-eval-personl-window-contentCmp-LearnerTab');            
        }
      );   
    };
    
    
    var chooseRoleEvalueTab ={
        id          : 'choose-eval-personl-window-contentCmp-RoleTab',
        title       : "Role de l'évaluation",
        closable    : false,
        xtype       : 'form',
        items       : [ roleEvalueCombo ],
        buttons: [{
          text: 'Close',
          handler: function(button, event){
              Ext.getCmp('choose-eval-person-windowCmp').hide();
          }
        },
        {
          text: 'Suivant',
          handler : roleEvalueSuivantFunctionButtonHandler
        }]
      };
      
    
    
    
    var choosePSE2EvalueTab = {
        id          : 'choose-eval-personl-window-contentCmp-LearnerTab',
        title       : "Bénévole Evalué",
        closable    : false,
        disabled    : true,
        xtype       : 'form',
        items       : [{
                         xtype        : 'combo',
                         fieldLabel   : 'Equipier Evalué',
                         anchor       : '100%',
                         id           : 'EvaluationWindowSetEquipierEnEval',
                         typeAhead    : true,
                         mode         : 'local',
                         editable     : false,
                         triggerAction: 'all',
                         valueField   : 'id',
                         displayField : 'label',
                         store        : new Ext.data.ArrayStore({
                             id      : 0,
                             fields  : ['id', 'label'],
                             data    : [[0,'Loading...']],
                             idIndex : 0
                         })
                     }],
         buttons: [{
           text: 'Close',
           handler: function(button, event){
               Ext.getCmp('choose-eval-person-windowCmp').hide();
           }
         },
         {
           text: 'Suivant',
           handler : function(button, event)
           {
             var evaluationChoosePersonWindow = MonitorInputDispositifCs.prototype.evaluationChoosePersonWindow;
             var evaluateur = evaluationChoosePersonWindow.currentSelectedEvaluateurEquipier;
             
             var equipierEvalueId   = Ext.getCmp('EvaluationWindowSetEquipierEnEval').getValue();
             var equipierEvalueLabel= Ext.get('EvaluationWindowSetEquipierEnEval'   ).getValue();
             
             evaluationChoosePersonWindow.equipierEvalueId = equipierEvalueId;
             evaluationChoosePersonWindow.roleEvalueId     = Ext.get('EvaluationWindowSetRoleEvaluer').getValue();
             
             Ext.getCmp('summaryTabEvaluateur'  ).setValue(evaluateur.nivol+' - '+evaluateur.prenom+' '+evaluateur.nom);
             Ext.getCmp('summaryTabPersonEvalue').setValue(equipierEvalueLabel);
             Ext.getCmp('summaryTabRoleEvalue'  ).setValue(Ext.get('EvaluationWindowSetRoleEvaluer').getValue());
             
             Ext.getCmp('choose-eval-person-window-contentCmp-SummaryTab').enable();
             
             var tab = Ext.getCmp('choose-eval-personl-window-contentCmp');
             tab.setActiveTab('choose-eval-person-window-contentCmp-SummaryTab');
             
           }
         }]
      };
    
    
    var saveEvaluationSessionFunction =  function(button, event)
    {
      
      try
      {
        var evaluationChoosePersonWindow = MonitorInputDispositifCs.prototype.evaluationChoosePersonWindow;
        var evaluateur = evaluationChoosePersonWindow.currentSelectedEvaluateurEquipier;
        
        var idEquipierEvaluateur  = evaluateur.idEquipier;
        var equipierEvalueId      = Ext.getCmp('EvaluationWindowSetEquipierEnEval').getValue();
        var idRoleEvalue          = Ext.getCmp('EvaluationWindowSetRoleEvaluer'   ).getValue(); 
        
        var evaluationSession = {
            idDispositif        : $('dispositif_id_field').value,  
            idRoleEvalue        : idRoleEvalue,            
            idEquipierEvalue    : equipierEvalueId,       
            idEquipierEvaluateur: idEquipierEvaluateur
        };
        
        EvaluationService.createEvaluationSession(evaluationSession, function(idEvaluationSession)
        {
          //refresh la liste des équipiers pour afficher les icones
          MonitorInputDispositif.getEquipiersFromDispositif($('dispositif_id_field').value, miDispositifCs.updateListEquipierReturn);
          Ext.Msg.alert('Session d\'Evaluation crée avec succès','La session d\évaluation a été créee avec succès.');
        });
      }
      catch(e)
      {
        console.log(e);
      }

      
    };
    
    
    
     var finalTab = {
         id          : 'choose-eval-person-window-contentCmp-SummaryTab',
         title       : "Role de l'évaluation",
         closable    : false,
         disabled    : true,
         xtype       : 'form',
         items       : [{fieldLabel: 'Evaluateur'     , id:'summaryTabEvaluateur'  , xtype:'textfield', readOnly:true, width:'100%'},
                        {fieldLabel: 'Rôle Evalué'    , id:'summaryTabRoleEvalue'  , xtype:'textfield', readOnly:true, width:'100%'},
                        {fieldLabel: 'Equipier Evalué', id:'summaryTabPersonEvalue', xtype:'textfield', readOnly:true, width:'100%'}],
         
         buttons     : [
         {
           text: 'Close',
           handler: function(button, event)
           {
               Ext.getCmp('choose-eval-person-windowCmp').hide();
           }
         },
         {
           text: 'Sauvegarder',
           handler:saveEvaluationSessionFunction
         }
         ]
       };   
    
    
   
  var evaluationChoosePersonWindow = new Ext.Window({
    id          : 'choose-eval-person-windowCmp',
    title       : 'Mise en place d\'une Evaluation',
    layout      : 'fit'             ,
    width       : 500               ,
    height      : 500               ,
    x           : 0                 ,
    y           : 35                ,
    closeAction : 'hide'            ,
    plain       : true              ,
    items       : new Ext.TabPanel({
      id             : 'choose-eval-personl-window-contentCmp' ,
      autoTabs       : true,
      activeTab      : 0                          ,
      enableTabScroll: true                       ,
      defaults       : {autoScroll:true}          ,
      deferredRender : false                      ,
      border         : false                      ,
      bodyStyle      :'padding:5px'               ,
      items          : [chooseRoleEvalueTab, choosePSE2EvalueTab, finalTab]//fin items
    }) //fin du TabPanel
  });//fin window
  
  MonitorInputDispositifCs.prototype.evaluationChoosePersonWindow  = evaluationChoosePersonWindow ;
  
  }
  catch(e)
  {
    console.log(e);
  }
  
};

MonitorInputDispositifCs.prototype.evaluationWindowDisplayListRole=function(idRoles)
{
  var roles = [];
  var i     = 0;
  
  for(i=0;i<idRoles.length;i++)
  {
    roles[i] = [idRoles[i], crfIrpUtils.getLabelFor('RolesEquipier', idRoles[i])];
  }
 
  console.log(roles);
  
  var comboStore = Ext.getCmp('EvaluationWindowSetRoleEvaluer').getStore();
  
  comboStore.removeAll();
  comboStore.loadData(roles);
  

  Ext.getCmp('choose-eval-personl-window-contentCmp').activate('choose-eval-personl-window-contentCmp-RoleTab');
  
  
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
        height      : 800,
        iconCls     : 'icon-grid',
        renderTo    : 'DispositifListCurrent',
        listeners   :{
          'rowdblclick':miDispositifCs.gridRowDoubleClickHandler
        },
        bbar:new Ext.PagingToolbar({
          pageSize   : 15,
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
                  lazyInit      : false,
                  width         : 240,
                  listWidth     : 240,
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
                
                return [new Ext.ux.rs.data.FilterObject('search',search,'=')];
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
        id             : 'DelegationSearch', 
        store          : delegationSearchDataStore,
        displayField   : 'nom',
        loadingText    : 'Recherche en cours...',
        width          : 300,
        listWidth      : 300,
        pageSize       : 10,
        minChars       : 1,
        hideTrigger    : true,
        tpl            : resultTplDelegation,
        itemSelector   : 'div.search-item',
        applyTo        : 'DispositifDelegation',
        filterCallBack : function()
        {
         
           var role   = Ext.getCmp('dispositifRoleList'      ).getValue();
           var search = Ext.getCmp('DispositifEquipierSearch').getValue();
           
           if(role =='')
             return [];
           
           return [new Ext.ux.rs.data.FilterObject('idRole',role  ,'='),
                   new Ext.ux.rs.data.FilterObject('search',search,'=')]
        },
        onSelect    : MonitorInputDispositifCs.prototype.selectDelegation
    });            
              

 /* Combo Box de recherche d'équipier*/ 
    
    var searchEquipierComboBox = new Ext.ux.crfrdp.EquipierSearchCombo({
      id          : 'DispositifEquipierSearch', 
      searchType  : 1,/*dispositifEquipierSearch*/
      applyTo     : 'DispositifEquipierSearchInput',
      displayField: 'numNivol',
      loadingText : 'Recherche en cours...', 
      width       : 570,
      listWidth   : 570,
      pageSize    : 10,
      minChars    : 1,
      hideTrigger : true,
      itemSelector: 'div.search-item',
      listeners   : {
        // delete the previous query in the beforequery event or set
        // combo.lastQuery = null (this will reload the store the next time it expands)
        beforequery: function(qe){
            delete qe.combo.lastQuery;
      }},
      filterCallBack : function()
      {
       
         var role   = Ext.getCmp('dispositifRoleList'      ).getValue();
         var search = Ext.getCmp('DispositifEquipierSearch').getValue();
         
         if(role =='')
           return [];
         
         return [new Ext.ux.rs.data.FilterObject('idRole',role  ,'='),
                 new Ext.ux.rs.data.FilterObject('search',search,'=')]
      },
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
       // On selection change, set enabled state of the 
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
            {id:'DELG_role'        , header: "Role"       , width: 150, sortable: true , dataIndex: 'idRoleDansDispositif'      , renderer:miDispositifCs.DELGRoleCellRenderer        },
            {id:'DELG_evalutation' , header: "En Eval?"   , width: 140, sortable: true , dataIndex: 'enEvaluationDansDispositif',
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
        width       : 840,
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
            text    : 'Evaluation : Choisir l\'évaluateur',
            tooltip : 'Cocher un équipier puis cliquer sur ce bouton pour mettre l\'équipier en évaluation',
            iconCls : 'evaluation',
            handler : MonitorInputDispositifCs.prototype.evaluationButtonHandler,

            // Place a reference in the GridPanel
            ref     : '../evaluationButton',
            disabled: true
        },{
          text    : 'Terminer la session d\'évaluation',
          tooltip : "Enlève l'état 'en évaluation' des équipiers evaluateur/evalué, mais ne supprime pas les évaluations entrées jusqu'ici.",
          iconCls : 'terminerEvaluation',
          handler : MonitorInputDispositifCs.prototype.terminerEvaluationButtonHandler,

          // Place a reference in the GridPanel
          ref     : '../terminerEvaluationButton',
          disabled: true 
      }]
    });
  
  
  
  Ext.get('WhyNotFound').on('click', function(){
    Ext.MessageBox.alert('Pourquoi je ne trouve pas l\'équipier que je cherche?', 
        ['Un équipier peut en pas apparaitre dans les résultats de votre recherche pour les raisons suivantes :<br/>',
         '<ul>* L\'équipier est déjà affecté sur un autre dispositif (ou un ancien qui n\'a pas été fermé)<li>',
         '<li>* L\'équipier est en cours d\'évaluation CI ou Chauffeur (et ne peut donc pas être mis en tant que CI ou Chauffeur, seule un titulaire ou un évaluateur peut etre CI ou Chauffeur)</li>',
         '<li>* L\'équipier n\'a pas encore été importé depuis le SIORD</li>',
         '<li>* Vous cherchez sur le nom et le prénom en meme temps. Ce n\'est pour l\'instant pas supporté. Cherchez par NIVOL à la place</li>',
         '</ul>'
  ].join('')
        
    
    );
});

};



MonitorInputDispositifCs.prototype.terminerEvaluationButtonHandler=function(button, event)
{
  
  Ext.Msg.confirm("Etes vous sur de vouloir terminer la session l'évaluation",
      'Etes vous sur de vouloir terminer la session d\'évaluation en cours? Ceci ne supprimera pas les évaluations entrées jusqu\'ici',
      function(btn){
        if(btn == 'yes')
        {
          EvaluationService.terminerEvaluation(Ext.get('dispositif_id_field').getValue(), MonitorInputDispositifCs.prototype.updateListEquipierReturn);
          Ext.getCmp('DispositifEquipierSearch').clearValue();
        }
      });
  
};


MonitorInputDispositifCs.prototype.evaluationButtonHandler=function(button, event)
{
  //réactiver la selection case a cocher, sinon ca va etre galère pour ré-afficher les options d'évaluation
  // ==> selectionne la personne evaluateur, puis le role qu'elle evalue, puis la personne évaluée, puis on valide => affiche un résumé et sauvegarde
  // ==> sur ré-affichage, on affiche le resumé, avec un bouton qui permet de modifier
  var evaluationChoosePersonWindow = MonitorInputDispositifCs.prototype.evaluationChoosePersonWindow;
  var sm     = Ext.getCmp('DispositifEquipierListGrid').getSelectionModel();
  var record = sm.getSelected();
  
  if(record.data.idRoleDansDispositif >= 5 && record.data.idRoleDansDispositif <= 7)
  {
    var selectedEquipierEvaluateur = {idEquipier: record.data.idEquipier,
                                      nivol     : record.data.numNivol  ,
                                      nom       : record.data.nom       ,
                                      prenom    : record.data.prenom    };
    
    Ext.getCmp('choose-eval-personl-window-contentCmp-LearnerTab').disable();
    Ext.getCmp('choose-eval-person-window-contentCmp-SummaryTab' ).disable();
    
    
    var comboStore = Ext.getCmp('EvaluationWindowSetEquipierEnEval').getStore();
    comboStore.removeAll();
    
    Ext.getCmp('summaryTabEvaluateur'  ).setValue('');
    Ext.getCmp('summaryTabPersonEvalue').setValue('');
    Ext.getCmp('summaryTabRoleEvalue'  ).setValue('');
    
    
    evaluationChoosePersonWindow.currentSelectedEvaluateurEquipier = selectedEquipierEvaluateur;
    EvaluationService.getRolesEvaluateurFromEquipier(record.data.idEquipier, MonitorInputDispositifCs.prototype.displayEvalutionWindowWithRoleEvaluable);    
  }
  else
  {
     Ext.Msg.alert('Sélection invalide','Seul un Chauffeur ou un CI peut évaluer un PSE2.<br/><br/>Ex: Un CI "A" gère le dispositif. Le PSE2 "B" est en évaluation pour devenir CI. "A" est ajouter en tant que CI, "B" en tant que PSE2, évaluer en tant que CI');
     sm.clearSelections();
     evaluationChoosePersonWindow.currentSelectedEvaluateurEquipier = null;
     return;  
  }
};

MonitorInputDispositifCs.prototype.displayEvalutionWindowWithRoleEvaluable=function(idRoles)
{
  if(idRoles == null || idRoles.length == 0)
  {
    Ext.Msg.alert('Evaluation Impossible', "L'équipier séléctionné n'est pas évaluateur. Si c'est inexact, veuillez éditer l'équipier depuis l'onglet 'Gestion des Equipiers' sur la page d'Accueil.");
    return;
  }
  
  MonitorInputDispositifCs.prototype.evaluationWindowDisplayListRole(idRoles);
  MonitorInputDispositifCs.prototype.evaluationChoosePersonWindow.show();
};




MonitorInputDispositifCs.prototype.gridRowDoubleClickHandler=function(grid, rowIndex, columnIndex, e)
{
  miDispositifCs.editDispositif(grid.store.getAt(rowIndex).data.idDispositif);
  Ext.getCmp('InterventionListEastPanel').collapse();
};

MonitorInputDispositifCs.prototype.reloadDispositifLists=function(data)
{
  Ext.getCmp('DispositifListCurrentGrid'       ).getStore().reload();
  //Ext.getCmp('DispositifListEncoursEditionGrid').getStore().reload();
}

MonitorInputDispositifCs.prototype.DELGNomPrenomCellRenderer=function(value, metadata, record, rowIndex, colIndex, store)
{
  return '<img src="'+contextPath+'/img/monitorInput/user'+(record.data.homme?'':'_female')+'.png" alt="'+(record.data.homme?'Homme':'Femme')+'"/> '+record.data.nom+' '+record.data.prenom;
};

MonitorInputDispositifCs.prototype.DELGRoleCellRenderer=function(value, metadata, record, rowIndex, colIndex, store)
{
  var image = '';
  var alt   = '';
  
  if(value > 0 && value <= 6)
  {
    image = "award_star_gold_1.png";
    alt   = "Chef d'inter";
  }
  
  if(value >= 7 && value <= 8)
  {
    image = "car.png";
    alt   = "Chauffeur";
  }
  
  var imageHtml = '';
  
  if(image != '')
  {
    imageHtml = '<img src="'+contextPath+'/img/monitorInput/'+image+'" alt="'+alt+'"/> ';
  }
  
  
  
  if(record.json.evaluationDansDispositif == 1 || record.json.evaluationDansDispositif == 2)
  {
    
    
    var roleLabel = crfIrpUtils.getLabelFor('RolesEquipier', record.json.idRoleEnEval);
    
    if(record.json.evaluationDansDispositif == 1)
    {  
      image = 'teacher-32x32.png';
      alt = "Evaluateur("+roleLabel+")";
    }
    else
    {
      image = 'student-32x32.png';
      alt = "Evalué ("+roleLabel+")";
    }
    
   
    
    
    imageHtml += '<img src="'+contextPath+'/img/monitorInput/'+image+'" alt="'+alt+'" style="width:16px;height:16px;"/> ';
  }

  
  
  
  return imageHtml + crfIrpUtils.getLabelFor('RolesEquipier', value );
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

MonitorInputDispositifCs.prototype.resetErrorAndWarningDisplay=function()
{
  //supprime tout les éléments du tableaux, une recherche est faite dans le store dans cette méthode pour déterminer si une erreur bloquant est encore présente.
  if(Ext.getCmp('FormValidationWindow')!=null)
  {
    Ext.getCmp('FormValidationWindow').getStore().removeAll();  
  }
  
  
//Clean old validation
  Ext.get('DispositifIdentification').dom.style.backgroundColor='#FFFFFF';
  $('DispositifVolumeTotal'   ).style.backgroundColor='#FFFFFF';
}

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

  
  MonitorInputDispositifCs.prototype.resetErrorAndWarningDisplay();
  
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
  
  var currentDateStr = crfIrpUtils.getDate(new Date());
  
  if(Ext.getCmp('DispositifDatePatchAdulte1').getValue() == undefined || Ext.getCmp('DispositifDatePatchAdulte1').getValue() =='')
  {
    messageList.push(['La date du patch Adulte 1 n\'est pas renseingé',2]);
    hasErrorOrWarning=true;  
  }
  else
  {
    if(crfIrpUtils.compareDate(currentDateStr,crfIrpUtils.getDate(Ext.getCmp('DispositifDatePatchAdulte1').getValue())))
    {
      messageList.push(['Les Patchs Adultes 1 sont périmés',2]);
      hasErrorOrWarning=true;  
    }
  }
  
  if(Ext.getCmp('DispositifDatePatchAdulte2').getValue() == undefined || Ext.getCmp('DispositifDatePatchAdulte2').getValue() =='')
  {
    messageList.push(['La date du patch Adulte 2 n\'est pas renseingé',2]);
    hasErrorOrWarning=true;  
  }
  else
  {
    if(crfIrpUtils.compareDate(currentDateStr, crfIrpUtils.getDate(Ext.getCmp('DispositifDatePatchAdulte2').getValue())))
    {
      messageList.push(['Les Patchs Adultes 2 sont périmés',2]);
      hasErrorOrWarning=true;  
    }
  }
  
  if((Ext.getCmp('DispositifDatePatchEnfant').getValue() == undefined || Ext.getCmp('DispositifDatePatchEnfant').getValue() =='') && Ext.getDom('DispositifAdaptateurPediatriqueOui').checked!=true)
  {
    messageList.push(['La date du patch Enfant 1 n\'est pas renseingé et l\'adapteur pédiatrique n\'est pas coché. Veuillez renseigner l\'un ou l\'autre',2]);
    hasErrorOrWarning=true;  
  }
  else
  {
    if(!(Ext.getCmp('DispositifDatePatchEnfant').getValue() == undefined || Ext.getCmp('DispositifDatePatchEnfant').getValue() =='') && crfIrpUtils.compareDate(currentDateStr, crfIrpUtils.getDate(Ext.getCmp('DispositifDatePatchEnfant').getValue())))
    {
      messageList.push(['Les Patchs Enfants sont périmés',2]);
      hasErrorOrWarning=true;  
    }  
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

  var interventionListWindow = Ext.getCmp('InterventListWindow');
  
  if(interventionListWindow!=null)
  {
    interventionListWindow.hide();
  }
  
  
  var currentInterListWindow = Ext.getCmp('currentInterListWindow');
  if(currentInterListWindow!=null) 
  {
    currentInterListWindow.hide();
  }
  
  
  MonitorInputDispositifCs.prototype.resetErrorAndWarningDisplay();
  
  for(i=0,count=this.fieldList.length;i<count;i++)
    dwr.util.setValue(this.fieldList[i], '');
  
  Ext.get('dispositif_vacation_terminee_span').update('');
  
  Ext.getDom('DispositifDefibrilateurTypeAUCUN'  ).checked=true;
  Ext.getDom('DispositifAdaptateurPediatriqueOui').checked=false;
  Ext.getDom('DispositifAdaptateurPediatriqueNon').checked=false;
  Ext.getDom('DispositifDefibrilateurCompletOui' ).checked=false;
  Ext.getDom('DispositifDefibrilateurCompletNon' ).checked=false;
  

  Ext.get('DispositifVolumeTotal'   ).update('');
  Ext.get('DispositifAutonomieTotal').update('');
  Ext.get('dispositifCurrentGoogleAdressCheckStatus' ).dom.src=contextPath+"/img/pix.png";
  Ext.get('dispositifPreviousGoogleAdressCheckStatus').dom.src=contextPath+"/img/pix.png"
  
  this.updateVolumeAndAutonomie();
  
  
  
  //Liste des véhicules
  dwr.util.removeAllOptions('DispositifVehicule');
  
  var listVehicule = [{idVehicule:0, description:'Veuillez choisir un type de dispositif !'}];
  dwr.util.addOptions( 'DispositifVehicule', 
      listVehicule,
      'idVehicule',
      'description');
  
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
    'DispositifAdaptateurPediatriqueOui',
    'DispositifAdaptateurPediatriqueNon',
    'DispositifDatePatchAdulte1',
    'DispositifDatePatchAdulte2',
    'DispositifDatePatchEnfant',
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
      Ext.getCmp('DispositifEquipierSearch').clearValue();
    }
  },
  record
  );
  
  Ext.Msg.getDialog().setPosition(300, 170);
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
  
  var listTypeDispositif = crfIrpUtils.allList['TypesDispositif'];
  
  listTypeDispositif[0].label='Veuillez choisir un type de dispositif!';
  
  dwr.util.addOptions( 'DispositifType', 
                        listTypeDispositif,
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
  
  var iniData = [[0, "Veuillez choisir un type de dispositif !"]];
  Ext.getCmp('dispositifRoleList').getStore().loadData(iniData);

  
  
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

MonitorInputDispositifCs.prototype.endOfVacationReturn=function(numberOfInterventionAffectedToDispositif)
{
  if(numberOfInterventionAffectedToDispositif == 0)
  {
    PageBus.publish("monitor.input.dispositif.updateThatChangeLists",null);
  }
  else
  {
    var title = 'Annulation impossible - intervention(s) affectée(s)';
    var msg   = 'Au moins une intervention est affectée à ce dispositif, veuillez annuler l\'intervention au préalable.<br/></br>'; 
    Ext.Msg.alert(title, msg);
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
  
  if(dispositif.idEtatDispositif == 10 || !dispositif.actif)//10 : Vacation Terminée
  {
    Ext.get('dispositif_vacation_terminee_span').update("VACATION TERMINEE - Ce Dispositif n'est plus actif");  
  }
  else
  {
    Ext.get('dispositif_vacation_terminee_span').update('');
  }
  
  
  if(dispositif.idTypeDispositif!=0)
  {
    miDispositifCs.setRoles       (dispositif.idTypeDispositif);
    miDispositifCs.getVehiculeList(dispositif.idTypeDispositif, dispositif.idDispositif, dispositif.idVehicule);  
  }
  
  dwr.util.setValue('DispositifDelegation'          , dispositif.idDelegation!=0?crfIrpUtils.getLabelFor('Delegations',dispositif.idDelegation):'N/A');
  dwr.util.setValue('DispositifDelegation_id'       , dispositif.idDelegation);
  dwr.util.setValue('DispositifDelegation_autreNom' , dispositif.autreDelegation);
  
  dwr.util.setValue('DispositifDHDebut'             , crfIrpUtils.getFullDate(dispositif.dhDebut));
  dwr.util.setValue('DispositifDHFin'               , crfIrpUtils.getFullDate(dispositif.dhFin  ));
  
  dwr.util.setValue('DispositifDatePatchAdulte1'    , crfIrpUtils.getDate(dispositif.dsaDatePeremptionAdulte1));
  dwr.util.setValue('DispositifDatePatchAdulte2'    , crfIrpUtils.getDate(dispositif.dsaDatePeremptionAdulte2  ));
  dwr.util.setValue('DispositifDatePatchEnfant'     , crfIrpUtils.getDate(dispositif.dsaDatePeremptionEnfant));
  
  
  
  
  
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
  $('dsa_td_value').value = dwr.util.getValue('DispositifDefibrilateurType');
  
  dwr.util.setValue('DispositifDefibrilateurComplet', dispositif.dsaComplet?'true':'false' );
  $('dsa_complet_td_value').value = dwr.util.getValue('DispositifDefibrilateurComplet');

  dwr.util.setValue('DispositifAdaptateurPediatrique', dispositif.dsaAdaptateurPediatrique?'true':'false' );
  $('dsa_adaptateur_pedia_td_value').value = dwr.util.getValue('DispositifAdaptateurPediatrique');
  
  
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
  
  MonitorInputDispositifCs.prototype.dsaUpdateDisplay();
    
};



MonitorInputDispositifCs.prototype.getVehiculeList=function(idTypeDispositif, idDispositif, idVehiculeToSet)
{
  var typeDispositif = crfIrpUtils.allList['TypesDispositif'][idTypeDispositif];
  
  
  var callMetaData = {
    callback:MonitorInputDispositifCs.prototype.getVehiculeListReturn,
    arg:{
      idVehiculeToSet  : idVehiculeToSet
    }
  };
  
  
  MonitorInputDispositif.getVehicules(typeDispositif.idVehiculeType, idDispositif, callMetaData);
};

MonitorInputDispositifCs.prototype.getVehiculeListReturn=function(listVehicule, callMetaData)
{
  if(consoleEnabled)
  {
    console.log(listVehicule);
  }
  
  var  listVehicule2 = [];
  listVehicule2[0]={idVehicule:0,description:""};
  
  for(var i=0, counti=listVehicule.length; i<counti; i++)
  {
    var vehicule  = listVehicule[i];
    listVehicule2[i+1]=vehicule;
    listVehicule2[i+1].description= "["+vehicule.idVehicule+"] "+vehicule.indicatif+" - "+ crfIrpUtils.getLabelFor('Delegations', vehicule.idDelegation) +" - "+ vehicule.marque +" - "+ vehicule.modele +" - "+vehicule.carburant +" - Dernier Controle Technique : "+crfIrpUtils.getDate(vehicule.dateDernierControleTech);
  }
  dwr.util.removeAllOptions( 'DispositifVehicule');
  dwr.util.addOptions( 'DispositifVehicule', 
      listVehicule2,
      'idVehicule',
      'description');
  
  dwr.util.setValue('DispositifVehicule', callMetaData.idVehiculeToSet);
 
};


MonitorInputDispositifCs.prototype.updateVehiculeAssociation=function(idVehicule)
{
  MonitorInputDispositif.updateVehiculeAssociation($('dispositif_id_field').value, idVehicule);
};

MonitorInputDispositifCs.prototype.setRoles=function(idTypeDispositif)
{
  var roleListCombo = Ext.getCmp('dispositifRoleList');
  var store         = roleListCombo.getStore();
  store.removeAll();
  var dispositifTypeDefinition = MonitorInputDispositifCs.prototype.dispositifTypeDefinition[idTypeDispositif];
  
  if(dispositifTypeDefinition == null)
    return;
  
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


MonitorInputDispositifCs.prototype.dsaUpdateDisplay=function()
{
  if($('dsa_td_value').value == 'NO')
  {
    $('DispositifDefibrilateurCompletOui'  ).disabled=true;
    $('DispositifDefibrilateurCompletNon'  ).disabled=true;
    $('DispositifAdaptateurPediatriqueOui' ).disabled=true;
    $('DispositifAdaptateurPediatriqueNon' ).disabled=true;
    
    Ext.getCmp('DispositifDatePatchAdulte1').disable();
    Ext.getCmp('DispositifDatePatchAdulte2').disable();
    Ext.getCmp('DispositifDatePatchEnfant' ).disable();
  }
  else
  {
    $('DispositifDefibrilateurCompletOui'  ).disabled=false;
    $('DispositifDefibrilateurCompletNon'  ).disabled=false;
    $('DispositifAdaptateurPediatriqueOui' ).disabled=false;
    $('DispositifAdaptateurPediatriqueNon' ).disabled=false;
    
    Ext.getCmp('DispositifDatePatchAdulte1').enable();
    Ext.getCmp('DispositifDatePatchAdulte2').enable();
    Ext.getCmp('DispositifDatePatchEnfant' ).enable();
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
      
      this.updateDispositifBooleanField('dsa_complet_td_value', 'dsa_complet', 'dsa_complet_td');

      $('dsa_adaptateur_pedia_td_value').value = 'false';
      dwr.util.setValue('DispositifAdaptateurPediatrique', 'false');

      this.updateDispositifBooleanField('dsa_adaptateur_pedia_td_value', 'dsa_adapteur_pediatrique', 'dsa_adaptateur_pedia_td');
      
      Ext.getCmp('DispositifDatePatchAdulte1').setValue('');
      Ext.getCmp('DispositifDatePatchAdulte2').setValue('');
      Ext.getCmp('DispositifDatePatchEnfant' ).setValue('');
      
      $('DispositifDatePatchAdulte1').value="null";
      $('DispositifDatePatchAdulte2').value="null";
      $('DispositifDatePatchEnfant' ).value="null";
      
      miDispositifCs.updateDispositifDateField('DispositifDatePatchAdulte1', 'dsa_date_adulte_1');
      miDispositifCs.updateDispositifDateField('DispositifDatePatchAdulte2', 'dsa_date_adulte_2');
      miDispositifCs.updateDispositifDateField('DispositifDatePatchEnfant' , 'dsa_date_enfant'  );
    }
    else
    {
      $('DispositifDefibrilateurCompletOui' ).disabled=false;
      $('DispositifDefibrilateurCompletNon' ).disabled=false;
      $('DispositifAdaptateurPediatriqueOui').disabled=false;
      $('DispositifAdaptateurPediatriqueNon').disabled=false;
      
      Ext.getCmp('DispositifDatePatchAdulte1').enable();
      Ext.getCmp('DispositifDatePatchAdulte2').enable();
      Ext.getCmp('DispositifDatePatchEnfant' ).enable();
      
    }
    MonitorInputDispositifCs.prototype.dsaUpdateDisplay();
    
    this.updateDispositifStringField('dsa_td_value', 'dsa_type', 'dsa_td');
  }
  else if(fieldId == 'dsa_complet_td')
  {
    $('dsa_complet_td_value').value = dwr.util.getValue('DispositifDefibrilateurComplet');
    this.updateDispositifBooleanField('dsa_complet_td_value', 'dsa_complet', 'dsa_td_value');
  }
  else if(fieldId == 'dsa_adaptateur_pedia_td')
  {
    $('dsa_adaptateur_pedia_td_value').value = dwr.util.getValue('DispositifAdaptateurPediatrique');
    this.updateDispositifBooleanField('dsa_adaptateur_pedia_td_value', 'dsa_adapteur_pediatrique', 'dsa_adaptateur_pedia_td');
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
  
  if(fieldId == 'dispositif'+which+'AddressCodePostal' && !crfIrpUtils.checkZipCode(codePostal.value))
  {

    crfIrpUtils.checkZipCodeError(fieldId);
  }
  

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
//passer la valeur "null" en tant que string permet de remettre a zéro la valeur dans la base de données (chaine vide n'étant pas sauvegarder pour éviter du traffic inutile)
MonitorInputDispositifCs.prototype.updateDispositifDateTimeField=function(fieldId, fieldName, isDate)//3eme parametre ne sera pas rempli pour les datetime
{
  crfIrpUtils.checkField (fieldId+"_div");
  crfIrpUtils.fieldSaving(fieldId+"_div");
  
  var fieldValue = $(fieldId).value;
  if(fieldValue!='' && fieldValue != $(fieldId).oldValue)
  {
    var value = null;
    
    if(fieldValue !='null')
    {
      value = isDate?
                crfIrpUtils.parseDate    (fieldValue):
                crfIrpUtils.parseDateTime(fieldValue); 
    }
    else
    {
      $(fieldId).value='';
    }
    
    MonitorInputDispositif.updateDispositifDateField(
                                              $('dispositif_id_field').value, 
                                              fieldName, 
                                              value, 
                                              function()
                                              {
                                                crfIrpUtils.defaultBackgroundColorForField(fieldId+"_div");
                                              });
  }
  else
    crfIrpUtils.defaultBackgroundColorForField(fieldId+"_div");
};


MonitorInputDispositifCs.prototype.updateDispositifDateField=function(fieldId, fieldName)
{
  MonitorInputDispositifCs.prototype.updateDispositifDateTimeField(fieldId, fieldName, true);  
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