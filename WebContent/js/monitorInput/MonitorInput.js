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

function init()
{
  custumEventPS         = new CustumEventPublishSubscribe   (false);
  miWm                  = new MonitorInputWm                ();
  monitorInputCs        = new MonitorInputCs                ();
  miDispositifCs        = new MonitorInputDispositifCs      ();
  miCoRegulateurListCs  = new MonitorInputCoRegulateurListCs();
  miInterventionCs      = new MonitorInputInterventionCs    ();
  crfGoogleMap          = new CrfGoogleMap                  ();
  
  monitorInputCs.initRegulation();
  
  shortcut("CTRL+ALT+D", function(){miDispositifCs.displayAddDispositif()});
  shortcut("CTRL+ALT+I", function(){miInterventionCs.addIntervention()});
}


function callOnLoad(init)
{
  if (window.addEventListener)
    window.addEventListener("load", init, false);
  else if (window.attachEvent)
    window.attachEvent("onload", init);
  else
    window.onload = init;
}

callOnLoad(init);