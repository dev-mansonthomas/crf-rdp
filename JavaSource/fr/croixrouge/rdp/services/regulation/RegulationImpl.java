package fr.croixrouge.rdp.services.regulation;

import java.sql.Types;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import fr.croixrouge.rdp.model.monitor.Delegation;
import fr.croixrouge.rdp.model.monitor.Regulation;
import fr.croixrouge.rdp.model.monitor.dwr.ListRange;
import fr.croixrouge.rdp.model.monitor.rowMapper.DelegationRowMapper;
import fr.croixrouge.rdp.model.monitor.rowMapper.RegulationRowMapper;
import fr.croixrouge.rdp.services.JDBCHelper;
import fr.croixrouge.rdp.services.user.UserService;

public class RegulationImpl extends JDBCHelper implements RegulationService
{
  private static Logger logger = Logger.getLogger(RegulationImpl.class);
  
  private JdbcTemplate jdbcTemplate;
  private UserService  userService;
  
  public RegulationImpl(JdbcTemplate jdbcTemplate, UserService  userService)
  {
    this.jdbcTemplate= jdbcTemplate;
    this.userService = userService ;
    
    if(logger.isDebugEnabled())
      logger.debug("constructor called");
  }
  
  protected int getLastInsertedId()
  {
    return this.getLastInsertedId(jdbcTemplate, "regulation");
  }
  
  
  private final static String selectForRegulation = 
    "SELECT r.id_regulation, r.start_date, r.expected_end_date, r.open, r.id_regulateur, r.label, r.comment,\n" +
    "       u.id_user, u.id_equipier, e.nom, e.prenom, e.num_nivol, e.autre_delegation, \n" +
    "       d.nom, d.departement\n" +
    "FROM   regulation r, user u, equipier e, delegation d\n" ;
  
  private final static String queryForGetRegulations =
    selectForRegulation+
    "WHERE  r.id_regulateur = u.id_user       \n" +
    "AND    u.id_equipier   = e.id_equipier   \n" +
    "AND    e.id_delegation = d.id_delegation \n" +
    "AND    r.open          = ?               \n" +
    "ORDER BY r.expected_end_date DESC        \n";
  
  @SuppressWarnings("unchecked")
  public List getRegulations(boolean open)
  {
    if(logger.isDebugEnabled())
      logger.debug("Getting regulations with state open="+open);
    
    return  jdbcTemplate.query( queryForGetRegulations,
                                new Object[]{open},
                                new int   []{Types.BIT},
                                new RegulationRowMapper() );
  }

