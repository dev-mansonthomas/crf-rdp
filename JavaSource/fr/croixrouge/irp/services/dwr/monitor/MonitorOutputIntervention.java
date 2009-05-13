package fr.croixrouge.irp.services.dwr.monitor;

import java.util.Date;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.directwebremoting.ScriptBuffer;

import fr.croixrouge.irp.model.monitor.Dispositif;
import fr.croixrouge.irp.model.monitor.Intervention;
import fr.croixrouge.irp.model.monitor.InterventionTicket;
import fr.croixrouge.irp.services.dispositif.DispositifService;
import fr.croixrouge.irp.services.dwr.DWRUtils;
import fr.croixrouge.irp.services.intervention.InterventionService;

public class MonitorOutputIntervention extends DWRUtils
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
    int    currentUserRegulationId = this.validateSessionAndGetRegulationId();
    return this.interventionService.getAllInterventionTicketWithStatus(currentUserRegulationId, 1);
  }
  
  public void unAffectIntervention(int idIntervention, int idDispositif) throws Exception
  {
    int    currentUserRegulationId = this.validateSessionAndGetRegulationId();
    Date dateAffectation = new Date();
    interventionService.unAffectInterventionToDispositif(idIntervention, dateAffectation);
    dispositifService  .unAffectInterventionToDispositif(idDispositif  , dateAffectation);
    Intervention  intervention = interventionService.getIntervention(idIntervention);
    Dispositif    dispositif   = dispositifService  .getDispositif  (currentUserRegulationId, idDispositif);
    
    ScriptBuffer script = new ScriptBuffer();
    script.appendCall("moInterventionCs.afterUnAffectInterUpdate", intervention, dispositif);
    
    this.updateRegulationUser(script, outPageName);
  }
}