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


var monitorOutputCs         = null;
var moInterventionCs        = null;
var moDispositifCs          = null;
var moDDH                   = null;
var googleMapAdressResolver = null;
var taskRunner              = null;

var iconPath = contextPath+'/img/famfamfam/';

function init()
{
  moDispositifCs    = new MonitorOutputDispositifCs   ();
  moInterventionCs  = new MonitorOutputInterventionCs ();
  monitorOutputCs   = new MonitorOutputCs             ();
  
  googleMapAdressResolver = Ext.ux.GMapAddressResolver ;
  googleMapAdressResolver.init();
  
  taskRunner = new Ext.util.TaskRunner();
  
  crfIrpUtils.getAllList();
  initLayout();
  initCirculationVue2Refresh();
}

function initCirculationVue2Refresh()
{
    // Start a simple clock task that updates a div once per second
  var task = {
      run: function(){
          var src = Ext.get('center-circulation2-img').dom.src;
          Ext.get('center-circulation2-img').dom.src=src.substring(0,src.indexOf(".gif")+4)+'?time='+(new Date()).format('c');
      },
      interval: 4*60*1000 //toutes les 4 muinutes
  }
   
  taskRunner.start(task);
}



function initLayout()
{
  Ext.QuickTips.init();
  Ext.apply(Ext.QuickTips.getQuickTip(), { trackMouse: true});
  
	 // function to remove loading mask
  var unmask = function() {
    var mask = Ext.get('loading-mask');
    var msg  = Ext.get('loading-msg');
    
    if(mask && msg) {
      mask.shift({
          xy        : msg.getXY     ()
        , width     : msg.getWidth  ()
        , height    : msg.getHeight ()
        , remove    : true
        , duration  : 1.6
        , opacity   : 0.3
        , easing    : 'bounceOut'
        , callback  : function(){Ext.fly(msg).remove();}
      });
    }
  };
  // }}}
  
  // install onclick handler to unmask body (for debugging)
  Ext.fly('loading-mask').on('click', unmask);
  
  Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
  
  
  var north = new Ext.BoxComponent({ // raw
                    id    : 'monitorOutputNorthRegion',
                    region: 'north',
                    el    : 'north',
                    height: 50
                });
  
  var south = {
                    id          : 'monitorOutputSouthRegion',
                    region      : 'south',
                    contentEl   : 'south',
                    split       : true,
                    height      : 100,
                    minSize     : 100,
                    maxSize     : 200,
                    collapsible : true,
                    title       : 'South',
                    margins     : '0 0 0 0'
                };
                
  var west = {
              id          : 'monitorOutputWestRegion',
              region      : 'west',
              title       : 'Intervention à affecter',
              split       : true,
              width       : 200 ,
              minSize     : 175 ,
              maxSize     : 400 ,
              collapsible : true,
              margins     : '0 0 0 5',
              layout      : 'accordion',
              layoutConfig: {
                  animate:true
              },
              listeners:{
                render:moInterventionCs.initializeInterventionDropZone
              }
          };
  
  var center = new Ext.TabPanel({
                    id            : 'monitorOutputCenterRegion',
                    region        : 'center',
                    deferredRender: false,
                    activeTab     : 0,
                    tabPosition   : 'bottom',
                    items:[{
                        id        : 'center-dispositif-panel',
                        contentEl : 'center-dispositif',
                        title     : 'Liste des Dispositifs',
                        closable  : false,
                        autoScroll: true
                    },{
                        id         : 'center-carte-paris-panel',
                        xtype      : 'gmappanel',
                        gmapType   : 'map',
                        zoomLevel  : 14,
                        mapConfOpts: ['enableScrollWheelZoom','enableDoubleClickZoom','enableDragging'],
                        mapControls: ['GLargeMapControl','GMapTypeControl', 'GOverviewMapControl', 'NonExistantControl' ],
                        streetView : {
                          panoramaId                : 'center-streetView',
                          panoramaTabCmpId          : 'center-streetView-panel',
                          panoramaTabPanelContainer : 'monitorOutputCenterRegion'
                          
                          
                        },
                        contentEl  : 'center-carte-paris',
                        title      : 'Carte de Paris',
                        closable   :false,
                        setCenter: {//paris
                            lat: 48.85436, 
                            lng: 2.348156
                        }                        
                    },{
                        id          : 'center-streetView-panel',
                        contentEl   : 'center-streetView',
                        title       : 'Street View',
                        closable    : false,
                        autoScroll  : true,
                        listeners   : {
                          bodyresize : function(panel, width, height){
                           var streetViewTab = Ext.getCmp('center-carte-paris-panel').streetViewPanoramaTab;
                           if(streetViewTab!=null)
                             streetViewTab.checkResize(); 
                          }
                        }
                    }
                    /*,{
                        id:'center-circulation1-panel',
                        contentEl:'center-circulation1',
                        title: 'Circulation vue 1',
                        closable:false,
                        autoScroll:true
                    }*/,{
                        id        : 'center-circulation2-panel',
                        contentEl : 'center-circulation2',
                        title     : 'Circulation vue simple',
                        closable  : false,
                        autoScroll: true
                    }]
                });
  
  
   var viewport = new Ext.Viewport({id:'monitorOutputViewPort',layout:'border', items:[north, south , west, center]});
  
   window.setTimeout(function(){
    var map = Ext.getCmp('center-carte-paris-panel');
    map.goTo(48.85436, 2.348156);
   }, 3000);
  
   unmask.defer(100);
}
