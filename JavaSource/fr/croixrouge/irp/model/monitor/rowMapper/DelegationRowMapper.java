package fr.croixrouge.irp.model.monitor.rowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import fr.croixrouge.irp.model.monitor.Delegation;

public class DelegationRowMapper extends RowMapperHelper implements RowMapper 
{
  private String suffix = "";
  public DelegationRowMapper()
  {
  
  }
  public DelegationRowMapper(String suffix)
  {
    this.suffix = suffix;
  }
  
  public Object mapRow(ResultSet rs, int rowNum) throws SQLException
  {
    Delegation delegation = new Delegation();
    
    delegation.setIdDelegation  (rs.getInt   ("id_delegation" ));
    delegation.setNom           (rs.getString("nom"        +suffix));
    delegation.setDepartement   (rs.getString("departement"+suffix));
    
    
    return delegation;
  }

    

}
