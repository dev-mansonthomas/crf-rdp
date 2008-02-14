package fr.croixrouge.irp.services.dwr.monitor;

import java.util.List;

import fr.croixrouge.irp.model.monitor.InterventionTicket;
import fr.croixrouge.irp.services.dwr.DWRUtils;
import fr.croixrouge.irp.services.intervention.InterventionService;

public class MonitorOutputIntervention extends DWRUtils
{
  private InterventionService interventionService = null;
  public MonitorOutputIntervention(InterventionService interventionService)
  {
    this.interventionService = interventionService;
  }
  
  public List<InterventionTicket> loadAllIntervention() throws Exception
  {
    int    currentUserRegulationId = this.validateSessionAndGetRegulationId();
    return this.interventionService.getAllInterventionTicketWithStatus(currentUserRegulationId, 1);
  }
}