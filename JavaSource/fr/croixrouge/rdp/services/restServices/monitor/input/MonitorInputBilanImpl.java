package fr.croixrouge.rdp.services.restServices.monitor.input;

import fr.croixrouge.rdp.model.monitor.Intervention;
import fr.croixrouge.rdp.model.monitor.InterventionTicket;
import fr.croixrouge.rdp.services.delegate.DispositifInterventionDelegate.DispositifInterventionDelegate;
import fr.croixrouge.rdp.services.intervention.InterventionService;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.util.Date;

public class MonitorInputBilanImpl 
{
  private static Log logger           = LogFactory.getLog(MonitorInputBilanImpl.class);
  private InterventionService            interventionService = null;
  private DispositifInterventionDelegate dispositifInterventionDelegate = null;
  
  public MonitorInputBilanImpl(InterventionService            interventionService,
                               DispositifInterventionDelegate dispositifInterventionDelegate )
  {
    this.interventionService            = interventionService;
    this.dispositifInterventionDelegate = dispositifInterventionDelegate;
    
    if(logger.isDebugEnabled())
      logger.debug("constructor called");
  }
  
  public Intervention createEmptyIntervention() throws Exception
  {
    //TODO regulationId from session
    int regulationId=1;//validateSessionAndGetRegulationId();
    Intervention intervention = this.interventionService.createEmptyIntervention(regulationId);
    return intervention;
  }
  
  
  public void endOfEditionEvent(int idIntervention) throws Exception
  {

    this.interventionService.updateInterventionIntegerField(idIntervention, "id_etat", 1);
    
    InterventionTicket interventionTicket = this.interventionService.getInterventionTicket(idIntervention);
    //TODO Websocket replace dwr code
    /*this.updateRegulationUser(new ScriptBuffer().appendCall("moInterventionCs.updateInterventionToAffect",interventionTicket),
        outPageName);*/
  }
  public Intervention       getIntervention(int idIntervention) throws Exception
  {
    
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
  

  public void       cancelIntervention(int idIntervention, int idDispositif, int idMotifAnnulation) throws Exception
  {
    //TODO regulation Id from Session
    int regulationId = 1;//this.validateSessionAndGetRegulationId();
    this.dispositifInterventionDelegate.cancelIntervention(regulationId, idDispositif, idIntervention, idMotifAnnulation);    
    
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
      /*updateRegulationUser(new ScriptBuffer().appendCall("moInterventionCs.deleteInterventionToAffect",idIntervention),
          outPageName);*/
    }
  }
  
  public void updateGoogleCoordinates(float latitude, float longitude, int idIntervention) throws Exception
  {
    
    this.interventionService.updateGoogleCoordinates(latitude, longitude, idIntervention);
  }

  
  /* Update methods*/
  public void updateIntegerField(int idIntervention, String fieldName, int      fieldValue) throws Exception
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
  public void updateFloatField  (int idIntervention, String fieldName, float    fieldValue) throws Exception
  {
    
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
    
    try
    {
      this.interventionService.updateInterventionBooleanField(idIntervention, fieldName, fieldValue);
    }
    catch(Exception e)
    {
      logger.error("Error while updating boolean field on intervention id='"+idIntervention+"' fieldName='"+fieldName+"' fieldValue='"+fieldValue+"'",e);
    }
  }

  public void updateDoubleBooleanField(int idIntervention, String fieldName1, boolean  fieldValue1, String fieldName2, boolean  fieldValue2) throws Exception
  {
    
    try
    {
      this.interventionService.updateInterventionBooleanField(idIntervention, fieldName1, fieldValue1);
      this.interventionService.updateInterventionBooleanField(idIntervention, fieldName2, fieldValue2);
    }
    catch(Exception e)
    {
      logger.error("Error while updating boolean field on intervention id='"+idIntervention+"' fieldName1='"+fieldName1+"' fieldValue1='"+fieldValue1+"' fieldName2='"+fieldName2+"' fieldValue2='"+fieldValue2+"'",e);
    }
  }
}
