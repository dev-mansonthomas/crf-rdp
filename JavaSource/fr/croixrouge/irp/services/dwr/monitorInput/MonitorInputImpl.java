package fr.croixrouge.irp.services.dwr.monitorInput;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import fr.croixrouge.irp.model.monitor.Delegation;
import fr.croixrouge.irp.model.monitor.Regulation;
import fr.croixrouge.irp.model.monitor.User;
import fr.croixrouge.irp.services.dwr.DWRUtils;
import fr.croixrouge.irp.services.regulation.RegulationService;

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
  
  public List<Delegation> getDelegationByZipCode(String zip) throws Exception
  {
    if(zip.length()<3)
      return null;
    this.validateSession();
    return this.regulationService.getDelegationsByZipCode(zip);
  }
}