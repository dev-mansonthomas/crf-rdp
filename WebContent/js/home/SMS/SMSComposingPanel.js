Ext.namespace('Ext.ux.Home.SMS.SMSComposingPanel');




Ext.ux.Home.SMS.SMSComposingPanel = Ext.extend(Ext.Panel, {
  layout       : 'border',
  initComponent: function()
  {    
      this.id   = "SMSComposingPangel-"+this.mobile; 
      this.title= "SMS - "+this.mobile;
      
      this.adresseeSMSGridId = 'SMSComposingPanelMessagesGrid-'+this.mobile;
      var adresseeSMSGrid = {
          xtype         : 'CRFSMSGrid',
          id            : this.adresseeSMSGridId,
          mainGrid      : false,
          subGrid       : true,
          collapsible   : false,
          subGridId     : 'FAKESMSComposingPanelMessagesGrid-'+this.mobile
      };
      
      this.closable = true;
      
      this.items=[
        {
          title: 'SMS Echangé avec '+this.equipierDesc + ' - ' + this.mobile,
          region: 'south',
          height: 330,
          items:[adresseeSMSGrid]
        },{
          title: 'Templates',
          region:'west',
          margins: '5 0 0 0',
          cmargins: '5 5 0 0',
          width: 305,
          items:[{      id: this.id+'Templates', 
                     xtype:'SMSTemplateMessageGrid',
                viewConfig:{
                            forceFit:true
                           }

                     
          }]
        },{
          title: 'Rédaction du SMS',
          collapsible: false,
          region:'center',
          margins: '5 0 0 0'
        }       
      ];

    /**ADDING TAB TO HOME**/
      Ext.ux.Home.SMS.SMSComposingPanel.superclass.initComponent.call(this);
      
      var tabPanelComp = Ext.getCmp('home_center');
      tabPanelComp.add(this);
  
      
      this.show(); 
  },
  initGrid:function()
  {
    Ext.getCmp(this.adresseeSMSGridId).initToolBar(); 
    Ext.getCmp(this.adresseeSMSGridId).preInitGridSearch(this.adresseeSMSGridId, this.mobile, true, this.equipierDesc);
    Ext.getCmp(this.adresseeSMSGridId).rechercher ();
  }
  
});


Ext.reg('CRFSMSComposingPanel', Ext.ux.Home.SMS.SMSComposingPanel);

