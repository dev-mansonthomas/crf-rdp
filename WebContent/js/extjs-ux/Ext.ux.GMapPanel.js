/*
 * Ext JS Library 2.2
 * Copyright(c) 2006-2008, Ext JS, LLC.
 * licensing@extjs.com
 *
 * http://extjs.com/license
 */

/**
 * @author Manson Thomas for the French Red Cross
 * @originalAuthor Shea Frederick from www.extjs.com
 */

Ext.namespace('Ext.ux');

/**
 *
 * @class GMapPanel
 * @extends Ext.Panel
 */
Ext.ux.GMapPanel = Ext.extend(Ext.Panel, {
  initComponent : function()
  {
    var defConfig = {
      plain              : true,
      zoomLevel          : 3,
      yaw                : 180,
      pitch              : 0,
      zoom               : 0,
      gmapType           : 'map',
      border             : false,
      directionCategories: [],
      markerCategories   : [],
      iconsForCategory   : [],
      googleMapAvailable : true,
      geocoder           : null,
      defaultCountry     : "France",
      streetViewOverlay  : true
    };
    Ext.applyIf(this,defConfig);
    Ext.ux.GMapPanel.superclass.initComponent.call(this);
    this.checkGoogleMap();
  },
  checkGoogleMap:function()
  {
    try
    {
      this.geocoder           = new GClientGeocoder();
      this.googleMapAvailable = true;//si initialement on a pas la connexion a google, et qu'on recheck
    }
    catch(e)
    {
      this.googleMapAvailable = false;
    }
  },
  afterRender : function()
  {
    if(this.googleMapAvailable!= true)
      return;
    
    var wh = this.ownerCt.getSize();
    Ext.applyIf(this, wh);

    Ext.ux.GMapPanel.superclass.afterRender.call(this);

    if (this.gmapType === 'map'){
      this.gmap = new GMap2(this.body.dom);
    }

    if (this.gmapType === 'panorama'){
      this.gmap = new GStreetviewPanorama(this.body.dom);
    }
   	
    	
    if (typeof this.addControl == 'object' && this.gmapType === 'map') {
      this.gmap.addControl(this.addControl);
    }

    if (typeof this.setCenter === 'object') 
    {
      if (typeof this.setCenter.geoCodeAddr === 'string')
      {
        this.geoCodeLookup(this.setCenter.geoCodeAddr);
      }
      else
      {
        if (this.gmapType === 'map')
        {
          var point = new GLatLng(this.setCenter.lat,this.setCenter.lng);
          this.gmap.setCenter(point, this.zoomLevel);
        }
        if (typeof this.setCenter.marker === 'object' && typeof point === 'object')
        {
          this.addMarker(point,this.setCenter.marker,this.setCenter.marker.clear);
        }
      }
      if (this.gmapType === 'panorama')
      {
        this.gmap.setLocationAndPOV(new GLatLng(this.setCenter.lat,this.setCenter.lng), {yaw: this.yaw, pitch: this.pitch, zoom: this.zoom});
      }
    }
    this.onMapReady();
  },
  onMapReady : function()
  {
    this.addMapControls();
    this.addOptions    ();
  },
  recheckGoogleMapConnection: function()
  {
    this.checkGoogleMap();
    this.afterRender   ();
    //TODO lancer un evenement qu'écoute les autres classe utilisant google map
  },
  onResize : function(w, h)
  {
    if(this.googleMapAvailable!= true)
      return;
      
    if (typeof this.getMap() == 'object') 
    {
      this.gmap.checkResize();
    }
    Ext.ux.GMapPanel.superclass.onResize.call(this, w, h);
  },
  setSize : function(width, height, animate)
  {
    if(this.googleMapAvailable!= true)
      return;
    if (typeof this.getMap() == 'object') 
    {
      this.gmap.checkResize();
    }

    Ext.ux.GMapPanel.superclass.setSize.call(this, width, height, animate);

  },
  getMap : function()
  {
    if(this.googleMapAvailable!= true)
      return;
      
    return this.gmap;
  },
  getCenter : function()
  {
    if(this.googleMapAvailable!= true)
      return;
    return this.getMap().getCenter();
  },
  getCenterLatLng : function()
  {
    if(this.googleMapAvailable!= true)
      return;
    var ll = this.getCenter();
    return {lat: ll.lat(), lng: ll.lng()};
  },
  setIconForCategory:function(category, iconScript)
  {
    var icon=null;
    eval(iconScript);
    this.iconsForCategory[category]=icon;
  },
  getIcon:function(category)
  {
    if(this.googleMapAvailable!= true)
      return;
      
    var icon = this.iconsForCategory[category];
    if(icon != null)
      return icon;
    return new GIcon(G_DEFAULT_ICON);
  },
  removeMarker:function(marker)
  {
    if(this.googleMapAvailable!= true)
      return;
    this.gmap.removeOverlay(marker);
  },
  addMarker: function(latitude, longitude, specificIconScript, category, center, title, html, businessId, iconCategory)
  {
    if(this.googleMapAvailable!= true)
      return;
      
    if(!iconCategory)
      iconCategory = category;
    var point  = new GLatLng (latitude,longitude);
    var icon   = this.getIcon(iconCategory);
    var marker = new GMarker (point, {icon:icon,title:title});

    GEvent.addListener(marker, "click", function() {
        marker.openInfoWindowHtml(html);
      });

    marker.category=category;
    marker.customId = category+'_'+businessId;

    if(!this.markerCategories[category])
      this.markerCategories[category]=[];

    this.markerCategories[category].push(marker);

    if(center==true)
      this.gmap.setCenter(point, 13);

    this.gmap.addOverlay(marker);
  },
  goTo:function(latitude, longitude)
  {
    if(this.googleMapAvailable!= true)
      return;
    this.gmap.panTo(new GLatLng(latitude,longitude));
  },
  showACategoryOfMarker:function(category)
  {
    if(this.googleMapAvailable!= true)
      return;
    var markers = this.markerCategories[category];
    if(markers == null)
    {//catégorie vide ou inconnue
      return;
    }

    for(var i=0, count=markers.size();i<count;i++)
      if(markers[i]!= null)
        markers[i].show();
  },
  hideACategoryOfMarker:function(category)
  {
    if(this.googleMapAvailable!= true)
      return;
    var markers = this.markerCategories[category];
    if(markers == null)
    {
      return;
    }

    for(var i=0, count=markers.size();i<count;i++)
      if(markers[i]!= null)
        markers[i].hide();
  },
  focusMarker:function(category, businessId)
  {
    if(this.googleMapAvailable!= true)
      return;
    var markers = this.markerCategories[category];
    if(markers == null)
    {
      return;
    }

    for(var i=0, count=markers.size();i<count;i++)
    {
      if(markers[i] != null && markers[i].customId==category+'_'+businessId)
      {
        var marker = markers[i];
        if(marker.isHidden())
          marker.show();

        this.gmap.panTo(marker.getLatLng());
        GEvent.trigger(marker,"click");
        return;
      }
    }
  },
  /**
   * directionInfo.fromAddress
   * directionInfo.toAddress
   * directionInfo.category
   * directionInfo.businessId
   * */
  displayRoute:function(directionInfo)
  {
    if(this.googleMapAvailable!= true)
      return;
    //create cat if not exist
    if(!this.directionCategories[directionInfo.category])
      this.directionCategories[directionInfo.category]=[];

    var directionCat = this.directionCategories[directionInfo.category];

    var directionSet  = null;
    var gDirection    = null;
    var dirSetCatIndex=-1;
    //find if a Direction exists pour this cat/businessId
    for(var i=0,count=directionCat.length;i<count;i++)
    {
      if(directionCat[i] != null &&
         directionCat[i].directionInfo.category   == directionInfo.category &&
         directionCat[i].directionInfo.businessId == directionInfo.businessId
        )
      {
        directionSet   = directionCat[i]
        dirSetCatIndex = i;
      }
    }

    if(directionSet == null)
    {
      var directionDivId = "GoogleMapsDirection_"+directionInfo.businessId;
      var directionDiv   = Ext.get(directionDivId);

      if(!directionDiv)
        Ext.get("GoogleMapsDirection").insertHtml('beforeEnd', '<div id="'+directionDivId+'"></div>')

      gDirection = new GDirections(this.gmap, $(directionDivId));

      gDirection.category  = directionInfo.category  ;
      gDirection.businessId= directionInfo.businessId;

      GEvent.addListener(gDirection, "load"       , function(){
       //alert('loaded');
      });
      GEvent.addListener(gDirection, "error"      , function(){
       alert('gDirection error '+this.getStatus().code );
      });
      GEvent.addListener(gDirection, "addoverlay" , function(){
        //this.getMarker(0).setImage('');
      }); // added to trigger marker swap

      directionSet = {directionInfo:directionInfo, gDirection: gDirection};
      directionCat.push(directionSet);
    }
    else
    {//update the direction Info, keep the instance of gDirection
      directionSet.directionInfo=directionInfo;
    }
    //compute direction
    directionSet.gDirection.load("from: " + directionSet.directionInfo.fromAddress+', france' + " to: " + directionSet.directionInfo.toAddress+', france',
              { "locale": 'fr' , "getSteps":true});

  }
  ,
  /**
   * directionInfo.fromAddress
   * directionInfo.toAddress
   * directionInfo.category
   * directionInfo.businessId
   * directionInfo.title,
   * directionInfo.html,
   * directionInfo.routeInstruction,
   * directionInfo.displayed
   * */
  displayRouteForDispositif:function(directionInfo)
  {
    if(this.googleMapAvailable!= true)
      return;
    //create cat if not exist
    if(!this.directionCategories[directionInfo.category])
      this.directionCategories[directionInfo.category]=[];

    var directionCat = this.directionCategories[directionInfo.category];

    var directionSet  = null;
    var gDirection    = null;
    var dirSetCatIndex=-1;
    //find if a Direction exists for this cat/businessId
    for(var i=0,count=directionCat.length;i<count;i++)
    {
      if(directionCat[i] != null &&
         directionCat[i].directionInfo.category   == directionInfo.category &&
         directionCat[i].directionInfo.businessId == directionInfo.businessId
        )
      {
        directionSet   = directionCat[i]
        dirSetCatIndex = i;
      }
    }

    if(directionSet == null)
    {
      var directionDivId = "GoogleMapsDirection_"+directionInfo.businessId;
      var directionDiv   = Ext.get(directionDivId);

      if(!directionDiv)
        Ext.get("GoogleMapsDirection").insertHtml('beforeEnd', '<div id="'+directionDivId+'"></div>')

      $(directionDivId).title = directionInfo.title;

      gDirection = new GDirections(this.gmap, $(directionDivId));

      gDirection.category  = directionInfo.category  ;
      gDirection.businessId= directionInfo.businessId;
      gDirection.customId  = directionInfo.category+'_'+directionInfo.businessId;
      GEvent.addListener(gDirection, "load"       , function(){
       //alert('loaded');
      });
      GEvent.addListener(gDirection, "error"      , function(){
       alert('gDirection error '+this.getStatus().code );
      });
      GEvent.addListener(gDirection, "addoverlay" , function(){
        var originalFromMarker = this.getMarker(0);
        var originalFromLatLng = originalFromMarker.getLatLng();
        var originalToMarker   = this.getMarker(1);
        var originalToLatLng   = originalToMarker.getLatLng();

         var map      = Ext.getCmp('center-carte-paris-panel');
         var extraHtml = ['<br/>En mouvement : ',
                          '<b>distance :</b> ',
                          this.getDistance().html,
                          ', <b>durée :</b> ',
                          this.getDuration().html,
                          '<br/> depuis :<br/>',
                          directionInfo.fromAddress,
                          '<br/>à destination de : <br/>',
                          directionInfo.toAddress,
                          '<br/> <input type="button" value="Voir les indications pour le trajet" onClick="Ext.getCmp(\'center-carte-paris-panel\').showDirectionPath(\''+directionDivId+'\')"/>'];

         var html     = String.format(directionInfo.html, extraHtml.join(''));

         map.addMarker(originalFromLatLng.lat (),
                       originalFromLatLng.lng (),
                       null                     ,
                       directionInfo.category   ,
                       false                    ,
                       directionInfo.title      ,
                       html                     ,
                       directionInfo.businessId ,
                       directionInfo.category+'_from');

         map.addMarker(originalToLatLng.lat   (),
                       originalToLatLng.lng   (),
                       null                     ,
                       directionInfo.category   ,
                       false                    ,
                       directionInfo.title      ,
                       html                     ,
                       directionInfo.businessId ,
                       directionInfo.category+'_to');

        map.removeMarker(originalFromMarker);
        map.removeMarker(originalToMarker  );
      }); // added to trigger marker swap

      directionSet = {directionInfo:directionInfo, gDirection: gDirection};
      directionCat.push(directionSet);
    }
    else
    {//update the direction Info, keep the instance of gDirection
      directionSet.directionInfo=directionInfo;
    }
    directionSet.directionInfo.routeInstruction =["from: " , directionSet.directionInfo.fromAddress,', france' , " to: " , directionSet.directionInfo.toAddress,', france'].join('');
    directionSet.gDirection.load(  directionSet.directionInfo.routeInstruction ,{ "locale": 'fr' , "getSteps":true});
    
  },
  getDirectionsCat:function(category)
  {
    return this.directionCategories[category];
  },
  showDirectionCategory:function(category)
  {
    if(this.googleMapAvailable!= true)
      return;
    var directions = this.directionCategories[category];
    if(directions == null)
      return;

    for(var i=0, count=directions.size();i<count;i++)
      if(directions[i]!=null)
        this.displayRouteForDispositif(directions[i].directionInfo);

  },
  destroyDirection:function(category, businessId)
  {
    if(this.googleMapAvailable!= true)
      return;
    var directions = this.directionCategories[category];
    if(directions == null)
      return;

    var markers = this.markerCategories[category];
    //retrieve the direction inside the category
    for(var i=0, counti=directions.size();i<counti;i++)
    {
      if(directions[i]!=null)
      {
        var directionSet  = directions[i];
        var directionInfo = directionSet.directionInfo;
        var gDirection    = directionSet.gDirection;
        
        if(directionInfo.businessId == businessId)
        {//once it's found, hide the marker at the begining and the end of the direction
          if(markers != null)
          {
            //supprime les markers associé a la route, car dans showDirection, on recrée tout (route et 2 markers).
            for(var j=0, countj=markers.size();j<countj;j++)
            {
              if(markers[j] != null && markers[j].customId == gDirection.customId)
              {
                this.removeMarker(markers[j]);
                markers[j]=null;
              }
            }
          }//end if markers != null
          
          gDirection.clear();
          directions[i]=null;//supprimer la direction, pour ne pas la réafficher si on cache/affiche la catégorie
          break;//Stop here, only one direction to hide.
        }
        
      }
    }
  },
  hideDirectionCategory:function(category)
  {
    if(this.googleMapAvailable!= true)
      return;
    var directions = this.directionCategories[category];
    if(directions == null)
      return;

    var markers = this.markerCategories[category];

    for(var i=0, counti=directions.size();i<counti;i++)
    {
      if(directions[i]!=null)
      {
        var gDirection = directions[i].gDirection;
        if(markers != null)
        {
          //supprime les markers associé a la route, car dans showDirection, on recrée tout (route et 2 markers).
          for(var j=0, countj=markers.size();j<countj;j++)
          {
            if(markers[j] != null && markers[j].customId == gDirection.customId)
            {
              this.removeMarker(markers[j]);
              markers[j]=null;
            }
          }
        }
        gDirection.clear();
      }
    }
  },
  showDirectionPath:function(directionDivId)
  {
    if(this.googleMapAvailable!= true)
      return;
      
    //clone the div (window.close => div used for content destroyed
    Ext.get("GoogleMapsDirection").insertHtml('beforeEnd', '<div id="'+directionDivId+'_win" class="GoogleMapsDirection"></div>')
    Ext.get(directionDivId+'_win').update(Ext.get(directionDivId).dom.innerHTML);

    var win = new Ext.Window({
              layout      : 'fit' ,
              width       : 450   ,
              height      : 550   ,
              x           : 32    ,
              y           : 49    ,
              closeAction :'close',
              plain       : true  ,
              autoScroll  : true  ,
              contentEl   : directionDivId+'_win'
              });
    win.show();
  },
    /*
    addMarkers : function(markers) {

        if (Ext.isArray(markers)){
            for (var i = 0; i < markers.length; i++) {
                var mkr_point = new GLatLng(markers[i].lat,markers[i].lng);
                this.addMarker(mkr_point,markers[i].marker,false,markers[i].setCenter, markers[i].listeners);
            }
        }

    },
    addMarker : function(point, marker, clear, center, listeners){

        Ext.applyIf(marker,G_DEFAULT_ICON);

        if (clear === true){
            this.getMap().clearOverlays();
        }
        if (center === true) {
            this.getMap().setCenter(point, this.zoomLevel);
        }

        var mark = new GMarker(point,marker);
        if (typeof listeners === 'object'){
            for (evt in listeners) {
                GEvent.bind(mark, evt, this, listeners[evt]);
            }
        }
        this.getMap().addOverlay(mark);

    },*/
  addMapControls : function()
  {
    if (this.gmapType === 'map') 
    {
      if (Ext.isArray(this.mapControls)) 
      {
        for(i=0;i<this.mapControls.length;i++)
        {
          this.addMapControl(this.mapControls[i]);
        }
      }
      else if(typeof this.mapControls === 'string')
      {
        this.addMapControl(this.mapControls);
      } 
      else if(typeof this.mapControls === 'object')
      {
        this.getMap().addControl(this.mapControls);
      }
    }
  },
  addMapControl : function(mc)
  {
    var mcf = window[mc];
    if (typeof mcf === 'function') 
    {
      this.getMap().addControl(new mcf());
    }
  },
  addOptions : function()
  {
    if (Ext.isArray(this.mapConfOpts)) 
    {
       var mc;
       for(i=0;i<this.mapConfOpts.length;i++)
       {
         this.addOption(this.mapConfOpts[i]);
       }
    }
    else if(typeof this.mapConfOpts === 'string')
    {
      this.addOption(this.mapConfOpts);
    }
  },
  addOption : function(mc)
  {
    var mcf = this.getMap()[mc];
    if (typeof mcf === 'function') 
    {
      this.getMap()[mc]();
    }
  },
  geoCodeLookup : function(addr) {

      this.geocoder = new GClientGeocoder();
      this.geocoder.getLocations(addr, this.addAddressToMap.createDelegate(this));

  },
  addAddressToMap : function(response) 
  {
      if (!response || response.Status.code != 200) 
      {
          Ext.MessageBox.alert('Error', 'Code '+response.Status.code+' Error Returned');
      }else{
          place = response.Placemark[0];
          addressinfo = place.AddressDetails;
          accuracy = addressinfo.Accuracy;
          if (accuracy === 0) {
              Ext.MessageBox.alert('Unable to Locate Address', 'Unable to Locate the Address you provided');
          }else{
              if (accuracy < 7) {
                  Ext.MessageBox.alert('Address Accuracy', 'The address provided has a low accuracy.<br><br>Level '+accuracy+' Accuracy (8 = Exact Match, 1 = Vague Match)');
              }else{
                  point = new GLatLng(place.Point.coordinates[1], place.Point.coordinates[0]);
                  if (typeof this.setCenter.marker === 'object' && typeof point === 'object'){
                      this.addMarker(point,this.setCenter.marker,this.setCenter.marker.clear,true, this.setCenter.listeners);
                  }
              }
          }
      }

  }

});


