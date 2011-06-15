Ext.namespace('Ext.ux.Home', 'Ext.ux.Home.EquipiersGestion');

// create application
Ext.ux.Home.EquipiersGestion = function() {
	// do NOT access DOM from here; elements don't exist yet

	// private variables
  
  var editUserWindow = null;
  
  
	var equipierSearch = null;
	var equipierEditor = null;
	var equipierList   = null;
  var allDelegations = null;
  var allRoles       = null;
  var allRolesUser   = null;
  var equipierData   = null;
  
  var defautlHtmlNoUserSelected ='<br/><br/><br/><br/><br/><span style="margin-left:230px;color:#B9B9B9;">Aucun équipier sélectionné</span>';
  var defautlHtmlNoUserSelectedTmpl = new Ext.XTemplate(defautlHtmlNoUserSelected);
   
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
                      '<input type     ="text" ', 
                             'class    ="x-form-text x-form-field" ',
                             'id       ="{htmlId}" ',
                             'value    ="{value}"  ', 
                             '{[values.readOnly?"readOnly":""]} ',
                             'style=\'width:99%;{[values.readOnly?"color:#B9B9B9;\'":"\'"]}', 
                             'mandatory="{mandatory}"', 
                             ' />', 
                    '</tpl>',
                    '<tpl if="type == \'button\'">',
                      '<input type     ="button" ', 
                             'class    ="" ',
                             'id       ="{htmlId}" ',
                             'value    ="{value}"  ', 
                             '{[values.readOnly?"disabled":""]} ',
                             'onClick  ="{onClick}" ',
                             'style=\'width:99%;{[values.readOnly?"color:#B9B9B9;\'":"\'"]}', 
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
                            '<td><input type="checkbox" id="{parent.htmlId}_{id}" value="{id}" {[parent.readOnly?"disabled":""]}/> {label}  </td>',
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
      Ext.ux.Home.EquipiersGestion.allDelegations = crfIrpUtils.allList['DelegationsSorted'   ];
      Ext.ux.Home.EquipiersGestion.allRoles       = crfIrpUtils.allList['RolesEquipier'       ];//retire NA
      Ext.ux.Home.EquipiersGestion.allRolesUser   = crfIrpUtils.allList['RolesUser'           ].slice(1,crfIrpUtils.allList['RolesUser'    ].length);//retire NA
      Ext.ux.Home.EquipiersGestion.initLayout    ();      
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
              
              Ext.ux.rs.addFilterFromField(objectFilter, 'search_nom'       , 'NOM'              ,'LIKE' , '');
              Ext.ux.rs.addFilterFromField(objectFilter, 'search_prenom'    , 'PRENOM'           ,'LIKE' , ''); 
              Ext.ux.rs.addFilterFromField(objectFilter, 'search_numNivol'  , 'nivol'        ,'LIKE' , ''); 
              Ext.ux.rs.addFilterFromField(objectFilter, 'search_homme'     , 'EQUIPIER_IS_MALE' ,'='    , ''); 
              Ext.ux.rs.addFilterFromField(objectFilter, 'search_role'      , 'ID_ROLE_EQUIPIER' ,'='    , '0');
              Ext.ux.rs.addFilterFromField(objectFilter, 'search_email'     , 'EMAIL'            ,'LIKE' , ''); 
              Ext.ux.rs.addFilterFromField(objectFilter, 'search_mobile'    , 'MOBILE'           ,'LIKE' , ''); 
              Ext.ux.rs.addFilterFromField(objectFilter, 'search_enabled'   , 'ENABLED'          ,'='    , ''); 
              Ext.ux.rs.addFilterFromField(objectFilter, 'search_delegation', 'ID_DELEGATION'    ,'='    , '0');

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
                 {name: 'indicatif'   , type: 'string'  },
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
        id    : 'home-list-equipier-grid',
        store : equipierGridDataStore,
        cm    : new Ext.grid.ColumnModel([
            {id:'nomCol'              , header: 'Nom'        , width: 100 , sortable: true, dataIndex: 'nom'    },
            {id:'prenomCol'           , header: 'Prénom'     , width: 100 , sortable: true, dataIndex: 'prenom' },
            {id:'sexeCol'             , header: 'Sexe'       , width: 40  , sortable: true, dataIndex: 'homme'   , align:'center', 
              renderer:function(isHomme){
                return '<img style="vertical-align:bottom;" src="../img/famfamfam/user'+(!isHomme?'_female':'')+'.png" alt="'+(isHomme?'Homme':'Femme')+'" />';
              }
            },
            {id:'delegationCol'       , header: 'Délégation' , sortable: true, dataIndex: 'delegation', 
                renderer:function(idDelegation)
                {
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
                Ext.ux.Home.EquipiersGestion.initEquipierForm();
              }
        }],
        listeners:{ 
          rowdblclick : function(theGrid, rowIndex, e ){
              Ext.ux.Home.EquipiersGestion.equipierData = theGrid.store.getAt(rowIndex).data;
              Ext.ux.Home.EquipiersGestion.initEquipierForm();
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
			  html            : defautlHtmlNoUserSelected

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
      
      editUserWindow = new Ext.Window({
        id          : 'edit-user-windowCmp',
        applyTo     : 'edit-user-window',
        layout      : 'fit'             ,
        width       : 300               ,
        height      : 500               ,
        modal       : true              ,
        closeAction : 'hide'            ,
        plain       : true              ,
        items       : new Ext.TabPanel({
            id             : 'edit-user-window-tabsCmp' ,
            applyTo        : 'edit-user-window-tabs'    ,
            autoTabs       : true                       ,
            activeTab      : 0                          ,
            enableTabScroll: true                       ,
            defaults       : {autoScroll:true}          ,
            deferredRender : false                      ,
            border         : false
        })
      });



      var rolesUser = Ext.ux.Home.EquipiersGestion.allRolesUser;
      

      var cellFuncs = [
        function(oneRole) { return "<input id='edit-user-role_"+oneRole.id+"' type='checkbox' value='"+oneRole.id+"' onclick='EquipiersGestion.editUserRole("+oneRole.id+");'/>"; },
        function(oneRole) { return oneRole.label; }
      ];
      dwr.util.removeAllRows("edit-user-role-list");
      dwr.util.addRows("edit-user-role-list", rolesUser , cellFuncs, { escapeHtml:false });
      
      
			var tabPanelComp = Ext.getCmp('home_center');
			tabPanelComp.add(equipierPanel);
		},
    searchEquipier:function()
    {
      Ext.getCmp('home-list-equipier-grid').getStore().load({params:{start:0, limit:10}});
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
    
    initEquipierForm : function() 
    {
      if (this.equipierData==null)
      {
        this.equipierData = {
          idEquipier: -1,
          nom       : '',
          prenom    : '',
          indicatif : '',
          email     : '',
          mobile    : '',
          numNivol  : '',
          homme     : -1,
          enabled   : 1,
          delegation: 0,
          roles:[]
        };
      }
     
      var fieldsetData = {
        title         : 'Détails de l\'Equipier',
        prefixHtmlId  : 'equipierDetails',
        fields : [[{
                  htmlId      : 'edit_numNivol',
                  label       : 'Nivol',
                  value       : this.equipierData.numNivol,
                  type        : 'textInput',
                  readOnly    : false,
                  mandatory   : true,
                  colspan     : -1
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
                  readOnly    : false,
                  mandatory   : true,
                  colspan     : -1
                }, 
                {
                  htmlId      : 'edit_prenom',
                  label       : 'Prénom',
                  value       : this.equipierData.prenom,
                  type        : 'textInput',
                  readOnly    : false,
                  mandatory   : true,
                  colspan     : -1
                }], 
                [
                {
                  htmlId    : 'edit_homme',
                  label     : 'Sexe',
                  value     : this.equipierData.homme,
                  type      : 'select',
                  options   : [{id:'', label:''}, {id:'1', label:'Homme'}, {id:'0', label:'Femme'}],
                  readOnly  : false,
                  mandatory : false,
                  colspan   : -1
                }, 
                {
                    htmlId      : 'edit_indicatif',
                    label       : 'Indicatif',
                    value       : this.equipierData.indicatif,
                    type        : 'textInput',
                    readOnly    : false,
                    mandatory   : false,
                    colspan     : -1
                  }], 
                [{
                  htmlId    : 'edit_email',
                  label     : 'Email',
                  value     : this.equipierData.email,
                  type      : 'textInput',
                  readOnly  : false,
                  mandatory : false,
                  colspan   : -1
                }, 
                {
                  htmlId    : 'edit_mobile',
                  label     : 'Mobile',
                  value     : this.equipierData.mobile,
                  type      : 'textInput',
                  readOnly  : false,
                  mandatory : false,
                  colspan   : -1
                }], 
                [{
                  htmlId    : 'edit_enabled',
                  label     : 'Actif',
                  value     : this.equipierData.enabled,
                  type      : 'select',
                  options   : [{id:'', label:''}, {id:'1', label:'Oui'}, {id:'0', label:'Non'}],
                  readOnly  : false,
                  mandatory : false,
                  colspan   : -1
                },
                {
                  htmlId    : 'user_button',
                  label     : 'Utilisateur RDP',
                  value     : 'Editer',
                  type      : 'button',
                  readOnly  : false,
                  mandatory : false,
                  onClick   : "EquipiersGestion.editUser();",
                  colspan   : -1
                }
                
                ], 
                [{
                  htmlId    : 'edit_delegation',
                  label     : 'Delegation',
                  value     : this.equipierData.delegation,
                  type      : 'select',
                  options   : Ext.ux.Home.EquipiersGestion.allDelegations,
                  readOnly  : false,
                  mandatory : false,
                  colspan   :3
                }], 
                [{
                  htmlId    : 'edit_role',
                  label     : 'Rôle',
                  value     : 0,//Value setter en ajax
                  type      : 'checkbox',
                  options   : Ext.ux.Home.EquipiersGestion.allRoles,
                  readOnly  : false,
                  mandatory : false,
                  colspan   : 3
                }]],
          buttons: []
      };
      if(this.equipierData.idEquipier == -1)
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
            onClick : 'Ext.ux.Home.EquipiersGestion.initEquipierForm();'
          }
        ]
      }
      else if(this.equipierData.idEquipier != -1)
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
            onClick : 'Ext.ux.Home.EquipiersGestion.initEquipierForm();'
          },
          {
            htmlId  : 'interventions',
            label   : 'interventions',
            onClick : 'Ext.ux.Home.EquipiersGestion.displayInterventionList();'
          }
        ]
      }
      
      equipierTemplate.overwrite(Ext.getCmp('EquipierEditorPanel').body, fieldsetData);
      
      if(this.equipierData.idEquipier!=-1)
      {
        EquipiersGestionService.getEquipierRoles(this.equipierData.idEquipier, 
        function(listRole){
          for(i=0,count=listRole.length;i<count;i++)
          {
            Ext.getDom('edit_role_'+listRole[i].id).checked=true;
          }
        });
      }
    },
    displayInterventionList:function()
    {
      Ext.ux.Utils.InterventionList.displayInterventionList('EQUIPIER', Ext.get('edit_idEquipier').getValue(),
        function(rowData){
          openCrfIrp(rowData.idRegulation, rowData.idIntervention);
        }
      );
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
      var equipier = this.buildEquipierFromForm();
        EquipiersGestionService.createEquipier(equipier,
          {
            callback: function(dataFromBrowser)
            {
              Ext.ux.Home.EquipiersGestion.equipierData      = null;
              Ext.ux.Home.EquipiersGestion.initEquipierForm ();
              Ext.ux.Home.EquipiersGestion.searchEquipier   ();
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
    buildEquipierFromForm:function()
    {
      
      var equipier = {
        idEquipier          : Ext.getDom('edit_idEquipier').value,
        idDispositif        : 0,
        homme               : Ext.getDom('edit_homme'     ).value==1,
        enabled             : Ext.getDom('edit_enabled'   ).value==1,
        numNivol            : Ext.getDom('edit_numNivol'  ).value,
        nom                 : Ext.getDom('edit_nom'       ).value,
        prenom              : Ext.getDom('edit_prenom'    ).value,
        indicatif           : Ext.getDom('edit_indicatif' ).value,
        mobile              : Ext.getDom('edit_mobile'    ).value,
        email               : Ext.getDom('edit_email'     ).value,
        autreDelegation     : '',
        delegation          :{idDelegation:Ext.getDom('edit_delegation').value},
        
        idRoleDansDispositif       : 0,
        enEvaluationDansDispositif : false,
        idRoleEnEval               : 0,
        roles                      :[]
      };
 
      var rolesDef = Ext.ux.Home.EquipiersGestion.allRoles;
      var roles    = [];
      var i=0,counti=0;
      for(i=0,counti=rolesDef.length;i<counti;i++)
      {
        if(Ext.getDom('edit_role_'+rolesDef[i].id).checked)
        {//TODO faire les en evaluation
          var oneRole = {id:rolesDef[i].id, enEvaluation:false};
          if(rolesDef[i].evaluable)
          {//TODO, ajouter en evaluation dans le formulaire
            //oneRole.enEvaluation=Ext.getDom('edit_role_'+rolesDef[i].id+'_eval').checked;
          }
          roles.push(oneRole);
        }
      }
      
      equipier.roles = roles;
      
      return equipier;
    },
    
    modifyEquipier : function() {
    {
      var equipier = this.buildEquipierFromForm();
        EquipiersGestionService.modifyEquipier(equipier,
          {
            callback: function()
            { 
              
              Ext.ux.Home.EquipiersGestion.equipierData      = null;
              //Ext.ux.Home.EquipiersGestion.initEquipierForm ();
              defautlHtmlNoUserSelectedTmpl.overwrite(Ext.getCmp('EquipierEditorPanel').body, {});
              Ext.ux.Home.EquipiersGestion.searchEquipier   ();
            }
          });
      }
    },
    checkEquipierForm : function() {
      
      var error = false;
      var msg = ['Certaines données saisies sont incorrectes :'];
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
    },
    editUser:function()
    {
      //get the user from database to get it's id, status, roles
      EquipiersGestionService.getEquipierUserFromIdEquipier (Ext.get('edit_idEquipier').getValue(),
                                                             EquipiersGestion.editUserReturn
                                                             );
    },
    editUserReturn:function(user)
    {
      
      Ext.get('edit-user-userId'     ).dom.value  =user.idUser;
      Ext.get('edit-user-active-user').dom.checked=user.enabled;
      
      var rolesDefs = Ext.ux.Home.EquipiersGestion.allRolesUser;
      for(i=0,counti =rolesDefs.length;i<counti;i++)
        Ext.get('edit-user-role_'+rolesDefs[i].id).dom.checked = false;
      
      var roles = user.roles;
      
      if(roles != null)
      {
        for(i=0,counti =roles.length;i<counti;i++)
          Ext.get('edit-user-role_'+roles[i].id    ).dom.checked = true;
      }
      
      
      if(user.password != null && user.password != '')
      {
        Ext.get('edit-user-generated-password').update('Le nouveau password est \''+user.password+'\'');
        Ext.get('edit-user-generated-password').dom.style.display="block";
      }
      
      if(user.enabled)
      {
        Ext.get('edit-user-interface').dom.style.display="block";
        Ext.get('edit-user-not-user' ).dom.style.display="none";
      }
      else
      {
        Ext.get('edit-user-interface').dom.style.display="none";
        Ext.get('edit-user-not-user' ).dom.style.display="block";
      }
      
      editUserWindow.show();
    },    
    editUserStatus:function()
    {
      EquipiersGestionService.changeStatus( Ext.get('edit_idEquipier' ).getValue(),
                                            Ext.get('edit-user-userId').getValue(),
                                            Ext.get('edit-user-active-user').dom.checked,
                                            EquipiersGestion.editUserReturn
                                          )
    },
    editUserRole:function(idRole)
    {
      EquipiersGestionService.updateRoleForUser(Ext.get('edit-user-userId').getValue(),
                                                idRole,
                                                Ext.get('edit-user-role_'+idRole).dom.checked,
                                                EquipiersGestion.editUserReturn
                                               );  
    },
    generateNewPassword:function()
    {
      EquipiersGestionService.generateNewPassword(Ext.get('edit-user-userId').getValue(),
                                                  EquipiersGestion.editUserReturn);
      
    }
	};
}();