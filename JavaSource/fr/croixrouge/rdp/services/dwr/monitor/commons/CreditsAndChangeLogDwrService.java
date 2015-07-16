package fr.croixrouge.rdp.services.dwr.monitor.commons;

import fr.croixrouge.rdp.model.monitor.ApplicationVersion;
import fr.croixrouge.rdp.model.monitor.ApplicationVersionChangeLog;
import fr.croixrouge.rdp.model.monitor.Credit;
import fr.croixrouge.rdp.model.monitor.dwr.ListRange;
import fr.croixrouge.rdp.services.creditsAndChangeLog.CreditsAndChangeLogService;

import java.util.List;

public class CreditsAndChangeLogDwrService
{
  private CreditsAndChangeLogService creditsAndChangeLogService = null;
  public CreditsAndChangeLogDwrService(CreditsAndChangeLogService creditsAndChangeLogService)
  {
    this.creditsAndChangeLogService = creditsAndChangeLogService;
  }
  
  public ListRange<Credit> getCredits() throws Exception
  {
    List<Credit> credits = this.creditsAndChangeLogService.getCredit();
    return new ListRange<Credit>(credits.size(),credits);
  }
  
  public List<ApplicationVersion> getApplicationVersions() throws Exception
  {
    return this.creditsAndChangeLogService.getApplicationVersion();
  }
  
  public ListRange<ApplicationVersionChangeLog> getApplicationVersionChangeLogs() throws Exception
  {
    List<ApplicationVersionChangeLog> changeLogs = this.creditsAndChangeLogService.getApplicationVersionChangeLog();
    return new ListRange<ApplicationVersionChangeLog>(changeLogs.size(), changeLogs);
  }
}
