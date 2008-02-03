var MonitorInputInterventionCs = Class.create();

MonitorInputInterventionCs.prototype.initialize=function()
{
  MonitorInputIntervention.initScriptSession();
  custumEventPS.subscribe("ListLoaded", this.initOriginesIntervention       );
  custumEventPS.subscribe("ListLoaded", this.initMotifsIntervention         );
  custumEventPS.subscribe("ListLoaded", this.initUnfinishedInterventionGrid );
  crfIrpUtils.setupCalendar("interventionTicketDHReception");
};

MonitorInputInterventionCs.prototype.fieldList = [
'interventionTicketId',
 'interventionTicketOrigine',
 'interventionTicketDHReception',
 'interventionTicketRue',
 'interventionTicketCodePostal',
 'interventionTicketVille',
 'interventionTicketBatiment',
 'interventionTicketEtage',
 'interventionTicketPorte',
 'interventionTicketComplementAdresse',
 'interventionTicketMotif',
 'interventionTicketComplementMotif'];

MonitorInputInterventionCs.prototype.addIntervention=function()
{
  miInterventionCs.resetInterventionForm();
  MonitorInputIntervention.createEmptyIntervention(this.createNewEmptyInterventionReturn);
  Ext.getCmp('InterventionListEastPanel').collapse();
};

MonitorInputInterventionCs.prototype.createNewEmptyInterventionReturn=function(intervention)
{
  $('interventionTicketDHReception').value=crfIrpUtils.getFullDate(intervention.dhReception);
  $('interventionTicketId'         ).value=intervention.idIntervention;
  $('AddInterventionDelete'        ).style.display="block";
  $('AddInterventionClose'         ).style.display="none";

  Ext.get('InterventionTicket').slideIn();
};

MonitorInputInterventionCs.prototype.initMotifsIntervention=function()
{
  DWRUtil.removeAllOptions('interventionTicketMotif');
  DWRUtil.addOptions('interventionTicketMotif',
                      crfIrpUtils.allList['MotifsIntervention'],
                      'id',
                      'label');
};
MonitorInputInterventionCs.prototype.initOriginesIntervention=function()
{
  DWRUtil.removeAllOptions('interventionTicketOrigine');
  DWRUtil.addOptions('interventionTicketOrigine',
                      crfIrpUtils.allList['OriginesIntervention'],
                      'id',
                      'label');
};

MonitorInputInterventionCs.prototype.endOfEditionEvent=function()
{
  var mandatoryFields=[
'interventionTicketOrigine',
'interventionTicketDHReception',
'interventionTicketRue',
'interventionTicketCodePostal',
'interventionTicketVille',
'interventionTicketMotif'];
  var fieldInputError = false;
  for(var i=0, count=mandatoryFields.length;i<count;i++)
    fieldInputError = !crfIrpUtils.checkMandatoryField(mandatoryFields[i]) || fieldInputError;

  if(fieldInputError)
    return false;


  MonitorInputIntervention.endOfEditionEvent($('interventionTicketId').value, this.endOfEditionEventReturn);
};

MonitorInputInterventionCs.prototype.endOfEditionEventReturn=function()
{
  miInterventionCs.resetInterventionForm();
  Ext.get('InterventionTicket').slideOut();
  Ext.getCmp('InterventionListEastPanel').collapse();
};
MonitorInputInterventionCs.prototype.resetInterventionForm=function()
{
  var fieldList = MonitorInputInterventionCs.prototype.fieldList;
  for(var i=0,count=fieldList.length;i<count;i++)
  {
    var fieldId = fieldList[i];
    if($(fieldId).tagName !='SELECT')
      $(fieldList[i]).value='';
    else
      $(fieldList[i]).value=0;
  }
};

MonitorInputInterventionCs.prototype.editInterventionTicket=function(idIntervention)
{
  MonitorInputIntervention.getInterventionTicket(idIntervention, this.editInterventionTicketReturn);
};


