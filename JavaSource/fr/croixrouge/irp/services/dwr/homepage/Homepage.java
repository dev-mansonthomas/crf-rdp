package fr.croixrouge.irp.services.dwr.homepage;

import java.util.List;

import fr.croixrouge.irp.model.monitor.Regulation;
import fr.croixrouge.irp.services.dwr.DWRUtils;
import fr.croixrouge.irp.services.regulation.RegulationService;

public class Homepage extends DWRUtils
{
  private RegulationService regulationService;
  public Homepage(RegulationService regulationService)
  {
    this.regulationService = regulationService;
  }
  
  public List<Regulation> getOpenRegulationList() throws Exception
  {
    this.validateSession();
    return  regulationService.getRegulations(true);
  }
}
