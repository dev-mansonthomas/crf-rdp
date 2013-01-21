Ext.namespace('Ext.ux.Utils.InterventionList');

// create application
Ext.ux.Utils.InterventionList = function() {
    // do NOT access DOM from here; elements don't exist yet

    // private variables
    
    // private functions
    
    // public space
    return {
      // public properties, e.g. strings to translate
      
      // public methods
      init: function() {
        this.interventionListWindow    = null;
        this.initInterventionListWindow ();
        this.applicationsVersions      = [];
        
      },
      initInterventionListWindow:function()
      { 
        var listInterventionGridDataStore = new Ext.data.Store({
            remoteSort:true,
                 proxy: new Ext.ux.rs.data.DwrProxy({
                     call          : InterventionListService.getInterventionList ,
                     args          : []              ,
                     proxyConfig   : Ext.ux.rs.data.PAGING_WITH_SORT_AND_FILTER,
                     filterCallBack: function()
                     {
                     
                        var objectFilter = new Array();
                        
                        
                        
                        // ajoute le filtre de base (soit une recherche partant du dispositif, soit en partant de l'équipier)
                        Ext.ux.rs.addFilterFromValue(objectFilter, 
                                                      Ext.getCmp('InterventListWindow')['baseSearchValue'],
                                                      Ext.getCmp('InterventListWindow')['baseSearchType' ],                                                      
                                                      '=',
                                                      '');
                        Ext.ux.rs.addFilterFromExtField(objectFilter,'InterventionListForm-DateEntre'    , 'DATE_ENTRE'   , '>='   ,'');
                        Ext.ux.rs.addFilterFromExtField(objectFilter,'InterventionListForm-DateEt'       , 'DATE_ET'      , '<='   ,'');
                        Ext.ux.rs.addFilterFromExtField(objectFilter,'InterventionListForm-Motif'        , 'motif'        , '='    ,'');
                        Ext.ux.rs.addFilterFromExtField(objectFilter,'InterventionListForm-Origine'      , 'origine'      , '='    ,'');
                        Ext.ux.rs.addFilterFromExtField(objectFilter,'InterventionListForm-Nom'          , 'nom'          , 'LIKE' ,'');
                        Ext.ux.rs.addFilterFromExtField(objectFilter,'InterventionListForm-Sexe'         , 'sex'          , '='    ,'');
                        Ext.ux.rs.addFilterFromExtField(objectFilter,'InterventionListForm-age'          , 'age'          , '~'    ,'');
                        Ext.ux.rs.addFilterFromExtField(objectFilter,'InterventionListForm-codePostal'   , 'codePostal'   , '='    ,'');
                        Ext.ux.rs.addFilterFromExtField(objectFilter,'InterventionListForm-RoleEquipier' , 'ROLE_EQUIPIER', '='    ,'');

                        return objectFilter;
                    }
                     }),
                 reader: new Ext.ux.rs.data.JsonReader ({
                        root: 'data',
               totalProperty: 'totalCount',
                      fields:
                         [
                             {name: 'idIntervention'          , type: 'int'},
                             {name: 'idRegulation'            , type: 'int'},
                             {name: 'idOrigine'               , type: 'int'},
                             {name: 'idMotif'                 , type: 'int'},
                             {name: 'idDispositif'            , type: 'int'},
                             {name: 'interventionBusinessId'  , type: 'string'},
                             {name: 'victimeHomme'            , type: 'boolean'},
                             {name: 'nomVictime'              , type: 'string'},
                             {name: 'prenomVictime'           , type: 'string'},
                             {name: 'ageApproxVictime'        , type: 'int'},
                             {name: 'rue'                     , type: 'string'},
                             {name: 'codePostal'              , type: 'string'},
                             {name: 'ville'                   , type: 'string'},
                             {name: 'googleCoordsLat'         , type: 'float'},
                             {name: 'googleCoordsLong'        , type: 'float'},   
                             {name: 'dhSaisie'                , type: 'date'  }
                         ]
                     })
                 });


        var interventionListGrid = new Ext.grid.GridPanel({
                  id        :'InterventionListGrid',
                  store     : listInterventionGridDataStore,
                  viewConfig: {
                      forceFit      :true,
                      enableRowBody :true/*,
                      getRowClass   :function(record, rowIndex, rowParams, dataStore)
                        {
                          rowParams.body='<div style="padding-left:100px;padding-top:5px;padding-bottom:5px;color:silver;">'+record.data.complementMotif+'</div>';
                          return 'x-grid3-row-expanded';
                        }*/

                  },
                  width     : 980,
                  height    : 400,
                  title     : 'Liste Interventions',
                  iconCls   : 'icon-grid',
                  listeners : { 
                    rowdblclick : function(theGrid, rowIndex, e )
                    {
                      
                      var rowData = theGrid.store.getAt(rowIndex).data;
                      Ext.getCmp('InterventListWindow').onDblClickFunction(rowData)
                    }
                  },
                  bbar:new Ext.PagingToolbar({
                    pageSize   : 10,
                    store      : listInterventionGridDataStore,
                    displayInfo: true,
                    displayMsg : 'Intervention(s) {0} à {1} de {2}',
                    emptyMsg   : 'aucune intervention correspondant à la recherche'
                  }),
                  cm: new Ext.grid.ColumnModel([
                      {     id: 'idIntervention' ,
                        header: "id",
                         width: 20     ,
                      sortable: true    ,
                     dataIndex: 'idIntervention'/*,
                     renderer : function(value, metadata, record, rowIndex, colIndex, store)
                       {
                         return '<b>'+value+'</b>';
                       }*/
                     }, 
                     {     id: 'interventionBusinessId' ,
                        header: "Id Métier",
                         width: 70     ,
                      sortable: true    ,
                     dataIndex: 'interventionBusinessId'   ,
                     renderer : function(value, metadata, record, rowIndex, colIndex, store)
                     {
                       return crfIrpUtils.formatInterventionBusinessId(value);
                     }
                     }, 
                     {     id: 'idDispositif' ,
                        header: "Dispositif",
                         width: 100     ,
                      sortable: true    ,
                     dataIndex: 'idDispositif',
                     renderer : function(value, metadata, record, rowIndex, colIndex, store)
                       {
                         return 'TODO:<b>'+value+'</b>';
                       }
                     }, 
                     {     id: 'idOrigine' ,
                        header: "Origine",
                         width: 70     ,
                      sortable: true    ,
                     dataIndex: 'idOrigine',
                     renderer : function(value, metadata, record, rowIndex, colIndex, store)
                       {
                         return crfIrpUtils.getLabelFor('OriginesIntervention', value);
                       }
                     }, 
                     {     id: 'idMotif' ,
                        header: "Motif",
                         width: 100     ,
                      sortable: true    ,
                     dataIndex: 'idMotif'   ,
                     renderer : function(value, metadata, record, rowIndex, colIndex, store)
                       {
                         return crfIrpUtils.getLabelFor('MotifsIntervention', value);
                       }
                     }, 
                     {     id: 'victime' ,
                        header: "Victime",
                         width: 100     ,
                      sortable: true    ,
                     dataIndex: 'nomVictime'   ,
                     renderer : function(value, metadata, record, rowIndex, colIndex, store)
                       {
                         return value;
                       }
                     },
                     {     id: 'victimeHomme' ,
                        header: "Sexe",
                         width: 40     ,
                      sortable: true    ,
                     dataIndex: 'victimeHomme'   ,
                     renderer : function(value, metadata, record, rowIndex, colIndex, store)
                       {
                         return '<img src="'+contextPath+'/img/monitorInput/user'+(value?'':'_female')+'.png" alt="'+(value?'Homme':'Femme')+'"/> ';
                       }
                     }, 
                     {     id: 'victimeAge' ,
                        header: "Age",
                         width: 40     ,
                      sortable: true    ,
                     dataIndex: 'ageApproxVictime'   ,
                     renderer : function(value, metadata, record, rowIndex, colIndex, store)
                       {
                         return value;
                       }
                     }, 
                     {     id: 'addresse' ,
                        header: "Adresse",
                         width: 100     ,
                      sortable: true    ,
                     dataIndex: 'rue'   ,
                     renderer : function(value, metadata, record, rowIndex, colIndex, store)
                       {
                         return (record.json.position.rue       !=null?record.json.position.rue       +',<br/> ':'')+
                                (record.json.position.codePostal!=null?record.json.position.codePostal+',<br/> ':'')+
                                (record.json.position.ville     !=null?record.json.position.ville               :'');
                       }
                     }, 
                     {     id: 'dhSaisie' ,
                        header: "Date de Saisie",
                         width: 100     ,
                      sortable: true    ,
                     dataIndex: 'dhSaisie'   ,
                     renderer : Ext.util.Format.dateRenderer('d/m/Y H:i:s')
                     }
                  ])
              });
        
        
              
        var searchPanel = {
                xtype: 'panel',
                title: 'Recherche',
                width: 980,
                height: 110,
                layout: 'hbox',
                layoutConfig: {
                    align: 'stretch'
                },
                items: [
                    {
                        xtype: 'form',
                        labelWidth: 100,
                        labelAlign: 'left',
                        layout: 'form',
                        width: 240,
                        height: 110,
                        id: 'InterventionListForm1',
                        items: [
                            {
                                xtype     : 'datefield',
                                fieldLabel: 'Entre'    ,
                                anchor    : '100%'     ,
                                format    : 'd/m/Y'    ,
                                id        : 'InterventionListForm-DateEntre'
                            },
                            {
                                xtype     : 'datefield',
                                fieldLabel: 'Et'       ,
                                anchor    : '100%'     ,
                                format    : 'd/m/Y'    ,
                                id        : 'InterventionListForm-DateEt'
                            }
                        ]
                    },
                    {
                        xtype: 'form',
                        labelWidth: 110,
                        labelAlign: 'left',
                        layout: 'form',
                        width: 240,
                        height: 80,
                        id: 'InterventionListForm2',
                        items: [
                            {
                                xtype        : 'combo',
                                fieldLabel   : 'Motif',
                                anchor       : '100%',
                                id           : 'InterventionListForm-Motif',
                                typeAhead    : true,
                                mode         : 'local',
                                editable     : false,
                                triggerAction: 'all',
                                displayField : 'value',
                                store        : new Ext.data.ArrayStore({
                                    fields  : ['id', 'value'],
                                    data    : crfIrpUtils.getListForSimpleStore('MotifsIntervention'),
                                    idIndex : 0
                                })
                            },
                            {
                                xtype        : 'combo',
                                fieldLabel   : 'Origine',
                                anchor       : '100%',
                                id           : 'InterventionListForm-Origine',
                                editable     : false,
                                typeAhead    : true,
                                mode         : 'local',
                                displayField : 'value',
                                triggerAction: 'all',
                                store        : new Ext.data.ArrayStore({
                                    fields  : ['id', 'value'],
                                    data    : crfIrpUtils.getListForSimpleStore('OriginesIntervention'),
                                    idIndex : 0
                                })
                            }
                        ]
                    },
                    {
                        xtype     : 'form',
                        labelWidth: 100,
                        labelAlign: 'left',
                        layout    : 'form',
                        width     : 240,
                        height    : 110,
                        id        : 'InterventionListForm3',
                        items     : [
                            {
                                xtype     : 'textfield',
                                fieldLabel: 'Nom',
                                anchor    : '100%',
                                id        : 'InterventionListForm-Nom'
                            },
                            {
                                xtype        : 'combo',
                                fieldLabel   : 'Sex',
                                anchor       : '100%',
                                typeAhead    : true,
                                mode         : 'local',
                                editable     : false,
                                displayField : 'value',
                                triggerAction: 'all',
                                store        : new Ext.data.ArrayStore({
                                    fields  : ['id', 'value'],
                                    data    : [[1,'Homme'],[0,'Feminin']],
                                    idIndex : 0
                                }),
                                id: 'InterventionListForm-Sexe'
                            }
                        ]
                    },
                    {
                        xtype     : 'form',
                        labelWidth: 100,
                        labelAlign: 'left',
                        layout    : 'form',
                        width     : 240,
                        height    : 110,
                        id        : 'InterventionListForm4',
                        items     : [
                            {
                                xtype     : 'textfield',
                                fieldLabel: 'Age',
                                anchor    : '100%',
                                id        : 'InterventionListForm-age'
                                
                            },
                            {
                                xtype     : 'textfield',
                                fieldLabel: 'Code Postal',
                                anchor    : '100%',
                                id        : 'InterventionListForm-codePostal'
                            },
                            {
                                xtype        : 'combo',
                                fieldLabel   : 'Role Equipier',
                                anchor       : '100%',
                                id           : 'InterventionListForm-RoleEquipier',
                                typeAhead    : true,
                                mode         : 'local',
                                editable     : false,
                                displayField : 'value',
                                triggerAction: 'all',
                                store        : new Ext.data.ArrayStore({
                                    fields  : ['id', 'value'],
                                    data    : crfIrpUtils.getListForSimpleStore('RolesEquipier'),
                                    idIndex : 0
                                })
                            }
                        ]
                    }
                ]
            };
        
        this.interventionListWindow = new Ext.Window({
                id         : 'InterventListWindow',
                layout: {
                    type   : 'vbox',
                    align  : 'stretch'
                },

                width      : 980,
                height     : 580,
                closeAction: 'hide',
                plain      : true,
                resizable  : false,
                items      : [interventionListGrid, searchPanel],
                buttons: [{
                    text: 'Close',
                    handler: function(button, event){
                        Ext.getCmp('InterventListWindow').hide();
                    }
                },
                {
                    text: 'Rechercher',
                    handler: function(button, event){
                        Ext.getCmp('InterventionListGrid').getStore().reload();
                    }
                }]
            });
      },
      /*
       * Affiche les interventions liés à un objet
       * 
       * type='EQUIPIER' ou 'DISPOSITIF'
       * id : l'id de l'équipier ou du dispositif. 
       * */
      displayInterventionList:function(baseSearchType, id, onDblClickFunction)
      {
        this.interventionListWindow['baseSearchType' ]=baseSearchType;
        this.interventionListWindow['baseSearchValue']=id  ;
        this.interventionListWindow.onDblClickFunction=onDblClickFunction;
        
        this.interventionListWindow.show();
        var interventionListStore = Ext.getCmp('InterventionListGrid').getStore();
        interventionListStore.load();
      }
  };
}();

//Ext.onReady(function(){Ext.ux.Utils.CreditsAndChangeLog.init()});