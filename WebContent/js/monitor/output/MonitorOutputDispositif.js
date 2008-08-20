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

MonitorOutputDispositifCs.prototype.initialize=function()
{
  MonitorOutputDispositif.initScriptSession();

  this.listLoaded     = false;
  this.listLieuLoaded = false;

  
  PageBus.subscribe("list.loaded"         ,  this, this.initDispositifGrid, null, null);
  PageBus.subscribe("listLieu.loaded"     ,  this, this.initLieuOnMap     , null, null);
  PageBus.subscribe("listLieu.loaded"     ,  this, this.initDispositifGrid, null, null);
};

/*

{id:'dhDebutDCol'            , header: "Date Début Vac." , width: 120, sortable: true, renderer: Ext.util.Format.dateRenderer('d/m/Y H:i:s'), dataIndex: 'dhDebut'},
{id:'dhFinDCol'              , header: "Date Fin Vac."   , width: 120, sortable: true, renderer: Ext.util.Format.dateRenderer('d/m/Y H:i:s'), dataIndex: 'dhFin'},

{name: 'dhDebut'           , type: 'date'   ,dateFormat:'Y-m-d\\TH:i:s'},
{name: 'dhFin'             , type: 'date'   ,dateFormat:'Y-m-d\\TH:i:s'},


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


MonitorOutputDispositifCs.prototype.initLieuOnMap=function()
{
  this.initListLieuWindow();
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
    
    var tabHtml = [];
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
        '<span class="ListLieuListName">',lieu.nom,'</span><br/>',
        '<span class="ListLieuListAddress">',lieu.addresse,', ',lieu.codePostal,', ',lieu.ville,'</span><br/>',
        '<p class="ListLieuListHtml">',lieu.infoComplementaire,'</p>',
      '</div>'].join('');

      tabHtml.push(htmlListLieu);
    }

    listLieuTabs.add({
        id      : listLieuTabId ,
        title   : catLieuName   ,
        iconCls : 'tabs'        , //TODO : mettre l'icone de la catégorie
        html    : tabHtml       ,
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
      map.showDirection(cat);
  }
  else
  {
    td.toggleClass('type-lieu-selected');//remove
    td.toggleClass('type-lieu-unselected');//add
    map.hideACategoryOfMarker(cat);
    if(cat == 'lieu_cat_9')//ambulance
      map.hideDirection(cat);

  }
  
};
MonitorOutputDispositifCs.prototype.listLieuFromCategory=function(idCategory)
{
  var cat = 'list-lieu-window-tabs_'+idCategory;
  var win = MonitorOutputDispositifCs.prototype.listLieuWindow;
  
  var tabs = Ext.getCmp('list-lieu-window-tabsCmp');
  tabs.activate(cat);

  win.show();
};

MonitorOutputDispositifCs.prototype.displayLieu=function(idTypeLieu, lieuId)
{
  var map      = Ext.getCmp('center-carte-paris-panel');
  var category = 'lieu_cat_'+idTypeLieu;
  map.focusMarker(category, lieuId);
};
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
          remoteSort:false,
              reader: new Ext.data.JsonReader({
                root: 'data',
       totalProperty: 'totalCount',
              fields:
                   [
{name: 'idDispositif'                                    , type: 'int'    },
{name: 'idTypeDispositif'                                , type: 'int'    },
{name: 'idEtatDispositif'                                , type: 'int'    },
{name: 'idDelegation'                                    , type: 'int'    },
{name: 'displayState'                                    , type: 'int'    },
{name: 'dispositifBackWith3Girls'                        , type: 'boolean'},
{name: 'dispositifNotEnoughO2'                           , type: 'boolean'},
{name: 'indicatifVehicule'                               , type: 'string' },
{name: 'contactRadio'                                    , type: 'string' },
{name: 'contactTel1'                                     , type: 'string' },
{name: 'contactTel2'                                     , type: 'string' },
{name: 'equipierCi.idEquipier'                           , type: 'string' },
{name: 'equipierCi.nom'                                  , type: 'string' },
{name: 'equipierCi.prenom'                               , type: 'string' },
{name: 'equipierCi.homme'                                , type: 'boolean'},
{name: 'equipierCi.numNivol'                             , type: 'string' },
{name: 'currentInterId'                                  , type: 'int'    },

{name: 'dhReception'                                     , type: 'date'    ,dateFormat:'Y-m-d\\TH:i:s'},
{name: 'dhDepart'                                        , type: 'date'    ,dateFormat:'Y-m-d\\TH:i:s'},
{name: 'dhSurPlace'                                      , type: 'date'    ,dateFormat:'Y-m-d\\TH:i:s'},
{name: 'dhBilanPrimaire'                                 , type: 'date'    ,dateFormat:'Y-m-d\\TH:i:s'},
{name: 'dhBilanSecondaire'                               , type: 'date'    ,dateFormat:'Y-m-d\\TH:i:s'},
{name: 'dhQuitteLesLieux'                                , type: 'date'    ,dateFormat:'Y-m-d\\TH:i:s'},
{name: 'dhArriveeHopital'                                , type: 'date'    ,dateFormat:'Y-m-d\\TH:i:s'},
{name: 'dhDispo'                                         , type: 'date'    ,dateFormat:'Y-m-d\\TH:i:s'},
{name: 'dhASaBase'                                       , type: 'date'    ,dateFormat:'Y-m-d\\TH:i:s'},
{name: 'dhAppelRenfortMedical'                           , type: 'date'    ,dateFormat:'Y-m-d\\TH:i:s'},
{name: 'dhArriveeRenfortMedical'                         , type: 'date'    ,dateFormat:'Y-m-d\\TH:i:s'},

{name:'currentIntervention.idOrigine'                    , type: 'int'     },
{name:'currentIntervention.idMotif'                      , type: 'int'     },
{name:'currentIntervention.idEtat'                       , type: 'int'     },
{name:'currentIntervention.position.rue'                 , type: 'string'  },
{name:'currentIntervention.position.codePostal'          , type: 'string'  },
{name:'currentIntervention.position.ville'               , type: 'string'  },
{name:'currentIntervention.position.googleCoordsLat'     , type: 'float'   },
{name:'currentIntervention.position.googleCoordsLong'    , type: 'float'   },

{name: 'currentIntervention.dhSaisie'                    , type: 'date'    ,dateFormat:'Y-m-d\\TH:i:s'},
{name: 'currentIntervention.victimeHomme'                , type: 'boolean'},
{name: 'currentIntervention.nomVictime'                  , type: 'string' },
{name: 'currentIntervention.nomContactSurPlace'          , type: 'string' },
{name: 'currentIntervention.coordonneesContactSurPlace'  , type: 'string' },

{name:'currentPosition.empty'                            , type: 'boolean' },
{name:'currentPosition.rue'                              , type: 'string'  },
{name:'currentPosition.codePostal'                       , type: 'string'  },
{name:'currentPosition.ville'                            , type: 'string'  },
{name:'currentPosition.googleCoordsLat'                  , type: 'float'   },
{name:'currentPosition.googleCoordsLong'                 , type: 'float'   },

{name:'previousPosition.empty'                           , type: 'boolean' },
{name:'previousPosition.rue'                             , type: 'string'  },
{name:'previousPosition.codePostal'                      , type: 'string'  },
{name:'previousPosition.ville'                           , type: 'string'  },
{name:'previousPosition.googleCoordsLat'                 , type: 'float'   },
{name:'previousPosition.googleCoordsLong'                , type: 'float'   }
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
        },/*
        tbar        :[{
            text:'Init Dropzone',
            tooltip:'Init drop zone',
            iconCls:'downloadSelected',
            handler: function(button,event)
            {
              MonitorOutputDispositifCs.prototype.initDropZone();
            }
       }
        ],*/
        collapsible : false,
        animCollapse: false,
        height      : 1800,
        iconCls     : 'icon-grid',
        renderTo    : 'center-dispositif-list'
    });
  grid1.getStore().load();
};



