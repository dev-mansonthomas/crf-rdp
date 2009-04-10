package fr.croixrouge.irp.model.monitor.rowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import fr.croixrouge.irp.model.monitor.EquipierRole;

public class EquipierRoleRowMapper extends RowMapperHelper implements RowMapper
{
  private String suffix="";
  
  public EquipierRoleRowMapper()
  {
    this.suffix = "";
  }
  
  public EquipierRoleRowMapper(String suffix)
  {
    this.suffix = suffix;
  }

  
  public Object mapRow(ResultSet rs, int rowNum) throws SQLException
  {
    EquipierRole equipierRole = new EquipierRole();
    
    equipierRole.setId   (rs.getInt    ("id_role"    +this.suffix));
    equipierRole.setLabel(rs.getString ("label_role" +this.suffix));
    
    return equipierRole;
  }

}
