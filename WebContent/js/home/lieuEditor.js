Ext.namespace('Ext.ux.Home.LieuEditorUi');





Ext.ux.Home.LieuEditorUi = Ext.extend(Ext.Panel, {
  title        : 'Editeur de Lieu',
  initComponent: function() 
  {
    
    
    
/***************************STORE**************************************************/    
    var lieuGridDataStore = new Ext.data.Store({
      remoteSort:true,
           proxy: new Ext.ux.rs.data.DwrProxy({
               call          : LieuEditorService.getLieux ,
               args          : []              ,
               proxyConfig   : Ext.ux.rs.data.PAGING_WITH_SORT_AND_FILTER,
               filterCallBack: function()
               {
               
                  var objectFilter = new Array();
                  

                  Ext.ux.rs.addFilterFromExtField(objectFilter,'LieuGridToolbar-idTypeLieu'   , 'idTypeLieu', '='   ,'');
                  Ext.ux.rs.addFilterFromExtField(objectFilter,'LieuGridToolbar-nom'          , 'nom'       , 'LIKE','');
                  Ext.ux.rs.addFilterFromExtField(objectFilter,'LieuGridToolbar-codePostal'   , 'codePostal', 'LIKE','');

                  return objectFilter;
              }
         }),
     reader: new Ext.ux.rs.data.JsonReader ({
            root: 'data',
   totalProperty: 'totalCount',
          fields:
             [
                 {name: 'idLieu'              , type: 'int'   },
                 {name: 'idTypeLieu'          , type: 'int'   },
                 {name: 'icon'                , type: 'string'},
                 {name: 'iconGmapInit'        , type: 'string'},
                 {name: 'nom'                 , type: 'string'},
                 {name: 'addresse'            , type: 'string'},
                 {name: 'codePostal'          , type: 'string'},
                 {name: 'ville'               , type: 'string'},
                 {name: 'googleCoordsLat'     , type: 'float' },
                 {name: 'googleCoordsLong'    , type: 'float' },
                 {name: 'infoComplementaire'  , type: 'string'},
                 {name: 'actif'               , type: 'boolean'}
             ]
         })
     });
    
/***************************GRID**************************************************/    
    var lieuGrid = {
            id    : 'LieuGrid',
            store : lieuGridDataStore,
            xtype : 'grid',
            title : 'Liste des Lieux Existants',
            viewConfig:{
              forceFit:true
            },
            listeners : { 
              rowdblclick : function(theGrid, rowIndex, e )
              {
                var rowData = theGrid.store.getAt(rowIndex).data;
                lieuEditor.editLieu(rowData.idLieu)
              }
            },
            height: 335,
            enableHdMenu: true,
            columns: [
               {
                  xtype     : 'gridcolumn',
                  header    : 'id',
                  sortable  : true,
                  resizable : true,
                  width     : 40,
                  dataIndex : 'idLieu'
               },
               {
                  xtype     : 'gridcolumn',
                  header    : 'actif',
                  sortable  : true,
                  resizable : true,
                  width     : 40,
                  dataIndex : 'actif',
                  renderer : function(value, metadata, record, rowIndex, colIndex, store)
                  {
                    return '<img src="'+contextPath+'/img/famfamfam/world'+(record.data.actif?'':'_disabled')+'.png" alt="Le lieu est '+(record.data.actif?'actif':'inactif')+'"/>';
                  }
               },
               {
                  xtype     : 'gridcolumn',
                  header    : 'Type',
                  sortable  : true,
                  resizable : true,
                  width     : 40,
                  dataIndex : 'idTypeLieu',
                  renderer : function(value, metadata, record, rowIndex, colIndex, store)
                  {
                    try
                    {
                      return crfIrpUtils.getTypeLieu(value).labelTypeLieu;;
                    }
                    catch(e)
                    {
                      if(consoleEnabled)
                      {
                        console.log("Erreur lors de la récupération du label pour le type lieu (lieuEditor)",e);
                      }
                      return '';
                    }
                  }
               },
               {
                  xtype     : 'gridcolumn',
                  header    : 'Nom',
                  sortable  : true,
                  resizable : true,
                  width     : 100,
                  dataIndex : 'nom'
               },
               {
                  xtype     : 'gridcolumn',
                  header    : 'Adresse',
                  sortable  : true,
                  resizable : true,
                  width     : 100,
                  dataIndex : 'addresse'
               },
               {
                  xtype     : 'gridcolumn',
                  header    : 'Code Postal',
                  sortable  : true,
                  resizable : true,
                  dataIndex : 'codePostal'
               },
               {
                  xtype     : 'gridcolumn',
                  header    : 'Ville',
                  sortable  : true,
                  resizable : true,
                  width     : 100,
                  dataIndex : 'ville'
               }
            ],
            bbar: {
                xtype: 'paging',
          pageSize   : 10,
          store      : lieuGridDataStore,
          displayInfo: true,
          displayMsg : 'Intervention(s) {0} à {1} de {2}',
          emptyMsg   : 'aucune intervention correspondant à la recherche',
                items: [
                  {
                     xtype: 'tbfill'
                  },
                  {
                     xtype  : 'button',
                     text   : 'Nouveau Lieu',
                     iconCls: 'lieuNewButton',
                     handler: function(){
                      lieuEditor.createNewLieu();
                     }
                  }
               ]
            },
            tbar: {
               xtype: 'toolbar',
               items: [
                  {
                     xtype : 'label',
                     text  : 'Type Lieu',
                     style :'padding-right:15px;padding-left:5px;'
                  },
                  {
                    id           :'LieuGridToolbar-idTypeLieu',
                    xtype        : 'combo',
                    fieldLabel   : 'Type Lieu',
                    anchor       : '100%',
                    mode         : 'local',
                    typeAhead    : true,
                    editable     : false,
                    triggerAction: 'all',
                    displayField : 'labelTypeLieu',
                    valueField   : 'idTypeLieu',
                    store        : new Ext.data.ArrayStore({
                        fields  : ['idTypeLieu', 'labelTypeLieu'],
                        data    : crfIrpUtils.getListForSimpleStore('allTypeLieuOrdered'),
                        idIndex : 0
                    })
                  },
                  {
                     xtype     : 'tbseparator'
                  },
                  {
                     xtype     : 'label',
                     text      : 'Nom',
                     style     :'padding-right:15px;padding-left:5px;'
                  },
                  {
                     id        :'LieuGridToolbar-nom',
                     xtype     : 'textfield',
                     fieldLabel: 'Label'
                  },
                  {
                     xtype     : 'tbseparator'
                  },
                  {
                     xtype     : 'label',
                     text      : 'Code Postal',
                     style     : 'padding-right:15px;padding-left:5px;'
                  },
                  {
                     id        :'LieuGridToolbar-codePostal',
                     xtype     : 'textfield',
                     fieldLabel: 'Label'
                  },
                  {
                     xtype  : 'tbfill'
                  },
                  {
                     xtype  : 'button',
                     text   : 'Rechercher',
                     iconCls: 'lieuSearchButton',
                     handler: function(){
                      lieuEditor.rechercher();
                     }
                  }
               ]
            }
         };    
    
    
    
/***************************FORMULAIRE**************************************************/    
      this.items = [
         {
            xtype       : 'panel' ,
            height      : 175     ,
            layout      : 'border',
            hideBorders : false   ,
            items       : [
               {
                  xtype       : 'form',
                  labelWidth  : 100   ,
                  labelAlign  : 'left',
                  layout      : 'form',
                  region      : 'west',
                  width       : 650   ,
                  layoutConfig: {
                     labelSeparator: ' '
                  },
                  items: [
                     {
                        id        : 'LieuEditor-id' ,
                        xtype     : 'numberfield'   ,
                        fieldLabel: 'id'            ,
                        anchor    : '100%'          ,
                        disabled  : true
                     },
                     {
                        id           : 'LieuEditor-idTypeLieu',
                        xtype        : 'combo',
                        fieldLabel   : 'Type Lieu',
                        anchor       : '100%',
                        mode         : 'local',
                        typeAhead    : true,
                        editable     : false,
                        triggerAction: 'all',
                        displayField : 'labelTypeLieu',
                        store        : new Ext.data.ArrayStore({
                            fields  : ['idTypeLieu', 'labelTypeLieu'],
                            data    : crfIrpUtils.getListForSimpleStore('allTypeLieuOrdered'),
                            idIndex : 0
                        }),
                        listeners : {
                          focus:function()
                          {
                            crfIrpUtils.fieldEdit(this.id);
                          },
                          blur:function()
                          {
                            lieuEditor.updateIntField(this.id, 'idTypeLieu');
                          }
                        }
                     },
                     {
                        id        : 'LieuEditor-nom',
                        xtype     : 'textfield',
                        fieldLabel: 'Nom',
                        anchor    : '100%',
                        listeners : {
                          focus:function()
                          {
                            crfIrpUtils.fieldEdit(this.id);
                          },
                          blur:function()
                          {
                            lieuEditor.updateStringField(this.id, 'nom');
                          }
                        }
                     },
                     {
                        id        : 'LieuEditor-telephone',
                        xtype     : 'textfield',
                        fieldLabel: 'Téléphone',
                        anchor    : '100%',
                        listeners : {
                          focus:function()
                          {
                            crfIrpUtils.fieldEdit(this.id);
                          },
                          blur:function()
                          {
                            lieuEditor.updateStringField(this.id, 'telephone');
                          }
                        }
                     },
                     {
                        id        : 'LieuEditor-mail',
                        xtype     : 'textfield',
                        fieldLabel: 'Mail',
                        anchor    : '100%',
                        listeners : {
                          focus:function()
                          {
                            crfIrpUtils.fieldEdit(this.id);
                          },
                          blur:function()
                          {
                            lieuEditor.updateStringField(this.id, 'mail');
                          }
                        }
                     },
                     {
                        id        : 'LieuEditor-web',
                        xtype     : 'textfield',
                        fieldLabel: 'web',
                        anchor    : '100%',
                        emptyText :'http://',
                        listeners : {
                          focus:function()
                          {
                            crfIrpUtils.fieldEdit(this.id);
                          },
                          blur:function()
                          {
                            lieuEditor.updateStringField(this.id, 'url');
                          }
                        }
                     }
                  ]
               },
               {
                  xtype       : 'form'  ,
                  labelWidth  : 100     ,
                  labelAlign  : 'left'  ,
                  layout      : 'form'  ,
                  region      : 'center',
                  layoutConfig: {
                     labelSeparator: ' '
                  },
                  items: [
                     {
                        id        : 'LieuEditor-address',
                        xtype     : 'textfield'         ,
                        fieldLabel: 'Adresse'           ,
                        anchor    : '100%',
                        listeners : {
                          focus:function()
                          {
                            crfIrpUtils.fieldEdit(this.id);
                          },
                          blur:function()
                          {
                            lieuEditor.updateStringField(this.id, 'addresse');
                          }
                        }
                     },
                     {
                        id        : 'LieuEditor-codePostal' ,
                        xtype     : 'textfield'             ,
                        fieldLabel: 'Code Postal'           ,
                        anchor    : '100%',
                        listeners : {
                          focus:function()
                          {
                            crfIrpUtils.fieldEdit(this.id);
                          },
                          blur:function()
                          {
                            lieuEditor.updateStringField(this.id, 'codePostal');
                          }
                        }
                     },
                     {
                        id        : 'LieuEditor-ville'      ,
                        xtype     : 'textfield'             ,
                        fieldLabel: 'Ville'                 ,
                        anchor    : '100%',
                        listeners : {
                          focus:function()
                          {
                            crfIrpUtils.fieldEdit(this.id);
                          },
                          blur:function()
                          {
                            lieuEditor.updateStringField(this.id, 'ville');
                          }
                        }
                     },
                     {
                        id        : 'LieuEditor-gps',
                        xtype     : 'textfield'     ,
                        fieldLabel: 'GPS (lat,long)',
                        anchor    : '100%',
                        disabled  : true
                     },
                     {
                        id        : 'LieuEditor-infoComplementaire' ,
                        xtype     : 'textarea'                      ,
                        fieldLabel: 'Info Complémentaires'          ,
                        anchor    : '100%',
                        listeners : {
                          focus:function()
                          {
                            crfIrpUtils.fieldEdit(this.id);
                          },
                          blur:function()
                          {
                            lieuEditor.updateStringField(this.id, 'infoComplementaire');
                          }
                        }
                     }
                  ]
               }
            ]
         },
         lieuGrid
      ];
      
     
      
    
      
      
       this.tbar={
         id   : 'lieuEditorToolbar',
         xtype: 'toolbar',
         items: []
       };
  
      Ext.ux.Home.LieuEditorUi.superclass.initComponent.call(this);
      
      var tabPanelComp = Ext.getCmp('home_center');
      tabPanelComp.add(this);
      this.rechercher();
      
   },
   rechercher:function()
   {
     Ext.getCmp('LieuGrid').getStore().reload();
   },
   resetForm:function()
   {
     Ext.get('LieuEditor-id'                ).dom.value='';
     Ext.getCmp('LieuEditor-idTypeLieu'        ).setValue ('');
     Ext.get('LieuEditor-nom'               ).dom.value='';
     Ext.get('LieuEditor-telephone'         ).dom.value='';
     Ext.get('LieuEditor-mail'              ).dom.value='';
     Ext.get('LieuEditor-web'               ).dom.value='';
     Ext.get('LieuEditor-address'           ).dom.value='';
     Ext.get('LieuEditor-codePostal'        ).dom.value='';
     Ext.get('LieuEditor-ville'             ).dom.value='';
     Ext.get('LieuEditor-gps'               ).dom.value='';
     Ext.get('LieuEditor-infoComplementaire').dom.value='';
   },
   createNewLieu:function()
   {
     this.resetForm();
     LieuEditorService.createNewEmptyLieu(this.createNewLieuReturn);
   },
   createNewLieuReturn:function(idLieu)
   {
     Ext.get('LieuEditor-id').highlight();
     Ext.get('LieuEditor-id').dom.value=idLieu;
     crfIrpUtils.resetToolbar('lieuEditorToolbar', Ext.ux.Home.LieuEditorUi.toolbars.createToolbar);
   },
   editLieu:function(idLieu)
   {
     LieuEditorService.getLieu(idLieu, this.editLieuReturn);
   },
   editLieuReturn:function(lieu)
   {
     Ext.get('LieuEditor-id'                ).dom.value=lieu.idLieu;
     Ext.getCmp('LieuEditor-idTypeLieu'     ).setValue(lieu.idTypeLieu);
     Ext.get('LieuEditor-nom'               ).dom.value=lieu.nom;
     Ext.get('LieuEditor-telephone'         ).dom.value=lieu.telephone;
     Ext.get('LieuEditor-mail'              ).dom.value=lieu.mail;
     Ext.get('LieuEditor-web'               ).dom.value=lieu.url;
     Ext.get('LieuEditor-address'           ).dom.value=lieu.addresse;
     Ext.get('LieuEditor-codePostal'        ).dom.value=lieu.codePostal;
     Ext.get('LieuEditor-ville'             ).dom.value=lieu.ville;
     Ext.get('LieuEditor-gps'               ).dom.value=lieu.googleCoordsLat+','+lieu.googleCoordsLong;
     Ext.get('LieuEditor-infoComplementaire').dom.value=lieu.infoComplementaire;
     
     if(lieu.actif)
     {
        crfIrpUtils.resetToolbar('lieuEditorToolbar', Ext.ux.Home.LieuEditorUi.toolbars.toolbarForEnabledLieu);
     }
     else
     {
        crfIrpUtils.resetToolbar('lieuEditorToolbar', Ext.ux.Home.LieuEditorUi.toolbars.toolbarForDisabledLieu);
     }
     
   },
   enableLieu:function()
   {
                    
                    
    if(this.formValidationWindow == null)
    {
      this.formValidationWindow = new Ext.ux.Utils.FormValidationWindow({
         validateFunction       : function(){lieuEditor.doEnableLieu();},
         gridTitle              : 'Vérification du Lieu',
         mandatoryAlertBoxTitle : 'Le lieu ne peut pas être activé',
         mandatoryAlertBoxText  : 'Des conditions nécessaires ne sont pas remplies, veuillez les corriger'
       }
      );
    }
    
    var mandatoryFields=[
        ['LieuEditor-idTypeLieu'  ,'Le type de lieu est obligatoire'],
        ['LieuEditor-nom'         ,'Le nom est obligatoire'         ],
        ['LieuEditor-address'     ,'L\'adresse est obligatoire'     ],
        ['LieuEditor-codePostal'  ,'Le code postal est obligatoire' ],
        ['LieuEditor-ville'       ,'La ville est obligatoire'       ]
      ];
      
    var messageList       = [];  
    var fieldInputError = false;
    
    for(var i=0, count=mandatoryFields.length;i<count;i++)
    {
      
      var error = !crfIrpUtils.checkMandatoryField(mandatoryFields[i][0]);
      
      if(error)
      {
        messageList.push([mandatoryFields[i][1],1]);
      }
      
      fieldInputError =  error || fieldInputError;
    }
    
    
      
  
    if(fieldInputError)
    {
      this.formValidationWindow.display(messageList);
      return false;  
    }
    else
    {
      this.doEnableLieu()  
    }                  
                    
  
   },
   doEnableLieu:function()
   {
      LieuEditorService.enableLieu (Ext.get('LieuEditor-id'                ).dom.value, this.enableLieuReturn);
   },
   enableLieuReturn:function()
   {
     crfIrpUtils.resetToolbar('lieuEditorToolbar', Ext.ux.Home.LieuEditorUi.toolbars.toolbarForEnabledLieu);
     this.rechercher();
   },
   disableLieu:function()
   {
     LieuEditorService.disableLieu(Ext.get('LieuEditor-id'                ).dom.value, this.disableLieuReturn);
   },
   disableLieuReturn:function()
   {
      crfIrpUtils.resetToolbar('lieuEditorToolbar', Ext.ux.Home.LieuEditorUi.toolbars.toolbarForDisabledLieu);
      this.rechercher();
   },
   deleteLieu:function()
   {
     LieuEditorService.deleteLieu(Ext.get('LieuEditor-id'                ).dom.value, this.deleteLieuReturn);
   },
   deleteLieuReturn:function(deleteStatus)
   {
     this.resetForm();
     this.rechercher();
   },
   watchOnGoogleMaps:function()
   {
     alert('Todo');
   },
   updateStringField:function(fieldId, fieldName, objectIdForGraphicalEffect){
      if(!objectIdForGraphicalEffect)
        objectIdForGraphicalEffect = fieldId;
    
      var idLieu = $('LieuEditor-id').value;
      if(idLieu == 0 || idLieu == '')
      {
        $(fieldId).value='';
        crfIrpUtils.defaultBackgroundColorForField(objectIdForGraphicalEffect);
      }
      
  
      crfIrpUtils.checkField (fieldId);
      crfIrpUtils.fieldSaving(objectIdForGraphicalEffect);
      var fieldValue = Ext.getCmp(fieldId).getValue();
      if(fieldValue!='' && fieldValue != $(fieldId).oldValue)
      {
        LieuEditorService.updateStringField(
                                            idLieu    ,
                                            fieldName ,
                                            fieldValue,
                                            function()
                                            {
                                              crfIrpUtils.defaultBackgroundColorForField(objectIdForGraphicalEffect);
                                            });
      }
      else
        crfIrpUtils.defaultBackgroundColorForField(objectIdForGraphicalEffect);
    },
    updateIntField:function(fieldId, fieldName, objectIdForGraphicalEffect){
      if(!objectIdForGraphicalEffect)
        objectIdForGraphicalEffect = fieldId;
    
      var idLieu = $('LieuEditor-id').value;
      if(idLieu == 0 || idLieu == '')
      {
        $(fieldId).value='';
        crfIrpUtils.defaultBackgroundColorForField(objectIdForGraphicalEffect);
      }
      
  
      crfIrpUtils.checkField (fieldId);
      crfIrpUtils.fieldSaving(objectIdForGraphicalEffect);
      var fieldValue = Ext.getCmp(fieldId).getValue();
      if(fieldValue!='' && fieldValue != $(fieldId).oldValue)
      {
        LieuEditorService.updateIntegerField(
                                            idLieu    ,
                                            fieldName ,
                                            fieldValue,
                                            function()
                                            {
                                              crfIrpUtils.defaultBackgroundColorForField(objectIdForGraphicalEffect);
                                            });
      }
      else
        crfIrpUtils.defaultBackgroundColorForField(objectIdForGraphicalEffect);
    },
    updateFloatField:function(fieldId, fieldName, objectIdForGraphicalEffect){
      if(!objectIdForGraphicalEffect)
        objectIdForGraphicalEffect = fieldId;
    
      var idLieu = $('LieuEditor-id').value;
      if(idLieu == 0 || idLieu == '')
      {
        $(fieldId).value='';
        crfIrpUtils.defaultBackgroundColorForField(objectIdForGraphicalEffect);
      }
      
  
      crfIrpUtils.checkField (fieldId);
      crfIrpUtils.fieldSaving(objectIdForGraphicalEffect);
      var fieldValue = Ext.getCmp(fieldId).getValue();
      if(fieldValue!='' && fieldValue != $(fieldId).oldValue)
      {
        LieuEditorService.updateFloatField(
                                            idLieu    ,
                                            fieldName ,
                                            fieldValue,
                                            function()
                                            {
                                              crfIrpUtils.defaultBackgroundColorForField(objectIdForGraphicalEffect);
                                            });
      }
      else
        crfIrpUtils.defaultBackgroundColorForField(objectIdForGraphicalEffect);
    }
});

