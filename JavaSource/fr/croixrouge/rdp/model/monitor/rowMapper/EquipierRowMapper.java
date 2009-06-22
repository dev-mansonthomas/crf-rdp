package fr.croixrouge.rdp.model.monitor.rowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import fr.croixrouge.rdp.model.monitor.Delegation;
import fr.croixrouge.rdp.model.monitor.Equipier;

public class EquipierRowMapper extends RowMapperHelper implements RowMapper
{
  private boolean fetchRoleInDispositif = false;
  public EquipierRowMapper()
  {
  }
  public EquipierRowMapper(boolean fetchRoleInDispositif)
  {
    this.fetchRoleInDispositif = fetchRoleInDispositif;
  }

  public Object mapRow(ResultSet rs, int rowNum) throws SQLException
  {
    Equipier equipier = new Equipier();
    
    equipier.setIdEquipier      (rs.getInt    ("id_equipier"  ));
    equipier.setIdDispositif    (rs.getInt    ("id_dispositif"));
    
    equipier.setHomme           (rs.getBoolean("equipier_is_male"));
    equipier.setEnabled         (rs.getBoolean("enabled"));
    
    equipier.setNumNivol        (rs.getString ("num_nivol"    ));
    equipier.setNom             (rs.getString ("nom"          ));
    equipier.setPrenom          (rs.getString ("prenom"       ));
    equipier.setMobile          (rs.getString ("mobile"       ));
    equipier.setEmail           (rs.getString ("email"        ));

    equipier.setDelegation      ((Delegation  )(new DelegationRowMapper("_delegation")).mapRow(rs, rowNum));
    equipier.setAutreDelegation (rs.getString ("autre_delegation"));
    
    if(this.fetchRoleInDispositif)
    {
      equipier.setIdRoleDansDispositif      (rs.getInt    ("id_role_equipier"));
      equipier.setEnEvaluationDansDispositif(rs.getBoolean("en_evaluation"   ));
    }
    return equipier;
  }

}
