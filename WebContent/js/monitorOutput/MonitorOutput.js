var MonitorOutputCs = Class.create();


MonitorOutputCs.prototype.getMonitorInputRef=function()
{
  return window.opener.getWindowReference('monitorInputWindow');
};

MonitorOutputCs.prototype.initialize=function()
{
  DWRUtil.useLoadingMessage("Loading...");
  DWREngine.setActiveReverseAjax(true);
  Monitor.initScriptSession();  
};

MonitorOutputCs.prototype.updateClock = function (clockTime)
{
  DWRUtil.setValue('clock', clockTime);
};


var monitorOutputCs   = null;
var moInterventionCs  = null;
var moDispositifCs    = null;
var custumEventPS     = null;
var crfGoogleMap      = null;

var acc              = null;

// set blank image to local file
Ext.BLANK_IMAGE_URL = '../js/extjs/resources/images/default/s.gif';
var iconPath = '../img/famfamfam/';


function init()
{
  custumEventPS     = new CustumEventPublishSubscribe (false);
  moDispositifCs    = new MonitorOutputDispositifCs   ();
  moInterventionCs  = new MonitorOutputInterventionCs ();
  monitorOutputCs   = new MonitorOutputCs             ();
  crfGoogleMap      = new CrfGoogleMap                ();

  
  crfIrpUtils.getAllList();
  crfGoogleMap.instancianteMap(48.85436, 2.348156);
    
  shortcut("CTRL+ALT+D", function(){moDispositifCs.addDispositif()});
  shortcut("CTRL+ALT+I", function(){moInterventionCs.addIntervention()});
}