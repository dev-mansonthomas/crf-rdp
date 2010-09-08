package fr.croixrouge.rdp.services.mobile;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.netsize.nsmessaging.IMsgManager;
import com.netsize.nsmessaging.TextSMS;

import fr.croixrouge.rdp.services.dwr.homepage.Homepage;

public class NetsizeMobileService implements MobileService
{
  
  private static Log          logger              = LogFactory.getLog(Homepage.class);
  private IMsgManager msgManager;
  
  public NetsizeMobileService(IMsgManager msgManager)
  {
    this.msgManager = msgManager;
  }

  @Override
  public void sendSMS(String to, String message)
  {
    TextSMS smsMessage = new TextSMS();
    
    smsMessage.AddTarget(to);
    
    try
    {
      smsMessage.setMessage(message);
      this.msgManager.Send(smsMessage);  
    }
    catch(Exception e)
    {
      logger.error("Erreur lors de l'envoie du SMS à '"+to+"' message:'"+message+"'", e);
    }
  }
}