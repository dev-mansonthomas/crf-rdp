var STATUS_INDISPO                    = 0; //indispo
var STATUS_DISPO                      = 1 ; //dispo
var STATUS_INTERVENTION_AFFECTEE      = 2 ; //intervention affecté
var STATUS_PARTI                      = 3 ; //Parti
var STATUS_SUR_PLACE                  = 4 ; //Sur place
var STATUS_PRIMAIRE                   = 5 ; //Primaire
var STATUS_SECONDAIRE                 = 6 ; //Secondaire
var STATUS_TRANSPORT                  = 7 ; //transport
var STATUS_ARRIVE_HOSPITAL            = 8 ; //Arrivé hopital
var STATUS_INTER_TERMINEE             = 9 ; //Intervention Terminée
var STATUS_VACATION_TERMINEE          = 10; //Vacation Terminée

//depuis la mise a jour Ext 3.4, l'onglet des bilans ne s'ouvre pas directement, il faut cliquer deux fois sur le bouton ==> Fix crade, on le fait à la place de l'utilisateur deux fois
var firstTimeBilanEditorIsOpen=true;

var DispositifRecord = Ext.data.Record.create(
                         {name: 'idDispositif'                                  , mapping: 'idDispositif'                                  },
                         {name: 'idTypeDispositif'                              , mapping: 'idTypeDispositif'                              },
                         {name: 'idEtatDispositif'                              , mapping: 'idEtatDispositif'                              },
                         {name: 'idDelegation'                                  , mapping: 'idDelegation'                                  },
                         {name: 'displayState'                                  , mapping: 'displayState'                                  },
                         {name: 'dispositifBackWith3Girls'                      , mapping: 'dispositifBackWith3Girls'                      },
                         {name: 'dispositifNotEnoughO2'                         , mapping: 'dispositifNotEnoughO2'                         },
                         {name: 'indicatifVehicule'                             , mapping: 'indicatifVehicule'                             },
                         {name: 'contactRadio'                                  , mapping: 'contactRadio'                                  },
                         {name: 'contactTel1'                                   , mapping: 'contactTel1'                                   },
                         {name: 'contactTel2'                                   , mapping: 'contactTel2'                                   },

                         {name: 'dhReception'                                   , mapping: 'dhReception'                                   },
                         {name: 'dhDepart'                                      , mapping: 'dhDepart'                                      },
                         {name: 'dhSurPlace'                                    , mapping: 'dhSurPlace'                                    },
                         {name: 'dhBilanPrimaire'                               , mapping: 'dhBilanPrimaire'                               },
                         {name: 'dhBilanSecondaire'                             , mapping: 'dhBilanSecondaire'                             },
                         {name: 'dhQuitteLesLieux'                              , mapping: 'dhQuitteLesLieux'                              },
                         {name: 'dhArriveeHopital'                              , mapping: 'dhArriveeHopital'                              },
                         {name: 'dhDispo'                                       , mapping: 'dhDispo'                                       },
                         {name: 'dhASaBase'                                     , mapping: 'dhASaBase'                                     },
                         {name: 'dhAppelRenfortMedical'                         , mapping: 'dhAppelRenfortMedical'                         },
                         {name: 'dhArriveeRenfortMedical'                       , mapping: 'dhArriveeRenfortMedical'                       }
                       );


var MonitorOutputDispositifCs = Class.create();

MonitorOutputDispositifCs.prototype.boutonActionLabel=[];//next state             current state         
MonitorOutputDispositifCs.prototype.boutonActionLabel[0 ]="Disponible"        ; //Indisponible
MonitorOutputDispositifCs.prototype.boutonActionLabel[1 ]="Changer de statut" ; //dispo
MonitorOutputDispositifCs.prototype.boutonActionLabel[2 ]="Départ"            ; //intervention affecté
MonitorOutputDispositifCs.prototype.boutonActionLabel[3 ]="Arrivé sur place"  ; //Parti
MonitorOutputDispositifCs.prototype.boutonActionLabel[4 ]="Primaire"          ; //Sur place
MonitorOutputDispositifCs.prototype.boutonActionLabel[5 ]="Secondaire"        ; //Primaire
MonitorOutputDispositifCs.prototype.boutonActionLabel[6 ]="Transport H."      ; //Secondaire
MonitorOutputDispositifCs.prototype.boutonActionLabel[7 ]="Arrivé H."         ; //transport
MonitorOutputDispositifCs.prototype.boutonActionLabel[8 ]="Inter. Terminée"   ; //Arrivé hopital

MonitorOutputDispositifCs.prototype.dispositifRowCss=[];
MonitorOutputDispositifCs.prototype.dispositifRowCss[1]='alphaRow';
MonitorOutputDispositifCs.prototype.dispositifRowCss[2]='bsppRow';
MonitorOutputDispositifCs.prototype.dispositifRowCss[3]='paRow';
MonitorOutputDispositifCs.prototype.dispositifRowCss[4]='psRow';


/**
 * Initialisation des composants lié aux dispositifs
 * */
MonitorOutputDispositifCs.prototype.initialize=function()
{
  MonitorOutputDispositif.initScriptSession();
  
  this.listLoaded     = false;
  this.listLieuLoaded = false;

  
  PageBus.subscribe("list.loaded"         ,  this, this.initDispositifGrid		  , null, null);
  PageBus.subscribe("listLieu.loaded"     ,  this, this.initLieuOnMap			      , null, null);
  PageBus.subscribe("listLieu.loaded"     ,  this, this.initDispositifGrid    	, null, null);
  PageBus.subscribe("listLieu.loaded"     ,  this, this.initChooseHospitalList	, null, null);
  
  this.initCloneInterventionWindow();
};

/**
 * initialise la grid contenant les dispositifs.
 * 
 * */
MonitorOutputDispositifCs.prototype.initDispositifGrid=function(eventName, data)
{
  if(eventName == "list.loaded")
    this.listLoaded     = true;
  if(eventName == "listLieu.loaded")
    this.listLieuLoaded = true;
  
  if(!(this.listLoaded == true &&  this.listLieuLoaded == true))//on attends que les 2 listes soient initialisées
   return;
  
  var xg = Ext.grid;

  var dispositifDataStore = new Ext.data.Store({
               proxy: new Ext.ux.rs.data.DwrProxy({
                  call      : MonitorOutputDispositif.getAllDispositif,
                  args      : [],
                proxyConfig : Ext.ux.rs.data.NO_PAGING
               }),
          remoteSort: false,
              reader: new Ext.ux.rs.data.JsonReader({
                root: 'data',
       totalProperty: 'totalCount',
              fields:
                   [
{name:'idDispositif'                                    , type: 'int'    },
{name:'idTypeDispositif'                                , type: 'int'    },
{name:'idEtatDispositif'                                , type: 'int'    },
{name:'idDelegation'                                    , type: 'int'    },
{name:'displayState'                                    , type: 'int'    },
{name:'dispositifBackWith3Girls'                        , type: 'boolean'},
{name:'dispositifNotEnoughO2'                           , type: 'boolean'},
{name:'indicatifVehicule'                               , type: 'string' },
{name:'contactRadio'                                    , type: 'string' },
{name:'contactTel1'                                     , type: 'string' },
{name:'contactTel2'                                     , type: 'string' },

{name:'dhReception'                                     , type: 'date'    },
{name:'dhDepart'                                        , type: 'date'    },
{name:'dhSurPlace'                                      , type: 'date'    },
{name:'dhBilanPrimaire'                                 , type: 'date'    },
{name:'dhBilanSecondaire'                               , type: 'date'    },
{name:'dhQuitteLesLieux'                                , type: 'date'    },
{name:'dhArriveeHopital'                                , type: 'date'    },
{name:'dhDispo'                                         , type: 'date'    },
{name:'dhASaBase'                                       , type: 'date'    },
{name:'dhAppelRenfortMedical'                           , type: 'date'    },
{name:'dhArriveeRenfortMedical'                         , type: 'date'    }
                   ]
               })
           });

  var dispositifGrid = new xg.GridPanel({
        id   : 'DispositifListGrid',
        store: dispositifDataStore,
        cm   : new xg.ColumnModel([
            {id:'indicatifVehiculeDCol'     , header: "Indicatif"       , width: 150, sortable: true, dataIndex: 'indicatifVehicule'},
            {id:'idTypeDispositifDCol'      , header: "Type"            , width: 150, sortable: true, dataIndex: 'idTypeDispositif'  , renderer:moDispositifCs.typeCellRenderer},
            {id:'contactRadioDispositifDCol', header: "Selectif Radio"  , width: 150, sortable: true, dataIndex: 'contactRadio'      },
            {id:'contactTelsDispositifDCol' , header: "Téléphones"      , width: 150, sortable: true, dataIndex: 'contactTel1'       , renderer:moDispositifCs.contactTelsCellRenderer},
            {id:'idEtatDispositifDCol'      , header: "Etat"            , width: 150, sortable: true, dataIndex: 'idEtatDispositif'  , renderer:moDispositifCs.etatDispositifCellRenderer}
        ]),
        viewConfig: {
            forceFit      :true,
            enableRowBody :true,
            getRowClass   :moDispositifCs.buildDispositifRowBody
        },
        collapsible : false,
        animCollapse: false,
        height      : 1800,
        iconCls     : 'icon-grid',
        renderTo    : 'center-dispositif-list',
        listeners: {
            render: this.initializeDispositifDragAndDropZone        
        }
    });
  dispositifGrid.getStore().load();
  
  
};

