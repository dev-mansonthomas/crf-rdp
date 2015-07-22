package fr.croixrouge.rdp.services.delegate.SMS;

import fr.croixrouge.rdp.model.monitor.SMS;

public interface SMSDelegate
{
  void storeRecievedSMSAndNotifiy(SMS sms) throws Exception;
}
