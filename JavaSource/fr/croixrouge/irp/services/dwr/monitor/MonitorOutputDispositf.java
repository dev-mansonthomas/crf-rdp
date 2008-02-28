package fr.croixrouge.irp.services.dwr.monitor;

import org.directwebremoting.WebContext;
import org.directwebremoting.WebContextFactory;

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
    WebContext        webContext = WebContextFactory.get();
    int  currentUserRegulationId = (Integer)webContext.getScriptSession().getAttribute("regulationId");
    return this.dispositifService.getAllDispositif(currentUserRegulationId);
  }
}