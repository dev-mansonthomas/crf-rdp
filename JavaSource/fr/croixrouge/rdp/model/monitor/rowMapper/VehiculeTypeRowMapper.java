package fr.croixrouge.rdp.model.monitor.rowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import fr.croixrouge.rdp.model.monitor.VehiculeType;

public class VehiculeTypeRowMapper extends RowMapperHelper implements RowMapper<VehiculeType>
{

  public VehiculeType mapRow(ResultSet rs, int rowNum) throws SQLException
  {
    VehiculeType vehiculeType = new VehiculeType();
    vehiculeType.setId   (rs.getInt   ("id_vehicule_type"   )); 
    vehiculeType.setLabel(rs.getString("label"));
    return vehiculeType;
  }
}
