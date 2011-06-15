package fr.croixrouge.rdp.model.siord.rowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import fr.croixrouge.rdp.model.monitor.rowMapper.RowMapperHelper;
import fr.croixrouge.rdp.model.siord.SiordSynchro;

public class PreviousSiordSynchroRowMapper  extends RowMapperHelper implements RowMapper<SiordSynchro>
{

  private SiordSynchro siordSynchro =  null;
  
  public PreviousSiordSynchroRowMapper(SiordSynchro siordSynchro)
  {
    this.siordSynchro= siordSynchro;
  }

  @Override
  public SiordSynchro mapRow(ResultSet rs, int rowNum) throws SQLException
  {
    siordSynchro.setPreviousIdSynchroSiord   (rs.getInt ("id_synchro_siord"   ));
    siordSynchro.setPreviousSynchroDateStart (rs.getDate("synchro_date_start" ));
    siordSynchro.setPreviousSynchroDateEnd   (rs.getDate("synchro_date_end"   ));
    siordSynchro.setPreviousLastImportedId   (rs.getInt ("last_imported_id"   ));
    
    return siordSynchro;
  }
    
}
