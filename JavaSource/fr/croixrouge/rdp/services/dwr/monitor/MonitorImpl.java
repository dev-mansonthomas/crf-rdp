package fr.croixrouge.rdp.services.dwr.monitor;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import fr.croixrouge.rdp.services.dwr.DWRUtils;

public class MonitorImpl extends DWRUtils
{
  private static Log logger           = LogFactory.getLog(MonitorImpl.class);
  
  public MonitorImpl()
  {

    if(logger.isDebugEnabled())
      logger.debug("constructor called");
  }
  
}