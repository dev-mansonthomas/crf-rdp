package fr.croixrouge.irp.services;

import java.text.SimpleDateFormat;

import org.springframework.jdbc.core.JdbcTemplate;

public class JDBCHelper
{
  protected SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy hh:mm");
  
  protected int getLastInsertedId(JdbcTemplate jdbcTemplate)
  {
    return jdbcTemplate.queryForInt("SELECT last_insert_id()", null, null);
  }
}
