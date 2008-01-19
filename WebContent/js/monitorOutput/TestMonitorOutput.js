var iconPath = contextPath+'/img/famfamfam/';
function init()
{
  DWRUtil.useLoadingMessage("Loading...");
  DWREngine.setActiveReverseAjax(true);
  Monitor.initScriptSession();  
}
var i = 1;
function reverseTest(data)
{
	document.getElementById('body').innerHTML=data+" "+(i++);
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