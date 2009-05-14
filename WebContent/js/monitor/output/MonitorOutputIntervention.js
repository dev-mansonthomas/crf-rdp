var MonitorOutputInterventionCs = Class.create();

MonitorOutputInterventionCs.prototype.initialize=function()
{
  MonitorOutputIntervention.initScriptSession();
  
  this.listLoaded     = false;
  this.listLieuLoaded = false;

  PageBus.subscribe("list.loaded"     ,  this, this.loadAllIntervention, null, null);
  PageBus.subscribe("listLieu.loaded" ,  this, this.loadAllIntervention, null, null);
};

MonitorOutputInterventionCs.prototype.loadAllIntervention=function(eventName, data)
{
  if(eventName == "list.loaded")
    this.listLoaded     = true;
  if(eventName == "listLieu.loaded")
    this.listLieuLoaded = true;
  
  if(this.listLoaded == true &&  this.listLieuLoaded == true)//on attends que les 2 listes soient initialisées
    MonitorOutputIntervention.loadAllIntervention(moInterventionCs.loadAllInterventionReturn);
};

MonitorOutputInterventionCs.prototype.loadAllInterventionReturn=function(interventionList)
{
  for(var i=0,count=interventionList.length; i<count; i++)
    moInterventionCs.updateInterventionToAffect(interventionList[i]);
};

MonitorOutputInterventionCs.prototype.deleteInterventionToAffect=function(idIntervention)
{
  Ext.getCmp('monitorOutputWestRegion').remove(this.getPanelId(idIntervention));
};

MonitorOutputInterventionCs.prototype.updateInterventionToAffect=function(intervention)
{
  if( $(this.getPanelId(intervention.idIntervention)) == null)
  {//*Si le dispositif n'existe pas sur la page on le cree*
    this.addInterventionPanel(intervention);
  }
  var origine     = crfIrpUtils.getLabelFor('OriginesIntervention', intervention.idOrigine);
  var motif       = crfIrpUtils.getLabelFor('MotifsIntervention'  , intervention.idMotif  );
  var dhSaisie    = crfIrpUtils.getFullDate(intervention.dhSaisie);

  dwr.util.setValue('interventionTicket_origine_'         +intervention.idIntervention, origine );
  dwr.util.setValue('interventionTicket_motif_'           +intervention.idIntervention, motif   );
  dwr.util.setValue('interventionTicket_dhReception_'     +intervention.idIntervention, dhSaisie);
  
  dwr.util.setValue('interventionTicket_rue_'             +intervention.idIntervention, intervention.position.rue             );
  dwr.util.setValue('interventionTicket_codePostal_'      +intervention.idIntervention, intervention.position.codePostal      );
  dwr.util.setValue('interventionTicket_ville_'           +intervention.idIntervention, intervention.position.ville           );
  dwr.util.setValue('interventionTicket_googleCoordsLat_' +intervention.idIntervention, intervention.position.googleCoordsLat );
  dwr.util.setValue('interventionTicket_googleCoordsLong_'+intervention.idIntervention, intervention.position.googleCoordsLong);
  
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
  
  
  var category = 'lieu_cat_'+8;
  var title    = 'N°'+intervention.idIntervention+' - '+dhSaisie+' - '+origine+' - '+motif;
  var html     = title + '<br/>'+
                 intervention.rue+', '+intervention.codePostal+", "+intervention.ville;

  Ext.getCmp('center-carte-paris-panel').addMarker( intervention.position.googleCoordsLat, 
                                                    intervention.position.googleCoordsLong, 
                                                    null, 
                                                    category, 
                                                    false, 
                                                    title, 
                                                    html,
                                                    intervention.idIntervention);
};

MonitorOutputInterventionCs.prototype.showInterventionOnGlobalMap=function(idIntervention)
{
  var map = Ext.getCmp('center-carte-paris-panel');
  
  var latitude  = Ext.get('interventionTicket_googleCoordsLat_' +idIntervention).getValue();
  var longitude = Ext.get('interventionTicket_googleCoordsLong_'+idIntervention).getValue();
  //TODO : remplacer par focusMarker
  map.goTo(latitude, longitude);
};

