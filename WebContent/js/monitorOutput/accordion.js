var acc = null;

// set blank image to local file
Ext.BLANK_IMAGE_URL = contextPath+'/js/extjs/resources/images/default/s.gif';
var iconPath = contextPath+'/img/famfamfam/';


// run this function when document becomes ready
Ext.onReady(function() {
	// {{{
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

	// initialize state manager, we will use cookies
	Ext.state.Manager.setProvider(new Ext.state.CookieProvider());

	// initialize QuickTips
	Ext.QuickTips.init();
	Ext.apply(Ext.QuickTips, {interceptTitles: true});

	// {{{
	// create layout
	var layout = new Ext.BorderLayout(document.body, {
		hideOnLayout: true
		, north: { split: false, initialSize: 34, titlebar: false }
		, west: {
			split: true
			, initialSize: 220
			, minSize: 220
			, maxSize: 300
			, titlebar: false
			, collapsible: true
			, showPin: true
			, animate: true
		}
		, center: { 
			titlebar: true 
			, autoScroll: false 
		}
		, south: { 
			titlebar: true
			, split: true
			, initialSize: 56
			, collapsible: true
			, collapsed: true
			, hidden: false 
			, collapsedTitle: 'South'
			, animate: true
			, showPin: true
		}
	});
	// }}}
	// {{{
	// create accordion in west region
	acc = new Ext.ux.Accordion('west', { 
		title: 'Accordion' 
		, body: 'west-body'
		, fitContainer: true 
		, fitToFrame: true 
		, useShadow: true
	});
	// }}}
	// {{{
	// create global toolbar
	acc.toolbar = new Ext.Toolbar('acc-tb-global', [

		// reset order
		{	tooltip: 'Reset order'
			, cls: 'x-btn-icon'
			, icon: iconPath + 'application_put.png'
			, scope: acc
			, handler: acc.resetOrder
		}


		// collapse all
		, {	tooltip: 'Collapse all (also pinned)'
			, cls: 'x-btn-icon'
			, icon: iconPath + 'application_view_list.png'
			, scope: acc
			, handler: function(btn, e) {
			  this.collapseAll(true);
			}
		}

		// expand all
		, {	tooltip: 'Expand all (in independent mode)'
			, cls: 'x-btn-icon'
			, icon: iconPath + 'application_view_tile.png'
			, scope: acc
			, handler: function(btn, e) {
			  this.expandAll();
			}
		}

		// separator
		, '-'

		// find text
		, 'Find:'

		// search text input field
		, new Ext.form.TextField({
			  id: 'find-field'
			, msgTarget:'side'
			, autoCreate: {
				  tag:'input'
				, type:'text'
				, qtip:'Try to type <b>&quot;acc&quot;</b> here.<br>'
						+ 'Then switch to independent mode and type <b>&quot;note&quot;</b> here.<br>'
						+ 'You can try also <b>&quot;dev&quot;</b> and <b>&quot;comp&quot;</b>'
				, size:12
			}
		})
	]);
	// }}}
	// {{{
	// add panels to west accordion

	
	// {{{
	// add panels to layout
	layout.beginUpdate();


	// page header (north)
	layout.add('north', new Ext.ContentPanel('north', {}));

	// south
	layout.add('south', new Ext.ContentPanel('south', "South"));

	// center - Introduction
	layout.add('center', new Ext.ContentPanel('center-dispositif', {
		title:"Liste des Dispositifs"
		, fitContainer:true
		, fitToFrame: true
		, autoScroll: true
	}));

	// center - How to
	layout.add('center', new Ext.ContentPanel('center-carte-paris', {
		title:"Carte de Paris"
		, fitContainer:true
		, fitToFrame: true
		, autoScroll: false
	}));

	// center - Accordions
	layout.add('center', new Ext.ContentPanel('center-accordions', {
		title:"Accordions"
		, fitContainer:true
		, fitToFrame: true
		, autoScroll: true
	}));
	

	// center - Search results iframe
	layout.add('center', new Ext.ContentPanel('center-result', {
		title:"Result"
		, fitToFrame: true
		, autoCreate: {
			tag: 'iframe'
			, id: 'center-result'
			, frameborder: 0
		}
	}));

	// accordion in west
	layout.add('west', acc);

	layout.restoreState();

	// {{{
	// restore state
	// get last selected tab
	var tabId = Ext.state.Manager.get("tab");

	// event handler that saves currently selected tab
	var center = layout.getRegion('center');
	center.on('panelactivated', function(region, panel) {
		var tabId = panel.el.id;
		Ext.state.Manager.set("tab", tabId);
	});

	// restore selected tab
	layout.getRegion('center').showPanel(tabId || 'center-dispositif');

	// restore dock state
	acc.restoreState();

	// }}}

	layout.endUpdate();
	// }}}
	// {{{
	// searching within panel bodies example
	var find = acc.toolbar.items.get('find-field');
	Ext.fly(find.el).on('keyup', searchPanels, acc, {buffer:150});

	function searchPanels(e) {

		var re, found;
		// ignore special and navigation keys
		if(e.isSpecialKey() || e.isNavKeyPress()) {
			return;
		}

		var val = find.el.value;
		// ignore if length is 1 or 2
		if(val.length < 3 && val.length > 0) {
			return;
		}
		
		// show all panels collapsed when filter is cleared
		else if(0 === val.length) {
			this.showAll();
			this.collapseAll();
		}

		// find panels containing the entered text
		else {
			re = new RegExp('.*' + val + '.*', 'i');
			found = false;
			this.hideAll();
			this.items.each(function(panel) {
				if((found && !this.independent) || !panel.docked) {
					return;
				}
				if(panel.body.dom.innerHTML.match(re)) {
					panel.show();
					panel.expand();
					found = true;
				}
				else {
					panel.collapse();
					panel.hide();
					found = false;
				}
			}, this);
		}
	}
	// }}}

	// remove the loading mask
	unmask.defer(100);

}); // end of onReady

// end of file
