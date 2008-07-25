

 var DispositifRecord = Ext.data.Record.create(
                         {name: 'idDispositif'                  , mapping: 'idDispositif'                 },
                         {name: 'idTypeDispositif'              , mapping: 'idTypeDispositif'             },
                         {name: 'idEtatDispositif'              , mapping: 'idEtatDispositif'             },
                         {name: 'idDelegation'                  , mapping: 'idDelegation'                 },
                         {name: 'displayState'                  , mapping: 'displayState'                 },
                         {name: 'dispositifBackWith3Girls'      , mapping: 'dispositifBackWith3Girls'     },
                         {name: 'dispositifNotEnoughO2'         , mapping: 'dispositifNotEnoughO2'        },
                         {name: 'indicatifVehicule'             , mapping: 'indicatifVehicule'            },
                         {name: 'contactRadio'                  , mapping: 'contactRadio'                 },
                         {name: 'contactTel1'                   , mapping: 'contactTel1'                  },
                         {name: 'contactTel2'                   , mapping: 'contactTel2'                  },
                         {name: 'currentInterId'                , mapping: 'currentInterId'               },
                         {name: 'googleCoordsLat'               , mapping: 'googleCoordsLat'              },
                         {name: 'googleCoordsLong'              , mapping: 'googleCoordsLong'             },
                         {name: 'currentAddresseRue'            , mapping: 'currentAddresseRue'           },
                         {name: 'currentAddresseCodePostal'     , mapping: 'currentAddresseCodePostal'    },
                         {name: 'currentAdresseVille'           , mapping: 'currentAdresseVille'          },
                         {name: 'equipierCi.idEquipier'         , mapping: 'equipierCi.idEquipier'        },
                         {name: 'equipierCi.nom'                , mapping: 'equipierCi.nom'               },
                         {name: 'equipierCi.prenom'             , mapping: 'equipierCi.prenom'            },
                         {name: 'equipierCi.homme'              , mapping: 'equipierCi.homme'             },
                         {name: 'equipierCi.numNivol'           , mapping: 'equipierCi.numNivol'          },
                         {name: 'currentInterId'                , mapping: 'currentInterId'               },
                         {name: 'dhReception'                   , mapping: 'dhReception'                  },
                         {name: 'dhDepart'                      , mapping: 'dhDepart'                     },
                         {name: 'dhSurPlace'                    , mapping: 'dhSurPlace'                   },
                         {name: 'dhBilanPrimaire'               , mapping: 'dhBilanPrimaire'              },
                         {name: 'dhBilanSecondaire'             , mapping: 'dhBilanSecondaire'            },
                         {name: 'dhQuitteLesLieux'              , mapping: 'dhQuitteLesLieux'             },
                         {name: 'dhArriveeHopital'              , mapping: 'dhArriveeHopital'             },
                         {name: 'dhDispo'                       , mapping: 'dhDispo'                      },
                         {name: 'dhASaBase'                     , mapping: 'dhASaBase'                    },
                         {name: 'dhAppelRenfortMedical'         , mapping: 'dhAppelRenfortMedical'        },
                         {name: 'dhArriveeRenfortMedical'       , mapping: 'dhArriveeRenfortMedical'      },
                         {name:'currentIntervention.idOrigine'  , mapping:'currentIntervention.idOrigine' },
                         {name:'currentIntervention.idMotif'    , mapping:'currentIntervention.idMotif'   },
                         {name:'currentIntervention.rue'        , mapping:'currentIntervention.rue'       },
                         {name:'currentIntervention.codePostal' , mapping:'currentIntervention.codePostal'},
                         {name:'currentIntervention.ville'      , mapping:'currentIntervention.ville'     }
                       );


var MonitorOutputDispositifCs = Class.create();

MonitorOutputDispositifCs.prototype.initialize=function()
{
  MonitorOutputDispositif.initScriptSession();
  PageBus.subscribe("list.loaded",  this, this.initDispositifGrid, null, null);
};

/*

{id:'dhDebutDCol'            , header: "Date D�but Vac." , width: 120, sortable: true, renderer: Ext.util.Format.dateRenderer('d/m/Y H:i:s'), dataIndex: 'dhDebut'},
{id:'dhFinDCol'              , header: "Date Fin Vac."   , width: 120, sortable: true, renderer: Ext.util.Format.dateRenderer('d/m/Y H:i:s'), dataIndex: 'dhFin'},

{name: 'dhDebut'           , type: 'date'   ,dateFormat:'Y-m-d\\TH:i:s'},
{name: 'dhFin'             , type: 'date'   ,dateFormat:'Y-m-d\\TH:i:s'},


 * */

