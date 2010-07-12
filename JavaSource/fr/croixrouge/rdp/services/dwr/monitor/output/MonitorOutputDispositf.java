package fr.croixrouge.rdp.services.dwr.monitor.output;

import java.util.Date;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.directwebremoting.ScriptBuffer;

import fr.croixrouge.rdp.model.monitor.Dispositif;
import fr.croixrouge.rdp.model.monitor.Position;
import fr.croixrouge.rdp.model.monitor.dwr.DataForCloneIntervention;
import fr.croixrouge.rdp.model.monitor.dwr.ListRange;
import fr.croixrouge.rdp.services.delegate.DispositifInterventionDelegate.DispositifInterventionDelegate;
import fr.croixrouge.rdp.services.dispositif.DispositifService;
import fr.croixrouge.rdp.services.dwr.DWRUtils;

public class MonitorOutputDispositf  extends DWRUtils
{
  private static Log logger           = LogFactory.getLog(MonitorOutputDispositf.class);
  private DispositifService              dispositifService              = null;
  private DispositifInterventionDelegate dispositifInterventionDelegate = null;

  public MonitorOutputDispositf(DispositifService              dispositifService              , 
                                DispositifInterventionDelegate dispositifInterventionDelegate )
  {
    this.dispositifService              = dispositifService             ;
    this.dispositifInterventionDelegate = dispositifInterventionDelegate;

    if(logger.isDebugEnabled())
      logger.debug("constructor called");
  }
  
  public ListRange<Dispositif> getAllDispositif() throws Exception
  {
    int  currentUserRegulationId = this.validateSessionAndGetRegulationId();
    return this.dispositifService.getAllDispositif(currentUserRegulationId);
  }
  
  
  public int actionOnDispositif(int idDispositif) throws Exception
  {
    try
    {
      int currentUserRegulationId = this.validateSessionAndGetRegulationId();
      
      //Determine l'état suivant, met a jour la date de l'action courante.
      this.dispositifInterventionDelegate.action(currentUserRegulationId, idDispositif);
      
      //Met a jour tous les navigateurs avec le nouvel état du dispositif
      Dispositif dispositif = this.dispositifService.getDispositif(currentUserRegulationId, idDispositif, false);
      
      ScriptBuffer scriptBuffer = new ScriptBuffer();
      scriptBuffer = scriptBuffer.appendCall("moDispositifCs.updateDispositif", dispositif);
      
      this.updateRegulationUser(scriptBuffer, DWRUtils.outPageName);
      
      return dispositif.getIdEtatDispositif();      
    }
    catch(Exception e)
    {
      logger.error("error on actionOnDispositif",e);
      throw e;
    }
  }
  
  public void addInterventionToDispositif(int idIntervention, int idDispositif) throws Exception
  {
    int currentUserRegulationId = this.validateSessionAndGetRegulationId();
    
    this.dispositifInterventionDelegate.affectInterventionToDispositif(currentUserRegulationId, idIntervention, idDispositif, new Date());


    //Met a jour tous les navigateurs avec le nouvel état du dispositif
    Dispositif dispositif = this.dispositifService.getDispositif(currentUserRegulationId, idDispositif, false);
    
    ScriptBuffer scriptBuffer = new ScriptBuffer();
    scriptBuffer = scriptBuffer.appendCall("moDispositifCs.updateDispositifAndRemoveAffectedIntervention", dispositif, idIntervention);
    
    this.updateRegulationUser(scriptBuffer, DWRUtils.outPageName);
  }
  
  
  public void reAffectInterventionToDispositif(int idIntervention,int idDispositifOrigine, int idDispositifCible) throws Exception
  {
    int currentUserRegulationId = this.validateSessionAndGetRegulationId();
    
    this.dispositifInterventionDelegate.reAffectInterventionToDispositif(currentUserRegulationId, idIntervention , idDispositifOrigine, idDispositifCible, new Date());
  


    //Met a jour tous les navigateurs avec le nouvel état du dispositif
    Dispositif dispositifOrigine = this.dispositifService.getDispositif(currentUserRegulationId, idDispositifOrigine, false);
    Dispositif dispositifCible   = this.dispositifService.getDispositif(currentUserRegulationId, idDispositifCible  , false);
    
    ScriptBuffer scriptBuffer = new ScriptBuffer();
    scriptBuffer = scriptBuffer.appendCall("moDispositifCs.updateDispositifAfterReaffectation", dispositifOrigine, dispositifCible);
    
    this.updateRegulationUser(scriptBuffer, DWRUtils.outPageName);
  }
  
  public int endOfIntervention(int idDispositif) throws Exception
  {
    int currentUserRegulationId = this.validateSessionAndGetRegulationId();
    
    //Determine l'état suivant, met a jour la date de l'action courante.
    this.dispositifInterventionDelegate.endOfIntervention(currentUserRegulationId, idDispositif);
    
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
  public int chooseEvacDestination(int idDispositif, int idLieu, String destinationLabel, Position position) throws Exception
  {
    int currentUserRegulationId = this.validateSessionAndGetRegulationId();
    this.dispositifInterventionDelegate.chooseEvacDestination(currentUserRegulationId, idDispositif, idLieu, destinationLabel, position);
    return this.actionOnDispositif(idDispositif);
  }
  
  public void cloneIntervention(DataForCloneIntervention dataForCloneIntervention) throws Exception
  {
    int currentUserRegulationId = this.validateSessionAndGetRegulationId();
    this.dispositifInterventionDelegate.cloneIntervention(currentUserRegulationId, dataForCloneIntervention);
  }

  public void primaireOnOneIntervention(int idDispositif, int idIntervention) throws Exception
  {
    this.dispositifInterventionDelegate.handlePrimaireAndSecondaireOnIntervention(idDispositif, idIntervention, true);
  }
  
  public void secondaireOnOneIntervention(int idDispositif, int idIntervention) throws Exception
  {
    this.dispositifInterventionDelegate.handlePrimaireAndSecondaireOnIntervention(idDispositif, idIntervention, false);
  }

}