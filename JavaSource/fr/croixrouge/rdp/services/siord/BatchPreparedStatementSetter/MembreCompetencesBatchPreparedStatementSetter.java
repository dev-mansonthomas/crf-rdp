package fr.croixrouge.rdp.services.siord.BatchPreparedStatementSetter;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

import org.springframework.jdbc.core.BatchPreparedStatementSetter;

import fr.croixrouge.rdp.model.siord.MembreCompetences;
import fr.croixrouge.rdp.model.siord.SiordSynchro;

public class MembreCompetencesBatchPreparedStatementSetter implements BatchPreparedStatementSetter
{
  private List<MembreCompetences> competences ; 
  private SiordSynchro            siordSynchro;
  
  public MembreCompetencesBatchPreparedStatementSetter(
                                                        List<MembreCompetences>competences,  
                                                        SiordSynchro siordSynchro
  )
  {
    this.competences  = competences;
    this.siordSynchro = siordSynchro;
  }
  
  
  @Override
  public void setValues(PreparedStatement ps, int i) throws SQLException
  {
    MembreCompetences competence = this.competences.get(i);
    
    ps.setInt(1, this.siordSynchro.getIdSynchroSiord ());
    ps.setInt(2, competence.getId               ());
    ps.setInt(3, competence.getIdMembre         ());
    ps.setInt(4, competence.getIdRole           ());
  }
  
  @Override
  public int getBatchSize()
  {
    return competences.size();
  }

}
