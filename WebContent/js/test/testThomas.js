






function init()
{

  /* Combo Box de recherche d'équipier*/ 
  var equipierSearchDataStore = new Ext.data.Store({
      proxy: new Ext.ux.rs.data.DwrProxy({
             call           : MonitorInputDispositif.searchEquipier,
             args           : [],
             proxyConfig    : Ext.ux.rs.data.PAGING_WITH_SORT_AND_FILTER,
             filterCallBack : function()
             {
                return [new Ext.ux.rs.data.FilterObject('idRole',7,'='),
                        new Ext.ux.rs.data.FilterObject('search','M%','=')]
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
                       {name: 'delegation.idDelegation'   , type: 'int'     },
                       {name: 'idRoleDansDispositif'      , type: 'int'     },
                       {name: 'enEvaluationDansDispositif', type: 'boolean' }
                   ]
               })
    });

    // Custom rendering Template
    var resultTpl = new Ext.XTemplate(
        '<tpl for="."><div class="search-item">',
            '<h3><span>{numNivol}</span> {prenom} {nom}</h3>',//{delegation.idDelegation}
            '{idRoleDansDispositif} - {enEvaluationDansDispositif}',
        '</div></tpl>'
    );
    
    var searchEquipierComboBox = new Ext.form.ComboBox({
        id          : 'DispositifEquipierSearch', 
        store       : equipierSearchDataStore,
        displayField: 'numNivol',
        typeAhead   : false,
        loadingText : 'Searching...',
        width       : 570,
        pageSize    : 10,
        hideTrigger : true,
        tpl         : resultTpl,
        itemSelector: 'div.search-item',
        applyTo     : 'search',
        onSelect    : function(record){ // override default onSelect to do redirect
            alert(record.data.numNivol);
        }
    });
  /* FIN Combo Box de recherche d'équipier*/
  
  
  
  
}