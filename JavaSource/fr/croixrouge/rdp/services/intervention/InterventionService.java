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
  String                         generateIdsList(List<InterventionTicket> interventions) throws Exception;
  Intervention                   createEmptyIntervention(int idRegulation) throws Exception;
  Intervention                   getIntervention(int idIntervention) throws Exception;
  InterventionTicket             getInterventionTicket(int idIntervention) throws Exception;
  List<InterventionTicket>       getInterventionsTicketFromDispositif(int idDispositif) throws Exception;
  ListRange<InterventionTicket>  getInterventionTicketWithStatus(int idRegulation, GridSearchFilterAndSortObject gsfaso) throws Exception;
  List<InterventionTicket>       getAllInterventionTicketWithStatus(int idRegulation, int status) throws Exception;
  ListRange<InterventionTicket>  searchInterventions(GridSearchFilterAndSortObject gsfaso) throws Exception;
  void                           updateGoogleCoordinates(float latitude, float longitude, int idIntervention) throws Exception;
  
  
  void affectInterventionToDispositif(int idIntervention, int idDispositif, Date dateAffectation) throws Exception;
  void reAffectInterventionToDispositif(int idIntervention, int idDispositif, Date dateAffectation) throws Exception;
  void unAffectInterventionToDispositif(int idIntervention, Date dateAffectation) throws Exception;
  void actionOnIntervention(int idIntervention, int newIdEtat, Date actionDate) throws Exception;
  void actionOnInterventions(List<InterventionTicket> interventions, int newIdEtat, Date actionDate) throws Exception;
  void updateEtatIntervention(int idIntervention, int idNewEtatIntervention) throws Exception;
  void updateEtatInterventions(List<InterventionTicket> interventions, int idNewEtatIntervention) throws Exception;
  void updateInterventionIntegerField(int idIntervention, String fieldName, int fieldValue) throws Exception;
  void updateInterventionFloatField(int idIntervention, String fieldName, float fieldValue) throws Exception;
  void updateInterventionStringField(int idIntervention, String fieldName, String fieldValue) throws Exception;
  void updateInterventionDateField(int idIntervention, String fieldName, Date fieldValue) throws Exception;
  void updateInterventionBooleanField(int idIntervention, String fieldName, boolean fieldValue) throws Exception;
  
  void chooseEvacDestination(int idIntervention, int idLieu, String destinationLabel, Position position) throws Exception;
  int  cloneIntervention(DataForCloneIntervention dataForCloneIntervention) throws Exception;
  void cancelIntervention(int idIntervention) throws Exception;
  
}
