package fr.croixrouge.irp.services.dwr.monitorInput;

import java.util.Date;

import org.directwebremoting.ScriptBuffer;

import fr.croixrouge.irp.model.monitor.Intervention;
import fr.croixrouge.irp.model.monitor.InterventionTicket;
import fr.croixrouge.irp.model.monitor.dwr.ListRange;
import fr.croixrouge.irp.services.dwr.DWRUtils;
import fr.croixrouge.irp.services.intervention.InterventionService;

public class MonitorInputBilanImpl  extends DWRUtils
{
  private InterventionService interventionService = null;
  public MonitorInputBilanImpl(InterventionService interventionService)
  {
    this.interventionService = interventionService;
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
    
    
    ScriptBuffer script = new ScriptBuffer();
    script.appendScript("moInterventionCs.updateInterventionToAffect(")
                        .appendData(interventionTicket)
                        .appendScript(");");
    
    updateRegulationUser(script, outPageName);
  }
  public Intervention       getIntervention(int idIntervention) throws Exception
  {
    this.validateSession();
    return this.interventionService.getIntervention(idIntervention);
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
      ScriptBuffer script = new ScriptBuffer();
      script.appendScript("moInterventionCs.deleteInterventionToAffect("+idIntervention+");");      
      updateRegulationUser(script, outPageName);
    }
  }
  
  public void updateGoogleCoordinates(float latitude, float longitude, int idIntervention) throws Exception
  {
    this.validateSession();
    this.interventionService.updateGoogleCoordinates(latitude, longitude, idIntervention);
  }
  

  public ListRange getInterventionTicketList(int status, int index, int limit)throws Exception
  {
    this.validateSession();
    int    currentUserRegulationId = this.validateSessionAndGetRegulationId();
    return this.interventionService.getInterventionTicketWithStatus(currentUserRegulationId, status, index, limit);
  }
  
  
  
  /* Update methods*/
  public void updateIntegerField(int idIntervention, String fieldName, int      fieldValue) throws Exception
  {
    this.validateSession();
    this.interventionService.updateInterventionIntegerField(idIntervention, fieldName, fieldValue);
  }
  public void updateFloatField  (int idIntervention, String fieldName, float    fieldValue) throws Exception
  {
    this.validateSession();
    this.interventionService.updateInterventionFloatField(idIntervention, fieldName, fieldValue);
  }
  public void updateStringField (int idIntervention, String fieldName, String   fieldValue) throws Exception
  {
    this.validateSession();
    this.interventionService.updateInterventionStringField(idIntervention, fieldName, fieldValue);
  }
  
  public void updateDateField   (int idIntervention, String fieldName, Date     fieldValue) throws Exception
  {
    this.validateSession();
    this.interventionService.updateInterventionDateField(idIntervention, fieldName, fieldValue);
  }
  public void updateBooleanField(int idIntervention, String fieldName, boolean  fieldValue) throws Exception
  {
    this.validateSession();
    this.interventionService.updateInterventionBooleanField(idIntervention, fieldName, fieldValue);
  }
}