package fr.croixrouge.rdp.services.restServices.monitor.output;

import fr.croixrouge.rdp.model.monitor.Dispositif;
import fr.croixrouge.rdp.model.monitor.Intervention;
import fr.croixrouge.rdp.model.monitor.InterventionTicket;
import fr.croixrouge.rdp.services.dispositif.DispositifService;
import fr.croixrouge.rdp.services.intervention.InterventionService;
import fr.croixrouge.rdp.services.restServices.RestUtility;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import javax.inject.Inject;
import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.List;

public class MonitorOutputIntervention
{
  private        InterventionService interventionService = null;
  private        DispositifService   dispositifService   = null;
  private static Log                 logger              = LogFactory.getLog(MonitorOutputIntervention.class);

  @Inject
  private HttpSession session;

  public MonitorOutputIntervention(InterventionService interventionService,
                                   DispositifService dispositifService)
  {
    this.interventionService = interventionService;
    this.dispositifService = dispositifService;
    if (logger.isDebugEnabled())
      logger.debug("constructor called");
  }

  public List<InterventionTicket> loadAllIntervention() throws Exception
  {
    int regulationId = RestUtility.getRegulationId(this.session);
    return this.interventionService.getAllInterventionTicketWithStatus(regulationId, 1);
  }

  public void unAffectIntervention(int idIntervention, int idDispositif) throws Exception
  {
    int regulationId = RestUtility.getRegulationId(this.session);
    Date dateAffectation = new Date();
    interventionService.unAffectInterventionToDispositif(idIntervention, dateAffectation);
    dispositifService  .unAffectInterventionToDispositif(idDispositif  , idIntervention );
    Intervention  intervention = interventionService.getIntervention(idIntervention);
    Dispositif    dispositif   = dispositifService  .getDispositif  (regulationId, idDispositif);

    //TODO Websocket replace dwr code
   /* ScriptBuffer script = new ScriptBuffer();
    script.appendCall("moInterventionCs.afterUnAffectInterUpdate", intervention, dispositif);
    
    this.updateRegulationUser(script, outPageName);*/
  }
}
