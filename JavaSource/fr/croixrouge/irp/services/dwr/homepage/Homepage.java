package fr.croixrouge.irp.services.dwr.homepage;

import java.util.List;

import javax.servlet.http.HttpSession;

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
    return  this.regulationService.getRegulations(true);
  }
  
  public void setRegulation(int regulationId) throws Exception
  {
    HttpSession session = this.validateSession();
    session.setAttribute("regulation", this.regulationService.getRegulation(regulationId));
  }
}
