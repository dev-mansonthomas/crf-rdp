package fr.croixrouge.rdp.services.regulation;

import java.sql.Types;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import fr.croixrouge.rdp.model.monitor.Delegation;
import fr.croixrouge.rdp.model.monitor.Regulation;
import fr.croixrouge.rdp.model.monitor.User;
import fr.croixrouge.rdp.model.monitor.dwr.ListRange;
import fr.croixrouge.rdp.model.monitor.rowMapper.DelegationRowMapper;
import fr.croixrouge.rdp.model.monitor.rowMapper.RegulationRowMapper;
import fr.croixrouge.rdp.model.monitor.rowMapper.UserRowMapper;
import fr.croixrouge.rdp.services.JDBCHelper;

public class RegulationImpl extends JDBCHelper implements RegulationService
{
  private static Logger logger = Logger.getLogger(RegulationImpl.class);
  private JdbcTemplate jdbcTemplate;
  
  public RegulationImpl(JdbcTemplate jdbcTemplate)
  {
    this.jdbcTemplate=jdbcTemplate;
    if(logger.isDebugEnabled())
      logger.debug("constructor called");
  }
  private int getLastInsertedId()
  {
    return this.getLastInsertedId(jdbcTemplate, "regulation");
  }
  
  
  private final static String selectForRegulation = 
    "SELECT r.id_regulation, r.start_date, r.expected_end_date, r.open, r.id_regulateur, r.label, r.comment,\n" +
    "       u.id_user, u.nom, u.prenom, u.num_nivol, u.autre_delegation, u.id_role, \n" +
    "       d.nom, d.departement\n" +
    "FROM   regulation r, user u, delegation d\n" ;
  
