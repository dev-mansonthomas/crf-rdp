package fr.croixrouge.irp.services.dwr.monitorCommons;

import java.util.List;

import fr.croixrouge.irp.model.monitor.ApplicationVersion;
import fr.croixrouge.irp.model.monitor.ApplicationVersionChangeLog;
import fr.croixrouge.irp.model.monitor.Credit;
import fr.croixrouge.irp.model.monitor.dwr.ListRange;
import fr.croixrouge.irp.services.creditsAndChangeLog.CreditsAndChangeLogService;
import fr.croixrouge.irp.services.dwr.DWRUtils;

public class CreditsAndChangeLogDwrService extends DWRUtils
{
  private CreditsAndChangeLogService creditsAndChangeLogService = null;
  public CreditsAndChangeLogDwrService(CreditsAndChangeLogService creditsAndChangeLogService)
  {
    this.creditsAndChangeLogService = creditsAndChangeLogService;
  }
  
  public ListRange getCredits() throws Exception
  {
    List<Credit> credits = this.creditsAndChangeLogService.getCredit();
    return new ListRange(credits.size(),credits);
  }
  
  public List<ApplicationVersion> getApplicationVersions() throws Exception
  {
    return this.creditsAndChangeLogService.getApplicationVersion();
  }
  
  public ListRange getApplicationVersionChangeLogs() throws Exception
  {
    List<ApplicationVersionChangeLog> changeLogs = this.creditsAndChangeLogService.getApplicationVersionChangeLog();
    return new ListRange(changeLogs.size(), changeLogs);
  }
}
