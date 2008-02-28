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
  dwr.util.setValue('regulationId'   , Regulation.regulationId       );
  dwr.util.setValue('startDate'      , Regulation.startDateStr       );
  dwr.util.setValue('expectedEndDate', Regulation.expectedEndDateStr );
  dwr.util.setValue('open'           , Regulation.open?'Ouverte':'Fermée');
  dwr.util.setValue('regulateur'     , Regulation.regulateur.nom + ' ' + Regulation.regulateur.prenom   );
  dwr.util.setValue('label'          , Regulation.label          );
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
  
  
/****************INTERVENTION*TICKET*************************/
  
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
    title:'Liste des Tickets d\'Interventions',
    xtype:'panel',
    split:true,
    width: 800,
    collapsible: true,
    layout:'accordion',
    layoutConfig:{
        animate:true
    },
    items:[{
            title:'Liste des Tickets d\'Interventions en cours de saisie',
            contentEl:'InterventionListEncoursEdition',
            border:false,
            iconCls:'settings'
          },
          {
            title:'Liste des Tickets d\'Interventions Non Affectées',
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
      title: 'Gestion des Tickets d\'Interventions',
      closable:false,
      autoScroll:true,
      layout:'border',
      tbar:[new Ext.Action({
        text: 'Ajouter un Ticket d\'Intervention',
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
    
    
/****************DISPOSITIF*EDITOR*************************/
    
  var dispositifEditor={
    region:'center',
    split:true,
    contentEl:'DispositifPanel',
    title:'Editeur de Dispositif',
    deferredRender:false,
    xtype:'panel'
    
  };
  var dispositifList={
    id:'DispositifListEastPanel',
    region:'east',
    split:true,
    contentEl:'DispositifList',
    title:'Liste des Dispositifs',
    xtype:'panel',
    split:true,
    width: 800,
    collapsible: true,
    layout:'accordion',
    layoutConfig:{
        animate:true
    },
    items:[{
            title:'Liste des Dispositifs',
            contentEl:'DispositifListCurrent',
            border:false,
            iconCls:'settings'
          },
          {
            title:'Liste des Interventions en cours de saisie',
            contentEl:'DispositifListEncoursEdition',
            border:false,
            iconCls:'settings'
          }]
  };  
    
  var dispositifPanel={
      contentEl:'DispositifPanel',
      title: 'Editeur de Dispositif',
      closable:false,
      autoScroll:true,
      layout:'border',
      tbar:[new Ext.Action({
        text: 'Ajouter un Dispositif',
        handler: function()
        {
          miDispositifCs.createNewEmptyDispositif();
        },
        iconCls: 'addButton'
      })
      ],
      items:[
        dispositifEditor,
        dispositifList
      ]
    };
  
  var regulationPanel= {
      contentEl:'RegulationPanel',
      title: 'Propriété de la Régulation',
      closable:false,
      autoScroll:true
    };
  
    

    
/****************NORTH/SOUTH/CENTER*************************/
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