MonitorInputInterventionCs.prototype.initInterventionTicket=function(interventionTicket)
{
  dwr.util.setValue('interventionTicketBatiment'         , interventionTicket.batiment         );
  dwr.util.setValue('interventionTicketCodePostal'       , interventionTicket.codePostal       );
  dwr.util.setValue('interventionTicketComplementAdresse', interventionTicket.complementAdresse);
  dwr.util.setValue('interventionTicketComplementMotif'  , interventionTicket.complementMotif  );
  dwr.util.setValue('interventionTicketDHReception'      , crfIrpUtils.getFullDate(interventionTicket.dhReception));
  dwr.util.setValue('interventionTicketEtage'            , interventionTicket.etage            );
  dwr.util.setValue('interventionTicketId'               , interventionTicket.idIntervention   );
  dwr.util.setValue('interventionTicketMotif'            , interventionTicket.idMotif          );
  dwr.util.setValue('interventionTicketOrigine'          , interventionTicket.idOrigine        );
  dwr.util.setValue('interventionTicketPorte'            , interventionTicket.porte            );
  dwr.util.setValue('interventionTicketRue'              , interventionTicket.rue              );
  dwr.util.setValue('interventionTicketVille'            , interventionTicket.ville            );
};

MonitorInputInterventionCs.prototype.editInterventionTicketReturn=function(interventionTicket)
{
  miInterventionCs.initInterventionTicket(interventionTicket);

  $('AddInterventionDelete').style.display="none";
  $('AddInterventionClose' ).style.display="block";

  $('interventionTicketEditButton'  ).style.display="block";
  $('interventionTicketCancelButton').style.display="none";

  miInterventionCs.openInterventionTicketWindow("Edition de l'Intervention N°"+interventionTicket.idIntervention);
};

MonitorInputInterventionCs.prototype.cancelInterventionTicket=function(idIntervention)
{
  MonitorInputIntervention.getInterventionTicket(idIntervention, this.cancelInterventionTicketReturn);
};

MonitorInputInterventionCs.prototype.cancelInterventionTicketReturn=function(interventionTicket)
{
  miInterventionCs.initInterventionTicket(interventionTicket);
  $('interventionTicketEditButton'  ).style.display="none";
  $('interventionTicketCancelButton').style.display="block";
  miInterventionCs.openInterventionTicketWindow("Annulation de l'Intervention N°"+interventionTicket.idIntervention);
};


MonitorInputInterventionCs.prototype.deleteInterventionTicket=function(notifyOthers)
{
  //if confirm

  MonitorInputIntervention.deleteIntervention($('interventionTicketId').value, notifyOthers, this.deleteInterventionTicketReturn);
};

MonitorInputInterventionCs.prototype.deleteInterventionTicketReturn=function()
{
  miInterventionCs.hideInterventionTicket();
};

MonitorInputInterventionCs.prototype.hideInterventionTicket=function()
{
  miWm.interventionWindow.setOpacity(0);
  miInterventionCs.resetInterventionForm();
};

MonitorInputInterventionCs.prototype.updateAddress=function(fieldId, fieldName)
{
  this.updateInterventionStringField(fieldId, fieldName);

  var rue       =$('interventionTicketRue'       );
  var codePostal=$('interventionTicketCodePostal');
  var ville     =$('interventionTicketVille'     );

  rue       .value=rue       .value.strip();
  codePostal.value=codePostal.value.strip();
  ville     .value=ville     .value.strip();

  if( rue       .value != '' && rue       .oldValue != rue       .value &&
      codePostal.value != '' && codePostal.oldValue != codePostal.value &&
      ville     .value != '' && ville     .oldValue != ville     .value   )
  {// valeur non vide et non différente de la précédente valeur
    crfGoogleMap.findCoordinatesForAddress( rue       .value +', '+
                                            codePostal.value +', '+
                                            ville     .value,
                                            this.updateAddressReturn,
                                            this.updateAddressErrorReturn);
  }
};
MonitorInputInterventionCs.prototype.updateAddressReturn=function(place)
{
  var coordinates = place.Point.coordinates;
  //ATTENTION, visiblement, les coordonnées google sont fournies dans l'ordre (Longitude,Latitude) alors qu'ils sont utilisé partout ailleurs dans l'ordre (Latitude,Longitude)
  $('interventionTicketCoordinateLat' ).value=coordinates[1];
  $('interventionTicketCoordinateLong').value=coordinates[0];

  MonitorInputIntervention.updateGoogleCoordinates(coordinates[1], coordinates[0], $('interventionTicketId').value, miInterventionCs.updateAddressSaveReturn);

  $('googleAdressCheckStatus').src=contextPath+"/img/famfamfam/accept.png";
};
MonitorInputInterventionCs.prototype.updateAddressSaveReturn=function()
{
  $('googleAdressCheckStatus').src=contextPath+"/img/famfamfam/accept.png";
};

