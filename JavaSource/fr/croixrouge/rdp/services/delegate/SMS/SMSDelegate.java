package fr.croixrouge.rdp.services.delegate.SMS;

import fr.croixrouge.rdp.model.monitor.SMS;

public interface SMSDelegate
{
  public void storeRecievedSMSAndNotifiy(SMS sms) throws Exception;
}