Ext.ux.Home.LieuEditorUi.toolbars     = {
 createToolbar :[
    {
       xtype  : 'button',
       text   : 'Voir Sur Google Maps',
       iconCls: 'lieuWatchOnGoogleMapsButton',
       handler:function()
       {
         lieuEditor.watchOnGoogleMaps();
       }
    },
    {
       xtype: 'tbseparator'
    },
    {
       xtype  : 'button',
       text   : 'Activer',
       iconCls: 'lieuEnableButton',
       handler:function()
       {
         lieuEditor.enableLieu();
       }
    },
    {
       xtype: 'tbfill'
    },
    {
       xtype  : 'button',
       text   : 'Supprimer',
       iconCls: 'lieuDeleteButton',
       handler: function()
       {
        lieuEditor.deleteLieu();
       }
       
    }
 ],

toolbarForEnabledLieu : [

  {
     xtype  : 'button',
     text   : 'Voir Sur Google Maps',
     iconCls: 'lieuWatchOnGoogleMapsButton',
     handler:function()
     {
       lieuEditor.watchOnGoogleMaps();
     }
  },
  {
     xtype: 'tbseparator'
  },
  {
     xtype  : 'button',
     text   : 'Désactiver',
     iconCls: 'lieuDisableButton',
     handler:function()
     {
       lieuEditor.disableLieu();;
     }
  },
  {
     xtype: 'tbfill'
  },
  {
     xtype  : 'button',
     text   : 'Supprimer',
     iconCls: 'lieuDeleteButton',
       handler: function()
       {
          lieuEditor.deleteLieu();
       }
       
    }
 ],

toolbarForDisabledLieu : [
    {
       xtype  : 'button',
     text   : 'Voir Sur Google Maps',
     iconCls: 'lieuWatchOnGoogleMapsButton',
     handler:function()
     {
       lieuEditor.watchOnGoogleMaps();
     }
  },
  {
     xtype: 'tbseparator'
  },
  {
     xtype  : 'button',
     text   : 'Activer',
     iconCls: 'lieuEnableButton',
     handler:function()
     {
       lieuEditor.enableLieu();
     }
  },
  {
     xtype: 'tbfill'
  },
  {
     xtype  : 'button',
     text   : 'Supprimer',
     iconCls: 'lieuDeleteButton',
       handler: function()
       {
         lieuEditor.deleteLieu();
       }
       
    }
 ]};