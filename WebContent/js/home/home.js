Ext.onReady(function()
{
  Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
  Ext.QuickTips.init();
  Ext.apply(Ext.QuickTips.getQuickTip(), { trackMouse: true});
  
  initLayout ();
  initHomeTab();
  
  EquipiersGestion = Ext.ux.Home.EquipiersGestion;
  EquipiersGestion.init();
  
  /* init de la liste des interventions*/
  PageBus.subscribe("list.loaded"     ,  this,
    function(){
      InterventionList = Ext.ux.Utils.InterventionList
      InterventionList.init();
      
    }
    , null, null);
  
      /* init de la liste des interventions*/
  PageBus.subscribe("listTypeLieu.loaded"     ,  this,
    function(){
      try
      {
        lieuEditor = new Ext.ux.Home.LieuEditorUi();  
      }
      catch(e)
      {
        console.log('erreur chargement interface edition leiu',e);
      }
    }
    , null, null);
    
    googleMapAdressResolver = Ext.ux.GMapAddressResolver ;
    googleMapAdressResolver.init();
    
    
  /*
  LieuEditor = Ext.ux.Home.LieuEditor;
  LieuEditor.init();
 */ 
  crfIrpUtils.getAllList();
});

function initLayout()
{
	var viewport = new Ext.Viewport(
			  {
			    layout:'border',
			    items:
			    [
			      new Ext.BoxComponent(
			      { // raw
			        id    : 'home_north',
			        region: 'north',
			        el    : 'north',
			        height: 62
			      }),
			      {
			        id         : 'home_south',
			        region     : 'south',
			        contentEl  : 'south',
			        split      : true,
			        height     : 100,
			        minSize    : 100,
			        maxSize    : 200,
			        collapsible: true,
			        title      : 'South',
			        margins    : '0 0 0 0'
			      },
			      new Ext.TabPanel(
			      {
			        id            : 'home_center',
			        region        : 'center',
			        deferredRender: false,
			        activeTab     : 0,
			        items         :[
			        {
			            id        : 'home_center_list_regulation_tab',
			            contentEl : 'center',
			            title     : 'Liste des régulations ouvertes',
			            closable  : false,
			            autoScroll: true
			        }
			        ]
			      })
			    ]
			  });
			  
			 
}

function initHomeTab()
{  
	  var regulationStore = new Ext.data.Store({
	           proxy: new Ext.ux.rs.data.DwrProxy({
	               call       : Homepage.getOpenRegulationList,
	               args       : [],
	               proxyConfig: Ext.ux.rs.data.NO_PAGING
	               }),
	           reader: new Ext.ux.rs.data.JsonReader({
	                 	root: 'data',
	         totalProperty: 'totalCount',
	                fields:
	                   [
	                       {name: 'regulationId'   , type: 'int'    },
	                       {name: 'label'          , type: 'string' },
	                       {name: 'startDate'      , type: 'date'   },
	                       {name: 'expectedEndDate', type: 'date'   },
	                       {name: 'regulateur.nom' , type: 'string' },
	                       {name: 'comment'        , type: 'string' }
	                   ]
	               })
	           });
	           
	  
  var checkboxSelectionModel = new Ext.grid.CheckboxSelectionModel({
      singleSelect: true,
      listeners   : {
          // On selection change, set enabled state of the removeButton
          // which was placed into the GridPanel using the ref config
          selectionchange: function(sm) {
              if (sm.getCount()) 
              {
                regulationGrid.editButton    .enable();    
              } 
              else 
              {
                regulationGrid.editButton    .disable();
              }
          }
      }
  });
             
             
	  var regulationGrid = new Ext.grid.GridPanel({
	        id         : 'home-list-regulation-grid',
	        store      : regulationStore,
	        listeners  : { rowdblclick : function(theGrid, rowIndex, e ){
	            openCrfIrp(theGrid.store.getAt(rowIndex).data.regulationId, 0);
	        }},
          sm: checkboxSelectionModel,
	        cm: new Ext.grid.ColumnModel([
          
	            checkboxSelectionModel,
	            {id:'labelCol'            , header: "Intitulé"      , width: 340, sortable: true, dataIndex: 'label'},
/*	            {id:'startDateCol'        , header: "Date de Début" , width: 116, sortable: true, renderer : Ext.util.Format.dateRenderer('d/m/Y H:i:s'), dataIndex: 'startDate'      },
	            {id:'expectedEndDateCol'  , header: "Date de Fin"   , width: 116, sortable: true, renderer : Ext.util.Format.dateRenderer('d/m/Y H:i:s'), dataIndex: 'expectedEndDate'},*/
	            {id:'nomCol'              , header: "Régulateur"    , width: 340, sortable: true, renderer : regulationListRegulateurCellRenderer       , dataIndex: 'regulateur.equipier.nom' }
	        ]),
	        viewConfig: {
	            forceFit:false
	        },
	        
	        tbar:[{
	          text   : 'Ajouter une régulation',
	          tooltip: 'Déclarer une nouvelle régulation',
	          iconCls: 'addButton',
	          handler: function(){alert('click')}
	        },
          {
            text   : 'Editer les régulateurs/co-régulateurs',
            tooltip: '',
            iconCls: 'editButton',
            handler: function(){alert('click')},
            //Place a reference in the GridPanel
            ref     : '../editButton',
            disabled: true
          }],
	        
	        width        : 700,
	        height       : 300,
	        //plugins      : expander,
	        collapsible  : false,
	        animCollapse : false,
	        title        : 'Liste des Régulations en cours',
	        iconCls      : 'icon-grid',
	        renderTo     : 'RegulationList'
	    });
	  
	  regulationGrid.getStore().load  ();
    regulationGrid.getEl   ().center();
}

function regulationListRegulateurCellRenderer(value, metadata, record, rowIndex, colIndex, store)
{
  return record.json.regulateur.equipier.numNivol +' - '+record.json.regulateur.equipier.nom+' '+ record.json.regulateur.equipier.prenom;
}


var windowReferences = Array();
    
function getWindowReference(windowName)
{
  if(windowName == 'monitorInputWindow' || windowName == 'monitorOutpuWindow')
  {
    var windowRef = windowReferences[windowName];
    if(windowRef != null)
      return windowRef;
     
    if(windowName == 'monitorInputWindow')
      return openMonitorInput();
    else
      return openMonitorOutput();
  }
}


//http://developer.mozilla.org/en/docs/window.open

function openMonitorInput()
{
  windowReferences['monitorInputWindow'] = window.open(contextPath+'/private/monitor/in.html' ,'monitorInputWindow' ,'resizable=yes,fullscreen=yes,scrollbars=yes,status=yes,toolbar=yes,menubar=yes,location=yes');
  return windowReferences['monitorInputWindow'];
}
function openMonitorOutput()
{
  windowReferences['monitorOutpuWindow'] = window.open(contextPath+'/private/monitor/out.html','monitorOutpuWindow','resizable=yes,fullscreen=yes,scrollbars=yes,status=yes,toolbar=yes,menubar=yes,location=yes');    
  return windowReferences['monitorOutpuWindow'];
}

function openCrfIrp(idRegulation, idIntervention)
{
	Homepage.setRegulation(idRegulation, idIntervention, openCrfIrpReturn);
}

function openCrfIrpReturn()
{
  //openMonitorOutput();
  openMonitorInput ();
}