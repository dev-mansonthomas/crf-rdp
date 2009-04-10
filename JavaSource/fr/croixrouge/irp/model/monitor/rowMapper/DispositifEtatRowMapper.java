package fr.croixrouge.irp.model.monitor.rowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import fr.croixrouge.irp.model.monitor.DispositifEtat;

public class DispositifEtatRowMapper extends RowMapperHelper implements RowMapper
{
  public Object mapRow(ResultSet resultSet, int rowNum) throws SQLException
  {
    DispositifEtat dispositifEtat = new DispositifEtat();
    
    dispositifEtat.setId    (resultSet.getInt   ("id_etat"   ));
    dispositifEtat.setLabel (resultSet.getString("label_etat"));        

    return dispositifEtat;
  }
}