/**
 * Drag & Drop handling
 **/
MonitorOutputDispositifCs.prototype.initializeDispositifDragAndDropZone=function(dispositifGrid)
{
  try
  {
     dispositifGrid.dragZone = new Ext.dd.DragZone(Ext.get('center-dispositif-list'), {

//      On receipt of a mousedown event, see if it is within a draggable element.
//      Return a drag data object if so. The data object can contain arbitrary application
//      data, but it should also contain a DOM element in the ddel property to provide
//      a proxy to drag.
        getDragData: function(e) {
          
          var sourceEl = e.getTarget('.DispositifInterDetail');
          if (sourceEl) 
          {
            var tempArray = sourceEl.id.split('|');
            var recordId  = tempArray[1];
            var interId   = tempArray[0].split('-')[1];

            var dispositifRecord    = dispositifGrid.getStore().getById(recordId);
            
            
            //trouve la bonne intervention
            var interventions       = dispositifRecord.json.interventions;
            var i                   = 0;
            var count               = interventions.length;
            var currentIntervention = null;
            for(i=0;i<count;i++)
            {
              if(interventions[i].idIntervention == interId)
              {
                currentIntervention = interventions[i];
                break;
              }
               
            }
            
            d = sourceEl.cloneNode(true);
            d.id = Ext.id();
            return dispositifGrid.dragData = {
                sourceEl         : sourceEl,
                repairXY         : Ext.fly(sourceEl).getXY(),
                ddel             : d,
                interventionData : currentIntervention,
                currentDispositif: dispositifRecord
            }
          }
        },

//      Provide coordinates for the proxy to slide back to on failed drag.
//      This is the original XY coordinates of the draggable element.
        getRepairXY: function() {
            return this.dragData.repairXY;
        }
    });
  }
  catch(e)
  {
    console.log(e);
  }
  
  dispositifGrid.dropZone = new Ext.dd.DropZone(dispositifGrid.getView().scroller, {

//      If the mouse is over a target node, return that node. This is
//      provided as the "target" parameter in all "onNodeXXXX" node event handling functions
        getTargetFromEvent: function(e) {
            return e.getTarget('.interventionDropZone');
        },

//      On entry into a target node, highlight that node.
        onNodeEnter : function(target, dd, e, data){ 
            Ext.fly(target).addClass('interventionDropZone-hover');
        },

//      On exit from a target node, unhighlight that node.
        onNodeOut : function(target, dd, e, data){ 
            Ext.fly(target).removeClass('interventionDropZone-hover');
        },

//      While over a target node, return the default drop allowed class which
//      places a "tick" icon into the drag proxy.
        onNodeOver : function(target, dd, e, data){ 
          //TODO si plus de 5 victime dans le camion , interdire le drop
            return Ext.dd.DropZone.prototype.dropAllowed;
            //Ext.dd.DropZone.prototype.dropNotAllowed
        },

//      On node drop, we can interrogate the target node to find the underlying
//      application object that is the real target of the dragged data.
//      In this case, it is a Record in the GridPanel's Store.
//      We can use the data set up by the DragZone's getDragData method to read
//      any data we decided to attach.
        onNodeDrop : function(target, dd, e, draggableItemData){
          var rowIndex         = dispositifGrid.getView ().findRowIndex(target  );
          var dispositifRecord = dispositifGrid.getStore().getAt       (rowIndex);

          moDispositifCs.addInterventionToDispositif(draggableItemData, target, dispositifRecord );
       
          return true;
        }
    });
};

MonitorOutputDispositifCs.prototype.addInterventionToDispositif=function(draggableElement, dropZoneTarget, dispositifRecord)
{
  var intervention     = draggableElement.interventionData;
  var dispositif       = dispositifRecord.data;
  
  if(draggableElement.currentDispositif.data.idDispositif == dispositif.idDispositif)
    return;//drag une inter depuis un dispositif et on relache sur le dispositif d'origine (on change rien => on ne fait rien)
    
  if(draggableElement.currentDispositif.data.idDispositif != 0 && draggableElement.currentDispositif.data.idDispositif != dispositif.idDispositif)
  {//Si l'inter est passé d'un dispositif a l'autre (ie : dispositif courrant différent de 0 et différent du dispositif sur lequel on drop
    var title = 'Réaffectation de l\'intervention N°'+intervention.idIntervention+' de '+draggableElement.currentDispositif.data.indicatifVehicule+' à '+dispositif.indicatifVehicule;
    var msg   = 'Etes vous sur de vouloir réaffecter l\'intervention N°'+
                  intervention.idIntervention+' - '+
                  intervention.nomVictime+' - '+
                  crfIrpUtils.getLabelFor('OriginesIntervention', intervention.idOrigine)+' <br/> de <b>'+
                  draggableElement.currentDispositif.data.indicatifVehicule+'</b> à <b>'
                  +dispositif.indicatifVehicule+'</B>?';
  
                  
    if(draggableElement.currentDispositif.data.idTypeDispositif != dispositif.idTypeDispositif)
    {
      msg += '<br/><br/><span style="color:red;font-weight:bold;">ATTENTION : </span> le dispositif cible ( '+
                dispositif.indicatifVehicule+' - <b>'+
                crfIrpUtils.getLabelFor('TypesDispositif', dispositif.idTypeDispositif)+
                '</b> ) et le dispositif d\'origine ( '+
                draggableElement.currentDispositif.data.indicatifVehicule+' - <b>'+
                crfIrpUtils.getLabelFor('TypesDispositif', draggableElement.currentDispositif.data.idTypeDispositif)+
                '</b> ) ne sont pas du même type.';
    }
    
    Ext.Msg.confirm(title, msg, function(btn){
      if(btn == 'yes')
      {
        moDispositifCs.doReAffecationInterventionToDispositif(draggableElement, dropZoneTarget, dispositifRecord);
      }
    });
  }
  else
  {
    this.doAddInterventionToDispositif(draggableElement, dropZoneTarget, dispositifRecord);
  }
};

MonitorOutputDispositifCs.prototype.doAddInterventionToDispositif=function(draggableElement, dropZoneTarget, dispositifRecord)
{
  var intervention     = draggableElement.interventionData;
  var dispositif       = dispositifRecord.data;

  MonitorOutputDispositif.addInterventionToDispositif(  intervention.idIntervention     , 
                                                        dispositif  .idDispositif, 
                                                        MonitorOutputDispositifCs.prototype.addInterventionToDispositifReturn);
};

MonitorOutputDispositifCs.prototype.addInterventionToDispositifReturn=function(serverData)
{
  //Rien a faire, dispositif et liste des interventions sont mise a jour en reverse ajax (pour que tout les régulateurs voient la modif)
};


MonitorOutputDispositifCs.prototype.doReAffecationInterventionToDispositif=function(draggableElement, dropZoneTarget, dispositifRecord)
{
  var intervention     = draggableElement.interventionData;
  var dispositif       = dispositifRecord.data;

  MonitorOutputDispositif.reAffectInterventionToDispositif(   intervention    .idIntervention     ,
                                                              draggableElement.currentDispositif.data.idDispositif,
                                                              dispositif      .idDispositif  , 
                                                              MonitorOutputDispositifCs.prototype.reAffectInterventionToDispositifReturn);
};
MonitorOutputDispositifCs.prototype.reAffectInterventionToDispositifReturn=function(serverData)
{
  //Rien a faire, dispositif et liste des interventions sont mise a jour en reverse ajax (pour que tout les régulateurs voient la modif)
};


MonitorOutputDispositifCs.prototype.updateDispositifAfterReaffectation=function(dispositifOrigine, dispositifCible)
{
  this.updateDispositif(dispositifOrigine);
  this.updateDispositif(dispositifCible  );
};

/**
 * END - Drag & Drop handling
 **/


/**
 * initalise la fenetre permettant de voir les lieux par catégorie
 * */
