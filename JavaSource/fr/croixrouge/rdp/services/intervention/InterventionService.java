package fr.croixrouge.rdp.services.intervention;

import java.util.Date;
import java.util.List;

import fr.croixrouge.rdp.model.monitor.Intervention;
import fr.croixrouge.rdp.model.monitor.InterventionTicket;
import fr.croixrouge.rdp.model.monitor.Position;
import fr.croixrouge.rdp.model.monitor.dwr.DataForCloneIntervention;
import fr.croixrouge.rdp.model.monitor.dwr.GridSearchFilterAndSortObject;
import fr.croixrouge.rdp.model.monitor.dwr.ListRange;

public interface InterventionService
{
  public String                         generateIdsList                     (List<InterventionTicket> interventions             ) throws Exception;
  public Intervention                   createEmptyIntervention             (int idRegulation                                   ) throws Exception;
  public Intervention                   getIntervention                     (int idIntervention                                 ) throws Exception;
  public InterventionTicket             getInterventionTicket               (int idIntervention                                 ) throws Exception;
  public List<InterventionTicket>       getInterventionsTicketFromDispositif(int idDispositif                                   ) throws Exception;
  public ListRange<InterventionTicket>  getInterventionTicketWithStatus     (int idRegulation, GridSearchFilterAndSortObject gsfaso ) throws Exception; 
  public List<InterventionTicket>       getAllInterventionTicketWithStatus  (int idRegulation, int status                       ) throws Exception;
  public ListRange<InterventionTicket>  searchInterventions                 (GridSearchFilterAndSortObject gsfaso               ) throws Exception;
  public void                           updateGoogleCoordinates             (float latitude, float longitude, int idIntervention) throws Exception;
  
  
  public void affectInterventionToDispositif  (int idIntervention, int idDispositif, Date dateAffectation ) throws Exception;
  public void reAffectInterventionToDispositif(int idIntervention, int idDispositif, Date dateAffectation ) throws Exception;
  public void unAffectInterventionToDispositif(int idIntervention, Date dateAffectation                   ) throws Exception;
  public void actionOnIntervention            (int idIntervention, int newIdEtat   , Date actionDate      ) throws Exception;
  public void actionOnInterventions           (List<InterventionTicket> interventions, int newIdEtat   , Date actionDate      ) throws Exception;
  public void updateEtatIntervention          (int idIntervention, int idNewEtatIntervention              ) throws Exception;
  public void updateEtatInterventions         (List<InterventionTicket> interventions, int idNewEtatIntervention) throws Exception;
  public void updateInterventionIntegerField  (int idIntervention, String fieldName, int      fieldValue  ) throws Exception;
  public void updateInterventionFloatField    (int idIntervention, String fieldName, float    fieldValue  ) throws Exception;
  public void updateInterventionStringField   (int idIntervention, String fieldName, String   fieldValue  ) throws Exception;
  public void updateInterventionDateField     (int idIntervention, String fieldName, Date     fieldValue  ) throws Exception;
  public void updateInterventionBooleanField  (int idIntervention, String fieldName, boolean  fieldValue  ) throws Exception;
  
  public void chooseEvacDestination           (int idIntervention, int idLieu, String destinationLabel, Position position) throws Exception;
  public int  cloneIntervention               (DataForCloneIntervention dataForCloneIntervention) throws Exception;
  public void cancelIntervention              (int idIntervention) throws Exception;
  
}