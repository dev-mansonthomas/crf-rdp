var monitorInputCs          = null;

var miDispositifCs          = null;
var miCoRegulateurListCs    = null;
var miInterventionCs        = null;
var googleMapAdressResolver = null;
var miBilanCs               = null;
var miSMSCs                 = null;

var MonitorInputCs = Class.create();

/*to handle next focus of a field*/
var UtilsFocusList = [];

MonitorInputCs.prototype.initialize=function()
{
  //MonitorInput.initScriptSession();
};
MonitorInputCs.prototype.initRegulation=function()
{
  crfIrpUtils.getAllList();
  MonitorInput.getRegulation(monitorInputCs.initRegulationReturn);
};
MonitorInputCs.prototype.initRegulationReturn=function(Regulation)
{
  dwr.util.setValue('regulationId'   , Regulation.regulationId       );
  dwr.util.setValue('startDate'      , Regulation.startDateStr       );
  dwr.util.setValue('expectedEndDate', Regulation.expectedEndDateStr );
  dwr.util.setValue('open'           , Regulation.open?'Ouverte':'Fermée');
  dwr.util.setValue('regulateur'     , Regulation.regulateur.nom + ' ' + Regulation.regulateur.prenom   );
  dwr.util.setValue('label'          , Regulation.label          );
};

MonitorInputCs.prototype.testCrossWindow=function()
{
  alert('CrossWindowsCallSuccess');
};




