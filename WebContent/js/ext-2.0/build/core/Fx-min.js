/*
 * Ext JS Library 2.0
 * Copyright(c) 2006-2007, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

Ext.enableFx=true;Ext.Fx={slideIn:function(A,C){var B=this.getFxEl();C=C||{};B.queueFx(C,function(){A=A||"t";this.fixDisplay();var D=this.getFxRestore();var I=this.getBox();this.setSize(I);var F=this.fxWrap(D.pos,C,"hidden");var K=this.dom.style;K.visibility="visible";K.position="absolute";var E=function(){B.fxUnwrap(F,D.pos,C);K.width=D.width;K.height=D.height;B.afterFx(C)};var J,L={to:[I.x,I.y]},H={to:I.width},G={to:I.height};switch(A.toLowerCase()){case"t":F.setSize(I.width,0);K.left=K.bottom="0";J={height:G};break;case"l":F.setSize(0,I.height);K.right=K.top="0";J={width:H};break;case"r":F.setSize(0,I.height);F.setX(I.right);K.left=K.top="0";J={width:H,points:L};break;case"b":F.setSize(I.width,0);F.setY(I.bottom);K.left=K.top="0";J={height:G,points:L};break;case"tl":F.setSize(0,0);K.right=K.bottom="0";J={width:H,height:G};break;case"bl":F.setSize(0,0);F.setY(I.y+I.height);K.right=K.top="0";J={width:H,height:G,points:L};break;case"br":F.setSize(0,0);F.setXY([I.right,I.bottom]);K.left=K.top="0";J={width:H,height:G,points:L};break;case"tr":F.setSize(0,0);F.setX(I.x+I.width);K.left=K.bottom="0";J={width:H,height:G,points:L};break}this.dom.style.visibility="visible";F.show();arguments.callee.anim=F.fxanim(J,C,"motion",0.5,"easeOut",E)});return this},slideOut:function(A,C){var B=this.getFxEl();C=C||{};B.queueFx(C,function(){A=A||"t";var I=this.getFxRestore();var D=this.getBox();this.setSize(D);var G=this.fxWrap(I.pos,C,"visible");var F=this.dom.style;F.visibility="visible";F.position="absolute";G.setSize(D);var J=function(){if(C.useDisplay){B.setDisplayed(false)}else{B.hide()}B.fxUnwrap(G,I.pos,C);F.width=I.width;F.height=I.height;B.afterFx(C)};var E,H={to:0};switch(A.toLowerCase()){case"t":F.left=F.bottom="0";E={height:H};break;case"l":F.right=F.top="0";E={width:H};break;case"r":F.left=F.top="0";E={width:H,points:{to:[D.right,D.y]}};break;case"b":F.left=F.top="0";E={height:H,points:{to:[D.x,D.bottom]}};break;case"tl":F.right=F.bottom="0";E={width:H,height:H};break;case"bl":F.right=F.top="0";E={width:H,height:H,points:{to:[D.x,D.bottom]}};break;case"br":F.left=F.top="0";E={width:H,height:H,points:{to:[D.x+D.width,D.bottom]}};break;case"tr":F.left=F.bottom="0";E={width:H,height:H,points:{to:[D.right,D.y]}};break}arguments.callee.anim=G.fxanim(E,C,"motion",0.5,"easeOut",J)});return this},puff:function(B){var A=this.getFxEl();B=B||{};A.queueFx(B,function(){this.clearOpacity();this.show();var F=this.getFxRestore();var D=this.dom.style;var G=function(){if(B.useDisplay){A.setDisplayed(false)}else{A.hide()}A.clearOpacity();A.setPositioning(F.pos);D.width=F.width;D.height=F.height;D.fontSize="";A.afterFx(B)};var E=this.getWidth();var C=this.getHeight();arguments.callee.anim=this.fxanim({width:{to:this.adjustWidth(E*2)},height:{to:this.adjustHeight(C*2)},points:{by:[-(E*0.5),-(C*0.5)]},opacity:{to:0},fontSize:{to:200,unit:"%"}},B,"motion",0.5,"easeOut",G)});return this},switchOff:function(B){var A=this.getFxEl();B=B||{};A.queueFx(B,function(){this.clearOpacity();this.clip();var D=this.getFxRestore();var C=this.dom.style;var E=function(){if(B.useDisplay){A.setDisplayed(false)}else{A.hide()}A.clearOpacity();A.setPositioning(D.pos);C.width=D.width;C.height=D.height;A.afterFx(B)};this.fxanim({opacity:{to:0.3}},null,null,0.1,null,function(){this.clearOpacity();(function(){this.fxanim({height:{to:1},points:{by:[0,this.getHeight()*0.5]}},B,"motion",0.3,"easeIn",E)}).defer(100,this)})});return this},highlight:function(A,C){var B=this.getFxEl();C=C||{};B.queueFx(C,function(){A=A||"ffff9c";var D=C.attr||"backgroundColor";this.clearOpacity();this.show();var G=this.getColor(D);var H=this.dom.style[D];var F=(C.endColor||G)||"ffffff";var I=function(){B.dom.style[D]=H;B.afterFx(C)};var E={};E[D]={from:A,to:F};arguments.callee.anim=this.fxanim(E,C,"color",1,"easeIn",I)});return this},frame:function(A,C,D){var B=this.getFxEl();D=D||{};B.queueFx(D,function(){A=A||"#C3DAF9";if(A.length==6){A="#"+A}C=C||1;var G=D.duration||1;this.show();var E=this.getBox();var F=function(){var H=Ext.getBody().createChild({style:{visbility:"hidden",position:"absolute","z-index":"35000",border:"0px solid "+A}});var I=Ext.isBorderBox?2:1;H.animate({top:{from:E.y,to:E.y-20},left:{from:E.x,to:E.x-20},borderWidth:{from:0,to:10},opacity:{from:1,to:0},height:{from:E.height,to:(E.height+(20*I))},width:{from:E.width,to:(E.width+(20*I))}},G,function(){H.remove();if(--C>0){F()}else{B.afterFx(D)}})};F.call(this)});return this},pause:function(C){var A=this.getFxEl();var B={};A.queueFx(B,function(){setTimeout(function(){A.afterFx(B)},C*1000)});return this},fadeIn:function(B){var A=this.getFxEl();B=B||{};A.queueFx(B,function(){this.setOpacity(0);this.fixDisplay();this.dom.style.visibility="visible";var C=B.endOpacity||1;arguments.callee.anim=this.fxanim({opacity:{to:C}},B,null,0.5,"easeOut",function(){if(C==1){this.clearOpacity()}A.afterFx(B)})});return this},fadeOut:function(B){var A=this.getFxEl();B=B||{};A.queueFx(B,function(){arguments.callee.anim=this.fxanim({opacity:{to:B.endOpacity||0}},B,null,0.5,"easeOut",function(){if(this.visibilityMode==Ext.Element.DISPLAY||B.useDisplay){this.dom.style.display="none"}else{this.dom.style.visibility="hidden"}this.clearOpacity();A.afterFx(B)})});return this},scale:function(A,B,C){this.shift(Ext.apply({},C,{width:A,height:B}));return this},shift:function(B){var A=this.getFxEl();B=B||{};A.queueFx(B,function(){var E={},D=B.width,F=B.height,C=B.x,H=B.y,G=B.opacity;if(D!==undefined){E.width={to:this.adjustWidth(D)}}if(F!==undefined){E.height={to:this.adjustHeight(F)}}if(C!==undefined||H!==undefined){E.points={to:[C!==undefined?C:this.getX(),H!==undefined?H:this.getY()]}}if(G!==undefined){E.opacity={to:G}}if(B.xy!==undefined){E.points={to:B.xy}}arguments.callee.anim=this.fxanim(E,B,"motion",0.35,"easeOut",function(){A.afterFx(B)})});return this},ghost:function(A,C){var B=this.getFxEl();C=C||{};B.queueFx(C,function(){A=A||"b";var H=this.getFxRestore();var E=this.getWidth(),G=this.getHeight();var F=this.dom.style;var J=function(){if(C.useDisplay){B.setDisplayed(false)}else{B.hide()}B.clearOpacity();B.setPositioning(H.pos);F.width=H.width;F.height=H.height;B.afterFx(C)};var D={opacity:{to:0},points:{}},I=D.points;switch(A.toLowerCase()){case"t":I.by=[0,-G];break;case"l":I.by=[-E,0];break;case"r":I.by=[E,0];break;case"b":I.by=[0,G];break;case"tl":I.by=[-E,-G];break;case"bl":I.by=[-E,G];break;case"br":I.by=[E,G];break;case"tr":I.by=[E,-G];break}arguments.callee.anim=this.fxanim(D,C,"motion",0.5,"easeOut",J)});return this},syncFx:function(){this.fxDefaults=Ext.apply(this.fxDefaults||{},{block:false,concurrent:true,stopFx:false});return this},sequenceFx:function(){this.fxDefaults=Ext.apply(this.fxDefaults||{},{block:false,concurrent:false,stopFx:false});return this},nextFx:function(){var A=this.fxQueue[0];if(A){A.call(this)}},hasActiveFx:function(){return this.fxQueue&&this.fxQueue[0]},stopFx:function(){if(this.hasActiveFx()){var A=this.fxQueue[0];if(A&&A.anim&&A.anim.isAnimated()){this.fxQueue=[A];A.anim.stop(true)}}return this},beforeFx:function(A){if(this.hasActiveFx()&&!A.concurrent){if(A.stopFx){this.stopFx();return true}return false}return true},hasFxBlock:function(){var A=this.fxQueue;return A&&A[0]&&A[0].block},queueFx:function(C,A){if(!this.fxQueue){this.fxQueue=[]}if(!this.hasFxBlock()){Ext.applyIf(C,this.fxDefaults);if(!C.concurrent){var B=this.beforeFx(C);A.block=C.block;this.fxQueue.push(A);if(B){this.nextFx()}}else{A.call(this)}}return this},fxWrap:function(F,D,C){var B;if(!D.wrap||!(B=Ext.get(D.wrap))){var A;if(D.fixPosition){A=this.getXY()}var E=document.createElement("div");E.style.visibility=C;B=Ext.get(this.dom.parentNode.insertBefore(E,this.dom));B.setPositioning(F);if(B.getStyle("position")=="static"){B.position("relative")}this.clearPositioning("auto");B.clip();B.dom.appendChild(this.dom);if(A){B.setXY(A)}}return B},fxUnwrap:function(A,C,B){this.clearPositioning();this.setPositioning(C);if(!B.wrap){A.dom.parentNode.insertBefore(this.dom,A.dom);A.remove()}},getFxRestore:function(){var A=this.dom.style;return{pos:this.getPositioning(),width:A.width,height:A.height}},afterFx:function(A){if(A.afterStyle){this.applyStyles(A.afterStyle)}if(A.afterCls){this.addClass(A.afterCls)}if(A.remove===true){this.remove()}Ext.callback(A.callback,A.scope,[this]);if(!A.concurrent){this.fxQueue.shift();this.nextFx()}},getFxEl:function(){return Ext.get(this.dom)},fxanim:function(D,E,B,F,C,A){B=B||"run";E=E||{};var G=Ext.lib.Anim[B](this.dom,D,(E.duration||F)||0.35,(E.easing||C)||"easeOut",function(){Ext.callback(A,this)},this);E.anim=G;return G}};Ext.Fx.resize=Ext.Fx.scale;Ext.apply(Ext.Element.prototype,Ext.Fx);