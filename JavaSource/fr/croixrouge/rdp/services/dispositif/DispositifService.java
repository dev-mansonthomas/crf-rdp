package fr.croixrouge.rdp.services.dispositif;

import java.util.Date;
import java.util.List;
import java.util.Map;

import fr.croixrouge.rdp.model.monitor.Dispositif;
import fr.croixrouge.rdp.model.monitor.DispositifSummaryInformation;
import fr.croixrouge.rdp.model.monitor.DispositifTicket;
import fr.croixrouge.rdp.model.monitor.DispositifTypeDefinition;
import fr.croixrouge.rdp.model.monitor.Position;
import fr.croixrouge.rdp.model.monitor.Regulation;
import fr.croixrouge.rdp.model.monitor.dwr.ListRange;

public interface DispositifService
{ 
  int STATUS_INDISPO                    = 0; //indispo
  int STATUS_DISPO                      = 1 ; //dispo
  int STATUS_INTERVENTION_AFFECTEE      = 2 ; //intervention affecté
  int STATUS_PARTI                      = 3 ; //Parti
  int STATUS_SUR_PLACE                  = 4 ; //Sur place
  int STATUS_PRIMAIRE                   = 5 ; //Primaire
  int STATUS_SECONDAIRE                 = 6 ; //Secondaire
  int STATUS_TRANSPORT                  = 7 ; //transport
  int STATUS_ARRIVE_HOSPITAL            = 8 ; //Arrivé hopital
  int STATUS_INTER_TERMINEE             = 9 ; //Intervention Terminée
  int STATUS_VACATION_TERMINEE          = 10; //Vacation Terminée
  int STATUS_INTER_ANNULEE              = 11; //Inter annulée, seulement pour la table intervention
  
  
  void cancelIntervention(int idDispositif) throws Exception;
  
  
  ListRange<Dispositif>  getAllDispositif(int regulationId) throws Exception;
  Dispositif             getDispositif(int idRegulation, int idDispositif) throws Exception;
  Dispositif             getDispositif(int idRegulation, int idDispositif, boolean withEquipierList) throws Exception;
  DispositifTicket       getDispositifTicket(int idDispositif) throws Exception;
  Dispositif             createEmptyDispositif(Regulation regulation) throws Exception;
  void                   updateEtatDispositif(int idDispositif, int idEtatDispositif) throws Exception;
  void                   actionEndOfIntervention(int idDispositif) throws Exception;
  
  Map<String, List<DispositifTypeDefinition>> getDispositifTypeDefinition() throws Exception;

  int  getIdTypeDispositif(int idRegulation, int idDispositif) throws Exception;
  int  getIdVehiculeOfDispositif(int idDispositif) throws Exception;
  
  DispositifSummaryInformation  getDispositifSummaryInformation(int idDispositif) throws Exception;
  
  void updateGoogleCoordinates(float latitude, float longitude, int idDispositif, boolean current) throws Exception;
  void updateDispositifIntegerField(int idDispositif, String fieldName, int fieldValue) throws Exception;
  void updateDispositifFloatField(int idDispositif, String fieldName, float fieldValue) throws Exception;
  void updateDispositifStringField(int idDispositif, String fieldName, String fieldValue) throws Exception;
  void updateDispositifDateField(int idDispositif, String fieldName, Date fieldValue) throws Exception;
  void updateDispositifBooleanField(int idDispositif, String fieldName, boolean fieldValue) throws Exception;
  
  void updateDispositifSetIntervention(int idDispositif, int idIntervention) throws Exception;
  
  void affectEquipierToDispositif(int idDispositif, int idEquipier, int idRoleEquipier) throws Exception;
  void unaffectEquipierToDispositif(int idDispositif, int idEquipier) throws Exception;
  
  void affectInterventionToDispositif(int idDispositif, int idIntervention, Date dateAffectation) throws Exception;
  void unAffectInterventionToDispositif(int idDispositif, int idIntervention) throws Exception;
  void attachInterventionToDispositif(int idDispositif, int idIntervention) throws Exception;
  void actionOnDispositif(int idDispositif, int newIdEtat, Date actionDate) throws Exception;
  void updateDispositifPosition(int idDispositif, Position currentPosition, Position previousPosition) throws Exception;

  void updateActifValueOfDispositif(int idDispositif, boolean actif) throws Exception;
  void deleteDispositif(int idDispositif) throws Exception;
  int  numberOfInterventionAffectedToDispositif(int idDispositif) throws Exception;

  
  
  ListRange<DispositifTicket>  getRecentDispositif(int idRegulation, int index, int limit) throws Exception;

}
