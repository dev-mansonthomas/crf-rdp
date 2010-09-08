package fr.croixrouge.rdp.services.dwr.monitor.input;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.directwebremoting.ScriptBuffer;

import fr.croixrouge.rdp.model.monitor.Dispositif;
import fr.croixrouge.rdp.model.monitor.DispositifTicket;
import fr.croixrouge.rdp.model.monitor.DispositifTypeDefinition;
import fr.croixrouge.rdp.model.monitor.Equipier;
import fr.croixrouge.rdp.model.monitor.Regulation;
import fr.croixrouge.rdp.model.monitor.dwr.FilterObject;
import fr.croixrouge.rdp.model.monitor.dwr.GridSearchFilterAndSortObject;
import fr.croixrouge.rdp.model.monitor.dwr.ListRange;
import fr.croixrouge.rdp.services.delegate.DispositifInterventionDelegate.DispositifInterventionDelegate;
import fr.croixrouge.rdp.services.dispositif.DispositifService;
import fr.croixrouge.rdp.services.dwr.DWRUtils;
import fr.croixrouge.rdp.services.equipier.EquipierService;

public class MonitorInputDispositifImpl extends DWRUtils
{
  private static Log                      logger                          = LogFactory.getLog(MonitorInputDispositifImpl.class);
  private DispositifService               dispositifService               = null;
  private DispositifInterventionDelegate  dispositifInterventionDelegate  = null;
  private EquipierService                 equipierService                 = null;
  private MonitorInputImpl                monitorInputImpl                = null;
 

  public MonitorInputDispositifImpl(DispositifService               dispositifService, 
                                    EquipierService                 equipierService  ,
                                    MonitorInputImpl                monitorInputImpl , 
                                    DispositifInterventionDelegate  dispositifInterventionDelegate)
  {
    this.monitorInputImpl               = monitorInputImpl ;
    this.dispositifService              = dispositifService;
    this.equipierService                = equipierService  ;
    this.dispositifInterventionDelegate = dispositifInterventionDelegate;

    
    if(logger.isDebugEnabled())
      logger.debug("constructor called");
  }
  
  public Map<String, List<DispositifTypeDefinition>> getDispositifTypeDefinition() throws Exception
  {
    return this.dispositifService.getDispositifTypeDefinition();
  }

  
  public ListRange<Equipier> searchEquipier(GridSearchFilterAndSortObject gridSearchFilterAndSortObject) throws Exception
  {
    this.validateSession();
    
    FilterObject filterObject = gridSearchFilterAndSortObject.getFilterObject("idRole");
    
    if(filterObject == null  || filterObject.getValue() == null || filterObject.getValue().equals(""))
      return new ListRange<Equipier>(0, new ArrayList<Equipier>());
    
    int idRole = 0;
    try
    {
      idRole = Integer.parseInt(filterObject.getValue());  
    }
    catch(NumberFormatException e)
    {
      return new ListRange<Equipier>(0, new ArrayList<Equipier>());
    }
    
    String searchString = null;
    filterObject = gridSearchFilterAndSortObject.getFilterObject("search");
    if(filterObject == null  || filterObject.getValue() == null || filterObject.getValue().equals(""))
      return new ListRange<Equipier>(0, new ArrayList<Equipier>());
    
    searchString = filterObject.getValue();
    
    try
    {
      return this.equipierService.searchEquipier(
          idRole, 
          searchString+"%",
          gridSearchFilterAndSortObject.getStart(),
          gridSearchFilterAndSortObject.getLimit()
          );      
    }
    catch(Exception e)
    {
      logger.error("Erreur sur la recherche d'équipier",e);
      throw e;
    }
  }
  
  public Dispositif createEmptyDispositif() throws Exception
  {
    Regulation regulation = this.monitorInputImpl.getRegulation();
    return dispositifService.createEmptyDispositif(regulation); 
  }
 
  public void endOfEditionEvent(int idDispositif, int idEtatDispositif, boolean isCreation) throws Exception
  {
    int    currentUserRegulationId = this.validateSessionAndGetRegulationId();
    
    if(isCreation)
      this.dispositifService.updateDispositifBooleanField (idDispositif, "creation_terminee", true);
    
    this.dispositifService.updateEtatDispositif         (idDispositif, idEtatDispositif);

    Dispositif dispositif = this.dispositifService.getDispositif(currentUserRegulationId, idDispositif, false);

    this.updateRegulationUser(new ScriptBuffer().appendCall("moDispositifCs.updateDispositif",dispositif), DWRUtils.outPageName);
  }
  /**
   * Désactive le dispositif, si pas d'inter en cours.
   * Retournue l'id de l'inter courante. Si >0 désactivation non faite.
   * */
  public int endOfVacation(int idDispositif) throws Exception 
  {
    int currentInterventionId = this.dispositifService.getCurrentInterventionId(idDispositif);
    
    if(currentInterventionId == 0)
    {
      this.dispositifService.updateActifValueOfDispositif(idDispositif, false);
      this.dispositifService.updateEtatDispositif        (idDispositif, DispositifService.STATUS_VACATION_TERMINEE);
    }
      
    List<Equipier> equipiers = this.equipierService.getEquipiersForDispositif(idDispositif);
   
    for (Equipier equipier : equipiers)
    {
      this.dispositifService.unaffectEquipierToDispositif(idDispositif            , equipier.getIdEquipier());
      this.equipierService  .setDispositifToEquipier     (equipier.getIdEquipier(), 0                       );
    }
    
    

    return currentInterventionId;
  }

