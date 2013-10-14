package fr.croixrouge.rdp.services.dwr.monitor.output;

import java.util.Date;

import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.directwebremoting.ScriptBuffer;

import fr.croixrouge.rdp.model.monitor.Dispositif;
import fr.croixrouge.rdp.model.monitor.Position;
import fr.croixrouge.rdp.model.monitor.Regulation;
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
  

  
  public String actionOnDispositif(int idDispositif) throws Exception
  {
    int currentUserRegulationId = this.validateSessionAndGetRegulationId();
    String status = null;
    try
    {
      //Determine l'état suivant, met a jour la date de l'action courante.
      status = this.dispositifInterventionDelegate.action(currentUserRegulationId, idDispositif);
      
      //Met a jour tous les navigateurs avec le nouvel état du dispositif
      Dispositif dispositif = this.dispositifService.getDispositif(currentUserRegulationId, idDispositif, false);
      
      ScriptBuffer scriptBuffer = new ScriptBuffer();
      scriptBuffer = scriptBuffer.appendCall("moDispositifCs.updateDispositif", dispositif);
      
      this.updateRegulationUser(scriptBuffer, DWRUtils.outPageName);
      
      return status;      
    }
    catch(Exception e)
    {
      logger.error("error on actionOnDispositif("+idDispositif+")",e);
      return "var actionReturnStatus={status:-1,message:'"+e.getMessage().replaceAll("'", "\\'")+"'};";
    }
  }
  
  public void addInterventionToDispositif(int idIntervention, int idDispositif) throws Exception
  {
    try
    {
      HttpSession session         = this.validateSession();
      Regulation  regulation      = (Regulation)session.getAttribute("regulation");
      int regulationId            = regulation.getRegulationId();
      int currentUserEquipierId           = this.getCurrentUserEquipierId();
      
      this.dispositifInterventionDelegate.affectInterventionToDispositif(currentUserEquipierId, regulationId, idIntervention, idDispositif, new Date());


      //Met a jour tous les navigateurs avec le nouvel état du dispositif
      Dispositif dispositif = this.dispositifService.getDispositif(regulationId, idDispositif, false);
      
      ScriptBuffer scriptBuffer = new ScriptBuffer();
      scriptBuffer = scriptBuffer.appendCall("moDispositifCs.updateDispositifAndRemoveAffectedIntervention", dispositif, idIntervention);
      
      this.updateRegulationUser(scriptBuffer, DWRUtils.outPageName);   
    }
    catch(Exception e)
    {
      logger.error("error on addInterventionToDispositif("+idIntervention+","+idDispositif+")",e);
      throw e;
    }
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
  
  public String endOfIntervention(int idDispositif) throws Exception
  {
    int currentUserRegulationId = this.validateSessionAndGetRegulationId();
    try
    {
      //Determine l'état suivant, met a jour la date de l'action courante.
      String status = this.dispositifInterventionDelegate.endOfIntervention(currentUserRegulationId, idDispositif);
      
      //Met a jour tous les navigateurs avec le nouvel état du dispositif
      Dispositif dispositif = this.dispositifService.getDispositif(currentUserRegulationId, idDispositif, false);
      
      this.updateRegulationUser(new ScriptBuffer().appendCall("moDispositifCs.updateDispositif", dispositif), 
          outPageName);
      
      return status;
    }
    catch(Exception e)
    {
      logger.error("error on endOfIntervention",e);
      return "var actionReturnStatus={status:-1,message:'"+e.getMessage().replaceAll("'", "\\'")+"'};";
    }
  }
  
  /**
   * Choix de l'hopital d'évac
   * Met a jour inter et dispositif
   * puis appel ActionOnDispositif
   * */
  public String chooseEvacDestination(int idDispositif, int idLieu, String destinationLabel, Position position) throws Exception
  {
    int currentUserRegulationId = this.validateSessionAndGetRegulationId();
    this.dispositifInterventionDelegate.chooseEvacDestination(currentUserRegulationId, idDispositif, idLieu, destinationLabel, position);
    return this.actionOnDispositif(idDispositif);
  }
  /**
   * Choix de l'hopital d'évac ==> cas d'un laissé sur place
   * Met a jour inter et dispositif
   * puis appel ActionOnDispositif
   * 
   * (idDispositif, decede, decharge, dcdADispoDe
   * */
  
  public String laisseSurPlace(int idDispositif, boolean decede, boolean decharge, String dcdADispoDe) throws Exception
  {
    int currentUserRegulationId = this.validateSessionAndGetRegulationId();
    this.dispositifInterventionDelegate.laisseSurPlace(currentUserRegulationId, idDispositif, decede, decharge, dcdADispoDe);
    return this.endOfIntervention(idDispositif);
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

  public void updateEtatDispositif(int idDispositif, int idNewEtat) throws Exception
  {
    int currentUserRegulationId = this.validateSessionAndGetRegulationId();
    
    this.dispositifInterventionDelegate.changeDispositifStatus(currentUserRegulationId, idDispositif, idNewEtat);
    
    Dispositif dispositif = this.dispositifService.getDispositif(currentUserRegulationId, idDispositif);
    
    ScriptBuffer scriptBuffer = new ScriptBuffer();
    scriptBuffer = scriptBuffer.appendCall("moDispositifCs.updateDispositif", dispositif);
    
    this.updateRegulationUser(scriptBuffer, DWRUtils.outPageName);
  }
  
}