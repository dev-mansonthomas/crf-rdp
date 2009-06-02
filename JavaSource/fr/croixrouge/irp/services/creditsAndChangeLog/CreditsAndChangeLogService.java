package fr.croixrouge.irp.services.creditsAndChangeLog;

import java.util.List;

import fr.croixrouge.irp.model.monitor.ApplicationVersion;
import fr.croixrouge.irp.model.monitor.ApplicationVersionChangeLog;
import fr.croixrouge.irp.model.monitor.Credit;

public interface CreditsAndChangeLogService
{
  public List<Credit>                       getCredit                     () throws Exception;
  public List<ApplicationVersion>           getApplicationVersion         () throws Exception;
  public List<ApplicationVersionChangeLog>  getApplicationVersionChangeLog() throws Exception;
}
