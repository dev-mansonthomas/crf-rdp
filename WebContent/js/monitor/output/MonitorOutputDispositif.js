var MonitorOutputDispositifCs = Class.create();

MonitorOutputDispositifCs.prototype.initialize=function()
{
  MonitorOutputDispositif.initScriptSession();
  custumEventPS.subscribe("ListLoaded", this.initDispositifGrid);
};

MonitorOutputDispositifCs.prototype.initDispositifGrid=function()
{
  var xg = Ext.grid;
  
  var dataStore1 = new Ext.data.Store({
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
                       {name: 'idDispositif'      , type: 'int'    },
                       {name: 'idTypeDispositif'  , type: 'int'    },
                       {name: 'idEtatDispositif'  , type: 'int'    },
                       {name: 'idDelegation'      , type: 'int'    },
                       {name: 'displayState'      , type: 'int'    },
                       {name: 'creationTerminee'  , type: 'boolean'},
                       {name: 'dhDebut'           , type: 'date'   ,dateFormat:'Y-m-d\\TH:i:s'},
                       {name: 'dhFin'             , type: 'date'   ,dateFormat:'Y-m-d\\TH:i:s'},
                       {name: 'indicatifVehicule' , type: 'string' },
                       {name: 'autreDelegation'   , type: 'string' }
                   ]
               })
           });
           

  var grid1 = new xg.GridPanel({
        id:'DispositifListGrid',
        store: dataStore1,
        cm: new xg.ColumnModel([
            {id:'idDCol'                 , header: "Id"              , width: 30 , sortable: true, dataIndex: 'idDispositif'     },
            {id:'indicatifVehiculeDCol'  , header: "Indicatif"       , width: 150, sortable: true, dataIndex: 'indicatifVehicule'},
            {id:'idTypeDispositifDCol'   , header: "Type"            , width: 150, sortable: true, dataIndex: 'idTypeDispositif' , renderer:moDispositifCs.typeCellRenderer},
            {id:'dhDebutDCol'            , header: "Date Début Vac." , width: 120, sortable: true, renderer: Ext.util.Format.dateRenderer('d/m/Y H:i:s'), dataIndex: 'dhDebut'},
            {id:'dhFinDCol'              , header: "Date Fin Vac."   , width: 120, sortable: true, renderer: Ext.util.Format.dateRenderer('d/m/Y H:i:s'), dataIndex: 'dhFin'},
            {id:'idEtatDispositifDCol'   , header: "Etat"            , width: 150, sortable: true, dataIndex: 'idEtatDispositif' , renderer:moDispositifCs.etatDispositifCellRenderer}
        ]),
        viewConfig: {
            forceFit:true
        },
        collapsible: false,
        animCollapse: false,
        height:400,
        iconCls: 'icon-grid',
        renderTo: 'center-dispositif-list'
    });
  grid1.getStore().load();
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

MonitorOutputDispositifCs.prototype.loadAllDispositif=function()
{
  MonitorOutputDispositif.getAllDispositif(moDispositifCs.loadAllDispositifReturn);
};

MonitorOutputDispositifCs.prototype.loadAllDispositifReturn=function(dispositifList)
{
  for(i=0,count=dispositifList.length; i<count; i++)
    moDispositifCs.updateDispositif(dispositifList[i]);
};


MonitorOutputDispositifCs.prototype.editFicheInter=function(idDispositif, idInter)
{
  this.monitorInputWindow.monitorInputCs.testCrossWindow();
};

MonitorOutputDispositifCs.prototype.addDispositif=function()
{
  this.monitorInputWindow = monitorOutputCs.getMonitorInputRef();
  this.monitorInputWindow.miDispositifCs.displayAddDispositif();
};

MonitorOutputDispositifCs.prototype.updateDispositif = function (dispositif)
{
  //TODO : authoriser les autres types une fois que les templates auront été fait.
  if(dispositif.idTypeDispositif != null && dispositif.idTypeDispositif == 1)
  {
    if( $('dispositif_'+dispositif.idDispositif) == null)
    {/*Si le dispositif n'existe pas sur la page on le créé*/
      new Insertion.Bottom('center-dispositif-list',this.dispositifTemplates[dispositif.idTypeDispositif].evaluate({id:dispositif.idDispositif}));
      $('dispositif_'+dispositif.idDispositif).style.display="block";
    }
  
    dwr.util.setValue('dispositif_indicatif_'+dispositif.idDispositif, dispositif.indicatifVehicule);
    dwr.util.setValue('dispositif_etat_'     +dispositif.idDispositif, crfIrpUtils.getLabelFor('EtatsDispositif', dispositif.idEtatDispositif));
    dwr.util.setValue('dispositif_etat_id_'  +dispositif.idDispositif, dispositif.idEtatDispositif);
  }
};

