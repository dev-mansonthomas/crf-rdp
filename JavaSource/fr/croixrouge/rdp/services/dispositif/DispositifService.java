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
  public final static int STATUS_INDISPO                    = 0; //indispo
  public final static int STATUS_DISPO                      = 1 ; //dispo
  public final static int STATUS_INTERVENTION_AFFECTEE      = 2 ; //intervention affecté
  public final static int STATUS_PARTI                      = 3 ; //Parti
  public final static int STATUS_SUR_PLACE                  = 4 ; //Sur place
  public final static int STATUS_PRIMAIRE                   = 5 ; //Primaire
  public final static int STATUS_SECONDAIRE                 = 6 ; //Secondaire
  public final static int STATUS_TRANSPORT                  = 7 ; //transport
  public final static int STATUS_ARRIVE_HOSPITAL            = 8 ; //Arrivé hopital
  public final static int STATUS_INTER_TERMINEE             = 9 ; //Intervention Terminée
  public final static int STATUS_VACATION_TERMINEE          = 10; //Vacation Terminée
  public final static int STATUS_INTER_ANNULEE              = 11; //Inter annulée, seulement pour la table intervention
  
  
  public void cancelIntervention(int idDispositif) throws Exception;
  
  
  public ListRange<Dispositif>  getAllDispositif        (int regulationId                                                       ) throws Exception;
  public Dispositif             getDispositif           (int idRegulation       , int idDispositif                              ) throws Exception;
  public Dispositif             getDispositif           (int idRegulation       , int idDispositif    , boolean withEquipierList) throws Exception;
  public DispositifTicket       getDispositifTicket     (int idDispositif                                                       ) throws Exception;
  public Dispositif             createEmptyDispositif   (Regulation regulation                                                  ) throws Exception;
  public void                   updateEtatDispositif    (int idDispositif       , int idEtatDispositif                          ) throws Exception;
  public void                   actionEndOfIntervention (int idDispositif) throws Exception;
  
  public Map<String, List<DispositifTypeDefinition>> getDispositifTypeDefinition() throws Exception;

  public int  getIdTypeDispositif                     (int idRegulation, int idDispositif) throws Exception;
  public int  getIdVehiculeOfDispositif               (int idDispositif                  ) throws Exception;
  
  public DispositifSummaryInformation  getDispositifSummaryInformation(int idDispositif) throws Exception;
  
  public void updateGoogleCoordinates                 (float latitude  , float  longitude, int      idDispositif, boolean current) throws Exception;
  public void updateDispositifIntegerField            (int idDispositif, String fieldName, int      fieldValue  ) throws Exception;
  public void updateDispositifFloatField              (int idDispositif, String fieldName, float    fieldValue  ) throws Exception;
  public void updateDispositifStringField             (int idDispositif, String fieldName, String   fieldValue  ) throws Exception;
  public void updateDispositifDateField               (int idDispositif, String fieldName, Date     fieldValue  ) throws Exception;
  public void updateDispositifBooleanField            (int idDispositif, String fieldName, boolean  fieldValue  ) throws Exception;
  
  public void updateDispositifSetIntervention         (int idDispositif, int idIntervention                                 ) throws Exception;
  
  public void affectEquipierToDispositif              (int idDispositif, int idEquipier, int idRoleEquipier ) throws Exception;
  public void unaffectEquipierToDispositif            (int idDispositif, int idEquipier                     ) throws Exception;
  
  public void affectInterventionToDispositif          (int idDispositif, int idIntervention      , Date dateAffectation     ) throws Exception;
  public void unAffectInterventionToDispositif        (int idDispositif, int idIntervention                                 ) throws Exception;
  public void attachInterventionToDispositif          (int idDispositif, int idIntervention                                 ) throws Exception;
  public void actionOnDispositif                      (int idDispositif, int newIdEtat           , Date actionDate          ) throws Exception;
  public void updateDispositifPosition                (int idDispositif, Position currentPosition, Position previousPosition) throws Exception;

  public void updateActifValueOfDispositif            (int idDispositif, boolean actif                                        ) throws Exception;
  public void deleteDispositif                        (int idDispositif                                                       ) throws Exception;
  public int  numberOfInterventionAffectedToDispositif(int idDispositif                                                       ) throws Exception;

  
  
  public ListRange<DispositifTicket>  getRecentDispositif                     (int idRegulation  , int index, int limit                               ) throws Exception;

}
