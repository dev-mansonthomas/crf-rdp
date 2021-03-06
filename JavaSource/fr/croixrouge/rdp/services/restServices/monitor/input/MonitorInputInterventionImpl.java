package fr.croixrouge.rdp.services.restServices.monitor.input;

import fr.croixrouge.rdp.model.monitor.Intervention;
import fr.croixrouge.rdp.model.monitor.InterventionTicket;
import fr.croixrouge.rdp.model.monitor.dwr.GridSearchFilterAndSortObject;
import fr.croixrouge.rdp.model.monitor.dwr.ListRange;
import fr.croixrouge.rdp.services.intervention.InterventionService;
import fr.croixrouge.rdp.services.restServices.RestUtility;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import javax.inject.Inject;
import javax.servlet.http.HttpSession;
import java.util.Date;

public class MonitorInputInterventionImpl
{
  private static Log                 logger              = LogFactory.getLog(MonitorInputInterventionImpl.class);
  private        InterventionService interventionService = null;

  @Inject
  private HttpSession session;


  public MonitorInputInterventionImpl(InterventionService interventionService)
  {
    this.interventionService = interventionService;
    if (logger.isDebugEnabled())
      logger.debug("constructor called");
  }

  public Intervention createEmptyIntervention() throws Exception
  {
    int regulationId = RestUtility.getRegulationId(this.session);
    Intervention intervention = this.interventionService.createEmptyIntervention(regulationId);
    return intervention;
  }


  public void endOfEditionEvent(int idIntervention) throws Exception
  {


    this.interventionService.updateInterventionIntegerField(idIntervention, "id_etat", 1);
    
    InterventionTicket interventionTicket = this.interventionService.getInterventionTicket(idIntervention);
    //TODO Websocket replace dwr code
  /*  this.updateRegulationUser(new ScriptBuffer().appendCall("moInterventionCs.updateInterventionToAffect", interventionTicket),
        outPageName);*/
  }
  
  public InterventionTicket getInterventionTicket(int idIntervention) throws Exception
  {
    return this.interventionService.getInterventionTicket(idIntervention);
  }
  
  public void deleteIntervention(int idIntervention, boolean notifyOthers) throws Exception
  {
    this.interventionService.updateInterventionIntegerField(idIntervention, "id_etat", 4);
    if(notifyOthers)
    {
      //TODO Websocket replace dwr code
     /* updateRegulationUser(new ScriptBuffer().appendCall("moInterventionCs.deleteInterventionToAffect",idIntervention), 
          outPageName);*/
    }
  }
  
  public void updateGoogleCoordinates(float latitude, float longitude, int idIntervention) throws Exception
  {
    
    this.interventionService.updateGoogleCoordinates(latitude, longitude, idIntervention);
  }
  
//int status, int index, int limit
  public ListRange<InterventionTicket> getInterventionTicketList(GridSearchFilterAndSortObject gsfaso)throws Exception
  {
    int regulationId = RestUtility.getRegulationId(this.session);
    return this.interventionService.getInterventionTicketWithStatus(regulationId, gsfaso);
  }
  
  
  
  /* Update methods*/
  public void updateInterventionIntegerField(int idIntervention, String fieldName, int      fieldValue) throws Exception
  {
    
    try
    {
      this.interventionService.updateInterventionIntegerField(idIntervention, fieldName, fieldValue);
    }
    catch(Exception e)
    {
      logger.error("Error while updating integer field on intervention id='"+idIntervention+"' fieldName='"+fieldName+"' fieldValue='"+fieldValue+"'",e);
    }
  }
  public void updateInterventionFloatField  (int idIntervention, String fieldName, float    fieldValue) throws Exception
  {
    try
    {
      this.interventionService.updateInterventionFloatField(idIntervention, fieldName, fieldValue);
    }
    catch(Exception e)
    {
      logger.error("Error while updating String field on intervention id='"+idIntervention+"' fieldName='"+fieldName+"' fieldValue='"+fieldValue+"'",e);
    }
  }
  public void updateInterventionStringField (int idIntervention, String fieldName, String   fieldValue) throws Exception
  {
    
    try
    {
      this.interventionService.updateInterventionStringField(idIntervention, fieldName, fieldValue);
    }
    catch(Exception e)
    {
      logger.error("Error while updating String field on intervention id='"+idIntervention+"' fieldName='"+fieldName+"' fieldValue='"+fieldValue+"'",e);
    }
  }
  
  public void updateInterventionDateField   (int idIntervention, String fieldName, Date     fieldValue) throws Exception
  {
    
    try
    {
      this.interventionService.updateInterventionDateField(idIntervention, fieldName, fieldValue);
    }
    catch(Exception e)
    {
      logger.error("Error while updating date field on intervention id='"+idIntervention+"' fieldName='"+fieldName+"' fieldValue='"+fieldValue+"'",e);
    }
  }
  public void updateInterventionBooleanField(int idIntervention, String fieldName, boolean  fieldValue) throws Exception
  {
    
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
