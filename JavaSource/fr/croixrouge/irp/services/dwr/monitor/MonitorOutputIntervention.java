package fr.croixrouge.irp.services.dwr.monitor;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import fr.croixrouge.irp.model.monitor.InterventionTicket;
import fr.croixrouge.irp.services.dwr.DWRUtils;
import fr.croixrouge.irp.services.intervention.InterventionService;

public class MonitorOutputIntervention extends DWRUtils
{
  private InterventionService interventionService = null;
  private static Log logger           = LogFactory.getLog(MonitorOutputIntervention.class);
  
  public MonitorOutputIntervention(InterventionService interventionService)
  {
    this.interventionService = interventionService;
    
    if(logger.isDebugEnabled())
      logger.debug("constructor called");
  }
  
  public List<InterventionTicket> loadAllIntervention() throws Exception
  {
    int    currentUserRegulationId = this.validateSessionAndGetRegulationId();
    return this.interventionService.getAllInterventionTicketWithStatus(currentUserRegulationId, 1);
  }
}