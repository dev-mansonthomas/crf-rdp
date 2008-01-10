/*
 * Ext JS Library 2.0
 * Copyright(c) 2006-2007, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

Ext.form.TextField=Ext.extend(Ext.form.Field,{grow:false,growMin:30,growMax:800,vtype:null,maskRe:null,disableKeyFilter:false,allowBlank:true,minLength:0,maxLength:Number.MAX_VALUE,minLengthText:"The minimum length for this field is {0}",maxLengthText:"The maximum length for this field is {0}",selectOnFocus:false,blankText:"This field is required",validator:null,regex:null,regexText:"",emptyText:null,emptyClass:"x-form-empty-field",initComponent:function(){Ext.form.TextField.superclass.initComponent.call(this);this.addEvents("autosize")},initEvents:function(){Ext.form.TextField.superclass.initEvents.call(this);if(this.validationEvent=="keyup"){this.validationTask=new Ext.util.DelayedTask(this.validate,this);this.el.on("keyup",this.filterValidation,this)}else{if(this.validationEvent!==false){this.el.on(this.validationEvent,this.validate,this,{buffer:this.validationDelay})}}if(this.selectOnFocus||this.emptyText){this.on("focus",this.preFocus,this);if(this.emptyText){this.on("blur",this.postBlur,this);this.applyEmptyText()}}if(this.maskRe||(this.vtype&&this.disableKeyFilter!==true&&(this.maskRe=Ext.form.VTypes[this.vtype+"Mask"]))){this.el.on("keypress",this.filterKeys,this)}if(this.grow){this.el.on("keyup",this.onKeyUp,this,{buffer:50});this.el.on("click",this.autoSize,this)}},processValue:function(A){if(this.stripCharsRe){var B=A.replace(this.stripCharsRe,"");if(B!==A){this.setRawValue(B);return B}}return A},filterValidation:function(A){if(!A.isNavKeyPress()){this.validationTask.delay(this.validationDelay)}},onKeyUp:function(A){if(!A.isNavKeyPress()){this.autoSize()}},reset:function(){Ext.form.TextField.superclass.reset.call(this);this.applyEmptyText()},applyEmptyText:function(){if(this.rendered&&this.emptyText&&this.getRawValue().length<1){this.setRawValue(this.emptyText);this.el.addClass(this.emptyClass)}},preFocus:function(){if(this.emptyText){if(this.el.dom.value==this.emptyText){this.setRawValue("")}this.el.removeClass(this.emptyClass)}if(this.selectOnFocus){this.el.dom.select()}},postBlur:function(){this.applyEmptyText()},filterKeys:function(B){var A=B.getKey();if(!Ext.isIE&&(B.isNavKeyPress()||A==B.BACKSPACE||(A==B.DELETE&&B.button==-1))){return }var D=B.getCharCode(),C=String.fromCharCode(D);if(Ext.isIE&&(B.isSpecialKey()||!C)){return }if(!this.maskRe.test(C)){B.stopEvent()}},setValue:function(A){if(this.emptyText&&this.el&&A!==undefined&&A!==null&&A!==""){this.el.removeClass(this.emptyClass)}Ext.form.TextField.superclass.setValue.apply(this,arguments);this.applyEmptyText();this.autoSize()},validateValue:function(A){if(A.length<1||A===this.emptyText){if(this.allowBlank){this.clearInvalid();return true}else{this.markInvalid(this.blankText);return false}}if(A.length<this.minLength){this.markInvalid(String.format(this.minLengthText,this.minLength));return false}if(A.length>this.maxLength){this.markInvalid(String.format(this.maxLengthText,this.maxLength));return false}if(this.vtype){var C=Ext.form.VTypes;if(!C[this.vtype](A,this)){this.markInvalid(this.vtypeText||C[this.vtype+"Text"]);return false}}if(typeof this.validator=="function"){var B=this.validator(A);if(B!==true){this.markInvalid(B);return false}}if(this.regex&&!this.regex.test(A)){this.markInvalid(this.regexText);return false}return true},selectText:function(E,A){var C=this.getRawValue();if(C.length>0){E=E===undefined?0:E;A=A===undefined?C.length:A;var D=this.el.dom;if(D.setSelectionRange){D.setSelectionRange(E,A)}else{if(D.createTextRange){var B=D.createTextRange();B.moveStart("character",E);B.moveEnd("character",C.length-A);B.select()}}}},autoSize:function(){if(!this.grow||!this.rendered){return }if(!this.metrics){this.metrics=Ext.util.TextMetrics.createInstance(this.el)}var C=this.el;var B=C.dom.value;var D=document.createElement("div");D.appendChild(document.createTextNode(B));B=D.innerHTML;D=null;B+="&#160;";var A=Math.min(this.growMax,Math.max(this.metrics.getWidth(B)+10,this.growMin));this.el.setWidth(A);this.fireEvent("autosize",this,A)}});Ext.reg("textfield",Ext.form.TextField);