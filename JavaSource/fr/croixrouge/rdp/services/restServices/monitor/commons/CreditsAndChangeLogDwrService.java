package fr.croixrouge.rdp.services.restServices.monitor.commons;

import com.wordnik.swagger.annotations.Api;
import com.wordnik.swagger.annotations.ApiOperation;
import fr.croixrouge.rdp.model.monitor.ApplicationVersion;
import fr.croixrouge.rdp.model.monitor.ApplicationVersionChangeLog;
import fr.croixrouge.rdp.model.monitor.Credit;
import fr.croixrouge.rdp.model.monitor.dwr.ListRange;
import fr.croixrouge.rdp.services.creditsAndChangeLog.CreditsAndChangeLogService;
import org.springframework.stereotype.Component;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Component
@Path("/creditAndChangelog")
@Produces(MediaType.APPLICATION_JSON)
@Api(value="CreditAndChangelog", description="Allow to fetch credit and changelog")
public class CreditsAndChangeLogDwrService
{
  private CreditsAndChangeLogService creditsAndChangeLogService = null;
  public CreditsAndChangeLogDwrService(CreditsAndChangeLogService creditsAndChangeLogService)
  {
    this.creditsAndChangeLogService = creditsAndChangeLogService;
  }

  @GET
  @Path("/credit")
  @ApiOperation(value="Get Application Credit")
  public ListRange<Credit> getCredits() throws Exception
  {
    List<Credit> credits = this.creditsAndChangeLogService.getCredit();
    return new ListRange<>(credits.size(), credits);
  }
  @GET
  @Path("/applicationVersions")
  @ApiOperation(value="Get Application Version")
  public List<ApplicationVersion> getApplicationVersions() throws Exception
  {
    return this.creditsAndChangeLogService.getApplicationVersion();
  }

  @GET
  @Path("/changelogs")
  @ApiOperation(value="Perform a paginated search on lieux")
  public ListRange<ApplicationVersionChangeLog> getApplicationVersionChangeLogs() throws Exception
  {
    List<ApplicationVersionChangeLog> changeLogs = this.creditsAndChangeLogService.getApplicationVersionChangeLog();
    return new ListRange<>(changeLogs.size(), changeLogs);
  }
}
