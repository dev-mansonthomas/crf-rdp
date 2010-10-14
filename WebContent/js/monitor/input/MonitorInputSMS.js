Ext.namespace('Ext.ux.monitor.input.SMS');



Ext.ux.monitor.input.SMS=Ext.extend(Ext.Window, {
  id         : 'MonitorInputSMSWindow',
  layout     : 'fit',
  width      : 600,
  height     : 450,
  closeAction: 'hide',
  plain      : true,
  buttons    : [{
      text: 'Envoyer',
      handler: function(button, event)
      {
        var message      = Ext.getCmp('miSMSMessageField'         ).getValue();
        var idDispositif = Ext.getCmp('MonitorInputSMSWindow'     ).getIdDispositif();
        var checkboxes   = Ext.getCmp('miSMSDestinataireFieldset' ).items;
        
        var destinataires = [];
        
        checkboxes.each(function(item, index, lenght)
        {
          if(item.getValue())
          {
            destinataires.push(item.idEquipier);  
          }
        });
        
        if(destinataires.length == 0)
        {
          Ext.Msg.alert('Aucun destinataire sélectionné','Afin de pouvoir envoyer un SMS, il faut sélectionner au moins un destinataire ;) ');
          return;
        }
        
        MonitorInputSMS.sendSMS(idDispositif, destinataires, message, function()
        {
          Ext.Msg.alert('Message Envoyé','Le message a été envoyé avec succès');
        });
        
        
        
        Ext.getCmp('MonitorInputSMSWindow').hide();
      }
  },
  {
      text: 'Annuler',
      handler: function(button, event){
        Ext.getCmp('MonitorInputSMSWindow').hide();
      }
  }],
  initComponent: function() {
    
    
    var statusMsg = new Ext.Toolbar.TextItem(' ');
    var charCount = new Ext.Toolbar.TextItem(' Nombre de caractères du message: -');
    
    this.form = new Ext.FormPanel({
      labelWidth: 110,
      width: 600,
      bbar: new Ext. Toolbar({
        id: 'statusBar' ,
        items: [ charCount, '->' , statusMsg]
      } ) ,
      items: [{
            id:'miSMSDestinataireFieldset',
            xtype: 'fieldset',
            title: 'Destinataires du SMS',
            autoHeight: true,
            defaultType: 'checkbox', // each item will be a checkbox
            items: [{
                boxLabel: 'Loading',
                name: 'fav-animal-dupond'
            }]
          },
          {
            xtype: 'fieldset',
            title: 'Message',
            autoHeight: true,
            items: [{
                id:'miSMSMessageField',
                xtype:'textarea',
                name: 'message',
                style:'width:100%;height:120px;',
                listeners: {
                  // Update the character count.
                  keypress : {
                    fn :function(textfield,event) 
                    {
                      var v  = textfield.getValue();
                      var cc = v.length ? v.length : 0;
                      Ext. fly(charCount.getEl()).update(' Nombre de caractères du message:' + cc) ;
                    },
                    buffer:1
                  }
                }
            }]
          }          
      ]
    });
    
    Ext.apply(this, {
      items: [this.form]
    });
    
    Ext.ux.monitor.input.SMS.superclass.initComponent.apply(this, arguments);
  },
  getIdDispositif:function()
  {
    return this.idDispositif;
  },
  displaySendSMSForm:function(idDispositif)
  {
    window.focus();
    this.idDispositif = idDispositif;
    if(consoleEnabled)
    {
      console.log('displaySendSMSForm('+idDispositif+')');
    }
    this.show  ();
    this.center();
    MonitorInputSMS.getEquipiersFromDispositif(idDispositif,this.displaySendSMSFormReturn);
  },
  displaySendSMSFormReturn:function(equipiers)
  {
    if(consoleEnabled)
    {
      console.log('displaySendSMSFormReturn',equipiers);
    }
    try
    {
      var destinataires = [];
      
      for(var i = 0, counti=equipiers.length;i<counti;i++)
      {
        var equipier = equipiers[i];
        
        destinataires.push({
          checked: equipier.idRoleDansDispositif >=5 && equipier.idRoleDansDispositif <=7,//5,6,7: ci alpha, réseau, ch
          boxLabel: equipier.prenom+' '+equipier.nom+' - '+equipier.mobile+' ('+crfIrpUtils.getLabelFor('RolesEquipier', equipier.idRoleDansDispositif )+')',
          name: 'miSMS-dest-'+equipier.idEquipier,
          idEquipier:equipier.idEquipier
        });
      }
      var destinataireFieldSet = Ext.getCmp('miSMSDestinataireFieldset');
      destinataireFieldSet.removeAll();
      destinataireFieldSet.add(destinataires);
      
      destinataireFieldSet.doLayout();
    }
    catch(e)
    {
      if(consoleEnabled)
      {
        console.log('displaySendSMSFormReturn error ',e);
      }
    }
   
  }
});