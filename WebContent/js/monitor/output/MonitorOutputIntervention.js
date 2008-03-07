var MonitorOutputInterventionCs = Class.create();

MonitorOutputInterventionCs.prototype.initialize=function()
{
  MonitorOutputIntervention.initScriptSession();
  PageBus.subscribe("list.loaded",  this, this.loadAllIntervention, null, null);
};

MonitorOutputInterventionCs.prototype.loadAllIntervention=function()
{
  MonitorOutputIntervention.loadAllIntervention(moInterventionCs.loadAllInterventionReturn);
};

MonitorOutputInterventionCs.prototype.loadAllInterventionReturn=function(interventionList)
{
  for(var i=0,count=interventionList.length; i<count; i++)
    moInterventionCs.updateInterventionToAffect(interventionList[i]);
};

MonitorOutputInterventionCs.prototype.deleteInterventionToAffect=function(idIntervention)
{
  $('panel_interventionTicket_'+idIntervention).remove();
};

MonitorOutputInterventionCs.prototype.updateInterventionToAffect=function(intervention)
{
  if( $('interventionTicket_'+intervention.idIntervention) == null)
  {//*Si le dispositif n'existe pas sur la page on le cree*
    this.addInterventionPanel(intervention);
  }
  var origine     = crfIrpUtils.getLabelFor('OriginesIntervention', intervention.idOrigine);
  var motif       = crfIrpUtils.getLabelFor('MotifsIntervention'  , intervention.idMotif  );
  var dhReception = crfIrpUtils.getFullDate(intervention.dhReception);

  dwr.util.setValue('interventionTicket_origine_'     +intervention.idIntervention, origine);
  dwr.util.setValue('interventionTicket_motif_'       +intervention.idIntervention, motif);
  dwr.util.setValue('interventionTicket_dhReception_' +intervention.idIntervention, dhReception);
  dwr.util.setValue('interventionTicket_rue_'         +intervention.idIntervention, intervention.rue);
  dwr.util.setValue('interventionTicket_codePostal_'  +intervention.idIntervention, intervention.codePostal);
  dwr.util.setValue('interventionTicket_ville_'       +intervention.idIntervention, intervention.ville);
  
  
  dwr.util.setValue('interventionTicket_googleCoordsLat_'+intervention.idIntervention, intervention.googleCoordsLat);
  dwr.util.setValue('interventionTicket_googleCoordsLong_'+intervention.idIntervention, intervention.googleCoordsLong);
/*
  Ext.QuickTips.register({target:'interventionTicket_details_'+intervention.idIntervention,
                          showDelay: 10,
                          autoHide:true,
                          hideDelay:10,
                          animate:true,
                          title :'Complément d\'adresse',
                          text  :'batiment: '+intervention.batiment+'<br/>étage: '+intervention.etage+'<br/>porte: '+intervention.porte+'<br/>Complément d\'adresse:<br/>'+intervention.complementAdresse});

  Ext.QuickTips.register({target:'interventionTicket_contact_'+intervention.idIntervention,
                          showDelay: 10,
                          autoHide:true,
                          hideDelay:10,
                          animate:true,
                          title :'Victime & contact',
                          text  :'Complément d\'information sur le motif: '+intervention.complementMotif+'<br/>Nom de la victime: '+intervention.nomVictime+'<br/>Nom Contact: '+intervention.nomContactSurPlace+'<br/>Coordonnées Contact:<br/>'+intervention.coordonneesContactSurPlace});

  */
  
  var tabsInfo = [["Adresse", intervention.rue+",<br/>"+intervention.codePostal+", "+intervention.ville],
                  ["Motif",origine+" - "+dhReception+"<br/>"+motif]];
  
  crfGoogleMap.displayInfo(intervention.googleCoordsLat, intervention.googleCoordsLong,0,7,false,tabsInfo); 
};

