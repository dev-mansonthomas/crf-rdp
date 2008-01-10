
Ext.BLANK_IMAGE_URL = contextPath+'/js/ext-2.0/resources/images/default/s.gif';

Ext.onReady(function()
{
 // Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
  Ext.QuickTips.init();
  
  
  var viewport = new Ext.Viewport(
  {
    layout:'border',
    items:
    [
      new Ext.BoxComponent(
      { // raw
        region:'north',
        el: 'north',
        height:62
      }),
      {
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
        region:'center',
        deferredRender:false,
        activeTab:0,
        items:[
        {
            contentEl:'center',
            title: 'Liste des r�gulations ouvertes',
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
               args: []
               }),
           reader: new Ext.data.JsonReader({
               fields:
                   [
                       {name: 'regulationId'   , type: 'int'},
                       {name: 'label'          , type: 'string'},
                       {name: 'startDate'      , type: 'date'},
                       {name: 'expectedEndDate', type: 'date'},
                       {name: 'regulateur.nom' , type: 'string'},
                       {name: 'comment'        , type: 'string'}
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
        store: dataStore,
        cm: new xg.ColumnModel([
            expander,
            {id:'labelCol'            , header: "Intitul�"      , width: 150, sortable: true, dataIndex: 'label'},
            {id:'startDateCol'        , header: "Date de D�but" , width: 80, sortable: true, renderer: Ext.util.Format.dateRenderer('d/m/Y H:i'), dataIndex: 'startDate'},
            {id:'expectedEndDateCol'  , header: "Date de Fin"   , width: 80, sortable: true, renderer: Ext.util.Format.dateRenderer('d/m/Y H:i'), dataIndex: 'expectedEndDate'},
            {id:'nomCol'              , header: "R�gulateur"    , width: 150, sortable: true, dataIndex: 'regulateur.nom'}
        ]),
        viewConfig: {
            forceFit:false
        },
        
        tbar:[{
            text:'Ajouter une r�gulation',
            tooltip:'D�clarer une nouvelle r�gulation',
            iconCls:'addButton',
            handler:function(){alert('click')}
        }],
        
        width: 600,
        height: 300,
        plugins: expander,
        collapsible: false,
        animCollapse: false,
        title: 'Liste des R�gulations en cours',
        iconCls: 'icon-grid',
        renderTo: 'RegulationList'
    });
  
  grid1.getStore().load();
});






