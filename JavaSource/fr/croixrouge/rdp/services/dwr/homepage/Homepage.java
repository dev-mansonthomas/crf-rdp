package fr.croixrouge.rdp.services.dwr.homepage;

import fr.croixrouge.rdp.model.monitor.Regulation;
import fr.croixrouge.rdp.model.monitor.dwr.GridSearchFilterAndSortObject;
import fr.croixrouge.rdp.model.monitor.dwr.ListRange;
import fr.croixrouge.rdp.services.equipier.EquipierService;
import fr.croixrouge.rdp.services.regulation.RegulationService;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import javax.servlet.http.HttpSession;
import java.util.List;

public class Homepage
{
  private static Log          logger              = LogFactory.getLog(Homepage.class);
  
  private RegulationService                       regulationService             = null;
 
  
  public Homepage(RegulationService                       regulationService             , 
                  EquipierService                         equipierService               )
  {
    this.regulationService             = regulationService            ;
    if(logger.isDebugEnabled())
      logger.debug("constructor called");
  }
  
  public ListRange<Regulation>getOpenRegulationList() throws Exception
  {
    
    List<Regulation> list = this.regulationService.getRegulations(true);
    return  new ListRange<Regulation> (list.size(), list);
  }

  
  public ListRange<Regulation>  getRegulationList(GridSearchFilterAndSortObject gridSearchFilterAndSortObject ) throws Exception
  {
    try
    {
      

      System.out.println(gridSearchFilterAndSortObject);

      
      
      List<Regulation> list = this.regulationService.getRegulations(true);
      return  new ListRange<Regulation> (list.size(), list);      
    }
    catch (Exception e)
    {
      e.printStackTrace();
      return null;
    }
    
  }
  
  public void setRegulation(int regulationId, int idIntervention) throws Exception
  {
    //TODO get session
    HttpSession session = (HttpSession)  new Object();
    session.setAttribute("regulation", this.regulationService.getRegulation(regulationId));
    session.setAttribute("idInterventionToOpen", idIntervention);
  }
}
