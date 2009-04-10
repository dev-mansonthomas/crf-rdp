package fr.croixrouge.irp.model.monitor.rowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import org.springframework.jdbc.core.RowMapper;

import fr.croixrouge.irp.model.monitor.Equipier;

public class DispositifEquipierIdAndRoleRowMapper extends RowMapperHelper implements RowMapper
{

  public Object mapRow(ResultSet rs, int rowNum) throws SQLException
  {
    ArrayList<Equipier> listEquipier = new ArrayList<Equipier>(5);
    
    Equipier  tmpEquipier     = null;
    int       tmpEquipierId   = 0;
    
    tmpEquipierId   = rs.getInt("equipier_1_id"  );
    if(tmpEquipierId>0)
    {
      tmpEquipier     = new Equipier();
      tmpEquipier.setIdEquipier           (tmpEquipierId);
      tmpEquipier.setIdRoleDansDispositif (rs.getInt("equipier_1_role"  ));
      tmpEquipier.setEquipierRank(1);
      listEquipier.add(tmpEquipier);
    }
    
    tmpEquipierId   = rs.getInt("equipier_2_id"  );
    if(tmpEquipierId>0)
    {
      tmpEquipier     = new Equipier();
      tmpEquipier.setIdEquipier(tmpEquipierId);
      tmpEquipier.setIdRoleDansDispositif (rs.getInt("equipier_2_role"  ));
      tmpEquipier.setEquipierRank(2);
      listEquipier.add(tmpEquipier);
    }

    tmpEquipierId   = rs.getInt("equipier_3_id"  );
    if(tmpEquipierId>0)
    {
      tmpEquipier     = new Equipier();
      tmpEquipier.setIdEquipier(tmpEquipierId);
      tmpEquipier.setIdRoleDansDispositif (rs.getInt("equipier_3_role"  ));
      tmpEquipier.setEquipierRank(3);
      listEquipier.add(tmpEquipier);
    }
    tmpEquipierId   = rs.getInt("equipier_4_id"  );
    if(tmpEquipierId>0)
    {
      tmpEquipier     = new Equipier();
      tmpEquipier.setIdEquipier(tmpEquipierId);
      tmpEquipier.setIdRoleDansDispositif (rs.getInt("equipier_4_role"  ));
      tmpEquipier.setEquipierRank(4);
      listEquipier.add(tmpEquipier);
    }

    tmpEquipierId   = rs.getInt("equipier_5_id"  );
    if(tmpEquipierId>0)
    {
      tmpEquipier     = new Equipier();
      tmpEquipier.setIdEquipier(tmpEquipierId);
      tmpEquipier.setIdRoleDansDispositif (rs.getInt("equipier_5_role"  ));
      tmpEquipier.setEquipierRank(5);
      listEquipier.add(tmpEquipier);
    }
    return listEquipier;
  }
}
