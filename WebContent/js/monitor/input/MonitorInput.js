var MonitorInputCs = Class.create();

MonitorInputCs.prototype.initialize=function()
{
  MonitorInput.initScriptSession();
};
MonitorInputCs.prototype.initRegulation=function()
{
  crfIrpUtils.getAllList();
  MonitorInput.getRegulation(monitorInputCs.initRegulationReturn);
};
MonitorInputCs.prototype.initRegulationReturn=function(Regulation)
{
  DWRUtil.setValue('regulationId'   , Regulation.regulationId       );
  DWRUtil.setValue('startDate'      , Regulation.startDateStr       );
  DWRUtil.setValue('expectedEndDate', Regulation.expectedEndDateStr );
  DWRUtil.setValue('open'           , Regulation.open?'Ouverte':'Fermée');
  DWRUtil.setValue('regulateur'     , Regulation.regulateur.nom + ' ' + Regulation.regulateur.prenom   );
  DWRUtil.setValue('label'          , Regulation.label          );
};

MonitorInputCs.prototype.testCrossWindow=function()
{
  alert('CrossWindowsCallSuccess');
};

var monitorInputCs        = null;

var miDispositifCs        = null;
var miCoRegulateurListCs  = null;
var miInterventionCs      = null;
var custumEventPS         = null;
var crfGoogleMap          = null;

function init()
{

  custumEventPS         = new CustumEventPublishSubscribe   (false);
  monitorInputCs        = new MonitorInputCs                ();
  
  miDispositifCs        = new MonitorInputDispositifCs      ();
  miInterventionCs      = new MonitorInputInterventionCs    ();
  //miCoRegulateurListCs  = new MonitorInputCoRegulateurListCs();
  crfGoogleMap          = new CrfGoogleMap                  ();
  
  initLayout();
  monitorInputCs.initRegulation();
}

function initLayout()
{
  //Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
  Ext.QuickTips.init();
  
  
  var north = new Ext.BoxComponent(
      { // raw
        region:'north',
        el: 'north',
        height:50
      });
  
  var south = {
        region:'south',
        contentEl: 'south',
        split:true,
        height: 100,
        minSize: 100,
        maxSize: 200,
        collapsible: true,
        collapsed : true,
        title:'South',
        titleCollapse :true,
        margins:'0 0 0 0'
      };
  
  var interventionEditor={
    region:'center',
    split:true,
    contentEl:'InterventionPanel',
    title:'Editeur d\'Intervention',
    deferredRender:false,
    xtype:'panel'
    
  };
  var interventionList={
  	id:'InterventionListEastPanel',
    region:'east',
    split:true,
    contentEl:'InterventionList',
    title:'Liste des Interventions',
    xtype:'panel',
    split:true,
    width: 800,
    collapsible: true,
    layout:'accordion',
    layoutConfig:{
        animate:true
    },
    items:[{
            title:'Liste des Interventions en cours de saisie',
            contentEl:'InterventionListEncoursEdition',
            border:false,
            iconCls:'settings'
          },
          {
            title:'Non Affectées',
            contentEl:'InterventionListUnaffected',
            border:false,
            iconCls:'settings'
          },
          {
            title:'Autres ',
            contentEl:'InterventionListOthers',
            border:false,
            iconCls:'settings'
          }]
  };
  
  
  var interventionPanel={
      title: 'Gestion des Interventions',
      closable:false,
      autoScroll:true,
      layout:'border',
      tbar:[new Ext.Action({
        text: 'Ajouter une Intervention',
        handler: function()
        {
          miInterventionCs.addIntervention();
        },
        iconCls: 'addButton'
      })
      ],
      items:[
        interventionEditor,
        interventionList
      ]
    };
    
  var dispositifPanel={
      contentEl:'DispositifPanel',
      title: 'Editeur de Dispositif',
      closable:false,
      autoScroll:true
    };
  
  var regulationPanel= {
      contentEl:'RegulationPanel',
      title: 'Propriété de la Régulation',
      closable:false,
      autoScroll:true
    };
  
  var center = new Ext.TabPanel(
  {
    region:'center',
    deferredRender:false,
    activeTab:0,
    items:[
      interventionPanel,
      dispositifPanel,
      regulationPanel
    ]
  });

  var viewport = new Ext.Viewport({layout:'border',items:[ north, south, center]});
  
  
  
  var xg = Ext.grid;
  
  var dataStore = new Ext.data.Store({
           proxy: new Ext.ux.rs.data.DwrProxy({
               call: MonitorInputIntervention.getInterventionTicketList,
               args: [0]
               }),
           reader: new Ext.data.JsonReader({
               fields:
                   [
                       {name: 'idIntervention', type: 'int'    },
                       {name: 'dhReception'   , type: 'date'   ,dateFormat:'Y-m-d\\TH:i:s'},
                       {name: 'nomVictime'    , type: 'string' },
                       {name: 'ville'         , type: 'string' }
                   ]
               })
           });
           

  var grid1 = new xg.GridPanel({
        id:'InterventionListEncoursEditionGrid',
        store: dataStore,
        cm: new xg.ColumnModel([
            {id:'idITUnfinishedCol'         , header: "Id"            , width: 30 , sortable: true, dataIndex: 'idIntervention'},
            {id:'dhReceptionITUnfinishedCol', header: "Date Récéption", width: 80 , sortable: true, renderer: Ext.util.Format.dateRenderer('d/m/Y H:i:s'), dataIndex: 'dhReception'},
            {id:'nomVictimeITUnfinishedCol' , header: "Nom Victime"   , width: 150, sortable: true, dataIndex: 'nomVictime'},
            {id:'villeITUnfinishedCol'      , header: "Ville"         , width: 150, sortable: true, dataIndex: 'ville'}
        ]),
        viewConfig: {
            forceFit:true
        },
        collapsible: false,
        animCollapse: false,
        iconCls: 'icon-grid',
        renderTo: 'InterventionListEncoursEdition'
    });
  grid1.getStore().load();
  
}