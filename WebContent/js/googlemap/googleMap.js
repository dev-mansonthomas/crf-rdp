var CrfGoogleMap = Class.create();

CrfGoogleMap.prototype.initialize=function()
{
  this.googleMapAvailable = true;
  
  try
  {
  	this.geocoder  = new GClientGeocoder();
  }
  catch(e)
  {
  	this.googleMapAvailable = false;
  }
  
  this.map            = null;
  this.myWindow       = null;
  this.defaultCountry = ", France";
  
  this.trafficInfoOverlay = null;
  
  
  this.iconClassesBase=Array();
  
/*

Constants
Constants   Description
G_GEO_SUCCESS         (200) No errors occurred; the address was successfully parsed and its geocode has been returned. (Since 2.55)
G_GEO_SERVER_ERROR    (500) A geocoding request could not be successfully processed, yet the exact reason for the failure is not known. (Since 2.55)
G_GEO_MISSING_ADDRESS (601) The HTTP q parameter was either missing or had no value. (Since 2.55)
G_GEO_UNKNOWN_ADDRESS (602) No corresponding geographic location could be found for the specified address. This may be due to the fact that the address is relatively new, or it may be incorrect. (Since 2.55)
G_UNAVAILABLE_ADDRESS (603) The geocode for the given address cannot be returned due to legal or contractual reasons. (Since 2.55)
G_GEO_BAD_KEY         (610)
 
* */

  this.geocoderStatus = { G_GEO_SUCCESS         :'Success', 
                          G_GEO_SERVER_ERROR    :'Erreur interne Google Map ',
                          G_GEO_MISSING_ADDRESS :'BUG CRF-IRP: Aucune adresse envoyée',
                          G_GEO_UNKNOWN_ADDRESS :'L\'adresse n\'est pas valide (erreur de frappe, adresse inexistante ou trop récente)',
                          G_UNAVAILABLE_ADDRESS :'L\'adresse n\'est pas résolue pour des raisons légales ou contractuelles',
                          G_GEO_BAD_KEY         :'BUG CRF-IRP: La clé de l\'API GOOGLE MAP n\'est plus valide'
  };
  
};

CrfGoogleMap.prototype.instancianteMap=function(latitude, longitude)
{
	if(this.googleMapAvailable)
	{
		this.map =new GMap2($('crfirp-googlemap-paris'));

	  this.map.addControl(new GLargeMapControl    ());
	  this.map.addControl(new GOverviewMapControl ());
	  this.map.addControl(new GMapTypeControl     ());
	  
	  
	  this.map.enableContinuousZoom ();
	  this.map.enableScrollWheelZoom();
	  
	  this.trafficInfoOverlay = new GTrafficOverlay();
	  
	  this.map.addOverlay(this.trafficInfoOverlay);
	  
	  this.map.setCenter(new GLatLng(latitude,longitude), 13);
	  return this.map;
	}
  else
   return null;
  
  
};
/**
 * address          : 44 rue Murillo, 92170, Vanves, France
 * callBackFunction(placemark)  : function qui recoit le placemark correspondant à l'adresse
 * errorHandlerCallBackFunction : function qui gère l'erreur, recoit la response de google
 *
 */
