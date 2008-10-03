Ext.onReady(function()
{
  Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
  Ext.QuickTips.init();
  
  
  var viewport = new Ext.Viewport(
  {
    layout:'border',
    items:
    [
      new Ext.BoxComponent(
      { // raw
        id:'home_north',
        region:'north',
        el: 'north',
        height:62
      }),
      {
        id:'home_south',
        region:'south',
        contentEl: 'south',
        split:true,
        height: 100,
        minSize: 100,
        maxSize: 200,
        collapsible: true,
        title:'South',
        margins:'0 0 0 0'
      },
      new Ext.TabPanel(
      {
        id:'home_center',
        region:'center',
        deferredRender:false,
        activeTab:0,
        items:[
        {
            id:'home_center_list_regulation_tab',
            contentEl:'center',
            title: 'Liste des régulations ouvertes',
            closable:false,
            autoScroll:true
        }]
      })
    ]
  });
  
  var xg = Ext.grid;
  
  var dataStore = new Ext.data.Store({
           proxy: new Ext.ux.rs.data.DwrProxy({
               call: Homepage.getOpenRegulationList,
               args: [],
               paging: false
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
        id:'home-list-regulation-grid',
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
        title: 'Liste des Régulations en cours',
        iconCls: 'icon-grid',
        renderTo: 'RegulationList'
    });
  
  grid1.getStore().load();
});



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

function openCrfIrp(regulationId)
{
	Homepage.setRegulation(regulationId, openCrfIrpReturn);
}

function openCrfIrpReturn()
{
  openMonitorOutput();
  openMonitorInput ();
}