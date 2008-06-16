
Ext.namespace('Ext.ux.MonitorInput', 'Ext.ux.MonitorInput.BilanEditor');

//TODO : Au chargement, chercher la liste des attributs. Dans la classe Java, changer pour champBdd camelize (http://mansonthomas.com/rs2i/camelize.php)


// create application
Ext.ux.MonitorInput.BilanEditor = function() {
    // do NOT access DOM from here; elements don't exist yet

    // private variables
    var fieldList;
    // private functions

    // public space
    return {
      // public properties, e.g. strings to translate
      dropZonesIds:'',
      // public methods
      init: function() {

      },
      updateStringField:function(fieldId, fieldName, objectIdForGraphicalEffect){
        if(!objectIdForGraphicalEffect)
          objectIdForGraphicalEffect = fieldId;

        crfIrpUtils.checkField (fieldId);
        crfIrpUtils.fieldSaving(objectIdForGraphicalEffect);
        fieldValue = $(fieldId).value;
        if(fieldValue!='' && fieldValue != $(fieldId).oldValue)
        {
          MonitorInputBilan.updateStringField(
                                              $('bilan_id_intervention').value,
                                              fieldName,
                                              fieldValue,
                                              function()
                                              {
                                                crfIrpUtils.defaultBackgroundColorForField(objectIdForGraphicalEffect);
                                              });
        }
        else
          crfIrpUtils.defaultBackgroundColorForField(objectIdForGraphicalEffect);
      },
      updateDateField:function(fieldId, fieldName, objectIdForGraphicalEffect){
        if(!objectIdForGraphicalEffect)
          objectIdForGraphicalEffect = fieldId;

        crfIrpUtils.checkField (fieldId);
        crfIrpUtils.fieldSaving(objectIdForGraphicalEffect);
        fieldValue = $(fieldId).value;
        if(fieldValue!='' && fieldValue != $(fieldId).oldValue)
        {
          MonitorInputBilan.updateDateField(
                                              $('bilan_id_intervention').value,
                                              fieldName,
                                              fieldValue,
                                              function()
                                              {
                                                crfIrpUtils.defaultBackgroundColorForField(objectIdForGraphicalEffect);
                                              });
        }
        else
          crfIrpUtils.defaultBackgroundColorForField(objectIdForGraphicalEffect);
      },
      updateBooleanField:function(fieldId, fieldName, objectIdForGraphicalEffect){

        if(!objectIdForGraphicalEffect)
          objectIdForGraphicalEffect = fieldId;

        crfIrpUtils.checkField (fieldId);
        crfIrpUtils.fieldSaving(objectIdForGraphicalEffect);
        fieldValue = $(fieldId).value;
        if(fieldValue!='' && fieldValue != $(fieldId).oldValue)
        {
          MonitorInputBilan.updateBooleanField(
                                              $('bilan_id_intervention').value,
                                              fieldName,
                                              fieldValue,
                                              function()
                                              {
                                                crfIrpUtils.defaultBackgroundColorForField(objectIdForGraphicalEffect);
                                              });
        }
        else
          crfIrpUtils.defaultBackgroundColorForField(objectIdForGraphicalEffect);
      },
      updateIntegerField:function(fieldId, fieldName, objectIdForGraphicalEffect){
        if(!objectIdForGraphicalEffect)
          objectIdForGraphicalEffect = fieldId;

        crfIrpUtils.checkField (fieldId);
        crfIrpUtils.fieldSaving(objectIdForGraphicalEffect);
        fieldValue = $(fieldId).value;
        if(fieldValue!='' && ($(fieldId).type=='radio' || fieldValue != $(fieldId).oldValue))
        {
          MonitorInputBilan.updateIntegerField(
                                              $('bilan_id_intervention').value,
                                              fieldName,
                                              fieldValue,
                                              function()
                                              {
                                                crfIrpUtils.defaultBackgroundColorForField(objectIdForGraphicalEffect);
                                              });
        }
        else
          crfIrpUtils.defaultBackgroundColorForField(objectIdForGraphicalEffect);
      },
      updateFloatField:function(fieldId, fieldName, objectIdForGraphicalEffect){
        if(!objectIdForGraphicalEffect)
          objectIdForGraphicalEffect = fieldId;

        crfIrpUtils.checkField (fieldId);
        crfIrpUtils.fieldSaving(objectIdForGraphicalEffect);
        fieldValue = $(fieldId).value;
        if(fieldValue!='' && fieldValue != $(fieldId).oldValue)
        {
          MonitorInputBilan.updateFloatField(
                                              $('bilan_id_intervention').value,
                                              fieldName,
                                              fieldValue,
                                              function()
                                              {
                                                crfIrpUtils.defaultBackgroundColorForField(objectIdForGraphicalEffect);
                                              });
        }
        else
          crfIrpUtils.defaultBackgroundColorForField(objectIdForGraphicalEffect);
      }
    };

}(); // end of app
