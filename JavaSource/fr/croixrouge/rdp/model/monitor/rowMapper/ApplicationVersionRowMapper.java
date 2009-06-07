package fr.croixrouge.rdp.model.monitor.rowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import fr.croixrouge.rdp.model.monitor.ApplicationVersion;

public class ApplicationVersionRowMapper extends RowMapperHelper implements RowMapper 
{
  
  public Object mapRow(ResultSet rs, int rowNum) throws SQLException
  {
    ApplicationVersion applicationVersion = new ApplicationVersion();
    
  

    applicationVersion.setId                    (rs.getInt    ("id"));
    applicationVersion.setVersionName           (rs.getString ("version_name"));
    applicationVersion.setDevReleaseDate        (rs.getString ("dev_release_date"));
    applicationVersion.setProductionReleaseDate (rs.getString ("production_release_date"));
    applicationVersion.setDescription           (rs.getString ("description"));
    

    return applicationVersion;
  }

}
