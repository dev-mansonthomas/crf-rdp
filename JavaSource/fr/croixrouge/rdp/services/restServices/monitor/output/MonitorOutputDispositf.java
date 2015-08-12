package fr.croixrouge.rdp.services.restServices.monitor.output;

import fr.croixrouge.rdp.model.monitor.Dispositif;
import fr.croixrouge.rdp.model.monitor.Position;
import fr.croixrouge.rdp.model.monitor.Regulation;
import fr.croixrouge.rdp.model.monitor.dwr.DataForCloneIntervention;
import fr.croixrouge.rdp.model.monitor.dwr.ListRange;
import fr.croixrouge.rdp.services.delegate.DispositifInterventionDelegate.DispositifInterventionDelegate;
import fr.croixrouge.rdp.services.dispositif.DispositifService;
import fr.croixrouge.rdp.services.restServices.RestUtility;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import javax.inject.Inject;
import javax.servlet.http.HttpSession;
import java.util.Date;

public class MonitorOutputDispositf
{
  private static Log logger           = LogFactory.getLog(MonitorOutputDispositf.class);
  private DispositifService              dispositifService              = null;
  private DispositifInterventionDelegate dispositifInterventionDelegate = null;

  @Inject
  private HttpSession session;

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
    int regulationId = RestUtility.getRegulationId(this.session);
    return this.dispositifService.getAllDispositif(regulationId);
  }
  

  
  public String actionOnDispositif(int idDispositif) throws Exception
  {
    int regulationId = RestUtility.getRegulationId(this.session);
    String status = null;
    try
    {
      //Determine l'état suivant, met a jour la date de l'action courante.
      status = this.dispositifInterventionDelegate.action(regulationId, idDispositif);
      
      //Met a jour tous les navigateurs avec le nouvel état du dispositif
      Dispositif dispositif = this.dispositifService.getDispositif(regulationId, idDispositif, false);

      //TODO Websocket replace dwr code
      /*ScriptBuffer scriptBuffer = new ScriptBuffer();
      scriptBuffer = scriptBuffer.appendCall("moDispositifCs.updateDispositif", dispositif);
      
      this.updateRegulationUser(scriptBuffer, DWRUtils.outPageName);*/
      
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
      int regulationId            = RestUtility.getRegulationId(this.session);
      int currentUserEquipierId   = RestUtility.getUser(this.session).getIdEquipier();
      
      this.dispositifInterventionDelegate.affectInterventionToDispositif(currentUserEquipierId, regulationId, idIntervention, idDispositif, new Date());


      //Met a jour tous les navigateurs avec le nouvel état du dispositif
      Dispositif dispositif = this.dispositifService.getDispositif(regulationId, idDispositif, false);



      //TODO Websocket replace dwr code
     /* ScriptBuffer scriptBuffer = new ScriptBuffer();
      scriptBuffer = scriptBuffer.appendCall("moDispositifCs.updateDispositifAndRemoveAffectedIntervention", dispositif, idIntervention);
      
      this.updateRegulationUser(scriptBuffer, DWRUtils.outPageName);*/
    }
    catch(Exception e)
    {
      logger.error("error on addInterventionToDispositif("+idIntervention+","+idDispositif+")",e);
      throw e;
    }
  }
  
  
  public void reAffectInterventionToDispositif(int idIntervention,int idDispositifOrigine, int idDispositifCible) throws Exception
  {
    int regulationId            = RestUtility.getRegulationId(this.session);
    
    this.dispositifInterventionDelegate.reAffectInterventionToDispositif(regulationId, idIntervention , idDispositifOrigine, idDispositifCible, new Date());

    //Met a jour tous les navigateurs avec le nouvel état du dispositif
    Dispositif dispositifOrigine = this.dispositifService.getDispositif(regulationId, idDispositifOrigine, false);
    Dispositif dispositifCible   = this.dispositifService.getDispositif(regulationId, idDispositifCible  , false);

    //TODO Websocket replace dwr code
    /*ScriptBuffer scriptBuffer = new ScriptBuffer();
    scriptBuffer = scriptBuffer.appendCall("moDispositifCs.updateDispositifAfterReaffectation", dispositifOrigine, dispositifCible);
    
    this.updateRegulationUser(scriptBuffer, DWRUtils.outPageName);*/
  }
  
  public String endOfIntervention(int idDispositif) throws Exception
  {
    int regulationId = RestUtility.getRegulationId(this.session);
    try
    {
      //Determine l'état suivant, met a jour la date de l'action courante.
      String status         = this.dispositifInterventionDelegate.endOfIntervention(regulationId, idDispositif);
      
      //Met a jour tous les navigateurs avec le nouvel état du dispositif
      Dispositif dispositif = this.dispositifService.getDispositif(regulationId, idDispositif, false);

      //TODO Websocket replace dwr code
      /*this.updateRegulationUser(new ScriptBuffer().appendCall("moDispositifCs.updateDispositif", dispositif),
          outPageName);*/
      
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
    int regulationId = RestUtility.getRegulationId(this.session);
    this.dispositifInterventionDelegate.chooseEvacDestination(regulationId, idDispositif, idLieu, destinationLabel, position);
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
    int regulationId = RestUtility.getRegulationId(this.session);
    this.dispositifInterventionDelegate.laisseSurPlace(regulationId, idDispositif, decede, decharge, dcdADispoDe);
    return this.endOfIntervention(idDispositif);
  }

  
  
  public void cloneIntervention(DataForCloneIntervention dataForCloneIntervention) throws Exception
  {
    int regulationId = RestUtility.getRegulationId(this.session);
    this.dispositifInterventionDelegate.cloneIntervention(regulationId, dataForCloneIntervention);
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
    int regulationId = RestUtility.getRegulationId(this.session);
    
    this.dispositifInterventionDelegate.changeDispositifStatus(regulationId, idDispositif, idNewEtat);
    
    Dispositif dispositif = this.dispositifService.getDispositif(regulationId, idDispositif);

//TODO Websocket replace dwr code
   /* ScriptBuffer scriptBuffer = new ScriptBuffer();
    scriptBuffer = scriptBuffer.appendCall("moDispositifCs.updateDispositif", dispositif);
    
    this.updateRegulationUser(scriptBuffer, DWRUtils.outPageName);*/
  }
  
}
