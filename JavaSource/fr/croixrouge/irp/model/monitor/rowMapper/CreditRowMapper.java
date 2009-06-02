package fr.croixrouge.irp.model.monitor.rowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import fr.croixrouge.irp.model.monitor.Credit;

public class CreditRowMapper extends RowMapperHelper implements RowMapper 
{
  
  public Object mapRow(ResultSet rs, int rowNum) throws SQLException
  {
    Credit credit = new Credit();

    credit.setId            (rs.getInt    ("id"));
    credit.setOrder         (rs.getInt    ("presentation_order"));
    credit.setName          (rs.getString ("name"));
    credit.setUrl           (rs.getString ("url"));
    credit.setVersion       (rs.getString ("version"));
    credit.setDescription   (rs.getString ("description"));

    return credit;
  }

}
