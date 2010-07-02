package fr.croixrouge.rdp.services.dispositif;

import java.util.Date;
import java.util.List;
import java.util.Map;

import fr.croixrouge.rdp.model.monitor.Dispositif;
import fr.croixrouge.rdp.model.monitor.DispositifTicket;
import fr.croixrouge.rdp.model.monitor.DispositifTypeDefinition;
import fr.croixrouge.rdp.model.monitor.Position;
import fr.croixrouge.rdp.model.monitor.Regulation;
import fr.croixrouge.rdp.model.monitor.dwr.ListRange;

public interface DispositifService
{ 
  public static final int STATUS_FIN_VACATION = 11;
  
  public ListRange<Dispositif>  getAllDispositif        (int regulationId                                                       ) throws Exception;
  public Dispositif             getDispositif           (int idRegulation       , int idDispositif                              ) throws Exception;
  public Dispositif             getDispositif           (int idRegulation       , int idDispositif    , boolean withEquipierList) throws Exception;
  public DispositifTicket       getDispositifTicket     (int idDispositif                                                       ) throws Exception;
  public Dispositif             createEmptyDispositif   (Regulation regulation                                                  ) throws Exception;
  public void                   updateEtatDispositif    (int idDispositif       , int idEtatDispositif                          ) throws Exception;
  public void                   actionEndOfIntervention (int idDispositif) throws Exception;
  
  public Map<String, List<DispositifTypeDefinition>> getDispositifTypeDefinition() throws Exception;

  public int  getIdTypeDispositif                     (int idRegulation, int idDispositif) throws Exception;
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
  public void unAffectInterventionToDispositif        (int idDispositif, int idIntervention      , Date dateAffectation     ) throws Exception;
  public void attachInterventionToDispositif          (int idDispositif, int idIntervention                                 ) throws Exception;
  public void actionOnDispositif                      (int idDispositif, int newIdEtat           , Date actionDate          ) throws Exception;
  public void updateDispositifPosition                (int idDispositif, Position currentPosition, Position previousPosition) throws Exception;

  public void updateActifValueOfDispositif            (int idDispositif, boolean actif                                        ) throws Exception;
  public void deleteDispositif                        (int idDispositif                                                       ) throws Exception;
  public int  numberOfInterventionAffectedToDispositif(int idDispositif                                                       ) throws Exception;
  public int  getCurrentInterventionId                (int idDispositif                                                       ) throws Exception;
  
  
  public ListRange<DispositifTicket>  getRecentDispositif                     (int idRegulation  , int index, int limit                               ) throws Exception;

}