Ext.ux.GMapAddressResolver = function()
{
 // do NOT access DOM from here; elements don't exist yet
 
  // private variables
  // private functions
 
  // public space
  return {
    // public properties, e.g. strings to translate
   
    // public methods
    init: function() 
    {
      this.googleMapAvailable = true;
      this.defaultCountry     = 'France';
      this.geocoder           = null;

      this.checkGoogleMap();
    },
    checkGoogleMap:function()
    {
      try
      {
        this.geocoder           = new GClientGeocoder();
        this.googleMapAvailable = true;//si initialement on a pas la connexion a google, et qu'on recheck
      }
      catch(e)
      {
        this.googleMapAvailable = false;
      }
    },
    findCoordinatesForAddress:function(address, callBackFunction, errorHandlerCallBackFunction)
    {
      if(this.googleMapAvailable == true)
      {
        this.geocoder.getLocations(
            address+', '+this.defaultCountry,
            function(response)
            {
              if (!response || response.Status.code != 200)
              {
                errorHandlerCallBackFunction(!response?{Status:{code:'Null Response'}}:response);
              } 
              else 
              {
                if(response.Placemark.length > 1)
                {
                  alert('Warning more than one couple of coordinates recieved for adress \''+address+'\'');
                  return;
                }
                callBackFunction(response.Placemark[0]);
              }
            }
          );    
      }
      else
        errorHandlerCallBackFunction({Status:{code:'GoogleMapsUnavailable'}});
      //TODO : créer un status 'GOOGLE_MAP_UNAVAILABLE'
      ;
    }
  };
}();


Ext.reg('gmappanel',Ext.ux.GMapPanel);