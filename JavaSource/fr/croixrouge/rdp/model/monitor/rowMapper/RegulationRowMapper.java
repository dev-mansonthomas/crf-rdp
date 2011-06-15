package fr.croixrouge.rdp.model.monitor.rowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import fr.croixrouge.rdp.model.monitor.Delegation;
import fr.croixrouge.rdp.model.monitor.Equipier;
import fr.croixrouge.rdp.model.monitor.Regulation;
import fr.croixrouge.rdp.model.monitor.User;

public class RegulationRowMapper extends RowMapperHelper implements RowMapper<Regulation>
{

  public Regulation mapRow(ResultSet resultSet, int i) throws SQLException
  {
    Regulation regulation = new Regulation  ();
    User       regulateur = new User        ();
    Equipier   equipier   = new Equipier    ();
    Delegation delegation = new Delegation  ();
    
    regulateur.setEquipier  (equipier   );
    equipier  .setDelegation(delegation );
    regulation.setRegulateur(regulateur );

    
    regulation.setRegulationId      (resultSet.getInt      ("id_regulation"     ));
    regulation.setStartDate         (resultSet.getTimestamp("start_date"        ));
    regulation.setExpectedEndDate   (resultSet.getTimestamp("expected_end_date" ));
    regulation.setStartDateStr	  	(dateFormat.format	   (regulation.getStartDate      ()));
    regulation.setExpectedEndDateStr(dateFormat.format	   (regulation.getExpectedEndDate()));
    
    regulation.setOpen              (resultSet.getBoolean  ("open"             ));
    regulation.setLabel             (resultSet.getString   ("label"            ));
    regulation.setComment           (resultSet.getString   ("comment"          ));
    
    regulateur.setIdUser            (resultSet.getInt      ("id_user"          ));
    equipier.setNumNivol            (resultSet.getString   ("nivol"        ));
    equipier.setNom                 (resultSet.getString   ("nom"              ));
    equipier.setPrenom              (resultSet.getString   ("prenom"           ));
    equipier.setAutreDelegation     (resultSet.getString   ("autre_delegation" ));
  
    return regulation;
  }
    
}
