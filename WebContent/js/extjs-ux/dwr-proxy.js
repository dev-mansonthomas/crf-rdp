Ext.ux.rs      = function(){};
Ext.ux.rs.data = function(){};

/*Pendant Javascript*/
Ext.ux.rs.data.GridSearchFilterAndSortObject = function(start, limit, filters, sorts)
{
 this.start   = start;
 this.limit   = limit;
 this.filters = filters;
 this.sorts   = sorts;
};

Ext.ux.rs.data.SortObject=function(name, ascending)
{
  this.name      = name;
  this.ascending = ascending;
};

Ext.ux.rs.data.FilterObject=function(name, value, comparator)
{
  this.name  = name ;
  this.value = value;
  
  if(comparator == null)
    this.comparator="=";
  else
    this.comparator=comparator;
};


/*valeur que peut prendre la variable de configuration proxyConfig*/
Ext.ux.rs.data.NO_PAGING                  =0;
Ext.ux.rs.data.SIMPLE_PAGING              =1;
Ext.ux.rs.data.SIMPLE_PAGING_AND_SORTING  =2;
Ext.ux.rs.data.SIMPLE_SORTING             =3;
Ext.ux.rs.data.PAGING_WITH_SORT_AND_FILTER=4;

/*valeur par défaut pour les tri*/
Ext.ux.rs.data.DEFAULT_PAGING_START = 0;
Ext.ux.rs.data.DEFAULT_PAGING_LIMIT = 25

Ext.ux.rs.data.DwrProxy = function(config){
    Ext.ux.rs.data.DwrProxy.superclass.constructor.call(this);
    
    this.call = config.call;
    this.args = config.args;
    
    //Mode de gestion du store (pagination/tri/filtre)
    if(config.proxyConfig!=undefined)
      this.proxyConfig = config.proxyConfig;
    else
      this.proxyConfig = Ext.ux.rs.data.NO_PAGING;
      
    if(this.proxyConfig<0 || this.proxyConfig>4)
      throw "Wrong Proxy Config !  use Ext.ux.rs.data.* static variable for configuration (like Ext.ux.rs.data.PAGING_WITH_SORT_AND_FILTER)";
      
    //Dans le cas de la gestion avec filtre, filterCallBack  
    if( this.proxyConfig == Ext.ux.rs.data.PAGING_WITH_SORT_AND_FILTER)
    {
      if(config.filterCallBack != null)//TODO tester si c'est bien une méthode
        this.filterCallBack = config.filterCallBack;
      else
       throw "With proxyConfig == Ext.ux.rs.data.PAGING_WITH_SORT_AND_FILTER, you need to specify a filterCallBack, a function that return an array of Ext.ux.rs.data.FilterObject (or an empty arry)";
    }
    /*
    this.paramNames = config.paramNames || [];
    this.api        = config.api;*/
};

