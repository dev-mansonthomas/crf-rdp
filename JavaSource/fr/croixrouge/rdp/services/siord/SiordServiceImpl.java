package fr.croixrouge.rdp.services.siord;

import java.sql.Types;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.object.StoredProcedure;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import fr.croixrouge.rdp.model.siord.Membre;
import fr.croixrouge.rdp.model.siord.MembreCompetences;
import fr.croixrouge.rdp.model.siord.MembreImportStatus;
import fr.croixrouge.rdp.model.siord.SiordSynchro;
import fr.croixrouge.rdp.model.siord.rowMapper.MembreCompetencesRowMapper;
import fr.croixrouge.rdp.model.siord.rowMapper.PreviousSiordSynchroRowMapper;
import fr.croixrouge.rdp.services.JDBCHelper;
import fr.croixrouge.rdp.services.equipier.EquipierService;
import fr.croixrouge.rdp.services.siord.BatchPreparedStatementSetter.MembreCompetencesBatchPreparedStatementSetter;
import fr.croixrouge.rdp.services.siord.BatchPreparedStatementSetter.MembreImportStatusBatchPreparedStatementSetter;
import fr.croixrouge.rdp.services.siord.RowCallbackHandler.CrfrdpDBMembreRowCallbackHandler;
import fr.croixrouge.rdp.services.siord.RowCallbackHandler.SiordMembreRowCallbackHandler;

public class SiordServiceImpl extends JDBCHelper  implements SiordService, ApplicationContextAware
{
  private JdbcTemplate        crfrdpJdbcTemplate;
  private JdbcTemplate        siordJdbcTemplate ;
  private SiordMembreChecker  siordMembreChecker;
  private ApplicationContext  applicationContext;
  private CleanUpImportedMembreDataStoredProcedure cleanUpImportedMembreDataStoredProcedure = null;
  
  private static Logger           logger                     = Logger.getLogger(SiordServiceImpl.class);
  
  
  public SiordServiceImpl(JdbcTemplate        crfrdpJdbcTemplate,
                          JdbcTemplate        siordJdbcTemplate,
                          SiordMembreChecker  siordMembreChecker
                         )
  {
    this.crfrdpJdbcTemplate = crfrdpJdbcTemplate;
    this.siordJdbcTemplate  = siordJdbcTemplate ;
    this.siordMembreChecker = siordMembreChecker;
    this.cleanUpImportedMembreDataStoredProcedure = new CleanUpImportedMembreDataStoredProcedure(this.crfrdpJdbcTemplate);
  }
  
  /**
   * Dépendance cyclique bizarrre avec equipierService (en constructeur ou setter, ca ne marche pas)
   * */
  @Override
  public void setApplicationContext(ApplicationContext applicationContext) throws BeansException
  {
    this.applicationContext = applicationContext;
  }
   
