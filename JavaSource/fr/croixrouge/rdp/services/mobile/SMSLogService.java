package fr.croixrouge.rdp.services.mobile;

import java.util.Date;

import fr.croixrouge.rdp.model.monitor.SMS;
import fr.croixrouge.rdp.model.monitor.dwr.ListRange;

public interface SMSLogService
{
  void           logRecievedSMS(SMS sms)                              throws Exception;
  void           logSentSMS(SMS sms)                              throws Exception;
  
  ListRange<SMS> searchSMSForSMSManager(int idEquipier, String mobile, Date searchDate, boolean allSMS, String sortColumn, boolean sortAscending, int start, int limit) throws Exception;
}
