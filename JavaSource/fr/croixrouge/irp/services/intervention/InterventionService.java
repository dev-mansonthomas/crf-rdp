package fr.croixrouge.irp.services.intervention;

import java.util.Date;
import java.util.List;

import fr.croixrouge.irp.model.monitor.Intervention;
import fr.croixrouge.irp.model.monitor.InterventionTicket;
import fr.croixrouge.irp.model.monitor.dwr.ListRange;

public interface InterventionService
{
  public Intervention             createEmptyIntervention             (int idRegulation  ) throws Exception;
  public Intervention             getIntervention                     (int idIntervention) throws Exception;
  public InterventionTicket       getInterventionTicket               (int idIntervention) throws Exception;
  public ListRange                getInterventionTicketWithStatus     (int idRegulation, int status, int index, int limit) throws Exception; 
  public List<InterventionTicket> getAllInterventionTicketWithStatus  (int idRegulation, int status) throws Exception;
  
  public void updateGoogleCoordinates       (float latitude, float longitude, int idIntervention      ) throws Exception;
  
  
  public void affectInterventionToDispositif(int idIntervention, int idDispositif, Date dateAffectation) throws Exception;
  
  public void updateInterventionIntegerField(int idIntervention, String fieldName, int      fieldValue) throws Exception;
  public void updateInterventionFloatField  (int idIntervention, String fieldName, float    fieldValue) throws Exception;
  public void updateInterventionStringField (int idIntervention, String fieldName, String   fieldValue) throws Exception;
  public void updateInterventionDateField   (int idIntervention, String fieldName, Date     fieldValue) throws Exception;
  public void updateInterventionBooleanField(int idIntervention, String fieldName, boolean  fieldValue) throws Exception;
}
