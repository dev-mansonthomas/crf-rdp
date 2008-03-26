var MonitorOutputDispositifCs = Class.create();

MonitorOutputDispositifCs.prototype.initialize=function()
{
  MonitorOutputDispositif.initScriptSession();
  PageBus.subscribe("list.loaded",  this, this.initDispositifGrid, null, null);
};

/*

{id:'dhDebutDCol'            , header: "Date Début Vac." , width: 120, sortable: true, renderer: Ext.util.Format.dateRenderer('d/m/Y H:i:s'), dataIndex: 'dhDebut'},
{id:'dhFinDCol'              , header: "Date Fin Vac."   , width: 120, sortable: true, renderer: Ext.util.Format.dateRenderer('d/m/Y H:i:s'), dataIndex: 'dhFin'},

{name: 'dhDebut'           , type: 'date'   ,dateFormat:'Y-m-d\\TH:i:s'},
{name: 'dhFin'             , type: 'date'   ,dateFormat:'Y-m-d\\TH:i:s'},
  
  
 * */

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
                       {name: 'dhArriveeRenfortMedical'   , type: 'date'    ,dateFormat:'Y-m-d\\TH:i:s'}                       
                       
                   ]
               })
           });

           
    var expander = new xg.RowExpander({
        tpl : new Ext.Template(
            '<p><b>id:</b> {idDispositif}<br>',
            '<p><b>comments:</b> {displayState}</p>'
        )
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
            forceFit:true,
            enableRowBody:true,
            getRowClass:moDispositifCs.buildDispositifRowBody
        },
        collapsible: false,
        animCollapse: false,
        height:400,
        iconCls: 'icon-grid',
        renderTo: 'center-dispositif-list'
    });
  grid1.getStore().load();
};



MonitorOutputDispositifCs.prototype.buildDispositifRowBody=function(record, rowIndex, p, dataStore)
{
/*
 * 
<table style="width:100%;">
  <tr>
    <td>
      <div><span>CI : </span><span>Thomas Arecki&nbsp;&nbsp;&nbsp;&nbsp;</span><span>Intervention en cours :</span></div>
    </td>
    <td rowspan="2" style="width:130px;">
      <input type="button" value="Action"   style="width:125px;height:50px;"/><br/>
    </td>    
    <td rowspan="2" style="width:130px;">
      <input type="button" value="Editer Dispositif"   style="width:125px;"/><br/>
      <input type="button" value="Editer Intervention" style="width:125px;"/>
    </td>
  </tr>
  <tr>
    <td style="border:solid #CA7173 1px;">
       Pas d'intervention
    </td>
    </tr>
  <tr> 
    <td colspan="2" style="border-top:solid #9D9D9D 1px;">
      Dernière Position : 121 rue édouard vaillant, 92100, Levallois
    </td>  
  </tr>
</table>
 * 
 * */	
	
	
  p.body='<p>coucou</p>';
  return 'x-grid3-row-expanded';
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

MonitorOutputDispositifCs.prototype.addDispositif=function()
{
  this.monitorInputWindow = monitorOutputCs.getMonitorInputRef();
  this.monitorInputWindow.miDispositifCs.displayAddDispositif();
};

MonitorOutputDispositifCs.prototype.updateDispositif = function (dispositif)
{
  alert('ToDo');
};

MonitorOutputDispositifCs.prototype.computeNextState=function(currentState)
{
};