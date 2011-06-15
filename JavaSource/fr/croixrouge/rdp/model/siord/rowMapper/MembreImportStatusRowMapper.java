package fr.croixrouge.rdp.model.siord.rowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import fr.croixrouge.rdp.model.monitor.rowMapper.RowMapperHelper;
import fr.croixrouge.rdp.model.siord.MembreImportStatus;

public class MembreImportStatusRowMapper extends RowMapperHelper implements RowMapper<MembreImportStatus>
{

  @Override
  public MembreImportStatus mapRow(ResultSet rs, int rowNum) throws SQLException
  {
    MembreImportStatus membreImportStatus = new MembreImportStatus();
    
    membreImportStatus.setIdImport    (rs.getInt    ("id_import"  ));
    membreImportStatus.setIdStatus    (rs.getInt    ("id_status"  ));
    membreImportStatus.setCommentaire (rs.getString ("commentaire"));
    
    return membreImportStatus;
  }
}
