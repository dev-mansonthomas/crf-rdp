var orgApacheMyfacesPopupCurrentlyOpenedPopup;
var orgApacheMyfacesPopupFrameUnder;

/**
* fix for the div over control bug in ie
*/
function orgApacheMyfacesPopupfixIE() {
    if(document.all) {
    	if(orgApacheMyfacesPopupCurrentlyOpenedPopup == null) return false;
    	var iframe = document.getElementById(orgApacheMyfacesPopupCurrentlyOpenedPopup.id+"_IFRAME");


		if(iframe == null) {
			orgApacheMyfacesPopupFrameUnder = document.createElement("<iframe id='"+orgApacheMyfacesPopupCurrentlyOpenedPopup.id+"_IFRAME' style='visibility:hidden; position: absolute; top:0px;left:0px;'/>");
	   		document.body.insertBefore(orgApacheMyfacesPopupFrameUnder);
   		} else {
   			orgApacheMyfacesPopupFrameUnder = iframe;
   		}

		var popup  = orgApacheMyfacesPopupCurrentlyOpenedPopup;
   		iframe = orgApacheMyfacesPopupFrameUnder;

   		if(popup != null &&
   			(popup.style.display == "block")) {

			popup.style.zIndex	= 99;
   			iframe.style.zIndex = popup.style.zIndex - 1;
   			iframe.style.width 	= popup.offsetWidth;
	    	iframe.style.height = popup.offsetHeight;
	    	iframe.style.top 	= popup.style.top;
    		iframe.style.left 	= popup.style.left;
			iframe.style.display = "block";
			iframe.style.visibility = "visible"; /*we have to set an explicit visible otherwise it wont work*/

   		} else {
   			iframe.style.display = "none";
   		}
    }
    return false;
}


function orgApacheMyfacesPopup(popupId, displayAtDistanceX, displayAtDistanceY)
{
    this.popupId = popupId;
    this.displayAtDistanceX=displayAtDistanceX;
    this.displayAtDistanceY=displayAtDistanceY;
    this.display = orgApacheMyfacesPopupDisplay;
    this.hide = orgApacheMyfacesPopupHide;
    this.redisplay=orgApacheMyfacesPopupRedisplay;
}

function orgApacheMyfacesPopupDisplay(ev)
{
    if(orgApacheMyfacesPopupCurrentlyOpenedPopup!=null)
        orgApacheMyfacesPopupCurrentlyOpenedPopup.style.display="none";

    var elem;
    var x;
    var y;

    if(document.all) /*ie browser detection already in place*/
    {
		if(orgApacheMyfacesPopupFrameUnder!=null)
			orgApacheMyfacesPopupFrameUnder.style.display="none";

        elem = window.event.srcElement;
/*
        x=window.event.clientX;
        x+=orgApacheMyfacesPopupGetScrollingX();
        y=window.event.clientY;
        y+=orgApacheMyfacesPopupGetScrollingY();
*/
		x=findPosX(elem);
		y=findPosY(elem);
		y+=elem.offsetHeight;
    }
    else
    {
        elem = ev.target;
/*        
        x=ev.pageX;
        y=ev.pageY;
*/
		x=findPosX(elem);
		y=findPosY(elem);
		y+=elem.offsetHeight;
    }
    
    x+=this.displayAtDistanceX;
    y+=this.displayAtDistanceY;
    
    var popupElem = document.getElementById(this.popupId);
    
    if(popupElem.style.display!="block")
    {
        popupElem.style.display="block";
        popupElem.style.left=""+x+"px";
        popupElem.style.top=""+y+"px";
        orgApacheMyfacesPopupCurrentlyOpenedPopup = popupElem;
    }
    
/**/  

    if(document.all)
    {
	    if (y + popupElem.offsetHeight >  document.body.clientHeight)
	    {
	    	y -= elem.offsetHeight;
	    	y -= popupElem.offsetHeight;
	        popupElem.style.top=""+y+"px";    	
	    }
	}
	else
	{
		//alert(window.innerHeight);
		//alert(window.outerHeight);
		//alert(window.screen.availHeight);
	}

/**/
    orgApacheMyfacesPopupfixIE();    
}


/**
* hide function which
* hides the popup from the browser
*/
function orgApacheMyfacesPopupHide()
{
    var popupElem = document.getElementById(this.popupId);
    popupElem.style.display="none";

	if(document.all && (orgApacheMyfacesPopupFrameUnder != null)) { /*ie specific popup under fix*/
		orgApacheMyfacesPopupFrameUnder.style.display = "none";
	}
	orgApacheMyfacesPopupfixIE();
}

/**
* simple redisplay
* displays an already existing hidden popup
*/
function orgApacheMyfacesPopupRedisplay()
{
    var popupElem = document.getElementById(this.popupId);
    popupElem.style.display="block";
    orgApacheMyfacesPopupCurrentlyOpenedPopup = popupElem;
	orgApacheMyfacesPopupfixIE();
}

function orgApacheMyfacesPopupGetScrollingX() {
    if (self.pageXOffset) {
        return self.pageXOffset;
    } else if (document.documentElement && document.documentElement.scrollLeft) {
        return document.documentElement.scrollLeft;
    } else if (document.body) {
        return document.body.scrollLeft;
    } else {
        return 0;
    }
}

function orgApacheMyfacesPopupGetScrollingY() {
    if (self.pageYOffset) {
        return self.pageYOffset;
    } else if (document.documentElement && document.documentElement.scrollTop) {
        return document.documentElement.scrollTop;
    } else if (document.body) {
        return document.body.scrollTop;
    } else {
        return 0;
    }
}

function findPosX(obj)
{
	var curleft = 0;

	if (obj.offsetParent)
	{
		while (obj.offsetParent)
		{
			curleft += obj.offsetLeft;
			obj = obj.offsetParent;
		}
	}

	curleft += obj.offsetLeft;

	return curleft;
}

function findPosY(obj)
{
	var curtop = 0;

	if (obj.offsetParent)
	{
		while (obj.offsetParent)
		{
			curtop += obj.offsetTop;

			if (document.all)
			{
				curtop -= obj.scrollTop;
			}
			else
			{
				//curtop -= obj.scrollTop;
			}

			obj = obj.offsetParent;
		}
	}

	curtop += obj.offsetTop;

	if (document.all)
	{
		curtop -= obj.scrollTop;
	}
	else
	{
		//curtop -= obj.scrollTop;
	}		
	
	return curtop;
}

function findPosX_(obj)
{
	if (document.getBoxObjectFor) // FF
	{
		var bo = document.getBoxObjectFor(obj);
		x = bo.x;
		w = bo.width;
		y = bo.y;
		h = bo.height;
		
		return x;
	}
	else if (obj.getBoundingClientRect) // IE
	{
		var rect = obj.getBoundingClientRect();
		x = rect.left;
		w = rect.right - rect.left;
		y = rect.top;
		h = rect.bottom - rect.top;
		
		return x-2;
	} 
}

function findPosY_(obj)
{
	if (document.getBoxObjectFor) // FF
	{
		var bo = document.getBoxObjectFor(obj);
		x = bo.x;
		w = bo.width;
		y = bo.y;
		h = bo.height;
		
		return y;
	}
	else if (obj.getBoundingClientRect) // IE
	{
		var rect = obj.getBoundingClientRect();
		x = rect.left;
		w = rect.right - rect.left;
		y = rect.top;
		h = rect.bottom - rect.top;
		
		return y-2+document.documentElement.scrollTop;
	} 
}
