package fr.croixrouge.irp.scheduler;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.ServletContext;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.directwebremoting.Browser;
import org.directwebremoting.ScriptBuffer;
import org.springframework.web.context.ServletContextAware;

import fr.croixrouge.irp.services.dwr.DWRUtils;
import fr.croixrouge.irp.services.dwr.reverseAjax.AddScript;

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
    
    this.servletContext.getClass();
  }

  public void broadcastTime()
  {
    if(!firstAjaxCallDone)
      return;
   
    String timeIs = simpleDateFormat.format(new Date());
    
    
    Browser.withPage(DWRUtils.outPageName, 
        new AddScript(new ScriptBuffer().appendCall("monitorOutputCs.updateClock", timeIs), 
                      this.getClass()));
  }
}