MonitorOutputDispositifCs.prototype.initListLieuWindow=function()
{
  var win = new Ext.Window({
      id          : 'list-lieu-windowCmp',
      applyTo     : 'list-lieu-window',
      layout      : 'fit'             ,
      width       : 300               ,
      height      : 500               ,
      x           : 0                 ,
      y           : 35                ,
      closeAction : 'hide'            ,
      plain       : true              ,
      items       : new Ext.TabPanel({
          id             : 'list-lieu-window-tabsCmp' ,
          applyTo        : 'list-lieu-window-tabs'    ,
          activeTab      : 0                          ,
          enableTabScroll: true                       ,
          defaults       : {autoScroll:true}          ,
          deferredRender : false                      ,
          border         : false
      })
    });
          
  MonitorOutputDispositifCs.prototype.listLieuWindow = win;
};
/**
 * initialise la fenetre permettant de choisir un hopital pour destination
 * */
MonitorOutputDispositifCs.prototype.initChooseHopitalWindow=function()
{
  var chooseHopitalWindow = new Ext.Window({
      id          : 'choose-hopital-windowCmp',
      applyTo     : 'choose-hopital-window',
      layout      : 'fit'             ,
      width       : 500               ,
      height      : 500               ,
      x           : 0                 ,
      y           : 35                ,
      closeAction : 'hide'            ,
      plain       : true              ,
      items       : new Ext.TabPanel({
        id             : 'choose-hopital-window-contentCmp' ,
        applyTo        : 'choose-hopital-window-content'    ,
        autoTabs       : true,
        activeTab      : 0                          ,
        enableTabScroll: true                       ,
        defaults       : {autoScroll:true}          ,
        deferredRender : false                      ,
        border         : false
      })
    });
          
  MonitorOutputDispositifCs.prototype.chooseHopitalWindow = chooseHopitalWindow;
  
  
  
  var confirmLaisseSurPlaceWindow = new Ext.Window({
    id          : 'confirm-laisse-sur-place-windowCmp',
    applyTo     : 'confirm-laisse-sur-place-window',
    contentEl   : 'confirm-laisse-sur-place-window-content',
    layout      : 'fit'             ,
    width       : 500               ,
    height      : 200               ,
    closeAction : 'hide'            ,
    plain       : true              ,
    buttons     : [{
      text: 'Annuler',
      handler: function(button, event){
          Ext.getCmp('confirm-laisse-sur-place-windowCmp').hide();
      }
    },
    {
      text: 'Valider',
      handler: function(button, event){
        moDispositifCs.laisseSurPlaceAction();
      }
    }]
  });
        
  MonitorOutputDispositifCs.prototype.confirmLaisseSurPlaceWindow = confirmLaisseSurPlaceWindow;
};

/**
 * initialise la fenetre permettant de cloner une intervention
 * */
MonitorOutputDispositifCs.prototype.initCloneInterventionWindow=function()
{
  var win = new Ext.Window({
      id          : 'clone-intevention-windowCmp',
      applyTo     : 'clone-intevention-window',
      contentEl   : 'clone-intevention-window-content',
      layout      : 'fit'             ,
      width       : 800               ,
      height      : 170               ,
      closeAction : 'hide'            ,
      plain       : true              ,
      buttons: [{
                    text: 'Fermer la fenêtre',
                    handler: function(){
                        Ext.getCmp('clone-intevention-windowCmp').hide();
                    }
                },{
                    text: 'Dupliquer l\'intervention',
                    handler: function(){
                        moDispositifCs.doCloneIntervention();
                    }
                }]
    });
          
  MonitorOutputDispositifCs.prototype.cloneInterventionWindow = win;
};

MonitorOutputDispositifCs.prototype.initChooseHospitalList=function()
{
	this.initChooseHopitalWindow();
  
  var allLieu           = CrfIrpUtils.prototype.allLieu;
  var typeLieu          = crfIrpUtils.getTypeLieu(1);
  var chooseHopitalHtml = [];
  if(allLieu === null || allLieu[1]===null)
  {
    alert('Hopitaux non trouvé');
    return;
  }
  var hospitalList = allLieu[1];
  
  for(var i=0,counti=hospitalList.length;i<counti;i++)
  {
	  var lieu = hospitalList[i];
    //idLieu, label, rue, codePostal, ville, googleCoordsLat,googleCoordsLong
    var htmlListLieu = ['<div class="ListLieuItem" onclick="moDispositifCs.chooseEvacDestination(',lieu.idLieu,', \'',lieu.nom, '\', \'',lieu.addresse,'\', \'',lieu.codePostal,'\', \'',lieu.ville,'\', ',lieu.googleCoordsLat,', ',lieu.googleCoordsLong,');">',
    '<span class="ListLieuListName"><img height="16" src="',contextPath,'/img/',typeLieu.iconLieu,'" alt="Icone"/>',lieu.nom,'</span><br/>',
    '<span class="ListLieuListAddress">',lieu.addresse,', ',lieu.codePostal,', ',lieu.ville,'</span><br/>',
    '<p class="ListLieuListHtml">',lieu.infoComplementaire,'</p>',
    '</div>'].join('');
    chooseHopitalHtml.push(htmlListLieu);
  }
  Ext.get('choose-hopital-window-content-list').update(chooseHopitalHtml.join(''));
};
/**
 * Affiche la liste des catégories sous la map
 * Remplie la fenetre qui permet d'afficher les lieux par catégorie
 * **/
MonitorOutputDispositifCs.prototype.initLieuOnMap=function()
{
  this.initListLieuWindow     ();
 
  var allLieu      = CrfIrpUtils.prototype.allLieu;
  var map          = Ext.getCmp('center-carte-paris-panel');
  var i            = 1;
  var listLieuTabs = Ext.getCmp('list-lieu-window-tabsCmp');
  
  do
  {//Boucle sur les catégories
    var catLieu       = allLieu[i];
    var typeLieu      = crfIrpUtils.getTypeLieu(i);
    var catLieuName   = typeLieu.labelTypeLieu;
    var listLieuTabId = 'list-lieu-window-tabs_'+i;
    var category      = 'lieu_cat_'+typeLieu.idTypeLieu;    
    
    map.setIconForCategory(category, typeLieu.iconGmapInit);
    if(typeLieu.idTypeLieu == 9)//ambulance
    {
      map.setIconForCategory(category+'_from', typeLieu.iconGmapInit.replace(new RegExp('ambulance.png', 'g'), 'ambulance-from.png'));
      map.setIconForCategory(category+'_to'  , typeLieu.iconGmapInit.replace(new RegExp('ambulance.png', 'g'), 'ambulance-to.png'));
    }

    var tabHtml           = [];
    var listLieuTabList   = Ext.get(listLieuTabId+'_list');
        
    for(var j=0, countj = catLieu.size();j<countj;j++)
    {
      var lieu     = catLieu[j];
      var title    = catLieuName+' - '+lieu.nom;
    
      var markerHtml = '<b>'+title+'</b><br/><br/>'+
                        lieu.addresse+',<br/>'+
                        lieu.codePostal+', '+
                        lieu.ville+'<br/>';
      
      if(lieu.infoComplementaire != null)
        markerHtml +='<div style="overflow:auto;">'+lieu.infoComplementaire+'</div>'
      
      map.addMarker(lieu.googleCoordsLat    , 
                    lieu.googleCoordsLong   , 
                    lieu.iconLieuSpecifique , 
                    category                , 
                    false                   , 
                    title                   ,
                    markerHtml              ,
                    lieu.idLieu             );
                    
      var htmlListLieu = ['<div class="ListLieuItem" onclick="moDispositifCs.displayLieu(',lieu.idTypeLieu,', ',lieu.idLieu,');">',
        '<span class="ListLieuListName"><img height="16" src="',contextPath,'/img/',typeLieu.iconLieu,'" alt="Icone"/>',lieu.nom,'</span><br/>',
        '<span class="ListLieuListAddress">',lieu.addresse,', ',lieu.codePostal,', ',lieu.ville,'</span><br/>',
        '<p class="ListLieuListHtml">',lieu.infoComplementaire,'</p>',
      '</div>'].join('');

      tabHtml.push(htmlListLieu);
    }

    listLieuTabs.add({
        id      : listLieuTabId         ,
        title   : catLieuName           ,
        iconCls : typeLieu.iconClassLieu,
        html    : tabHtml.join('')      ,
        closable: false
      });
    
    i++;
    
  }while(allLieu[i]!=null);
  
  var allTypeLieu   = CrfIrpUtils.prototype.allTypeLieuOrdered;
  var htmlGenerated = ['<table id="south-lieu-selector">'];
  for(var i=0, counti=allTypeLieu.size();i<counti;i++)
  {//Générer un tableau avec un case ou on click pour afficher, avec le background qui change de couleur quand c'est affiché ou caché.
   //+ dans une autre cellule du tableau, une icon pour lister les lieu de cette catégorie. Lorsqu'on clic sur un lieu, ca affiche, centre et affiche le détail
    var typeLieu     = allTypeLieu[i];
    var fragmentHtml = [];
    var shouldHide   = true;
    
    if(typeLieu.idTypeLieu==8 || typeLieu.idTypeLieu==9)
      shouldHide = false;
      
    if(i%3==0)
      fragmentHtml.push('<tr>');
    
    fragmentHtml.push('<td id="south-lieu-selector-cell-cat-');
    fragmentHtml.push(typeLieu.idTypeLieu);
    fragmentHtml.push('" class="type-lieu-')
    
    if(shouldHide==true)
      fragmentHtml.push('un');
      
    fragmentHtml.push('selected" onClick="moDispositifCs.toggleCategory(this.id, ');
    fragmentHtml.push(typeLieu.idTypeLieu);
    fragmentHtml.push(');"><img height="16" src="');
    fragmentHtml.push(contextPath);
    fragmentHtml.push('/img/');
    fragmentHtml.push(typeLieu.iconLieu);
    fragmentHtml.push('" alt="Icone"/>');
    fragmentHtml.push(typeLieu.labelTypeLieu);
    fragmentHtml.push('</td><td><img src="');
    fragmentHtml.push(contextPath);
    fragmentHtml.push('/img/famfamfam/text_list_bullets.png" alt="Lister les lieux de cette catégorie" onClick="moDispositifCs.listLieuFromCategory(');
    fragmentHtml.push(typeLieu.idTypeLieu);
    fragmentHtml.push(');"/></td>');
    
      
    if(i+1%3==0)
      fragmentHtml.push('</tr>');
    
    htmlGenerated.push(fragmentHtml.join(''));
    var cat = 'lieu_cat_'+typeLieu.idTypeLieu;
    
    if(shouldHide==true)
      map.hideACategoryOfMarker(cat);
  }
  htmlGenerated.push('</table>');
  
  Ext.get('south-lieu-selector-div').update(htmlGenerated.join(''));
};

