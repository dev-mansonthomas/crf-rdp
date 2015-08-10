Ext.namespace('Ext.ux.crfrdp.RecipientListTabPanel');


Ext.ux.crfrdp.RecipientListTabPanel = Ext.extend(Ext.TabPanel,{
  closable        : true,
  activeTab       : 0   ,
  resizeTabs      : true,
  enableTabScroll : true,
  height          : 50  ,
  tabWidth        : 235 ,
  defaults        : {autoScroll:true},
  
  
  initComponent: function() {
   try
   {

     
      Ext.apply(this,{
        items   : [{
          title       : 'Ajoutez un destinataire!',
          closable    : true,
          html        : 'Ajoutez un destinataire avant d\'envoyer le SMS',
          equipier    : {idEquipier:0,mobile:''}
      }]
      });
      
      


      Ext.ux.crfrdp.RecipientListTabPanel.superclass.initComponent.apply(this, arguments);
      

    }
    catch(exception)
    {
      if(consoleEnabled)
      {
        console.log("Exception occured during Ext.ux.crfrdp.RecipientListTabPanel->initCompoent "+exception);
      }
    }

   

  },
  
  setInitialRecipient: function(equipier)
  {
    this.removeAll(true);
    equipier['delegation.idDelegation'] = equipier.delegation.idDelegation;
    this.add({
          id          : this.id+'-'+equipier.mobile,
          title       : equipier.mobile+' - '+equipier.nom+' '+equipier.prenom,
          closable    : true,
          html        : this.renderEquipier(equipier),
          equipier    : equipier
      });
    this.activate(this.id+'-'+equipier.mobile);
  },
  addAdditionnalRecipient: function(equipier)
  {
    
    if(this.items.items[0].equipier.idEquipier==0)
    {//si le premier item a un idEquipier à 0, c'est que c'est un nouveau SMS from scratch ==> on supprime cet onglet a l'ajout du premier destinataire.
      this.removeAll(true);
    }
    
    this.add({
          id          : this.id+'-'+equipier.mobile,
          title       : equipier.mobile+' - '+equipier.nom+' '+equipier.prenom,
          closable    : true,
          html        : this.renderEquipier(equipier),
          equipier    : equipier
      });
    this.activate(this.id+'-'+equipier.mobile);
  },
  renderEquipier:function(equipier)
  {
    return  equipier.mobile+' - '+
            '<img src="'+contextPath+'/img/monitorInput/user'+(equipier.homme?'':'_female')+'.png" alt="'+(equipier.homme?'Homme':'Femme')+'"/> '+
            "<span title='id:"+equipier.idEquipier+"'>"+equipier.numNivol+'</span> - '+equipier.nom+' '+equipier.prenom + ' - ' + equipier.email +' - '+ 
            crfIrpUtils.getLabelFor('Delegations', equipier['delegation.idDelegation'])
  }
  
});

Ext.reg('RecipientListTabPanel', Ext.ux.crfrdp.RecipientListTabPanel);

