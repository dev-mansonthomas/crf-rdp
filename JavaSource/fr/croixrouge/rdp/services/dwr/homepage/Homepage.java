package fr.croixrouge.rdp.services.dwr.homepage;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import fr.croixrouge.rdp.model.monitor.Regulation;
import fr.croixrouge.rdp.model.monitor.dwr.GridSearchFilterAndSortObject;
import fr.croixrouge.rdp.model.monitor.dwr.ListRange;
import fr.croixrouge.rdp.services.dwr.DWRUtils;
import fr.croixrouge.rdp.services.regulation.RegulationService;

public class Homepage extends DWRUtils
{
  private RegulationService regulationService;
  private static Log          logger              = LogFactory.getLog(Homepage.class);
  public Homepage(RegulationService regulationService)
  {
    this.regulationService = regulationService;

    if(logger.isDebugEnabled())
      logger.debug("constructor called");
  }
  
  public ListRange getOpenRegulationList() throws Exception
  {
    this.validateSession();
    List<Regulation> list = this.regulationService.getRegulations(true);
    return  new ListRange(list.size(), list);
  }

  
  public ListRange getRegulationList(GridSearchFilterAndSortObject gridSearchFilterAndSortObject ) throws Exception
  {
    try
    {
      this.validateSession();

      System.out.println(gridSearchFilterAndSortObject);

      
      
      List<Regulation> list = this.regulationService.getRegulations(true);
      return  new ListRange(list.size(), list);      
    }
    catch (Exception e)
    {
      e.printStackTrace();
      return null;
    }
    
  }
  
  public void setRegulation(int regulationId) throws Exception
  {
    HttpSession session = this.validateSession();
    session.setAttribute("regulation", this.regulationService.getRegulation(regulationId));
  }
}
