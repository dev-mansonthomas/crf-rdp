function progress(e)
{
	var t = false;
	
	if (e == undefined) // IE
	{
		e = event;
		t = e.srcElement;
	}
	else
	{
		t = e.target;
	}

	var isDisabled = false;

	try 
	{
		isDisabled = t.disabled;
	} 
	catch (ex) 
	{
	}
 
	if (!isDisabled)
	{
		var displayProgress = false;
		
	 	if (t.tagName == "A")
	 	{
	 		displayProgress = true;
	 	}

	 	if (t.tagName == "INPUT")
	 	{
	 		var type = t.getAttribute("type");
	 		if (type.toLowerCase().indexOf("submit") != -1)
	 		{
		 		displayProgress = true;
	 		}
	 	}
	 	
	 	if (displayProgress)
	 	{	        	 
			//t.disabled = true;
	 		//showProgress(e.clientX + document.body.scrollLeft,e.clientY + document.body.scrollTop);
	 		var oX = 0;
	 		var oY = 0;	 		
	 		if (e.offsetX != undefined && e.offsetY != undefined) // IE
	 		{
	 			oX = e.offsetX;
	 			oY = e.offsetY;	 			
	 		}
			showProgress(e.clientX - oX + document.body.scrollLeft,e.clientY - oY + document.body.scrollTop);
    	}
	}
}		

function showProgress(x,y)
{
 	var p = document.getElementById("progress");
 	    	 
    p.style.left = x + "px";
	p.style.top =  y + "px";
	
 	p.style.display = "block";
}

function hideProgress()
{
 	var p = document.getElementById("progress");
 	    	 
 	p.style.display = "none";
}

document.write("<div id='progress' style='z-index: 100; position: absolute; left: 0px; top: 0px; display: none; border: 1px solid black; padding: 3px; background-color: #FFFFFF;'>");
document.write("	<nobr>");
document.write("		<img src='../images/progress.gif' align='texttop'>");
document.write("		Veuillez patienter...");
document.write("	</nobr>");
document.write("</div>");

document.onclick = progress; 
