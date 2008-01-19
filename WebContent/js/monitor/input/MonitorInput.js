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

var miWm                  = null;
var monitorInputCs        = null;

var miDispositifCs        = null;
var miCoRegulateurListCs  = null;
var miInterventionCs      = null;
var custumEventPS         = null;
var crfGoogleMap          = null;

var iconPath = '../img/famfamfam/';
Ext.BLANK_IMAGE_URL = contextPath+'/js/extjs-2.0/resources/images/default/s.gif';
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
	Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
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
        height:50
      }),
      {
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
      },
      new Ext.TabPanel(
      {
        region:'center',
        deferredRender:false,
        activeTab:0,
        items:[
        {
          contentEl:'InterventionEditor',
          title: 'Editeur d\'Intervention',
          closable:false,
          autoScroll:true,
          tbar:[new Ext.Action({
            text: 'Ajouter une Intervention',
            handler: function()
            {
              Ext.example.msg('Click','You clicked on "Action 1".');
            },
            iconCls: 'addButton'
          })
          ]
        },
        {
        	contentEl:'DispositifEditor',
          title: 'Editeur de Dispositif',
          closable:false,
          autoScroll:true
        },
        {
        	contentEl:'RegulationEditor',
          title: 'Propriété de la Régulation',
          closable:false,
          autoScroll:true
        }]
      })
    ]
  });
}