package fr.croixrouge.rdp.services.dwr.homepage;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import fr.croixrouge.rdp.model.monitor.Equipier;
import fr.croixrouge.rdp.model.monitor.Regulation;
import fr.croixrouge.rdp.model.monitor.dwr.GridSearchFilterAndSortObject;
import fr.croixrouge.rdp.model.monitor.dwr.ListRange;
import fr.croixrouge.rdp.services.dwr.DWRUtils;
import fr.croixrouge.rdp.services.equipier.EquipierService;
import fr.croixrouge.rdp.services.regulation.RegulationService;

public class Homepage extends DWRUtils
{
  private static Log          logger              = LogFactory.getLog(Homepage.class);
  
  private RegulationService                       regulationService             = null;
  private EquipierService                         equipierService               = null;
  
  public Homepage(RegulationService                       regulationService             , 
                  EquipierService                         equipierService               )
  {
    this.regulationService             = regulationService            ;
    this.equipierService               = equipierService              ; 

    if(logger.isDebugEnabled())
      logger.debug("constructor called");
  }
  
  public ListRange<Regulation>getOpenRegulationList() throws Exception
  {
    this.validateSession();
    List<Regulation> list = this.regulationService.getRegulations(true);
    return  new ListRange<Regulation> (list.size(), list);
  }

  
  public ListRange<Regulation>  getRegulationList(GridSearchFilterAndSortObject gridSearchFilterAndSortObject ) throws Exception
  {
    try
    {
      this.validateSession();

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
  
  public void setRegulation(int regulationId) throws Exception
  {
    HttpSession session = this.validateSession();
    session.setAttribute("regulation", this.regulationService.getRegulation(regulationId));
  }
  
  public ListRange<Equipier> getEquipierList(GridSearchFilterAndSortObject gsfaso) throws Exception
  {
    try
    {
      this.validateSession();
      
      int nbEquipiers = this.equipierService.getNbEquipiers(gsfaso);
      
      List<Equipier> list = this.equipierService.getEquipiers(gsfaso);
      return  new ListRange<Equipier>(nbEquipiers, list);      
    }
    catch (Exception e)
    {
      e.printStackTrace();
      return null;
    }
    
  }
}
