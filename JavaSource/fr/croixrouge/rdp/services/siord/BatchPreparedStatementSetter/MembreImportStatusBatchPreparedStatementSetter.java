package fr.croixrouge.rdp.services.siord.BatchPreparedStatementSetter;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

import org.springframework.jdbc.core.BatchPreparedStatementSetter;

import fr.croixrouge.rdp.model.siord.MembreImportStatus;
import fr.croixrouge.rdp.model.siord.SiordSynchro;

public class MembreImportStatusBatchPreparedStatementSetter implements BatchPreparedStatementSetter
{
  private List<MembreImportStatus>  status ; 
  private SiordSynchro              siordSynchro;
  private int                       idMembre;
  
  public MembreImportStatusBatchPreparedStatementSetter(
                                                        List<MembreImportStatus>  status      ,  
                                                        SiordSynchro              siordSynchro,
                                                        int                       idMembre
  )
  {
    this.status       = status      ;
    this.siordSynchro = siordSynchro;
    this.idMembre     = idMembre    ;
  }
  
  
  @Override
  public void setValues(PreparedStatement ps, int i) throws SQLException
  {
    MembreImportStatus status = this.status.get(i);
    
    ps.setInt   (1, this.siordSynchro.getIdSynchroSiord());
    ps.setInt   (2, this.idMembre                        );
    ps.setInt   (3, status.getIdStatus                 ());
    ps.setString(4, status.getCommentaire              ());
  }
  
  @Override
  public int getBatchSize()
  {
    return status.size();
  }

}