/**
 * Affiche ou cache les marker/direction d'une catégorie
 * */
MonitorOutputDispositifCs.prototype.toggleCategory=function(htmlId, idCategory)
{
  var cat = 'lieu_cat_'+idCategory;
  var td  = Ext.get(htmlId);
  var map = Ext.getCmp('center-carte-paris-panel');
  
  if(td.hasClass('type-lieu-unselected'))
  {
    td.toggleClass('type-lieu-unselected');//remove
    td.toggleClass('type-lieu-selected');//add
    map.showACategoryOfMarker(cat);
    if(cat == 'lieu_cat_9')//ambulance
      map.showDirectionCategory(cat);
  }
  else
  {
    td.toggleClass('type-lieu-selected');//remove
    td.toggleClass('type-lieu-unselected');//add
    map.hideACategoryOfMarker(cat);
    if(cat == 'lieu_cat_9')//ambulance
      map.hideDirectionCategory(cat);

  }
  
};

MonitorOutputDispositifCs.prototype.toggleStreetView=function()
{
  var map    = Ext.getCmp('center-carte-paris-panel');
  var button = Ext.get   ('streetViewActivateButton'); 
  
  button.toggleClass('type-lieu-'+(map.streetView.displayed?''  :'un')+'selected');//remove
  button.toggleClass('type-lieu-'+(map.streetView.displayed?'un':''  )+'selected');//add
  
  map.toggleStreetViewOverlay();
};


MonitorOutputDispositifCs.prototype.toggleTraffic=function()
{
  var map    = Ext.getCmp('center-carte-paris-panel');
  var button = Ext.get   ('trafficActivateButton'); 
  
  button.toggleClass('type-lieu-'+(map.traffic.displayed?''  :'un')+'selected');//remove
  button.toggleClass('type-lieu-'+(map.traffic.displayed?'un':''  )+'selected');//add
  
  map.toggleTrafficOverlay();
};


/**
 * Affiche les lieux par catégorie
 * */
MonitorOutputDispositifCs.prototype.listLieuFromCategory=function(idCategory)
{
  var cat = 'list-lieu-window-tabs_'+idCategory;
  var win = MonitorOutputDispositifCs.prototype.listLieuWindow;
  
  var tabs = Ext.getCmp('list-lieu-window-tabsCmp');
  tabs.activate(cat);

  win.show();
};
/**
 * Affiche un lieu sur la carte google maps
 * */
MonitorOutputDispositifCs.prototype.displayLieu=function(idTypeLieu, lieuId)
{
  var map      = Ext.getCmp('center-carte-paris-panel');
  var category = 'lieu_cat_'+idTypeLieu;
  map.focusMarker(category, lieuId);
};

/**
 * retourne le label du bouton action en fonction de l'idEtat courant
 * */
MonitorOutputDispositifCs.prototype.getLabelForActionButton=function(idEtatDispositif)
{
  var label = MonitorOutputDispositifCs.prototype.boutonActionLabel[idEtatDispositif];
  
  if(label === null)
    return "Action";
  
  return label;
};

/**
 * Affiche un dispostif sur la carte google map avec son intervention.
 * Dispositif soit sous forme d'un marker ou une direction et 2 markers
 * */
MonitorOutputDispositifCs.prototype.displayDispositifOnMap  =function(dispositif)
{
  if(dispositif.currentPosition.empty==false)
  {
    var map      = Ext.getCmp('center-carte-paris-panel');
    
    var currentInterHtml = '';
    if(dispositif.interventions.length != 0)
    {
      var i = 0, count = dispositif.interventions.length;
      
      for(i=0;i<count;i++)
      {
        var intervention = dispositif.interventions[i];
        var origine   = crfIrpUtils.getLabelFor('OriginesIntervention', intervention.idOrigine);
        var motif     = crfIrpUtils.getLabelFor('MotifsIntervention'  , intervention.idMotif );
  
        currentInterHtml = ['<br/><br/>Intervention en cours : ',crfIrpUtils.formatInterventionBusinessId(intervention.interventionBusinessId),'<sub>(',intervention.idIntervention,')</sub><br/> Origine : ',origine,'<br/>',
               'Motif   : ',motif                                       ,'<br/>',
               'Adresse : ',intervention.position.rue                   ,', '   ,
                            intervention.position.codePostal            ,', '   ,
                            intervention.position.ville                 ,'<br/>',
               'Victime : ',intervention.nomVictime                     ,'<br/>',
               'Contact : ',intervention.nomContactSurPlace             ,'<br/>',
               'Coordonnées : ',intervention.coordonneesContactSurPlace ,'<br/>'].join(''); 
               
        var category = 'lieu_cat_'+8;
        var dhSaisie = crfIrpUtils.getFullDate(intervention.dhSaisie);
        var title    = 'N°'+crfIrpUtils.formatInterventionBusinessId(intervention.interventionBusinessId)+'<sub>('+intervention.idIntervention+')</sub> - '+dhSaisie+' - '+origine+' - '+motif;
        var html     = title +'<br/>'+
                       intervention.position.rue          +', '+
                       intervention.position.codePostal   +", "+
                       intervention.position.ville        ;
                       
        
  
        if(dispositif.idEtatDispositif >= STATUS_TRANSPORT)
        {//Transport et ultérieurs => on retire la victime de google maps
          map.removeMarkerById(category,  intervention.idIntervention);
        }
        else
        {
          //Avant le transport on doit afficher la victime sur la carte.
          map.addMarker(intervention.position.googleCoordsLat , 
                        intervention.position.googleCoordsLong, 
                        null, 
                        category, 
                        false, 
                        title, 
                        html,
                        intervention.idIntervention);
          
        }
        
        
      }       
    }
    else
      currentInterHtml ='<br/><br/>Aucune intervention en cours'; 
    
    var category = 'lieu_cat_'+9;
    
    //TODO : bug a corriger sur l'affectation, l'addresse previous est vide alors qu'elle devrait etre remplie.
    
    //position précédente non vide et différente de la courante
    if( dispositif.previousPosition.empty===false && 
        !(dispositif.currentPosition.googleCoordsLat  ==dispositif.previousPosition.googleCoordsLat  &&
          dispositif.currentPosition.googleCoordsLong ==dispositif.previousPosition.googleCoordsLong ) )
    {
      var title    = 'N°'+dispositif.idDispositif+' - '+dispositif.indicatifVehicule;
      var html     = title +'<br/> {0} ' +currentInterHtml;

    /**
     * directionInfo.fromAddress
     * directionInfo.toAddress
     * directionInfo.category
     * directionInfo.businessId
     * directionInfo.title 
     * directionInfo.html
     * */

      //retire l'ambulance seule pour afficher la route
      map.removeMarkerById(category,  dispositif.idDispositif);
      
      //Trajet a calculer
      map.displayRouteForDispositif({
        fromAddress    : [dispositif.previousPosition.rue,', ', dispositif.previousPosition.codePostal,', ',dispositif.previousPosition.ville].join(''),
        toAddress      : [dispositif.currentPosition.rue ,', ', dispositif.currentPosition.codePostal ,', ',dispositif.currentPosition.ville ].join(''),
        category       : category,
        businessId     : dispositif.idDispositif,
        title          : title,
        html           : html
      });
    }
    else
    {
      //détruit l'eventuel direction affiché sur la carte.
      map.destroyDirection(category, dispositif.idDispositif);
      //Affiche le dispositif      
      var title    = 'N°'+dispositif.idDispositif+' - '+dispositif.indicatifVehicule;
      var html     = title + currentInterHtml;
  
      map.addMarker(dispositif.currentPosition.googleCoordsLat , 
                    dispositif.currentPosition.googleCoordsLong, 
                    null    , 
                    category, 
                    false   , 
                    title   , 
                    html    ,
                    dispositif.idDispositif);
      
    }
  }
};

