Ext.namespace('Ext.ux.Evaluation.EvaluationFormWindow');




Ext.ux.Evaluation.EvaluationFormWindow=Ext.extend(Ext.Window, {
      id         : 'EvaluationFormWindow',
      layout     : 'fit',
      width      : 600,
      height     : 450,
      closeAction: 'hide',
      plain      : true,
      buttons    : [{
          text: 'Fermer',
          handler: function(button, event){
              Ext.getCmp('EvaluationFormWindow').hide();
          }
      },
      {
          text: 'Sauvegarder',
          handler: function(button, event)
          {
            alert('TODO Save');
          }
      }],
      initComponent: function() {
      
        if(this.validateFunction==null || ! this.validateFunction instanceof Object)
        {
          throw "validateFunction is undefined. See code comments of formValidationWindow";
        }
        if(this.gridTitle==null || this.gridTitle=="")
        {
          throw "gridTitle is undefined. See code comments of formValidationWindow";
        }
        
        if(this.mandatoryAlertBoxTitle == null || this.mandatoryAlertBoxTitle == "")
        {
          throw "mandatoryAlertBoxTitle is undefined. See code comments of formValidationWindow";
        }
        if(this.mandatoryAlertBoxText == null || this.mandatoryAlertBoxText == "")
        {
          throw "mandatoryAlertBoxText is undefined. See code comments of formValidationWindow";
        }
        
        var dataStore = new Ext.data.ArrayStore({
                fields: [
                   {name: 'testName'  },
                   {name: 'testResult', type:'int'}
                ]
            });
        this.grid = new Ext.grid.GridPanel({
              id      :'FormValidationWindowGrid',
            store     : dataStore,
            cm: new Ext.grid.ColumnModel([
                {     id: 'testName' ,
                  header: "Vérification en échec",
                   width: 500     ,
                sortable: true    ,
               dataIndex: 'testName'
               },
               {      id: 'testResult' ,
                  header: "Résultat",
                   width: 60     ,
                sortable: true    ,
               dataIndex: 'testResult'   ,
               renderer : function(value, metadata, record, rowIndex, colIndex, store)
                 {
                   return '<img src="'+contextPath+'/img/famfamfam/'+(value==1?'exclamation.png':'error.png')+'" />';
                 }
               }
            ]),
            viewConfig: {
                forceFit      :true
            },
            width   : 600,
            height  : 450,
            title   : this.gridTitle,
            iconCls : 'icon-grid'
        });
        
        
        Ext.apply(this, {
          items: [this.grid]
        });
        
        Ext.ux.Utils.FormValidationWindow.superclass.initComponent.apply(this, arguments);
      },
      display:function(messageList)
      {
        this.grid.removeAll();
        this.grid.getStore().loadData(messageList);
        this.show();
      },
      getStore:function()
      {
        return this.grid.getStore();
      }
  });