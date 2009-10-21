package fr.croixrouge.rdp.services.dwr.monitorInput;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import fr.croixrouge.rdp.model.monitor.Delegation;
import fr.croixrouge.rdp.model.monitor.Regulation;
import fr.croixrouge.rdp.model.monitor.User;
import fr.croixrouge.rdp.model.monitor.dwr.FilterObject;
import fr.croixrouge.rdp.model.monitor.dwr.GridSearchFilterAndSortObject;
import fr.croixrouge.rdp.model.monitor.dwr.ListRange;
import fr.croixrouge.rdp.services.dwr.DWRUtils;
import fr.croixrouge.rdp.services.regulation.RegulationService;

public class MonitorInputImpl extends DWRUtils
{
  private static Log logger           = LogFactory.getLog(MonitorInputImpl.class);
  private RegulationService   regulationService   = null;
    
  public MonitorInputImpl(RegulationService   regulationService)
  {
    this.regulationService = regulationService ;
    
    if(logger.isDebugEnabled())
      logger.debug("constructor called");
  }
  
  
  public Regulation getRegulation() throws Exception
  {
    HttpSession session     = this.validateSession();
    Regulation  regulation  = (Regulation)session.getAttribute("regulation");
    return regulation;
  }
  
  public List<User> getCoRegulateurs() throws Exception
  {
    Regulation regulation = this.getRegulation();
    
    this.regulationService.getCoRegulateurs(regulation);
    
    return regulation.getCoRegulateurs();
    
  }
  
  public List<User> getAvailableCoRegulateur(String numNivol, String nom) throws Exception
  {
    this.validateSession();
    return this.regulationService.getCoRegulateurs(numNivol, nom);
  }
  
  public String removeCoRegulateur(int userId, String numNivol) throws Exception
  {
    this.validateSession();
    this.regulationService.setRegulationToUser(userId, 0);
    return numNivol;
  }

  public List<User> addCoRegulateur(int userId) throws Exception
  {
    Regulation regulation = this.getRegulation();
    
    this.regulationService.setRegulationToUser(userId, regulation.getRegulationId());
    this.regulationService.getCoRegulateurs(regulation);

    return regulation.getCoRegulateurs();
  }
  
  public ListRange<Delegation> searchDelegation(GridSearchFilterAndSortObject gridSearchFilterAndSortObject) throws Exception
  {
    this.validateSession();
    
    FilterObject filterObject = gridSearchFilterAndSortObject.getFilterObject("search");
    
    if(filterObject == null  || filterObject.getValue() == null || filterObject.getValue().equals(""))
      return new ListRange<Delegation>(0, new ArrayList<Delegation>());
 
    String search = filterObject.getValue();
    
    
    return this.regulationService.searchDelegation(search, 
                                                   gridSearchFilterAndSortObject.getStart(),
                                                   gridSearchFilterAndSortObject.getLimit());
  }
}