MonitorOutputDispositifCs.prototype.computeNextState=function(currentState)
{
};


MonitorOutputDispositifCs.prototype.dispositifTemplates = Array();
/*Samu*/
MonitorOutputDispositifCs.prototype.dispositifTemplates[1] = new Template('\
<input type="hidden" id="dispositif_current_inter_id_#{id}" name="dispositif_current_inter_id_#{id}" value=""/>\
<div        id="dispositif_#{id}"         class="samu_cadre" style="display:none;">\
  <div      id="dispositif_cadre_entete_#{id}"  class="samu_cadre_entete">\
    <table  id="dispositif_horaires_#{id}"      class="samu_horaires">\
      <tr   id="dispositif_hour_list_#{id}"     class="samu_hour_list">\
        <td id="dispositif_cadre_title_#{id}"   class="samu_cadre_title">\
          SAMU - <span id="dispositif_indicatif_#{id}">XXXXX</span>\
        </td>\
        <th id="dispositif_call_title_#{id}"       class="samu_hour_title">Appel SAMU</th>\
        <th id="dispositif_trans_title_#{id}"      class="samu_hour_title">Tr. ASM</th>\
        <th id="dispositif_leave_title_#{id}"      class="samu_hour_title">d&eacute;part ASM</th>\
        <th id="dispositif_present_title_#{id}"    class="samu_hour_title">ASM se pr&eacute;sente</th>\
        <th id="dispositif_primaire_title_#{id}"   class="samu_hour_title">Primaire</th>\
        <th id="dispositif_secondaire_title_#{id}" class="samu_hour_title">Secondaire</th>\
        <th id="dispositif_transport_title_#{id}"  class="samu_hour_title">Transport vers H</th>\
        <th id="dispositif_bilan_comp_title_#{id}" class="samu_hour_title">Bilan comp.</th>\
        <th id="dispositif_hospital_title_#{id}"   class="samu_hour_title">Arriv&eacute; H.</th>\
      </tr>\
      <tr>\
        <td id="dispositif_ci_#{id}" class="samu_ci">CI: Super CI\
          <div id="dispositif_equip_#{id}" class="samu_equip">\
            Chauffeur : Super Chauffeur<br/>\
            CFA : Super CFA<br/>\
            CFA : Super CFA<br/>\
            CFA : Super CFA\
          </div>\
        </td> \
        <td id="dispositif_call_#{id}"        class="samu_hour">88h88</td>\
        <td id="dispositif_trans_#{id}"       class="samu_hour">88h88</td>\
        <td id="dispositif_leave_#{id}"       class="samu_hour">88h88</td>\
        <td id="dispositif_present_#{id}"     class="samu_hour">88h88</td>\
        <td id="dispositif_primaire_#{id}"    class="samu_hour">88h88</td>\
        <td id="dispositif_secondaire_#{id}"  class="samu_hour">88h88</td>\
        <td id="dispositif_transport_#{id}"   class="samu_hour">88h88</td>\
        <td id="dispositif_bilan_comp_#{id}"  class="samu_hour">88h88</td>\
        <td id="dispositif_hospital_#{id}"    class="samu_hour">88h88</td>\
      </tr>\
    </table>\
  </div>  \
  <div   id="dispositif_buttons_#{id}" class="samu_buttons">\
    <div class="samu_etat">\
      <div class="label">\
        Etat <input type="hidden" id="dispositif_etat_id_#{id}" name="dispositif_etat_id_#{id}" value=""/>\
      </div>\
      <div id="dispositif_etat_#{id}">--------</div>\
    </div>\
    <div  class="samu_action">\
      <div class="label">\
        Action\
      </div>\
        <div id="dispositif_action_#{id}">--------</div>\
    </div>\
    <div id="dispositif_editerFiche_#{id}" class="samu_editerFiche" onClick="monitorOutputCs.editFicheInter();">\
      Editer fiche\
    </div>\
    <div class="samu_victime">\
      <div class="label">\
        victime\
      </div>\
      <div id="dispositif_victime_#{id}">no victim</div>\
    </div>\
    <div id="dispositif_address_#{id}" class="samu_address">\
    -------\
    </div>\
  </div>\
</div>\
<br/>\
');