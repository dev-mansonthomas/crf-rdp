var iconPath = '../img/famfamfam/';
Ext.BLANK_IMAGE_URL = contextPath+'/js/extjs-2.0/resources/images/default/s.gif';

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
    region:'east',
    split:true,
    contentEl:'InterventionPanel',
    title:'Editeur d\'Intervention',
    deferredRender:false,
    xtype:'panel'
    
  };
  var interventionList={
    region:'center',
          split:true,
    contentEl:'InterventionList',
    title:'Liste des Interventions',
    xtype:'panel',
    split:true,
    width: 200,
    collapsible: true,
    layout:'accordion',
    layoutConfig:{
        animate:true
    },
    items:[{
            title:'Settings1',
            html:'<p>Some settings in here.</p>',
            border:false,
            iconCls:'settings'
          },
          {
            title:'Settings2',
            html:'<p>Some settings in here.</p>',
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
          alert('Click '+'You clicked on "Action 1".');
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
} 