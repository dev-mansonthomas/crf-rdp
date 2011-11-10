Ext.namespace('Ext.ux.Home.SMS.SMSGrid');


Ext.ux.Home.SMS.SMSGrid = Ext.extend(Ext.grid.GridPanel,{

	initComponent:function() {

		var gridId    = this.id       ;
		var mainGrid  = this.mainGrid ;
		var subGrid   = this.subGrid  ;
		var subGridId = this.subGridId;
		
		if(this.mainGrid)
		{
		  PageBus.subscribe("list.loaded",  this, this.dataInitComplete , null, null);  
		}
		
		
		var smsManagerGridDataStore = new Ext.data.Store({
	        remoteSort:true,
             proxy: new Ext.ux.rs.data.DwrProxy({
                 call          : SMSManagerService.getSMS ,
                 args          : []              ,
                 proxyConfig   : Ext.ux.rs.data.PAGING_WITH_SORT_AND_FILTER,
                 filterCallBack: function()
                 {//TODO : gérer le tri sur les colonnes
                    var objectFilter = new Array();
                    
                    Ext.ux.rs.addFilterFromExtField(objectFilter,gridId+'Toolbar-idEquipier', 'idEquipier', '='   ,'');
                    
                    var mobile = Ext.getCmp(gridId+'Toolbar-mobile');
                    if(mobile!= null && !mobile.isValid())
                    {
                    	mobile.setValue('');
                    }
                    var searchDate = Ext.getCmp(gridId+'Toolbar-date');
                    if(searchDate!= null && !searchDate.isValid())
                    {
                    	searchDate.reset();
                    }
                    
                    
                    if(subGrid)
                    {
                    	Ext.ux.rs.addFilterFromExtField(objectFilter,gridId+'Toolbar-mobile-hidden'    , 'mobile'    , 'LIKE','');	
                    }
                    else
                    {//main grid or regular grid
                    	if(mobile!=null)
                      {
                      	Ext.ux.rs.addFilterFromExtField(objectFilter,gridId+'Toolbar-mobile'    , 'mobile'    , 'LIKE','');	
                      }	
                    }
                    
                    Ext.ux.rs.addFilterFromExtField(objectFilter,gridId+'Toolbar-date'      , 'date'      , 'LIKE','');
                    Ext.ux.rs.addFilterFromExtField(objectFilter,gridId+'Toolbar-allSMS'    , 'allSMS'    , '='   ,'');

                    return objectFilter;
                }
           }),
       reader: new Ext.ux.rs.data.JsonReader ({
              root: 'data',
     totalProperty: 'totalCount',
            fields:
               [
                   {name: 'idSMS'                , type: 'int'   },
                   {name: 'smsType'              , type: 'int'   },
                   {name: 'equipierId'           , type: 'int'   },
                   {name: 'idDispositif'         , type: 'int'	 },
                   {name: 'api'        			     , type: 'string'},
                   {name: 'from'                 , type: 'string'},
                   {name: 'recipient'            , type: 'string'},
                   {name: 'message'          	   , type: 'string'},
                   {name: 'equipierDesc'         , type: 'string'},
                   {name: 'eventDate'            , type: 'date'	 }
               ]
           })
       });
		
		
		
		
		var config = {
	              xtype : 'grid',
	              viewConfig:{
	                forceFit:true
	              },
	              
	              height: 335,
	              enableHdMenu: true,
				     store: smsManagerGridDataStore,//end of store
		       columns: [
		                 {
		                    xtype     : 'gridcolumn',
		                    header    : 'idSMS',
		                    sortable  : true,
		                    resizable : false,
		                    dataIndex : 'idSMS',
		                    width     : 20
		                 },
		                 {
		                    xtype     : 'gridcolumn',
		                    header    : 'Type',
		                    sortable  : true,
		                    resizable : false,
		                    dataIndex : 'smsType',
                        width     : 70,
		                    renderer : function(value, metadata, record, rowIndex, colIndex, store)
		                    {
		                      return crfIrpUtils.getLabelFor('SMSType', value);
		                    }
		                 },
		                 {
		                    xtype     : 'gridcolumn',
		                    header    : 'Equipier',
		                    sortable  : true,
		                    resizable : true,
		                    dataIndex : 'equipierDesc',
		                    width     : 70
		                 },
		                 {
		                    xtype     : 'gridcolumn',
		                    header    : 'idDispositif',
		                    sortable  : true,
		                    resizable : true,
		                    dataIndex : 'idDispositif',
		                    width     : 20
		                 },
		                 {
		                    xtype     : 'gridcolumn',
		                    header    : 'Emetteur',
		                    sortable  : true,
		                    resizable : false,
                        width     : 35,
		                    dataIndex : 'from'
		                 },
                     {
                       xtype     : 'gridcolumn',
                       header    : 'Destinataire',
                       sortable  : true,
                       resizable : false,
                       dataIndex : 'recipient'
                    },
		                 {
		                    xtype     : 'gridcolumn',
		                    header    : 'Message',
		                    sortable  : true,
		                    resizable : true,
		                    dataIndex : 'message',
                        width     : 190
		                 },
		                 {
		                    xtype     : 'gridcolumn',
		                    header    : 'Reçu',
		                    sortable  : true,
		                    resizable : false,
		                    width     : 35,
		                    dataIndex : 'eventDate',
		                    renderer  : Ext.util.Format.dateRenderer('d/m/Y H:i:s')
		                 }
		              ],//end of columns
		              bbar: {
		                     id: gridId+'PagingToolbar',
		                  xtype: 'paging',
		            pageSize   : 10,
		            store      : smsManagerGridDataStore,
		            displayInfo: true,
		            displayMsg : 'SMS(s) {0} à {1} de {2}',
		            emptyMsg   : 'aucun SMS ne correspond à la recherche',
		                  items: [
		                    {
		                       xtype: 'tbfill'
		                    },
		                    {
		                       xtype  : 'button',
		                       text   : 'Nouveau SMS',
		                       iconCls: 'smsManagerNewButton',
		                       handler: function(){
		                    	   Ext.getCmp(gridId).editNewSMS();
		                       }
		                    }
		                 ]
		              },// end of bbar
		              tbar: {
		            	 id   : gridId+'Toolbar',
		                 xtype: 'toolbar',
		                 items: []
		              } //end of tbar
		       
		};
		
		
		// apply config
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		 
		// call parent
		Ext.ux.Home.SMS.SMSGrid.superclass.initComponent.apply(this, arguments);
	},
	setChoosenEquipierForSearch:function(record)
	{  
		var equipierSearch = 'EquipierSearch';
		var gridId = this.id.substring(0, this.id.indexOf(equipierSearch));
		
		Ext.getCmp(gridId+'Toolbar-SelectedEquipier' 	).setValue(record.data.nom+" "+
																   record.data.prenom+" ("+
																   crfIrpUtils.getLabelFor('Delegations', record.data['delegation.idDelegation'])
																   +") - "+record.data.mobile);
		Ext.getCmp(gridId+'Toolbar-idEquipier'			).setValue(record.data.idEquipier);
		Ext.getCmp(gridId+equipierSearch				).setValue('');
		Ext.getCmp(gridId+equipierSearch				).getStore(	 ).reload();
	},
	eraseSearchCriteria:function()
	{
		var gridId = this.id;
		Ext.getCmp(gridId+'EquipierSearch'				  ).setValue('');
		Ext.getCmp(gridId+'Toolbar-idEquipier'			).setValue('');
		Ext.getCmp(gridId+'Toolbar-SelectedEquipier').setValue('');
		Ext.getCmp(gridId+'Toolbar-mobile'				  ).setValue('');
		Ext.getCmp(gridId+'Toolbar-date'	    	    ).reset	  (  );
		Ext.getCmp(gridId+'Toolbar-allSMS'	    		).reset	  (  );
	},
	dataInitComplete:function()
	{
	  this.rechercher();
	},
	rechercher:function()
	{
		var gridId = this.id;
		Ext.getCmp(gridId+'PagingToolbar').moveFirst();
	},
  handleRowDoubleClick:function(theGrid, rowIndex, e)
  {
    var rowData = theGrid.store.getAt(rowIndex).data;
    alert("Sending new SMS to "+ rowData.idSMS);
  },
	handleRowClick:function(theGrid, rowIndex, e)
	{
	  var rowData = theGrid.store.getAt(rowIndex).data;
    
    var mobile = null;
    
    if(rowData.smsType == 4)
    {
      mobile = rowData.from;
    }
    else
    {
      mobile = rowData.recipient;
    }
    
    Ext.getCmp(theGrid.subGridId+'Toolbar-mobile-hidden').setValue(mobile);
    Ext.getCmp(theGrid.subGridId+'Toolbar-allSMS'       ).setValue(Ext.getCmp(theGrid.id+'Toolbar-allSMS'       ).getValue());
    
    Ext.getCmp(theGrid.subGridId).setTitle(rowData.equipierDesc +" - "+mobile);
    
    Ext.getCmp(theGrid.subGridId).expand(true);
    Ext.getCmp(theGrid.subGridId).rechercher();
	},
	initToolBar:function()
	{
		//tout les objets doivent être construit avec des ID relatifs à l'ID de la grid, car 2 instances ou plus de la gride vont cohexister sur la meme 
		var gridId = this.id;
	  
  /* Combo Box de recherche d'équipier*/ 
  var equipierSearchDataStore = new Ext.data.Store({
      proxy: new Ext.ux.rs.data.DwrProxy({
             call           : SMSManagerService.searchEquipier,
             args           : [],
             proxyConfig    : Ext.ux.rs.data.PAGING_WITH_SORT_AND_FILTER,
             filterCallBack : function()
             {
                var search = Ext.getCmp(gridId+'EquipierSearch').getValue();
                
                if(search =='')
                  return [];
                
                return [new Ext.ux.rs.data.FilterObject('search',search,'=')]
             }
        }),
        reader: new Ext.ux.rs.data.JsonReader({
                 root: 'data',
        totalProperty: 'totalCount',
                   id: 'idEquipier',
               fields:
                   [
                       {name: 'idEquipier'                , type: 'int'     },
                       {name: 'homme'                     , type: 'boolean' },
                       {name: 'numNivol'                  , type: 'string'  },
                       {name: 'nom'                       , type: 'string'  },
                       {name: 'prenom'                    , type: 'string'  },
                       {name: 'mobile'                    , type: 'string'  },
                       {name: 'email'                     , type: 'string'  },
                       {name: 'delegation.idDelegation'   , type: 'int'     }
                   ]
               })
    });

    var resultTpl = new Ext.XTemplate(
        '<tpl for="."><div class="search-item">',
            '<h3><span>{numNivol}</span> - {[this.getSexImg(values)]} - {prenom} {nom} - {mobile} - {email}</h3>',//{delegation.idDelegation}
            '{[this.getDelegation(values)]}',
        '</div></tpl>',
        {
          getDelegation:function(values)
          {
            return crfIrpUtils.getLabelFor("Delegations", values["delegation.idDelegation"]);
          },
          getSexImg:function(values)
          {
            return '<img src="'+contextPath+'/img/monitorInput/user'+(values.homme?'':'_female')+'.png" alt="'+(values.homme?'Homme':'Femme')+'"/> ';
          }
        }
    ); 

    var searchEquipierComboBox = new Ext.form.ComboBox({
        id          : gridId+'EquipierSearch', 
        store       : equipierSearchDataStore   ,
        loadingText : 'Recherche en cours...'   ,
        width       : 150						,
        listWidth   : 500						,
        pageSize    : 10						,
        minChars    : 1							,
        hideTrigger : true						,
        tpl         : resultTpl					,
        itemSelector: 'div.search-item'			,
        onSelect    : Ext.getCmp(gridId).setChoosenEquipierForSearch
    });
  /* FIN Combo Box de recherche d'équipier*/


    var searchEquipierToolbar =
    	[
         {
             xtype : 'label',
             text  : 'Nom/Nivol/Tel',
             style : 'padding-right:15px;padding-left:5px;'
          },
          searchEquipierComboBox,
          {
              xtype     : 'tbseparator'
           },
           {
              xtype     : 'label',
              text      : 'Equipier Sélectionné',
              style     : 'padding-right:15px;padding-left:5px;'
           },
           {
               id        : gridId+'Toolbar-SelectedEquipier',
               xtype     : 'textfield',
               editable  : false,
               width     : 350,
               fieldLabel: 'Label'
            },
          {
             xtype     : 'tbseparator'
          },
          {
             xtype     : 'label',
             text      : 'Mobile',
             style     : 'padding-right:15px;padding-left:5px;'
          },
          {
             id        : gridId+'Toolbar-mobile',
             xtype     : 'textfield',
             regex	   : /^0[6-7]{1,1}[0-9]{8,8}$/,
             regexText : 'Numéro de téléphone invalide',
             fieldLabel: 'Label'
          },
          {
              xtype     : 'tbseparator'
           }];

    
    var commonToolbar = [
  	{
  	   id        : gridId+'Toolbar-idEquipier',
  	   xtype     : 'textfield',
  	   editable  : false,
  	   hidden    : true,
  	   fieldLabel: 'Label'
  	},
	 {
        id        : gridId+'Toolbar-mobile-hidden',
        xtype     : 'textfield',
 	     editable   : false,
	     hidden     : true,
        fieldLabel: 'Label'
     },
       {
          xtype     : 'label',
          text      : 'Reçu le',
          style     : 'padding-right:15px;padding-left:5px;'
       },
       {
          id        : gridId+'Toolbar-date',
          xtype     : 'datefield',
          format	: 'd/m/Y',
          fieldLabel: 'Label'
       },
       {
          xtype     : 'tbseparator'
       },
       {
          xtype     : 'label',
          text      : 'Tous les SMS',
          style     : 'padding-right:15px;padding-left:5px;',
          tooltip   : 'Afficher tous les SMS, y compris ceux envoyer lors d\'une affectation SAMU ou a un équipage de dispositif.'
       },
       {
           id            : gridId+'Toolbar-allSMS',
           xtype         : 'combo',
           width		 : 55	 ,
           typeAhead     : false	 ,
           editable	     : false	 ,
           triggerAction : 'all'	 ,
           lazyRender    : true	 ,
           mode          : 'local',
           store         : new Ext.data.ArrayStore({
               id    : 0,
               fields: [
                    gridId+'Toolbar-allSMS-value',
                   'displayText'
               ],
               data: [[0, 'Non'], [1, 'Oui']]
           }),
           valueField    : gridId+'Toolbar-allSMS-value',
           displayField  : 'displayText',
           value		    : 0
       }, 
       {
          xtype  : 'tbfill'
       },
       {
          xtype     : 'button',
          text      : 'Effacer Critères',
          iconCls   : 'lieuEraseButton',
          handler    : function(){
            Ext.getCmp(gridId).eraseSearchCriteria();
          }
       },
       {
          xtype     : 'tbseparator'
       },
       {
          xtype  : 'button',
          text   : 'Rechercher',
          iconCls: 'lieuSearchButton',
          handler: function(){
       	  Ext.getCmp(gridId).rechercher();
          }
       }
    ];
    

    var mainGrid = [].concat(searchEquipierToolbar).concat(commonToolbar);
    var  subGrid = [].concat(commonToolbar);
 
    
    Ext.ux.Home.SMSManagerUI.toolbars     = {
 		 mainGridToolbar :mainGrid,
 		  subGridToolbar :subGrid 
    };	  
	  
	  
    
    
 	crfIrpUtils.resetToolbar(gridId+'Toolbar', this.subGrid ? Ext.ux.Home.SMSManagerUI.toolbars.subGridToolbar : Ext.ux.Home.SMSManagerUI.toolbars.mainGridToolbar);  
   
	  
  }


});


Ext.reg('CRFSMSGrid', Ext.ux.Home.SMS.SMSGrid);