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
                         {name: 'currentInterId'                                , mapping: 'currentInterId'                                },
                         {name: 'equipierCi.idEquipier'                         , mapping: 'equipierCi.idEquipier'                         },
                         {name: 'equipierCi.nom'                                , mapping: 'equipierCi.nom'                                },
                         {name: 'equipierCi.prenom'                             , mapping: 'equipierCi.prenom'                             },
                         {name: 'equipierCi.homme'                              , mapping: 'equipierCi.homme'                              },
                         {name: 'equipierCi.numNivol'                           , mapping: 'equipierCi.numNivol'                           },
                         {name: 'currentInterId'                                , mapping: 'currentInterId'                                },
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
                         {name: 'dhArriveeRenfortMedical'                       , mapping: 'dhArriveeRenfortMedical'                       },


                         {name: 'currentIntervention.idOrigine'                 , mapping: 'currentIntervention.idOrigine'                 },
                         {name: 'currentIntervention.idMotif'                   , mapping: 'currentIntervention.idMotif'                   },
                         {name: 'currentIntervention.idEtat'                    , mapping: 'currentIntervention.idEtat'                    },

                         {name: 'currentIntervention.position.googleCoordsLat'  , mapping: 'currentIntervention.position.googleCoordsLat'  },
                         {name: 'currentIntervention.position.googleCoordsLong' , mapping: 'currentIntervention.position.googleCoordsLong' },
                         {name: 'currentIntervention.position.rue'              , mapping: 'currentIntervention.position.rue'              },
                         {name: 'currentIntervention.position.codePostal'       , mapping: 'currentIntervention.position.codePostal'       },
                         {name: 'currentIntervention.position.ville'            , mapping: 'currentIntervention.position.ville'            },
                         {name: 'currentIntervention.dhSaisie'                  , mapping: 'currentIntervention.dhSaisie'                  },
                        
                         {name: 'currentIntervention.victimeHomme'              , mapping: 'currentIntervention.victimeHomme'              },
                         {name: 'currentIntervention.nomVictime'                , mapping: 'currentIntervention.nomVictime'                },
                         {name: 'currentIntervention.nomContactSurPlace'        , mapping: 'currentIntervention.nomContactSurPlace'        },
                         {name: 'currentIntervention.coordonneesContactSurPlace', mapping: 'currentIntervention.coordonneesContactSurPlace'},

                         {name: 'currentPosition.empty'                         , mapping: 'currentPosition.empty'                         },
                         {name: 'currentPosition.rue'                           , mapping: 'currentPosition.rue'                           },
                         {name: 'currentPosition.codePostal'                    , mapping: 'currentPosition.codePostal'                    },
                         {name: 'currentPosition.ville'                         , mapping: 'currentPosition.ville'                         },
                         {name: 'currentPosition.googleCoordsLat'               , mapping: 'currentPosition.googleCoordsLat'               },
                         {name: 'currentPosition.googleCoordsLong'              , mapping: 'currentPosition.googleCoordsLong'              },

                         {name: 'previousPosition.empty'                        , mapping: 'previousPosition.empty'                        },
                         {name: 'previousPosition.rue'                          , mapping: 'previousPosition.rue'                          },
                         {name: 'previousPosition.codePostal'                   , mapping: 'previousPosition.codePostal'                   },
                         {name: 'previousPosition.ville'                        , mapping: 'previousPosition.ville'                        },
                         {name: 'previousPosition.googleCoordsLat'              , mapping: 'previousPosition.googleCoordsLat'              },
                         {name: 'previousPosition.googleCoordsLong'             , mapping: 'previousPosition.googleCoordsLong'             }                                                                                                                                                                                                                                                                                                                                                                                                                                                                         

                       );


var MonitorOutputDispositifCs = Class.create();

