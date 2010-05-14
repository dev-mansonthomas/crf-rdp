package fr.croixrouge.rdp.services.user;

import java.sql.Types;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;

import fr.croixrouge.rdp.model.monitor.Regulation;
import fr.croixrouge.rdp.model.monitor.User;
import fr.croixrouge.rdp.model.monitor.UserRole;
import fr.croixrouge.rdp.model.monitor.rowMapper.UserRoleRowMapper;
import fr.croixrouge.rdp.model.monitor.rowMapper.UserRowMapper;
import fr.croixrouge.rdp.services.JDBCHelper;

public class UserServiceImpl extends JDBCHelper implements UserService
{
  private final static String tableName = "user";
  
  private static Logger logger = Logger.getLogger(UserServiceImpl.class);
  private JdbcTemplate jdbcTemplate;
  
  
  public UserServiceImpl(JdbcTemplate jdbcTemplate)
  {
    this.jdbcTemplate = jdbcTemplate;
    
    if(logger.isDebugEnabled())
      logger.debug("constructor called");
  }

  
  private final static String queryForAuthenticate = 
    "SELECT   u.id_user, e.id_equipier, e.id_dispositif, u.enabled, e.num_nivol, e.equipier_is_male, e.nom, e.prenom, e.email, e.mobile, e.autre_delegation, e.id_delegation, \n" +
    "         d.nom AS nom_delegation, d.departement AS departement_delegation, u.password, md5(?) as challenge_password, u.id_regulation, u.id_role_in_regulation            \n" +
    "FROM     `user` u, `delegation` d, `equipier` e \n"+
    "WHERE    e.num_nivol        = ?                 \n"+
    "AND      u.id_equipier      = e.id_equipier     \n"+
    "AND      e.id_delegation    = d.id_delegation   \n";  
  
  public User authenticateUser(String username, String password)
  {
    Object[] os     = new Object[]{password     , username     };
    int   [] types  = new int   []{Types.VARCHAR, Types.VARCHAR};
    
    
    User user = null;
    try
    {
      user = (User)jdbcTemplate.queryForObject(queryForAuthenticate, os, types, new UserRowMapper(true, true)); 
    }
    catch(EmptyResultDataAccessException e)
    {
      
    }
    
    return user;
  }
  
  
  
  
  
  
  
  private final static String selectForUserWithEquipier = 
    "SELECT   u.id_user, e.num_nivol, e.equipier_is_male, e.nom, e.prenom, e.mobile, e.email, e.autre_delegation, e.id_delegation, \n" +
    "         d.nom AS delegation_nom, u.id_regulation, u.id_role_in_regulation\n"+
    "FROM     `user` u, `equipier` e, delegation` d\n";
  
  
  private final static String selectForUser = 
    "SELECT u.id_user, u.id_equipier, u.enabled, u.id_regulation, u.id_role_in_regulation\n" +
    "FROM `user`  u                                             \n";
  
  
  private final static String queryForGetUserFromIdEquipier = 
    selectForUser+
    "WHERE  u.id_equipier       = ?                 \n";
  
  
  public User getUserFromIdEquipier(int idEquipier) throws Exception
  { 
    User user = null;
    
    try
    {
      user = this.jdbcTemplate.queryForObject(  queryForGetUserFromIdEquipier,  
                                                new Object[]      {idEquipier},
                                                new int   []      {Types.INTEGER}, 
                                                new UserRowMapper (false, false));
      
      user.setRoles(this.getUserRoles(user.getIdUser()));
      
    }
    catch(EmptyResultDataAccessException e)
    {
      if(logger.isDebugEnabled())
        logger.debug("idEquipier='"+idEquipier+"' is not a RDP User");
      
      user = new User();
      user.setIdEquipier(idEquipier);
      user.setRoles(new ArrayList<UserRole>());
    }
    return user;
  }
  
  private final static String queryForGetUser = 
    selectForUser+
    "WHERE  u.id_user       = ?                 \n";
  
  
  public User getUser(int idUser) throws Exception
  { 
    User user = null;
    
    try
    {
      user = this.jdbcTemplate.queryForObject(  queryForGetUser,  
                                                new Object[]      {idUser},
                                                new int   []      {Types.INTEGER}, 
                                                new UserRowMapper (false, false));
      user.setRoles(this.getUserRoles(user.getIdUser()));
    }
    catch(EmptyResultDataAccessException e)
    {
      user = null;
    }
    return user;
  }
  private final static String queryForUpdateUserStatus = 
    "UPDATE user       \n" +
    "SET    enabled = ?\n" +
    "WHERE  id_user = ?\n";
  
  public void updateUserStatus(int idUser, boolean active)
  {
    this.jdbcTemplate.update(queryForUpdateUserStatus, 
                             new Object[]{active, idUser}, 
                             new int   []{Types.INTEGER, Types.INTEGER});
  }
  
  private final static String queryForUpdateUserPassword = 
    "UPDATE user             \n" +
    "SET    password = md5(?)\n" +
    "WHERE  id_user  = ?     \n";
  
  public void updateUserPassword(int idUser, String password)
  {
    this.jdbcTemplate.update(queryForUpdateUserPassword, 
                             new Object[]{password     , idUser}, 
                             new int   []{Types.VARCHAR, Types.INTEGER});
  }
  