  @Transactional (propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
  public void createRegulation(Regulation regulation)
  {
    /* 
    INSERT INTO regulation (`start_date` ,`expected_end_date`, `open`, `id_regulateur`, `label`, `comment`) VALUES(NOW(), ADDDATE(NOW(),1), true, 2, 'Régulation Paris', 'Régulation de Test')*/
    if(logger.isDebugEnabled())
      logger.debug("Creating a regulation : "+regulation);
    
    
    String query =  "INSERT INTO regulation " +
                    " (`start_date` ,`expected_end_date`, `open`, `id_regulateur`, `label`, `comment`)\n" +
                    " VALUES\n" +
                    " (?, ?, ?, ?, ?, ?)\n";
    
    Object [] objects = new Object[]
                                   {
                                    regulation.getStartDate(),
                                    regulation.getExpectedEndDate(),
                                    regulation.isOpen(),
                                    regulation.getRegulateur().getIdUser(),
                                    regulation.getLabel(),
                                    regulation.getComment()
                                   };
    
    int [] types = new int[]
                           {
                             Types.TIMESTAMP,
                             Types.TIMESTAMP,
                             Types.BIT,
                             Types.INTEGER,
                             Types.VARCHAR,
                             Types.VARCHAR
                           };
   
    jdbcTemplate.update(query, objects, types);
    
    regulation.setRegulationId(this.getLastInsertedId());
    
    if(logger.isDebugEnabled())
    logger.debug("regulation created with id="+regulation.getRegulationId());

    //Affecte le régulateur à la régulation
    this.userService.setRegulationToUser(regulation.getRegulateur().getIdUser(), regulation.getRegulationId());
    
  }
  
  

  
  
  private final static String queryForChangeRegulationState = "UPDATE regulation SET open=? WHERE id_regulation=?";
  public void changeRegulationState(int idRegulation, boolean open)
  {
    if(logger.isDebugEnabled())
      logger.debug("Changing State of Regulation ('"+idRegulation+"' with state open='"+open+"'");
    
    int nbOfLineUpdated = jdbcTemplate.update(queryForChangeRegulationState, new Object[]{open, idRegulation}, new int[]{Types.BIT, Types.INTEGER});
    
    if(logger.isDebugEnabled())
      logger.debug("Number of line updated="+nbOfLineUpdated);
  }
  
  private final static String queryForGetRegulation = 
  selectForRegulation+
  
  "WHERE  r.id_regulateur = u.id_user       \n" +
  "AND    u.id_equipier   = e.id_equipier   \n" +
  "AND    e.id_delegation = d.id_delegation \n" +
  "AND    r.id_regulation = ?               \n" ;
  
  public Regulation getRegulation(int idRegulation)
  {
    if(logger.isDebugEnabled())
      logger.debug("Getting regulation with id="+idRegulation);

    return jdbcTemplate.queryForObject 
                          ( queryForGetRegulation,
                            new Object[]{idRegulation},
                            new int []{Types.INTEGER},
                            new RegulationRowMapper() );
  }

 



  private final static String queryForGetDelegationsByZipCode = 
    "SELECT  id_delegation, nom, departement \n";
    
    
  private final static String whereForSearchDelegation =
    
    "FROM    delegation                      \n"+
    "WHERE   departement         LIKE ?      \n" +
    "OR      nom                 LIKE CONVERT(_utf8 ? USING utf8) COLLATE utf8_general_ci \n";
    
  private final static String secondPartForSearchDelegation =
    "UNION                                   \n"+
    "SELECT  id_delegation, 'Autre délégation' as nom, departement \n"+
    "FROM    delegation                      \n"+
    "WHERE   id_delegation = 0               \n"+
    "ORDER BY departement ASC                \n";
  
  
  public ListRange<Delegation> searchDelegation(String search, int start, int limit)
  {
    search+="%";
    
    Object [] os    =  new Object[]{search       , search       };
    int    [] types =  new int   []{Types.VARCHAR, Types.VARCHAR};
    
    
    int totalCount = this.jdbcTemplate.queryForInt(
                      "SELECT COUNT(1)+1 \n" +whereForSearchDelegation, 
                      os, types);
    

    String query = queryForGetDelegationsByZipCode + "from (\n"+
    queryForGetDelegationsByZipCode +
    whereForSearchDelegation        +
    secondPartForSearchDelegation   + "\n) uniontable\n"+
    "order by departement asc\n"+
    "LIMIT "+start+", "+limit;

    if(logger.isDebugEnabled())
      logger.debug("Searching delegations with this parameter : search='"+search+"%', start='"+start+"', limit='"+limit+"', totalCout='"+totalCount+"', query=\n"+query);

    
    List<Delegation> delegations = jdbcTemplate.query(query
                                                      , os, types, new DelegationRowMapper());
    
    
    return new ListRange<Delegation>(totalCount, delegations);
  }
  

  private final static     String queryForCreateDelegation = 
    "INSERT INTO delegation \n" +
    " (nom, departement)\n" +
    "VALUES\n" +
    " ( ?, ?)\n";
  public void createDelegation(Delegation delegation)
  {
    
    Object [] os    = new Object[]{ delegation.getNom() , delegation.getDepartement() };
    int    [] types = new int   []{ Types.VARCHAR       , Types.VARCHAR               };
    
    jdbcTemplate.update(queryForCreateDelegation, os, types);
    
    delegation.setIdDelegation(this.getLastInsertedId());
    
    if(logger.isDebugEnabled())
      logger.debug("delegation created with id="+delegation.getIdDelegation());
  }
}