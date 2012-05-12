package fr.croixrouge.rdp.services.mobile;

import fr.croixrouge.rdp.model.monitor.SMSTemplate;
import fr.croixrouge.rdp.model.monitor.dwr.ListRange;

public interface SMSTemplateService
{
  public void                   changeTemplateEnableStatus(int idSMSTemplate, boolean enabled     ) throws Exception;
  public void                   insertNewTemplate         (String template      ) throws Exception;
  public ListRange<SMSTemplate> getSMSTemplate            (String searchedString, int start, int limit) throws Exception; 
}
