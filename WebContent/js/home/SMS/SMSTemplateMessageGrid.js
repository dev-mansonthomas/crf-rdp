Ext.namespace('Ext.ux.Home.SMS.SMSTemplateMessageGrid');


Ext.ux.Home.SMS.SMSTemplateMessageGrid = Ext.extend(Ext.grid.GridPanel,{

	initComponent:function() {
		
		
		var smsTemplateGridDataStore = new Ext.data.Store({
	        remoteSort:true,
             proxy: new Ext.ux.rs.data.DwrProxy({
                 call          : SMSManagerService.getSMSTemplates ,
                 args          : []              ,
                 proxyConfig   : Ext.ux.rs.data.PAGING_WITH_SORT_AND_FILTER,
                 filterCallBack: function()
                 {//TODO : gérer le tri sur les colonnes
                    var objectFilter = new Array();
                    
                    //Ext.ux.rs.addFilterFromExtField(objectFilter,gridId+'Toolbar-allSMS'    , 'allSMS'    , '='   ,'');

                    return objectFilter;
                }
           }),
       reader: new Ext.ux.rs.data.JsonReader ({
              root: 'data',
     totalProperty: 'totalCount',
            fields:
               [
                   {name: 'idSmsTemplate'   , type: 'int'   },
                   {name: 'idRegulation'    , type: 'int'   },
                   {name: 'templateDate'    , type: 'int'   },
                   {name: 'enabled'         , type: 'int'	  },
                   {name: 'message'        	, type: 'string'}
               ]
           })
       });
		
		
		
		
		var config = {
	              xtype : 'grid',
                viewConfig:{
                  forceFit:true
                 },
                 height:300,
	              enableHdMenu: true,
				     store: smsTemplateGridDataStore,//end of store
		       columns: [
		                 {
		                    xtype     : 'gridcolumn',
		                    header    : 'template',
		                    sortable  : true,
		                    resizable : false,
		                    dataIndex : 'message',
		                    renderer : function(value, metadata, record, rowIndex, colIndex, store)
                        {
		                      return value + '<br/><input id="TemplateSMSEdit_'+record.idSmsTemplate+'" type="button" style="width:130px;" onClick="EditTemplate(this.id)" value="Edit"/><input id="TemplateSMSInsert_'+record.idSmsTemplate+'" type="button" style="width:130px;" onClick="EditTemplate(this.id)" value="Insert"/>';
                        }
		                 }
		              ],//end of columns
		              bbar: {
      		                     id: this.id+'PagingToolbar',
      		                  xtype: 'paging',
      		            pageSize   : 10,
      		            store      : smsTemplateGridDataStore,
      		            displayInfo: true,
      		            displayMsg : 'SMS(s) {0} à {1} de {2}',
      		            emptyMsg   : 'aucun Template de SMS ne correspond à la recherche'
		              },// end of bbar
		              tbar: {
		            	 id     :  this.id+'TopToolbar',
		                 xtype: 'toolbar',
		                 items: [
		                         {
		                   xtype  : 'button',
		                   text   : 'Nouveau Template',
		                   iconCls: 'lieuSearchButton',
		                   handler: function(){

		                     var form = new Ext.form.FormPanel({
                           baseCls: 'x-plain',
                           labelWidth: 55,
                           layout: {
                               type: 'vbox',
                               align: 'stretch'  // Child items are stretched to full width
                           },
                           defaults: {
                               xtype: 'textfield'
                           },

                           items: [{
                               xtype: 'textarea',
                               fieldLabel: 'Message text',
                               hideLabel: true,
                               name: 'msg',
                               flex: 1  // Take up all *remaining* vertical space
                           }]
                       });

                       var w = new Ext.Window({
                           title: 'Nouveau Template',
                           collapsible: true,
                           maximizable: true,
                           width: 750,
                           height: 500,
                           minWidth: 300,
                           minHeight: 200,
                           layout: 'fit',
                           plain: true,
                           bodyStyle: 'padding:5px;',
                           buttonAlign: 'center',
                           items: form,
                           buttons: [{
                               text: 'Send'
                           },{
                               text: 'Cancel'
                           }]
                       });
                       w.show();
		                     
		                   }
		                }]
		              } //end of tbar
		       
		};
		
		
		// apply config
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		 
		// call parent
		Ext.ux.Home.SMS.SMSTemplateMessageGrid.superclass.initComponent.apply(this, arguments);
	},
	rechercher:function()
	{
		var gridId = this.id;
		Ext.getCmp(gridId+'PagingToolbar').moveFirst();
	},
  handleRowDoubleClick:function(theGrid, rowIndex, e)
  {
    var rowData = theGrid.store.getAt(rowIndex).data;
    
    //TODO insert data into message editor
  }

});


Ext.reg('SMSTemplateMessageGrid', Ext.ux.Home.SMS.SMSTemplateMessageGrid);