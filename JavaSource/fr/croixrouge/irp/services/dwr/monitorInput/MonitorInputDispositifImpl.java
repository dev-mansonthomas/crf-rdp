package fr.croixrouge.irp.services.dwr.monitorInput;

import java.util.Date;
import java.util.Hashtable;
import java.util.List;

import org.directwebremoting.ScriptBuffer;

import fr.croixrouge.irp.model.monitor.Dispositif;
import fr.croixrouge.irp.model.monitor.Equipier;
import fr.croixrouge.irp.model.monitor.Regulation;
import fr.croixrouge.irp.model.monitor.dwr.ListRange;
import fr.croixrouge.irp.services.dispositif.DispositifService;
import fr.croixrouge.irp.services.dwr.DWRUtils;
import fr.croixrouge.irp.services.equipier.EquipierService;

public class MonitorInputDispositifImpl extends DWRUtils
{
  private DispositifService        dispositifService  = null;
  private EquipierService          equipierService    = null;
  private MonitorInputImpl         monitorInputImpl   = null;
  
  private Hashtable<String, int[]> bsppSamuEquiperMap = new Hashtable<String, int[]>();

  public MonitorInputDispositifImpl(DispositifService dispositifService, 
                                    EquipierService   equipierService  ,
                                    MonitorInputImpl  monitorInputImpl)
  {
    System.err.println("New MonitorInputDispositif");
    
    this.monitorInputImpl  = monitorInputImpl;
    this.dispositifService = dispositifService;
    this.equipierService   = equipierService;

    bsppSamuEquiperMap.put("1", new int[] { 1 });
    bsppSamuEquiperMap.put("2", new int[] { 3 });
    bsppSamuEquiperMap.put("3", new int[] { 4, 2 });
    bsppSamuEquiperMap.put("4", new int[] { 4 });
    bsppSamuEquiperMap.put("5", new int[] { 4, 5 });
  }
  
  
  public Hashtable<String, Hashtable<String, int[]>> getMappingPossibilities()
  {
    Hashtable<String, Hashtable<String, int[]>> hash = new Hashtable<String, Hashtable<String, int[]>>();
    
    hash.put("1", bsppSamuEquiperMap);
    hash.put("2", bsppSamuEquiperMap);
    
    return hash;
    
  }
  public List<Equipier> getEquipierByNivol(int type, int equipierType, String numNivol) throws Exception
  {
    if(numNivol.length()<3)
      return null;
    this.validateSession();
    
    return this.equipierService.getEquipiersByNivol(numNivol, equipierType);
  }

  public List<Equipier> getEquipierByNom(int type, int equipierType, String nom) throws Exception
  {
    if(nom.length()<3)
      return null;
    this.validateSession();

    return this.equipierService.getEquipiersByNom(nom, equipierType);
  }
  
  public Dispositif createEmptyDispositif() throws Exception
  {
    Regulation regulation = this.monitorInputImpl.getRegulation();
    return dispositifService.createEmptyDispositif(regulation); 
  }
 
  public void endOfEditionEvent(int idDispositif, int idEtatDispositif) throws Exception
  {
    int    currentUserRegulationId = this.validateSessionAndGetRegulationId();
    
    this.dispositifService.updateDispositifBooleanField(idDispositif, "creation_terminee", true);
    this.dispositifService.updateEtatDispositif(idDispositif, idEtatDispositif);

    Dispositif dispositif = this.dispositifService.getDispositif(currentUserRegulationId, idDispositif);
    
    
    ScriptBuffer script = new ScriptBuffer();
    script.appendScript("moDispositifCs.updateDispositif(")
                        .appendData(dispositif)
                        .appendScript(");");
    
    updateRegulationUser(script, outPageName);
    
  }
  
  
  public Dispositif getDispositif(int idDispositif)throws Exception
  {
    int    currentUserRegulationId = this.validateSessionAndGetRegulationId();
    
    return this.dispositifService.getDispositif(currentUserRegulationId, idDispositif);
  }
  
  public ListRange getDispositifTicketList(boolean creationTerminee, int index, int limit) throws Exception
  {
    int    currentUserRegulationId = this.validateSessionAndGetRegulationId();
    return this.dispositifService.getDispositifTicketWithStatus(currentUserRegulationId, creationTerminee, index, limit);
  }
  
  
  public List<Equipier> addEquipierToDispositif(int idDispositif, int equipierRank, int equipierRole, int equipierId) throws Exception
  {
    int    currentUserRegulationId = this.validateSessionAndGetRegulationId();
    
    this.dispositifService.updateDispositifIntegerField (idDispositif, "equipier_"+equipierRank+"_id"  , equipierId  );
    this.dispositifService.updateDispositifIntegerField (idDispositif, "equipier_"+equipierRank+"_role", equipierRole);
    this.equipierService.setDispositifToEquipier        (equipierId  , idDispositif                    , equipierRole);
    
    return this.equipierService.getEquipiersForDispositif(currentUserRegulationId, idDispositif);
  }
  
  public List<Equipier> removeEquipierFromDispositif(int idDispositif, int equipierRank, int equipierId) throws Exception
  {
    int    currentUserRegulationId = this.validateSessionAndGetRegulationId();
    
    this.dispositifService.updateDispositifIntegerField (idDispositif, "equipier_"+equipierRank+"_id"  , 0);
    this.dispositifService.updateDispositifIntegerField (idDispositif, "equipier_"+equipierRank+"_role", 0);
    this.equipierService  .setDispositifToEquipier      (equipierId  , 0, 0);
    
    return this.equipierService.getEquipiersForDispositif(currentUserRegulationId, idDispositif);
  }
  
  public void updateGoogleCoordinates(float latitude, float longitude, int idDispositif) throws Exception
  {
    this.validateSession();
    this.dispositifService.updateGoogleCoordinates(latitude, longitude, idDispositif);
  }
  
  public void updateDispositifIntegerField(int idDispositif, String fieldName, int      fieldValue) throws Exception
  {
    this.validateSession();
    this.dispositifService.updateDispositifIntegerField(idDispositif, fieldName, fieldValue);
  }

  public void updateDispositifFloatField  (int idDispositif, String fieldName, float    fieldValue) throws Exception
  {
    this.validateSession();
    this.dispositifService.updateDispositifFloatField(idDispositif, fieldName, fieldValue);
  }
  
  public void updateDispositifStringField (int idDispositif, String fieldName, String   fieldValue) throws Exception
  {
    this.validateSession();
    this.dispositifService.updateDispositifStringField(idDispositif, fieldName, fieldValue);
  }
  
  public void updateDispositifDateField   (int idDispositif, String fieldName, Date     fieldValue) throws Exception
  {
    this.validateSession();
    this.dispositifService.updateDispositifDateField(idDispositif, fieldName, fieldValue);
  }
  public void updateDispositifBooleanField(int idDispositif, String fieldName, boolean  fieldValue) throws Exception
  {
    this.validateSession();
    this.dispositifService.updateDispositifBooleanField(idDispositif, fieldName, fieldValue);
  }  
  
}
