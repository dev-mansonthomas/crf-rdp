package fr.croixrouge.rdp.services.siord.RowCallbackHandler;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.jdbc.core.RowCallbackHandler;

import fr.croixrouge.rdp.model.siord.Membre;
import fr.croixrouge.rdp.model.siord.MembreCompetences;
import fr.croixrouge.rdp.model.siord.SiordSynchro;
import fr.croixrouge.rdp.model.siord.rowMapper.MembreRowMapper;
import fr.croixrouge.rdp.services.siord.SiordService;

public class SiordMembreRowCallbackHandler implements RowCallbackHandler
{
  private SiordService    siordService;
  private SiordSynchro    siordSynchro;
  private MembreRowMapper membreRowMapper = new MembreRowMapper(true);
  private static Logger   logger          = Logger.getLogger(SiordMembreRowCallbackHandler.class);
  
  
  public SiordMembreRowCallbackHandler(SiordService    siordService, SiordSynchro siordSynchro)
  {
    this.siordService = siordService;
    this.siordSynchro = siordSynchro;

  }
  /**
   * Lit la table siord.membre et pour chaque ligne, l'insert dans la table crfrdp.siord_membre
   * puis lit la table siord.membre_competence et insert les lignes dans la table crfrdp.siord_membre_competence (batch update)
   * */
  @Override
  public void processRow(ResultSet rs) throws SQLException
  {
    if(logger.isDebugEnabled())
    {
      logger.debug("Importing a new membre from Siord DB row number:"+rs.getRow());
    }
    
    Membre membre = membreRowMapper.mapRow(rs, 0);
    
    try
    {
      this.siordService.insertMembreInCRFRDPDB(this.siordSynchro, membre);
    }
    catch (Exception e)
    {
      String msg = "Error while inserting in CRFRDP DB the membre with id='"+membre.getId()+"' (IDSIORD DB)";
      logger.error(msg,e);
     
      throw new SQLException(msg,e);
    }
    
    
    List<MembreCompetences> competences = null;
    try
    {
      competences = this.siordService.getSiordDBMembreCompetences(membre.getId());
    }
    catch (Exception e)
    {
      String msg ="Error while fetching competences for membre with id='"+membre.getId()+"' (SIORD DB)";
      logger.error(msg,e);
      throw new SQLException(msg,e);
    }
    
    try
    {
      if(competences != null && competences.size()>0)
      {
        this.siordService.insertMembreCompetencesInCRFRDPDB(this.siordSynchro, competences );  
      }
    }
    catch (Exception e)
    {
      String msg ="Error while inserting in CRFRDP DB the membre's competences for membre with id='"+membre.getId()+"' (SIORD DB)";
      logger.error(msg,e);
      throw new SQLException(msg,e);
    }
    
    if(logger.isDebugEnabled())
    {
      logger.debug("End of Importing a new membre from Siord DB row number:"+rs.getRow());
    }
    
  }
}
