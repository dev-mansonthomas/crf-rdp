package fr.croixrouge.rdp.model.siord.rowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import fr.croixrouge.rdp.model.monitor.rowMapper.RowMapperHelper;
import fr.croixrouge.rdp.model.siord.MembreCompetences;

public class MembreCompetencesRowMapper  extends RowMapperHelper implements RowMapper<MembreCompetences>
{
  private boolean siordDbSelect = false;
  
  public MembreCompetencesRowMapper(boolean siordDbSelect)
  {
    this.siordDbSelect = siordDbSelect;
  }

  @Override
  public MembreCompetences mapRow(ResultSet rs, int rowNum) throws SQLException
  {
    MembreCompetences membreCompetences = new MembreCompetences();
    
    if(!this.siordDbSelect)
    {
      membreCompetences.setIdImport (rs.getInt("id_synchro_siord"));  
    }
    
    membreCompetences.setId       (rs.getInt("id"        )); 
    membreCompetences.setIdMembre (rs.getInt("id_membre" ));
    membreCompetences.setIdRole   (rs.getInt("id_role"   ));
    
    return membreCompetences;
  }

}
