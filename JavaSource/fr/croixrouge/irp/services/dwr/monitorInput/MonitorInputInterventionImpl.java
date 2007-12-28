package fr.croixrouge.irp.services.dwr.monitorInput;

import java.util.Date;

import javax.servlet.http.HttpSession;

import org.directwebremoting.ScriptBuffer;

import fr.croixrouge.irp.model.monitor.Intervention;
import fr.croixrouge.irp.model.monitor.InterventionTicket;
import fr.croixrouge.irp.services.dwr.DWRUtils;
import fr.croixrouge.irp.services.intervention.InterventionService;

public class MonitorInputInterventionImpl  extends DWRUtils
{
  private InterventionService interventionService = null;
  public MonitorInputInterventionImpl(InterventionService interventionService)
  {
    this.interventionService = interventionService;
  }
  
  public Intervention createEmptyIntervention() throws Exception
  {
    HttpSession session = this.validateSession();
    Intervention intervention = this.interventionService.createEmptyIntervention(getRegulationId(session));
    return intervention;
  }
  
  
  public void endOfEditionEvent(int idIntervention) throws Exception
  {
    this.validateSession();

    this.interventionService.updateInterventionIntegerField(idIntervention, "etat_intervention", 1);
    
    InterventionTicket interventionTicket = this.interventionService.getInterventionTicket(idIntervention);
    
    
    ScriptBuffer script = new ScriptBuffer();
    script.appendScript("moInterventionCs.updateInterventionToAffect(")
                        .appendData(interventionTicket)
                        .appendScript(");");
    
    updateRegulationUser(script, outPageName);
    
  }
  
  public InterventionTicket getInterventionTicket(int idIntervention) throws Exception
  {
    return this.interventionService.getInterventionTicket(idIntervention);
  }
  
  public void deleteIntervention(int idIntervention, boolean notifyOthers) throws Exception
  {
    this.interventionService.updateInterventionIntegerField(idIntervention, "etat_intervention", -1);
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
  
  
  /* Update methods*/
  public void updateInterventionIntegerField(int idIntervention, String fieldName, int      fieldValue) throws Exception
  {
    this.validateSession();
    this.interventionService.updateInterventionIntegerField(idIntervention, fieldName, fieldValue);
  }
  public void updateInterventionFloatField  (int idIntervention, String fieldName, float    fieldValue) throws Exception
  {
    this.validateSession();
    this.interventionService.updateInterventionFloatField(idIntervention, fieldName, fieldValue);
  }
  public void updateInterventionStringField (int idIntervention, String fieldName, String   fieldValue) throws Exception
  {
    this.validateSession();
    this.interventionService.updateInterventionStringField(idIntervention, fieldName, fieldValue);
  }
  
  public void updateInterventionDateField   (int idIntervention, String fieldName, Date     fieldValue) throws Exception
  {
    this.validateSession();
    this.interventionService.updateInterventionDateField(idIntervention, fieldName, fieldValue);
  }
  public void updateInterventionBooleanField(int idIntervention, String fieldName, boolean  fieldValue) throws Exception
  {
    this.validateSession();
    this.interventionService.updateInterventionBooleanField(idIntervention, fieldName, fieldValue);
  }
}