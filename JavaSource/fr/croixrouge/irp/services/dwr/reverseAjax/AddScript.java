package fr.croixrouge.irp.services.dwr.reverseAjax;

import org.apache.log4j.Logger;
import org.directwebremoting.ScriptBuffer;
import org.directwebremoting.ScriptSessions;

public class AddScript implements Runnable
{
  private ScriptBuffer  scriptBuffer = null;
  private Logger        logger       = null;
  
  @SuppressWarnings("unchecked")
  public AddScript(ScriptBuffer scriptBuffer, Class clazz)
  {
    this.scriptBuffer = scriptBuffer;
    this.logger       = Logger.getLogger(clazz);
  }
  public void run()
  {
    try
    {
      ScriptSessions.addScript(this.scriptBuffer);  
    }
    catch(Exception e)
    {
      this.logger.error(e);
    }
  }
}
