Ext.namespace('Ext.ux.Home', 'Ext.ux.Home.EquipierEditor');

// create application
Ext.ux.Home.EquipierEditor = function() {
    // do NOT access DOM from here; elements don't exist yet

    // private variables
  
    // private functions
    
    // public space
    return {
      // public properties, e.g. strings to translate
      
      // public methods
      init: function() {
    	  this.initEquipierGrid();
        
      },
      
      initEquipierGrid:function()
      {
    	  var xg = Ext.grid;
    	  
    	  var dataStore = new Ext.data.Store({
    	           proxy: new Ext.ux.rs.data.DwrProxy({
    	               call  : Homepage.getRegulationList,
    	               args  : [],
    	               paging: PAGING_WITH_SORT_AND_FILTER
    	               }),
    	           reader: new Ext.data.JsonReader({
    	                 	root: 'data',
    	         totalProperty: 'totalCount',
    	                fields:
    	                   [
    	                       {name: 'regulationId'   , type: 'int'    },
    	                       {name: 'label'          , type: 'string' },
    	                       {name: 'startDate'      , type: 'date'   ,dateFormat:'Y-m-d\\TH:i:s'},
    	                       {name: 'expectedEndDate', type: 'date'   ,dateFormat:'Y-m-d\\TH:i:s'},
    	                       {name: 'regulateur.nom' , type: 'string' },
    	                       {name: 'comment'        , type: 'string' }
    	                   ]
    	               })
    	           });
    	           
    	      // row expander
    	  var expander = new xg.RowExpander({
    	        tpl : new Ext.Template(
    	            '<p><b>id:</b> {regulationId}<br>',
    	            '<p><b>comments:</b> {comment}</p>'
    	        )
    	    });

    	  var grid1 = new xg.GridPanel({
    	        id:'home-list-regulation-grid-test',
    	        store: dataStore,
    	        listeners :{ rowdblclick : function(theGrid, rowIndex, e ){
    	            openCrfIrp(theGrid.store.getAt(rowIndex).data.regulationId);
    	        }},
    	        cm: new xg.ColumnModel([
    	            expander,
    	            {id:'labelCol'            , header: "Intitulé"      , width: 150, sortable: true, dataIndex: 'label'},
    	            {id:'startDateCol'        , header: "Date de Début" , width: 80 , sortable: true, renderer: Ext.util.Format.dateRenderer('d/m/Y H:i:s'), dataIndex: 'startDate'},
    	            {id:'expectedEndDateCol'  , header: "Date de Fin"   , width: 80 , sortable: true, renderer: Ext.util.Format.dateRenderer('d/m/Y H:i:s'), dataIndex: 'expectedEndDate'},
    	            {id:'nomCol'              , header: "Régulateur"    , width: 150, sortable: true, dataIndex: 'regulateur.nom'}
    	        ]),
    	        viewConfig: {
    	            forceFit:false
    	        },
    	        
    	        tbar:[{
    	            text:'Ajouter une régulation',
    	            tooltip:'Déclarer une nouvelle régulation',
    	            iconCls:'addButton',
    	            handler:function(){alert('click')}
    	        }],
    	        
    	        width: 600,
    	        height: 300,
    	        plugins: expander,
    	        collapsible: false,
    	        animCollapse: false,
    	        title: 'Liste des Régulations',
    	        iconCls: 'icon-grid',
    	        renderTo: 'RegulationList-test',

    	        bbar:new Ext.PagingToolbar({
    	          pageSize   : 5,
    	          store      : dataStore,
    	          displayInfo: true,
    	          displayMsg : 'Dispositif(s) {0} à {1} de {2}',
    	          emptyMsg   : 'aucun dispositif en cours d\'édition'
    	        })
    	    });
    	  
          
    	  grid1.getStore().load({params:new GridSearchFilterAndSortObject(0,5, [new FilterObject('titit','toto')],[new SortObject('test',false)])});
        
        
      }
  };
}();

