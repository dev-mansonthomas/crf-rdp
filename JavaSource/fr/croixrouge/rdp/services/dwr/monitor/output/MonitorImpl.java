package fr.croixrouge.rdp.services.dwr.monitor.output;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class MonitorImpl
{
  private static Log logger           = LogFactory.getLog(MonitorImpl.class);
  
  public MonitorImpl()
  {

    if(logger.isDebugEnabled())
      logger.debug("constructor called");
  }
  
}