/**
 * Ouvre le dispositif dans in.jsp
 * */
MonitorOutputDispositifCs.prototype.editDispositif  =function(idDispositif)
{
  this.monitorInputWindow = monitorOutputCs.getMonitorInputRef();
  this.monitorInputWindow.miDispositifCs.editDispositif(idDispositif);
};


/**
 * Ouvre l'intervention (BILAN) dans in.jsp
 * */
MonitorOutputDispositifCs.prototype.editIntervention=function(idIntervention, onglet)
{
  this.monitorInputWindow = monitorOutputCs.getMonitorInputRef();
  if(firstTimeBilanEditorIsOpen)
  {
    this.monitorInputWindow.miBilanCs.editBilan(idIntervention, onglet);
    var monitorInputWindow = this.monitorInputWindow;
    setTimeout(function(){monitorInputWindow.miBilanCs.editBilan(idIntervention, onglet);monitorInputWindow=null;}, 300);
    
    firstTimeBilanEditorIsOpen = false;
  }
  else
  {
    this.monitorInputWindow.miBilanCs.editBilan(idIntervention, onglet);
  }
  
};



/**
 * Clone une intervention (cas de n victime a prendre en charge sur site)
 * */
MonitorOutputDispositifCs.prototype.cloneIntervention=function(idDispositif, idIntervention)
{
  Ext.get('cloneInterventionNomVictime'       ).dom.value  = '';
  Ext.get('cloneInterventionPrenomVictime'    ).dom.value  = '';
  Ext.get('cloneInterventionNomPrenomRadio'   ).dom.value  = '';
  Ext.get('cloneInterventionSexeVictimeFemme' ).dom.checked= false;
  Ext.get('cloneInterventionSexeVictimeHomme' ).dom.checked= false;
  Ext.get('cloneInterventionAgeVictime'       ).dom.value  = '';
  
  MonitorOutputDispositifCs.prototype.cloneInterventionWindow.idDispositif   = idDispositif  ;
  MonitorOutputDispositifCs.prototype.cloneInterventionWindow.idIntervention = idIntervention;
  MonitorOutputDispositifCs.prototype.cloneInterventionWindow.show('DispositifInterDetail_CloneInterButton-'+idDispositif+'-'+idIntervention);
};

MonitorOutputDispositifCs.prototype.doCloneIntervention=function()
{
  if(      Ext.get('cloneInterventionNomVictime'      ).getValue().trim() == '' ||
           Ext.get('cloneInterventionPrenomVictime'   ).getValue().trim() == '' ||
          !Ext.get('cloneInterventionSexeVictimeFemme').dom.checked && !Ext.get('cloneInterventionSexeVictimeHomme').dom.checked ||
           Ext.get('cloneInterventionAgeVictime'      ).getValue().trim() == '' ||
     isNaN(Ext.get('cloneInterventionAgeVictime'      ).getValue().trim()))
  {
    Ext.Msg.alert('Champ manquant', 'Veuillez saisir tous les champs');
    return;
  }
  
 
  MonitorOutputDispositif.cloneIntervention({
    idDispositif          : MonitorOutputDispositifCs.prototype.cloneInterventionWindow.idDispositif,
    idInterventionOrigine : MonitorOutputDispositifCs.prototype.cloneInterventionWindow.idIntervention,
    nom                   : Ext.get('cloneInterventionNomVictime'      ).getValue().trim(),
    prenom                : Ext.get('cloneInterventionPrenomVictime'   ).getValue().trim(),
    hommeVictime          : Ext.get('cloneInterventionSexeVictimeHomme').dom.checked, 
    age                   : Ext.get('cloneInterventionAgeVictime'      ).getValue().trim()
  },
  MonitorOutputDispositifCs.prototype.doCloneInterventionReturn);
};

MonitorOutputDispositifCs.prototype.doCloneInterventionReturn=function()
{
  MonitorOutputDispositifCs.prototype.cloneInterventionWindow.hide();
};

MonitorOutputDispositifCs.prototype.getDispositifRecordFromButtonId=function(buttonId)
{
  var dispositifGrid    = Ext.getCmp('DispositifListGrid');
  var recordId          = buttonId.split('|')[1];
  var dispositifRecord  = dispositifGrid.getStore().getById(recordId);

  return dispositifRecord;
};


MonitorOutputDispositifCs.prototype.sendSMS=function(buttonId)
{
  var dispositifRecord  = MonitorOutputDispositifCs.prototype.getDispositifRecordFromButtonId(buttonId);
  var idDispositif      = dispositifRecord.json.idDispositif;
  var monitorInputWindowRef = MonitorOutputCs.prototype.getMonitorInputRef();
  monitorInputWindowRef.miSMSCs.displaySendSMSForm(idDispositif);
};


/**
 * 
 * Gere le clique sur le bouton Action
 * Le libellé du bouton n'est pas changé par cette méthode, mais lors de la mise a jours du dispositif par reverse Ajax
 * 
 * 
 * 
var STATUS_INDISPO                    = 0; //indispo
var STATUS_DISPO                      = 1 ; //dispo
var STATUS_INTERVENTION_AFFECTEE      = 2 ; //intervention affecté
var STATUS_PARTI                      = 3 ; //Parti
var STATUS_SUR_PLACE                  = 4 ; //Sur place
var STATUS_PRIMAIRE                   = 5 ; //Primaire
var STATUS_SECONDAIRE                 = 6 ; //Secondaire
var STATUS_TRANSPORT                  = 7 ; //transport
var STATUS_ARRIVE_HOSPITAL            = 8 ; //Arrivé hopital
var STATUS_INTER_TERMINEE             = 9 ; //Intervention Terminée
var STATUS_VACATION_TERMINEE          = 10; //Vacation Terminée
 * */
