Ext.namespace('Ext.ux.Home', 'Ext.ux.Home.EquipierEditor');

// create application
Ext.ux.Home.EquipierEditor = function() {
    // do NOT access DOM from here; elements don't exist yet

    // private variables
    var grid1 = null;
  
    // private functions
    
    // public space
    return {
      // public properties, e.g. strings to translate
      
      // public methods
      init: function() {
    	  this.initEquipierGrid();
    	  PageBus.subscribe("list.loaded", this, this.loadEquipiers, null, null);
    	  crfIrpUtils.getAllList();
      },
      
      initEquipierGrid:function()
      {
    	  var xg = Ext.grid;
    	  
    	  var myPageSize = 10;
    	  
    	  var dataStore = new Ext.data.Store({
    	           proxy: new Ext.ux.rs.data.DwrProxy({
    	               call          : Homepage.getEquipierList,
    	               args          : [],
    	               proxyConfig   : Ext.ux.rs.data.PAGING_WITH_SORT_AND_FILTER,
                       filterCallBack: function(){return [];}
    	           }),
    	           reader: new Ext.ux.rs.data.JsonReader({
    	                root: 'data',
    	                totalProperty: 'totalCount',
    	                fields:[
    	                     {name: 'nom'                     , type: 'string'  },
    	                     {name: 'prenom'                  , type: 'string'  },
    	                     {name: 'homme'                   , type: 'boolean' },
    	                     {name: 'delegation.idDelegation' , type: 'string'  },
    	                     {name: 'numNivol'                , type: 'string'  }
    	                ]
    	           }),
    	           remoteSort: true
    	  });
    	  
    	  dataStore.setDefaultSort('prenom', 'asc');
    	           
    	  grid1 = new xg.GridPanel({
    	        id:'home-list-equipier-grid-test',
    	        store: dataStore,
    	        cm: new xg.ColumnModel([
    	            {id:'nomCol'              , header: 'Nom'        , width: 140, sortable: true, dataIndex: 'nom'},
    	            {id:'prenomCol'           , header: 'Prénom'     , width: 140, sortable: true, dataIndex: 'prenom'},
    	            {id:'sexeCol'             , header: 'Sexe'       , width: 70 , sortable: true, dataIndex: 'homme', align:'center', 
    	            	renderer:function(isHomme){
    	            		var image = '<img style="vertical-align:bottom;" src="../img/famfamfam/user.png" alt="H" />';
    	            		if(!isHomme) {
    	            			image = '<img style="vertical-align:bottom;" src="../img/famfamfam/user_female.png" alt="F" />';
    	            		}
    	            		return image;
    	            	},
    	            },
    	            {id:'delegationCol'       , header: 'Délégation' , width: 120, sortable: true, dataIndex: 'delegation.idDelegation', 
    	                renderer:function(idDelegation){
    	            		return crfIrpUtils.getLabelFor('Delegations',idDelegation);
    	            	}
    	            },
    	            {id:'numNivolCol'         , header: 'Nivol'      , width: 80, sortable: true, dataIndex: 'numNivol'}
    	        ]),
    	        viewConfig: {
    	            forceFit:false
    	        },
    	        
    	        tbar:[{
    	            text:'Ajouter un équipier',
    	            tooltip:'Ajouter un équipier',
    	            iconCls:'addButton',
    	            handler:function(){alert('click')}
    	        }],
    	        
    	        width: 554,
    	        height: 270,
    	        title: 'Liste des équipiers',
    	        stripeRows : true,
    	        autoScroll : false,
    	        iconCls: 'icon-grid',
    	        renderTo: 'RegulationList-test',

    	        bbar:new Ext.PagingToolbar({
    	          pageSize   : myPageSize,
    	          store      : dataStore,
    	          displayInfo: true,
    	          displayMsg : 'Équipier(s) {0} à {1} de {2}',
    	          emptyMsg   : 'aucun équipier'
    	        })
    	    });
      },
      
      loadEquipiers:function()
      {
    	  grid1.getStore().load({params:{start:0, limit:10}});
      }
  };
}();
