package fr.croixrouge.rdp.services.dwr;

import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.directwebremoting.Browser;
import org.directwebremoting.ScriptBuffer;
import org.directwebremoting.WebContext;
import org.directwebremoting.WebContextFactory;

import fr.croixrouge.rdp.model.monitor.Regulation;
import fr.croixrouge.rdp.scheduler.ClockJob;
import fr.croixrouge.rdp.services.authentification.SecurityPrincipal;
import fr.croixrouge.rdp.services.dwr.reverseAjax.AddScript;
import fr.croixrouge.rdp.services.dwr.reverseAjax.RegulationFilter;
import fr.croixrouge.utilities.web.security.SecurityFilter;

public class DWRUtils
{
  public final static String outPageName="/crf-rdp/private/monitor/out.html";
  public final static String inPageName ="/crf-rdp/private/monitor/in.html";

  private static Logger logger = Logger.getLogger(DWRUtils.class);
  
  protected HttpSession validateSession() throws Exception
  {
    WebContext  webContext  = WebContextFactory.get();
    HttpSession session     = webContext.getSession(false);
    if(session == null)
      throw new Exception("Votre Session a expirée, veuillez vous reconnecter (session is null)");
    return session;
  }
  
  protected WebContext getContext() throws Exception
  {
    return WebContextFactory.get();
  }
  
  
  /**
   * Execute le script passé en parametre sur la page 'pageName' 
   * de tout le client sur la meme régulation que l'utilisateur courant.
   * 
   * */
  protected void updateRegulationUser(ScriptBuffer script, String pageName) throws Exception
  {
    int currentUserRegulationId = 0;

    try
    {
      currentUserRegulationId = this.validateSessionAndGetRegulationId();  
    }
    catch(Exception e)
    {
      logger.error("RegulationId Not Found", e);
    }
    
    Browser.withPageFiltered( pageName, 
                              new RegulationFilter( currentUserRegulationId, 
                                                    this.getClass()),
                              new AddScript(script, this.getClass()));
  }
  
  /**
   * Retourne l'id de la régulation sur laquelle on est connecté via la httpSession
   * 
   * */
  protected int validateSessionAndGetRegulationId() throws Exception
  {
    HttpSession session     = this.validateSession();
    Regulation  regulation  = (Regulation)session.getAttribute("regulation");
    
    if(regulation == null )
      throw new Exception("Régulation non trouvée");
    
    return regulation.getRegulationId();
  }
  
  protected int getCurrentUserId() throws Exception
  {
    HttpSession       session       = this.validateSession();
    SecurityPrincipal principal     = (SecurityPrincipal)session.getAttribute(SecurityFilter.PRINCIPAL);
    
    if(principal == null)
    {
      throw new SecurityException("Votre Session a expirée, veuillez vous reconnecter (principal is null)");
    }
    return principal.getUser().getIdUser();
  }
  
  
  
 
  /**
   * Met l'id de la régulation sur laquelle on est connecté dans la scriptSession
   * A n'employer que sur les pages utilisant du reverse Ajax
   * */
  public void initScriptSession() throws Exception
  {
    HttpSession session     = this.validateSession();
    Regulation  regulation  = (Regulation)session.getAttribute("regulation");
    
    if(regulation == null )
      throw new Exception("Régulation non trouvée");
    
    WebContext webContext = WebContextFactory.get() ;
    webContext.getScriptSession().setAttribute("regulationId", regulation.getRegulationId());
    
    if(!ClockJob.firstAjaxCallDone)
    {
      ClockJob.firstAjaxCallDone = true;
      System.out.println("Setting 'ClockJob.firstAjaxCallDone = true;' "+ ClockJob.firstAjaxCallDone);
    }
  }
}