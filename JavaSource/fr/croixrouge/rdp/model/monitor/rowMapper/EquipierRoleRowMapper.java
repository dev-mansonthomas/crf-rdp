package fr.croixrouge.rdp.model.monitor.rowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import fr.croixrouge.rdp.model.monitor.EquipierRole;

public class EquipierRoleRowMapper extends RowMapperHelper implements RowMapper<EquipierRole>
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

  
  public EquipierRole mapRow(ResultSet rs, int rowNum) throws SQLException
  {
    EquipierRole equipierRole = new EquipierRole();
    
    equipierRole.setId        (rs.getInt    ("id_role"    +this.suffix));
    equipierRole.setLabel     (rs.getString ("label_role" +this.suffix));
    equipierRole.setEvaluable (rs.getBoolean("evaluable"  +this.suffix));
    return equipierRole;
  }

}
