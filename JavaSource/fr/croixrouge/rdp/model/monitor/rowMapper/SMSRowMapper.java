package fr.croixrouge.rdp.model.monitor.rowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import fr.croixrouge.rdp.model.monitor.SMS;

public class SMSRowMapper implements RowMapper<SMS>
{

  public SMS mapRow(ResultSet rs, int rowNum) throws SQLException
  {
    SMS sms = new SMS(
          rs.getInt       ("id_sms_log"    ),                                                                           
          rs.getInt       ("id_sms_type"   ),     
          rs.getInt       ("id_dispositif" ),       
          rs.getInt       ("id_equipier"   ),     
          rs.getString    ("api"           ),
          rs.getString    ("sender"        ),   
          rs.getString    ("to"            ),
          rs.getString    ("message"       ),    
          rs.getTimestamp ("evt_date"      ),
          rs.getString    ("equipier_desc" )
      );

    return sms;
  }
}
