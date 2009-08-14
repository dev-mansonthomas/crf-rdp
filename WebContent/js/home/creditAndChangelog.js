Ext.namespace('Ext.ux.Utils.CreditsAndChangeLog');

// create application
Ext.ux.Utils.CreditsAndChangeLog = function() {
    // do NOT access DOM from here; elements don't exist yet

    // private variables
    
    // private functions
    
    // public space
    return {
      // public properties, e.g. strings to translate
      
      // public methods
      init: function() {
        this.creditWindow    = null;
        this.changeLogWindow = null;
        this.initCreditsWindow    ();
        this.initChangelogWindow  ();
        this.applicationsVersions = [];
        
      },
      initCreditsWindow:function()
      { 
        
        var expander = new Ext.grid.RowExpander({
          tpl : new Ext.Template('<p>{description}</p>')
        });
        
        var dataStore = new Ext.data.Store({
                 proxy: new Ext.ux.rs.data.DwrProxy({
                     call  : CreditsAndChangeLogService.getCredits ,
                     args  : []              ,
                     paging: Ext.ux.rs.data.NO_PAGING
                     }),
                 reader: new Ext.ux.rs.data.JsonReader ({
                        root: 'data',
               totalProperty: 'totalCount',
                      fields:
                         [
                             {name: 'name'        , type: 'string'},
                             {name: 'version'     , type: 'string'},
                             {name: 'url'         , type: 'string'},
                             {name: 'description' , type: 'string'}
                         ]
                     })
                 });


        var grid = new Ext.grid.GridPanel({
                  id        :'CreditsGrid',
                  store     : dataStore,
                  cm: new Ext.grid.ColumnModel([
                      {     id: 'name' ,
                        header: "Name",
                         width: 100     ,
                      sortable: true    ,
                     dataIndex: 'name',
                     renderer : function(value, metadata, record, rowIndex, colIndex, store)
                       {
                         return '<b>'+value+'</b>';
                       }
                     }, 
                     {     id: 'version' ,
                        header: "Version",
                         width: 100     ,
                      sortable: true    ,
                     dataIndex: 'version'
                     }, 
                     {     id: 'url' ,
                        header: "URL",
                         width: 200     ,
                      sortable: true    ,
                     dataIndex: 'url'   ,
                     renderer : function(value, metadata, record, rowIndex, colIndex, store)
                       {
                         return '<a href="'+value+'" target="_new">'+value+'</a>';
                       }
                     }
                  ]),
                  viewConfig: {
                      forceFit      :true,
                      enableRowBody :true,
                      getRowClass   :function(record, rowIndex, rowParams, dataStore)
                        {
                          rowParams.body='<div style="padding-left:100px;padding-top:5px;padding-bottom:5px;color:silver;">'+record.data.description+'</div>';
                          return 'x-grid3-row-expanded';
                        }

                  },
                  width: 600,
                  height: 450,
                  title: 'Crédits',
                  iconCls: 'icon-grid'
              });
        
        
        
        this.creditWindow = new Ext.Window({
                id         : 'CreditWindow',
                layout     : 'fit',
                width      : 900,
                height     : 650,
                closeAction: 'hide',
                plain      : true,
                items      : [grid],
                buttons: [{
                    text: 'Close',
                    handler: function(button, event){
                        Ext.getCmp('CreditWindow').hide();
                    }
                }]
            });
      },
      initChangelogWindow:function()
      {
        /*
         * 
ApplicationVersion

  private int id;
  private String versionName;
  private String devReleaseDate;
  private String productionReleaseDate;
  private String description;

ApplicationVersionChangeLog
  private int id;
  private int idApplicationVersion;
  private String idJira;
  private String description;
         * */
        
        
        var dataStore = new Ext.data.GroupingStore({
                 proxy: new Ext.ux.rs.data.DwrProxy({
                     call  : CreditsAndChangeLogService.getApplicationVersionChangeLogs ,
                     args  : []              ,
                     paging: Ext.ux.rs.data.NO_PAGING
                     }),
                 reader: new Ext.ux.rs.data.JsonReader ({
                        root: 'data',
               totalProperty: 'totalCount',
                      fields:
                         [
                             {name: 'id'                  , type: 'int'},
                             {name: 'idApplicationVersion', type: 'int'},
                             {name: 'idJira'              , type: 'string'},
                             {name: 'description'         , type: 'string'}
                         ]
                     }),
                   sortInfo  :{field: 'idApplicationVersion', direction: "DESC"},
                   groupField:'idApplicationVersion'
                 });


        var grid = new Ext.grid.GridPanel({
                  id        :'ChangeLogGrid',
                  store     : dataStore,
                  cm: new Ext.grid.ColumnModel([
                      {     id: 'idApplicationVersion' ,
                        header: "id",
                         width: 5  ,
                      sortable: false,
                     dataIndex: 'idApplicationVersion',
                     renderer:function(value, metadata, record, rowIndex, colIndex, store)
                     {
                       var applicationVersion =  Ext.ux.Utils.CreditsAndChangeLog.applicationsVersions[value];
                       return applicationVersion.versionName+' '+applicationVersion.description;
                     },
                     css:'visibility:hidden;'
                     },{     id: 'idJira' ,
                        header: "Id JIRA",
                         width: 65      ,
                      sortable: true    ,
                     dataIndex: 'idJira',
                     renderer : function(value, metadata, record, rowIndex, colIndex, store)
                       {
                         return '<a href="http://bug.paquerette.com/jira/browse/'+value+'" target="_new">'+value+'</a>';
                       }
                     }, 
                     {     id: 'description' ,
                        header: "Description",
                      sortable: true    ,
                     dataIndex: 'description'
                     }
                  ]),
                  viewConfig: {
                      forceFit      :true
                  },
                  view: new Ext.grid.GroupingView({
                     forceFit:true,
                     groupRenderer: function(value, unused, record, rowIndex, colIndex, dataStore)
                     {
                       var applicationVersion =  Ext.ux.Utils.CreditsAndChangeLog.applicationsVersions[value];
                       return applicationVersion.versionName+' '+applicationVersion.description;
                     },
                     groupTextTpl: '{group}'

                  }),

                  width: 600,
                  height: 450,
                  title: 'ChangeLog',
                  iconCls: 'icon-grid'
              });
        
        
        
        this.changeLogWindow = new Ext.Window({
                id         : 'ChangeLogWindow',
                layout     : 'fit',
                width      : 600,
                height     : 450,
                closeAction: 'hide',
                plain      : true,
                items      : [grid],
                buttons: [{
                    text: 'Close',
                    handler: function(button, event){
                        Ext.getCmp('ChangeLogWindow').hide();
                    }
                }]
            });
      },
      displayCredits:function()
      {
        this.creditWindow.show();
        var creditsStore = Ext.getCmp('CreditsGrid').getStore();
        if(creditsStore.getCount()==0)
          creditsStore.load();
      },
      displayChangeLog:function()
      {
        this.changeLogWindow.show();
        var changeLogStore = Ext.getCmp('ChangeLogGrid').getStore();
        if(changeLogStore.getCount()==0)
          this.loadApplicationVersion();
      },
      loadApplicationVersion:function()
      {
        CreditsAndChangeLogService.getApplicationVersions(this.loadApplicationVersionReturn)
      },
      loadApplicationVersionReturn:function(applicationVersions)
      {
        /*
         * 
ApplicationVersion

  private int id;
  private String versionName;
  private String devReleaseDate;
  private String productionReleaseDate;
  private String description;*/
        var i =0, count = applicationVersions.length;
        for(i=0;i<count;i++)
        {
          var applicationVertsion = applicationVersions[i];
          Ext.ux.Utils.CreditsAndChangeLog.applicationsVersions[applicationVertsion.id]=applicationVertsion;
        }
        
        
         var changeLogStore = Ext.getCmp('ChangeLogGrid').getStore();
         changeLogStore.load();
      }
      
      
  };
}();

Ext.onReady(function(){Ext.ux.Utils.CreditsAndChangeLog.init()});