package fr.croixrouge.irp.model.monitor.rowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import fr.croixrouge.irp.model.monitor.DispositifType;

public class DispositifTypeRowMapper extends RowMapperHelper implements RowMapper
{
  public Object mapRow(ResultSet resultSet, int rowNum) throws SQLException
  {
    DispositifType typeDispositif = new DispositifType();
    
    typeDispositif.setId    (resultSet.getInt   ("id_type"   ));
    typeDispositif.setLabel (resultSet.getString("label_type"));        

    return typeDispositif;
  }
}