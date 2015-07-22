package fr.croixrouge.rdp.services.mobile;

import fr.croixrouge.rdp.model.monitor.SMSTemplate;
import fr.croixrouge.rdp.model.monitor.dwr.ListRange;

public interface SMSTemplateService
{
  void                   changeTemplateEnableStatus(int idSMSTemplate, boolean enabled) throws Exception;
  void                   insertNewTemplate(String template) throws Exception;
  ListRange<SMSTemplate> getSMSTemplate(String searchedString, int start, int limit) throws Exception;
}
