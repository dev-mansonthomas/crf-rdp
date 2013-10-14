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
    "INSERT INTO `evaluation_session`                                                                     \n"+
    "  (`id_dispositif`, `id_role_evalue`, `id_equipier_evaluateur`, `id_equipier_evalue`, `date_start`)  \n"+
    "values                                                                                               \n"+
    "  (?,?,?,?, now())                                                                                   \n";

       
  private final static String queryForUpdateEquipierEvalueRole = 
      "UPDATE equipier_roles            \n" +
      "SET    en_evaluation     = true  \n" +
      "WHERE  id_equipier       = ?     \n" +
      "AND    id_role_equipier  = ?     \n";
  
  private final static String queryForUpdateEquipierEvaluationRoleDansDispositif = 
      "UPDATE dispositif_equipiers \n"+       
      "SET   evaluation     = ?,   \n"+       
      "      id_role_eval   = ?    \n"+       
      "WHERE id_dispositif  = ?    \n"+       
      "AND   id_equipier    = ?    \n";       

  
 
  
  @Transactional (propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
  public int createEvaluationSession(EvaluationSession evaluationSession) throws Exception
  {
    
    int nbLigneUpdated = 0;
 
    Object [] os    = null; 
    int    [] types = null;
    
    // update du role évaluateur dans le dispositif
    os    = new Object[]{ Equipier.EVAL_EVALUATEUR, evaluationSession.getIdRoleEvalue() , evaluationSession.getIdDispositif() , evaluationSession.getIdEquipierEvaluateur()};
    types = new int   []{ Types.INTEGER, Types.INTEGER, Types.INTEGER       , Types.INTEGER         };
    
    nbLigneUpdated = jdbcTemplate.update(queryForUpdateEquipierEvaluationRoleDansDispositif, os, types);
    
    if(logger.isDebugEnabled())
    {
      logger.debug("createEvaluationSession - Update Role Evaluateur nbLigneUpdated='"+nbLigneUpdated+"' "+queryForUpdateEquipierEvaluationRoleDansDispositif);
    }
    
    //update du role evalué dans le dispositif
    os    = new Object[]{ Equipier.EVAL_EVALUE    , evaluationSession.getIdRoleEvalue() , evaluationSession.getIdDispositif() , evaluationSession.getIdEquipierEvalue()};
    types = new int   []{ Types.INTEGER, Types.INTEGER, Types.INTEGER       , Types.INTEGER         };
    
    nbLigneUpdated = jdbcTemplate.update(queryForUpdateEquipierEvaluationRoleDansDispositif, os, types);
    
    if(logger.isDebugEnabled())
    {
      logger.debug("createEvaluationSession - Update Role Evalué nbLigneUpdated='"+nbLigneUpdated+"' "+queryForUpdateEquipierEvaluationRoleDansDispositif);
    }
    
    //update du role evallué dans equipier_roles pour le cas de la première evaluation de la personne évaluée
    os    = new Object[]{ evaluationSession.getIdEquipierEvalue(), evaluationSession.getIdRoleEvalue() };
    types = new int   []{ Types.INTEGER, Types.INTEGER  };
    
    nbLigneUpdated = jdbcTemplate.update(queryForUpdateEquipierEvalueRole, os, types);

    if(logger.isDebugEnabled())
    {
      logger.debug("createEvaluationSession - UpdateEquipierRole => passage au statu en éval nbLigneUpdated='"+nbLigneUpdated+"' "+queryForUpdateEquipierEvalueRole);
    }
    //Création de l'évaluation session
    os    = new Object[]{ evaluationSession.getIdDispositif() , evaluationSession.getIdRoleEvalue() , evaluationSession.getIdEquipierEvaluateur(), evaluationSession.getIdEquipierEvalue()};
    types = new int   []{ Types.INTEGER, Types.INTEGER, Types.INTEGER       , Types.INTEGER         };
    
    nbLigneUpdated = jdbcTemplate.update(queryForCreateEvaluationSession, os, types);
    
    if(logger.isDebugEnabled())
    {
      logger.debug("createEvaluationSession - queryForCreateEvaluationSession nbLigneUpdated='"+nbLigneUpdated+"' "+queryForCreateEvaluationSession);
    }

    int idEvaluationSession = this.getLastInsertedId();
    evaluationSession.setIdEvaluationSession  (idEvaluationSession);
    
    if(logger.isDebugEnabled())
      logger.debug("EvaluationSession inserted with id="+idEvaluationSession);
    
    return idEvaluationSession;
  }
  
  private final static String queryForTerminerEvaluationSession = 
      "UPDATE dispositif_equipiers \n"+       
      "SET   evaluation     = 0,   \n"+       
      "      id_role_eval   = 0    \n"+       
      "WHERE id_dispositif  = ?    \n";       
  
  public final static String queryForUpdateDateFinEvaluationSession = 
      "UPDATE crfrdp.evaluation_session\n"+ 
      "SET    date_end = now()         \n"+
      "WHERE id_dispositif = ?         \n"+
      "ORDER BY date_start DESC LIMIT 1\n";
  
  public void terminerEvaluationSession(int idDispositif) throws Exception
  {
    int nbLigneUpdated = 0;
    
    Object [] os    = null; 
    int    [] types = null;

    //reset statut évaluateur/évalué des équipiers du dispositif
    os    = new Object[]{ idDispositif};
    types = new int   []{ Types.INTEGER};
    
    nbLigneUpdated =jdbcTemplate.update(queryForTerminerEvaluationSession     , os, types);
    
    if(logger.isDebugEnabled())
    {
      logger.debug("terminerEvaluationSession - queryForTerminerEvaluationSession nbLigneUpdated='"+nbLigneUpdated+"' "+queryForTerminerEvaluationSession);
    }

    
    nbLigneUpdated =jdbcTemplate.update(queryForUpdateDateFinEvaluationSession, os, types);
    
    if(logger.isDebugEnabled())
    {
      logger.debug("terminerEvaluationSession - queryForUpdateDateFinEvaluationSession nbLigneUpdated='"+nbLigneUpdated+"' "+queryForUpdateDateFinEvaluationSession);
    }

    
    
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
