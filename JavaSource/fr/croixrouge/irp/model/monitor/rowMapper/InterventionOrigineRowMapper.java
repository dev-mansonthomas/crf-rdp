package fr.croixrouge.irp.model.monitor.rowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import fr.croixrouge.irp.model.monitor.InterventionOrigine;

public class InterventionOrigineRowMapper extends RowMapperHelper implements RowMapper
{

  public Object mapRow(ResultSet rs, int rowNum) throws SQLException
  {
    InterventionOrigine interventionOrigine = new InterventionOrigine();
    interventionOrigine.setId   (rs.getInt("id_origine"));
    interventionOrigine.setLabel(rs.getString("label_origine"));
    return interventionOrigine;
  }
}
