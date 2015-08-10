Ext.namespace('Ext.ux.crfrdp.EquipierSearchCombo');

/**
 * 
 * searchType : 0 : Recherche d'équipier sans restriction
 *              1 : Recherche d'équipier pour un dispositif (ne doit pas être déjà affecté a un dispositif et on fitre sur un role, pas en évaluation sur le role selectionné) 
 * */
Ext.ux.crfrdp.EquipierSearchCombo = Ext.extend(Ext.form.ComboBox,{
  id          : 'DispositifEquipierSearch', 
  searchType  : 0,
  displayField: 'numNivol',
  loadingText : 'Recherche en cours...',
  width       : 570,
  listWidth   : 570,
  pageSize    : 10,
  minChars    : 1,
  hideTrigger : true,
  itemSelector: 'div.search-item',  
  listeners   : {
    // delete the previous query in the beforequery event or set
    // combo.lastQuery = null (this will reload the store the next time it expands)
    beforequery: function(qe){
        delete qe.combo.lastQuery;
  }},

  
  initComponent: function() {
    
    
    if(this.filterCallBack==null || ! this.filterCallBack instanceof Object)
    {
      if(consoleEnabled)
      {
        console.log("Ext.ux.crfrdp.EquipierSearchCombo : this.filterCallBack is not defined");   
      }
     
      throw "this.filterCallBack is not defined";
    }
    
    try
    {
      /* Combo Box de recherche d'équipier*/ 
      var equipierSearchDataStore = new Ext.data.Store({
          proxy: new Ext.ux.rs.data.DwrProxy({
                 call           : MonitorInputDispositif.searchEquipier,
                 args           : [this.searchType],
                 proxyConfig    : Ext.ux.rs.data.PAGING_WITH_SORT_AND_FILTER,
                 filterCallBack : this.filterCallBack
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
                           {name: 'delegation.idDelegation'   , type: 'int'     },
                           {name: 'idRoleDansDispositif'      , type: 'int'     },
                           {name: 'enEvaluationDansDispositif', type: 'boolean' }
                       ]
                   })
        });
      

      
      var resultTpl = new Ext.XTemplate(
          '<tpl for=".">',
            //'<tpl if="id != -2">',
              '<div class="search-item">',
                 '<h3><span>{numNivol}</span>{[this.getSexImg(values)]} {prenom} {nom}</h3>',//{delegation.idDelegation}
                 '{[this.getDelegation(values)]}',
              '</div>',
            //'</tpl>', 
          '</tpl>',
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
      

      Ext.apply(this,{
        store   : equipierSearchDataStore,
        tpl     : resultTpl
      });
      
      


      Ext.ux.crfrdp.EquipierSearchCombo.superclass.initComponent.apply(this, arguments);
      

    }
    catch(exception)
    {
      if(consoleEnabled)
      {
        console.log("Exception occured during Ext.ux.crfrdp.EquipierSearchCombo->initCompoent - "+ exception);  
      }
      throw exception;
    }

   

  }
  
});

Ext.reg('EquipierComboSearch', Ext.ux.crfrdp.EquipierSearchCombo);


/* FIN Combo Box de recherche d'équipier*/