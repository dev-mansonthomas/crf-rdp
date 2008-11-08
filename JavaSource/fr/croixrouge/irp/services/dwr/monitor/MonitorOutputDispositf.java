package fr.croixrouge.irp.services.dwr.monitor;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.directwebremoting.ScriptBuffer;

import fr.croixrouge.irp.model.monitor.Dispositif;
import fr.croixrouge.irp.model.monitor.Position;
import fr.croixrouge.irp.model.monitor.dwr.ListRange;
import fr.croixrouge.irp.services.delegate.DispositifInterventionDelegate.DispositifInterventionDelegate;
import fr.croixrouge.irp.services.dispositif.DispositifService;
import fr.croixrouge.irp.services.dwr.DWRUtils;

public class MonitorOutputDispositf  extends DWRUtils
{
  private static Log logger           = LogFactory.getLog(MonitorOutputDispositf.class);
  private DispositifService              dispositifService              = null;
  private DispositifInterventionDelegate dispositifInterventionDelegate = null;
  
  public MonitorOutputDispositf(DispositifService dispositifService, DispositifInterventionDelegate dispositifInterventionDelegate)
  {
    this.dispositifService              = dispositifService             ;
    this.dispositifInterventionDelegate = dispositifInterventionDelegate;
    

    if(logger.isDebugEnabled())
      logger.debug("constructor called");
  }

  public ListRange getAllDispositif() throws Exception
  {
    int  currentUserRegulationId = this.validateSessionAndGetRegulationId();
    return this.dispositifService.getAllDispositif(currentUserRegulationId);
  }
  
  
  public int actionOnDispositif(int idIntervention, int idDispositif) throws Exception
  {
    try
    {
      int currentUserRegulationId = this.validateSessionAndGetRegulationId();
      
      //Determine l'état suivant, met a jour la date de l'action courante.
      this.dispositifInterventionDelegate.action(currentUserRegulationId, idIntervention, idDispositif);
      
      //Met a jour tous les navigateurs avec le nouvel état du dispositif
      Dispositif dispositif = this.dispositifService.getDispositif(currentUserRegulationId, idDispositif, false);
      
      this.updateRegulationUser(new ScriptBuffer().appendCall("moDispositifCs.updateDispositif", dispositif), 
          outPageName);
      
      return dispositif.getIdEtatDispositif();      
    }
    catch(Exception e)
    {
      logger.error("error on actionOnDispositif",e);
      throw e;
    }
  }
  
  
  public int endOfIntervention(int idIntervention, int idDispositif) throws Exception
  {
    int currentUserRegulationId = this.validateSessionAndGetRegulationId();
    
    //Determine l'état suivant, met a jour la date de l'action courante.
    this.dispositifInterventionDelegate.endOfIntervention(currentUserRegulationId, idIntervention, idDispositif);
    
    //Met a jour tous les navigateurs avec le nouvel état du dispositif
    Dispositif dispositif = this.dispositifService.getDispositif(currentUserRegulationId, idDispositif, false);
    
    this.updateRegulationUser(new ScriptBuffer().appendCall("moDispositifCs.updateDispositif", dispositif), 
        outPageName);
    
    return dispositif.getIdEtatDispositif();
  }
  
  /**
   * Met a jour inter et dispositif
   * puis appel ActionOnDispositif
   * */
  public int chooseEvacDestination(int idDispositif, int idIntervention, int idLieu, String destinationLabel, Position position) throws Exception
  {
    int currentUserRegulationId = this.validateSessionAndGetRegulationId();
    this.dispositifInterventionDelegate.chooseEvacDestination(currentUserRegulationId, idIntervention, idDispositif, idLieu, destinationLabel, position);
    return this.actionOnDispositif(idIntervention, idDispositif);
  }
}