  @Override
  protected int getLastInsertedId()
  {
    throw new IllegalAccessError("This methods must not be used");
  }
  
  
  private final static String queryStartNewSiordSynchro =
    "INSERT INTO siord_synchro              \n" +
    "(id_synchro_type, synchro_date_start)  \n" +
    "VALUES (?, ?)                          \n";
  
  
  private final static String queryForGetPreviousSessionData =
    "SELECT   `id_synchro_siord`, `synchro_date_start`, \n"+
    "         `synchro_date_end`, `last_imported_id`    \n"+
    "FROM     `siord_synchro`                           \n"+
    "WHERE    id_synchro_type   = ?                     \n"+
    "ORDER BY id_synchro_siord  DESC                    \n"+
    "LIMIT    0,1                                       \n";
    

  
  @Transactional (propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
  public SiordSynchro startNewSiordSynchro(int idSynchroType) throws Exception
  {
    SiordSynchro siordSynchro = new SiordSynchro();
    Date         currentDate  = new Date();
    
    siordSynchro.setSynchroDateStart(currentDate);
    siordSynchro.setIdSynchroType   (idSynchroType);
    
    
    
    this.crfrdpJdbcTemplate.query(  queryForGetPreviousSessionData, 
        new Object[]{idSynchroType},
        new int   []{Types.INTEGER},
        new PreviousSiordSynchroRowMapper(siordSynchro));
    
    
    
    
    
    Object [] os    = new Object[]{ 
        siordSynchro.getIdSynchroType   (),
        siordSynchro.getSynchroDateStart()
    };
    int    [] types = new int   []{ 
        Types.INTEGER                 , 
        Types.TIMESTAMP               
        };
    
    this.crfrdpJdbcTemplate.update(queryStartNewSiordSynchro, os, types);
 
    int idSynchro = this.getLastInsertedId(this.crfrdpJdbcTemplate, "siord_synchro");
    siordSynchro.setIdSynchroSiord(idSynchro);
    
    
    if(logger.isInfoEnabled())
      logger.info("Synchro SIORD started with id="+idSynchro);

    return siordSynchro;

  }

  /**
   * Récupère les users qui n'appartiennent pas a une Délégation Départementale
   * La notion de Direction Départementale est implémenter dans la table Délégation(local) du siord.
   * C'est la seule excusion qui est faite à ce niveau, afin d'avoir directement l'id_delegation du siord et éviter d'écrire plein de code pour faire le match entre délégation du siord et crfrdp
   * Exclus les membres avec droits = 999 (c'est plus de la moitié de la base)
   * */
  private final static String queryForImportDataFromSiordDatabase = 
    "SELECT m.id    , m.login       , m.pwd           , m.nom             , m.prenom       ,\n"+
    "       m.droits, m.telephone   , m.email         , m.nivol           , m.activation   ,\n"+
    "       m.sexe  , m.droits_cadre, m.id_del_urgence, md.id_delegation  , m.date_creation,\n" +
    "       m.date_modification                                                             \n"+
    "FROM   membres              as m,                                                      \n"+
    "       membres_delegations  as md,                                                     \n"+
    "       deleguations         as d                                                       \n"+
    "WHERE  ( m.id > ? OR m.date_modification > ?)                                          \n"+ //Nouveaux membres depuis la dernière syncrho ou membres modifiés
    "AND    m.droits                     != 999                                             \n"+
    "AND    m.id                          = md.id_membre                                    \n"+
    "AND    md.id_delegation              = d.id                                            \n"+
    "AND    substring(d.deleguation, 1,2)!= 'DD'                                            \n"+
    "ORDER BY m.id ASC                                                                      \n";
  
  public void importDataFromSiordDatabase(SiordSynchro siordSynchro) throws Exception
  {
    //le callback handler, insert les données extraite de la base du siord dans la base de RDP
    SiordMembreRowCallbackHandler callbackHandler = new SiordMembreRowCallbackHandler(this, siordSynchro);
    if(logger.isDebugEnabled())
    {
      logger.debug("getting all membres from SIORD DB starting from id>"+(siordSynchro.getPreviousLastImportedId())+" and date_modification>"+siordSynchro.getPreviousSynchroDateStart());
    }
    
    this.siordJdbcTemplate.query(queryForImportDataFromSiordDatabase, 
        new Object[]{siordSynchro.getPreviousLastImportedId() , siordSynchro.getPreviousSynchroDateStart()},
        new int   []{Types.INTEGER                            , Types.TIMESTAMP                           },
        callbackHandler);
  }

  
  private final static String queryForGetSiordDBMembreCompetences = 
    "SELECT id, id_membre, id_role  \n" +
    "FROM   membres_competences     \n" +
    "WHERE  id_membre = ?           \n";
    
  
  public List<MembreCompetences> getSiordDBMembreCompetences(int membreId) throws Exception
  {

    return this.siordJdbcTemplate.query(  queryForGetSiordDBMembreCompetences, 
                                          new Object[]{membreId     },
                                          new int   []{Types.INTEGER},
                                          new MembreCompetencesRowMapper(true));
  }
  
  
  
  private final static String queryForInsertMembreInCRFRDPDB = 
    "INSERT INTO siord_membres \n" +
    "   (id_synchro_siord,id,login,pwd,nom,prenom,droits,telephone,email,nivol,activation,sexe,droits_cadre,id_del_urgence,id_delegation, date_creation, date_modification, membre_update)\n" +
    "VALUES\n" +
    "   (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)\n";
  
  public void insertMembreInCRFRDPDB(SiordSynchro siordSynchro, Membre membre) throws Exception
  {
    String email  = "".equals(membre.getEmail    ())?null:membre.getEmail    ();
    String mobile = "".equals(membre.getTelephone())?null:membre.getTelephone();
    
    
    Object [] os    = new Object[]{ 
        siordSynchro.getIdSynchroSiord(),
        membre.getId                  (),
        membre.getLogin               (),
        membre.getPwd                 (),
        membre.getNom                 (),
        membre.getPrenom              (),
        membre.getDroits              (),
        mobile                          ,
        email                           ,
        membre.getNivol               (),
        membre.getActivation          (),
        membre.getSexe                (),
        membre.getDroitsCadre         (),
        membre.getIdDelUrgence        (),
        membre.getIdDelegation        (),
        membre.getDateCreation        (),
        membre.getDateModification    (),
        membre.getDateModification    ().after(siordSynchro.getPreviousSynchroDateStart())
        
    };
    int    [] types = new int   []{ 
        Types.INTEGER,
        Types.INTEGER,
        Types.VARCHAR,
        Types.VARCHAR,
        Types.VARCHAR,
        Types.VARCHAR,
        Types.INTEGER,
        Types.VARCHAR,
        Types.VARCHAR,
        Types.VARCHAR,
        Types.VARCHAR,
        Types.VARCHAR,
        Types.INTEGER,
        Types.INTEGER,
        Types.INTEGER,
        Types.TIMESTAMP,
        Types.TIMESTAMP,
        Types.BOOLEAN
        };
    
    int nbLineUpdated = this.crfrdpJdbcTemplate.update(queryForInsertMembreInCRFRDPDB, os, types);
    
    if(logger.isDebugEnabled())
      logger.debug("Membre with id='"+membre.getId()+"' has been inserted in CRF RDP DB, IdSynchroSiord='"+siordSynchro.getIdSynchroSiord()+"' (line inserted = '"+nbLineUpdated+"')");
  }
  
  
  private final static String queryForInsertMembreCompetencesInCRFRDPDB = 
    "INSERT INTO siord_membres_competences \n" +
    "   (id_synchro_siord,id,id_membre,id_role)\n" +
    "VALUES\n" +
    "   (?,?,?,?)\n";
  
  public void insertMembreCompetencesInCRFRDPDB(SiordSynchro siordSynchro, List<MembreCompetences>competences) throws Exception
  {
    MembreCompetencesBatchPreparedStatementSetter batchPreparedStatementSetter = new MembreCompetencesBatchPreparedStatementSetter(competences, siordSynchro);
    this.crfrdpJdbcTemplate.batchUpdate(queryForInsertMembreCompetencesInCRFRDPDB, batchPreparedStatementSetter);
  }
  
  
  private final static String queryForInsertImportMembreStatus = 
    "INSERT INTO siord_membres_import_status \n" +
    "   (id_synchro_siord,id,id_status,commentaire)\n" +
    "VALUES\n" +
    "   (?,?,?,?)\n";
  
  public void insertImportMembreStatus(SiordSynchro siordSynchro, int idMembre, List<MembreImportStatus> status) throws Exception
  {
    MembreImportStatusBatchPreparedStatementSetter membreImportStatusBatchPreparedStatementSetter = new MembreImportStatusBatchPreparedStatementSetter(status,siordSynchro, idMembre);
    this.crfrdpJdbcTemplate.batchUpdate(queryForInsertImportMembreStatus,membreImportStatusBatchPreparedStatementSetter);
  }
  
  
  
  
  private final static String processMembresImportedFromSiordDB = 
    "SELECT m.id    , m.login       , m.pwd           , m.nom             , m.prenom    ,   \n"+
    "       m.droits, m.telephone   , m.email         , m.nivol           , m.activation,   \n"+
    "       m.sexe  , m.droits_cadre, m.id_del_urgence, m.id_delegation   , m.date_creation,\n"+
    "       m.date_modification     , m.membre_update                                       \n"+
    "FROM   siord_membres              as m                                                 \n"+
    "WHERE  m.id_synchro_siord = ?                                                          \n"+
    "ORDER BY m.id ASC                                                                      \n";
  
  public void processMembresImportedFromSiordDB(SiordSynchro siordSynchro) throws Exception
  {
   
    
    //le callback handler check les données, pose un status d'import (echec, warning, ok), puis insert                                                 /* dépendance cyclique bizarre*/
    CrfrdpDBMembreRowCallbackHandler callbackHandler = new CrfrdpDBMembreRowCallbackHandler(this, siordSynchro, this.siordMembreChecker, (EquipierService) this.applicationContext.getBean("equipierService"));
    if(logger.isDebugEnabled())
    {
      logger.debug("getting all membres from CRFRDP DB starting from siordSynchro Session id="+siordSynchro.getIdSynchroSiord());
    }
    
    this.crfrdpJdbcTemplate.query(processMembresImportedFromSiordDB, 
        new Object[]{siordSynchro.getIdSynchroSiord()},
        new int   []{Types.INTEGER},
        callbackHandler);
  }
  
  
  private final static String queryForGetSiordCompetences=
    "SELECT   id_role                   \n"+
    "FROM     siord_membres_competences \n"+
    "WHERE  id_synchro_siord  = ?       \n"+
    "AND    id_membre         = ?       \n";
  
  public List<Integer> getSiordCompetences(SiordSynchro siordSynchro, Membre membre)
  {
    
    Object [] os    = new Object[]
                                 { 
                                    siordSynchro.getIdSynchroSiord(),
                                    membre.getId()        
                                 };
    int    [] types = new int   []
                                 { 
                                    Types.INTEGER,
                                    Types.INTEGER
                                 };
    
    return this.crfrdpJdbcTemplate.queryForList(queryForGetSiordCompetences, os, types, Integer.class);
  }
  
  
  public void cleanUpImportedMembreData(SiordSynchro siordSynchro)
  {
    if(logger.isDebugEnabled())
    {
      logger.debug("cleaning data from membre imported on SiordSynchro ID="+siordSynchro.getIdSynchroSiord());
    }
    this.cleanUpImportedMembreDataStoredProcedure.execute(siordSynchro.getIdSynchroSiord());
  }
  
  
  private final static String queryForGetDelegationIdFromSiordDelegationId = 
    "SELECT   id_delegation\n"+
    "FROM     delegation   \n"+
    "WHERE    id_siord = ? \n";
  public int getDelegationIdFromSiordDelegationId(int idDelegationSiord)
  {
    return this.crfrdpJdbcTemplate.queryForInt(queryForGetDelegationIdFromSiordDelegationId,
        new Object[]{idDelegationSiord},
        new int   []{Types.INTEGER});
  }
  
  
  private final static String queryForStoreLastImportedId = 
    "UPDATE `siord_synchro`        \n"+
    "SET     sucessfull_import = ?,\n"+
    "        last_imported_id  = ?,\n"+
    "        warning_import    = ?,\n"+
    "        failed_import     = ? \n"+
    "WHERE   id_synchro_siord  = ? \n";

  
  public void storeLastImportedId(SiordSynchro siordSynchro) throws Exception
  {
    if(logger.isDebugEnabled())
    {
      logger.debug("Storing lastImportedId and Statistics "+siordSynchro);
    }
    
    Object [] os    = new Object[]
                                 { 
                                    siordSynchro.getSucessfullImport  (),
                                    siordSynchro.getLastImportedId    (),
                                    siordSynchro.getWarningImport     (),
                                    siordSynchro.getFailedImport      (),
                                    siordSynchro.getIdSynchroSiord    ()
                                 };
    int    [] types = new int   []
                                 { 
                                    Types.INTEGER,
                                    Types.INTEGER,
                                    Types.INTEGER,
                                    Types.INTEGER,
                                    Types.INTEGER
                                 };
    
    int nbLineUpdated = this.crfrdpJdbcTemplate.update(queryForStoreLastImportedId, os, types);
    if(logger.isDebugEnabled())
    {
      logger.debug(nbLineUpdated+" lines updated - Storing lastImportedId and Statistics "+siordSynchro);
    }
  }
  
  
  class CleanUpImportedMembreDataStoredProcedure extends StoredProcedure 
  {

    private static final String STORED_PROCEDURE_NAME = "CleanUpImportedMembreData";
    private static final String TYPE_PARAM = "v_type";

    public CleanUpImportedMembreDataStoredProcedure(JdbcTemplate jdbcTemplate) 
    {
      super(jdbcTemplate, STORED_PROCEDURE_NAME);
      
      declareParameter(new SqlParameter   (TYPE_PARAM  , Types.INTEGER));
      
      compile();
    }

    public void execute(int siordSynchroId) 
    {
      Map<String, Integer> inputs = new HashMap<String, Integer>();
      inputs.put(TYPE_PARAM, siordSynchroId);
      super.execute(inputs);
        
    }
  }



}
