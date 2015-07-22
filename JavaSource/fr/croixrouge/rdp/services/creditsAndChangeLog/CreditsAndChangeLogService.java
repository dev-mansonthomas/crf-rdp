package fr.croixrouge.rdp.services.creditsAndChangeLog;

import java.util.List;

import fr.croixrouge.rdp.model.monitor.ApplicationVersion;
import fr.croixrouge.rdp.model.monitor.ApplicationVersionChangeLog;
import fr.croixrouge.rdp.model.monitor.Credit;

public interface CreditsAndChangeLogService
{
  List<Credit>                       getCredit() throws Exception;
  List<ApplicationVersion>           getApplicationVersion() throws Exception;
  List<ApplicationVersionChangeLog>  getApplicationVersionChangeLog() throws Exception;
}