MonitorOutputDispositifCs.prototype.action=function(buttonId)
{
  var dispositifRecord  = MonitorOutputDispositifCs.prototype.getDispositifRecordFromButtonId(buttonId);
  var interventions     = dispositifRecord.json.interventions;
  var interventionsCount= interventions.length;
  var currentState      = dispositifRecord.json.idEtatDispositif;
  var idDispositif      = dispositifRecord.json.idDispositif;

  var sendActionToServerNow = true;
  if     (currentState == STATUS_SUR_PLACE)//Etat : Sur Place, doit afficher le formulaire de primaire
  {
    if(interventionsCount == 1)
      MonitorOutputDispositifCs.prototype.editIntervention(interventions[0].idIntervention);
    else
    {//on va faire saisir les bilans les uns à la suite des autres. Une fois que tout les bilans sont passé, on change le status du dispositif
    
      var inter = this.findInterWithEtat(interventions, STATUS_SUR_PLACE);
      
      if(inter == null)
      {// toutes les inters ont leur primaire de passé, on change le status du dispositif
        throw "JSError - MonitorOutputDispositifCs.prototype.action -, this state should not be possible (bug...)";
      }
      sendActionToServerNow = false;
      MonitorOutputDispositif.primaireOnOneIntervention(idDispositif, inter.idIntervention);
      MonitorOutputDispositifCs.prototype.editIntervention(inter.idIntervention);
    }
  }
  else if(currentState == STATUS_PRIMAIRE)//Etat : Primaire, doit afficher le formulaire de primaire
  {
    if(interventionsCount == 1)
      MonitorOutputDispositifCs.prototype.editIntervention(interventions[0].idIntervention, 'BilanSecouristInitial');
    else
    {
      var inter = this.findInterWithEtat(interventions, STATUS_PRIMAIRE);
      
      if(inter == null)
      {// toutes les inters ont leur secondaire de passé, on change le status du dispositif
        throw "JSError - MonitorOutputDispositifCs.prototype.action - this state should not be possible (bug...)";
      }

      sendActionToServerNow = false;
      MonitorOutputDispositif.secondaireOnOneIntervention (idDispositif, inter.idIntervention);
      MonitorOutputDispositifCs.prototype.editIntervention(inter.idIntervention, 'BilanSecouristInitial');
    }
  }
  else if(currentState == STATUS_SECONDAIRE)//Etat : Secondaire Passé, quand on appuie sur le bouton action, on doit choisir l'hopital destination
  {
    $('choose-hopital-window-current-dispositif'  ).value=idDispositif;
//    $('choose-hopital-window-current-intervention').value=interventions[0].idIntervention;//TODO supprimer cette donnée, inutile toutes les victimes evacué sur le meme hopital
    /* affiche juste la liste des hopitaux
     * Sur la séléciton d'un hopital, on met a jour inter et dispositif avec l'hopital choisi et l'adresse destination, puis on passe l'action
     */
    $('dispositifEvacAddressLabel'          ).value='';
    $('dispositifEvacAddressRue'            ).value='';
    $('dispositifEvacAddressCodePostal'     ).value='';
    $('dispositifEvacAddressVille'          ).value='';
    $('dispositifEvacAddressCoordinateLat'  ).value='';
    $('dispositifEvacAddressCoordinateLong' ).value='';
    $('dispositifEvacGoogleAdressCheckStatus').src  =contextPath+"/img/pix.png";
    MonitorOutputDispositifCs.prototype.chooseHopitalWindow.show(Ext.get('DispositifActionButton_'+idDispositif));//
    sendActionToServerNow = false;
  }
  
  var callMetaData = {
    callback:MonitorOutputDispositifCs.prototype.actionReturn,
    arg :{
      idDispositif    : idDispositif, 
      interventions   : interventions, 
      currentState    : currentState
     }
  };
  
  if(sendActionToServerNow == true)//on n'envoie pas dans les cas suivant:  choix de l'hopital, et si plus d'une intervention lors du primaire et secondaire
  {
    if(currentState != STATUS_ARRIVE_HOSPITAL && interventions.length != 0 || currentState == STATUS_INDISPO)
    {
      MonitorOutputDispositif.actionOnDispositif(idDispositif, callMetaData);
    }
    else if(currentState == STATUS_ARRIVE_HOSPITAL)
    {// etat actuel : arrivée  à l'hopital => prochaine état :inter terminée
      MonitorOutputDispositif.endOfIntervention (idDispositif, callMetaData);
    }
    else if(currentState > STATUS_INTER_TERMINEE)
    {
      if(consoleEnabled)
        console.log("currentState='"+currentState+"' => bizarre");
    }
    else if(interventions.length == 0)
    {
      moDispositifCs.displayChooseEtatWindow(idDispositif, interventions, currentState,'Veuillez choisir un nouvel état pour le dispositif:');
    }
  }
};

MonitorOutputDispositifCs.prototype.displayChooseEtatWindow=function(idDispositif, interventions, currentState, message)
{
    //choix de l'état
  if( MonitorOutputDispositifCs.prototype.chooseEtatWindow == null)
  {
     MonitorOutputDispositifCs.prototype.chooseEtatWindow = new Ext.ux.Monitor.Out.ChangeDispositifStatusWindow();
  }
  
  MonitorOutputDispositifCs.prototype.chooseEtatWindow.showChangeStatus(idDispositif, interventions, currentState, message);
};


MonitorOutputDispositifCs.prototype.actionReturn     =function(data, metaData)
{
  /*
   * l'eval initialise une variable 
   * actionReturnStatus
   * avec
   * actionReturnStatus.status  : etat de l'action 0 : ok, >0 erreur de status d'intervention/dispo <0 erreur inconnue
   * actionReturnStatus.message : message d'erreur
   * */
  try
  {
    eval(data);
  }
  catch(e)
  {
    if(consoleEnabled)
      console.log("erreur lors du parse de la réponse a la méthode action data=¤"+data+"¤",e);
  }

  if(actionReturnStatus != null)//initialisé dans le eval.
  {
    if(actionReturnStatus.status > 0)
    {
      var message = 'Ooopppsss, un problème est survenue. Si vous savez comment reproduire le problème merci de le signaler.<br/><br/>'+actionReturnStatus.message+'<br/><br/>Veuilez choisir l\'état aproprié pour le dispositif et ses interventions:';
      moDispositifCs.displayChooseEtatWindow(metaData.idDispositif, metaData.interventions, metaData.currentState, message);
    }
    else if(actionReturnStatus.status < 0)
    {
      Ext.Msg.alert('Erreur Inconnue =&gt; Merci de signaler l\'incident', "L'erreur suivante est survenue : "+actionReturnStatus.message);
    }
    else
    {//status == 0 => OK
      
    }
  }
  else
  {
    if(consoleEnabled)
      console.log("Status is null : data=¤"+data+"¤");
  }
  
};

MonitorOutputDispositifCs.prototype.findInterWithEtat=function(interventions, idEtat)
{

// recherche de l'inter
  var interventionsCount = interventions.length;
  var i = 0;
  var interFound = null;
  for(i=0;i<interventionsCount;i++)
  {
    
    if(interventions[i].idEtat == idEtat)//on a pas encore passé le bilan sur cette inter
    {
      interFound = interventions[i];
      break;
    }
  }
  return interFound;
};


MonitorOutputDispositifCs.prototype.chooseEvacDestinationButton=function()
{
  var missingField = false;
  
  missingField = missingField || !crfIrpUtils.checkMandatoryField('dispositifEvacAddressLabel'     );
  missingField = missingField || !crfIrpUtils.checkMandatoryField('dispositifEvacAddressRue'       );
  missingField = missingField || !crfIrpUtils.checkMandatoryField('dispositifEvacAddressCodePostal');
  missingField = missingField || !crfIrpUtils.checkMandatoryField('dispositifEvacAddressVille'     );
  if(missingField == true)
    return;
  
  this.chooseEvacDestination(0,
    $('dispositifEvacAddressLabel'          ).value,
    $('dispositifEvacAddressRue'            ).value,
    $('dispositifEvacAddressCodePostal'     ).value,
    $('dispositifEvacAddressVille'          ).value,
    $('dispositifEvacAddressCoordinateLat'  ).value,
    $('dispositifEvacAddressCoordinateLong' ).value
  );
},


/*
 * Lancé lorsqu'on choisi un hopital
 * Met a jour inter, dispositif, appel coté serveur ActionOnDispsoitif (qui met a jours le status et les clients sur la page out.jsp)
 * */
MonitorOutputDispositifCs.prototype.chooseEvacDestination=function(idLieu, label, rue, codePostal, ville, googleCoordsLat,googleCoordsLong)
{
  var position = {  rue             :rue             ,
                    codePostal      :codePostal      ,
                    ville           :ville           ,
                    googleCoordsLat :googleCoordsLat ,
                    googleCoordsLong:googleCoordsLong};
  
  var idDispositif   = $('choose-hopital-window-current-dispositif'  ).value;                    
  
  var callMetaData = {
      callback:MonitorOutputDispositifCs.prototype.actionReturn,
      arg :{idDispositif    : idDispositif}
    };
  MonitorOutputDispositif.chooseEvacDestination(idDispositif, idLieu, label, position, callMetaData);
  MonitorOutputDispositifCs.prototype.chooseHopitalWindow.hide('DispositifActionButton_'+idDispositif);
};



MonitorOutputDispositifCs.prototype.laisseSurPlaceButton=function(victimeDecede)
{
  var title =  "Confirmation du Laissé Sur Place "+(victimeDecede?"(victime décédé)":"(victime non décédé)");
  
  MonitorOutputDispositifCs.prototype.confirmLaisseSurPlaceWindow.setTitle(title);
  
  $('confirm-laisse-sur-place-window-decharche'         ).checked=false;
  $('confirm-laisse-sur-place-window-decedee_a_dispo_de').value  ="";
  $('confirm-laisse-sur-place-window-decedee'           ).value  =victimeDecede;
  
  if(victimeDecede)
  {
    $('confirm-laisse-sur-place-window-content-dcd').style.display = "block";
    $('confirm-laisse-sur-place-window-content-lsp').style.display = "none";  
  }
  else
  {
    $('confirm-laisse-sur-place-window-content-lsp').style.display = "block";
    $('confirm-laisse-sur-place-window-content-dcd').style.display = "none";
  }
  
  MonitorOutputDispositifCs.prototype.confirmLaisseSurPlaceWindow.show(Ext.get('dispositifEvacLaisseSurPlace'));
};