  /**
   * Supprime le dispositif, si pas d'inter affectées.
   * Retournue le nombre d'inter qui ont été affectées. Si >0 suppression non faite.
   * */
  public int deleteDispositif(int idDispositif) throws Exception
  {
    int nbOfIntervention = this.dispositifService.numberOfInterventionAffectedToDispositif(idDispositif);
    
    if(nbOfIntervention == 0)
      this.dispositifService.deleteDispositif(idDispositif);
    
    return nbOfIntervention;
    
  }
  
  public int numberOfInterventionAffected(int idDispositif) throws Exception
  {
    return this.dispositifService.numberOfInterventionAffectedToDispositif(idDispositif); 
  }
  
  
  public Dispositif getDispositif(int idDispositif)throws Exception
  {
    int    currentUserRegulationId = this.validateSessionAndGetRegulationId();
    try
    {
      return this.dispositifService.getDispositif(currentUserRegulationId, idDispositif);  
    }
    catch(Exception e)
    {
      logger.error("error while getting dispositif with id='"+idDispositif+"'",e);
      throw e;
    }
    
  }
  
  public ListRange<DispositifTicket> getRecentDispositifList(int index, int limit) throws Exception
  {
    int    currentUserRegulationId = this.validateSessionAndGetRegulationId();
    return this.dispositifService.getRecentDispositif(currentUserRegulationId, index, limit);
  }
  
  public ListRange<Equipier> addEquipierToDispositif(int idDispositif, int idRoleEquipier, int idEquipier) throws Exception
  {
    this.validateSession();
    
    this.dispositifService.affectEquipierToDispositif  (idDispositif, idEquipier  , idRoleEquipier);
    this.equipierService  .setDispositifToEquipier(idEquipier  , idDispositif                );
    
    List<Equipier> listEquipier = this.equipierService.getEquipiersForDispositif(idDispositif);
    
    return new ListRange<Equipier>(listEquipier.size(), listEquipier);
  }
  
  public ListRange<Equipier> removeEquipierFromDispositif(int idDispositif, int idEquipier) throws Exception
  {
    this.validateSession();
    
    this.dispositifService.unaffectEquipierToDispositif(idDispositif, idEquipier);
    this.equipierService  .setDispositifToEquipier     (idEquipier  , 0);
    
    
    List<Equipier> listEquipier = this.equipierService.getEquipiersForDispositif(idDispositif);
    
    return new ListRange<Equipier>(listEquipier.size(), listEquipier);
  }
  
  public boolean updateGoogleCoordinates(float latitude, float longitude, int idDispositif, boolean current) throws Exception
  {
    this.validateSession();
    this.dispositifService.updateGoogleCoordinates(latitude, longitude, idDispositif, current);
    return current;
  }
  
  public void updateDispositifEtat(int idDispositif, int      newEtatDispositif) throws Exception
  {
    int idRegulation = this.validateSessionAndGetRegulationId();
    try
    {
       this.dispositifInterventionDelegate.changeDispositifStatus(idRegulation, idDispositif, newEtatDispositif);
    }
    catch(Exception e)
    {
      logger.error("", e);
    }
    catch(Throwable ee)
    {
      logger.error("", ee);
    }
    
  }
  
  public void updateEquipierInDispositif(Equipier equipier) throws Exception
  {
    logger.error("UPDATE : "+equipier.toString());
  }
  
  public void deleteEquipierInDispositif(Equipier equipier) throws Exception
  {
    logger.error("DELETE : "+equipier.toString());
  }
  
  public void updateDispositifIntegerField(int idDispositif, String fieldName, int      fieldValue) throws Exception
  {
    this.validateSession();
    try
    {
      this.dispositifService.updateDispositifIntegerField(idDispositif, fieldName, fieldValue);
    }
    catch(Exception e)
    {
      logger.error("Error while updating integer field on dispositif id='"+idDispositif+"' fieldName='"+fieldName+"' fieldValue='"+fieldValue+"'",e);
    }
  }

  public void updateDispositifFloatField  (int idDispositif, String fieldName, float    fieldValue) throws Exception
  {
    this.validateSession();
    try
    {
      this.dispositifService.updateDispositifFloatField(idDispositif, fieldName, fieldValue);
    }
    catch(Exception e)
    {
      logger.error("Error while updating float field on dispositif id='"+idDispositif+"' fieldName='"+fieldName+"' fieldValue='"+fieldValue+"'",e);
    }
  }
  
  public void updateDispositifStringField (int idDispositif, String fieldName, String   fieldValue) throws Exception
  {
    this.validateSession();
    try
    {
      this.dispositifService.updateDispositifStringField(idDispositif, fieldName, fieldValue);

    }
    catch(Exception e)
    {
      logger.error("Error while updating String field on dispositif id='"+idDispositif+"' fieldName='"+fieldName+"' fieldValue='"+fieldValue+"'",e);
    }
  }
  
  public void updateDispositifDateField   (int idDispositif, String fieldName, Date     fieldValue) throws Exception
  {
    this.validateSession();
    try
    {
      this.dispositifService.updateDispositifDateField(idDispositif, fieldName, fieldValue);
    }
    catch(Exception e)
    {
      logger.error("Error while updating date field on dispositif id='"+idDispositif+"' fieldName='"+fieldName+"' fieldValue='"+fieldValue+"'",e);
    }
  }
  public void updateDispositifBooleanField(int idDispositif, String fieldName, boolean  fieldValue) throws Exception
  {
    this.validateSession();
    try
    {
      this.dispositifService.updateDispositifBooleanField(idDispositif, fieldName, fieldValue);
    }
    catch(Exception e)
    {
      logger.error("Error while updating boolean field on dispositif id='"+idDispositif+"' fieldName='"+fieldName+"' fieldValue='"+fieldValue+"'",e);
    }
      
  }  
  
}
