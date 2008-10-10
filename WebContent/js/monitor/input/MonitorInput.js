var monitorInputCs          = null;

var miDispositifCs          = null;
var miCoRegulateurListCs    = null;
var miInterventionCs        = null;
var googleMapAdressResolver = null;
var miBilanCs               = null;

var MonitorInputCs = Class.create();

MonitorInputCs.prototype.initialize=function()
{
  //MonitorInput.initScriptSession();
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
  dwr.util.setValue('open'           , Regulation.open?'Ouverte':'Ferm�e');
  dwr.util.setValue('regulateur'     , Regulation.regulateur.nom + ' ' + Regulation.regulateur.prenom   );
  dwr.util.setValue('label'          , Regulation.label          );
};

MonitorInputCs.prototype.testCrossWindow=function()
{
  alert('CrossWindowsCallSuccess');
};




function initLayout()
{
  //Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
  Ext.QuickTips.init();
  
  
/****************INTERVENTION*TICKET*************************/
  
  var interventionEditor={
    region        : 'center',
    split         : true,
    contentEl     : 'InterventionPanel',
    title         : 'Editeur d\'Intervention',
    deferredRender: false,
    xtype         : 'panel'
    
  };
  var interventionList={
  	id          : 'InterventionListEastPanel',
    region      : 'east',
    split       : true,
    contentEl   : 'InterventionList',
    title       : 'Liste des Tickets d\'Interventions',
    xtype       : 'panel',
    width       : 800,
    collapsible : true,
    layout      : 'accordion',
    layoutConfig: {
        animate:true
    },
    items:[{
            title    :'Liste des Tickets d\'Interventions en cours de saisie',
            contentEl:'InterventionListEncoursEdition',
            border   :false,
            iconCls  :'settings'
          },
          {
            title    : 'Liste des Tickets d\'Interventions Non Affect�es',
            contentEl: 'InterventionListUnaffected',
            border   : false,
            iconCls  : 'settings'
          },
          {
            title    : 'Autres ',
            contentEl: 'InterventionListOthers',
            border   : false,
            iconCls  : 'settings'
          }]
  };
  
  
  var interventionPanel={
      id        : 'monitorInputInterventionPanel',
      title     : 'Gestion des Tickets d\'Interventions',
      closable  : false,
      autoScroll: true,
      layout    : 'border',
      tbar      : [new Ext.Action({
        text   : 'Ajouter un Ticket d\'Intervention',
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

    
    
/****************BILAN*************************/
  
  var bilanEditor={
    id            : 'monitorInputBilanEditorCenterPanel',
    region        : 'center',
    split         : true,
    contentEl     : 'BilanPanel',
    title         : 'Editeur de Bilan',
    deferredRender: false,
    xtype         : 'panel',
    collapsible   : true,
    collapsed     : true,
    layout        :'accordion',
    layoutConfig  :{
        animate:true
    },
    items:[{
            id       : 'monitorInputBilanEditorCenterPanelIdentite',
            title    : 'Identit�',
            contentEl: 'BilanIdentite',
            border   : false,
            iconCls  : 'settings'
          },
          {
            id       : 'monitorInputBilanEditorCenterPanelBilanSecouristeInitial',
            title    : 'Bilan Secouriste Initial',
            contentEl: 'BilanBilanSecouristeInitial',
            border   : false,
            iconCls  : 'settings'
          },
          {
            id       : 'monitorInputBilanEditorCenterPanelGesteEtObservation',
            title    : 'Gestes Et Observations',
            contentEl: 'BilanGestEtObservation',
            border   : false,
            iconCls  : 'settings'
          },
          {
            id       : 'monitorInputBilanEditorCenterPanelEvacuation',
            title    : 'Evacuation',
            contentEl: 'BilanEvacuation',
            border   : false,
            iconCls  : 'settings'
          }]
    
  };
  var bilanHelper={
    id          : 'monitorInputBilanHelperEastPanel',
    region      : 'east',
    split       : true,
    collapsible : true,
    collapsed   : true,
    contentEl   : 'BilanHelper',
    title       : 'R�sum�',
    xtype       : 'panel',
    width       : 200
  };
  
  
  var bilanPanel={
      id        : 'monitorInputBilanPanel',
      title     : 'Gestion des Bilans',
      closable  : false,
      autoScroll: true,
      layout    : 'border',
      items:[
        bilanEditor,
        bilanHelper
      ]
    };
        
    
/****************DISPOSITIF*EDITOR*************************/
    
  var dispositifEditor={
    region        : 'center',
    split         : true,
    contentEl     : 'DispositifPanel',
    title         : 'Editeur de Dispositif',
    deferredRender: false,
    xtype         :'panel'
    
  };
  var dispositifList={
    id          : 'DispositifListEastPanel',
    region      : 'east',
    split       : true,
    contentEl   : 'DispositifList',
    title       : 'Liste des Dispositifs',
    xtype       : 'panel',
    split       : true,
    width       : 800,
    collapsible : true,
    layout      : 'accordion',
    layoutConfig:{
        animate:true
    },
    items:[{
            title    : 'Liste des Dispositifs',
            contentEl: 'DispositifListCurrent',
            border   : false,
            iconCls  : 'settings'
          },
          {
            title    : 'Liste des Dispositifs en cours de saisie',
            contentEl: 'DispositifListEncoursEdition',
            border   : false,
            iconCls  : 'settings'
          }]
  };  
    
  var dispositifPanel={
      id        : 'monitorInputDispositifPanel',
      contentEl : 'DispositifPanel',
      title     : 'Editeur de Dispositif',
      closable  : false,
      autoScroll: true,
      layout    : 'border',
      tbar:[new Ext.Action({
        text   : 'Ajouter un Dispositif',
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
      id        : 'monitorInputRegulationPanel',
      contentEl : 'RegulationPanel',
      title     : 'Propri�t� de la R�gulation',
      closable  : false,
      autoScroll: true
    };
  
    

/********************BILAN*EDITOR*****************************/    
    
    
    
/****************NORTH/SOUTH/CENTER*************************/
  var north = new Ext.BoxComponent(
      { // raw
        id    :'monitorInputNorthRegion',
        region:'north',
        el    : 'north',
        height:50
      });
  
  var south = {
        id            : 'monitorInputSouthRegion',
        region        : 'south',
        contentEl     : 'south',
        split         : true,
        height        : 100,
        minSize       : 100,
        maxSize       : 200,
        collapsible   : true,
        collapsed     : true,
        title         : 'South',
        titleCollapse : true,
        margins       : '0 0 0 0'
      };
    
  var center = new Ext.TabPanel(
  {
    id            : 'monitorInputCenterRegion',
    region        : 'center',
    deferredRender: false,
    activeTab     : 0,
    items         : [
      interventionPanel,
      bilanPanel,
      dispositifPanel,
      regulationPanel
    ]
  });

  var viewport = new Ext.Viewport({ id    :'monitorInputViewPort',
                                    layout:'border',
                                    items :[ north, south, center]});

}

function init()
{
  monitorInputCs          = new MonitorInputCs                ();

  miDispositifCs          = new MonitorInputDispositifCs      ();
  miInterventionCs        = new MonitorInputInterventionCs    ();
  //miCoRegulateurListCs  = new MonitorInputCoRegulateurListCs();
  
  miBilanCs               = Ext.ux.MonitorInput.BilanEditor;
  miBilanCs.init();
  googleMapAdressResolver = Ext.ux.GMapAddressResolver ;
  googleMapAdressResolver.init();
 
  initLayout();
  monitorInputCs.initRegulation();
}