  private final static String queryForGetRegulations =
    selectForRegulation+
    "WHERE  r.id_regulateur = u.id_user\n" +
    "AND    u.id_delegation = d.id_delegation\n" +
    "AND    r.open          = ?\n" +
    "ORDER BY r.expected_end_date DESC\n";
  
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
    this.setRegulationToUser(regulation.getRegulateur().getIdUser(), regulation.getRegulationId());
    
  }
  
  
  private final static String selectForUser = 
    "SELECT   u.id_user, u.num_nivol, u.user_is_male, u.nom, u.prenom, u.mobile, u.email, u.autre_delegation, u.id_delegation, \n" +
    "         d.nom AS delegation_nom, u.id_role\n"+
    "FROM     `user` u, `delegation` d\n";
    
  
  private final static String queryWithNivolAndName = 
    selectForUser+
    "WHERE    u.id_role         <= 3            \n"+
    "AND      u.id_regulation    = 0            \n"+
    "AND      u.num_nivol       like ?          \n"+
    "AND      u.nom             like ?          \n"+
    "AND      u.id_delegation = d.id_delegation \n"+
    "ORDER BY id_role DESC, num_nivol ASC       \n";  

  private final static String queryWithName =
    selectForUser+
  "WHERE    u.id_role         <= 3            \n"+
  "AND      u.id_regulation    = 0            \n"+
  "AND      u.nom             like ?          \n"+
  "AND      u.id_delegation = d.id_delegation \n"+
  "ORDER BY id_role DESC, num_nivol ASC       \n";
  
  private final static String queryWithNivol =
    selectForUser+
  "WHERE    u.id_role         <= 3            \n"+
  "AND      u.id_regulation    = 0            \n"+
  "AND      u.num_nivol       like ?          \n"+
  "AND      u.id_delegation = d.id_delegation \n"+
  "ORDER BY id_role DESC, num_nivol ASC       \n"; 

  
  /**
   * Méthode utilisé pour l'autocomplete pour rechercer un co régulateur par nom ou n° nivol
   * */
  public List<User> getCoRegulateurs(String numNivol, String nom)
  { 
    if(logger.isDebugEnabled())
      logger.debug("Getting CoRegulateur with these parameters : numNivol='"+numNivol+"%' nom='"+nom+"%'");
    
    boolean nivolNull = numNivol == null || numNivol.equals(""); 
    boolean nameNull  = nom      == null || nom.equals     ("");
    
    if(nivolNull && nameNull)
    {
      nivolNull = false;
      numNivol="";
    }
    
    String    query   = null;
    Object [] objects = null;
    int    [] types   = null;
    
    if(!nameNull && !nivolNull)
    {
      query   = queryWithNivolAndName;
      objects = new Object[]{numNivol+"%", nom+"%"};
      types   = new int   []{Types.VARCHAR,Types.VARCHAR};
    }
    else if(!nameNull)
    {
      query   = queryWithName;
      objects = new Object[]{nom+"%"};
      types   = new int   []{Types.VARCHAR};
    }
    else
    {
      query   = queryWithNivol;
      objects = new Object[]{numNivol+"%"};
      types   = new int   []{Types.VARCHAR};
    }

    List<User> coRegulateurList = jdbcTemplate.query( query, objects, types, new UserRowMapper(false));
    
    return coRegulateurList;
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
  "WHERE  r.id_regulateur = u.id_user\n" +
  "AND    u.id_delegation = d.id_delegation\n" +
  "AND    r.id_regulation = ?\n" +
  "ORDER BY r.expected_end_date DESC\n";
  
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

  private final static String queryForGetRegulateur = 
    selectForUser + 
    "WHERE  u.id_regulation =  0               \n"+
    "AND    u.id_role       <= 2               \n"+
    "AND    u.id_delegation =  d.id_delegation \n"+
    "ORDER BY nom ASC\n";
  
  public List<User> getRegulateur()
  {
    return this.jdbcTemplate.query( queryForGetRegulateur, 
                                                null, 
                                                null, 
                                                new UserRowMapper(false));
  }

  private final static String queryForGetCoRegulateurs = 
    "SELECT u.id_user       , u.num_nivol, u.user_is_male, u.nom     , u.prenom          , u.mobile, u.email, \n" +
    "       u.id_delegation , u.autre_delegation, u.id_role ,\n" +
    "       d.nom as delegation_nom\n" +
    "FROM   `user` u, `delegation` d\n"+
    "WHERE  u.id_regulation =  ?               \n"+
    "AND    u.id_role       <= 3               \n"+
    "AND    u.id_delegation =  d.id_delegation \n"+
    "ORDER BY nom ASC\n";

  
  public void getCoRegulateurs(Regulation regulation)
  {
    List<User> coRegulateurs = this.jdbcTemplate.query( queryForGetCoRegulateurs, 
                                                new Object[]{regulation.getRegulationId()}, 
                                                new int[]{Types.INTEGER}, 
                                                new UserRowMapper(false));
    regulation.setCoRegulateurs(coRegulateurs);
  }

  private final static String queryForSetRegulationToUser = 
    "UPDATE user \n" +
    "SET    id_regulation = ?\n" +
    "WHERE  id_user       = ?\n";
  
  public void setRegulationToUser(int idUser, int idRegulation)
  {
    this.jdbcTemplate.update(queryForSetRegulationToUser, new Object[]{idRegulation, idUser}, new int[]{Types.INTEGER, Types.INTEGER});
  }

  private final static String queryForCreateUser =
    "INSERT INTO `user`\n"+
    " ( `num_nivol`     , `user_is_male`    , `nom`    , `prenom` ,\n"+
    "   `id_delegation` , `autre_delegation`, `id_role`,\n"+
    "   `id_regulation` \n"+
    " )\n"+
    "VALUES\n"+
    " (?, ?, ?, ?, ?, ?, 0 )\n";

  
  public void createUser(User user)
  {
    
    Object[] os = new Object[]
               {
                 user.getNivol(),
                 user.isHomme(),
                 user.getNom(),
                 user.getPrenom(),
                 user.getDelegation().getIdDelegation(),
                 user.getAutreDelegation(),
                 user.getIdRole()
              };  
    int  [] types = new int[]
                   {
                     Types.VARCHAR,
                     Types.BIT,
                     Types.VARCHAR,
                     Types.VARCHAR,
                     Types.INTEGER,
                     Types.VARCHAR,
                     Types.INTEGER
                   };
    jdbcTemplate.update(queryForCreateUser, os, types);
    
    int lastInsertId = this.getLastInsertedId();
    
    user.setIdUser(lastInsertId);
    
    if(logger.isDebugEnabled())
      logger.debug("user created with id="+lastInsertId);
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