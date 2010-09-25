package fr.croixrouge.rdp.services.mobile;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import fr.croixrouge.rdp.model.monitor.SMS;

public class ThreadedSMSSend extends Thread
{ 
  private static Log          logger              = LogFactory.getLog(ThreadedSMSSend.class);
  
  private MobileService mobileService ;
  private int           sendOrder     ;
  private SMS           sms           ;
  
  public ThreadedSMSSend(MobileService  mobileService,
                         int            sendOrder    , 
                         SMS            sms
                         )
  {
    this.mobileService = mobileService;
    this.sendOrder     = sendOrder    ;
    this.sms           = sms          ;
  }

  @Override
  public void run()
  {
    if(logger.isDebugEnabled())
    {
      logger.debug("Multithreaded send SMS["+this.sendOrder+"] smsType:'"+this.sms.getSmsType()+"' userId:'"+this.sms.getUserId()+"' to:'"+this.sms.getRecipient()+"' content:'"+this.sms.getMessage()+"'");
    }
    
    try
    {
      this.mobileService.sendSMS(sms);  
    }
    catch(Exception e)
    {
      logger.debug("ERROR Multithreaded send SMS["+this.sendOrder+"] smsType:'"+this.sms.getSmsType()+"' userId:'"+this.sms.getUserId()+"' to:'"+this.sms.getRecipient()+"' content:'"+this.sms.getMessage()+"'", e);
    }
    

    if(logger.isDebugEnabled())
    {
      logger.debug("Multithreaded send SMS["+this.sendOrder+"] smsType:'"+this.sms.getSmsType()+"' userId:'"+this.sms.getUserId()+"' to:'"+this.sms.getRecipient()+"' content:'"+this.sms.getMessage()+"' DONE");
    }
  }
}