MonitorOutputDispositifCs.prototype.buildDispositifRowBody=function(record, rowIndex, p, dataStore)
{
  var detailIntervention = 'Aucune intervention en cours';

  if(record.data.currentInterId != 0)
    detailIntervention = MonitorOutputDispositifCs.prototype.buildInterventionInfoForDispositif(record.data);


  var template = ['<table id="DispositifRowDetail_',  record.data.idDispositif,'" style="width:100%;">',
'  <tr>',
'    <td style="height:11px;font-size:14px;">',
'      <div><span>CI : </span><span>', record.data["equipierCi.nom"]+' '+record.data["equipierCi.prenom"] ,'</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>Intervention en cours :</span></div>',
'    </td>',
'    <td rowspan="2" style="width:130px;">',
'      <input type="button" value="Action"   style="width:130px;height:60px;" onClick="moDispositifCs.action(',record.data.idDispositif,',',record.data.currentInterId,')"/><br/>',
'    </td>',
'    <td rowspan="2" style="width:130px;">',
'      <input type="button" value="Editer Dispositif"    onClick="moDispositifCs.editDispositif(', record.data.idDispositif,')" style="width:125px;height:27px;margin-bottom:5px;"/><br/>',
'      <input type="button" value="Editer Intervention"  onClick="moDispositifCs.editIntervention(',record.data.currentInterId,')" style="width:125px;height:27px;"/>',
'    </td>',
'  </tr>',
'  <tr>',
'    <td class="interventionDropZone" id="dispositifDz_',record.data.idTypeDispositif,'_',record.data.idDispositif,'_',rowIndex,'">',
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

  return 'x-grid3-row-expanded';
};

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
      var title    = 'N°'+dispositif.currentInterId+' - '+dhSaisie+' - '+origine+' - '+motif;
      var html     = title +'<br/>'+
                     dispositif['currentIntervention.position.rue'         ]+', '+
                     dispositif['currentIntervention.position.codePostal'  ]+", "+
                     dispositif['currentIntervention.position.ville'       ];
    
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
    
    if( dispositif["previousPosition.empty"]==false || 
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
        fromAddress    : dispositif["previousPosition.rue"]+', '+ dispositif["previousPosition.codePostal"]+', '+dispositif["previousPosition.ville"],
        toAddress      : dispositif["currentPosition.rue" ]+', '+ dispositif["currentPosition.codePostal" ]+', '+dispositif["currentPosition.ville" ],
        category       : category,
        businessId     : dispositif.idDispositif,
        title          : title,
        html           : html
      });
    }
    else
    {
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


MonitorOutputDispositifCs.prototype.initDropZoneAdd  =function(store, records, options)
{
  window.setTimeout(function(){MonitorOutputDispositifCs.prototype.initDropZone(store, records, options);}, 200)
};

MonitorOutputDispositifCs.prototype.initDropZone  =function(store, records, options)
{
  if(console)
    console.log('adding drop zone');
  var rowIndex = 0;
  if(records != null)
    records.each(function(rowData){
      Ext.ux.MonitorOutput.dd.addDropZone('dispositifDz_'+rowData.data.idTypeDispositif+'_'+rowData.data.idDispositif+'_'+rowIndex,rowIndex++, rowData.data);
    });
  else
    if(console)
      console.log('No zone added');
};

MonitorOutputDispositifCs.prototype.editDispositif  =function(idDispositif)
{
  this.monitorInputWindow = monitorOutputCs.getMonitorInputRef();
  this.monitorInputWindow.miDispositifCs.editDispositif(idDispositif);
};

MonitorOutputDispositifCs.prototype.editIntervention=function(idIntervention)
{
  this.monitorInputWindow = monitorOutputCs.getMonitorInputRef();
  this.monitorInputWindow.miBilanCs.editBilan(idIntervention);
};
MonitorOutputDispositifCs.prototype.action          =function(idDispositif, idIntervention)
{
  var callMetaData = {
    callback:MonitorOutputDispositifCs.prototype.actionReturn,
    args:{idIntervention  : idIntervention,
          idDispositif    : idDispositif   
         }
  };
  MonitorOutputDispositif.actionOnDispositif(idIntervention, idDispositif, callMetaData);
};

MonitorOutputDispositifCs.prototype.actionReturn     =function(newIdEtatDispositif, metaData)
{
  alert('New Etat ' + newIdEtatDispositif + ' for dispositif : '+metaData.idDispositif+' intervention : '+metaData.idIntervention);
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
 
  if(queryResult!= null && queryResult.length > 0 && queryResult.get(0).data.idDispositif == dispositif.idDispositif)
    store.remove(queryResult.get(0));
  
  store.addSorted(newDispositif);
};


MonitorOutputDispositifCs.prototype.setInterventionToDispositif=function(draggableElement, dropZoneData)
{
  var draggedElementId = draggableElement.id          ;
  var intervention     = draggableElement.intervention;

  var dropZoneId       = dropZoneData.id        ;
  var dispositifData   = dropZoneData.dispositif;

  var callMetaData = {
    callback:MonitorOutputDispositifCs.prototype.setInterventionToDispositifReturn,
    args:{draggedElementId: draggedElementId              ,
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
  var el = Ext.get(metaData.dropZoneId);
  
  //on fait en sort que l'objet DWR ressemble a un Record Ext
  
  metaData.dispositif['currentIntervention.position.googleCoordsLat'  ]=metaData.intervention.position.googleCoordsLat  ;
  metaData.dispositif['currentIntervention.position.googleCoordsLong' ]=metaData.intervention.position.googleCoordsLong ;
  metaData.dispositif['currentIntervention.idOrigine'                 ]=metaData.intervention.idOrigine                 ;
  metaData.dispositif['currentIntervention.idMotif'                   ]=metaData.intervention.idMotif                   ;
  metaData.dispositif['currentIntervention.idEtat'                    ]=metaData.intervention.idEtat                    ;
  metaData.dispositif['currentIntervention.position.rue'              ]=metaData.intervention.position.rue              ;
  metaData.dispositif['currentIntervention.position.codePostal'       ]=metaData.intervention.position.codePostal       ;
  metaData.dispositif['currentIntervention.position.ville'            ]=metaData.intervention.position.ville            ;
  metaData.dispositif['currentIntervention.victimeHomme'              ]=metaData.intervention.victimeHomme              ;
  metaData.dispositif['currentIntervention.nomVictime'                ]=metaData.intervention.nomVictime                ;
  metaData.dispositif['currentIntervention.nomContactSurPlace'        ]=metaData.intervention.nomContactSurPlace        ;
  metaData.dispositif['currentIntervention.coordonneesContactSurPlace']=metaData.intervention.coordonneesContactSurPlace;

  
  el.update(MonitorOutputDispositifCs.prototype.buildInterventionInfoForDispositif(metaData.dispositif));
  
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
