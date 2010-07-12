package fr.croixrouge.rdp.services.dwr.monitor.commons;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import fr.croixrouge.rdp.model.monitor.InterventionTicket;
import fr.croixrouge.rdp.model.monitor.dwr.GridSearchFilterAndSortObject;
import fr.croixrouge.rdp.model.monitor.dwr.ListRange;
import fr.croixrouge.rdp.services.dwr.DWRUtils;
import fr.croixrouge.rdp.services.intervention.InterventionService;

public class InterventionListService extends DWRUtils
{
  private static Log          logger              = LogFactory.getLog(InterventionListService.class);
  private InterventionService interventionService = null;
  
  public InterventionListService(InterventionService interventionService)
  {
    this.interventionService = interventionService;
  }
  
  
  public ListRange<InterventionTicket> getInterventionList(GridSearchFilterAndSortObject gsfaso) throws Exception
  {
    this.validateSession();

    ListRange<InterventionTicket> interventions = null;
    try
    {  
      interventions = this.interventionService.searchInterventions(gsfaso);    
    }
    catch (Exception e)
    {
      logger.error("Erreur lors de la récupération de la liste des interventions", e);
      throw e;
    }
    
    
    return interventions;
  }
}