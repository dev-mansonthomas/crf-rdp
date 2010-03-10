package fr.croixrouge.rdp.model.monitor.rowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import fr.croixrouge.rdp.model.monitor.Credit;

public class CreditRowMapper extends RowMapperHelper implements RowMapper <Credit>
{
  
  public Credit mapRow(ResultSet rs, int rowNum) throws SQLException
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
