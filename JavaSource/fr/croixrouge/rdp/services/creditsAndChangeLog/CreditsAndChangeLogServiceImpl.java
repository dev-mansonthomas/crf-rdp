package fr.croixrouge.rdp.services.creditsAndChangeLog;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;

import fr.croixrouge.rdp.model.monitor.ApplicationVersion;
import fr.croixrouge.rdp.model.monitor.ApplicationVersionChangeLog;
import fr.croixrouge.rdp.model.monitor.Credit;
import fr.croixrouge.rdp.model.monitor.rowMapper.ApplicationVersionChangeLogRowMapper;
import fr.croixrouge.rdp.model.monitor.rowMapper.ApplicationVersionRowMapper;
import fr.croixrouge.rdp.model.monitor.rowMapper.CreditRowMapper;

public class CreditsAndChangeLogServiceImpl implements CreditsAndChangeLogService
{
  private JdbcTemplate jdbcTemplate = null;
  public CreditsAndChangeLogServiceImpl(JdbcTemplate jdbcTemplate)
  {
    this.jdbcTemplate = jdbcTemplate;
  }

  private static String queryForGetCredits = 
    "SELECT   id, presentation_order, name, version, url, description \n"+
    "FROM     credits c                                               \n"+
    "ORDER BY presentation_order ASC                                  \n"; 
  
  public List<Credit> getCredit() throws Exception
  {
    
    return this.jdbcTemplate.query(queryForGetCredits,
                                    new Object[]{},
                                    new int   []{},
                                    new CreditRowMapper());
  }
  
  
  private static String queryForGetApplicationVersion = 
    "SELECT id, version_name, dev_release_date,  \n" +
    "       production_release_date, description \n" +
    "FROM   application_version a                \n" +
    "ORDER BY id ASC                             \n";
   
  public List<ApplicationVersion> getApplicationVersion() throws Exception
  {
    return this.jdbcTemplate.query(queryForGetApplicationVersion,
        new Object[]{},
        new int   []{},
        new ApplicationVersionRowMapper());
  }
  
  private static String queryForGetApplicationVersionChangeLog = 
    "SELECT id, id_application_version, id_jira, description \n" +
    "FROM application_version_changelog a                    \n" +
    "ORDER BY id_application_version ASC, id ASC             \n";

  public List<ApplicationVersionChangeLog> getApplicationVersionChangeLog() throws Exception
  {
    return this.jdbcTemplate.query(queryForGetApplicationVersionChangeLog,
        new Object[]{},
        new int   []{},
        new ApplicationVersionChangeLogRowMapper());
  }
}
