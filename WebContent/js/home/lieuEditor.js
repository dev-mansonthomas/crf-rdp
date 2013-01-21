Ext.namespace('Ext.ux.Home.LieuEditorUi');
//id           : 'LieuGridToolbar-idTypeLieu',

Ext.ux.Home.TypeLieuCombo = Ext.extend(Ext.form.ComboBox,{
  fieldLabel   : 'Type Lieu',
  anchor       : '100%',
  mode         : 'local',
  typeAhead    : true,
  editable     : false,
  triggerAction: 'all',
  displayField : 'labelTypeLieu',
  valueField   : 'idTypeLieu',
  selectOnFocus: true
}
);
Ext.reg('TypeLieuCombo', Ext.ux.Home.TypeLieuCombo);


Ext.ux.Home.LieuEditorUi = Ext.extend(Ext.Panel, {
  title        : 'Editeur de Lieu',
  layout       : 'fit',
  initComponent: function() 
  {
    /***************************Google Maps Window**************************************************/
    var gmapPanel = {
                        id         : 'lieu-editor-gmap-panel',
                        xtype      : 'gmappanel',
                        gmapType   : 'map',
                        zoomLevel  : 14,
                        mapConfOpts: ['enableScrollWheelZoom','enableDoubleClickZoom','enableDragging'],
                        mapControls: ['GLargeMapControl','GMapTypeControl', 'GOverviewMapControl', 'NonExistantControl' ],
                        title      : 'Carte de Paris',
                        closable   : false,
                        setCenter: {//paris
                            lat: 48.85436, 
                            lng: 2.348156
                        }                        
                    };
    
    this.gmapWindow = new Ext.Window({
        id         : 'lieu-editor-gmap-window',
        layout     : 'fit',
        width      : 900,
        height     : 650,
        closeAction: 'hide',
        plain      : true,
        items      : [gmapPanel],
        buttons: [{
            text: 'Close',
            handler: function(button, event){
                Ext.getCmp('lieu-editor-gmap-window').hide();
            }
        }]
    });
    
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
                if(rowData.idLieu == 0)
                {
                  alert('Cette ligne n\'est pas modifiable et est présente pour des raisons techniques.');
                  return;
                }
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
                   id: 'lieuEditorGridPagingToolbar',
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
                    id           : 'LieuGridToolbar-idTypeLieu',
                    xtype        : 'TypeLieuCombo',
                    store        : new Ext.data.ArrayStore({
                        fields    : ['idTypeLieu', 'labelTypeLieu'],
                        data      : crfIrpUtils.getListForSimpleStore('allTypeLieuOrdered'),
                        idIndex   : 0,
                        idProperty: 'idTypeLieu'
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
                     xtype     : 'button',
                     text      : 'Effacer Critères',
                     iconCls   : 'lieuEraseButton',
                     handler    : function(){
                      lieuEditor.eraseSearchCriteria();
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
                      lieuEditor.rechercher();
                     }
                  }
               ]
            }
         };    
    
    
    
/***************************FORMULAIRE**************************************************/    
      this.items = [
         {
            id            : 'LieuEditorFormPanel',
            xtype         : 'panel' ,
            height        : 175     ,
            layout        : 'border',
            listeners    : {
              render:function()
              {
                Ext.getCmp('LieuEditorFormPanel').collapse();
              }
            },            
            hideBorders   : false   ,
            collapseFirst : true    ,
            collapsible   : true    ,
            items         : [
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
                        xtype        : 'TypeLieuCombo',
                        store        : new Ext.data.ArrayStore({
                           fields    : ['idTypeLieu', 'labelTypeLieu'],
                           data      : crfIrpUtils.getListForSimpleStore('allTypeLieuOrdered'),
                           idIndex   : 0,
                           idProperty: 'idTypeLieu'
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
                        maxLength : 100,
                        defaultAutoCreate:{tag:'input',type:'text',autocomplete:'off', maxLength:100},
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
                        defaultAutoCreate:{tag:'input',type:'text',autocomplete:'off', maxLength:10},
                        maxLength : 10,
                        anchor    : '100%',
                        maskRe    : /[0-9_]/i,
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
                        defaultAutoCreate:{tag:'input',type:'text',autocomplete:'off', maxLength:100},
                        maxLength : 100,
                        anchor    : '100%',
                        maskRe    : Ext.form.VTypes.emailMask,
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
                        defaultAutoCreate:{tag:'input',type:'text',autocomplete:'off', maxLength:300},
                        maxLength : 300,
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
                        defaultAutoCreate:{tag:'input',type:'text',autocomplete:'off', maxLength:100},
                        maxLength : 100,
                        anchor    : '100%',
                        listeners : {
                          focus:function()
                          {
                            crfIrpUtils.fieldEdit(this.id);
                          },
                          blur:function()
                          {
                            lieuEditor.updateAddress(this.id, 'addresse');
                          }
                        }
                     },
                     {
                        id        : 'LieuEditor-codePostal' ,
                        xtype     : 'textfield'             ,
                        fieldLabel: 'Code Postal'           ,
                        defaultAutoCreate:{tag:'input',type:'text',autocomplete:'off', maxLength:5},
                        maxLength : 5,
                        anchor    : '100%',
                        listeners : {
                          focus:function()
                          {
                            crfIrpUtils.fieldEdit(this.id);
                          },
                          blur:function()
                          {
                            lieuEditor.updateAddress(this.id, 'codePostal');
                          }
                        }
                     },
                     {
                        id        : 'LieuEditor-ville'      ,
                        xtype     : 'textfield'             ,
                        fieldLabel: 'Ville <img style="height: 16px; width: 16px;" alt="pix" src="../img/pix.png" id="googleAdressCheckStatus">'                 ,
                        anchor    : '100%',
                        defaultAutoCreate:{tag:'input',type:'text',autocomplete:'off', maxLength:100},
                        maxLength : 100,
                        listeners : {
                          focus:function()
                          {
                            crfIrpUtils.fieldEdit(this.id);
                          },
                          blur:function()
                          {
                            lieuEditor.updateAddress(this.id, 'ville');
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
                        maxLength : 1000,
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
     Ext.getCmp('lieuEditorGridPagingToolbar').moveFirst();
    // Ext.getCmp('LieuGrid'                   ).getStore ().reload();
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
     Ext.getCmp('LieuEditorFormPanel').expand();
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
     Ext.getCmp('LieuEditorFormPanel').expand();
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
    lieuEditor.rechercher();
  },
  disableLieu:function()
  {
    LieuEditorService.disableLieu(Ext.get('LieuEditor-id'                ).dom.value, this.disableLieuReturn);
  },
  disableLieuReturn:function()
  {
    crfIrpUtils.resetToolbar('lieuEditorToolbar', Ext.ux.Home.LieuEditorUi.toolbars.toolbarForDisabledLieu);
    lieuEditor.rechercher();
  },
  deleteLieu:function()
  {
    LieuEditorService.deleteLieu(Ext.get('LieuEditor-id'                ).dom.value, this.deleteLieuReturn);
  },
  deleteLieuReturn:function()
  {
    lieuEditor.resetForm ();
    lieuEditor.eraseSearchCriteria();
    lieuEditor.rechercher();
    lieuEditor.closeLieu ();
  },
  closeLieu:function()
  {
    this.resetForm();
    Ext.getCmp('LieuEditorFormPanel').collapse();
     crfIrpUtils.resetToolbar('lieuEditorToolbar',[]);
  },
  eraseSearchCriteria:function()
  {
    Ext.getCmp('LieuGridToolbar-idTypeLieu').setValue(0);
    Ext.getCmp('LieuGridToolbar-nom'       ).setValue('');
    Ext.getCmp('LieuGridToolbar-codePostal').setValue('');

  },
  watchOnGoogleMaps:function()
  {
    var gps = $('LieuEditor-gps').value;
    
    if(gps == null || gps == "" || gps ==","|| gps =="0,0")
    {
      alert('Afin de pouvoir visualiser l\'adresse sur google maps, il faut des coordonnées GPS valides');
      return false;
    }
    var gpsArray = gps.split(',');
    
    this.gmapWindow.show  ();
    this.gmapWindow.center();
    var map = Ext.getCmp('lieu-editor-gmap-panel');
    map.goTo(gpsArray[0], gpsArray[1]);
    map.addMarker(gpsArray[0], 
                  gpsArray[1], 
                  null, 
                  'lieu_cat_'+$('LieuEditor-idTypeLieu').value, 
                  true,
                  $('LieuEditor-nom').value, 
                  $('LieuEditor-codePostal').value+' '+$('LieuEditor-address').value, 
                  $('LieuEditor-id').value);
    
   },
   updateAddress:function(fieldId, fieldName)
   {
    var rue       =$('LieuEditor-address'   );
    var codePostal=$('LieuEditor-codePostal');
    var ville     =$('LieuEditor-ville'     );
  
    rue       .value=rue       .value.strip();
    codePostal.value=codePostal.value.strip();
    ville     .value=ville     .value.strip();
  
    this.updateStringField(fieldId, fieldName);
    
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
  },
  updateAddressReturn:function(place)
  {
    var coordinates = place.Point.coordinates;
    //ATTENTION, visiblement, les coordonnées google sont fournies dans l'ordre (Longitude,Latitude) alors qu'ils sont utilisé partout ailleurs dans l'ordre (Latitude,Longitude)
    $('LieuEditor-gps').value=coordinates[1]+','+coordinates[0];
    if(consoleEnabled)
    {
      console.log("coordinates for intervention id='"+$('LieuEditor-id').value+"' are : '"+coordinates[1]+"', '"+coordinates[0]+"'");
    }
    
    LieuEditorService.updateGoogleCoordinates(coordinates[1], coordinates[0], $('LieuEditor-id').value, lieuEditor.updateAddressSaveReturn);
  
    $('googleAdressCheckStatus').src=contextPath+"/img/famfamfam/cog.png";
  },
  updateAddressSaveReturn:function()
  {
    $('googleAdressCheckStatus').src=contextPath+"/img/famfamfam/accept.png";
  },
  updateAddressErrorReturn:function(response)
  {
    if(consoleEnabled)
    {
      console.log("Google Maps error",response);
    }
    
    var icon = response.Status.code=='GoogleMapsUnavailable'?'disconnect':'exclamation';
    $('googleAdressCheckStatus').src=contextPath+"/img/famfamfam/"+icon+".png";
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
       text   : 'Fermer',
       iconCls: 'lieuCloseButton',
       handler: function()
       {
        lieuEditor.closeLieu();
       }
       
    },
    {
       xtype: 'tbseparator'
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
     text   : 'Fermer',
     iconCls: 'lieuCloseButton',
     handler: function()
     {
      lieuEditor.closeLieu();
     }
     
  },
  {
     xtype: 'tbseparator'
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
     text   : 'Fermer',
     iconCls: 'lieuCloseButton',
     handler: function()
     {
      lieuEditor.closeLieu();
     }
     
  },
  {
     xtype: 'tbseparator'
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