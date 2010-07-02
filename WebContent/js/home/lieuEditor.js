Ext.namespace('Ext.ux.Home.LieuEditorUi');

Ext.ux.Home.LieuEditorUi = Ext.extend(Ext.Panel, {
  title        : 'Editeur de Lieu',
  initComponent: function() 
  {
    var lieuGridDataStore = new Ext.data.Store({
      remoteSort:true,
           proxy: new Ext.ux.rs.data.DwrProxy({
               call          : LieuEditorService.getLieux ,
               args          : []              ,
               proxyConfig   : Ext.ux.rs.data.PAGING_WITH_SORT_AND_FILTER,
               filterCallBack: function()
               {
               
                  var objectFilter = new Array();
                  

                  Ext.ux.rs.addFilterFromExtField(objectFilter,'LieuGridToolbar-idTypeLieu'   , 'idTypeLieu', '='   ,'');
                  Ext.ux.rs.addFilterFromExtField(objectFilter,'LieuGridToolbar-nom'          , 'nom'       , 'LIKE','');
                  Ext.ux.rs.addFilterFromExtField(objectFilter,'LieuGridToolbar-codePostal'   , 'codePostal', 'LIKE','');

                  return objectFilter;
              }
         }),
     reader: new Ext.ux.rs.data.JsonReader ({
            root: 'data',
   totalProperty: 'totalCount',
          fields:
             [
                 {name: 'idLieu'              , type: 'int'   },
                 {name: 'idTypeLieu'          , type: 'int'   },
                 {name: 'icon'                , type: 'string'},
                 {name: 'iconGmapInit'        , type: 'string'},
                 {name: 'nom'                 , type: 'string'},
                 {name: 'addresse'            , type: 'string'},
                 {name: 'codePostal'          , type: 'string'},
                 {name: 'ville'               , type: 'string'},
                 {name: 'googleCoordsLat'     , type: 'float' },
                 {name: 'googleCoordsLong'    , type: 'float' },
                 {name: 'infoComplementaire'  , type: 'string'},
                 {name: 'actif'               , type: 'boolean'}
             ]
         })
     });
    
    
    var lieuGrid = {
            id    : 'LieuGrid',
            store : lieuGridDataStore,
            xtype : 'grid',
            title : 'Liste des Lieux Existants',
            viewConfig:{
              forceFit:true
            },
            listeners : { 
              rowdblclick : function(theGrid, rowIndex, e )
              {
                var rowData = theGrid.store.getAt(rowIndex).data;
                lieuEditor.editLieu(rowData.idLieu)
              }
            },
            height: 335,
            enableHdMenu: true,
            columns: [
               {
                  xtype     : 'gridcolumn',
                  header    : 'id',
                  sortable  : true,
                  resizable : true,
                  width     : 40,
                  dataIndex : 'idLieu'
               },
               {
                  xtype     : 'gridcolumn',
                  header    : 'actif',
                  sortable  : true,
                  resizable : true,
                  width     : 40,
                  dataIndex : 'actif',
                  renderer : function(value, metadata, record, rowIndex, colIndex, store)
                  {
                    return '<img src="'+contextPath+'/img/famfamfam/world'+(record.data.actif?'':'_disabled')+'.png" alt="Le lieu est '+(record.data.actif?'actif':'inactif')+'"/>';
                  }
               },
               {
                  xtype     : 'gridcolumn',
                  header    : 'Type',
                  sortable  : true,
                  resizable : true,
                  width     : 40,
                  dataIndex : 'idTypeLieu',
                  renderer : function(value, metadata, record, rowIndex, colIndex, store)
                  {
                    try
                    {
                      return crfIrpUtils.getTypeLieu(value).labelTypeLieu;;
                    }
                    catch(e)
                    {
                      console.log("Erreur lors de la récupération du label pour le type lieu (lieuEditor)",e);
                      return '';
                    }
                  }
               },
               {
                  xtype     : 'gridcolumn',
                  header    : 'Nom',
                  sortable  : true,
                  resizable : true,
                  width     : 100,
                  dataIndex : 'nom'
               },
               {
                  xtype     : 'gridcolumn',
                  header    : 'Adresse',
                  sortable  : true,
                  resizable : true,
                  width     : 100,
                  dataIndex : 'addresse'
               },
               {
                  xtype     : 'gridcolumn',
                  header    : 'Code Postal',
                  sortable  : true,
                  resizable : true,
                  dataIndex : 'codePostal'
               },
               {
                  xtype     : 'gridcolumn',
                  header    : 'Ville',
                  sortable  : true,
                  resizable : true,
                  width     : 100,
                  dataIndex : 'ville'
               }
            ],
            bbar: {
                xtype: 'paging',
          pageSize   : 10,
          store      : lieuGridDataStore,
          displayInfo: true,
          displayMsg : 'Intervention(s) {0} à {1} de {2}',
          emptyMsg   : 'aucune intervention correspondant à la recherche',
                items: [
                  {
                     xtype: 'tbfill'
                  },
                  {
                     xtype  : 'button',
                     text   : 'Nouveau Lieu',
                     iconCls: 'lieuNewButton',
                     handler: function(){
                      lieuEditor.createNewLieu();
                     }
                  }
               ]
            },
            tbar: {
               xtype: 'toolbar',
               items: [
                  {
                     xtype : 'label',
                     text  : 'Type Lieu',
                     style :'padding-right:15px;padding-left:5px;'
                  },
                  {
                    id           :'LieuGridToolbar-idTypeLieu',
                    xtype        : 'combo',
                    fieldLabel   : 'Type Lieu',
                    anchor       : '100%',
                    mode         : 'local',
                    typeAhead    : true,
                    editable     : false,
                    triggerAction: 'all',
                    displayField : 'labelTypeLieu',
                    valueField   : 'idTypeLieu',
                    store        : new Ext.data.ArrayStore({
                        fields  : ['idTypeLieu', 'labelTypeLieu'],
                        data    : crfIrpUtils.getListForSimpleStore('allTypeLieuOrdered'),
                        idIndex : 0
                    })
                  },
                  {
                     xtype     : 'tbseparator'
                  },
                  {
                     xtype     : 'label',
                     text      : 'Nom',
                     style     :'padding-right:15px;padding-left:5px;'
                  },
                  {
                     id        :'LieuGridToolbar-nom',
                     xtype     : 'textfield',
                     fieldLabel: 'Label'
                  },
                  {
                     xtype     : 'tbseparator'
                  },
                  {
                     xtype     : 'label',
                     text      : 'Code Postal',
                     style     : 'padding-right:15px;padding-left:5px;'
                  },
                  {
                     id        :'LieuGridToolbar-codePostal',
                     xtype     : 'textfield',
                     fieldLabel: 'Label'
                  },
                  {
                     xtype  : 'tbfill'
                  },
                  {
                     xtype  : 'button',
                     text   : 'Rechercher',
                     iconCls: 'lieuSearchButton',
                     handler: function(){
                      lieuEditor.rechercher();
                     }
                  }
               ]
            }
         };    
    
    
    
    
      this.items = [
         {
            xtype       : 'panel' ,
            height      : 175     ,
            layout      : 'border',
            hideBorders : false   ,
            items       : [
               {
                  xtype       : 'form',
                  labelWidth  : 100   ,
                  labelAlign  : 'left',
                  layout      : 'form',
                  region      : 'west',
                  width       : 650   ,
                  layoutConfig: {
                     labelSeparator: ' '
                  },
                  items: [
                     {
                        id        : 'LieuEditor-id' ,
                        xtype     : 'numberfield'   ,
                        fieldLabel: 'id'            ,
                        anchor    : '100%'          ,
                        disabled  : true
                     },
                     {
                        id           : 'LieuEditor-idTypeLieu',
                        xtype        : 'combo',
                        fieldLabel   : 'Type Lieu',
                        anchor       : '100%',
                        mode         : 'local',
                        typeAhead    : true,
                        editable     : false,
                        triggerAction: 'all',
                        displayField : 'labelTypeLieu',
                        store        : new Ext.data.ArrayStore({
                            fields  : ['idTypeLieu', 'labelTypeLieu'],
                            data    : crfIrpUtils.getListForSimpleStore('allTypeLieuOrdered'),
                            idIndex : 0
                        })
                     },
                     {
                        id        : 'LieuEditor-nom',
                        xtype     : 'textfield',
                        fieldLabel: 'Nom',
                        anchor    : '100%'
                     },
                     {
                        id        : 'LieuEditor-telephone',
                        xtype     : 'textfield',
                        fieldLabel: 'Téléphone',
                        anchor    : '100%'
                     },
                     {
                        id        : 'LieuEditor-mail',
                        xtype     : 'textfield',
                        fieldLabel: 'Mail',
                        anchor    : '100%'
                     },
                     {
                        id        : 'LieuEditor-web',
                        xtype     : 'textfield',
                        fieldLabel: 'web',
                        anchor    : '100%',
                        emptyText :'http://'
                     }
                  ]
               },
               {
                  xtype       : 'form'  ,
                  labelWidth  : 100     ,
                  labelAlign  : 'left'  ,
                  layout      : 'form'  ,
                  region      : 'center',
                  layoutConfig: {
                     labelSeparator: ' '
                  },
                  items: [
                     {
                        id        : 'LieuEditor-address',
                        xtype     : 'textfield'         ,
                        fieldLabel: 'Adresse'           ,
                        anchor    : '100%'
                     },
                     {
                        id        : 'LieuEditor-codePostal' ,
                        xtype     : 'textfield'             ,
                        fieldLabel: 'Code Postal'           ,
                        anchor    : '100%'
                     },
                     {
                        id        : 'LieuEditor-ville'      ,
                        xtype     : 'textfield'             ,
                        fieldLabel: 'Ville'                 ,
                        anchor    : '100%'
                     },
                     {
                        id        : 'LieuEditor-gps',
                        xtype     : 'textfield'     ,
                        fieldLabel: 'GPS (lat,long)',
                        anchor    : '100%'
                     },
                     {
                        id        : 'LieuEditor-infoComplementaire' ,
                        xtype     : 'textarea'                      ,
                        fieldLabel: 'Info Complémentaires'          ,
                        anchor    : '100%'
                     }
                  ]
               }
            ]
         },
         lieuGrid
      ];
      
      
      this.createToolbar ={
         xtype: 'toolbar',
         items: [
            {
               xtype  : 'button',
               text   : 'Voir Sur Google Maps',
               iconCls: 'lieuWatchOnGoogleMapsButton',
               handler:function()
               {
                 lieuEditor.watchOnGoogleMaps();
               }
            },
            {
               xtype: 'tbseparator'
            },
            {
               xtype  : 'button',
               text   : 'Activer',
               iconCls: 'lieuEnableButton',
               handler:function()
               {
                 lieuEditor.enableLieu();
               }
            },
            {
               xtype: 'tbfill'
            },
            {
               xtype  : 'button',
               text   : 'Supprimer',
               iconCls: 'lieuDeleteButton',
               handler: function()
               {
                lieuEditor.deleteLieu();
               }
               
            }
         ]
      };
      
      this.toolbarForEnabledLieu = {
         xtype: 'toolbar',
         items: [
            {
               xtype  : 'button',
               text   : 'Voir Sur Google Maps',
               iconCls: 'lieuWatchOnGoogleMapsButton',
               handler:function()
               {
                 lieuEditor.watchOnGoogleMaps();
               }
            },
            {
               xtype: 'tbseparator'
            },
            {
               xtype  : 'button',
               text   : 'Désactiver',
               iconCls: 'lieuDisableButton',
               handler:function()
               {
                 lieuEditor.disableLieu();;
               }
            },
            {
               xtype: 'tbfill'
            },
            {
               xtype  : 'button',
               text   : 'Supprimer',
               iconCls: 'lieuDeleteButton',
               handler: function()
               {
                  lieuEditor.deleteLieu();
               }
               
            }
         ]
      };
      
      this.toolbarFordisabledLieu = {
         xtype: 'toolbar',
         items: [
            {
               xtype  : 'button',
               text   : 'Voir Sur Google Maps',
               iconCls: 'lieuWatchOnGoogleMapsButton',
               handler:function()
               {
                 lieuEditor.watchOnGoogleMaps();
               }
            },
            {
               xtype: 'tbseparator'
            },
            {
               xtype  : 'button',
               text   : 'Activer',
               iconCls: 'lieuEnableButton',
               handler:function()
               {
                  lieuEditor.enableLieu();
               }
            },
            {
               xtype: 'tbfill'
            },
            {
               xtype  : 'button',
               text   : 'Supprimer',
               iconCls: 'lieuDeleteButton',
               handler: function()
               {
                 lieuEditor.deleteLieu();
               }
               
            }
         ]
      };
      

      Ext.ux.Home.LieuEditorUi.superclass.initComponent.call(this);
      
      var tabPanelComp = Ext.getCmp('home_center');
      tabPanelComp.add(this);
      this.rechercher();
      
   },
   rechercher:function()
   {
     Ext.getCmp('LieuGrid').getStore().reload();
   },
   resetForm:function()
   {
     Ext.get('LieuEditor-id'                ).dom.value='';
     Ext.get('LieuEditor-idTypeLieu'        ).setValue ('');
     Ext.get('LieuEditor-nom'               ).dom.value='';
     Ext.get('LieuEditor-telephone'         ).dom.value='';
     Ext.get('LieuEditor-mail'              ).dom.value='';
     Ext.get('LieuEditor-web'               ).dom.value='';
     Ext.get('LieuEditor-address'           ).dom.value='';
     Ext.get('LieuEditor-codePostal'        ).dom.value='';
     Ext.get('LieuEditor-ville'             ).dom.value='';
     Ext.get('LieuEditor-gps'               ).dom.value='';
     Ext.get('LieuEditor-infoComplementaire').dom.value='';
   },
   createNewLieu:function()
   {
     this.resetForm();
     LieuEditorService.createNewEmptyLieu(this.createNewLieuReturn);
   },
   createNewLieuReturn:function(idLieu)
   {
     Ext.get('LieuEditor-id').dom.value=idLieu;
   },
   editLieu:function(idLieu)
   {
     LieuEditorService.getLieu(idLieu, this.editLieuReturn);
   },
   editLieuReturn:function(lieu)
   {
     Ext.get('LieuEditor-id'                ).dom.value=lieu.idLieu;
     Ext.get('LieuEditor-idTypeLieu'        ).setValue(lieu.idTypeLieu);
     Ext.get('LieuEditor-nom'               ).dom.value=lieu.nom;
     Ext.get('LieuEditor-telephone'         ).dom.value=lieu.telephone;
     Ext.get('LieuEditor-mail'              ).dom.value=lieu.mail;
     Ext.get('LieuEditor-web'               ).dom.value=lieu.url;
     Ext.get('LieuEditor-address'           ).dom.value=lieu.addresse;
     Ext.get('LieuEditor-codePostal'        ).dom.value=lieu.codePostal;
     Ext.get('LieuEditor-ville'             ).dom.value=lieu.ville;
     Ext.get('LieuEditor-gps'               ).dom.value=lieu.googleCoordsLat+','+lieu.googleCoordsLong;
     Ext.get('LieuEditor-infoComplementaire').dom.value=lieu.infoComplementaire;
   },
   enableLieu:function()
   {
      LieuEditorService.enableLieu (Ext.get('LieuEditor-id'                ).dom.value, this.enableLieuReturn);
   },
   enableLieuReturn:function()
   {
    
    this.rechercher();
   },
   disableLieu:function()
   {
      LieuEditorService.disableLieu(Ext.get('LieuEditor-id'                ).dom.value, this.disableLieuReturn);
   },
   disableLieuReturn:function()
   {
    this.rechercher();
   },
   deleteLieu:function()
   {
      LieuEditorService.deleteLieu(Ext.get('LieuEditor-id'                ).dom.value, this.deleteLieuReturn);
   },
   deleteLieuReturn:function(deleteStatus)
   {
    this.rechercher();
   },
   watchOnGoogleMaps:function()
   {
    
   }
});