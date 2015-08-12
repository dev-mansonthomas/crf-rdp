package fr.croixrouge.rdp.services.restServices.monitor.input;

import fr.croixrouge.rdp.model.monitor.*;
import fr.croixrouge.rdp.model.monitor.dwr.GridSearchFilterAndSortObject;
import fr.croixrouge.rdp.model.monitor.dwr.ListRange;
import fr.croixrouge.rdp.services.delegate.DispositifInterventionDelegate.DispositifInterventionDelegate;
import fr.croixrouge.rdp.services.dispositif.DispositifService;
import fr.croixrouge.rdp.services.equipier.EquipierService;
import fr.croixrouge.rdp.services.intervention.InterventionService;
import fr.croixrouge.rdp.services.restServices.RestUtility;
import fr.croixrouge.rdp.services.vehicule.VehiculeService;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import javax.inject.Inject;
import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.List;
import java.util.Map;

public class MonitorInputDispositifImpl
{
  private static Log                            logger                         = LogFactory.getLog(MonitorInputDispositifImpl.class);
  private        DispositifService              dispositifService              = null;
  private        DispositifInterventionDelegate dispositifInterventionDelegate = null;
  private        EquipierService                equipierService                = null;
  private        MonitorInputImpl               monitorInputImpl               = null;
  private        InterventionService            interventionService            = null;
  private        VehiculeService                vehiculeService                = null;

  @Inject
  private HttpSession session;

  public MonitorInputDispositifImpl(DispositifService dispositifService,
                                    EquipierService equipierService,
                                    MonitorInputImpl monitorInputImpl,
                                    DispositifInterventionDelegate dispositifInterventionDelegate,
                                    InterventionService interventionService,
                                    VehiculeService vehiculeService)
  {
    this.monitorInputImpl = monitorInputImpl;
    this.dispositifService = dispositifService;
    this.equipierService = equipierService;
    this.dispositifInterventionDelegate = dispositifInterventionDelegate;
    this.interventionService            = interventionService           ;             
    this.vehiculeService                = vehiculeService               ;                 

    
    if(logger.isDebugEnabled())
      logger.debug("constructor called");
  }
  
  public Map<String, List<DispositifTypeDefinition>> getDispositifTypeDefinition() throws Exception
  {
    return this.dispositifService.getDispositifTypeDefinition();
  }
  
  public List<Vehicule> getVehicules(int vehiculeType, int idDispositif) throws Exception
  {
    
    return this.vehiculeService.getVehiculeList(vehiculeType, true, idDispositif);
  }


  public void updateVehiculeAssociation(int idDispositif, int idVehicule) throws Exception
  {
    
    DispositifSummaryInformation dsi = this.dispositifService.getDispositifSummaryInformation(idDispositif);
    int currentVehiculeId = dsi.getIdVehicule();
    this.vehiculeService.affectVehiculeToDispositif(currentVehiculeId, 0);
    this.updateDispositifIntegerField(idDispositif, "id_vehicule", idVehicule);
    this.vehiculeService.affectVehiculeToDispositif(idVehicule, idDispositif);
  }

