package fr.croixrouge.irp.services.dwr;

import java.util.Collection;

import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.directwebremoting.ScriptBuffer;
import org.directwebremoting.ScriptSession;
import org.directwebremoting.WebContext;
import org.directwebremoting.WebContextFactory;

import fr.croixrouge.irp.model.monitor.Regulation;
import fr.croixrouge.irp.scheduler.ClockJob;

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
      throw new Exception("Votre Session a expiré, veuillez vous reconnecter");
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
    WebContext        webContext = WebContextFactory.get();
    int currentUserRegulationId = 0;
    
    try
    {
      currentUserRegulationId = this.getRegulationId();  
    }
    catch(Exception e)
    {//script session resync bug
      logger.error("RegulationId Not Found",e);
    }
    
    
    Collection <ScriptSession> sessions = webContext.getScriptSessionsByPage(pageName);
    for (ScriptSession session : sessions)
    {
      Integer integer = (Integer)session.getAttribute("regulationId");
      int sessionRegulationId = integer!= null ? integer:0;
      
      if( currentUserRegulationId == sessionRegulationId)
      {
        System.err.println("Adding script to regulationId="+session.getAttribute("regulationId")+" with script "+script);
        session.addScript(script);
      }
    }
      
        
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
  /**
   * Retourne l'id de la régulation sur laquelle on est connecté via la ScriptSession (pour reverseAjax)
   * 
   * */
  protected int getRegulationId() throws Exception
  {
  	WebContext webContext =  WebContextFactory.get();
  	if( webContext != null)
  	{
  		ScriptSession scriptSession = webContext.getScriptSession();
      if(scriptSession != null)
      {
        Object o = scriptSession.getAttribute("regulationId");
        if(o != null)
          return (Integer)o;
        throw new Exception("regulationId not found in ScriptSession");
      }
      throw new Exception("ScriptSession is null, please reconnect");
  	}
    throw new Exception("WebContext is null, please reconnect");
  }
  /**
   * Met l'id de la régulation sur laquelle on est connecté dans la scriptSession
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