Ext.namespace('Ext.ux.Home', 'Ext.ux.Home.LieuEditor');

// create application
Ext.ux.Home.LieuEditor = function() {
  // do NOT access DOM from here; elements don't exist yet

  // private variables
 

  // private functions

  // public space
  return {
    // public properties, e.g. strings to translate
    
    // public methods
    init : function() {
      PageBus.subscribe("listTypeLieu.loaded",  this, this.initLayout2 , null, null);
    },

    addFilter:function(objectFilter, domFieldName, fieldName, comparator, nullValue)
    {
      var domObj = Ext.getDom(domFieldName);
      if(domObj != null)
      {
        var value  = domObj.value;
        if (value!=null && value!=nullValue)
          objectFilter.push(new Ext.ux.rs.data.FilterObject(fieldName , value ,comparator));        
      }
      else
      {
        alert('DOM object "'+domFieldName+'" not found for grid filter object');
      }
      
    },
    initLayout2 : function() 
    {
      try
      {
        this.initLayout();        
      }
      catch(e)
      {
        console.log(e);
      }
    },    
    initLayout : function() 
    {

/*
      var lieuGridDataStore = new Ext.data.Store({
         proxy: new Ext.ux.rs.data.DwrProxy({
           call          : LieuEditorService.getLieux,
           args          : [],
           proxyConfig   : Ext.ux.rs.data.PAGING_WITH_SORT_AND_FILTER,
           filterCallBack: function()
           {
           
              var objectFilter = new Array();
              
              Ext.ux.Home.LieuEditor.addFilter(objectFilter, 'search_lieux_nom'               , 'nom'               ,'LIKE' , '');
              Ext.ux.Home.LieuEditor.addFilter(objectFilter, 'search_lieux_cp'                , 'codePostal'        ,'LIKE' , '');
              Ext.ux.Home.LieuEditor.addFilter(objectFilter, 'search_lieux_ville'             , 'ville'             ,'LIKE' , '');
              Ext.ux.Home.LieuEditor.addFilter(objectFilter, 'search_lieux_infoComplementaire', 'infoComplementaire','LIKE' , '');
              

              return objectFilter;
          }
       }),
       reader: new Ext.ux.rs.data.JsonReader({
            root: 'data',
            totalProperty: 'totalCount',
            fields:[
                {name: 'idLieu'             , type: 'int'     }, 
                {name: 'idTypeLieu'         , type: 'int'     }, 
                {name: 'icon'               , type: 'string'  }, 
                {name: 'iconGmapInit'       , type: 'string'  }, 
                {name: 'nom'                , type: 'string'  }, 
                {name: 'addresse'           , type: 'string'  }, 
                {name: 'codePostal'         , type: 'string'  }, 
                {name: 'ville'              , type: 'string'  }, 
                {name: 'googleCoordsLat'    , type: 'string'  }, 
                {name: 'googleCoordsLong'   , type: 'string'  }, 
                {name: 'infoComplementaire' , type: 'string'  }
            ]
       }),
       remoteSort: true
    });
    
    lieuGridDataStore.setDefaultSort('nom', 'asc');
      
      
          
    lieuListGrid = new Ext.grid.GridPanel({
        id    : 'home-list-lieu-grid',
        store : lieuGridDataStore,
        cm    : new Ext.grid.ColumnModel([
            {id:'idCol'               , header: 'id'         , width: 30  , sortable: true, dataIndex: 'id'},
            {id:'idTypeLieuCol'       , header: 'Type Lieu'  , sortable: true, dataIndex: 'idTypeLieu', 
              renderer:function(idTypeLieu){
                return crfIrpUtils.getTypeLieu(idTypeLieu);
              }
            },
            {id:'nomCol'                , header: 'Nom'                 , sortable: true, dataIndex: 'nom'                },
            {id:'addresseCol'           , header: 'Addresse'            , sortable: true, dataIndex: 'addresse'           },
            {id:'codePostalCol'         , header: 'CodePostal'          , sortable: true, dataIndex: 'codePostal'         },
            {id:'villeCol'              , header: 'Ville'               , sortable: true, dataIndex: 'ville'              },
            {id:'infoComplementaireCol' , header: 'Info Complementaire' , sortable: true, dataIndex: 'infoComplementaire' }
        ]),
        viewConfig: {
            forceFit:false
        },
        
        tbar:[{
            text   :'Ajouter un Lieu',
            tooltip:'Ajouter un Lieu',
            iconCls:'addButton',
            handler:function(){
                Ext.ux.Home.LieuEditor.initLieuForm();
              }
        }],
        listeners:{ 
          rowdblclick : function(theGrid, rowIndex, e ){
              Ext.ux.Home.LieuEditor.initLieuForm(theGrid.store.getAt(rowIndex).data);
          }
        },
        renderTo   : 'LieuSearchGrid',
        width      : 600,
        height     : 330,
        stripeRows : true,
        autoScroll : false,
        iconCls    : 'icon-grid',
  
        bbar:new Ext.PagingToolbar({
          pageSize   : 10,
          store      : lieuGridDataStore,
          displayInfo: true,
          displayMsg : 'Lieu(s) {0} à {1} de {2}',
          emptyMsg   : 'aucun lieu'
        })
    });    
*/
      lieuList = {
        id          : 'LieuListPanel',
        region      : 'center',
        split       : true,
        title       : 'Résultat de la recherche',
        xtype       : 'panel',
        collapsible : true,
        applyTo     : 'LieuSearch'
      };
      
      lieuEditor = {
        id              : 'LieuEditorPanel',
        region          : 'east',
        split           : true,
        title           : 'Edition d\'un Lieu',
        deferredRender  : false,
        xtype           : 'panel',
        width           : 670,
        collapsible     : true,
        applyTo         : 'LieuEdit'
        
    };

      var lieuPanel = {
        id          : 'LieuPanel',
        applyTo     : 'lieuPanel',
        title       : 'Gestion des Lieux',
        closable    : false,
        autoScroll  : true,
        listeners   : {activate:function(){
         // Ext.ux.Home.EquipiersGestion.searchEquipier();
        }},
        layout      : 'border',
        items       : [ lieuList  , 
                        lieuEditor]
      };
      var tabPanelComp = Ext.getCmp('home_center');
      tabPanelComp.add(lieuPanel);
    },
    searchEquipier:function()
    {
      Ext.getCmp('home-list-lieu-grid').getStore().load({params:{start:0, limit:10}});
    }
  };
}();