MonitorOutputDispositifCs.prototype.laisseSurPlaceAction=function()
{ 
  var idDispositif   = $('choose-hopital-window-current-dispositif'           ).value  ;      
  var decharge       = $('confirm-laisse-sur-place-window-decharche'          ).checked;
  var dcdADispoDe    = $('confirm-laisse-sur-place-window-decedee_a_dispo_de' ).value  ;
  var decede         = $('confirm-laisse-sur-place-window-decedee'            ).value  ;

  MonitorOutputDispositif.laisseSurPlace(idDispositif, decede, decharge, dcdADispoDe, MonitorOutputDispositifCs.prototype.actionReturn);
  
  MonitorOutputDispositifCs.prototype.chooseHopitalWindow        .hide('DispositifActionButton_'+idDispositif);
  MonitorOutputDispositifCs.prototype.confirmLaisseSurPlaceWindow.hide('dispositifEvacLaisseSurPlace');
};


MonitorOutputDispositifCs.prototype.showDispositif  =function(recordId, googleCoordsLat, googleCoordsLong)
{
  var dispositifRecord  = Ext.getCmp('DispositifListGrid').getStore().getById(recordId);
  
  Ext.getCmp('monitorOutputCenterRegion').activate(1);
  
  var map               = Ext.getCmp('center-carte-paris-panel');
  map.focusMarker('lieu_cat_'+9, dispositifRecord.data.idDispositif);
  
};


MonitorOutputDispositifCs.prototype.etatDispositifCellRenderer=function(value, metadata, record, rowIndex, colIndex, store)
{
  if(value != null)
    return crfIrpUtils.getLabelFor('EtatsDispositif', value);
  else
    return "";
};
MonitorOutputDispositifCs.prototype.typeCellRenderer=function(value, metadata, record, rowIndex, colIndex, store)
{
  if(value != null)
    return crfIrpUtils.getLabelFor('TypesDispositif', value);
  else
    return "";
};

MonitorOutputDispositifCs.prototype.contactTelsCellRenderer=function(value, metadata, record, rowIndex, colIndex, store)
{
  return '<p>'+value+'</p><p>'+record.data.contactTel2+'</p>';
};

MonitorOutputDispositifCs.prototype.updateDispositifAndRemoveAffectedIntervention = function (dispositif, idIntervention)
{
  moInterventionCs.deleteInterventionToAffect(idIntervention);
  this.updateDispositif                      (dispositif    );
};

MonitorOutputDispositifCs.prototype.updateDispositif = function (dispositif)
{
  var store      = Ext.getCmp('DispositifListGrid').getStore();

  var newDispositif = new DispositifRecord({
    'idDispositif'                : dispositif.idDispositif,
    'idTypeDispositif'            : dispositif.idTypeDispositif,
    'idEtatDispositif'            : dispositif.idEtatDispositif,
    'idDelegation'                : dispositif.idDelegation,
    'displayState'                : dispositif.displayState,
    'dispositifBackWith3Girls'    : dispositif.dispositifBackWith3Girls,
    'dispositifNotEnoughO2'       : dispositif.dispositifNotEnoughO2,
    'indicatifVehicule'           : dispositif.indicatifVehicule,
    'contactRadio'                : dispositif.contactRadio,
    'contactTel1'                 : dispositif.contactTel1,
    'contactTel2'                 : dispositif.contactTel2,
    'dhReception'                 : dispositif.dhReception,
    'dhDepart'                    : dispositif.dhDepart,
    'dhSurPlace'                  : dispositif.dhSurPlace,
    'dhBilanPrimaire'             : dispositif.dhBilanPrimaire,
    'dhBilanSecondaire'           : dispositif.dhBilanSecondaire,
    'dhQuitteLesLieux'            : dispositif.dhQuitteLesLieux,
    'dhArriveeHopital'            : dispositif.dhArriveeHopital,
    'dhDispo'                     : dispositif.dhDispo,
    'dhASaBase'                   : dispositif.dhASaBase,
    'dhAppelRenfortMedical'       : dispositif.dhAppelRenfortMedical,
    'dhArriveeRenfortMedical'     : dispositif.dhArriveeRenfortMedical   
  });
 
  newDispositif.json = dispositif;
 
  var queryResult = store.query('idDispositif',dispositif.idDispositif);
 
  var recordIndex = 0;
  if(queryResult!= null && queryResult.length > 0 && queryResult.get(0).data.idDispositif == dispositif.idDispositif)
  {
    var record  = queryResult.get(0);
    recordIndex = store.indexOfId(record.id);
    store.remove(record);
  }
  store.insert(recordIndex, newDispositif);  
};



MonitorOutputDispositifCs.prototype.updateAddress=function(fieldId)
{
  var rue       =$('dispositifEvacAddressRue'       );
  var codePostal=$('dispositifEvacAddressCodePostal');
  var ville     =$('dispositifEvacAddressVille'     );

  rue       .value=rue       .value.strip();
  codePostal.value=codePostal.value.strip();
  ville     .value=ville     .value.strip();
  
  if(fieldId == 'dispositifEvacAddressCodePostal' && !crfIrpUtils.checkZipCode(codePostal))
  {
    crfIrpUtils.checkZipCodeError(fieldId);
  }
  
  
  if( rue       .value != '' && rue       .oldValue != rue       .value &&
      codePostal.value != '' && codePostal.oldValue != codePostal.value &&
      ville     .value != '' && ville     .oldValue != ville     .value   )
  {// valeur non vide et non différente de la précédente valeur
    googleMapAdressResolver.findCoordinatesForAddress(  rue       .value +', '+
                                                        codePostal.value +', '+
                                                        ville     .value,
                                                        this.updateAddressReturn,
                                                        this.updateAddressErrorReturn);
  }
};

MonitorOutputDispositifCs.prototype.updateAddressReturn=function(place)
{
  var coordinates = place.Point.coordinates;
  $('dispositifEvacAddressCoordinateLat'   ).value=coordinates[1];
  $('dispositifEvacAddressCoordinateLong'  ).value=coordinates[0];
  $('dispositifEvacGoogleAdressCheckStatus').src  =contextPath+"/img/famfamfam/accept.png";
};

MonitorOutputDispositifCs.prototype.updateAddressErrorReturn=function(response)
{
  var icon = response.Status.code=='GoogleMapsUnavailable'?'disconnect':'exclamation';
  $('dispositifEvacGoogleAdressCheckStatus').src=contextPath+"/img/famfamfam/"+icon+".png";
  $('dispositifEvacAddressCoordinateLat'   ).value='0';//on met qqch de non vide pour s'avoir qu'on est passé par la
  $('dispositifEvacAddressCoordinateLong'  ).value='0';
};


MonitorOutputDispositifCs.prototype.updateNomPrenomRadio=function()
{
  var nomPrenom = $('cloneInterventionNomVictime').value+' '+$('cloneInterventionPrenomVictime').value;
  $('cloneInterventionNomPrenomRadio').value=crfIrpUtils.toRadio(nomPrenom);
};


/**
 * Affiche une ligne de  la liste des dispositif
 * */
MonitorOutputDispositifCs.prototype.buildDispositifRowBody=function(record, rowIndex, p, dataStore)
{
  var detailIntervention  = 'Aucune intervention en cours';
  var dropZoneId          = 'dispositifDz_'+record.data.idTypeDispositif+'_'+record.data.idDispositif+'_'+record.id;
  
  if(record.json.interventions != null && record.json.interventions.length > 0)
    detailIntervention = MonitorOutputDispositifCs.prototype.buildInterventionInfoForDispositif(record);

  var interventions = record.json.interventions;
    
  var template = ['<table id="DispositifRowDetail_',  record.data.idDispositif,'" style="width:100%;">',
'  <tr>',
'    <td style="height:11px;font-size:14px;">',
'      <div><span>CI : </span><span>', record.json.equipierLeader.nom+' '+record.json.equipierLeader.prenom ,'</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>Intervention en cours :</span></div>',
'    </td>',
'    <td rowspan="2" style="width:130px;">',
'      <input id="DispositifActionButton_',record.data.idDispositif,'|',record.id,'" type="button" ' +
'            value="',MonitorOutputDispositifCs.prototype.getLabelForActionButton(record.data.idEtatDispositif),

(interventions.length>1?' ('+interventions.length+')':''),

'"   style="width:130px;height:60px;" onClick="moDispositifCs.action(this.id)"/><br/>',
'      <input type="button" value="Editer Dispositif"    onClick="moDispositifCs.editDispositif(', record.data.idDispositif,')" style="width:130px;height:27px;margin-top:3px;"/>',
'    </td>',
'  </tr>',
'  <tr>',
'    <td class="interventionDropZone" id="',dropZoneId,'">',
detailIntervention,
'    </td>',
'  </tr>',
'  <tr>',
'    <td colspan="1" style="border-top:solid #9D9D9D 1px;">',
'      <table style="width:100%;">',
'        <tr>',
'          <td style="width:60%;">',

(!record.json.currentPosition.empty?
  ['            <span><b>Adresse Courante/Destination :</b> </span><span>',record.json.currentPosition.rue ,', '+record.json.currentPosition.codePostal ,', '+record.json.currentPosition.ville ,'</span>',
   '            <img src="',contextPath,'/img/famfamfam/map_magnify.png" class="crfIcon" onClick="moDispositifCs.showDispositif(\'',record.id,'\',',record.json.currentPosition.googleCoordsLat ,',',record.json.currentPosition.googleCoordsLong ,')"/>'].join('')
  :''),

'          </td>',
'          <td>',

(!record.json.previousPosition.empty?
 ['            <span><b>Adresse Précédente  :</b> </span><span>',record.json.previousPosition.rue,', '+record.json.previousPosition.codePostal,', '+record.json.previousPosition.ville,'</span>',
  '            <img src="',contextPath,'/img/famfamfam/map_magnify.png" class="crfIcon" onClick="moDispositifCs.showDispositif(\'',record.id,'\',',record.json.previousPosition.googleCoordsLat,',',record.json.previousPosition.googleCoordsLong,')"/>'].join('')
  :''),

'          </td>',
'        </tr>',
'      </table>',
'    </td>',
'    <td style="border-top:solid #9D9D9D 1px;">',
'<input id="DispositifSMSButton_',record.data.idDispositif,'|',record.id,'" type="button" style="width:130px;" onClick="moDispositifCs.sendSMS(this.id)" value="Envoyer un SMS"/>',
'    </td>',
'  </tr>',
'</table>'];
  p.body=template.join('');
  
  moDispositifCs.displayDispositifOnMap(record.json);
  
  return 'x-grid3-row-expanded '+MonitorOutputDispositifCs.prototype.dispositifRowCss[record.data.idTypeDispositif];
};