MonitorInputInterventionCs.prototype.updateAddressErrorReturn=function(place)
{
  $('googleAdressCheckStatus').src=contextPath+"/img/famfamfam/exclamation.png";
  alert("Sorry, we were unable to geocode that address");
};

MonitorInputInterventionCs.prototype.initUnfinishedInterventionGrid=function()
{

};

/************************Méthode*d'update*****************************************/
MonitorInputInterventionCs.prototype.updateInterventionIntField=function(fieldId, fieldName)
{
  crfIrpUtils.checkField (fieldId);
  crfIrpUtils.fieldSaving(fieldId);

  fieldValue = $(fieldId).value;
  if(fieldValue!='' && fieldValue != $(fieldId).oldValue)
  {
    MonitorInputIntervention.updateInterventionIntegerField(
                                              $('interventionTicketId').value,
                                              fieldName,
                                              fieldValue,
                                              function()
                                              {
                                                crfIrpUtils.defaultBackgroundColorForField(fieldId);
                                              });
  }
  else
    crfIrpUtils.defaultBackgroundColorForField(fieldId);
};
MonitorInputInterventionCs.prototype.updateInterventionDateField=function(fieldId, fieldName)
{
  crfIrpUtils.checkField (fieldId);
  crfIrpUtils.fieldSaving(fieldId);

  fieldValue = $(fieldId).value;
  if(fieldValue!='' && fieldValue != $(fieldId).oldValue)
  {
    MonitorInputIntervention.updateInterventionDateField(
                                              $('interventionTicketId').value,
                                              fieldName,
                                              crfIrpUtils.parseDateTime(fieldValue),
                                              function()
                                              {
                                                crfIrpUtils.defaultBackgroundColorForField(fieldId);
                                              });
  }
  else
    crfIrpUtils.defaultBackgroundColorForField(fieldId);
};
MonitorInputInterventionCs.prototype.updateInterventionFloatField=function(fieldId, fieldName)
{
  crfIrpUtils.checkField (fieldId);
  crfIrpUtils.fieldSaving(fieldId);
  fieldValue = $(fieldId).value;
  if(fieldValue!='' && fieldValue != $(fieldId).oldValue)
  {
    MonitorInputIntervention.updateInterventionFloatField(
                                              $('interventionTicketId').value,
                                              fieldName,
                                              fieldValue,
                                              function()
                                              {
                                                crfIrpUtils.defaultBackgroundColorForField(fieldId);
                                              });
  }
  else
    crfIrpUtils.defaultBackgroundColorForField(fieldId);
};

MonitorInputInterventionCs.prototype.updateInterventionStringField=function(fieldId, fieldName)
{
  crfIrpUtils.checkField (fieldId);
  crfIrpUtils.fieldSaving(fieldId);
  fieldValue = $(fieldId).value;
  if(fieldValue!='' && fieldValue != $(fieldId).oldValue)
  {
    MonitorInputIntervention.updateInterventionStringField(
                                              $('interventionTicketId').value,
                                              fieldName,
                                              fieldValue,
                                              function()
                                              {
                                                crfIrpUtils.defaultBackgroundColorForField(fieldId);
                                              });
  }
  else
    crfIrpUtils.defaultBackgroundColorForField(fieldId);
};

MonitorInputInterventionCs.prototype.updateInterventionBooleanField=function(fieldId, fieldName)
{
  crfIrpUtils.checkField (fieldId);
  crfIrpUtils.fieldSaving(fieldId);
  fieldValue = $(fieldId).value;
  if(fieldValue!='' && fieldValue != $(fieldId).oldValue)
  {
    MonitorInputIntervention.updateInterventionBooleanField(
                                              $('interventionTicketId').value,
                                              fieldName,
                                              fieldValue,
                                              function()
                                              {
                                                crfIrpUtils.defaultBackgroundColorForField(fieldId);
                                              });
  }
  else
    crfIrpUtils.defaultBackgroundColorForField(fieldId);
};