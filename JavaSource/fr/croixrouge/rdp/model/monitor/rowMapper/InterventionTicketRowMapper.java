package fr.croixrouge.rdp.model.monitor.rowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import fr.croixrouge.rdp.model.monitor.InterventionTicket;
import fr.croixrouge.rdp.model.monitor.Position;

public class InterventionTicketRowMapper extends RowMapperHelper implements RowMapper<InterventionTicket>
{

  public InterventionTicket mapRow(ResultSet rs, int rowNum) throws SQLException
  {
    InterventionTicket interventionTicket = new InterventionTicket();
    
    interventionTicket.setIdIntervention            (rs.getInt("id_intervention"  ));           
    interventionTicket.setIdDispositif              (rs.getInt("id_dispositif"    ));
    interventionTicket.setIdRegulation              (rs.getInt("id_regulation"    ));
    interventionTicket.setIdOrigine                 (rs.getInt("id_origine"       ));           
    interventionTicket.setIdMotif                   (rs.getInt("id_motif"         ));           
    interventionTicket.setIdEtat                    (rs.getInt("id_etat"          )); 
    
    interventionTicket.setDhSaisie                  (rs.getTimestamp("DH_saisie"           ));
    
    Position position = interventionTicket.getPosition();
    
    position.setGoogleCoordsLat                     (rs.getFloat("google_coords_lat"       ));
    position.setGoogleCoordsLong                    (rs.getFloat("google_coords_long"      ));
    position.setRue                                 (rs.getString ("rue"                   ));
    position.setCodePostal                          (rs.getString ("code_postal"           ));
    position.setVille                               (rs.getString ("ville"                 ));

    interventionTicket.setBatiment                  (rs.getString ("batiment"              ));
    interventionTicket.setEtage                     (rs.getString ("etage"                 ));
    interventionTicket.setPorte                     (rs.getString ("porte"                 ));
    interventionTicket.setComplementAdresse         (rs.getString ("complement_adresse"    ));
    interventionTicket.setComplementMotif           (rs.getString ("complement_motif"      ));
    
    interventionTicket.setVictimeHomme              (rs.getBoolean("homme_victime"         ));
    interventionTicket.setNomVictime                (rs.getString ("nom_victime"           ));
    interventionTicket.setNomContactSurPlace        (rs.getString ("nom_contact_sur_place" ));
    interventionTicket.setCoordonneesContactSurPlace(rs.getString ("coordonnees_contact"   ));
    
    interventionTicket.setInterventionBusinessId    (rs.getString ("num_inter"             ));
    
    return interventionTicket;
  }
}
