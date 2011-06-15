package fr.croixrouge.rdp.model.siord.rowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import fr.croixrouge.rdp.model.monitor.rowMapper.RowMapperHelper;
import fr.croixrouge.rdp.model.siord.SiordSynchro;

public class SiordSynchroRowMapper  extends RowMapperHelper implements RowMapper<SiordSynchro>
{

  @Override
  public SiordSynchro mapRow(ResultSet rs, int rowNum) throws SQLException
  {
    SiordSynchro siordSynchro =  new SiordSynchro();

    siordSynchro.setIdSynchroSiord   (rs.getInt ("id_synchro_siord"  ));
    siordSynchro.setIdSynchroType    (rs.getInt ("id_synchro_type"   ));
    siordSynchro.setSynchroDateStart (rs.getDate("synchro_date_start"));
    siordSynchro.setSynchroDateEnd   (rs.getDate("synchro_date_end"  ));
    siordSynchro.setLastImportedId   (rs.getInt ("last_imported_id"  ));
    siordSynchro.setSucessfullImport (rs.getInt ("sucessfull_import" ));
    siordSynchro.setWarningImport    (rs.getInt ("warning_import"    ));
    siordSynchro.setFailedImport     (rs.getInt ("failed_import"     ));
    
    return siordSynchro;
  }
    
}