MonitorOutputInterventionCs.prototype.addInterventionPanel=function(intervention)
{
  var origine   = crfIrpUtils.getLabelFor('OriginesIntervention', intervention.idOrigine);
  var motif     = crfIrpUtils.getLabelFor('MotifsIntervention'  , intervention.idMotif  );
  var shortDate = crfIrpUtils.getTime    (intervention.dhSaisie);
  var fullDate  = crfIrpUtils.getFullDate(intervention.dhSaisie);
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
  var westPanel = Ext.getCmp('monitorOutputWestRegion');
  var tab = new Ext.Panel({ id: this.getPanelId(intervention.idIntervention)
                , layout      : 'fit'
                , title       : '<span title="id:'+intervention.idIntervention+' - Date:'+fullDate+'">'+shortDate +'</span> - '+ origine +' - '+ motif
                , closable    : false
                , autoScroll  : true
                , border      : false
                , html        : this.interventionTemplates[intervention.idOrigine].evaluate({id:intervention.idIntervention, idRegulation:intervention.idRegulation})
                , listeners   : {
                    render : this.initializeInterventionDragZone
                  }
                , itemSelector: 'table.intervention'//désigne ce qui est draggable
                });
  tab.data = intervention;
  
  westPanel.add     (tab);
  westPanel.doLayout();
};

MonitorOutputInterventionCs.prototype.initializeInterventionDragZone=function(panelComponent)
{
    panelComponent.dragZone = new Ext.dd.DragZone(panelComponent.getEl(), {

//      On receipt of a mousedown event, see if it is within a draggable element.
//      Return a drag data object if so. The data object can contain arbitrary application
//      data, but it should also contain a DOM element in the ddel property to provide
//      a proxy to drag.
        getDragData: function(e) {
            var sourceEl = e.getTarget(panelComponent.itemSelector, 10);
            if (sourceEl) {
                d = sourceEl.cloneNode(true);
                d.id = Ext.id();
                return panelComponent.dragData = {
                    sourceEl         : sourceEl,
                    repairXY         : Ext.fly(sourceEl).getXY(),
                    ddel             : d,
                    interventionData : panelComponent.data,
                    currentDispositif: {idDispositif:0}
                }
            }
        },

//      Provide coordinates for the proxy to slide back to on failed drag.
//      This is the original XY coordinates of the draggable element.
        getRepairXY: function() {
            return this.dragData.repairXY;
        }
    });
};

/**
 * Drag & Drop handling
 **/
MonitorOutputInterventionCs.prototype.initializeInterventionDropZone=function(monitorOutputWestRegionPanel)
{
  
      monitorOutputWestRegionPanel.dropZone = new Ext.dd.DropZone(monitorOutputWestRegionPanel.getEl(), {

//      If the mouse is over a target node, return that node. This is
//      provided as the "target" parameter in all "onNodeXXXX" node event handling functions
        getTargetFromEvent: function(e) {
            return e.getTarget('#monitorOutputWestRegion');
        },

//      On entry into a target node, highlight that node.
        onNodeEnter : function(target, dd, e, data){ 
            Ext.fly(target).addClass('interventionDesaffectationDropZone-hover');
        },

//      On exit from a target node, unhighlight that node.
        onNodeOut : function(target, dd, e, data){ 
            Ext.fly(target).removeClass('interventionDesaffectationDropZone-hover');
        },

//      While over a target node, return the default drop allowed class which
//      places a "tick" icon into the drag proxy.
        onNodeOver : function(target, dd, e, data){ 
            return Ext.dd.DropZone.prototype.dropAllowed;
        },

//      On node drop, we can interrogate the target node to find the underlying
//      application object that is the real target of the dragged data.
//      In this case, it is a Record in the GridPanel's Store.
//      We can use the data set up by the DragZone's getDragData method to read
//      any data we decided to attach.
        onNodeDrop : function(target, dd, e, draggableItemData){
         
          if(draggableItemData.currentDispositif.idDispositif > 0)
          {//L'inter était affecté, il faut la désaffecter
            MonitorOutputIntervention.unAffectIntervention(draggableItemData.interventionData.idIntervention, draggableItemData.currentDispositif.idDispositif, function(){});
          }
          //moDispositifCs.setInterventionToDispositif(draggableItemData, target, dispositifData );
       
          return true;
        }
    });
};


