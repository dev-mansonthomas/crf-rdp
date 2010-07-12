package fr.croixrouge.rdp.services.dwr.monitor.input;

import java.util.Date;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.directwebremoting.ScriptBuffer;

import fr.croixrouge.rdp.model.monitor.Dispositif;
import fr.croixrouge.rdp.model.monitor.Intervention;
import fr.croixrouge.rdp.model.monitor.InterventionTicket;
import fr.croixrouge.rdp.model.monitor.dwr.ListRange;
import fr.croixrouge.rdp.services.dispositif.DispositifService;
import fr.croixrouge.rdp.services.dwr.DWRUtils;
import fr.croixrouge.rdp.services.intervention.InterventionService;

public class MonitorInputBilanImpl  extends DWRUtils
{
  private static Log logger           = LogFactory.getLog(MonitorInputBilanImpl.class);
  private InterventionService interventionService = null;
  private DispositifService   dispositifService   = null;
  
  public MonitorInputBilanImpl(InterventionService interventionService,
                               DispositifService   dispositifService)
  {
    this.interventionService = interventionService;
    this.dispositifService   = dispositifService;
    
    if(logger.isDebugEnabled())
      logger.debug("constructor called");
  }
  
  public Intervention createEmptyIntervention() throws Exception
  {
    this.validateSession();
    Intervention intervention = this.interventionService.createEmptyIntervention(validateSessionAndGetRegulationId());
    return intervention;
  }
  
  
  public void endOfEditionEvent(int idIntervention) throws Exception
  {
    this.validateSession();

    this.interventionService.updateInterventionIntegerField(idIntervention, "id_etat", 1);
    
    InterventionTicket interventionTicket = this.interventionService.getInterventionTicket(idIntervention);
    
    this.updateRegulationUser(new ScriptBuffer().appendCall("moInterventionCs.updateInterventionToAffect",interventionTicket), 
        outPageName);
  }
  public Intervention       getIntervention(int idIntervention) throws Exception
  {
    this.validateSession();
    try
    {
      return this.interventionService.getIntervention(idIntervention);  
    }
    catch(Exception e)
    {
      logger.error("Error while loading intervention id="+idIntervention, e);
      throw e;
    }
    
  }
  
  //TODO supprimer la ligne de dispositif_interventions, voir pour mettre ce code dans le delegate, gerer  le commentaire d'annulation
  public void       cancelIntervention(int idIntervention, int idDispositif, int idMotifAnnulation) throws Exception
  {
    if(logger.isDebugEnabled())
      logger.debug("cancelling intervention "+idIntervention+" of dispositif "+idDispositif+" with motif "+idMotifAnnulation);
    
    int regulationId = this.validateSessionAndGetRegulationId();

    this.interventionService.updateEtatIntervention         (idIntervention, 10);//inter annulée
    this.interventionService.updateInterventionIntegerField (idIntervention, "id_motif_annulation", idMotifAnnulation);// set le motif annulation (commentaires sauvegarder normalement)
    this.dispositifService  .updateDispositifSetIntervention(idDispositif  , 0 );//désaffecte l'intervention au dispositif
    this.dispositifService  .updateEtatDispositif           (idDispositif  , -1);
    Dispositif dispositif = this.dispositifService.getDispositif(regulationId, idDispositif);
    
    this.updateRegulationUser(new ScriptBuffer().appendCall("moDispositifCs.updateDispositif",dispositif), DWRUtils.outPageName);
  }
  
  
  public InterventionTicket getInterventionTicket(int idIntervention) throws Exception
  {
    this.validateSession();
    return this.interventionService.getInterventionTicket(idIntervention);
  }
  
  public void deleteIntervention(int idIntervention, boolean notifyOthers) throws Exception
  {
    this.validateSession();
    this.interventionService.updateInterventionIntegerField(idIntervention, "id_etat", 4);
    if(notifyOthers)
    {
      updateRegulationUser(new ScriptBuffer().appendCall("moInterventionCs.deleteInterventionToAffect",idIntervention), 
          outPageName);
    }
  }
  
  public void updateGoogleCoordinates(float latitude, float longitude, int idIntervention) throws Exception
  {
    this.validateSession();
    this.interventionService.updateGoogleCoordinates(latitude, longitude, idIntervention);
  }
  

  public ListRange<InterventionTicket> getInterventionTicketList(int status, int index, int limit)throws Exception
  {
    this.validateSession();
    int    currentUserRegulationId = this.validateSessionAndGetRegulationId();
    return this.interventionService.getInterventionTicketWithStatus(currentUserRegulationId, status, index, limit);
  }
  
  
  
  /* Update methods*/
  public void updateIntegerField(int idIntervention, String fieldName, int      fieldValue) throws Exception
  {
    this.validateSession();
    try
    {
      this.interventionService.updateInterventionIntegerField(idIntervention, fieldName, fieldValue);
    }
    catch(Exception e)
    {
      logger.error("Error while updating integer field on intervention id='"+idIntervention+"' fieldName='"+fieldName+"' fieldValue='"+fieldValue+"'",e);
    }
    
  }
  public void updateFloatField  (int idIntervention, String fieldName, float    fieldValue) throws Exception
  {
    this.validateSession();
    try
    {
      this.interventionService.updateInterventionFloatField(idIntervention, fieldName, fieldValue);
    }
    catch(Exception e)
    {
      logger.error("Error while updating float field on intervention id='"+idIntervention+"' fieldName='"+fieldName+"' fieldValue='"+fieldValue+"'",e);
    }
  }
  public void updateStringField (int idIntervention, String fieldName, String   fieldValue) throws Exception
  {
    this.validateSession();
    try
    {
      this.interventionService.updateInterventionStringField(idIntervention, fieldName, fieldValue);
    }
    catch(Exception e)
    {
      logger.error("Error while updating String field on intervention id='"+idIntervention+"' fieldName='"+fieldName+"' fieldValue='"+fieldValue+"'",e);
    }
  }
  
  public void updateDateField   (int idIntervention, String fieldName, Date     fieldValue) throws Exception
  {
    this.validateSession();
    try
    {
      this.interventionService.updateInterventionDateField(idIntervention, fieldName, fieldValue);
    }
    catch(Exception e)
    {
      logger.error("Error while updating date field on intervention id='"+idIntervention+"' fieldName='"+fieldName+"' fieldValue='"+fieldValue+"'",e);
    }
  }
  public void updateBooleanField(int idIntervention, String fieldName, boolean  fieldValue) throws Exception
  {
    this.validateSession();
    try
    {
      this.interventionService.updateInterventionBooleanField(idIntervention, fieldName, fieldValue);
    }
    catch(Exception e)
    {
      logger.error("Error while updating boolean field on intervention id='"+idIntervention+"' fieldName='"+fieldName+"' fieldValue='"+fieldValue+"'",e);
    }
  }
}