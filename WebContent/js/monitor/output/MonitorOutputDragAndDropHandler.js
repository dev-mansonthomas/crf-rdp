
Ext.override(Ext.dd.DDProxy, {
      startDrag: function(x, y) 
      {
        if(consoleEnabled)
         console.log('StartDrag x='+x+' y='+y+'');
        var dragEl = Ext.get(this.getDragEl());
        var el     = Ext.get(this.getEl    ());
 
        el.originalPosition=[x,y];
        
        dragEl.applyStyles({border:'','z-index':2000});
        
        dragEl.update  (el.dom.innerHTML);
        dragEl.addClass(el.dom.className + ' dd-proxy');
      },
      onDragOver: function(e, targetId) 
      {
    	if(consoleEnabled)
    	  console.log('drag Over '+targetId+' '+(targetId.indexOf('dispositifDz_')>-1));
        if(targetId.indexOf('dispositifDz_')>-1) 
        {
          var target = Ext.get(targetId);
          this.lastTarget = target;
          target.addClass('dd-over');
        }
      },
      onDragOut: function(e, targetId) 
      {
    	  if(consoleEnabled)
        	console.log('drag Out '+targetId+' '+(targetId.indexOf('dispositifDz_')>-1));
        if(targetId.indexOf('dispositifDz_')>-1)
        {
          var target = Ext.get(targetId);
          this.lastTarget = null;
          target.removeClass('dd-over');
        }
      },
      endDrag: function() 
      {
    	if(consoleEnabled)
          console.log('drag End ');
        var dragEl = Ext.get(this.getDragEl());
        var el     = Ext.get(this.getEl    ());
        if(consoleEnabled)
          console.log('last target = '+this.lastTarget);
        if(this.lastTarget) 
        {
          var dz = Ext.get(this.lastTarget);
          dz.appendChild(el);
          el.applyStyles({position:'', width:''});
          dz.removeClass('dd-over');
          if('function' === typeof this.config.fn) 
            this.config.fn.apply(this.config.scope || window, [this, this.config.dragData, this.lastTarget]);
        }
        else 
        {//invalid drop -> do Nothing
        }
      }
});




Ext.namespace('Ext.ux.MonitorOutput', 'Ext.ux.MonitorOutput.dd');
 
// create application
Ext.ux.MonitorOutput.dd = function() {
    // do NOT access DOM from here; elements don't exist yet
 
    // private variables
    var dropZones;
    var draggables;
    var draggableGroup='draggableGroup';
    // private functions
 
    // public space
    return {
      // public properties, e.g. strings to translate
      dropZonesIds:'', 
      // public methods
      init: function() {
        dropZones  = Array();
        draggables = Array();
        if(consoleEnabled)
          console.log('dd init');
      },
      addDraggable:function(id, intervention){
        var ddItem = Ext.get(id);
        ddItem.dd = new Ext.dd.DDProxy( id,
                                        draggableGroup, 
                                        {
                                          dragData:{id:id,intervention:intervention},
                                          scope:this,
                                          fn:function(dd, dragElementData, lastTarget) 
                                          {
                                            if(consoleEnabled)
                                              console.log('handling drop of '+dragElementData+' in '+lastTarget.id);
                                            var dropZoneData = Ext.ux.MonitorOutput.dd.getDropZoneData(lastTarget.id);
                                            moDispositifCs.setInterventionToDispositif(dragElementData, dropZoneData);
                                          }
                                        });

        draggables[id] = ddItem;
      },
      getDraggableGroup:function(){
        return draggableGroup;
      },
      removeTagFromDropZoneList:function(dropZoneId){
    	  if(consoleEnabled)
    	  console.log('removeTagFromDropZoneList on '+dropZoneId+' state before : '+this.dropZonesIds);

        var index = this.dropZonesIds.indexOf(dropZoneId+'|');
        if(index>-1)
        {
          var splitted = this.dropZonesIds.split('|');
          this.dropZonesIds='';
          for(var i=0, count=splitted.length;i<count;i++)
          {
            var oneItem = splitted[i];
            if(oneItem != dropZoneId)
              this.dropZonesIds+=oneItem+'|';
          }
        }
        if(consoleEnabled)
        console.log('removeTagFromDropZoneList on '+dropZoneId+' state after : '+this.dropZonesIds);
      },
      addDropZone:function(id, recordId, data){
    	  
    	  if(consoleEnabled)
    	  console.log('addDropZone on '+id+' row '+recordId);
        if(this.dropZonesIds.indexOf(id+'|')>-1)
        {
          if(consoleEnabled)
            console.log('dropZone id='+id+' row='+recordId+' already added, ignoring');
        }
        else
        {
          var dz = new Ext.dd.DropZone(id, {ddGroup:draggableGroup});
          dropZones[id]={id:id, recordId:recordId, dropZone:dz, dispositif:data};
          this.dropZonesIds+=id+'|';
        }
      },
      getDropZoneData:function(id){
        return dropZones[id]; 
      }
    };
}(); // end of app
  