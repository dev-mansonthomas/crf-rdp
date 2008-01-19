package fr.croixrouge.irp.scheduler;

import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;

import javax.servlet.ServletContext;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.directwebremoting.ScriptBuffer;
import org.directwebremoting.ScriptSession;
import org.directwebremoting.ServerContext;
import org.directwebremoting.ServerContextFactory;
import org.springframework.web.context.ServletContextAware;

import fr.croixrouge.irp.services.dwr.DWRUtils;

public class ClockJob implements ServletContextAware
{
  private ServletContext          servletContext   = null;
  private static SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
  private static Log              logger           = LogFactory.getLog(ClockJob.class);  
  public  static boolean          firstAjaxCallDone=false;
  
  
  public ClockJob()
  {
    if(logger.isDebugEnabled())
      logger.debug("New ClockJob");
  }
  
  public void setServletContext(ServletContext servletContext)
  {
    this.servletContext=servletContext;
    if(logger.isDebugEnabled())
      logger.debug("ServletContext set, isNull="+(servletContext==null));
  }
  @SuppressWarnings("unchecked")
  public void broadcastTime()
  {
    
    System.out.println("firstAjaxCallDone="+firstAjaxCallDone);
    if(!firstAjaxCallDone)
      return;
   
    String timeIs = simpleDateFormat.format(new Date());
    
    System.out.println("timeIs="+timeIs);
    
    ServerContext serverContext = ServerContextFactory.get(servletContext);
    ScriptBuffer scriptBuffer = new ScriptBuffer("monitorOutputCs.updateClock(");
    scriptBuffer.appendData(timeIs);
    scriptBuffer.appendScript(");");
    
    Collection<ScriptSession> sessions = serverContext.getScriptSessionsByPage ( DWRUtils.outPageName );
    for (ScriptSession session : sessions)
        session.addScript(scriptBuffer);
  }
}
