var GridSearchFilterAndSortObject= function(index, limit, filterObjects, sortObjects){
 this.index        = index;
 this.limit        = limit;
 this.filterObjects= filterObjects;
 this.sortObjects  = sortObjects;
};
var SortObject=function(fieldName, ascending){
  this.fieldName=fieldName;
  this.ascending=ascending;
};

var FilterObject=function(fieldName, fieldValue){
  this.fieldName =fieldName ;
  this.fieldValue=fieldValue;
};


Ext.ux.rs = function(){};
Ext.ux.rs.data = function(){};

NO_PAGING                  =0;
SIMPLE_PAGING              =1;
PAGING_WITH_SORT_AND_FILTER=2;

Ext.ux.rs.data.DwrProxy = function(config){
    Ext.ux.rs.data.DwrProxy.superclass.constructor.call(this);
    
    this.call = config.call;
    this.args = config.args;
    
    this.paging = (config.paging!=undefined ? config.paging : NO_PAGING );

};

Ext.extend(Ext.ux.rs.data.DwrProxy, Ext.data.DataProxy, {
    
    load : function(params, reader, callback, scope, arg){
        if(this.fireEvent("beforeload", this, params) !== false){         
          var delegate = this.loadResponse.createDelegate(this, [reader, callback, scope, arg], 1);
          
          var callParams = new Array();
          
          if(arg.arg) {
            callParams = arg.arg.slice();
            //*** ds.load({params:{start:0, limit:22}, arg:['walter', true]});***
      }
      
      if (!arg.arg && this.args)
      {
        callParams = this.args.slice();
      }
      
      
      //TODO, congtroler que params est du type GridSearchFilterAndSortObject, sinon throw Exection("")
      //grid.getStore().load( ... instance de GridSearchFilterAndSortObject... )
      //paging
      if(params!=undefined)
      {
        if( this.paging == SIMPLE_PAGING)
        {
          if(params.start==undefined) params.start=0;
          if(params.limit==undefined) params.limit=25;
          callParams.push(params.start);
          callParams.push(params.limit);

        }
        else if( this.paging == PAGING_WITH_SORT_AND_FILTER)
        {
          callParams.push(params);
        }  
      }
      
      
      callParams.push(delegate);
      
      this.call.apply(this,callParams);
    }
    else
    {
      callback.call(scope||this, null, arg, false);
    }
  },

    
    loadResponse : function(o, reader, callback, scope, arg){
        var result;
        try {
          if (!o) return;
           var response = {  
                responseText : Ext.util.JSON.encode(o),
                responseXML : null
            };
            result = reader.read(response);
        }catch(e){
            this.fireEvent("loadexception", this, o, response, e);
            //o.request.callback.call(scope, null, arg, false);
            callback.call(scope, null, arg, false);
            return;
        }
        callback.call (scope, result, arg, true);
    },
    
    
    update : function(dataSet){
        
    },
    
    
    updateResponse : function(dataSet){
        
    }
});

Ext.ux.rs.tree = function(){};

Ext.ux.rs.tree.TreeLoader = function(config){
    Ext.ux.rs.tree.TreeLoader.superclass.constructor.call(this);
    
    this.call = config.call;
    this.args = config.args;
};

Ext.extend(Ext.ux.rs.tree.TreeLoader, Ext.tree.TreeLoader, {
  load : function(node, callback){
        if(this.clearOnLoad){
            while(node.firstChild){
                node.removeChild(node.firstChild);
            }
        }
        if(this.doPreload(node)){ 
            if(typeof callback == "function"){
                callback();
            }
        }else if(this.call){
            this.requestData(node, callback);
        }
    },
  requestData : function(node, callback){
        if(this.fireEvent("beforeload", this, node, callback) !== false){

          var delegate = this.processResponse.createDelegate(this, [node, callback], 1);
          
          var callParams = new Array();
          
      if (this.args)
      {
        callParams = this.args.slice();
      }
      
      callParams.push(delegate);
      
            this.call.apply(this,callParams);
        
        }else{
            if(typeof callback == "function"){
                callback();
            }
        }
    },
    processResponse : function(o, node, callback){
        try {
          if (!o) return;

          //alert(Ext.util.JSON.encode(o))
          
            node.beginUpdate();
            for(var i = 0, len = o.length; i < len; i++){
                var n = this.createNode(o[i]);
                if(n){
                    node.appendChild(n);
                }
            }
            node.endUpdate();
            if(typeof callback == "function"){
                callback(this, node);
            }
        }catch(e){
            this.handleFailure(response);
        }
    }
});

UI = function(){};

UI.PageBus = function()
{
  return {
    subscribe: 
      function(event,callback)  
      {
        window.PageBus.subscribe(event,{},callback,null);
      },
    publish: 
      function(event,data)
      {
        window.PageBus.publish(event,data);
      }
  };
}();

UI.Ext = function() 
{
  return {
    updateContainer : 
      function(container,url,params,callback,scope)
      {
        var updateManager = container.getUpdater();
    
        updateManager.on("failure",function(el,response){
          if(response.status==401){
            Ext.MessageBox.show({
              buttons: Ext.MessageBox.OK, 
              title: 'Erreur', 
              msg: 'Votre session a expirée.\nVous allez être redirigé vers la page de connexion...',
              minWidth: 500,
              fn: function(btn,text){window.location.reload();}
            });
          }
          else {
            Ext.MessageBox.show({buttons: Ext.MessageBox.OK, title: response.statusText, msg: response.responseText, minWidth: 600});
          }
          this.abort();
        }, updateManager);
      
        updateManager.on("update",callback,scope);
      
        var autoLoad = {url: url, params: params, scripts: true};
      
        updateManager.update(autoLoad);
      },
    addTab:
      function(config)
      {
        var tab = new Ext.Panel({
              id: config.id,
              title: config.title,
              closable: config.closable,
              layout: 'fit'
              });
            
        var tabPanel = config.container;
        tabPanel.add(tab);
        tabPanel.setActiveTab(tab);
        
        this.updateContainer(tab,config.url,config.params,config.callback,this);
        
        return tab;
      }
  };
}();
