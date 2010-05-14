package fr.croixrouge.rdp.model.monitor.rowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import fr.croixrouge.rdp.model.monitor.EquipierRole;

public class EquipierRolesRowMapper extends RowMapperHelper implements RowMapper<EquipierRole>
{
  public EquipierRolesRowMapper()
  {

  }
  
  
  public EquipierRole mapRow(ResultSet rs, int rowNum) throws SQLException
  {
    EquipierRole equipierRole = new EquipierRole();
    
    equipierRole.setId          (rs.getInt     ("id_role_equipier"));
    equipierRole.setLabel       (rs.getString  ("label_role"      ));
    equipierRole.setEnEvaluation (rs.getBoolean ("en_evaluation"   ));
    
    return equipierRole;
  }

}