CrfGoogleMap.prototype.findCoordinatesForAddress=function(address, callBackFunction, errorHandlerCallBackFunction)
{
  if(this.googleMapAvailable)
  {
    this.geocoder.getLocations(
        address+this.defaultCountry,
        function(response)
        {
          if (!response || response.Status.code != 200)
          {
            errorHandlerCallBackFunction(response);
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
  //TODO : créer un status 'GOOGLE_MAP_UNAVAILABLE'
  ;
};

CrfGoogleMap.prototype.initIconClasses=function()
{
// icon de type humain  
  var baseIcon = new GIcon();
  
  baseIcon.shadow            = contextPath+"/img/gmap/user-shadow.png";
  baseIcon.iconSize          = new GSize(16, 16);
  baseIcon.shadowSize        = new GSize(27, 26);
  baseIcon.iconAnchor        = new GPoint(8, 16);
  baseIcon.infoWindowAnchor  = new GPoint(9, 2);
  baseIcon.infoShadowAnchor  = new GPoint(18, 25);
  
  this.iconClassesBase[0]=Array();
  this.iconClassesBase[0][0]=baseIcon;
  var iconUrl=Array(); 
  iconUrl[0]=contextPath+"/img/famfamfam/user.png";
  iconUrl[1]=contextPath+"/img/famfamfam/user_red.png";
  iconUrl[2]=contextPath+"/img/famfamfam/user_green.png";
  iconUrl[3]=contextPath+"/img/famfamfam/user_orange.png";
  iconUrl[4]=contextPath+"/img/famfamfam/user_grey.png";
  iconUrl[5]=contextPath+"/img/famfamfam/user_suit.png";
  iconUrl[6]=contextPath+"/img/famfamfam/user_female.png";
  iconUrl[7]=contextPath+"/img/famfamfam/tux.png";

  this.iconClassesBase[0][1]=iconUrl;  

/** icon de type véhicule*/
//TODO

};


/**
 * Retourne l'icone de classe wantedIconClass et de variant iconVariant.
 * 
 * la classe détermine la forme de l'ombre
 * la variant l'icone en elle meme.
 * 
 * 
 * */
CrfGoogleMap.prototype.getIcon=function(wantedIconClass, iconVariant)
{
  if(!this.iconClasses)
    this.initIconClasses(); 
  
  
  var iconClass = this.iconClassesBase[wantedIconClass  ]; 

  if(!iconClass)
    throw new Error('unknown iconClass '+wantedIconClass);


  var icon   = new GIcon(iconClass[0]);
   
  icon.image = iconClass[1][iconVariant];
  
  if(!icon.image)
    throw new Error('unknown iconVariant '+iconVariant+' for icon class'+wantedIconClass);
  
  return icon;
};


/**
 * Affiche un élément sur la carte googlemap
 * 
 * point            : coordonnées googlemap de type GLatLng 
 * iconClass        : class de l'icone (détermine le type d'ombre derrière l'icone) 
 * iconModel        : model de l'icone (détermine l'icone)
 * shouldCenterMap  : true->centre la carte sur le point ajouté, false->laisse la carte tel qu'elle.
 * tabsInfo         : Array d'Array de string
 * 
 * tabsInfo[0]=["Tabs 1 title", "Tabs1 content];
 * tabsInfo[1]=["Tabs 2 title", "Tabs2 content];
 * 
 * */

CrfGoogleMap.prototype.displayInfo=function(latitude, longitude, iconClass, iconModel, shouldCenterMap, tabsInfo)
{
	if(!this.googleMapAvailable)
		return;
  var point = new GLatLng(latitude,longitude);
  
  //génération des tabs  
  //var tabsInfoG = Array();
  //for(var zzz=0,countTabsInfo=tabsInfo.length;zzz<countTabsInfo; zzz++)
  //  tabsInfoG[zzz]=new GInfoWindowTab(tabsInfo[zzz][0],tabsInfo[zzz][1]);
  //récupèration de l'icone demandé
  var icon = this.getIcon(iconClass, iconModel);
  //création du marqueur avec l'icone
  var marker = new GMarker(point, icon);
  //association des tabs sur le marqueur
 /* GEvent.addListener( marker, 
                      "click", 
                      function() 
                      {
                        marker.openInfoWindowTabsHtml(tabsInfoG);
                      }
                    );
  */
  //ajout du marqueur sur la map
  this.map.addOverlay(marker);
  //centrage éventuel du marqueur
  if(shouldCenterMap)
    this.map.setCenter(point, 13);
};


CrfGoogleMap.prototype.showOnMap=function(latitude, longitude)
{
	this.map.panTo(new GLatLng(latitude,longitude));
};