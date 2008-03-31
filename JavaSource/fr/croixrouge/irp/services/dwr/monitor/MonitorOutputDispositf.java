package fr.croixrouge.irp.services.dwr.monitor;

import fr.croixrouge.irp.model.monitor.dwr.ListRange;
import fr.croixrouge.irp.services.dispositif.DispositifService;
import fr.croixrouge.irp.services.dwr.DWRUtils;

public class MonitorOutputDispositf  extends DWRUtils
{
  private DispositifService dispositifService = null;
  
  public MonitorOutputDispositf(DispositifService dispositifService)
  {
    this.dispositifService = dispositifService;
  }

  public ListRange getAllDispositif() throws Exception
  {
    this.validateSession();
    int  currentUserRegulationId = this.getRegulationId();
    return this.dispositifService.getAllDispositif(currentUserRegulationId);
  }
}