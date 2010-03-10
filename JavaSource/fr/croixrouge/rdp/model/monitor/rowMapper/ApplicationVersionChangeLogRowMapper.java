package fr.croixrouge.rdp.model.monitor.rowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import fr.croixrouge.rdp.model.monitor.ApplicationVersionChangeLog;

public class ApplicationVersionChangeLogRowMapper extends RowMapperHelper implements RowMapper<ApplicationVersionChangeLog> 
{
  
  public ApplicationVersionChangeLog mapRow(ResultSet rs, int rowNum) throws SQLException
  {
    ApplicationVersionChangeLog applicationVersionChangeLog = new ApplicationVersionChangeLog();

    applicationVersionChangeLog.setId                   (rs.getInt    ("id"                     ));
    applicationVersionChangeLog.setIdApplicationVersion (rs.getInt    ("id_application_version" ));
    applicationVersionChangeLog.setIdJira               (rs.getString ("id_jira"                ));
    applicationVersionChangeLog.setDescription          (rs.getString ("description"            ));

    return applicationVersionChangeLog;
  }

}
