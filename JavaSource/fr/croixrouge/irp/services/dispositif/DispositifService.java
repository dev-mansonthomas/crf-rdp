package fr.croixrouge.irp.services.dispositif;

import java.util.Date;
import java.util.List;

import fr.croixrouge.irp.model.monitor.Dispositif;
import fr.croixrouge.irp.model.monitor.Regulation;
import fr.croixrouge.irp.model.monitor.dwr.ListRange;

public interface DispositifService
{
  public List <Dispositif>    getAllDispositif      (int regulationId     );
  public Dispositif           getDispositif         (int disposifitId     );
  public void                 updateEtatDispositif  (int idDispositif, int idEtatDispositif);
  public void                 createDispositif      (Dispositif dispositif);

  public ListRange getDispositifTicketWithStatus(int idRegulation, boolean creationTerminee, int index, int limit) throws Exception;
  
  public void updateGoogleCoordinates     (float latitude, float longitude, int idDispositif      ) throws Exception;
  public void updateDispositifIntegerField(int idDispositif, String fieldName, int      fieldValue) throws Exception;
  public void updateDispositifFloatField  (int idDispositif, String fieldName, float    fieldValue) throws Exception;
  public void updateDispositifStringField (int idDispositif, String fieldName, String   fieldValue) throws Exception;
  public void updateDispositifDateField   (int idDispositif, String fieldName, Date     fieldValue) throws Exception;
  public void updateDispositifBooleanField(int idDispositif, String fieldName, boolean  fieldValue) throws Exception;
  
  public void updateDispositifSetIntervention(int idDispositif, int idIntervention);
  
  public Dispositif           createEmptyDispositif (Regulation regulation);

}
