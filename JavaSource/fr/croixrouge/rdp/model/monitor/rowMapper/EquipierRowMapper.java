package fr.croixrouge.rdp.model.monitor.rowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import fr.croixrouge.rdp.model.monitor.Delegation;
import fr.croixrouge.rdp.model.monitor.Equipier;

public class EquipierRowMapper extends RowMapperHelper implements RowMapper<Equipier>
{
  private boolean fetchRoleInDispositif = false;
  private boolean fetchDelegation       = false;
  
  public EquipierRowMapper()
  {
  }
  public EquipierRowMapper(boolean fetchRoleInDispositif,
                           boolean fetchDelegation)
  {
    this.fetchRoleInDispositif = fetchRoleInDispositif;
    this.fetchDelegation       = fetchDelegation;
  }

  public Equipier mapRow(ResultSet rs, int rowNum) throws SQLException
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
    
    if(this.fetchDelegation)
      equipier.setDelegation      ((Delegation  )(new DelegationRowMapper("_delegation")).mapRow(rs, rowNum));
    else
      equipier.setDelegation      (new Delegation());
    
    equipier.setAutreDelegation (rs.getString ("autre_delegation"));
    
    if(this.fetchRoleInDispositif)
    {// quand on récupère la liste des équipiers du dispositif, on a id_role_en_eval qui represente le role pour lequel l'équipier est en éval 
      //(il pourrait etre candidat a l'évaluation CI et Chaffeur, mais etre en eval dans ce dispositif que pour le chauffeur.)
      equipier.setIdRoleEnEval              (rs.getInt    ("id_role_en_eval"  ));
      equipier.setEnEvaluationDansDispositif(rs.getBoolean("en_evaluation"   ));
      equipier.setIdRoleDansDispositif      (rs.getInt    ("id_role_equipier"));
    }

    
    return equipier;
  }

}