  /**
   * 
   * searchType : 0 : Recherche d'équipier sans restriction
   *              1 : Recherche d'équipier pour un dispositif (ne doit pas être déjà affecté a un dispositif et on fitre sur un role, pas en évaluation sur le role selectionné) 
   * */
  public ListRange<Equipier> searchEquipier(int searchType, GridSearchFilterAndSortObject gridSearchFilterAndSortObject) throws Exception
  {
    
    
    try
    {
      return this.equipierService.searchEquipierWithRole(searchType, gridSearchFilterAndSortObject);      
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
    int regulationId = RestUtility.getRegulationId(this.session);
    
    if(isCreation)
      this.dispositifService.updateDispositifBooleanField (idDispositif, "creation_terminee", true);
    
    this.dispositifService.updateEtatDispositif         (idDispositif, idEtatDispositif);

    Dispositif dispositif = this.dispositifService.getDispositif(regulationId, idDispositif, false);
    //TODO Websocket replace dwr code
   /* this.updateRegulationUser(new ScriptBuffer().appendCall("moDispositifCs.updateDispositif",dispositif), DWRUtils.outPageName);
*/  }
  /**
   * Désactive le dispositif, si pas d'inter en cours.
   * Retournue l'id de l'inter courante. Si >0 désactivation non faite.
   * */
  public int endOfVacation(int idDispositif) throws Exception 
  {
    
    int numberOfInterventionAffectedToDispositif = this.dispositifService.numberOfInterventionAffectedToDispositif(idDispositif);
    
    if(numberOfInterventionAffectedToDispositif == 0)
    {
      this.dispositifService.updateActifValueOfDispositif(idDispositif, false);
      this.dispositifService.updateEtatDispositif        (idDispositif, DispositifService.STATUS_VACATION_TERMINEE);
      
      int idVehicule = this.dispositifService.getIdVehiculeOfDispositif(idDispositif) ;
      
      this.vehiculeService.unAffectVehiculeToDispositif(idVehicule);
      
      List<Equipier> equipiers = this.equipierService.getEquipiersForDispositif(idDispositif);
      
      for (Equipier equipier : equipiers)
      {
        this.dispositifService.unaffectEquipierToDispositif(idDispositif            , equipier.getIdEquipier());
        this.equipierService  .setDispositifToEquipier     (equipier.getIdEquipier(), 0                       );
      }

      //TODO Websocket replace dwr code
      /*this.updateRegulationUser(new ScriptBuffer().appendCall("moDispositifCs.reload()"), outPageName);*/
    }
    
    

    return numberOfInterventionAffectedToDispositif;

  }

  /**
   * Supprime le dispositif, si pas d'inter affectées.
   * Retournue le nombre d'inter qui ont été affectées. Si >0 suppression non faite.
   * */
  public int deleteDispositif(int idDispositif) throws Exception
  {
    
    int nbOfIntervention = this.dispositifService.numberOfInterventionAffectedToDispositif(idDispositif);
    
    if(nbOfIntervention == 0)
    {
      if(logger.isInfoEnabled())
      {
        logger.info("Dispositif id='"+idDispositif+"' has never been affected any intervention ==> OK to delete");
      }
      
      this.equipierService.deleteEquipiersInfoForDispositifToBeDeleted(idDispositif);
      this.dispositifService.deleteDispositif(idDispositif);
    }
      
    
    return nbOfIntervention;
    
  }
  
  public int numberOfInterventionAffected(int idDispositif) throws Exception
  {
    
    return this.dispositifService.numberOfInterventionAffectedToDispositif(idDispositif); 
  }
  
  
  public List<InterventionTicket> getInterventionTicketFromDispositif(int idDispositif) throws Exception
  {
    
    return interventionService.getInterventionsTicketFromDispositif(idDispositif);
  }
  
 
  
  
  
  public Dispositif getDispositif(int idDispositif)throws Exception
  {
    int regulationId = RestUtility.getRegulationId(this.session);
    try
    {
      return this.dispositifService.getDispositif(regulationId, idDispositif);
    }
    catch(Exception e)
    {
      logger.error("error while getting dispositif with id='"+idDispositif+"'",e);
      throw e;
    }
    
  }
  
  public ListRange<DispositifTicket> getRecentDispositifList(int index, int limit) throws Exception
  {
    int regulationId = RestUtility.getRegulationId(this.session);
    return this.dispositifService.getRecentDispositif(regulationId, index, limit);
  }
  
  public ListRange<Equipier> addEquipierToDispositif(int idDispositif, int idRoleEquipier, int idEquipier) throws Exception
  {
    
    
    this.dispositifService.affectEquipierToDispositif  (idDispositif, idEquipier  , idRoleEquipier);
    this.equipierService  .setDispositifToEquipier(idEquipier  , idDispositif                );
    
    List<Equipier> listEquipier = this.equipierService.getEquipiersForDispositif(idDispositif);
    
    return new ListRange<>(listEquipier.size(), listEquipier);
  }
  
  public ListRange<Equipier> removeEquipierFromDispositif(int idDispositif, int idEquipier) throws Exception
  {
    
    
    this.dispositifService.unaffectEquipierToDispositif(idDispositif, idEquipier);
    this.equipierService  .setDispositifToEquipier     (idEquipier  , 0);
    
    
    List<Equipier> listEquipier = this.equipierService.getEquipiersForDispositif(idDispositif);
    
    return new ListRange<>(listEquipier.size(), listEquipier);
  }
  
  public ListRange<Equipier> getEquipiersFromDispositif(int idDispositif) throws Exception
  {
    
    List<Equipier> listEquipier = this.equipierService.getEquipiersForDispositif(idDispositif);
    return new ListRange<>(listEquipier.size(), listEquipier);
  }
  
  public boolean updateGoogleCoordinates(float latitude, float longitude, int idDispositif, boolean current) throws Exception
  {
    
    this.dispositifService.updateGoogleCoordinates(latitude, longitude, idDispositif, current);
    return current;
  }
  
  public void updateDispositifEtat(int idDispositif, int      newEtatDispositif) throws Exception
  {
    int regulationId = RestUtility.getRegulationId(this.session);
    try
    {
       this.dispositifInterventionDelegate.changeDispositifStatus(regulationId, idDispositif, newEtatDispositif);
    }
    catch(Exception e)
    {
      logger.error("erreur lors de updateDispositifEtat sur idDispositif='"+idDispositif+"' newEtatDispositif='"+newEtatDispositif+"'", e);
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
