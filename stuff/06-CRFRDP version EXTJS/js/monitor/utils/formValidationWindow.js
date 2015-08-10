Ext.namespace('Ext.ux.Utils.FormValidationWindow');


/**
 * 
 * initialization : 
 * 
 * 
 * var messageList       = [];
 * 
 *  if(typeDispositif == 0)
 *  {   
 *    Ext.get('DispositifIdentification').dom.style.backgroundColor='#FF0000';
 *    messageList.push(['Veuillez définir le type de dispositif',1]);
 *    hasErrorOrWarning=true;
 *  }   
 *  ... 
 *    
 *    
 * var formValidationWindow = new Ext.ux.Utils.FormValidationWindow({
 *    validateFunction: function(){alert('valider clicked');},
 *    gridTitle       : 'Vérification du dispositif',
 *    mandatoryAlertBoxTitle:'L\'intervention ne peut pas être publiée'
 *    mandatoryAlertBoxText : 'Des conditions nécessaires ne sont pas remplies, veuillez les corriger'
 *    
 *  }
 * ); 
 * 
 * formValidationWindow.display(messageList);
 * 
 * */


Ext.ux.Utils.FormValidationWindow=Ext.extend(Ext.Window, {
      id         : 'FormValidationWindow',
      layout     : 'fit',
      width      : 600,
      height     : 450,
      closeAction: 'hide',
      plain      : true,
      buttons    : [{
          text: 'Corriger',
          handler: function(button, event){
              Ext.getCmp('FormValidationWindow').hide();
          }
      },
      {
          text: 'Valider',
          handler: function(button, event){

            var numberOfMandatoryItems = Ext.getCmp('FormValidationWindow').getStore().query('testResult',1).getCount();
            if(numberOfMandatoryItems>0)
            {
              Ext.Msg.alert(
              Ext.getCmp('FormValidationWindow').getMandatoryAlertBoxTitle(),
              Ext.getCmp('FormValidationWindow').getMandatoryAlertBoxText ());
              return false;
            }
            
            
            Ext.getCmp('FormValidationWindow').getValidateFunction()();//call the function returned by getValidateFunction()
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
      getValidateFunction:function()
      {
        return this.validateFunction;
      },
      getMandatoryAlertBoxTitle:function()
      {
        return this.mandatoryAlertBoxTitle;
      },
      getMandatoryAlertBoxText :function()
      {
        return this.mandatoryAlertBoxTitle;
      },
      getStore:function()
      {
        return this.grid.getStore();
      }
  });