function initLayout()
{
  //Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
  Ext.QuickTips.init();
  Ext.apply(Ext.QuickTips.getQuickTip(), { trackMouse: true});
  
/****************INTERVENTION*TICKET*************************/

    var interventionEditorToolbar = new Ext.Toolbar({ id     : 'InterventionPanelTopToolbar', 
                            hidden : true,
                            items  :[]//fin tableau d'item
                            });
  
  
  
  
  var interventionEditor={
    region        : 'center'                  ,
    split         : true                      ,
    contentEl     : 'InterventionPanel'       ,
    title         : 'Editeur d\'Intervention' ,
    deferredRender: false                     ,
    autoScroll    : true                      ,
    xtype         : 'panel'                   ,
    tbar          : interventionEditorToolbar
    
  };
  var interventionList={
  	id          : 'InterventionListEastPanel',
    region      : 'east',
    split       : true,
    contentEl   : 'InterventionList',
    title       : 'Liste des Tickets d\'Interventions',
    xtype       : 'panel',
    width       : 800,
    collapsible : true,
    layoutConfig: {
        animate:true
    }
  };
  
  
  var interventionPanel={
      id        : 'monitorInputInterventionPanel',
      title     : 'Gestion des Tickets d\'Interventions',
      closable  : false,
      autoScroll: true,
      layout    : 'border',
      tbar      : [new Ext.Action({
        text   : 'Ajouter un Ticket d\'Intervention',
        handler: function()
        {
          miInterventionCs.addIntervention();
        },
        iconCls: 'addButton'
      })
      ],
      items:[
        interventionEditor,
        interventionList
      ]
    };

    
    
/****************BILAN*************************/
  
  var bilanEditor={
    id            : 'monitorInputBilanEditorCenterPanel',
    region        : 'center',
    split         : true,
    autoScroll    : true,
    contentEl     : 'BilanPanel',
    title         : 'Editeur de Bilan',
    deferredRender: false,
    xtype         : 'panel',
    collapsible   : true,
    collapsed     : true,
    layout        :'accordion',
    layoutConfig  :{
        animate:true
    },
    items:[{
            id       : 'monitorInputBilanEditorCenterPanelIdentite',
            title    : 'Identité',
            contentEl: 'BilanIdentite',
            autoScroll: true,
            border   : false,
            iconCls  : 'settings'
          },
          {
            id       : 'monitorInputBilanEditorCenterPanelBilanSecouristeInitial',
            title    : 'Bilan Secouriste Initial',
            contentEl: 'BilanBilanSecouristeInitial',
            autoScroll: true,
            border   : false,
            iconCls  : 'settings'
          },
          {
            id       : 'monitorInputBilanEditorCenterPanelGesteEtObservation',
            title    : 'Gestes Et Observations',
            contentEl: 'BilanGestEtObservation',
            autoScroll: true,
            border   : false,
            iconCls  : 'settings'
          },
          {
            id       : 'monitorInputBilanEditorCenterPanelEvacuation',
            title    : 'Evacuation',
            contentEl: 'BilanEvacuation',
            autoScroll: true,
            border   : false,
            iconCls  : 'settings'
          }]
    
  };
  var bilanHelper={
    id          : 'monitorInputBilanHelperEastPanel',
    region      : 'east',
    split       : true,
    collapsible : true,
    collapsed   : true,
    autoScroll  : true,
    contentEl   : 'BilanHelper',
    title       : 'Résumé',
    xtype       : 'panel',
    width       : 230
  };
  
  
  var bilanPanel={
      id        : 'monitorInputBilanPanel',
      title     : 'Gestion des Bilans',
      closable  : false,
      autoScroll: true,
      layout    : 'border',
      items:[
        bilanEditor,
        bilanHelper
      ]
    };
        
    
/****************DISPOSITIF*EDITOR*************************/
  
  var currentInterListWindow      = null;
  var currentInterListWindowStore = null;
  
  var dispositifEditorToolbar = new Ext.Toolbar({	id     : 'DispositifPanelTopToolbar', 
	  												hidden : true,
	  												items  :[{
  	  													text   : 'Publier',
  	  													handler: function()
  	  													{
  	  														miDispositifCs.endOfEditionEvent();
  	  													},
  	  													iconCls: 'validateButton',
  	  													xtype  : 'tbbutton'
	  											    },
                              '-',
	  											    {
	  											       text   : 'Supprimer',
	  											       handler: function()
	  											       {
	  											    		miDispositifCs.deleteDispositifConfirm ();
	  											       },
	  											       iconCls: 'deleteButton'
	  											    },
	  											    '-',
	  											    {
	  											        text   : 'Fin de Vacation',
	  											        handler: function()
	  											        {
	  											   	 		miDispositifCs.endOfVacationConfirm();
	  											        },
	  											        iconCls: 'endOfVacationButton'
	  											    },
	  											    '-',
	  											    {
	  											        text   : 'Voir les interventions en cours',
	  											        handler: function()
	  											        {
                                    var currentInterId = $('dispositif_id_field').value;
                                    
                                    MonitorInputDispositif.getInterventionTicketFromDispositif(currentInterId, function(interventions){
                                      
                                      if(interventions == null || interventions.length == 0)
                                      {
                                        Ext.Msg.alert('Aucune Intervention', 'Le dispositif n\'a actuellement pas d\'intervention affectée');  
                                      }
                                      else
                                      {
                                        
                                        if(interventions.length==1)
                                        {
                                          miBilanCs.editBilan(interventions[0].idIntervention); 
                                          return;
                                        }
                                        
                                        var data = [];
                                        var i = 0;
                                        for(i=0;i<interventions.length;i++)
                                        {
                                          data[i]=[
                                              interventions[i].idIntervention            ,
                                              interventions[i].idDispositif              ,
                                              interventions[i].idRegulation              ,
                                              interventions[i].idOrigine                 ,
                                              interventions[i].idMotif                   ,
                                              interventions[i].idEtat                    ,
                                              interventions[i].ageApproxVictime          ,
                                              interventions[i].interventionBusinessId    ,
                                              interventions[i].dhSaisie                  ,
                                              interventions[i].dhReception               ,
                                              interventions[i].victimeHomme              ,
                                              interventions[i].nomVictime                ,
                                              interventions[i].prenomVictime             ,
                                              interventions[i].nomContactSurPlace        ,
                                              interventions[i].coordonneesContactSurPlace,
                                              interventions[i].batiment                  ,
                                              interventions[i].etage                     ,
                                              interventions[i].porte                     ,
                                              interventions[i].complementAdresse         ,
                                              interventions[i].complementMotif
                                          ];
                                        }
                                        
                                        
                                        
                                        if(currentInterListWindow == null)
                                        {
                                          currentInterListWindowStore = new Ext.data.ArrayStore({
                                              fields: [
                                                  {name: 'idIntervention'                , type: 'int'      },
                                                  {name: 'idDispositif'                  , type: 'int'      },
                                                  {name: 'idRegulation'                  , type: 'int'      },
                                                  {name: 'idOrigine'                     , type: 'int'      },
                                                  {name: 'idMotif'                       , type: 'int'      },
                                                  {name: 'idEtat'                        , type: 'int'      },
                                                  {name: 'ageApproxVictime'              , type: 'int'      },
                                                  {name: 'interventionBusinessId'        , type: 'string'   },
                                                  {name: 'dhSaisie'                      , type: 'date'     },
                                                  {name: 'dhReception'                   , type: 'date'     },
                                                  {name: 'victimeHomme'                  , type: 'boolean'  },
                                                  {name: 'nomVictime'                    , type: 'string'   },
                                                  {name: 'prenomVictime'                 , type: 'string'   },
                                                  {name: 'nomContactSurPlace'            , type: 'string'   },
                                                  {name: 'coordonneesContactSurPlace'    , type: 'string'   },
                                                  {name: 'batiment'                      , type: 'string'   },
                                                  {name: 'etage'                         , type: 'string'   },
                                                  {name: 'porte'                         , type: 'string'   },
                                                  {name: 'complementAdresse'             , type: 'string'   },
                                                  {name: 'complementMotif'               , type: 'string'   }
                                              ]
                                          });
                                          
                                          
                                          
                                          currentInterListWindow = new Ext.Window({
                                            id          : 'currentInterListWindow',
                                            layout      : 'fit' ,
                                            width       : 500   ,
                                            height      : 300   ,
                                            closeAction : 'hide',

                                            items: new Ext.grid.GridPanel({
                                              store         : currentInterListWindowStore,
                                              listeners     : { 
                                                rowdblclick : function(theGrid, rowIndex, e )
                                                {
                                                  var rowData = theGrid.store.getAt(rowIndex).data;
                                                  miBilanCs.editBilan(rowData.idIntervention);
                                                  Ext.getCmp('currentInterListWindow').hide();
                                                }
                                              },
                                              columns: [
                                                  {
                                                      id       : 'interventionBusinessId',
                                                      header   : 'Inter', 
                                                      width    : 160, 
                                                      sortable : true, 
                                                      dataIndex: 'interventionBusinessId'
                                                  },
                                                  {
                                                      header   : 'Nom', 
                                                      width    : 75, 
                                                      sortable : true, 
                                                      dataIndex: 'nomVictime'
                                                  },
                                                  {
                                                      header   : 'Prenom', 
                                                      width    : 75, 
                                                      sortable : true, 
                                                      dataIndex: 'prenomVictime'
                                                  }
                                              ],
                                              stripeRows: true,
                                              autoExpandColumn: 'interventionBusinessId',
                                              height: 350,
                                              width: 600,
                                              title: 'Liste des interventions'
                                          }),
                                            buttons: [{
                                                text: 'Close',
                                                handler: function()
                                                {
                                                  Ext.getCmp('currentInterListWindow').hide();
                                                }
                                            }]
                                        });
                                          
                                        }
                                        
                                        currentInterListWindowStore.loadData(data);
                                        currentInterListWindow.show(this);
                                      }
                                      
                                      
                                    });
                                    
  	  											    	    
	  											        },
	  											        iconCls: 'editInterButton'
	  											    },
                              '-',
                              {
                                  text   : 'Liste des Interventions traitées',
                                  handler: function()
                                  {
                                    miDispositifCs.displayInterventionsList();
                                  },
                                  iconCls: 'editInterButton'
                              }
	  											    ]//fin tableau d'item
	  										    });
  

  
  var dispositifEditor={
    region        : 'center',
    split         : true,
    contentEl     : 'DispositifPanel',
    title         : 'Editeur de Dispositif',
    deferredRender: false,
    autoScroll    : true,
    xtype         : 'panel',
    tbar 		      : dispositifEditorToolbar
  };
  
  var dispositifList={
    id          : 'DispositifListEastPanel',
    region      : 'east',
    split       : true,
    contentEl   : 'DispositifList',
    title       : 'Liste des Dispositifs',
    xtype       : 'panel',
    split       : true,
    width       : 800,
    collapsible : true,
    layout      : 'accordion',
    layoutConfig:{
        animate:true
    },
    items:[{
            title    : 'Liste des Dispositifs Récents',
            contentEl: 'DispositifListCurrent',
            border   : false,
            iconCls  : 'settings'
          }]
  };  
    
  var dispositifPanel={
      id        : 'monitorInputDispositifPanel',
      title     : 'Editeur de Dispositif',
      closable  : false,
      autoScroll: true,
      layout    : 'border',
      tbar:[new Ext.Action({
        text   : 'Ajouter un Dispositif',
        handler: function()
        {
          miDispositifCs.createNewEmptyDispositif();
        },
        iconCls: 'addButton'
      })
      ],
      items:[
        dispositifEditor,
        dispositifList
      ]
    };
  
  var regulationPanel= {
      id        : 'monitorInputRegulationPanel',
      contentEl : 'RegulationPanel',
      title     : 'Gestion de la Régulation',
      closable  : false,
      autoScroll: true
    };
  
    

/********************BILAN*EDITOR*****************************/    
    
    
    
/****************NORTH/SOUTH/CENTER*************************/
  var north = new Ext.BoxComponent(
      { // raw
        id    :'monitorInputNorthRegion',
        region:'north',
        el    :'north',
        height:50
      });
  
  var south = {
        id            : 'monitorInputSouthRegion',
        region        : 'south',
        contentEl     : 'south',
        split         : true,
        height        : 100,
        minSize       : 100,
        maxSize       : 200,
        collapsible   : true,
        collapsed     : true,
        title         : 'South',
        titleCollapse : true,
        margins       : '0 0 0 0'
      };
    
  var center = new Ext.TabPanel(
  {
    id            : 'monitorInputCenterRegion',
    region        : 'center',
    deferredRender: false   ,
    activeTab     : 2       ,
    items         : [
      interventionPanel,
      bilanPanel       ,
      dispositifPanel  ,
      regulationPanel
    ]
  });

  var viewport = new Ext.Viewport({ id    :'monitorInputViewPort',
                                    layout:'border',
                                    items :[ north, south, center]});
  
  

}

