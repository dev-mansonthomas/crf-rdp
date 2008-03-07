var MonitorOutputCs = Class.create();

MonitorOutputCs.prototype.getMonitorInputRef=function()
{
  return window.opener.getWindowReference('monitorInputWindow');
};

MonitorOutputCs.prototype.initialize=function()
{
  dwr.util.useLoadingMessage("Loading...");
  dwr.engine.setActiveReverseAjax(true);
  Monitor.initScriptSession();  
};

MonitorOutputCs.prototype.updateClock = function (clockTime)
{
  dwr.util.setValue('clock', clockTime);
};


var monitorOutputCs   = null;
var moInterventionCs  = null;
var moDispositifCs    = null;
var crfGoogleMap      = null;

var iconPath = contextPath+'/img/famfamfam/';

function init()
{
  moDispositifCs    = new MonitorOutputDispositifCs   ();
  moInterventionCs  = new MonitorOutputInterventionCs ();
  monitorOutputCs   = new MonitorOutputCs             ();
  crfGoogleMap      = new CrfGoogleMap                ();

  
  crfIrpUtils.getAllList();
  initLayout();
  crfGoogleMap.instancianteMap(48.85436, 2.348156);
}



function initLayout()
{
	 // function to remove loading mask
  var unmask = function() {
    var mask = Ext.get('loading-mask');
    var msg = Ext.get('loading-msg');
    if(mask && msg) {
      mask.shift({
        xy:msg.getXY()
        , width:msg.getWidth()
        , height:msg.getHeight()
        , remove: true
        , duration: 1.6
        , opacity: 0.3
        , easing: 'bounceOut'
        , callback: function(){Ext.fly(msg).remove();}
      });
    }
  };
  // }}}
  
  // install onclick handler to unmask body (for debugging)
  Ext.fly('loading-mask').on('click', unmask);
  
  Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
  
  
  var north = new Ext.BoxComponent({ // raw
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
                    title:'South',
                    margins:'0 0 0 0'
                };
  //
  
  var west = {
              region:'west',
              id:'west-panel',
              title:'West',
              split:true,
              width: 200,
              minSize: 175,
              maxSize: 400,
              collapsible: true,
              margins:'0 0 0 5',
              layout:'accordion',
              layoutConfig:{
                  animate:true
              }
          };
  
  var center = new Ext.TabPanel({
                    region:'center',
                    deferredRender:false,
                    activeTab:0,
                    tabPosition:'bottom',
                    items:[{
                        id:'center-dispositif-panel',
                        contentEl:'center-dispositif',
                        title: 'Liste des Dispositifs',
                        closable:false,
                        autoScroll:true
                    },{
                        id:'center-carte-paris-panel',
                        contentEl:'center-carte-paris',
                        title: 'Carte de Paris',
                        closable:false,
                        autoScroll:true
                    }]
                });
  
  
   var viewport = new Ext.Viewport({layout:'border', items:[north, south,west, south, center]});
  
  
  
  unmask.defer(100);
}
