package fr.croixrouge.irp.services.dispositif;

import java.util.Date;
import java.util.List;

import fr.croixrouge.irp.model.monitor.Dispositif;
import fr.croixrouge.irp.model.monitor.DispositifTicket;
import fr.croixrouge.irp.model.monitor.Equipier;
import fr.croixrouge.irp.model.monitor.Position;
import fr.croixrouge.irp.model.monitor.Regulation;
import fr.croixrouge.irp.model.monitor.dwr.ListRange;

public interface DispositifService
{ 
  public ListRange        getAllDispositif        (int regulationId                                                       ) throws Exception;
  public Dispositif       getDispositif           (int idRegulation       , int disposifitId                              ) throws Exception;
  public Dispositif       getDispositif           (int idRegulation       , int disposifitId    , boolean withEquipierList) throws Exception;
  public DispositifTicket getDispositifTicket     (int idDispositif                                                       ) throws Exception;
  public Dispositif       createEmptyDispositif   (Regulation regulation                                                  ) throws Exception;
  public void             updateEtatDispositif    (int idDispositif       , int idEtatDispositif                          ) throws Exception;
  public void             actionEndOfIntervention (int idDispositif) throws Exception;
  
  public List<Equipier> getEquipierIdAndRoleOfDispositif(int idRegulation, int idDispositif) throws Exception;
  public int            getIdTypeDispositif             (int idRegulation, int idDispositif) throws Exception;
  
  public void updateGoogleCoordinates     (float latitude  , float  longitude, int      idDispositif, boolean current) throws Exception;
  public void updateDispositifIntegerField(int idDispositif, String fieldName, int      fieldValue  ) throws Exception;
  public void updateDispositifFloatField  (int idDispositif, String fieldName, float    fieldValue  ) throws Exception;
  public void updateDispositifStringField (int idDispositif, String fieldName, String   fieldValue  ) throws Exception;
  public void updateDispositifDateField   (int idDispositif, String fieldName, Date     fieldValue  ) throws Exception;
  public void updateDispositifBooleanField(int idDispositif, String fieldName, boolean  fieldValue  ) throws Exception;
  
  public void       updateDispositifSetIntervention         (int idDispositif  , int idIntervention                                 ) throws Exception;
  public void       affectInterventionToDispositif          (int idIntervention, int idDispositif        , Date dateAffectation     ) throws Exception;
  public void       actionOnDispositif                      (int idDispositif  , int newIdEtat           , Date actionDate          ) throws Exception;
  public void       updateDispositifPosition                (int idDispositif  , Position currentPosition, Position previousPosition) throws Exception;
  public ListRange  getActiveDispositif                     (int idRegulation  , int index, int limit     ) throws Exception;
  
  public void       updateActifValueOfDispositif            (int idDispositif, boolean actif                                        ) throws Exception;
  public void       deleteDispositif                        (int idDispositif                                                       ) throws Exception;
  public int        numberOfInterventionAffectedToDispositif(int idDispositif                                                       ) throws Exception;
  public int        getCurrentInterventionId                (int idDispositif                                                       ) throws Exception;


}