/**
 * construit l'affichage des interventions affectées au dispositif
 * 
 * */

MonitorOutputDispositifCs.prototype.buildInterventionInfoForDispositif=function(record)
{
  var dispositif    = record.json;
  var interventions = dispositif.interventions;
  var i             = 0;
  var count         = interventions.length;
  
  var html = [];
  for(i=0;i<count;i++)
  {
    var intervention       = interventions[i];
    var etat = '';
    
    if(intervention.idEtat==STATUS_SUR_PLACE || intervention.idEtat==STATUS_PRIMAIRE)
    {
      etat = '<div>';
      if(intervention.idEtat==STATUS_SUR_PLACE)
        etat += 'Primaire à Passer';
      else if(intervention.idEtat==STATUS_PRIMAIRE)
        etat += 'Secondaire à Passer';
      etat += '</div>';    
    }
  
    
    var detailIntervention = [
      '<fieldset class="DispositifInterDetail" id="DispositifInterDetail_',
      dispositif.idDispositif, 
      '-', 
      intervention.idIntervention,
      '|',
      record.id,
      '"><legend>',
      crfIrpUtils.formatInterventionBusinessId(intervention.interventionBusinessId),
      '</legend><div class="DispositifInterOrigineMotif><span class="DispositifInterNomVictimeOrigine">',
      crfIrpUtils.getLabelFor('OriginesIntervention',intervention.idOrigine),
      '</span> - <span class="DispositifInterMotif">',
      crfIrpUtils.getLabelFor('MotifsIntervention'  ,intervention.idMotif),
      '</span></div><div class="DispositifInterVictime"><span class="DispositifInterNomVictime">',
      (intervention.victimeHomme?'Mr ':'Mme '),
       intervention.nomVictime, 
      '</span> - <span class="DispositifInterRue">',
      intervention.position.rue,
      '</span>, <span class="DispositifInterCodePostal">',
      intervention.position.codePostal,
      '</span>, <span class="DispositifInterVille">',
      intervention.position.ville,
      '</span></div><div class="DispositifInterContact"><span class="DispositifInterNomContact">',
      intervention.nomContactSurPlace,
      '</span> - <span class="DispositifInterCoordonneesContact">',
      intervention.coordonneesContactSurPlace,
      '</span></div>',
      '<input type="button" value="Editer"    onClick="moDispositifCs.editIntervention (',intervention.idIntervention,');" style="width:85px;height:24px;"/>',
      '<input id="DispositifInterDetail_CloneInterButton-', dispositif.idDispositif,'-',intervention.idIntervention,'" type="button" value="Dupliquer" onClick="moDispositifCs.cloneIntervention(',dispositif.idDispositif,',', intervention.idIntervention,');" style="width:85px;height:24px;"/>',
      etat,
      '</fieldset>'
      ].join('');
    html.push(detailIntervention);
  }

  return html.join('');
};



Ext.namespace('Ext.ux.Monitor.Out.ChangeDispositifStatusWindow');

Ext.ux.Monitor.Out.ChangeDispositifStatusWindow = Ext.extend(Ext.Window,
    {
      id          : 'choose-etat-windowCmp',
      layout      : 'border'             ,
      title       : 'Changer l\'état du Dispositif',
      width       : 500               ,
      height      : 220               ,
      x           : 300               ,
      y           : 35                ,
      closeAction : 'hide'            ,
      plain       : true              ,
      buttons     : [{
          text: 'Annuler',
          handler: function(button, event){
              Ext.getCmp('choose-etat-windowCmp').hide();
          }
      },
        {
          text: 'Valider',
          handler: function(button, event){

            MonitorOutputDispositif.updateEtatDispositif( Ext.getCmp('choose-etat-windowCmp').idDispositif,
                                                          Ext.getCmp('DispositifNewState'   ).getValue(),
                                                          function()
                                                          {
                                                            Ext.getCmp('choose-etat-windowCmp').hide();
                                                          });
          }
      }],
      initComponent:function()
      {
        var messagePanel = {
          id              : 'choose-etat-window-message-panel',
          xtype           : 'panel',
          baseCls         : 'x-plain',
          region          : 'north',
          html            : 'Loading...',
          height          : 95,
          minSize         : 95
        };
        var formPanel =
        {
          baseCls         : 'x-plain',
          xtype           : 'form',
          standardSubmit  : true,
          bodyStyle       : 'background:#f9f9f9 none; color:#222; padding:5px 35px;',
          defaults        : {
            width: 200
          },
          defaultType     : 'textfield' ,
          frame           : false       ,
          labelWidth      : 120         ,
          region          : 'center'     ,
          items           : [{
              id            : 'DispositifNewState',
              fieldLabel    : 'Nouvel Etat'       ,
              name          : 'DispositifNewState',
              xtype         : 'combo',
              anchor        : '100%',
              mode          : 'local',
              typeAhead     : true,
              editable      : false,
              triggerAction : 'all',
              displayField  : 'label',
              valueField    : 'id',
              selectOnFocus : true,
              store         : new Ext.data.ArrayStore({
                  fields    : ['id', 'label'],
                  idIndex   : 0,
                  idProperty: 'id'
              })
          }]
        };
        
        Ext.apply(this, {
          items: [messagePanel, formPanel]
        });
        Ext.ux.Monitor.Out.ChangeDispositifStatusWindow.superclass.initComponent.call(this);
      },
      showChangeStatus:function(idDispositif, interventions, currentState, message)
      {
        this.idDispositif  = idDispositif ;
        this.interventions = interventions;
        
        this.lazyInit();
        
        var etatDispositifList = null;
        
        if(interventions == null || interventions.length==0)
        {
          etatDispositifList =this.etatDispositifWithoutIntervention;
        }
        else
        {
          etatDispositifList =this.etatDispositifWithIntervention;
        }
        
        Ext.getCmp('DispositifNewState').getStore().loadData(etatDispositifList);
        Ext.getCmp('DispositifNewState').setValue(currentState);        
        this.show();
        Ext.getCmp('choose-etat-window-message-panel').update(message);
      },
      lazyInit:function()
      {
        if(this.etatDispositifWithIntervention == null)
        {
          var etatDispositifList = crfIrpUtils.getListForSimpleStore('EtatsDispositif');
          
          this.etatDispositifWithIntervention   =[];
          this.etatDispositifWithoutIntervention=[];
          
          var j=0;
          var z=0;
          
          for(var i=0, count=etatDispositifList.length;i<count;i++)
          {
            if(i>=STATUS_INTERVENTION_AFFECTEE && i<STATUS_ARRIVE_HOSPITAL) // de inter affecté a transport (arrivé hopital pas possible, on pourrait passer de dispo a arriver a l'hopital sans avoir choisi l'hopital) 
            {
              this.etatDispositifWithIntervention[j++]=etatDispositifList[i];
            }
            
            if(i==STATUS_INDISPO || i==STATUS_DISPO)
            {//dispo, a sa base, ou indispo pour les dispositifs sans inter
              this.etatDispositifWithoutIntervention[z++]=etatDispositifList[i];
            }
            
          }
        }
      }
    });

Ext.reg('ChangeDispositifStatusWindow', Ext.ux.Monitor.Out.ChangeDispositifStatusWindow);