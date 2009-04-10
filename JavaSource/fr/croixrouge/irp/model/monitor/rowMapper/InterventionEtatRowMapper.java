package fr.croixrouge.irp.model.monitor.rowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import fr.croixrouge.irp.model.monitor.InterventionEtat;

public class InterventionEtatRowMapper extends RowMapperHelper implements RowMapper
{

  public Object mapRow(ResultSet rs, int rowNum) throws SQLException
  {
    InterventionEtat interventionEtat = new InterventionEtat();
    interventionEtat.setId   (rs.getInt   ("id_etat"   ));
    interventionEtat.setLabel(rs.getString("label_etat"));
    return interventionEtat;
  }
}
