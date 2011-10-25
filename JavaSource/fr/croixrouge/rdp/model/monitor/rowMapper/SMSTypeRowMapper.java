package fr.croixrouge.rdp.model.monitor.rowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import fr.croixrouge.rdp.model.monitor.SMSType;

public class SMSTypeRowMapper extends RowMapperHelper implements RowMapper<SMSType>
{

  public SMSType mapRow(ResultSet rs, int rowNum) throws SQLException
  {
    SMSType smsType = new SMSType();
    smsType.setId   (rs.getInt   ("id_sms_type"   )); 
    smsType.setLabel(rs.getString("label_sms_type"));
    return smsType;
  }
}
