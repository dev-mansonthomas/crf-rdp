package fr.croixrouge.rdp.services;

import java.text.SimpleDateFormat;

import org.springframework.jdbc.core.JdbcTemplate;

public abstract class JDBCHelper
{
  protected SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss.SSS");
  
  protected int getLastInsertedId(JdbcTemplate jdbcTemplate, String tableName)
  {
    return jdbcTemplate.queryForObject("SELECT last_insert_id() from `"
        + 
        tableName
        +"` LIMIT 1", null, null, Integer.class);
  }
  
  protected abstract int getLastInsertedId();
}
