Ext.namespace('Ext.ux.Home.SMS.SMSComposingPanel');




Ext.ux.Home.SMS.SMSComposingPanel = Ext.extend(Ext.Panel, {
  layout       : 'border',
  initComponent: function()
  {    
      this.id                 = "SMSComposingPangel-"+this.mobile; 
      var  id                 =  this.id;
      this.title              = "SMS - "+this.mobile;
      this.adresseeSMSGridId  = id+'SMSComposingPanelMessagesGrid-'+this.mobile;
      this.closable           = true;
      this.recipientListCmpId = id+'SMSComposingManagerRecipientList-'+this.mobile;
      var recipientListCmpId  = this.recipientListCmpId; //une var sinon dans les closures, this. ne fonctionne pas.
      
      var adresseeSMSGrid = {
          xtype         : 'CRFSMSGrid',
          id            : this.adresseeSMSGridId,
          mainGrid      : false,
          subGrid       : true,
          collapsible   : false,
          subGridId     : id+'FAKESMSComposingPanelMessagesGrid-'+this.mobile
      };
      

      
      
      this.tbar      = [new Ext.Action({
        text   : 'Annuler',
        handler: function()
        {
          var tabPanelComp = Ext.getCmp('home_center');
          tabPanelComp.remove(id, true);
        },
        iconCls: 'smsManagerCancelButton'
      }),
      new Ext.Action({
        text   : 'Envoyer le SMS',
        handler: function()
        {
          var message    = Ext.getCmp(id+'-textArea').getValue();
          var textLength = message.length;
          
          if(textLength>1)
          {
            if(textLength>400)
            {
              Ext.Msg.alert('Erreur', 'Veuillez saisir un message de moins de 400 caractères');  
              return; 
            }
            
            var recipientList = Ext.getCmp(recipientListCmpId).items.items;
            
            var equipierList = [];
            
            var i = 0;
            for(i=0;i<recipientList.length;i++)
            {
              var oneRecipient = recipientList[i];
              
              if(oneRecipient.equipier.idEquipier!=0)
              {// par défaut, un tab avec idEquipier à 0.
                equipierList[equipierList.length]=oneRecipient.equipier.mobile;    
              }
            }
            
            if(equipierList.length == 0)
            {
              Ext.Msg.alert('Erreur', 'Veuillez saisir au moins un destinataire!');  
              return; 
            }
            
            SMSManagerService.sendSMS(equipierList, message);
            
            Ext.getCmp('SMSManager').reloadGrids();
            
            var tabPanelComp = Ext.getCmp('home_center');
            tabPanelComp.remove(id, true); 
            
          }
          else
          {
            Ext.Msg.alert('Erreur', 'Veuillez saisir un message d\'au moins 2 caractères');  
          }
        },
        iconCls: 'smsManagerSendButton'
      })
      ];
      
      this.items=[
        {
          title: 'SMS Echangé avec '+this.equipierDesc + ' - ' + this.mobile,
          region: 'south',
          height: 330,
          items:[adresseeSMSGrid]
        },{
          title       : 'Templates',
          region      :'west',
          collapsible : true,
          collapsed   : true,
          width       : 305,
          items       :[{
                        id: id+'Templates', 
                     xtype:'SMSTemplateMessageGrid',
                viewConfig:{
                            forceFit:true
                           }
          }]
        },{
          title       : 'Rédaction du SMS',
          collapsible : false,
          region      :'center',
          labelWidth  : 120,
          bodyStyle   :'padding:5px 5px 5px 5px',
          xtype       :'form',
          items       :[
                {
                  id          : id+'SMSRecipientEquipierSearch', 
                  searchType  : 2,/*dispositifEquipierSearch*/
                  displayField: 'numNivol',
                  loadingText : 'Recherche en cours...',
                  width       : 570,
                  listWidth   : 570,
                  pageSize    : 10,
                  minChars    : 1,
                  hideTrigger : true,
                  itemSelector: 'div.search-item',
                  listeners   : {
                    // delete the previous query in the beforequery event or set
                    // combo.lastQuery = null (this will reload the store the next time it expands)
                    beforequery: function(qe){
                        delete qe.combo.lastQuery;
                  }},
                  filterCallBack : function()
                  {
                   
                     var role   = 1;
                     var search = Ext.getCmp(id+'SMSRecipientEquipierSearch').getValue();
                     
                     if(role =='')
                       return [];
                     
                     return [new Ext.ux.rs.data.FilterObject('idRole',role  ,'='),
                             new Ext.ux.rs.data.FilterObject('search',search,'=')]
                  },
                  onSelect    : function(record)
                                {
                                  try
                                  {
                                    Ext.getCmp(recipientListCmpId).addAdditionnalRecipient(record.data);
                                  }
                                  catch(exception)
                                  {
                                    if(consoleEnabled)
                                    {
                                      console.log("Exception occured during Ext.ux.crfrdp.RecipientListTabPanel->addAdditionnalRecipient - "+ exception);  
                                    }
                                    throw exception;
                                  }
                                  this.clearValue();
                                },
                  fieldLabel  : 'Ajout d\'un destinataire',
                  name        : 'EquipierSearch',
                  xtype       : 'EquipierComboSearch'
                },{
                    id        : this.recipientListCmpId,
                    xtype     :'RecipientListTabPanel'
                  },{
                    id        : id+'-textArea',
                    fieldLabel: 'Message',
                    name      : 'message',
                    allowBlank: false,
                    xtype     : 'textarea',
                    height    : 100,
                    bodyStyle :'padding:5px 5px 5px 5px',
                    anchor    : '98%',
                    enableKeyEvents:true,
                    listeners : {'keyup': function(textarea, event)
                                          {
                                            Ext.getCmp(id+'char-counter').setValue(this.getValue().length);
                                          }
                      }
                  },
                  {
                    id        : id+'char-counter',
                    xtype     : 'textfield',
                    fieldLabel: 'Compteur',
                    name      : 'compteur',
                    value     : '0'
                  }
                ]
        }/*,{
          title: 'Outils',
          collapsible: true,
          region:'east', 
          margins: '5 0 0 0'
        }  */     
      ];
      

      if(this.equipierId != 0)
      {
        SMSManagerService.getEquipierDetails(this.equipierId, function(equipier)
        {
          try
          {
            Ext.getCmp(recipientListCmpId).setInitialRecipient(equipier);  
          }
          catch(exception)
          {
            if(consoleEnabled)
            {
              console.log("Exception occured during Ext.ux.crfrdp.RecipientListTabPanel->setInitialRecipient - "+ exception);  
            }
            throw exception;
          }
            
        });  
      }
      

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

