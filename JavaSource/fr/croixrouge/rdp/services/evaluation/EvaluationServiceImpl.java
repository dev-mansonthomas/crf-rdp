package fr.croixrouge.rdp.services.evaluation;

import java.sql.Types;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import fr.croixrouge.rdp.model.monitor.Equipier;
import fr.croixrouge.rdp.model.monitor.EvaluationSession;
import fr.croixrouge.rdp.model.monitor.rowMapper.EquipierRowMapper;
import fr.croixrouge.rdp.services.JDBCHelper;
import fr.croixrouge.rdp.services.equipier.EquipierServiceImpl;

public class EvaluationServiceImpl extends JDBCHelper implements EvaluationService
{
  
  private static final int ID_ROLE_PSE2 = 9;
  
  private static Log          logger              = LogFactory.getLog(EvaluationServiceImpl.class); 
  private JdbcTemplate jdbcTemplate;
  
  public EvaluationServiceImpl(JdbcTemplate jdbcTemplate)
  {
    this.jdbcTemplate = jdbcTemplate;
  }
  
  
  private final static String queryForCreateEvaluationSession =
      "INSERT INTO `intervention`\n"+
      "  (`id_dispositif`, `id_origine`, `id_motif`, `id_motif_annulation`, `id_regulation`, `DH_saisie`, `DH_reception`, `num_inter`)\n"+
      "VALUES\n"+
      "  ( 0, 0, 0, 0, ?, ?,?, 0)\n";
       
  
  @Transactional (propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
  public int createEvaluationSession(EvaluationSession evaluationSession) throws Exception
  {
    //TODO : si l'évalué n'a pas encore ce role évalué, alors il faut mettre le role en évaluation.
    
    
    Object [] os    = new Object[]{ evaluationSession.getIdDispositif() , evaluationSession.getIdRoleEvalue() , evaluationSession.getIdEquipierEvaluateur(), evaluationSession.getIdEquipierEvalue()};
    int    [] types = new int   []{ Types.INTEGER, Types.INTEGER, Types.INTEGER       , Types.INTEGER         };
    
    jdbcTemplate.update(queryForCreateEvaluationSession, os, types);

    int idEvaluationSession = this.getLastInsertedId();
    evaluationSession.setIdEvaluationSession  (idEvaluationSession);
    
    if(logger.isDebugEnabled())
      logger.debug("EvaluationSession inserted with id="+idEvaluationSession);
    
    return idEvaluationSession;
  }
  

  
  
  
  private final static String queryForGetRolesEvaluateurFromDispositif =
      "SELECT  er.id_role_equipier                \n"+
      "FROM    equipier_roles       as er         \n"+
      "WHERE   er.id_equipier   = ?               \n"+
      "AND     er.evaluateur    = true            \n";
  
  @Override
  public List<Integer> getRolesEvaluateurFromEquipier(int idEquipier) throws Exception
  {

    if(logger.isDebugEnabled())
      logger.debug("getRolesEvaluableFromDispositif with idEquipier='"+idEquipier+"'");

    return this.jdbcTemplate.queryForList( queryForGetRolesEvaluateurFromDispositif, 
        new Object[]{idEquipier       }, 
        new int   []{Types.INTEGER    },
        Integer.class
      );
    
  }

  private final static String queryForGetIdEquipierEvaluateurForRole = 
      EquipierServiceImpl.equipierSelect+
          "FROM  equipier             as e,                     \n"+
          "      dispositif_equipiers as de                     \n"+
          "WHERE de.id_dispositif    = ?                        \n"+
          "AND   de.id_role_equipier = "+ID_ROLE_PSE2+"         \n"+
          "AND   de.id_equipier      =  e.id_equipier           \n";
  
  @Override
  public List<Equipier>  getIdEquipierEvaluableForRole(int idDispositif, int idRole) throws Exception
  {
    if(logger.isDebugEnabled())
      logger.debug("getIdEquipierEvaluateurForRole with idDispositif='"+idDispositif+"' idRole='"+idRole+"' (currently only searching Equipier with Role PSE2 in Dispositif)");

    
    List<Equipier> equipierList = jdbcTemplate.query( queryForGetIdEquipierEvaluateurForRole ,
        new Object[]{idDispositif     }, 
        new int   []{Types.INTEGER    },
        new EquipierRowMapper(false, false));
    
    return equipierList;
    

  }



  @Override
  protected int getLastInsertedId()
  {
    return this.getLastInsertedId(jdbcTemplate, "evaluation_session");
  }

}
