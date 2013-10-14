Ext.namespace('Ext.ux.crfrdp.LieuxSearchCombo');

/**
 * 
 * searchType :  le type de lieux qu'on recherche, 0 pour tout
 * 
 * 
 * */
Ext.ux.crfrdp.LieuxSearchCombo = Ext.extend(Ext.form.ComboBox,{
  id          : 'LieuxSearch', 
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
 
    try
    {
      
      var searchFieldId = this.applyTo;
      
      
      /* Combo Box de recherche d'équipier*/ 
      this.lieuxSearchDataStore = new Ext.data.Store({
          proxy: new Ext.ux.rs.data.DwrProxy({
                 call           : MonitorCommons.searchLieux,
                 args           : [this.searchType],
                 proxyConfig    : Ext.ux.rs.data.PAGING_WITH_SORT_AND_FILTER,
                 filterCallBack : function()
                 {
                   var search = Ext.get(searchFieldId).getValue();
                   
                   return [new Ext.ux.rs.data.FilterObject('searchString',search,'=')];
                 }
            }),
            reader: new Ext.ux.rs.data.JsonReader({
                     root: 'data',
            totalProperty: 'totalCount',
                       id: 'idLieu',
                   fields:
                       [
                           {name: 'idLieu'              , type: 'int'     },
                           {name: 'idTypeLieu'          , type: 'int'     },
                           {name: 'icon'                , type: 'string'  },
                           {name: 'iconGmapInit'        , type: 'string'  },
                           {name: 'nom'                 , type: 'string'  },
                           {name: 'addresse'            , type: 'string'  },
                           {name: 'codePostal'          , type: 'string'  },
                           {name: 'ville'               , type: 'string'  },
                           {name: 'googleCoordsLat'     , type: 'float'   },
                           {name: 'googleCoordsLong'    , type: 'float'   },
                           {name: 'telephone'           , type: 'string'  },
                           {name: 'mail'                , type: 'string'  },
                           {name: 'url'                 , type: 'string'  },
                           {name: 'infoComplementaire'  , type: 'string'  },
                           {name: 'actif'               , type: 'boolean' }
                       ]
                   })
        });
      

      
      var resultTpl = new Ext.XTemplate(
          '<tpl for=".">',
            //'<tpl if="id != -2">',
              '<div class="search-item">',
                 '<h3><span>{idLieu}</span>{nom}</h3>',//{delegation.idDelegation}
                 '{addresse} - {codePostal} - {ville}',
              '</div>',
            //'</tpl>', 
          '</tpl>'
      ); 
      

      Ext.apply(this,{
        store   : this.lieuxSearchDataStore,
        tpl     : resultTpl
      });
      
      


      Ext.ux.crfrdp.LieuxSearchCombo.superclass.initComponent.apply(this, arguments);
      

    }
    catch(exception)
    {
      if(consoleEnabled)
      {
        console.log("Exception occured during Ext.ux.crfrdp.LieuxSearchCombo->initCompoent - "+ exception);  
      }
      throw exception;
    }

   

  },//end of initComponent
  
  updateSearchType:function(searchType)
  {
    this.searchType = searchType;
    this.store.proxy.args[0]=searchType;
  }
  
  
});

Ext.reg('LieuxSearchCombo', Ext.ux.crfrdp.LieuxSearchCombo);


/* FIN Combo Box de recherche d'équipier*/