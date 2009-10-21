Ext.namespace('Ext.ux.Home', 'Ext.ux.Home.EquipiersGestion');

// create application
Ext.ux.Home.EquipiersGestion = function() {
	// do NOT access DOM from here; elements don't exist yet

	// private variables
	var equipierSearch = null;
	var equipierEditor = null;
	var equipierList   = null;
  var allDelegations = null;
  var allRoles       = null;
  var equipierData   = null;
       
  var   equipierTemplate = new Ext.XTemplate(
      '<fieldset id="{prefixHtmlId}_fieldset">',
        '<legend>{title}</legend>',
        '<table id="{prefixHtmlId}_table" width="99%">',
          '<tpl for="fields">', 
            '<tr>', 
              '<tpl for=".">', 
                '<td>',
                  '<span>{label}</span>', 
                  '</td><td{[values.colspan!=-1?" colspan=\'"+values.colspan+"\'":""]}>',
                    '<tpl if="type == \'textInput\'">',
                      '<input style="width:99%" type     ="text" ', 
                             'class    ="x-form-text x-form-field" ',
                             'id       ="{htmlId}" ',
                             'value    ="{value}", ', 
                             '{[values.readOnly?"readOnly":""]} ',
                             'mandatory="{mandatory}"', 
                             ' />', 
                    '</tpl>', 
                    '<tpl if="type == \'select\'">',
                      '<select ',
                             'id       ="{htmlId}" ',
                             'class    ="x-form-text x-form-field" ',
                             '{[values.readOnly?"disabled":""]} ',
                             'mandatory="{mandatory}" ',
                             '>',
                             '<tpl for="options">',
                                '<option value="{id}" {[parent.value==values.id?"selected":""]}>{label}</option>',
                             '</tpl>',
                      '</select>', 
                    '</tpl>', 
                    '<tpl if="type == \'checkbox\'">',
                    '<table id="edit_role_table">',
                         '<tpl for="options">',
                            '{[(xindex % 3 === 1) ? "<tr>" : ""]}',
                            '<td><input type="checkbox" id="{parent.htmlId}_{id}" value="{id}" {[parent.readOnly?"readOnly":""]}/> {label}  </td>',
                            '{[(xindex % 3 === 0 || xindex === xcount) ? "</tr>" : ""]}',
                         '</tpl>',
                    '</table>',
                    '</tpl>', 
                '</td>',
              '</tpl>', 
            '</tr>', 
          '</tpl>', 
          '<tpl if="buttons.length &gt; 0">',
            '<tr>', 
              '<tpl for="buttons">', 
                '<td>',
'<table id="{htmlId}_table" class="x-btn x-btn-noicon " cellspacing="0" style="width: 75px;" onClick="{onClick}">',
'  <tbody class="x-btn-small x-btn-icon-small-left">',
'    <tr>',
'    </tr>',
'    <tr>',
'      <td class="x-btn-ml">',
'      </td>',
'      <td class="x-btn-mc">',
'        <em class="" unselectable="on">',
'          <button id="{htmlId}" class="x-btn-text " type="button">{label}</button>',
'        </em>',
'      </td>',
'      <td class="x-btn-mr">',
'      </td>',
'    </tr>',
'    <tr>',
'    </tr>',
'  </tbody>',
'</table>', 
                '</td>',
              '</tpl>',
            '</tr>',
          '</tpl>',
        '</table>', 
      '</fieldset>');

	// private functions

	// public space
	return {
		// public properties, e.g. strings to translate
    
		// public methods
		init : function() {
      PageBus.subscribe("list.loaded",  this, this.dataInitComplete , null, null);
		},
    dataInitComplete : function(){
      Ext.ux.Home.EquipiersGestion.allDelegations = crfIrpUtils.allList['Delegations'  ];
      Ext.ux.Home.EquipiersGestion.allRoles       = crfIrpUtils.allList['RolesEquipier'];
      Ext.ux.Home.EquipiersGestion.initLayout    ();      
    },
    
    addFilter:function(objectFilter, domFieldName, fieldName, comparator, nullValue)
    {
      var domObj = Ext.getDom(domFieldName);
      if(domObj != null)
      {
        var value  = domObj.value;
        if (value!=null && value!=nullValue)
          objectFilter.push(new Ext.ux.rs.data.FilterObject(fieldName , value ,comparator));        
      }
      else
      {
        alert('DOM object "'+domFieldName+'" not found for grid filter object');
      }
      
    },
    
		initLayout : function() 
    {
			equipierSearch = {
				id              : 'EquipierSearchPanel',
				region          : 'north',
				split           : true,
				title           : 'Recherche d\'Equipier',
				deferredRender  : false,
				xtype           : 'panel',
				collapsible     : true,
				html            : this.initSearch(),
        tbar            :[{
            text   : 'Rechercher un équipier',
            tooltip: 'Rechercher un équipier',
            iconCls: 'findButton',
            handler: Ext.ux.Home.EquipiersGestion.searchEquipier
        }]
			};

      var equipierGridDataStore = new Ext.data.Store({
         proxy: new Ext.ux.rs.data.DwrProxy({
           call          : EquipiersGestionService.getEquipierList,
           args          : [],
           proxyConfig   : Ext.ux.rs.data.PAGING_WITH_SORT_AND_FILTER,
           filterCallBack: function()
           {
           
              var objectFilter = new Array();
              
              Ext.ux.Home.EquipiersGestion.addFilter(objectFilter, 'search_nom'       , 'NOM'              ,'LIKE' , '');
              Ext.ux.Home.EquipiersGestion.addFilter(objectFilter, 'search_prenom'    , 'PRENOM'           ,'LIKE' , ''); 
              Ext.ux.Home.EquipiersGestion.addFilter(objectFilter, 'search_numNivol'  , 'NUM_NIVOL'        ,'LIKE' , ''); 
              Ext.ux.Home.EquipiersGestion.addFilter(objectFilter, 'search_homme'     , 'EQUIPIER_IS_MALE' ,'='    , ''); 
              Ext.ux.Home.EquipiersGestion.addFilter(objectFilter, 'search_role'      , 'ID_ROLE_EQUIPIER' ,'='    , '0');
              Ext.ux.Home.EquipiersGestion.addFilter(objectFilter, 'search_email'     , 'EMAIL'            ,'LIKE' , ''); 
              Ext.ux.Home.EquipiersGestion.addFilter(objectFilter, 'search_mobile'    , 'MOBILE'           ,'LIKE' , ''); 
              Ext.ux.Home.EquipiersGestion.addFilter(objectFilter, 'search_enabled'   , 'ENABLED'          ,'='    , ''); 
              Ext.ux.Home.EquipiersGestion.addFilter(objectFilter, 'search_delegation', 'ID_DELEGATION'    ,'='    , '0');

              return objectFilter;
          }
       }),
       reader: new Ext.ux.rs.data.JsonReader({
            root: 'data',
            totalProperty: 'totalCount',
            fields:[
                 {name: 'idEquipier'  , type: 'int'     },
                 {name: 'nom'         , type: 'string'  },
                 {name: 'prenom'      , type: 'string'  },
                 {name: 'mobile'      , type: 'string'  },
                 {name: 'email'       , type: 'string'  },
                 {name: 'homme'       , type: 'boolean' },
                 {name: 'enabled'     , type: 'boolean' },
                 {name: 'delegation'  , type: 'string'  , mapping: 'delegation.idDelegation'},
                 {name: 'numNivol'    , type: 'string'  }
            ]
       }),
       remoteSort: true
    });
    
    equipierGridDataStore.setDefaultSort('prenom', 'asc');
      
      
          
    equipierListGrid = new Ext.grid.GridPanel({
        id    : 'home-list-equipier-grid-test',
        store : equipierGridDataStore,
        cm    : new Ext.grid.ColumnModel([
            {id:'nomCol'              , header: 'Nom'        , width: 100 , sortable: true, dataIndex: 'nom'},
            {id:'prenomCol'           , header: 'Prénom'     , width: 100 , sortable: true, dataIndex: 'prenom'},
            {id:'sexeCol'             , header: 'Sexe'       , width: 40 , sortable: true, dataIndex: 'homme', align:'center', 
              renderer:function(isHomme){
                var image = '<img style="vertical-align:bottom;" src="../img/famfamfam/user.png" alt="Homme" />';
                if(!isHomme) {
                  image = '<img style="vertical-align:bottom;" src="../img/famfamfam/user_female.png" alt="Femme" />';
                }
                return image;
              }
            },
            {id:'delegationCol'       , header: 'Délégation' , sortable: true, dataIndex: 'delegation', 
                renderer:function(idDelegation){
                return crfIrpUtils.getLabelFor('Delegations',idDelegation);
              }
            },
            {id:'numNivolCol'         , header: 'Nivol'      , width: 90 ,sortable: true, dataIndex: 'numNivol'}
        ]),
        viewConfig: {
            forceFit:false
        },
        
        tbar:[{
            text   :'Ajouter un équipier',
            tooltip:'Ajouter un équipier',
            iconCls:'addButton',
            handler:function(){
                Ext.ux.Home.EquipiersGestion.equipierData = null;
                Ext.ux.Home.EquipiersGestion.initEquipierForm(true);
              }
        }],
        listeners:{ 
          rowdblclick : function(theGrid, rowIndex, e ){
              Ext.ux.Home.EquipiersGestion.equipierData = theGrid.store.getAt(rowIndex).data;
              Ext.ux.Home.EquipiersGestion.initEquipierForm(false);
          }
        },
        
        width      : 600,
        height     : 330,
        stripeRows : true,
        autoScroll : false,
        iconCls    : 'icon-grid',
  
        bbar:new Ext.PagingToolbar({
          pageSize   : 10,
          store      : equipierGridDataStore,
          displayInfo: true,
          displayMsg : 'Équipier(s) {0} à {1} de {2}',
          emptyMsg   : 'aucun équipier'
        })
    });    

      equipierList = {
				id          : 'EquipierListPanel',
				region      : 'center',
				split       : true,
				title       : 'Résultat de la recherche',
				xtype       : 'panel',
				collapsible : true,
				items       : [equipierListGrid]
			};
      
			equipierEditor = {
				id              : 'EquipierEditorPanel',
				region          : 'east',
				split           : true,
				title           : 'Détail Equipier',
				deferredRender  : false,
				xtype           : 'panel',
        width           : 670,
				collapsible     : true,
        tbar: new Ext.Toolbar([
        {
          id      :'editBtn',
          text    :'Editer',
          hidden  :true,
          handler : function()
          {
            Ext.ux.Home.EquipiersGestion.initEquipierForm(true);
          }
        },
        {
          id      : 'disableBtn',
          text    : 'Désactiver',
          hidden  : true,
          handler : function()
          {
            Ext.ux.Home.EquipiersGestion.confirmDisableEquipier();
          }
        },
        {
          id      :'enableBtn',
          text    :'Activer',
          hidden  :true,
          handler : function()
          {
            Ext.ux.Home.EquipiersGestion.confirmEnableEquipier();
          }
        }
      ]),
			html : '<span>Aucun équipier sélectionné</span>'

		};

			var equipierPanel = {
				id          : 'EquipierPanel',
				title       : 'Gestion des d\'Equipiers',
				closable    : false,
				autoScroll  : true,
        listeners   : {activate:function(){
          Ext.ux.Home.EquipiersGestion.searchEquipier();
        }},
				layout      : 'border',
				items       : [ equipierList  , 
                        equipierSearch, 
                        equipierEditor]
			};
			var tabPanelComp = Ext.getCmp('home_center');
			tabPanelComp.add(equipierPanel);
		},
    searchEquipier:function()
    {
      Ext.getCmp('home-list-equipier-grid-test').getStore().load({params:{start:0, limit:10}});
    },
    initSearch : function() {
			var fieldsetData = {
				title        : 'Critères de recherche',
				prefixHtmlId : 'equipierSearch',
				fields       : [[{
									htmlId     : 'search_nom',
									label      : 'Nom',
									value      : '',
									type       : 'textInput',
									readOnly   : false,
									mandatory  : false,
                  colspan    : -1
								}, 
                {
									htmlId     : 'search_prenom',
									label      : 'Prénom',
									value      : '',
									type       : 'textInput',
									readOnly   : false,
									mandatory  : false,
                  colspan    : -1
								}, 
                {
									htmlId     : 'search_numNivol',
									label      : 'Nivol',
									value      : '',
									type       : 'textInput',
									readOnly   : false,
									mandatory  : false,
                  colspan    : -1
								}, 
                {
                  htmlId     : 'search_homme',
                  label      : 'Sexe',
                  value      : '',
                  type       : 'select',
                  options    : [{id:'', label:''}, {id:'1', label:'Homme'}, {id:'0', label:'Femme'}],
                  readOnly   : false,
                  mandatory  : false,
                  colspan    : -1
                }, 
                {
                  htmlId     : 'search_role',
                  label      : 'Role',
                  value      : '',
                  type       : 'select',
                  options    : Ext.ux.Home.EquipiersGestion.allRoles,
                  readOnly   : false,
                  mandatory  : false,
                  colspan    : -1
                }], 
                [{
									htmlId     : 'search_email',
									label      : 'Email',
									value      : '',
									type       : 'textInput',
									readOnly   : false,
									mandatory  : false,
                  colspan    : -1
								}, 
                {
									htmlId     : 'search_mobile',
									label      : 'Mobile',
									value      : '',
									type       : 'textInput',
									readOnly   : false,
									mandatory  : false,
                  colspan    : -1
								}, 
                {
                  htmlId     : 'search_enabled',
                  label      : 'Actif',
                  value      : '',
                  type       : 'select',
                  options    : [{id:'', label:''}, {id:'1', label:'Oui'}, {id:'0', label:'Non'}],
                  readOnly   : false,
                  mandatory  : false,
                  colspan    : -1
                }, 
                {
                  htmlId     : 'search_delegation',
                  label      : 'Delegation',
                  value      : '',
                  type       : 'select',
                  options    : Ext.ux.Home.EquipiersGestion.allDelegations,
                  readOnly   : false,
                  mandatory  : false,
                  colspan    : 3
                }]],
          buttons: []
			};
			return equipierTemplate.apply(fieldsetData);
		},
    
    initEquipierForm : function(edition) {
      
      var editBtn    = Ext.getCmp('editBtn'   );
      var disableBtn = Ext.getCmp('disableBtn');
      var enableBtn  = Ext.getCmp('enableBtn' );
        
      if (this.equipierData==null)
      {
        this.equipierData = {
          idEquipier: -1,
          nom       : '',
          prenom    : '',
          email     : '',
          mobile    : '',
          numNivol  : '',
          homme     : -1,
          enabled   : 1,
          delegation: 0,
          roles:[]
        };
        editBtn   .hide();
        disableBtn.hide();
        enableBtn .hide();
      }
      else if (!edition && this.equipierData.enabled)
      {
        editBtn   .show();
        disableBtn.show();
        enableBtn .hide();
      }
      else if (!this.equipierData.enabled)
      {
        editBtn   .hide();
        disableBtn.hide();
        enableBtn .show();
      }
      else if (edition)
      {
        editBtn   .hide();
        disableBtn.hide();
        enableBtn .hide();
      }
      var fieldsetData = {
        title         : 'Détails de l\'Equipier',
        prefixHtmlId  : 'equipierDetails',
        fields : [[{
                  htmlId      : 'edit_numNivol',
                  label       : 'Nivol',
                  value       : this.equipierData.numNivol,
                  type        : 'textInput',
                  readOnly    : !edition,
                  mandatory   : true,
                  colspan     :-1
                }, {
                  htmlId      : 'edit_idEquipier',
                  label       : 'ID Equipier',
                  value       : this.equipierData.idEquipier,
                  type        : 'textInput',
                  readOnly    : true,
                  mandatory   : false,
                  colspan     : -1
                }], 
                [{
                  htmlId      : 'edit_nom',
                  label       : 'Nom',
                  value       : this.equipierData.nom,
                  type        : 'textInput',
                  readOnly    : !edition,
                  mandatory   : true,
                  colspan     : -1
                }, 
                {
                  htmlId      : 'edit_prenom',
                  label       : 'Prénom',
                  value       : this.equipierData.prenom,
                  type        : 'textInput',
                  readOnly    : !edition,
                  mandatory   : true,
                  colspan     :-1
                }], 
                [
                {
                  htmlId    : 'edit_homme',
                  label     : 'Sexe',
                  value     : this.equipierData.homme,
                  type      : 'select',
                  options   : [{id:'', label:''}, {id:'1', label:'Homme'}, {id:'0', label:'Femme'}],
                  readOnly  : !edition,
                  mandatory : false,
                  colspan   : -1
                }], 
                [{
                  htmlId    : 'edit_email',
                  label     : 'Email',
                  value     : this.equipierData.email,
                  type      : 'textInput',
                  readOnly  : !edition,
                  mandatory : false,
                  colspan   : -1
                }, 
                {
                  htmlId    : 'edit_mobile',
                  label     : 'Mobile',
                  value     : this.equipierData.mobile,
                  type      : 'textInput',
                  readOnly  : !edition,
                  mandatory : false,
                  colspan   : -1
                }], 
                [{
                  htmlId    : 'edit_enabled',
                  label     : 'Actif',
                  value     : this.equipierData.enabled,
                  type      : 'select',
                  options   : [{id:'', label:''}, {id:'1', label:'Oui'}, {id:'0', label:'Non'}],
                  readOnly  : true,
                  mandatory : false,
                  colspan   : -1
                }], 
                [{
                  htmlId    : 'edit_delegation',
                  label     : 'Delegation',
                  value     : this.equipierData.delegation,
                  type      : 'select',
                  options   : Ext.ux.Home.EquipiersGestion.allDelegations,
                  readOnly  : !edition,
                  mandatory : false,
                  colspan   :3
                }], 
                [{
                  htmlId    : 'edit_role',
                  label     : 'Rôle',
                  value     : 0,//Value setter en ajax
                  type      : 'checkbox',
                  options   : Ext.ux.Home.EquipiersGestion.allRoles,
                  readOnly  : !edition,
                  mandatory : false,
                  colspan   : 3
                }]],
          buttons: []
      };
      if (edition && this.equipierData.idEquipier == -1)
      {
        fieldsetData.buttons = [
          {
            htmlId  : 'valider',
            label   : 'Valider',
            onClick : 'Ext.ux.Home.EquipiersGestion.confirmCreateEquipier();'
          },
          {
            htmlId  : 'annuler',
            label   : 'Annuler',
            onClick : 'Ext.ux.Home.EquipiersGestion.initEquipierForm(false);'
          }
        ]
      }
      else if (edition && this.equipierData.idEquipier != -1)
      {
        fieldsetData.buttons = [
          {
            htmlId  : 'valider',
            label   : 'Valider',
            onClick : 'Ext.ux.Home.EquipiersGestion.confirmModifyEquipier();'
          },
          {
            htmlId  : 'annuler',
            label   : 'Annuler',
            onClick : 'Ext.ux.Home.EquipiersGestion.initEquipierForm(false);'
          }
        ]
      }
      
      equipierTemplate.overwrite(Ext.getCmp('EquipierEditorPanel').body, fieldsetData);
      
      if(this.equipierData.idEquipier!=-1)
        EquipiersGestionService.getEquipierRoles(this.equipierData.idEquipier, function(listRole){
          for(i=0,count=listRole.length;i<count;i++)
          {
            Ext.getDom('edit_role_'+listRole[i].id).checked=true;
          }
        });
      
    },
    confirmEnableEquipier : function() {
      Ext.MessageBox.confirm( 'Confirmation activation equipier',
                              'Confirmez-vous l\'activation de cet équipier',
                              function(btn)
                              {
                                if (btn=='yes')
                                  Ext.ux.Home.EquipiersGestion.enableEquipier();
                                else
                                  Ext.ux.Home.EquipiersGestion.initEquipierForm(false);
                              },
                              true);
    },
    enableEquipier : function() {
        EquipiersGestionService.enableEquipier(
          Ext.getDom('edit_idEquipier').value,
          true,
          {
            callback: function(dataFromBrowser)
            {
              Ext.ux.Home.EquipiersGestion.equipierData.enabled = dataFromBrowser;
              Ext.ux.Home.EquipiersGestion.initEquipierForm(false);
              Ext.ux.Home.EquipiersGestion.searchEquipier();
            }
          });
    },
    confirmDisableEquipier : function() {
      Ext.MessageBox.confirm( 'Confirmation désactivation equipier',
                              'Confirmez-vous la désactivation de cet équipier',
                              function(btn)
                              {
                                if (btn=='yes')
                                  Ext.ux.Home.EquipiersGestion.disableEquipier();
                                else
                                  Ext.ux.Home.EquipiersGestion.initEquipierForm(false);
                              },
                              true);
    },
    disableEquipier : function() {
        EquipiersGestionService.disableEquipier(
          Ext.getDom('edit_idEquipier').value,
          false,
          {
            callback: function(dataFromBrowser)
            {
              Ext.ux.Home.EquipiersGestion.equipierData.enabled = dataFromBrowser;
              Ext.ux.Home.EquipiersGestion.initEquipierForm(false);
              Ext.ux.Home.EquipiersGestion.searchEquipier();
            }
          });
    },
    confirmCreateEquipier : function() {
      var error = Ext.ux.Home.EquipiersGestion.checkEquipierForm();
      if (!error)
        Ext.MessageBox.confirm( 'Confirmation création equipier',
                                'Confirmez-vous la création de cet équipier',
                                function(btn)
                                {
                                  if (btn=='yes')
                                    Ext.ux.Home.EquipiersGestion.createEquipier();
                                  else
                                    Ext.ux.Home.EquipiersGestion.initEquipierForm(false);
                                },
                                true);
    },
    createEquipier : function() {
        EquipiersGestionService.createEquipier(
          Ext.getDom('edit_nom').value,
          Ext.getDom('edit_prenom').value,
          Ext.getDom('edit_numNivol').value,
          Ext.getDom('edit_homme').value,
          Ext.getDom('edit_email').value,
          Ext.getDom('edit_mobile').value,
          Ext.getDom('edit_enabled').value,
          Ext.getDom('edit_delegation').value,
          {
            callback: function(dataFromBrowser)
            {
              Ext.ux.Home.EquipiersGestion.equipierData.nom       = dataFromBrowser.nom;
              Ext.ux.Home.EquipiersGestion.equipierData.prenom    = dataFromBrowser.prenom;
              Ext.ux.Home.EquipiersGestion.equipierData.email     = dataFromBrowser.email;
              Ext.ux.Home.EquipiersGestion.equipierData.mobile    = dataFromBrowser.mobile;
              Ext.ux.Home.EquipiersGestion.equipierData.numNivol  = dataFromBrowser.numNivol;
              Ext.ux.Home.EquipiersGestion.equipierData.homme     = dataFromBrowser.homme;
              Ext.ux.Home.EquipiersGestion.equipierData.delegation= dataFromBrowser.delegation.idDelegation+'';
              Ext.ux.Home.EquipiersGestion.initEquipierForm(false);
              Ext.ux.Home.EquipiersGestion.searchEquipier();
            }
          });
    },
    confirmModifyEquipier : function() {
      var error = Ext.ux.Home.EquipiersGestion.checkEquipierForm();
      if (!error)
        Ext.MessageBox.confirm( 'Confirmation modification equipier',
                                'Confirmez-vous la modification de cet équipier',
                                function(btn)
                                {
                                  if (btn=='yes')
                                    Ext.ux.Home.EquipiersGestion.modifyEquipier();
                                  else
                                    Ext.ux.Home.EquipiersGestion.initEquipierForm(false);
                                },
                                true);
    },
    modifyEquipier : function() {
      {
        EquipiersGestionService.modifyEquipier(
          Ext.getDom('edit_idEquipier').value,
          Ext.getDom('edit_nom').value,
          Ext.getDom('edit_prenom').value,
          Ext.getDom('edit_numNivol').value,
          Ext.getDom('edit_homme').value,
          Ext.getDom('edit_email').value,
          Ext.getDom('edit_mobile').value,
          Ext.getDom('edit_enabled').value,
          Ext.getDom('edit_delegation').value,
          {
            callback: function(dataFromBrowser)
            { 
              Ext.ux.Home.EquipiersGestion.equipierData.idEquipier= dataFromBrowser.idEquipier;
              Ext.ux.Home.EquipiersGestion.equipierData.nom       = dataFromBrowser.nom;
              Ext.ux.Home.EquipiersGestion.equipierData.prenom    = dataFromBrowser.prenom;
              Ext.ux.Home.EquipiersGestion.equipierData.email     = dataFromBrowser.email;
              Ext.ux.Home.EquipiersGestion.equipierData.mobile    = dataFromBrowser.mobile;
              Ext.ux.Home.EquipiersGestion.equipierData.numNivol  = dataFromBrowser.numNivol;
              Ext.ux.Home.EquipiersGestion.equipierData.homme     = dataFromBrowser.homme;
              Ext.ux.Home.EquipiersGestion.equipierData.enable    = dataFromBrowser.enable;
              Ext.ux.Home.EquipiersGestion.equipierData.delegation= dataFromBrowser.delegation.idDelegation;
              Ext.ux.Home.EquipiersGestion.initEquipierForm(false);
              Ext.ux.Home.EquipiersGestion.searchEquipier();
            }
          });
      }
    },
    checkEquipierForm : function() {
      
      var error = false;
      var msg = ['Des Informations sont mal remplies:'];
      if (Ext.getDom('edit_nom').value == '')
      {
        msg.push('<br/>- Nom');
        error = true;
      }
      if (Ext.getDom('edit_prenom').value == '')
      {
        msg.push('<br/>- Prénom');
        error = true;
      }
      if (Ext.getDom('edit_numNivol').value == '')
      {
        msg.push('<br/>- Numéro Nivol');
        error = true;
      }
      if (Ext.getDom('edit_homme').value == '')
      {
        msg.push('<br/>- Sexe');
        error = true;
      }
      if (Ext.getDom('edit_email').value == '')
      {
        msg.push('<br/>- Email');
        error = true;
      }
      if (Ext.getDom('edit_mobile').value == '')
      {
        msg.push('<br/>- Mobile');
        error = true;
      }
      if (error)
        Ext.MessageBox.alert('Erreur Saisie', msg.join(''));
        
      return error;
    }
	};
}();