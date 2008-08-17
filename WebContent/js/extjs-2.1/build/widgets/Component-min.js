/*
 * Ext JS Library 2.1
 * Copyright(c) 2006-2008, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

Ext.Component=function(B){B=B||{};if(B.initialConfig){if(B.isAction){this.baseAction=B}B=B.initialConfig}else{if(B.tagName||B.dom||typeof B=="string"){B={applyTo:B,id:B.id||B}}}this.initialConfig=B;Ext.apply(this,B);this.addEvents("disable","enable","beforeshow","show","beforehide","hide","beforerender","render","beforedestroy","destroy","beforestaterestore","staterestore","beforestatesave","statesave");this.getId();Ext.ComponentMgr.register(this);Ext.Component.superclass.constructor.call(this);if(this.baseAction){this.baseAction.addComponent(this)}this.initComponent();if(this.plugins){if(Ext.isArray(this.plugins)){for(var C=0,A=this.plugins.length;C<A;C++){this.plugins[C].init(this)}}else{this.plugins.init(this)}}if(this.stateful!==false){this.initState(B)}if(this.applyTo){this.applyToMarkup(this.applyTo);delete this.applyTo}else{if(this.renderTo){this.render(this.renderTo);delete this.renderTo}}};Ext.Component.AUTO_ID=1000;Ext.extend(Ext.Component,Ext.util.Observable,{disabledClass:"x-item-disabled",allowDomMove:true,autoShow:false,hideMode:"display",hideParent:false,hidden:false,disabled:false,rendered:false,ctype:"Ext.Component",actionMode:"el",getActionEl:function(){return this[this.actionMode]},initComponent:Ext.emptyFn,render:function(B,A){if(!this.rendered&&this.fireEvent("beforerender",this)!==false){if(!B&&this.el){this.el=Ext.get(this.el);B=this.el.dom.parentNode;this.allowDomMove=false}this.container=Ext.get(B);if(this.ctCls){this.container.addClass(this.ctCls)}this.rendered=true;if(A!==undefined){if(typeof A=="number"){A=this.container.dom.childNodes[A]}else{A=Ext.getDom(A)}}this.onRender(this.container,A||null);if(this.autoShow){this.el.removeClass(["x-hidden","x-hide-"+this.hideMode])}if(this.cls){this.el.addClass(this.cls);delete this.cls}if(this.style){this.el.applyStyles(this.style);delete this.style}this.fireEvent("render",this);this.afterRender(this.container);if(this.hidden){this.hide()}if(this.disabled){this.disable()}this.initStateEvents()}return this},initState:function(A){if(Ext.state.Manager){var B=Ext.state.Manager.get(this.stateId||this.id);if(B){if(this.fireEvent("beforestaterestore",this,B)!==false){this.applyState(B);this.fireEvent("staterestore",this,B)}}}},initStateEvents:function(){if(this.stateEvents){for(var A=0,B;B=this.stateEvents[A];A++){this.on(B,this.saveState,this,{delay:100})}}},applyState:function(B,A){if(B){Ext.apply(this,B)}},getState:function(){return null},saveState:function(){if(Ext.state.Manager){var A=this.getState();if(this.fireEvent("beforestatesave",this,A)!==false){Ext.state.Manager.set(this.stateId||this.id,A);this.fireEvent("statesave",this,A)}}},applyToMarkup:function(A){this.allowDomMove=false;this.el=Ext.get(A);this.render(this.el.dom.parentNode)},addClass:function(A){if(this.el){this.el.addClass(A)}else{this.cls=this.cls?this.cls+" "+A:A}},removeClass:function(A){if(this.el){this.el.removeClass(A)}else{if(this.cls){this.cls=this.cls.split(" ").remove(A).join(" ")}}},onRender:function(B,A){if(this.autoEl){if(typeof this.autoEl=="string"){this.el=document.createElement(this.autoEl)}else{var C=document.createElement("div");Ext.DomHelper.overwrite(C,this.autoEl);this.el=C.firstChild}if(!this.el.id){this.el.id=this.getId()}}if(this.el){this.el=Ext.get(this.el);if(this.allowDomMove!==false){B.dom.insertBefore(this.el.dom,A)}if(this.overCls){this.el.addClassOnOver(this.overCls)}}},getAutoCreate:function(){var A=typeof this.autoCreate=="object"?this.autoCreate:Ext.apply({},this.defaultAutoCreate);if(this.id&&!A.id){A.id=this.id}return A},afterRender:Ext.emptyFn,destroy:function(){if(this.fireEvent("beforedestroy",this)!==false){this.beforeDestroy();if(this.rendered){this.el.removeAllListeners();this.el.remove();if(this.actionMode=="container"){this.container.remove()}}this.onDestroy();Ext.ComponentMgr.unregister(this);this.fireEvent("destroy",this);this.purgeListeners()}},beforeDestroy:Ext.emptyFn,onDestroy:Ext.emptyFn,getEl:function(){return this.el},getId:function(){return this.id||(this.id="ext-comp-"+(++Ext.Component.AUTO_ID))},getItemId:function(){return this.itemId||this.getId()},focus:function(B,A){if(A){this.focus.defer(typeof A=="number"?A:10,this,[B,false]);return }if(this.rendered){this.el.focus();if(B===true){this.el.dom.select()}}return this},blur:function(){if(this.rendered){this.el.blur()}return this},disable:function(){if(this.rendered){this.onDisable()}this.disabled=true;this.fireEvent("disable",this);return this},onDisable:function(){this.getActionEl().addClass(this.disabledClass);this.el.dom.disabled=true},enable:function(){if(this.rendered){this.onEnable()}this.disabled=false;this.fireEvent("enable",this);return this},onEnable:function(){this.getActionEl().removeClass(this.disabledClass);this.el.dom.disabled=false},setDisabled:function(A){this[A?"disable":"enable"]()},show:function(){if(this.fireEvent("beforeshow",this)!==false){this.hidden=false;if(this.autoRender){this.render(typeof this.autoRender=="boolean"?Ext.getBody():this.autoRender)}if(this.rendered){this.onShow()}this.fireEvent("show",this)}return this},onShow:function(){if(this.hideParent){this.container.removeClass("x-hide-"+this.hideMode)}else{this.getActionEl().removeClass("x-hide-"+this.hideMode)}},hide:function(){if(this.fireEvent("beforehide",this)!==false){this.hidden=true;if(this.rendered){this.onHide()}this.fireEvent("hide",this)}return this},onHide:function(){if(this.hideParent){this.container.addClass("x-hide-"+this.hideMode)}else{this.getActionEl().addClass("x-hide-"+this.hideMode)}},setVisible:function(A){if(A){this.show()}else{this.hide()}return this},isVisible:function(){return this.rendered&&this.getActionEl().isVisible()},cloneConfig:function(B){B=B||{};var C=B.id||Ext.id();var A=Ext.applyIf(B,this.initialConfig);A.id=C;return new this.constructor(A)},getXType:function(){return this.constructor.xtype},isXType:function(B,A){return !A?("/"+this.getXTypes()+"/").indexOf("/"+B+"/")!=-1:this.constructor.xtype==B},getXTypes:function(){var A=this.constructor;if(!A.xtypes){var C=[],B=this;while(B&&B.constructor.xtype){C.unshift(B.constructor.xtype);B=B.constructor.superclass}A.xtypeChain=C;A.xtypes=C.join("/")}return A.xtypes},findParentBy:function(A){for(var B=this.ownerCt;(B!=null)&&!A(B,this);B=B.ownerCt){}return B||null},findParentByType:function(A){return typeof A=="function"?this.findParentBy(function(B){return B.constructor===A}):this.findParentBy(function(B){return B.constructor.xtype===A})},mon:function(E,B,D,C,A){if(!this.mons){this.mons=[];this.on("beforedestroy",function(){for(var H=0,G=this.mons.length;H<G;H++){var F=this.mons[H];F.item.un(F.ename,F.fn,F.scope)}},this)}this.mons.push({item:E,ename:B,fn:D,scope:C});E.on(B,D,C,A)}});Ext.reg("component",Ext.Component);