Ext.extend(Ext.ux.rs.data.DwrProxy, Ext.data.DataProxy, {
    
  load : function(params, reader, callback, scope, arg)
  {    
    if(this.fireEvent("beforeload", this, params) !== false)
    {         
      var delegate   = this.loadResponse.createDelegate(this, [reader, callback, scope, arg], 1);
      var callParams = new Array();
      
      if(this.args)
        callParams = this.args.slice();//clone les args dans callParams
          
      if(arg.arg)
        callParams = callParams.concat(arg.arg.slice());//ajout arg.arg (???)

      if(params != undefined)
      {
        if( this.proxyConfig == Ext.ux.rs.data.SIMPLE_PAGING)
        {
          if(params.start==undefined) params.start=Ext.ux.rs.data.DEFAULT_PAGING_START;
          if(params.limit==undefined) params.limit=Ext.ux.rs.data.DEFAULT_PAGING_LIMIT;
          
          callParams.push(params.start);
          callParams.push(params.limit);
        }
        else if( this.proxyConfig == Ext.ux.rs.data.SIMPLE_PAGING_AND_SORTING)
        {
          if(params.start==undefined) params.start=Ext.ux.rs.data.DEFAULT_PAGING_START;
          if(params.limit==undefined) params.limit=Ext.ux.rs.data.DEFAULT_PAGING_LIMIT;
          
          callParams.push(params.start);
          callParams.push(params.limit);
          
          callParams.push(params.sort );
          callParams.push(params.dir  );

        }
        else if( this.proxyConfig == Ext.ux.rs.data.SIMPLE_SORTING)
        {
          callParams.push(params.sort);
          callParams.push(params.dir);
        }
        else if( this.proxyConfig == Ext.ux.rs.data.PAGING_WITH_SORT_AND_FILTER)
        {
          if(params.start==undefined) params.start=Ext.ux.rs.data.DEFAULT_PAGING_START;
          if(params.limit==undefined) params.limit=Ext.ux.rs.data.DEFAULT_PAGING_LIMIT;
          
          var sortObjects = null;
          
          if(params.sort != undefined && params.dir != undefined)
            sortObjects = [new Ext.ux.rs.data.SortObject(params.sort, params.dir.toUpperCase() == "ASC")];
          else
            sortObjects = [];
          
          var filterObjects = this.filterCallBack();
          
          if(filterObjects == null)
            filterObjects = [];
            
          var gridSearchFilterAndSortObject = new Ext.ux.rs.data.GridSearchFilterAndSortObject( params.start ,
                                                                                                params.limit , 
                                                                                                filterObjects,
                                                                                                sortObjects
                                                                                                );
          callParams.push(gridSearchFilterAndSortObject);
        }
      }
      
      callParams.push(delegate);//défini la méthode qui va gérer le retour de DWR
      
      this.call.apply(this,callParams);//Appel à DWR
    }
    else
    {
      callback.call(scope||this, null, arg, false);
    }
  },
  
  loadResponse : function(o, reader, callback, scope, arg)
  {
    var result;
    try 
    {
      if(!o) 
        return;
      var response = {};  
      response.responseText = o;
      response.responseXML  = null;
      
      result = reader.read(response);
    }
    catch(e)
    {
      this.fireEvent("loadexception", this, o, response, e);
      callback.call(scope, null, arg, false);
      return;
    }
    
    callback.call (scope, result, arg, true);
  },

  update : function(dataSet)
  {
  },

  updateResponse : function(dataSet)
  {
  }
/*
  ,
  doRequest : function(action, records, params, reader, callback, scope, options) {
        var dwrFunctionArgs = []; // the arguments that will be passed to the dwrFunction
        Ext.each(this.paramNames[action],function(paramName){
            var param = params[paramName];
            if (action == Ext.data.Api.actions.create)//TODO need to fix... occures because DataWriter adds generated id.
                delete param.id;
            dwrFunctionArgs.push(param);
        });
        dwrFunctionArgs.push(this.createCallback(action,records,reader, callback, scope,options));
        
        var call = this.api[action];
        if (call)
            call.apply(Object, dwrFunctionArgs); // the scope for calling the dwrFunction doesn't matter, so we simply set it to Object.
    },
  
  
    createCallback : function(action,records,reader, callback, scope,options) {
        return {
            callback: function(response){
                if (action == Ext.data.Api.actions.read)
                    this.onRead(action, reader,records, response,callback, scope,options)
                else
                    this.onWrite(action,reader,records, response,callback, scope,options )
            }.createDelegate(this),
            exceptionHandler : function(message, exception) {
                this.fireEvent("exception", this, 'remote', action, options, message, exception);
                callback.call(scope, null, options, false);
            }.createDelegate(this)
        };
    },


    onRead : function(action, reader,records, response,callback, scope,options) {
        var rs;
        try {
            rs = reader.readRecords(response);
        } catch(e) {
            this.fireEvent('exception', this, 'response', action, options, response, e);
            callback.call(scope, null, options, false);
            return;
        }
        this.fireEvent("load", this, rs, options);
        callback.call(scope, rs, options, true);
    },
  
    onWrite: function(action,reader,records, response,callback, scope,options) {
        reader.update(records, response);
        this.fireEvent('write', this, action, response,records,options);
        callback.call(scope, response);
    }*/
});


Ext.ux.rs.data.JsonReader = Ext.extend(Ext.data.JsonReader, {
  read : function(response)
  {
    var o = response.responseText;

    if(!o) 
      throw {message: "JsonReader.read: Json object not found"};

    if(o.metaData)
    {
      delete this.ef;
      this.meta       = o.metaData;
      this.recordType = Ext.data.Record.create(o.metaData.fields);
      this.onMetaChange(this.meta, this.recordType, o);
    }
    return this.readRecords(o);
  }
});