MonitorOutputDispositifCs.prototype.initDispositifGrid=function()
{
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
                       {name: 'idDispositif'              , type: 'int'    },
                       {name: 'idTypeDispositif'          , type: 'int'    },
                       {name: 'idEtatDispositif'          , type: 'int'    },
                       {name: 'idDelegation'              , type: 'int'    },
                       {name: 'displayState'              , type: 'int'    },
                       {name: 'dispositifBackWith3Girls'  , type: 'boolean'},
                       {name: 'dispositifNotEnoughO2'     , type: 'boolean'},
                       {name: 'indicatifVehicule'         , type: 'string' },
                       {name: 'contactRadio'              , type: 'string' },
                       {name: 'contactTel1'               , type: 'string' },
                       {name: 'contactTel2'               , type: 'string' },
                       {name: 'currentInterId'            , type: 'int'    },
                       {name: 'googleCoordsLat'           , type: 'float'  },
                       {name: 'googleCoordsLong'          , type: 'float'  },
                       {name: 'currentAddresseRue'        , type: 'string' },
                       {name: 'currentAddresseCodePostal' , type: 'string' },
                       {name: 'currentAdresseVille'       , type: 'string' },
                       {name: 'equipierCi.idEquipier'     , type: 'string' },
                       {name: 'equipierCi.nom'            , type: 'string' },
                       {name: 'equipierCi.prenom'         , type: 'string' },
                       {name: 'equipierCi.homme'          , type: 'boolean' },
                       {name: 'equipierCi.numNivol'       , type: 'string' },
                       /*{name: 'equipierCi.delegation.idDelegation', type: 'int' },*/
                       {name: 'currentInterId'            , type: 'int' },

                       {name: 'dhReception'               , type: 'date'    ,dateFormat:'Y-m-d\\TH:i:s'},
                       {name: 'dhDepart'                  , type: 'date'    ,dateFormat:'Y-m-d\\TH:i:s'},
                       {name: 'dhSurPlace'                , type: 'date'    ,dateFormat:'Y-m-d\\TH:i:s'},
                       {name: 'dhBilanPrimaire'           , type: 'date'    ,dateFormat:'Y-m-d\\TH:i:s'},
                       {name: 'dhBilanSecondaire'         , type: 'date'    ,dateFormat:'Y-m-d\\TH:i:s'},
                       {name: 'dhQuitteLesLieux'          , type: 'date'    ,dateFormat:'Y-m-d\\TH:i:s'},
                       {name: 'dhArriveeHopital'          , type: 'date'    ,dateFormat:'Y-m-d\\TH:i:s'},
                       {name: 'dhDispo'                   , type: 'date'    ,dateFormat:'Y-m-d\\TH:i:s'},
                       {name: 'dhASaBase'                 , type: 'date'    ,dateFormat:'Y-m-d\\TH:i:s'},
                       {name: 'dhAppelRenfortMedical'     , type: 'date'    ,dateFormat:'Y-m-d\\TH:i:s'},
                       {name: 'dhArriveeRenfortMedical'   , type: 'date'    ,dateFormat:'Y-m-d\\TH:i:s'},

                       {name:'currentIntervention.idOrigine' , type:'int'   },
                       {name:'currentIntervention.idMotif'   , type:'int'   },
                       {name:'currentIntervention.rue'       , type:'string'},
                       {name:'currentIntervention.codePostal', type:'string'},
                       {name:'currentIntervention.ville'     , type:'string'}





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
            {id:'contactTelsDispositifDCol' , header: "T�l�phones"      , width: 150, sortable: true, dataIndex: 'contactTel1'       , renderer:moDispositifCs.contactTelsCellRenderer},
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
  {
    detailIntervention = MonitorOutputDispositifCs.prototype.buildInterventionInfoForDispositif(record.json.currentIntervention, record.json);
  }

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
'      <span>Derni�re Position : </span><span>',record.data.currentAddresseRue,', '+record.data.currentAddresseCodePostal,', '+record.data.currentAdresseVille,'</span>',
'    </td>',
'    <td style="border-top:solid #9D9D9D 1px;">',
'<img src="',contextPath,'/img/famfamfam/map_magnify.png" class=""  onClick="moDispositifCs.showDispositif(',record.data.idDispositif,',',record.data.googleCoordsLat,',',record.data.googleCoordsLong,')"/>',
'    </td>',
'  </tr>',
'</table>'];
  p.body=template.join('');
  return 'x-grid3-row-expanded';
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

MonitorOutputDispositifCs.prototype.editDispositif  =function(idDispositif){

  this.monitorInputWindow = monitorOutputCs.getMonitorInputRef();
  this.monitorInputWindow.miDispositifCs.editDispositif(idDispositif);
};

