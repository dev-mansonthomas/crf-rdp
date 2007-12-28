var myrules = {
	'.samu_ci' : function(element)
	{
		element.onclick = function()
		{
			alert(this.id);
		}
	},	
	'.samu_action' : function(element)
	{
		element.onclick = function()
		{
			alert(this.id);
		}
	},	
	'.samu_editerFiche' : function(element)
	{
		element.onclick = function()
		{
			alert(this.id);
		}
	}
};
	
Behaviour.register(myrules);