MonitorOutputInterventionCs.prototype.getPanelId=function(idIntervention)
{
  return 'interventionTicket_'+idIntervention;
};

/*Appelé en reverse Ajax après la désaffectation*/
MonitorOutputInterventionCs.prototype.afterUnAffectInterUpdate=function(intervention, dispositif)
{
  this.updateInterventionToAffect(intervention);
  moDispositifCs.updateDispositif(dispositif);
};

MonitorOutputInterventionCs.prototype.interventionTemplates = Array();
MonitorOutputInterventionCs.prototype.interventionTemplates[1] = new Template(['<input type="hidden" id="interventionTicket_regulation_id_#{id}"    name="interventionTicket_regulation_id_#{id}" value="#{idRegulation}"/>',
'<input type="hidden" id="interventionTicket_googleCoordsLat_#{id}"  name="interventionTicket_googleCoordsLat_#{id}"/>',
'<input type="hidden" id="interventionTicket_googleCoordsLong_#{id}" name="interventionTicket_googleCoordsLong_#{id}"/>',
'<table id="interventionTicket_#{id}" class="intervention intervention_samu">',
'  <tr>',
'    <th>Date</th>',
'    <td id="interventionTicket_dhReception_#{id}"></td>',
'  </tr>',
'  <tr>',
'    <th>Origine</th>',
'    <td id="interventionTicket_origine_#{id}"></td>',
'  </tr>',
'  <tr>',
'    <th>Motif</th>',
'    <td id="interventionTicket_motif_#{id}"></td>',
'  </tr>',
'  <tr>',
'    <th>Rue</th>',
'    <td id="interventionTicket_rue_#{id}"></td>',
'  </tr>',
'  <tr>',
'    <th>Code Postal</th>',
'    <td id="interventionTicket_codePostal_#{id}"></td>',
'  </tr>',
'  <tr>',
'    <th>Ville</th>',
'    <td id="interventionTicket_ville_#{id}"></td>',
'  </tr>',
'  <tr>',
'    <td colspan="2">',
'<img src="',contextPath,'/img/famfamfam/map_magnify.png" id="interventionTicket_googleMap_#{id}" onClick="moInterventionCs.showInterventionOnGlobalMap(#{id})"/>',
'<img src="',contextPath,'/img/famfamfam/information.png" id="interventionTicket_details_#{id}"/>',
'<img src="',contextPath,'/img/famfamfam/comment.png"     id="interventionTicket_contact_#{id}"/>',
'    </td>',
'  </tr>',
'</table>'].join(''));

MonitorOutputInterventionCs.prototype.interventionTemplates[0] = MonitorOutputInterventionCs.prototype.interventionTemplates[1] ;
MonitorOutputInterventionCs.prototype.interventionTemplates[2] = MonitorOutputInterventionCs.prototype.interventionTemplates[1] ;
MonitorOutputInterventionCs.prototype.interventionTemplates[3] = MonitorOutputInterventionCs.prototype.interventionTemplates[1] ;
MonitorOutputInterventionCs.prototype.interventionTemplates[4] = MonitorOutputInterventionCs.prototype.interventionTemplates[1] ;
MonitorOutputInterventionCs.prototype.interventionTemplates[5] = MonitorOutputInterventionCs.prototype.interventionTemplates[1] ;
MonitorOutputInterventionCs.prototype.interventionTemplates[6] = MonitorOutputInterventionCs.prototype.interventionTemplates[1] ;
