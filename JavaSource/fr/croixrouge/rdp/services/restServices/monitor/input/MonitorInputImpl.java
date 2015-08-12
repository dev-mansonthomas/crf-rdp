package fr.croixrouge.rdp.services.restServices.monitor.input;

import fr.croixrouge.rdp.model.monitor.Delegation;
import fr.croixrouge.rdp.model.monitor.Regulation;
import fr.croixrouge.rdp.model.monitor.User;
import fr.croixrouge.rdp.model.monitor.dwr.FilterObject;
import fr.croixrouge.rdp.model.monitor.dwr.GridSearchFilterAndSortObject;
import fr.croixrouge.rdp.model.monitor.dwr.ListRange;
import fr.croixrouge.rdp.services.regulation.RegulationService;
import fr.croixrouge.rdp.services.user.UserService;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import javax.inject.Inject;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

public class MonitorInputImpl
{
  private static Log               logger            = LogFactory.getLog(MonitorInputImpl.class);
  private        RegulationService regulationService = null;
  private        UserService       userService       = null;

  @Inject
  HttpSession session;

  public MonitorInputImpl(RegulationService regulationService,
                          UserService userService)
  {
    this.regulationService = regulationService;
    this.userService = userService;

    if (logger.isDebugEnabled())
      logger.debug("constructor called");
  }


  public Regulation getRegulation() throws Exception
  {
    Regulation  regulation = (Regulation) this.session.getAttribute("regulation");
    return regulation;
  }

  public List<User> getCoRegulateurs() throws Exception
  {
    Regulation regulation = this.getRegulation();

    this.userService.getCoRegulateurs(regulation);

    return regulation.getCoRegulateurs();
    
  }
  
  public List<User> getAvailableCoRegulateur(String numNivol, String nom) throws Exception
  {
   
    return this.userService.getCoRegulateurs(numNivol, nom);
  }
  
  public String removeCoRegulateur(int userId, String numNivol) throws Exception
  {
   
    this.userService.setRegulationToUser(userId, 0);
    return numNivol;
  }

  public List<User> addCoRegulateur(int userId) throws Exception
  {
    Regulation regulation = this.getRegulation();
    
    this.userService.setRegulationToUser(userId, regulation.getRegulationId());
    this.userService.getCoRegulateurs(regulation);

    return regulation.getCoRegulateurs();
  }
  
  public ListRange<Delegation> searchDelegation(GridSearchFilterAndSortObject gridSearchFilterAndSortObject) throws Exception
  {
   
    
    FilterObject filterObject = gridSearchFilterAndSortObject.getFilterObject("search");
    
    if(filterObject == null  || filterObject.getValue() == null || filterObject.getValue().equals(""))
      return new ListRange<>(0, new ArrayList<Delegation>());
 
    String search = filterObject.getValue();
    
    
    return this.regulationService.searchDelegation(search, 
                                                   gridSearchFilterAndSortObject.getStart(),
                                                   gridSearchFilterAndSortObject.getLimit());
  }
}
