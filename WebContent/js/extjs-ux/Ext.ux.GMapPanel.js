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
    initComponent : function(){
        
        var defConfig = {
            plain: true,
            zoomLevel: 3,
            yaw: 180,
            pitch: 0,
            zoom: 0,
            gmapType: 'map',
            border: false,
            directionCategories:[],
            markerCategories:[],
            iconsForCategory:[]
        };
        
        Ext.applyIf(this,defConfig);
        
        Ext.ux.GMapPanel.superclass.initComponent.call(this);        

    },
    afterRender : function(){
        
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
        
        if (typeof this.setCenter === 'object') {
            if (typeof this.setCenter.geoCodeAddr === 'string'){
                this.geoCodeLookup(this.setCenter.geoCodeAddr);
            }else{
                if (this.gmapType === 'map'){
                    var point = new GLatLng(this.setCenter.lat,this.setCenter.lng);
                    this.gmap.setCenter(point, this.zoomLevel);    
                }
                if (typeof this.setCenter.marker === 'object' && typeof point === 'object'){
                    this.addMarker(point,this.setCenter.marker,this.setCenter.marker.clear);
                }
            }
            if (this.gmapType === 'panorama'){
                this.gmap.setLocationAndPOV(new GLatLng(this.setCenter.lat,this.setCenter.lng), {yaw: this.yaw, pitch: this.pitch, zoom: this.zoom});
            }
        }

        
            this.onMapReady();
//GEvent.bind(this.gmap, 'load', this, function(){            
//        });

    },
    onMapReady : function(){
        this.addMapControls();
        this.addOptions();  
    },
    onResize : function(w, h){

        if (typeof this.getMap() == 'object') {
            this.gmap.checkResize();
        }
        
        Ext.ux.GMapPanel.superclass.onResize.call(this, w, h);

    },
    setSize : function(width, height, animate){
        
        if (typeof this.getMap() == 'object') {
            this.gmap.checkResize();
        }
        
        Ext.ux.GMapPanel.superclass.setSize.call(this, width, height, animate);
        
    },
    getMap : function(){
        
        return this.gmap;
        
    },
    getCenter : function(){
        
        return this.getMap().getCenter();
        
    },
    getCenterLatLng : function(){
        
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
      var icon = this.iconsForCategory[category];
      
      if(icon != null)
        return icon;
      
      return new GIcon(G_DEFAULT_ICON);
    },
    removeMarker:function(marker)
    {
      this.gmap.removeOverlay(marker);
    },
    addMarker: function(latitude, longitude, specificIconScript, category, center, title, html, businessId, iconCategory)
    {
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
      this.gmap.panTo(new GLatLng(latitude,longitude));
    },
    showACategoryOfMarker:function(category)
    {
      var markers = this.markerCategories[category];
      if(markers == null)
      {//cat�gorie vide ou inconnue
        return;
      }
      
      for(var i=0, count=markers.size();i<count;i++)
        if(markers[i]!= null)
          markers[i].show();
    },
    hideACategoryOfMarker:function(category)
    {
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
     * directionInfo.html
     * */
    displayRouteForDispositif:function(directionInfo)
    {
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
                            ', <b>dur�e :</b> ', 
                            this.getDuration().html,           
                            '<br/> depuis :<br/>',
                            directionInfo.fromAddress,
                            '<br/>� destination de : <br/>',
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
      //compute direction
      directionSet.gDirection.load("from: " + directionSet.directionInfo.fromAddress+', france' + " to: " + directionSet.directionInfo.toAddress+', france',
                { "locale": 'fr' , "getSteps":true});
      
    },
    showDirection:function(category)
    {
      var directions = this.directionCategories[category];
      if(directions == null)
        return;
        
      for(var i=0, count=directions.size();i<count;i++)
        this.displayRouteForDispositif(directions[i].directionInfo);
      
    },
    hideDirection:function(category)
    {
      var directions = this.directionCategories[category];
      if(directions == null)
        return;
      
      var markers = this.markerCategories[category];
      
      for(var i=0, counti=directions.size();i<counti;i++)
      {
        if(markers != null)
        {
          //supprime les markers associ� a la route, car dans showDirection, on recr�e tout (route et 2 markers).
          for(var j=0, countj=markers.size();j<countj;j++)
          {
            if(markers[j] != null && markers[j].customId == directions[i].gDirection.customId)
            {
              this.removeMarker(markers[j]);
              markers[j]=null;
            }
          }
        }
        directions[i].gDirection.clear();
            
      }
        
    },
    showDirectionPath:function(directionDivId)
    {
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
    addMapControls : function(){
        
        if (this.gmapType === 'map') {
            if (Ext.isArray(this.mapControls)) {
                for(i=0;i<this.mapControls.length;i++){
                    this.addMapControl(this.mapControls[i]);
                }
            }else if(typeof this.mapControls === 'string'){
                this.addMapControl(this.mapControls);
            }else if(typeof this.mapControls === 'object'){
                this.getMap().addControl(this.mapControls);
            }
        }
        
    },
    addMapControl : function(mc){
        
        var mcf = window[mc];
        if (typeof mcf === 'function') {
            this.getMap().addControl(new mcf());
        }    
        
    },
    addOptions : function(){
        
        if (Ext.isArray(this.mapConfOpts)) {
            var mc;
            for(i=0;i<this.mapConfOpts.length;i++){
                this.addOption(this.mapConfOpts[i]);
            }
        }else if(typeof this.mapConfOpts === 'string'){
            this.addOption(this.mapConfOpts);
        }        
        
    },
    addOption : function(mc){
        
        var mcf = this.getMap()[mc];
        if (typeof mcf === 'function') {
            this.getMap()[mc]();
        }    
        
    },
    geoCodeLookup : function(addr) {
        
        this.geocoder = new GClientGeocoder();
        this.geocoder.getLocations(addr, this.addAddressToMap.createDelegate(this));
        
    },
    addAddressToMap : function(response) {
        
        if (!response || response.Status.code != 200) {
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

Ext.reg('gmappanel',Ext.ux.GMapPanel); 