package fr.croixrouge.irp.services.dwr.homepage;

import java.util.List;

import javax.servlet.http.HttpSession;

import fr.croixrouge.irp.model.monitor.Regulation;
import fr.croixrouge.irp.model.monitor.dwr.ListRange;
import fr.croixrouge.irp.services.dwr.DWRUtils;
import fr.croixrouge.irp.services.regulation.RegulationService;

public class Homepage extends DWRUtils
{
  private RegulationService regulationService;
  public Homepage(RegulationService regulationService)
  {
    this.regulationService = regulationService;
  }
  
  public ListRange getOpenRegulationList() throws Exception
  {
    this.validateSession();
    List<Regulation> list = this.regulationService.getRegulations(true);
    return  new ListRange(list.size(), list);
  }
  
  public void setRegulation(int regulationId) throws Exception
  {
    HttpSession session = this.validateSession();
    session.setAttribute("regulation", this.regulationService.getRegulation(regulationId));
  }
}
