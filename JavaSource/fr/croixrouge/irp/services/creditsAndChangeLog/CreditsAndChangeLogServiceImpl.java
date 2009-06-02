package fr.croixrouge.irp.services.creditsAndChangeLog;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;

import fr.croixrouge.irp.model.monitor.ApplicationVersion;
import fr.croixrouge.irp.model.monitor.ApplicationVersionChangeLog;
import fr.croixrouge.irp.model.monitor.Credit;
import fr.croixrouge.irp.model.monitor.rowMapper.ApplicationVersionChangeLogRowMapper;
import fr.croixrouge.irp.model.monitor.rowMapper.ApplicationVersionRowMapper;
import fr.croixrouge.irp.model.monitor.rowMapper.CreditRowMapper;

public class CreditsAndChangeLogServiceImpl implements CreditsAndChangeLogService
{
  private JdbcTemplate jdbcTemplate = null;
  public CreditsAndChangeLogServiceImpl(JdbcTemplate jdbcTemplate)
  {
    this.jdbcTemplate = jdbcTemplate;
  }

  private static String queryForGetCredits = 
    "SELECT id, presentation_order, name, version, url, description \n"+
    "FROM credits c                                                 \n"+
    "ORDER BY presentation_order ASC                                \n"; 
  
  @SuppressWarnings("unchecked")
  public List<Credit> getCredit() throws Exception
  {
    
    return (List<Credit>)this.jdbcTemplate.query(queryForGetCredits,
                            new Object[]{},
                            new int   []{},
                            new CreditRowMapper());
  }
  
  
  private static String queryForGetApplicationVersion = 
    "SELECT id, version_name, dev_release_date,  \n" +
    "       production_release_date, description \n" +
    "FROM   application_version a                \n" +
    "order by id asc                             \n";
   
  @SuppressWarnings("unchecked")
  public List<ApplicationVersion> getApplicationVersion() throws Exception
  {
    return (List<ApplicationVersion>)this.jdbcTemplate.query(queryForGetApplicationVersion,
        new Object[]{},
        new int   []{},
        new ApplicationVersionRowMapper());
  }
  
  private static String queryForGetApplicationVersionChangeLog = 
    "SELECT id, id_application_version, id_jira, description \n" +
    "FROM application_version_changelog a                    \n" +
    "ORDER BY id_application_version asc, id asc             \n";
   
  @SuppressWarnings("unchecked")
  public List<ApplicationVersionChangeLog> getApplicationVersionChangeLog() throws Exception
  {
    return (List<ApplicationVersionChangeLog>)this.jdbcTemplate.query(queryForGetApplicationVersionChangeLog,
        new Object[]{},
        new int   []{},
        new ApplicationVersionChangeLogRowMapper());
  }
}
