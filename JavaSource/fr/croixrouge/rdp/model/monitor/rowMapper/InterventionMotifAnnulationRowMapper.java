package fr.croixrouge.rdp.model.monitor.rowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import fr.croixrouge.rdp.model.monitor.InterventionMotifAnnulation;

public class InterventionMotifAnnulationRowMapper extends RowMapperHelper implements RowMapper<InterventionMotifAnnulation>
{

  public InterventionMotifAnnulation mapRow(ResultSet rs, int rowNum) throws SQLException
  {
    InterventionMotifAnnulation interventionMotifAnnulation = new InterventionMotifAnnulation();
    interventionMotifAnnulation.setId   (rs.getInt   ("id_motif_annulation"   ));
    interventionMotifAnnulation.setLabel(rs.getString("label_motif_annulation"));
    return interventionMotifAnnulation;
  }
}