MonitorOutputDispositifCs.prototype.editIntervention=function(idIntervention){
  alert(idIntervention);
};
MonitorOutputDispositifCs.prototype.action          =function(idDispositif, idIntervention){
  

};
MonitorOutputDispositifCs.prototype.showDispositif  =function(idDispositif, latitude, longitude){
  alert(idDispositif+' '+latitude+' '+longitude);
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


MonitorOutputDispositifCs.prototype.editFicheInter=function(idDispositif, idInter)
{
  this.monitorInputWindow.monitorInputCs.testCrossWindow();
};

MonitorOutputDispositifCs.prototype.updateDispositif = function (dispositif)
{
  var store      = Ext.getCmp('DispositifListGrid').getStore();

  var newDispositif = new DispositifRecord({'idDispositif'                   : dispositif.idDispositif,
 'idTypeDispositif'               : dispositif.idTypeDispositif,
 'idEtatDispositif'               : dispositif.idEtatDispositif,
 'idDelegation'                   : dispositif.idDelegation,
 'displayState'                   : dispositif.displayState,
 'dispositifBackWith3Girls'       : dispositif.dispositifBackWith3Girls,
 'dispositifNotEnoughO2'          : dispositif.dispositifNotEnoughO2,
 'indicatifVehicule'              : dispositif.indicatifVehicule,
 'contactRadio'                   : dispositif.contactRadio,
 'contactTel1'                    : dispositif.contactTel1,
 'contactTel2'                    : dispositif.contactTel2,
 'currentInterId'                 : dispositif.currentInterId,
 'googleCoordsLat'                : dispositif.googleCoordsLat,
 'googleCoordsLong'               : dispositif.googleCoordsLong,
 'currentAddresseRue'             : dispositif.currentAddresseRue,
 'currentAddresseCodePostal'      : dispositif.currentAddresseCodePostal,
 'currentAdresseVille'            : dispositif.currentAdresseVille,
 'equipierCi.idEquipier'          : dispositif.equipierCi.idEquipier,
 'equipierCi.nom'                 : dispositif.equipierCi.nom,
 'equipierCi.prenom'              : dispositif.equipierCi.prenom,
 'equipierCi.homme'               : dispositif.equipierCi.homme,
 'equipierCi.numNivol'            : dispositif.equipierCi.numNivol,
 'currentInterId'                 : dispositif.currentInterId,
 'dhReception'                    : dispositif.dhReception,
 'dhDepart'                       : dispositif.dhDepart,
 'dhSurPlace'                     : dispositif.dhSurPlace,
 'dhBilanPrimaire'                : dispositif.dhBilanPrimaire,
 'dhBilanSecondaire'              : dispositif.dhBilanSecondaire,
 'dhQuitteLesLieux'               : dispositif.dhQuitteLesLieux,
 'dhArriveeHopital'               : dispositif.dhArriveeHopital,
 'dhDispo'                        : dispositif.dhDispo,
 'dhASaBase'                      : dispositif.dhASaBase,
 'dhAppelRenfortMedical'          : dispositif.dhAppelRenfortMedical,
 'dhArriveeRenfortMedical'        : dispositif.dhArriveeRenfortMedical,
 'currentIntervention.idOrigine'  : dispositif.currentIntervention.idOrigine,
 'currentIntervention.idMotif'    : dispositif.currentIntervention.idMotif,
 'currentIntervention.rue'        : dispositif.currentIntervention.rue,
 'currentIntervention.codePostal' : dispositif.currentIntervention.codePostal,
 'currentIntervention.ville'      : dispositif.currentIntervention.ville,
 'dispositif':dispositif
 });
  store.add(newDispositif);
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

  MonitorOutputDispositif.setInterventionToDispositif(intervention.idIntervention, dispositifData.idDispositif, callMetaData);
};

MonitorOutputDispositifCs.prototype.setInterventionToDispositifReturn=function(serverData, metaData)
{
  var westPanel = Ext.getCmp('west-panel');
  westPanel.remove('interventionTicket_'+metaData.idIntervention);
  var el = Ext.get(metaData.dropZoneId);
  el.update(MonitorOutputDispositifCs.prototype.buildInterventionInfoForDispositif(metaData.intervention, metaData.dispositif));
  
};

MonitorOutputDispositifCs.prototype.buildInterventionInfoForDispositif=function(intervention, dispositif)
{
  var info = [
              '<div class="DispositifInterOrigineMotif"><span class="DispositifInterNomVictimeOrigine">',
              crfIrpUtils.getLabelFor('OriginesIntervention',intervention.idOrigine),
              '</span> - <span class="DispositifInterMotif">',
              crfIrpUtils.getLabelFor('MotifsIntervention'  ,intervention.idMotif  ),
              '</span> </div><div class="DispositifInterVictime"><span class="DispositifInterNomVictime">',
              (intervention.victimeHomme?'Mr ':'Mme '),
              intervention.nomVictime, 
              '</span> - <span class="DispositifInterRue">',
              intervention.rue,
              '</span>, <span class="DispositifInterCodePostal">',
              intervention.codePostal,
              '</span>, <span class="DispositifInterVille">',
              intervention.ville,
              '</span></div><div class="DispositifInterContact"><span class="DispositifInterNomContact">',
              intervention.nomContactSurPlace,
              '</span> - <span class="DispositifInterCoordonneesContact">',
              intervention.coordonneesContactSurPlace,
              '</span></div>'
              ];
  return info.join('');
};
