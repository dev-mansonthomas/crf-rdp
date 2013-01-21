Ext.namespace('Ext.ux.Home.SMSManagerUI');




Ext.ux.Home.SMSManagerUI = Ext.extend(Ext.Panel, {
  id		       : 'SMSManager',
  title        : 'SMS Manager',
  layout       : 'border',
  initComponent: function()
  {
	  
	  
	      
	  /***************************GRID**************************************************/    
 
	  var subGridId='SMSSubGrid';
	  
	  this.mainGrid = {
			  xtype :'CRFSMSGrid',
			  id    :'SMSMainGrid',
			  title :"Main inbox",
			  mainGrid:true,
			  subGridId : subGridId,
			  region:"center",
			  listeners : { 
          rowdblclick : function(theGrid, rowIndex, e )
          {
            theGrid.handleRowDoubleClick(theGrid, rowIndex, e );
          },
          rowclick : function(theGrid, rowIndex, e )
          {           
            theGrid.handleRowClick(theGrid, rowIndex, e );
          }
        }
	  };
	  
	  this.subGrid = {
			  xtype         : 'CRFSMSGrid',
			  id    	      : subGridId,
			  title         : "Sub inbox",
			  region	      : "south",
			  subGrid       : true,
			  collapsible   : true,
			  collapsed     : true,
			  collapseFirst : true,
        listeners     : { 
          rowdblclick : function(theGrid, rowIndex, e )
          {
            theGrid.handleRowDoubleClick(theGrid, rowIndex, e );
          }
        }
	  };

	  
      this.items = [this.mainGrid, this.subGrid];

	  /**ADDING TAB TO HOME**/
      Ext.ux.Home.SMSManagerUI.superclass.initComponent.call(this);
      
      var tabPanelComp = Ext.getCmp('home_center');
      tabPanelComp.add(this);   
  },
  initToolBar:function()
  {
	  Ext.getCmp('SMSMainGrid').initToolBar();
	  Ext.getCmp('SMSSubGrid' ).initToolBar();
  },
  reloadGrids:function()
  {
    Ext.getCmp('SMSMainGrid').getStore().reload();
    Ext.getCmp('SMSSubGrid' ).getStore().reload();
  }
  
});

