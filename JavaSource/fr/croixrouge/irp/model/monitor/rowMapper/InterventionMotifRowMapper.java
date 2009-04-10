package fr.croixrouge.irp.model.monitor.rowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import fr.croixrouge.irp.model.monitor.InterventionMotif;

public class InterventionMotifRowMapper extends RowMapperHelper implements RowMapper
{

  public Object mapRow(ResultSet rs, int rowNum) throws SQLException
  {
    InterventionMotif interventionMotif = new InterventionMotif();
    interventionMotif.setId   (rs.getInt("id_motif"));
    interventionMotif.setLabel(rs.getString("label_motif"));
    return interventionMotif;
  }
}
