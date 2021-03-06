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
  var datePart = crfIrpUtils.getDate           (clockTime);
  var timePart = crfIrpUtils.getTimeWithSeconds(clockTime);
  
  dwr.util.setValue('clockDate', datePart);
  dwr.util.setValue('clockTime', timePart);
  Ext.get('clockTime').highlight();
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
try
{
  googleMapAdressResolver = Ext.ux.GMapAddressResolver ;
  googleMapAdressResolver.init();
}
catch(e)
{
	     console.log(e);  
}
  taskRunner = new Ext.util.TaskRunner();
  
  crfIrpUtils.getAllList();
  initLayout();
  //ouverture de la seconde fentre
  //window.opener.openMonitorInput ();
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
                    ,{
                        id        : 'center-circulation2-panel',
                        contentEl : 'center-circulation2',
                        title     : 'Circulation Sytadin',
                        closable  : false,
                        autoScroll: true
                    }]
                });
  
  
   var viewport = new Ext.Viewport({id:'monitorOutputViewPort',layout:'border', items:[north, south , west, center]});
  
   window.setTimeout(function(){
    var map = Ext.getCmp('center-carte-paris-panel');
    map.goTo(48.85436, 2.348156);
    
    //Google Maps ne peu plus être intégré sous forme d'iFrame
    $('crfrdp-sytadin-paris-trafic-iframe'  ).src="http://www.sytadin.fr/opencms/sites/sytadin/sys/raster_fs.jsp.html_430821966.html";
    
    
   }, 3000);
  
   unmask.defer(100);
}
