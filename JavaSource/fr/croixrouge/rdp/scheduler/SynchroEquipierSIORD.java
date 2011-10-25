package fr.croixrouge.rdp.scheduler;

import org.apache.log4j.Logger;

import fr.croixrouge.rdp.model.siord.SiordSynchro;
import fr.croixrouge.rdp.services.siord.SiordService;

public class SynchroEquipierSIORD
{
  private SiordService siordService = null;
  private final static int MEMBRE_SYNCHRO_STATUS_TYPE = 1;
  
  private static Logger           logger                     = Logger.getLogger(SynchroEquipierSIORD.class);
  
  public SynchroEquipierSIORD(SiordService siordService)
  {
    this.siordService  = siordService;
  }
  
  public void doSynchroEquipierSIORD()
  {
    SiordSynchro siordSynchro = null;
    
    if(logger.isDebugEnabled())
    {
      logger.debug("Equipier synchro starts");
    }
    
    try
    {
      siordSynchro = this.siordService.startNewSiordSynchro(MEMBRE_SYNCHRO_STATUS_TYPE);
    }
    catch(Exception e)
    {
      logger.error("Error while creating a new membre import session",e);
      return;
    }
    
    if(logger.isDebugEnabled())
    {
      logger.debug("Equipier synchro starts with paramaters : "+siordSynchro);
    }
    

    
    try
    { //TODO changer startNewSiordSynchro pour virer l'idSynchroSiord forcé.
      this.siordService.importDataFromSiordDatabase(siordSynchro);
    }
    catch(Exception e)
    {
      logger.error("Error while importing new membre in database on synchroSiord Session id="+siordSynchro.getIdSynchroSiord(),e);
      return;
    }
    
    if(logger.isDebugEnabled())
    {
      logger.debug("Import of new Equipiers ended");
    }
    
    
    try
    {
      this.siordService.cleanUpImportedMembreData(siordSynchro);
    }
    catch(Exception e)
    {
      logger.error("Error while cleaning data from membre on synchroSiord Session id="+siordSynchro.getIdSynchroSiord(),e);
      return;
    }
    
    try
    {
      this.siordService.processMembresImportedFromSiordDB(siordSynchro);
    }
    catch(Exception e)
    {
      logger.error("Error while processing new membre in database on synchroSiord Session id="+siordSynchro.getIdSynchroSiord(),e);
      return;
    }
    
    
    try
    {
      siordSynchro.setSucessfullImport(1);
      
      this.siordService.storeLastImportedId(siordSynchro);
    }
    catch(Exception e)
    {
      logger.error("Error while processing new membre in database on synchroSiord Session id="+siordSynchro.getIdSynchroSiord(),e);
      return;
    }
    
  }
}