function init()
{
  monitorInputCs          = new MonitorInputCs                ();

  miDispositifCs          = new MonitorInputDispositifCs      ();
  miInterventionCs        = new MonitorInputInterventionCs    ();
  //miCoRegulateurListCs  = new MonitorInputCoRegulateurListCs();
  
  miBilanCs               = Ext.ux.MonitorInput.BilanEditor;
  miBilanCs.init();
  try
  {
	  googleMapAdressResolver = Ext.ux.GMapAddressResolver ;
	  googleMapAdressResolver.init();  
  }
  catch(e)
  {
	     console.log(e);  
  }
  
  miSMSCs = new Ext.ux.monitor.input.SMS();
  
    /* init de la liste des interventions*/
  PageBus.subscribe("list.loaded"     ,  this,
    function(){
      InterventionList = Ext.ux.Utils.InterventionList;
      InterventionList.init();    
    }
    , null, null);
  
  initLayout();
  monitorInputCs.initRegulation();
  
  Ext.MessageBox.buttonText.yes = "Oui"; 
  Ext.MessageBox.buttonText.no  = "Non";
  
  if(idInterventionToOpen!= 0)
  {
    miBilanCs.editBilan(idInterventionToOpen);
    //ouverture de la fenetre de monitor
  }
  else
  {
    //TODO réactiver
    window.opener.openMonitorOutput();
  }
}