  private final static String queryForDeleteRoleForUser = 
    "DELETE FROM user_roles \n" +
    "WHERE  id_user = ?\n" +
    "AND    id_role = ?\n";
  
  private final static String queryForInsertRoleForUser =
    "INSERT INTO `user_roles` \n"+
    " ( `id_user`, `id_role` )\n"+
    "VALUES                   \n"+
    " (?, ?)                  \n";
  
  
  public void updateUserRole(int idUser, int idRole, boolean active)
  {
    if(logger.isDebugEnabled())
      logger.debug("updating idUser="+idUser+" with idRole="+idRole+" active="+active);
    this.jdbcTemplate.update(active?queryForInsertRoleForUser:queryForDeleteRoleForUser, 
        new Object[]{idUser, idRole}, 
        new int   []{Types.INTEGER, Types.INTEGER});
  }
  
  private final static String queryForGetUserRoles =
    "SELECT    id_role      \n" +
    "FROM     `user_roles`  \n" +
    "WHERE     id_user = ?  \n" ;
  
  public List<UserRole> getUserRoles(int idUser)
  {
    List<UserRole> roles = this.jdbcTemplate.query(  queryForGetUserRoles,  
                                                      new Object[]      {idUser},
                                                      new int   []      {Types.INTEGER}, 
                                                      new UserRoleRowMapper(false, false)); 
  
    
    if(roles != null)
      return roles;
    
    return new ArrayList<UserRole>();

  }
  
  

    
  
  private final static String queryWithNivolAndName = 
    selectForUserWithEquipier+
    "WHERE    u.id_role         <= 3            \n"+//TODO changer l'implementation avec un where exist etc... pour checker le niveau de role
    "AND      u.id_regulation    = 0            \n"+
    "AND      e.num_nivol       like ?          \n"+
    "AND      e.nom             like ?          \n"+
    "AND      e.id_delegation   = d.id_delegation \n"+
    "ORDER BY e.num_nivol ASC       \n";  

  private final static String queryWithName =
    selectForUserWithEquipier+
  "WHERE    u.id_role         <= 3              \n"+//TODO changer l'implementation avec un where exist etc... pour checker le niveau de role
  "AND      u.id_regulation    = 0              \n"+
  "AND      e.nom             like ?            \n"+
  "AND      e.id_delegation   = d.id_delegation \n"+
  "ORDER BY num_nivol ASC                       \n";
  
  private final static String queryWithNivol =
    selectForUserWithEquipier+
  "WHERE    u.id_role         <= 3              \n"+//TODO changer l'implementation avec un where exist etc... pour checker le niveau de role
  "AND      u.id_regulation    = 0              \n"+
  "AND      e.num_nivol       like ?            \n"+
  "AND      e.id_delegation   = d.id_delegation \n"+
  "ORDER BY id_role DESC, num_nivol ASC         \n"; 

  
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

    List<User> coRegulateurList = jdbcTemplate.query( query, objects, types, new UserRowMapper(false, true));
    
    return coRegulateurList;
  }
  
  
  private final static String queryForGetRegulateur = 
    selectForUserWithEquipier + 
    "WHERE  u.id_regulation =  0               \n"+
    "AND    u.id_role       <= 2               \n"+//TODO changer l'implementation avec un where exist etc... pour checker le niveau de role
    "AND    e.id_delegation =  d.id_delegation \n"+
    "ORDER BY nom ASC\n";
  
  public List<User> getRegulateur()
  {
    return this.jdbcTemplate.query( queryForGetRegulateur, 
                                                null, 
                                                null, 
                                                new UserRowMapper(false, true));
  }

  private final static String queryForGetCoRegulateurs = 
    selectForUserWithEquipier+
    "WHERE  u.id_regulation =  ?               \n"+
    "AND    u.id_role       <= 3               \n"+//TODO changer l'implementation avec un where exist etc... pour checker le niveau de role
    "AND    u.id_delegation =  d.id_delegation \n"+
    "ORDER BY nom ASC\n";

  
  public void getCoRegulateurs(Regulation regulation)
  {
    List<User> coRegulateurs = this.jdbcTemplate.query( queryForGetCoRegulateurs, 
                                                new Object[]{regulation.getRegulationId()}, 
                                                new int[]{Types.INTEGER}, 
                                                new UserRowMapper(false, true));
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
    "INSERT INTO `user`                      \n"+
    " ( `id_equipier`, `enabled`, `password`,\n"+
    "   `id_regulation`                      \n"+
    " )\n"+
    "VALUES\n"+
    " (?, true, md5(?), 0 )\n";

  
  public void createUser(User user)
  {

    Object[] os = new Object[]
               {
                user.getIdEquipier(),
                user.getPassword  ()
              };  
    int  [] types = new int[]
                   {
                     Types.INTEGER,
                     Types.VARCHAR
                   };
    jdbcTemplate.update(queryForCreateUser, os, types);
    
    int lastInsertId = this.getLastInsertedId(this.jdbcTemplate, tableName);
    
    user.setIdUser(lastInsertId);
    
    if(logger.isDebugEnabled())
      logger.debug("user created with id="+lastInsertId);
  }
  
  

  
}