MonitorOutputInterventionCs.prototype.addInterventionPanel=function(intervention)
{
  var origine   = crfIrpUtils.getLabelFor('OriginesIntervention', intervention.idOrigine);
  var motif     = crfIrpUtils.getLabelFor('MotifsIntervention'  , intervention.idMotif  );
  var shortDate = crfIrpUtils.getTime    (intervention.dhReception);
  var fullDate  = crfIrpUtils.getFullDate(intervention.dhReception);
/*  
  var iconMenu= new Ext.menu.Menu({
      id: 'panel_iconMenu_interventionTicket_'+intervention.idIntervention
      , items: [
        new Ext.menu.Item({
          text: 'Action sur l\'intervention id:'+intervention.idIntervention
          , disabled: true
        })
        , new Ext.menu.Separator()
        , new Ext.menu.Item({
          text: 'Editer'
          , icon: iconPath + 'report_edit.png'
          , handler: function(item) {
            var miInterventionCs = monitorOutputCs.getMonitorInputRef().miInterventionCs;
            miInterventionCs.editInterventionTicket(intervention.idIntervention);
          }
        })
        , new Ext.menu.Item({
          text: 'Annuler'
          , icon: iconPath + 'report_delete.png'
          , handler: function(item) {
            var miInterventionCs = monitorOutputCs.getMonitorInputRef().miInterventionCs;
            miInterventionCs.cancelInterventionTicket(intervention.idIntervention);
          }
        })
    ]});
  
  
  var panel = acc.add(new Ext.ux.InfoPanel({
    title:'<span title="id:'+intervention.idIntervention+' - Date:'+fullDate+'">'+shortDate +'</span> - '+ origine +' - '+ motif
    , collapsedIcon: iconPath + 'lightbulb_off.png'
    , expandedIcon: iconPath + 'lightbulb.png'
    , id:'panel_interventionTicket_'+intervention.idIntervention
    , autoCreate: {tag:'div'}
    , showPin: true
    , collapseOnUnpin: false
    , iconMenu:iconMenu
  }));
  panel.update(this.interventionTemplates[intervention.idOrigine].evaluate({id:intervention.idIntervention, idRegulation:intervention.idRegulation}));
  acc.add(panel);
  */
  var westPanel = Ext.getCmp('west-panel');
  var tab = new Ext.Panel({ id: 'interventionTicket_'+intervention.idIntervention
                , layout:'fit'
                , title : '<span title="id:'+intervention.idIntervention+' - Date:'+fullDate+'">'+shortDate +'</span> - '+ origine +' - '+ motif
                , closable:false
                , autoScroll:true
                , border:false
                , html:this.interventionTemplates[intervention.idOrigine].evaluate({id:intervention.idIntervention, idRegulation:intervention.idRegulation})
                });
  
  westPanel.add(tab);
  westPanel.doLayout();
  
  
};


MonitorOutputInterventionCs.prototype.interventionTemplates = Array();
MonitorOutputInterventionCs.prototype.interventionTemplates[1] = new Template('\
<input type="hidden" id="interventionTicket_regulation_id_#{id}"    name="interventionTicket_regulation_id_#{id}" value="#{idRegulation}"/>\
<input type="hidden" id="interventionTicket_googleCoordsLat_#{id}"  name="interventionTicket_googleCoordsLat_#{id}"/>\
<input type="hidden" id="interventionTicket_googleCoordsLong_#{id}" name="interventionTicket_googleCoordsLong_#{id}"/>\
<table id="interventionTicket_#{id}" class="intervention_samu">\
  <tr>\
    <th>Date</th>\
    <td id="interventionTicket_dhReception_#{id}"></td>\
  </tr>\
  <tr>\
    <th>Origine</th>\
    <td id="interventionTicket_origine_#{id}"></td>\
  </tr>\
  <tr>\
    <th>Motif</th>\
    <td id="interventionTicket_motif_#{id}"></td>\
  </tr>\
  <tr>\
    <th>Rue</th>\
    <td id="interventionTicket_rue_#{id}"></td>\
  </tr>\
  <tr>\
    <th>Code Postal</th>\
    <td id="interventionTicket_codePostal_#{id}"></td>\
  </tr>\
  <tr>\
    <th>Ville</th>\
    <td id="interventionTicket_ville_#{id}"></td>\
  </tr>\
</table>\
<img src="'+contextPath+'/img/famfamfam/map_magnify.png" id="interventionTicket_googleMap_#{id}" onClick="crfGoogleMap.showOnMap($(\'interventionTicket_googleCoordsLat_#{id}\').value,$(\'interventionTicket_googleCoordsLong_#{id}\').value)"/>\
<img src="'+contextPath+'/img/famfamfam/information.png" id="interventionTicket_details_#{id}"/>\
<img src="'+contextPath+'/img/famfamfam/comment.png"     id="interventionTicket_contact_#{id}"/>\
'
);
MonitorOutputInterventionCs.prototype.interventionTemplates[0] = MonitorOutputInterventionCs.prototype.interventionTemplates[1] ;
MonitorOutputInterventionCs.prototype.interventionTemplates[2] = MonitorOutputInterventionCs.prototype.interventionTemplates[1] ;
MonitorOutputInterventionCs.prototype.interventionTemplates[3] = MonitorOutputInterventionCs.prototype.interventionTemplates[1] ;
MonitorOutputInterventionCs.prototype.interventionTemplates[4] = MonitorOutputInterventionCs.prototype.interventionTemplates[1] ;
MonitorOutputInterventionCs.prototype.interventionTemplates[5] = MonitorOutputInterventionCs.prototype.interventionTemplates[1] ;
MonitorOutputInterventionCs.prototype.interventionTemplates[6] = MonitorOutputInterventionCs.prototype.interventionTemplates[1] ;

/*
MonitorOutputInterventionCs.prototype.addIntervention=function()
{
  var monitorInput = monitorOutputCs.getMonitorInputRef  ();
  monitorInput.miInterventionCs.addIntervention();
};*/