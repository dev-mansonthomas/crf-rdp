Ext.BLANK_IMAGE_URL = "./js/ext-3.4.0/resources/images/default/s.gif";

Ext.namespace('Ext.ux.crf', 'Ext.ux.crf.Login');

//create application
Ext.ux.crf.Login = function() {
// do NOT access DOM from here; elements don't exist yet

// private variables
var dialog          ,
   form          ,
   logoBgColor = 'f9f9f9',
   submitUrl   = 'j_security_check';


// private functions

// public space
return {
 // public properties, e.g. strings to translate
 // public methods
 init: function() {
 Ext.QuickTips.init();

 var logoPanel = new Ext.Panel({
   baseCls  : 'x-plain',
   bodyStyle: 'background:#'+logoBgColor+' url('+logoUrl+') no-repeat center center;',
   id       : 'login-logo',
   region   : 'center'
 });
 
 
 var formPanel = new Ext.form.FormPanel({
       baseCls         : 'x-plain',
       standardSubmit  : true,
       url             : submitUrl,
       method          : 'POST',
       bodyStyle       : 'background:#f9f9f9 none; color:#222; padding:5px 35px;',
       defaults        : {
         width: 200
       },
       defaultType     : 'textfield' ,
       frame           : false       ,
       height          : 100         ,
       id              : 'login-form',
       labelWidth      : 120         ,
       region          : 'south'     ,
       
       buttons         : [{
         handler: function(){
           this.login();
         },
         scope: this,
          text: 'Login'
       }],
       items           : [{
           id        : 'j_username',
           fieldLabel: 'NIVOL'     ,
           name      : 'j_username',
           defaultAutoCreate:{tag:'input',type:'text',autocomplete:'on'},
           value     : userName//défini dans le corp de la jsp avec la valeur entrée précédement
       },{
           id        : 'j_password',
           fieldLabel: 'Password'  ,
           inputType : 'password'  ,
           name      : 'j_password',
           defaultAutoCreate:{tag:'input',type:'password',autocomplete:'on'},
           value     : '',
           fireKey   : function(e) {
             if(e.getKey()==e.ENTER && formPanel.getForm().isValid()){
             	loginCs.login();
             }
           }
       }]
   });

 dialog = new Ext.Window({
       buttonAlign : 'right',
       closable    : false,
       draggable   : true,
       height      : 251,
       id          : 'login-win',
       layout      : 'border',
       minHeight   : 250,
       minWidth    : 530,
       plain       : false,
       resizable   : false,
       items       : [
         logoPanel,
         formPanel
       ] ,
       title       : 'Authentification',
       width       : 531
   });
 
 form = formPanel.getForm();

 dialog.show();
 
 
 if(loginError)
 {
   Ext.get('errorMessage').anchorTo('login-win', 'bl').highlight("#FFFF00", {
     attr    : "background-color",
     endColor: "#FF9595",
     easing  : 'easeIn',
     duration: 1
   });
 }
 
 },
 login: function() 
 {
   
   form.getEl().dom.action=form.url;

   form.submit({
             url     : 'j_security_check',
             waitMsg : 'Veuillez Patienter...',
             //reset   : true,
            // success : loginCs.Success,
             scope   : this
           });
 }
 ,
 success: function(f,a){
   if(a && a.result){
     dialog.destroy(true);
     
     // get the path
     var path = window.location.pathname;
     path = path.substring(0, path.lastIndexOf('/') + 1);
       
   }
 }
};
}(); // end of app
function init()
{
loginCs = Ext.ux.crf.Login;
loginCs.init();
}
