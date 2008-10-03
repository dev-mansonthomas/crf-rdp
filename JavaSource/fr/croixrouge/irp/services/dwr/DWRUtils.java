package fr.croixrouge.irp.services.dwr;

import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.directwebremoting.Browser;
import org.directwebremoting.ScriptBuffer;
import org.directwebremoting.WebContext;
import org.directwebremoting.WebContextFactory;

import fr.croixrouge.irp.model.monitor.Regulation;
import fr.croixrouge.irp.scheduler.ClockJob;
import fr.croixrouge.irp.services.dwr.reverseAjax.AddScript;
import fr.croixrouge.irp.services.dwr.reverseAjax.RegulationFilter;

public class DWRUtils
{
  public final static String outPageName="/crf-irp/private/monitor/out.html";
  public final static String inPageName ="/crf-irp/private/monitor/in.html";

  private static Logger logger = Logger.getLogger(DWRUtils.class);
  
  protected HttpSession validateSession() throws Exception
  {
    WebContext  webContext  = WebContextFactory.get();
    HttpSession session     = webContext.getSession(false);
    if(session == null)
      throw new Exception("Votre Session a expir�, veuillez vous reconnecter");
    return session;
  }
  
  protected WebContext getContext() throws Exception
  {
    return WebContextFactory.get();
  }
  
  
  /**
   * Execute le script pass� en parametre sur la page 'pageName' 
   * de tout le client sur la meme r�gulation que l'utilisateur courant.
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
   * Retourne l'id de la r�gulation sur laquelle on est connect� via la httpSession
   * 
   * */
  protected int validateSessionAndGetRegulationId() throws Exception
  {
    HttpSession session     = this.validateSession();
    Regulation  regulation  = (Regulation)session.getAttribute("regulation");
    
    if(regulation == null )
      throw new Exception("R�gulation non trouv�e");
    
    return regulation.getRegulationId();
  }
 
  /**
   * Met l'id de la r�gulation sur laquelle on est connect� dans la scriptSession
   * A n'employer que sur les pages utilisant du reverse Ajax
   * */
  public void initScriptSession() throws Exception
  {
    HttpSession session     = this.validateSession();
    Regulation  regulation  = (Regulation)session.getAttribute("regulation");
    
    if(regulation == null )
      throw new Exception("R�gulation non trouv�e");
    
    WebContext webContext = WebContextFactory.get() ;
    webContext.getScriptSession().setAttribute("regulationId", regulation.getRegulationId());
    
    if(!ClockJob.firstAjaxCallDone)
    {
      ClockJob.firstAjaxCallDone = true;
      System.out.println("Setting 'ClockJob.firstAjaxCallDone = true;' "+ ClockJob.firstAjaxCallDone);
    }
  }
}