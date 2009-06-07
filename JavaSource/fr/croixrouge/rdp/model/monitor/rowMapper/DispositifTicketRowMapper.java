package fr.croixrouge.rdp.model.monitor.rowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import fr.croixrouge.rdp.model.monitor.DispositifTicket;

public class DispositifTicketRowMapper extends RowMapperHelper implements RowMapper
{

  public Object mapRow(ResultSet rs, int rowNum) throws SQLException
  {
    DispositifTicket    dispositif      = new DispositifTicket();
    
    dispositif.setDhDebut                   (rs.getTimestamp("DH_debut"         ));
    dispositif.setDhFin                     (rs.getTimestamp("DH_fin"           ));
    dispositif.setIndicatifVehicule         (rs.getString ("indicatif_vehicule" ));
    dispositif.setAutreDelegation           (rs.getString ("autre_delegation"   ));
    
    dispositif.setIdDispositif              (rs.getInt    ("id_dispositif"            ));
    dispositif.setIdDelegation              (rs.getInt    ("id_delegation_responsable"));
    dispositif.setIdTypeDispositif          (rs.getInt    ("id_type_dispositif"       ));
    dispositif.setIdEtatDispositif          (rs.getInt    ("id_etat_dispositif"       ));
    dispositif.setDisplayState              (rs.getInt    ("display_state"            ));
    
    dispositif.setCreationTerminee          (rs.getBoolean("creation_terminee"        ));
    return dispositif;
  }
}
