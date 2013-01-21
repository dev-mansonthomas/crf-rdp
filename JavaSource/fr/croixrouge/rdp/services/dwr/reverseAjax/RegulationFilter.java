package fr.croixrouge.rdp.services.dwr.reverseAjax;

import org.apache.log4j.Logger;
import org.directwebremoting.ScriptSession;
import org.directwebremoting.ScriptSessionFilter;

public class RegulationFilter implements ScriptSessionFilter
{
  private int     regulationId = 0;
  private Logger  logger       = null;
  

  public RegulationFilter(int     regulationId, Class<?> clazz)
  {
    this.regulationId = regulationId;
    this.logger       = Logger.getLogger(clazz);
  }

  public boolean match(ScriptSession scriptSession)
  {
    Integer integer             = (Integer)scriptSession.getAttribute("regulationId");
    int     sessionRegulationId = integer!= null ? integer:0;
    
    if(sessionRegulationId == 0)
    {
      if(this.logger.isDebugEnabled())
        this.logger.debug("ScriptSession was null or regulation id was 0");
      return false;
    }
    return sessionRegulationId == this.regulationId;
  }
}