MonitorOutputDispositifCs.prototype.boutonActionLabel=[];//next state             current state         
MonitorOutputDispositifCs.prototype.boutonActionLabel[-3]="Disponible"        ; //indispo equipage incomplet
MonitorOutputDispositifCs.prototype.boutonActionLabel[-2]="Disponible"        ; //indispo materiel incomplet
MonitorOutputDispositifCs.prototype.boutonActionLabel[-1]="Disponible"        ; //indispo
MonitorOutputDispositifCs.prototype.boutonActionLabel[0 ]="Disponible"        ; //N/A
MonitorOutputDispositifCs.prototype.boutonActionLabel[1 ]="Changer de statut" ; //dispo
MonitorOutputDispositifCs.prototype.boutonActionLabel[2 ]="Départ"            ; //intervention affecté
MonitorOutputDispositifCs.prototype.boutonActionLabel[3 ]="Arrivé sur place"  ; //Parti
MonitorOutputDispositifCs.prototype.boutonActionLabel[4 ]="Primaire"          ; //Sur place
MonitorOutputDispositifCs.prototype.boutonActionLabel[5 ]="Secondaire"        ; //Primaire
MonitorOutputDispositifCs.prototype.boutonActionLabel[6 ]="Transport H."      ; //Secondaire
MonitorOutputDispositifCs.prototype.boutonActionLabel[7 ]="Arrivé H."         ; //transport
MonitorOutputDispositifCs.prototype.boutonActionLabel[8 ]="Inter. Terminée"   ; //Arrivé hopital

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

  var dataStore1 = new Ext.data.Store({
           listeners: { load : MonitorOutputDispositifCs.prototype.initDropZone,
                         add : MonitorOutputDispositifCs.prototype.initDropZoneAdd},
               proxy: new Ext.ux.rs.data.DwrProxy({
                call: MonitorOutputDispositif.getAllDispositif,
                args: [],
              paging: false
               }),
          remoteSort: false,
              reader: new Ext.data.JsonReader({
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
{name:'equipierCi.idEquipier'                           , type: 'string' },
{name:'equipierCi.nom'                                  , type: 'string' },
{name:'equipierCi.prenom'                               , type: 'string' },
{name:'equipierCi.homme'                                , type: 'boolean'},
{name:'equipierCi.numNivol'                             , type: 'string' },
{name:'currentInterId'                                  , type: 'int'    },
{name:'dhReception'                                     , type: 'date'    ,dateFormat:'Y-m-d\\TH:i:s'},
{name:'dhDepart'                                        , type: 'date'    ,dateFormat:'Y-m-d\\TH:i:s'},
{name:'dhSurPlace'                                      , type: 'date'    ,dateFormat:'Y-m-d\\TH:i:s'},
{name:'dhBilanPrimaire'                                 , type: 'date'    ,dateFormat:'Y-m-d\\TH:i:s'},
{name:'dhBilanSecondaire'                               , type: 'date'    ,dateFormat:'Y-m-d\\TH:i:s'},
{name:'dhQuitteLesLieux'                                , type: 'date'    ,dateFormat:'Y-m-d\\TH:i:s'},
{name:'dhArriveeHopital'                                , type: 'date'    ,dateFormat:'Y-m-d\\TH:i:s'},
{name:'dhDispo'                                         , type: 'date'    ,dateFormat:'Y-m-d\\TH:i:s'},
{name:'dhASaBase'                                       , type: 'date'    ,dateFormat:'Y-m-d\\TH:i:s'},
{name:'dhAppelRenfortMedical'                           , type: 'date'    ,dateFormat:'Y-m-d\\TH:i:s'},
{name:'dhArriveeRenfortMedical'                         , type: 'date'    ,dateFormat:'Y-m-d\\TH:i:s'},

{name:'currentIntervention.idOrigine'                   , type: 'int'     },
{name:'currentIntervention.idMotif'                     , type: 'int'     },
{name:'currentIntervention.idEtat'                      , type: 'int'     },
{name:'currentIntervention.position.rue'                , type: 'string'  },
{name:'currentIntervention.position.codePostal'         , type: 'string'  },
{name:'currentIntervention.position.ville'              , type: 'string'  },
{name:'currentIntervention.position.googleCoordsLat'    , type: 'float'   },
{name:'currentIntervention.position.googleCoordsLong'   , type: 'float'   },

{name:'currentIntervention.dhSaisie'                    , type: 'date'    ,dateFormat:'Y-m-d\\TH:i:s'},
{name:'currentIntervention.victimeHomme'                , type: 'boolean'},
{name:'currentIntervention.nomVictime'                  , type: 'string' },
{name:'currentIntervention.nomContactSurPlace'          , type: 'string' },
{name:'currentIntervention.coordonneesContactSurPlace'  , type: 'string' },

{name:'currentPosition.empty'                           , type: 'boolean' },
{name:'currentPosition.rue'                             , type: 'string'  },
{name:'currentPosition.codePostal'                      , type: 'string'  },
{name:'currentPosition.ville'                           , type: 'string'  },
{name:'currentPosition.googleCoordsLat'                 , type: 'float'   },
{name:'currentPosition.googleCoordsLong'                , type: 'float'   },

{name:'previousPosition.empty'                          , type: 'boolean' },
{name:'previousPosition.rue'                            , type: 'string'  },
{name:'previousPosition.codePostal'                     , type: 'string'  },
{name:'previousPosition.ville'                          , type: 'string'  },
{name:'previousPosition.googleCoordsLat'                , type: 'float'   },
{name:'previousPosition.googleCoordsLong'               , type: 'float'   }
                   ]
               })
           });

  var grid1 = new xg.GridPanel({
        id:'DispositifListGrid',
        store: dataStore1,
        cm: new xg.ColumnModel([
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
        renderTo    : 'center-dispositif-list'
    });
  grid1.getStore().load();
};

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
  var win = new Ext.Window({
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
          
  MonitorOutputDispositifCs.prototype.chooseHopitalWindow = win;
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
  
  Ext.get('south').update(htmlGenerated.join(''));
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
 * Affiche une ligne de  la liste des dispositif
 * */
MonitorOutputDispositifCs.prototype.buildDispositifRowBody=function(record, rowIndex, p, dataStore)
{
  var detailIntervention  = 'Aucune intervention en cours';
  var dropZoneId          = 'dispositifDz_'+record.data.idTypeDispositif+'_'+record.data.idDispositif+'_'+record.id;
  
  if(record.data.currentInterId != 0)
    detailIntervention = MonitorOutputDispositifCs.prototype.buildInterventionInfoForDispositif(record.data);


  var template = ['<table id="DispositifRowDetail_',  record.data.idDispositif,'" style="width:100%;">',
'  <tr>',
'    <td style="height:11px;font-size:14px;">',
'      <div><span>CI : </span><span>', record.data["equipierCi.nom"]+' '+record.data["equipierCi.prenom"] ,'</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>Intervention en cours :</span></div>',
'    </td>',
'    <td rowspan="2" style="width:130px;">',
'      <input id="DispositifActionButton_',record.data.idDispositif,'" type="button" ' +
'            value="',MonitorOutputDispositifCs.prototype.getLabelForActionButton(record.data["idEtatDispositif"]),
'"   style="width:130px;height:60px;" onClick="moDispositifCs.action(',record.data.idDispositif,',',record.data.currentInterId,',',record.data.idEtatDispositif,')"/><br/>',
'    </td>',
'    <td rowspan="2" style="width:130px;">',
'      <input type="button" value="Editer Dispositif"    onClick="moDispositifCs.editDispositif(', record.data.idDispositif,')" style="width:125px;height:27px;margin-bottom:5px;"/><br/>',
'      <input type="button" value="Editer Intervention"  onClick="moDispositifCs.editIntervention(',record.data.currentInterId,')" style="width:125px;height:27px;"/>',
'    </td>',
'  </tr>',
'  <tr>',
'    <td class="interventionDropZone" id="',dropZoneId,'">',
detailIntervention,
'    </td>',
'  </tr>',
'  <tr>',
'    <td colspan="2" style="border-top:solid #9D9D9D 1px;">',
'      <table style="width:100%;">',
'        <tr>',
'          <td style="width:60%;">',

(!record.data["currentPosition.empty"]?
  ['            <span><b>Adresse Courante/Destination :</b> </span><span>',record.data["currentPosition.rue"] ,', '+record.data["currentPosition.codePostal"] ,', '+record.data["currentPosition.ville"] ,'</span>',
   '            <img src="',contextPath,'/img/famfamfam/map_magnify.png" class="crfIcon" onClick="moDispositifCs.showDispositif(',record.data.idDispositif,',',record.data["currentPosition.googleCoordsLat"] ,',',record.data["currentPosition.googleCoordsLong"] ,')"/>'].join('')
  :''),

'          </td>',
'          <td>',

(!record.data["previousPosition.empty"]?
 ['            <span><b>Adresse Précédente  :</b> </span><span>',record.data["previousPosition.rue"],', '+record.data["previousPosition.codePostal"],', '+record.data["previousPosition.ville"],'</span>',
  '            <img src="',contextPath,'/img/famfamfam/map_magnify.png" class="crfIcon" onClick="moDispositifCs.showDispositif(',record.data.idDispositif,',',record.data["previousPosition.googleCoordsLat"],',',record.data["previousPosition.googleCoordsLong"],')"/>'].join('')
  :''),

'          </td>',
'        </tr>',
'      </table>',
'    </td>',
'    <td style="border-top:solid #9D9D9D 1px;">',
'      <b>Itinéraire Google :</b> <img src="',contextPath,'/img/famfamfam/map_go.png" class="crfIcon"  onClick="moDispositifCs.showItinary(',record.data.idDispositif,',',record.data["previousPosition.googleCoordsLat"],',',record.data["previousPosition.googleCoordsLong"],',',record.data["currentPosition.googleCoordsLat"] ,',',record.data["currentPosition.googleCoordsLong"],')"/>',
'    </td>',
'  </tr>',
'</table>'];
  p.body=template.join('');
  
  moDispositifCs.displayDispositifOnMap(record.data);
  
  Ext.ux.MonitorOutput.dd.removeTagFromDropZoneList(dropZoneId);
  return 'x-grid3-row-expanded';
};
/**
 * Affiche un dispostif sur la carte google map avec son intervention.
 * Dispositif soit sous forme d'un marker ou une direction et 2 markers
 * */
MonitorOutputDispositifCs.prototype.displayDispositifOnMap  =function(dispositif)
{
  if(dispositif["currentPosition.empty"]==false)
  {
    var map      = Ext.getCmp('center-carte-paris-panel');
    
    var currentInterHtml = '';
    if(dispositif.currentInterId != 0)
    {
      var origine   = crfIrpUtils.getLabelFor('OriginesIntervention', dispositif['currentIntervention.idOrigine']);
      var motif     = crfIrpUtils.getLabelFor('MotifsIntervention'  , dispositif['currentIntervention.idMotif'  ]);

      currentInterHtml = ['<br/><br/>Intervention en cours : ',dispositif.currentInterId,'<br/> Origine : ',origine,'<br/>',
             'Motif : ',motif,'<br/>',
             'Adresse : ',dispositif['currentIntervention.position.rue'         ],', ',
                          dispositif['currentIntervention.position.codePostal'  ],', ',
                          dispositif['currentIntervention.position.ville'       ],'<br/>',
             'Victime : ',dispositif['currentIntervention.nomVictime'                       ],'<br/>',
             'Contact : ',dispositif['currentIntervention.nomContactSurPlace'               ],'<br/>',
             'Coordonnées : ',dispositif['currentIntervention.coordonneesContactSurPlace'   ],'<br/>'].join(''); 
             
      var category = 'lieu_cat_'+8;
      var dhSaisie = crfIrpUtils.getFullDate(dispositif['currentIntervention.dhSaisie']);
      var title    = 'Né'+dispositif.currentInterId+' - '+dhSaisie+' - '+origine+' - '+motif;
      var html     = title +'<br/>'+
                     dispositif['currentIntervention.position.rue'         ]+', '+
                     dispositif['currentIntervention.position.codePostal'  ]+", "+
                     dispositif['currentIntervention.position.ville'       ];
    //Ajout du marker représentant la victime
      map.addMarker(dispositif['currentIntervention.position.googleCoordsLat' ], 
                    dispositif['currentIntervention.position.googleCoordsLong'], 
                    null, 
                    category, 
                    false, 
                    title, 
                    html,
                    dispositif.currentInterId);
             
    }
    else
      currentInterHtml ='<br/><br/>Aucune intervention en cours'; 
    
    var category = 'lieu_cat_'+9;
    //position précédente non vide et différente de la courante
    if( dispositif["previousPosition.empty"]===false && 
        !(dispositif["currentPosition.googleCoordsLat" ]==dispositif["previousPosition.googleCoordsLat" ] &&
          dispositif["currentPosition.googleCoordsLong"]==dispositif["previousPosition.googleCoordsLong"]) )
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
      
      
      //Trajet a calculer
      map.displayRouteForDispositif({
        fromAddress    : [dispositif["previousPosition.rue"],', ', dispositif["previousPosition.codePostal"],', ',dispositif["previousPosition.ville"]].join(''),
        toAddress      : [dispositif["currentPosition.rue" ],', ', dispositif["currentPosition.codePostal" ],', ',dispositif["currentPosition.ville" ]].join(''),
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
  
      map.addMarker(dispositif["currentPosition.googleCoordsLat"  ], 
                    dispositif["currentPosition.googleCoordsLong" ], 
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
 * Lance l'initialisation des dropzone aprés un certain temps (temps de chargemnent du store)
 * Disparaitra lorsque j'aurais changer l'implémentation des dropzone pour etre plus dans l'esprit Ext
 * */
MonitorOutputDispositifCs.prototype.initDropZoneAdd  =function()
{
  window.setTimeout(function(){MonitorOutputDispositifCs.prototype.initDropZone();}, 200)
};
/**
 * initialise la dropzone des dispositifs
 * 
 * */
MonitorOutputDispositifCs.prototype.initDropZone  =function()
{
  //if(consoleEnabled)
    //console.log('adding drop zone');
    
  var store = Ext.getCmp('DispositifListGrid').getStore();
  
  store.each(function(record){
    Ext.ux.MonitorOutput.dd.addDropZone('dispositifDz_'+record.data.idTypeDispositif+'_'+record.data.idDispositif+'_'+record.id, record.id, record.data);
  });
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
  this.monitorInputWindow.miBilanCs.editBilan(idIntervention, onglet);
};

/**
 * 
 * Gere le clique sur le bouton Action
 * Le libellé du bouton n'est pas changé par cette méthode, mais lors de la mise a jours du dispositif par reverse Ajax
 * */
MonitorOutputDispositifCs.prototype.action          =function(idDispositif, idIntervention, currentState)
{
  var sendActionToServerNow = true;
  if(currentState == 4)//Etat : Sur Place, doit afficher le formulaire de primaire
  {
    MonitorOutputDispositifCs.prototype.editIntervention(idIntervention); 
  }
  else if(currentState == 5)//Etat : Primaire, doit afficher le formulaire de primaire
  {
    MonitorOutputDispositifCs.prototype.editIntervention(idIntervention, 'BilanSecouristInitial');
  }
  else if(currentState == 6)//Etat : Secondaire Passé, quand on appuie sur le bouton action, on doit choisir l'hopital destination
  {
    $('choose-hopital-window-current-dispositif'  ).value=idDispositif;
    $('choose-hopital-window-current-intervention').value=idIntervention;
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
    MonitorOutputDispositifCs.prototype.chooseHopitalWindow.show('DispositifActionButton_'+idDispositif);//
    sendActionToServerNow = false;
  }
  
  var callMetaData = {
    callback:MonitorOutputDispositifCs.prototype.actionReturn,
    arg :{idIntervention  : idIntervention,
          idDispositif    : idDispositif   
         }
  };
  
  if(sendActionToServerNow == true && currentState != 8 && idIntervention != 0)
  {
    MonitorOutputDispositif.actionOnDispositif(idIntervention, idDispositif, callMetaData);
  }
  else if(currentState == 8)
  {
    MonitorOutputDispositif.endOfIntervention(idIntervention, idDispositif, callMetaData);
  }
  else if(currentState <= 0)
  {
    MonitorOutputDispositif.actionOnDispositif(idIntervention, idDispositif, callMetaData);
  }
  else if(idIntervention == 0)
  {
    //TODO : présenter liste d'option possible
  }
};

MonitorOutputDispositifCs.prototype.actionReturn     =function(newIdEtatDispositif, metaData)
{
  //alert('New Etat ' + newIdEtatDispositif + ' for dispositif : '+metaData.idDispositif+' intervention : '+metaData.idIntervention);
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
  var idIntervention = $('choose-hopital-window-current-intervention').value;
  
  var callMetaData = {
      callback:MonitorOutputDispositifCs.prototype.actionReturn,
      arg :{idIntervention  : idIntervention,
            idDispositif    : idDispositif   
           }
    };
  MonitorOutputDispositif.chooseEvacDestination(idDispositif, idIntervention, idLieu, label, position, callMetaData);
  MonitorOutputDispositifCs.prototype.chooseHopitalWindow.hide('DispositifActionButton_'+idDispositif);
};

MonitorOutputDispositifCs.prototype.showDispositif  =function(idDispositif, latitude, longitude){
  alert(idDispositif+' '+latitude+' '+longitude);
};

MonitorOutputDispositifCs.prototype.showItinary  =function(idDispositif, latitudeStart, longitudeStart, latitudeEnd, longitudeEnd){
  alert(idDispositif+' '+latitudeStart+' '+longitudeStart+' '+latitudeEnd+' '+longitudeEnd);
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


MonitorOutputDispositifCs.prototype.updateDispositif = function (dispositif)
{
  var store      = Ext.getCmp('DispositifListGrid').getStore();

  var newDispositif = new DispositifRecord({
 'idDispositif'                                        : dispositif.idDispositif,
 'idTypeDispositif'                                    : dispositif.idTypeDispositif,
 'idEtatDispositif'                                    : dispositif.idEtatDispositif,
 'idDelegation'                                        : dispositif.idDelegation,
 'displayState'                                        : dispositif.displayState,
 'dispositifBackWith3Girls'                            : dispositif.dispositifBackWith3Girls,
 'dispositifNotEnoughO2'                               : dispositif.dispositifNotEnoughO2,
 'indicatifVehicule'                                   : dispositif.indicatifVehicule,
 'contactRadio'                                        : dispositif.contactRadio,
 'contactTel1'                                         : dispositif.contactTel1,
 'contactTel2'                                         : dispositif.contactTel2,
 'currentInterId'                                      : dispositif.currentInterId,
 'equipierCi.idEquipier'                               : dispositif.equipierCi.idEquipier,
 'equipierCi.nom'                                      : dispositif.equipierCi.nom,
 'equipierCi.prenom'                                   : dispositif.equipierCi.prenom,
 'equipierCi.homme'                                    : dispositif.equipierCi.homme,
 'equipierCi.numNivol'                                 : dispositif.equipierCi.numNivol,
 'currentInterId'                                      : dispositif.currentInterId,
 'dhReception'                                         : dispositif.dhReception,
 'dhDepart'                                            : dispositif.dhDepart,
 'dhSurPlace'                                          : dispositif.dhSurPlace,
 'dhBilanPrimaire'                                     : dispositif.dhBilanPrimaire,
 'dhBilanSecondaire'                                   : dispositif.dhBilanSecondaire,
 'dhQuitteLesLieux'                                    : dispositif.dhQuitteLesLieux,
 'dhArriveeHopital'                                    : dispositif.dhArriveeHopital,
 'dhDispo'                                             : dispositif.dhDispo,
 'dhASaBase'                                           : dispositif.dhASaBase,
 'dhAppelRenfortMedical'                               : dispositif.dhAppelRenfortMedical,
 'dhArriveeRenfortMedical'                             : dispositif.dhArriveeRenfortMedical,
 
 'currentIntervention.idOrigine'                       : dispositif.currentIntervention.idOrigine,
 'currentIntervention.idMotif'                         : dispositif.currentIntervention.idMotif,
 'currentIntervention.idEtat'                          : dispositif.currentIntervention.idEtat,
 'currentIntervention.position.rue'                    : dispositif.currentIntervention.position.rue,
 'currentIntervention.position.codePostal'             : dispositif.currentIntervention.position.codePostal,
 'currentIntervention.position.ville'                  : dispositif.currentIntervention.position.ville,
 'currentIntervention.position.googleCoordsLat'        : dispositif.currentIntervention.position.googleCoordsLat,
 'currentIntervention.position.googleCoordsLong'       : dispositif.currentIntervention.position.googleCoordsLong, 
 'currentIntervention.dhSaisie'                        : dispositif.currentIntervention.dhSaisie,
 'currentIntervention.victimeHomme'                    : dispositif.currentIntervention.victimeHomme, 
 'currentIntervention.nomVictime'                      : dispositif.currentIntervention.nomVictime,
 'currentIntervention.nomContactSurPlace'              : dispositif.currentIntervention.nomContactSurPlace,
 'currentIntervention.coordonneesContactSurPlace'      : dispositif.currentIntervention.coordonneesContactSurPlace,

 'currentPosition.empty'                               : dispositif.currentPosition.empty                 ,
 'currentPosition.rue'                                 : dispositif.currentPosition.rue                   ,
 'currentPosition.codePostal'                          : dispositif.currentPosition.codePostal            ,
 'currentPosition.ville'                               : dispositif.currentPosition.ville                 ,
 'currentPosition.googleCoordsLat'                     : dispositif.currentPosition.googleCoordsLat       ,
 'currentPosition.googleCoordsLong'                    : dispositif.currentPosition.googleCoordsLong      ,

 'previousPosition.empty'                              : dispositif.previousPosition.empty                ,
 'previousPosition.rue'                                : dispositif.previousPosition.rue                  ,
 'previousPosition.codePostal'                         : dispositif.previousPosition.codePostal           ,
 'previousPosition.ville'                              : dispositif.previousPosition.ville                ,
 'previousPosition.googleCoordsLat'                    : dispositif.previousPosition.googleCoordsLat      ,
 'previousPosition.googleCoordsLong'                   : dispositif.previousPosition.googleCoordsLong     
 });
 
  var queryResult = store.query('idDispositif',dispositif.idDispositif);
  var recordIndex = 0;
  if(queryResult!= null && queryResult.length > 0 && queryResult.get(0).data.idDispositif == dispositif.idDispositif)
  {
    var record = queryResult.get(0);
    recordIndex = store.indexOfId(record.id);
    store.remove(record);
  }
  store.insert(recordIndex, newDispositif);
};


MonitorOutputDispositifCs.prototype.setInterventionToDispositif=function(draggableElement, dropZoneData)
{
  var draggedElementId = draggableElement.id          ;
  var intervention     = draggableElement.intervention;

  var dropZoneId       = dropZoneData.id        ;
  var dispositifData   = dropZoneData.dispositif;

  var callMetaData = {
    callback:MonitorOutputDispositifCs.prototype.setInterventionToDispositifReturn,
    arg:{draggedElementId: draggedElementId              ,
          dropZoneId      : dropZoneId                    , 
          idIntervention  : intervention.idIntervention   ,
          dispositifId    : dispositifData.idDispositif   ,
          dispositif      : dropZoneData.dispositif       ,
          intervention    : draggableElement.intervention }
  };

  MonitorOutputDispositif.actionOnDispositif(intervention.idIntervention, dispositifData.idDispositif, callMetaData);
};

MonitorOutputDispositifCs.prototype.setInterventionToDispositifReturn=function(serverData, metaData)
{
  var westPanel = Ext.getCmp('west-panel');
  westPanel.remove('interventionTicket_'+metaData.idIntervention);
  //note: pas besoin de mettre a jour la drop zone, le reverse ajax d'update le mettra a jour tout seul
};

MonitorOutputDispositifCs.prototype.buildInterventionInfoForDispositif=function(dispositif)
{
  var info = [
              '<div class="DispositifInterOrigineMotif"><span class="DispositifInterNomVictimeOrigine">',
              crfIrpUtils.getLabelFor('OriginesIntervention',dispositif['currentIntervention.idOrigine'        ]),
              '</span> - <span class="DispositifInterMotif">',
              crfIrpUtils.getLabelFor('MotifsIntervention'  ,dispositif['currentIntervention.idMotif'          ]),
              '</span> </div><div class="DispositifInterVictime"><span class="DispositifInterNomVictime">',
              (dispositif['currentIntervention.victimeHomme'              ]?'Mr ':'Mme '),
               dispositif['currentIntervention.nomVictime'                ], 
              '</span> - <span class="DispositifInterRue">',
              dispositif['currentIntervention.position.rue'              ],
              '</span>, <span class="DispositifInterCodePostal">',
              dispositif['currentIntervention.position.codePostal'       ],
              '</span>, <span class="DispositifInterVille">',
              dispositif['currentIntervention.position.ville'            ],
              '</span></div><div class="DispositifInterContact"><span class="DispositifInterNomContact">',
              dispositif['currentIntervention.nomContactSurPlace'        ],
              '</span> - <span class="DispositifInterCoordonneesContact">',
              dispositif['currentIntervention.coordonneesContactSurPlace'],
              '</span></div>'
              ];
  return info.join('');
};


MonitorOutputDispositifCs.prototype.updateAddress=function()
{
  var rue       =$('dispositifEvacAddressRue'       );
  var codePostal=$('dispositifEvacAddressCodePostal');
  var ville     =$('dispositifEvacAddressVille'     );

  rue       .value=rue       .value.strip();
  codePostal.value=codePostal.value.strip();
  ville     .value=ville     .value.strip();
  
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