package fr.croixrouge.rdp.model.monitor.rowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import fr.croixrouge.rdp.model.monitor.SMSTemplate;

public class SMSTemplateRowMapper implements RowMapper<SMSTemplate>
{

  public SMSTemplate mapRow(ResultSet rs, int rowNum) throws SQLException
  {
    SMSTemplate smsTemplate = new SMSTemplate(
          rs.getInt       ("id_sms_template"    ),                                                                           
          rs.getDate      ("template_date" ),       
          rs.getBoolean   ("enabled"   ),     
          rs.getString    ("message"           )
      );

    return smsTemplate;
  }
}
