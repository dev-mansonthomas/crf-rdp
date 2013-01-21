package fr.croixrouge.rdp.model.monitor.rowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import fr.croixrouge.rdp.model.monitor.DispositifType;

public class DispositifTypeRowMapper extends RowMapperHelper implements RowMapper<DispositifType>
{
  public DispositifType mapRow(ResultSet resultSet, int rowNum) throws SQLException
  {
    DispositifType typeDispositif = new DispositifType();
    
    typeDispositif.setId                (resultSet.getInt   ("id_type"            ));
    typeDispositif.setIdVehiculeType    (resultSet.getInt   ("id_vehicule_type"   ));
    typeDispositif.setLabel             (resultSet.getString("label_type"         ));
    typeDispositif.setNombreEquipierMax (resultSet.getInt   ("nombre_equipier_max"));  
    typeDispositif.setIdRoleLeader      (resultSet.getInt   ("id_role_leader"     ));

    return typeDispositif;
  }
}