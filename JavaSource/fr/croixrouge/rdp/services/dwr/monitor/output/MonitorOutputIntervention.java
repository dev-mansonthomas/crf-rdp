package fr.croixrouge.rdp.services.dwr.monitor.output;

import fr.croixrouge.rdp.model.monitor.Dispositif;
import fr.croixrouge.rdp.model.monitor.Intervention;
import fr.croixrouge.rdp.model.monitor.InterventionTicket;
import fr.croixrouge.rdp.services.dispositif.DispositifService;
import fr.croixrouge.rdp.services.intervention.InterventionService;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.util.Date;
import java.util.List;

public class MonitorOutputIntervention
{
  private InterventionService interventionService = null;
  private DispositifService   dispositifService   = null;
  private static Log logger           = LogFactory.getLog(MonitorOutputIntervention.class);
  
  public MonitorOutputIntervention( InterventionService interventionService,
                                    DispositifService   dispositifService)
  {
    this.interventionService = interventionService;
    this.dispositifService   = dispositifService;
    if(logger.isDebugEnabled())
      logger.debug("constructor called");
  }
  
  public List<InterventionTicket> loadAllIntervention() throws Exception
  {
    int    currentUserRegulationId = 1;//TODO regulationId From Session
    return this.interventionService.getAllInterventionTicketWithStatus(currentUserRegulationId, 1);
  }
  
  public void unAffectIntervention(int idIntervention, int idDispositif) throws Exception
  {
    int    currentUserRegulationId = 1;//TODO regulationId From Session
    Date dateAffectation = new Date();
    interventionService.unAffectInterventionToDispositif(idIntervention, dateAffectation);
    dispositifService  .unAffectInterventionToDispositif(idDispositif  , idIntervention );
    Intervention  intervention = interventionService.getIntervention(idIntervention);
    Dispositif    dispositif   = dispositifService  .getDispositif  (currentUserRegulationId, idDispositif);

    //TODO Websocket replace dwr code
   /* ScriptBuffer script = new ScriptBuffer();
    script.appendCall("moInterventionCs.afterUnAffectInterUpdate", intervention, dispositif);
    
    this.updateRegulationUser(script, outPageName);*/
  }
}
