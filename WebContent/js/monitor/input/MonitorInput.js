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
  DWRUtil.setValue('open'           , Regulation.open?'Ouverte':'Ferm�e');
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
            title:'Liste des Interventions Non Affect�es',
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
      title: 'Propri�t� de la R�gulation',
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