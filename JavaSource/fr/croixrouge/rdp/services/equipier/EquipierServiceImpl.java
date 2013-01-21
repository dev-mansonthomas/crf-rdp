package fr.croixrouge.rdp.services.equipier;

import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import fr.croixrouge.rdp.model.monitor.Equipier;
import fr.croixrouge.rdp.model.monitor.EquipierRole;
import fr.croixrouge.rdp.model.monitor.dwr.FilterObject;
import fr.croixrouge.rdp.model.monitor.dwr.GridSearchFilterAndSortObject;
import fr.croixrouge.rdp.model.monitor.dwr.ListRange;
import fr.croixrouge.rdp.model.monitor.dwr.SortObject;
import fr.croixrouge.rdp.model.monitor.rowMapper.EquipierRolesRowMapper;
import fr.croixrouge.rdp.model.monitor.rowMapper.EquipierRowMapper;
import fr.croixrouge.rdp.services.JDBCHelper;
import fr.croixrouge.rdp.services.dispositif.DispositifService;

public class EquipierServiceImpl extends JDBCHelper implements EquipierService
{
  private JdbcTemplate            jdbcTemplate;
  private static Logger           logger                     = Logger.getLogger(EquipierServiceImpl.class);
  private HashMap<String, String> sortMapForGetEquipierList  = new HashMap<String, String>();
  private HashMap<String, String> whereMapForGetEquipierList = new HashMap<String, String>();

  public EquipierServiceImpl(JdbcTemplate jdbcTemplate, DispositifService dispositifService)
  {
    this.jdbcTemplate      = jdbcTemplate;

    sortMapForGetEquipierList.put("nom"                       , "nom"             );
    sortMapForGetEquipierList.put("prenom"                    , "prenom"          );
    sortMapForGetEquipierList.put("homme"                     , "equipier_is_male");
    sortMapForGetEquipierList.put("delegation.idDelegation"   , "nom_delegation"  );
    sortMapForGetEquipierList.put("numNivol"                  , "nivol"           );

    whereMapForGetEquipierList.put("NOM"              , "e.nom"              );
    whereMapForGetEquipierList.put("PRENOM"           , "e.prenom"           );
    whereMapForGetEquipierList.put("nivol"            , "e.nivol"            );
    whereMapForGetEquipierList.put("EQUIPIER_IS_MALE" , "e.equipier_is_male" );
    whereMapForGetEquipierList.put("ID_ROLE_EQUIPIER" , "er.id_role_equipier");
    whereMapForGetEquipierList.put("EMAIL"            , "e.email"            );
    whereMapForGetEquipierList.put("MOBILE"           , "e.mobile"           );
    whereMapForGetEquipierList.put("ENABLED"          , "e.enabled"          );
    whereMapForGetEquipierList.put("ID_DELEGATION"    , "e.id_delegation"    );


    if(logger.isDebugEnabled())
      logger.debug("constructor called");
  }

  protected int getLastInsertedId()
  {
    return this.getLastInsertedId(jdbcTemplate, "equipier");
  }

  private final static String equipierSelectWithDelegation =
  "SELECT e.id_equipier         ,                  \n"+
  "       e.id_dispositif       ,                  \n"+
  "       e.nivol               ,                  \n"+
  "       e.equipier_is_male    ,                  \n"+
  "       e.enabled             ,                  \n"+
  "       e.nom                 ,                  \n"+
  "       e.prenom              ,                  \n"+
  "       e.indicatif           ,                  \n"+
  "       e.mobile              ,                  \n"+
  "       e.email               ,                  \n"+
  "       d.id_delegation       ,                  \n"+
  "       d.nom         AS nom_delegation         ,\n"+
  "       d.departement AS departement_delegation ,\n"+
  "       e.autre_delegation                       \n";


  public final static String equipierSelect =
    "SELECT e.id_equipier         ,                  \n"+
    "       e.id_dispositif       ,                  \n"+
    "       e.nivol               ,                  \n"+
    "       e.equipier_is_male    ,                  \n"+
    "       e.enabled             ,                  \n"+
    "       e.nom                 ,                  \n"+
    "       e.prenom              ,                  \n"+
    "       e.indicatif           ,                  \n"+
    "       e.mobile              ,                  \n"+
    "       e.email               ,                  \n"+
    "       e.id_delegation       ,                  \n"+
    "       e.autre_delegation                       \n";

  private final static String equipierFrom =
    "FROM   equipier      e  ,                       \n"+
    "       delegation    d                          \n";

  private final static String selectForEquipier = equipierSelectWithDelegation+equipierFrom;


  private final static  String queryForGetEquipiersForDispositif =
    equipierSelectWithDelegation+
    ", de.id_role_equipier                     ,\n"+
    "de.en_evaluation                          ,\n"+
    "de.id_role_en_eval                         \n"+
    equipierFrom+
    ",      dispositif_equipiers de                  \n"+
    "WHERE  de.id_dispositif     = ?                 \n"+
    "AND    de.id_equipier       = e.id_equipier     \n"+
    "AND    e.id_delegation      = d.id_delegation   \n"+
    "AND    e.enabled            = true              \n"+
    "ORDER BY de.id_role_equipier ASC                \n";


  public List<Equipier> getEquipiersForDispositif(int idDispositif) throws Exception
  {
    if(logger.isDebugEnabled())
      logger.debug("Getting EquipiersForDispositif '"+idDispositif+"' with query \n"+queryForGetEquipiersForDispositif);

    Object [] os    = {idDispositif};
    int    [] types = {Types.INTEGER};

    List<Equipier> equiperList= jdbcTemplate.query(  queryForGetEquipiersForDispositif ,
                                                     os    ,
                                                     types ,
                                                     new EquipierRowMapper(true, true));





    return equiperList;
  }


  private final static String queryForGetEquipierLeaderOfDispositif =
    equipierSelectWithDelegation+
    ",      de.id_role_equipier                     ,\n"+
    "       de.en_evaluation                        ,\n"+
    "       de.id_role_en_eval                       \n"+
    equipierFrom+
    ",      dispositif_equipiers de           ,      \n" +
    "       dispositif_type      dt           ,      \n" +
    "       dispositif           di                  \n"+
    "WHERE  di.id_dispositif      = ?                     \n"+
    "AND    di.id_dispositif      = de.id_dispositif      \n"+
    "AND    di.id_type_dispositif = dt.id_type            \n"+
    "AND    de.id_role_equipier   = dt.id_role_leader     \n"+
    "AND    de.id_equipier        = e.id_equipier         \n"+
    "AND    e.id_delegation       = d.id_delegation       \n"+
    "AND    e.enabled             = true                  \n";

  public Equipier getEquipierLeaderOfDispositif(int idDispositif)
  {

    if(logger.isDebugEnabled())
      logger.debug("Getting Equipier leader of dispositif '"+idDispositif+"' with Query \n"+queryForGetEquipierLeaderOfDispositif);

    Object [] os    = {idDispositif };
    int    [] types = {Types.INTEGER};

    Equipier equipier = null;

    try
    {
      equipier = jdbcTemplate.queryForObject(  queryForGetEquipierLeaderOfDispositif ,
                                               os    ,
                                               types ,
                                               new EquipierRowMapper(false, true));
    }
    catch(EmptyResultDataAccessException e)
    {
      Equipier eq = new Equipier();
      eq.setIdEquipier(0);
      eq.setNom       ("N/A");
      return eq;// pas de leader défini... on retourne null
    }

    return equipier;
  }


  private final static String queryForGetEquipier =
    selectForEquipier+
    "WHERE  e.id_delegation      = d.id_delegation   \n"+
    "AND    e.id_equipier        = ?                 \n";

  public Equipier getEquipier(int idEquipier)  throws Exception
  {

    if(logger.isDebugEnabled())
      logger.debug("Getting Equipier '"+idEquipier+"'");

    Object [] os    = {idEquipier};
    int    [] types = {Types.INTEGER};

    Equipier equipier = jdbcTemplate.queryForObject( queryForGetEquipier ,
                                                     os    ,
                                                     types ,
                                                     new EquipierRowMapper(false, true));

    return equipier;
  }

  
  


  private final static String queryForGetEquipierByNivol =
    selectForEquipier+
    "WHERE  e.id_delegation      = d.id_delegation   \n"+
    "AND    e.nivol              = ?                 \n";

  public Equipier getEquipierByNivol(String nivol) throws Exception
  {

    if(logger.isDebugEnabled())
      logger.debug("Getting Equipier with nivol : '"+nivol+"'");

    Object [] os    = {nivol        };
    int    [] types = {Types.VARCHAR};

    Equipier equipier = jdbcTemplate.queryForObject( queryForGetEquipierByNivol ,
                                                     os    ,
                                                     types ,
                                                     new EquipierRowMapper(false, true));

    return equipier;
  }
  

  private final static String queryForGetNbEquipiers =
    "SELECT count(1) FROM equipier e, delegation d WHERE e.id_delegation = d.id_delegation \n";

  public int getNbEquipiers(GridSearchFilterAndSortObject gsfaso)
  {
    return (int)jdbcTemplate.queryForLong(queryForGetNbEquipiers);
  }

  private final static String queryForGetEquipiers =
    selectForEquipier+
    "WHERE  e.id_delegation      = d.id_delegation   \n";

  public ListRange<Equipier> getEquipiers(GridSearchFilterAndSortObject gsfaso) throws Exception
  {
    StringBuffer whereClause   = new StringBuffer();

    String orderBy = "ORDER BY ";

    SortObject[] sortObjects = gsfaso.getSorts();

    if(sortObjects!= null && sortObjects.length>0 && sortObjects[0] != null)
    {
      SortObject so = sortObjects[0];
      String orderByField = sortMapForGetEquipierList.get(so.getName());

      if(orderByField == null)
        throw new Exception("Invalid sort column '"+so.getName()+"'");

      orderBy+=orderByField;
      orderBy+=" "+(so.isAscending()?" ASC":" DESC");
    }

    Object [] os    = {};
    int    [] types = {};


    FilterObject[] filters = gsfaso.getFilters();

    if(filters!= null && filters.length>0)
    {
      os    = new Object[filters.length];
      types = new int   [filters.length];

      for (int i = 0; i < filters.length; i++)
      {
        FilterObject currentFilter = filters[i];
        whereClause.append( "AND ");
        if("=".equals(currentFilter.getComparator()))
        {

          if ("ID_ROLE_EQUIPIER".equals(currentFilter.getName()))
          {
            whereClause.append("EXISTS (SELECT er.id_equipier FROM equipier_roles er WHERE er.id_equipier = e.id_equipier AND er.id_role_equipier = ?)\n");
          }
          else
          {
            String filterFieldName = whereMapForGetEquipierList.get(currentFilter.getName());
            if(filterFieldName == null)
              throw new Exception("Invalid filter field '"+currentFilter.getName()+"");

            whereClause.append( filterFieldName);
            whereClause.append( " = ? \n");
          }
          os   [i] = new Integer(currentFilter.getValue());
          types[i] = Types.INTEGER;
        }
        else if ("LIKE".equals(currentFilter.getComparator()))
        {
          String filterFieldName = whereMapForGetEquipierList.get(currentFilter.getName());
          if(filterFieldName == null)
            throw new Exception("Invalid filter field '"+currentFilter.getName()+"");

          whereClause.append( filterFieldName);

          whereClause.append( " LIKE ? \n");

          String filterValue = currentFilter.getValue();
          if(filterValue.indexOf("*")>-1)
            filterValue = filterValue.replaceAll("*", "%");
          else
            filterValue += "%";

          os   [i] = filterValue;
          types[i] = Types.VARCHAR;
        }
      }
    }

    String queryCount = queryForGetNbEquipiers + whereClause;
    String query      = queryForGetEquipiers   + whereClause + orderBy + "\nLIMIT "+gsfaso.getStart()+", "+gsfaso.getLimit()+" \n";

    if(logger.isDebugEnabled())
    {
      logger.debug("queryCount :\n"+queryCount+"\n\nquery :\n"+query);
    }

    int nbEquipiers = jdbcTemplate.queryForInt( queryCount,
                                                os        ,
                                                types     );




    List<Equipier> equipierList = jdbcTemplate.query( query ,
                                                      os    ,
                                                      types ,
                                                      new EquipierRowMapper(false,true));


    return  new ListRange<Equipier>(nbEquipiers, equipierList);
  }

  private final static String queryForGetRoles =
  "SELECT er.id_equipier     ,           \n"+
  "       er.id_role_equipier,           \n"+
  "       er.en_evaluation   ,           \n"+
  "       er.evaluateur      ,           \n"+
  "       e.label_role                   \n"+
  "FROM   equipier_roles er  ,           \n"+
  "       equipier_role  e               \n"+
  "WHERE  er.id_role_equipier = e.id_role\n"+
  "AND    er.id_equipier      = ?        \n";

  public List<EquipierRole> getEquipierRoles(int idEquipier) throws Exception
  {
    Object [] os    = {idEquipier};
    int    [] types = {Types.INTEGER};

    List<EquipierRole> roleList = jdbcTemplate.query( queryForGetRoles ,
        os    ,
        types ,
        new EquipierRolesRowMapper());

    if (roleList==null)
      roleList = new ArrayList<EquipierRole>();

    return roleList;
  }




  private final static String queryForSearchEquipierWithRoleWhere =
    "WHERE  e.id_delegation     = d.id_delegation   \n"+
    "AND                                            \n"+
    "(                                              \n"+
    "       e.nivol             LIKE ?              \n" +
    " OR    e.nom               LIKE CONVERT(_utf8 ? USING utf8) COLLATE utf8_general_ci \n" +
    " OR    e.prenom            LIKE CONVERT(_utf8 ? USING utf8) COLLATE utf8_general_ci \n" +
    ")\n";

  private final static String extraQueryForDispositifEquipierSearch =
      "AND    e.id_equipier       = er.id_equipier    \n"+
      "AND    er.en_evaluation    = false             \n"+
      "AND    e.enabled           = true              \n"+
      "AND    e.id_dispositif     = 0                 \n"+
      "AND    er.id_role_equipier = ?                 \n";

  //NOTE:  on n'ajoute que des équipiers qui ne sont PAS en évaluation.
  //Si on veut évaluer un chauffeur, on l'ajoute au dispositif en tant que PSE2, puis on choisi de le mettre en évaluation sur le role chauffeur.


  /**
   * @searchType 1: dispositifEquipierSearch (equipier actif, non affecté), 0: all available Equipier
   *
   */
  public ListRange<Equipier> searchEquipierWithRole(int searchType, GridSearchFilterAndSortObject gsfaso) throws Exception
  {
    ArrayList<Object > osAL    = new ArrayList<Object>(10);
    ArrayList<Integer> typesAL = new ArrayList<Integer>(10);

    int start = gsfaso.getStart();
    int limit = gsfaso.getLimit();


    String searchString = null;
    FilterObject filterObject = gsfaso.getFilterObject("search");
    if(filterObject == null  || filterObject.getValue() == null || filterObject.getValue().equals(""))
      return new ListRange<Equipier>(0, new ArrayList<Equipier>());

    searchString = filterObject.getValue()+"%";

    //the searched string appears 3 times in the SQL Query, so we need to add it 3 times
    osAL   .add(searchString);
    typesAL.add(Types.VARCHAR);
    osAL   .add(searchString);
    typesAL.add(Types.VARCHAR);
    osAL   .add(searchString);
    typesAL.add(Types.VARCHAR);

    int idRole = 0;
    if(searchType == 1)
    {
      filterObject = gsfaso.getFilterObject("idRole");

      if(filterObject == null  || filterObject.getValue() == null || filterObject.getValue().equals(""))
        return new ListRange<Equipier>(0, new ArrayList<Equipier>());


      try
      {
        idRole = Integer.parseInt(filterObject.getValue());
      }
      catch(NumberFormatException e)
      {
        return new ListRange<Equipier>(0, new ArrayList<Equipier>());
      }

      osAL   .add(idRole);
      typesAL.add(Types.INTEGER);
    }





    Object [] os    = osAL   .toArray(new Object [osAL.size()]);
    Integer[] typesI= typesAL.toArray(new Integer[typesAL.size()]);
    int    [] types = new int[typesI.length];

    for(int i=0,counti=typesI.length;i<counti;i++)
      types[i]=typesI[i];


    String whereClause = queryForSearchEquipierWithRoleWhere;
    if(searchType == 1)
    {
      whereClause+=extraQueryForDispositifEquipierSearch;
    }


    int totalCount = this.jdbcTemplate.queryForInt(
        "SELECT COUNT(1) \n" +
        "FROM   equipier e, delegation d"+  (searchType == 1?", equipier_roles er":"" )+ "\n"
        +whereClause, os, types);


    String query = equipierSelectWithDelegation+ (searchType == 1? ", er.id_role_equipier, er.en_evaluation\n":"\n")
    +equipierFrom + (searchType == 1? ", equipier_roles er\n" : "\n")+
    whereClause
    +"LIMIT "+start+", "+limit;

    if(logger.isDebugEnabled())
      logger.debug("searching for equipier : searchType='"+searchType+"' idRole='"+idRole+"', searchString='"+searchString+"', start='"+start+"', limit='"+limit+"' with SQL query : \n"+query);

    List<Equipier> equipierList = jdbcTemplate.query( query ,
                                                      os    ,
                                                      types ,
                                                      new EquipierRowMapper(false, true));


    return new ListRange<Equipier>(totalCount, equipierList);
  }





  private final static String queryForSearchEquipierWhere =
    "WHERE  e.id_delegation     = d.id_delegation   \n"+
    "AND                                            \n"+
    "(                                              \n"+
    "       e.nivol   LIKE ?                        \n"+
    " OR    e.nom     LIKE CONVERT(_utf8 ? USING utf8) COLLATE utf8_general_ci \n" +
    " OR    e.prenom  LIKE CONVERT(_utf8 ? USING utf8) COLLATE utf8_general_ci \n" +
    " OR    e.mobile  LIKE ?                        \n"+
    ")\n";


  /***
   * Cherche sur nom/prénom/nivol/mobile
   */
  public ListRange<Equipier> searchEquipier(String searchString, int start, int limit) throws Exception
  {

    Object [] os    =  new Object[]{searchString , searchString , searchString , searchString };
    int    [] types =  new int   []{Types.CHAR   , Types.CHAR   , Types.CHAR   , Types.CHAR   };


    int totalCount = this.jdbcTemplate.queryForInt(
        "SELECT COUNT(1) \n" +
        "FROM   equipier e, delegation d \n"
        +queryForSearchEquipierWhere, os, types);


    String query = equipierSelect+"\n"
    +equipierFrom +"\n"+
    queryForSearchEquipierWhere
    +"LIMIT "+start+", "+limit;

    if(logger.isDebugEnabled())
      logger.debug("searching for equipier : searchString='"+searchString+"', start='"+start+"', limit='"+limit+"' (totalCount='"+totalCount+"') with SQL query : \n"+query);

    List<Equipier> equipierList = jdbcTemplate.query( query ,
                                                      os    ,
                                                      types ,
                                                      new EquipierRowMapper(false, false));


    return new ListRange<Equipier>(totalCount, equipierList);
  }





  private final static String queryForSetDispositifToEquipier =
    "UPDATE equipier                     \n" +
    "SET    id_dispositif           = ?  \n" +
    "WHERE  id_equipier             = ?  \n";

  public void setDispositifToEquipier(int idEquipier, int idDispositif)
  {
    Object [] os     = new Object[]{idDispositif  , idEquipier   };
    int    [] types  = new int   []{Types.INTEGER , Types.INTEGER};

    int nbLineUpdated = jdbcTemplate.update(queryForSetDispositifToEquipier, os, types);

    if(logger.isDebugEnabled())
      logger.debug("setDispositifToEquipier line updated = "+nbLineUpdated);

  }




  private final static String queryForEnableDisableEquipier =
    "UPDATE equipier         \n" +
    "SET    enabled     = ?  \n" +
    "WHERE  id_equipier = ?  \n";

  public void                 setEnableDisableEquipier(int idEquipier   , boolean enable) throws Exception
  {

    Object [] os     = new Object[]{enable        , idEquipier   };
    int    [] types  = new int   []{Types.BOOLEAN , Types.INTEGER};

    int nbLineUpdated = jdbcTemplate.update(queryForEnableDisableEquipier, os, types);

    if(logger.isDebugEnabled())
      logger.debug("setEnableDisableEquipier line updated = "+nbLineUpdated);

  }

  private final static String queryForCreateEquipier =
    "INSERT INTO equipier         \n" +
    "(nom, prenom,indicatif, nivol, equipier_is_male, email, mobile, enabled, id_delegation, id_siord, date_last_synchro_siord)  \n" +
    "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)  \n";

  @Transactional (propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
  public int                 createEquipier            (Equipier equipier) throws Exception
  {

    Object [] os    = new Object[]{
        equipier.getNom       (),
        equipier.getPrenom    (),
        equipier.getIndicatif (),
        equipier.getNumNivol  (),
        equipier.isHomme      (),
        "".equals(equipier.getEmail     ())?null:equipier.getEmail (),
        "".equals(equipier.getMobile    ())?null:equipier.getMobile(),
        equipier.isEnabled    (),
        equipier.getDelegation().getIdDelegation(),
        equipier.getIdSiord(),
        equipier.getDateLastSynchroSiord()
        };
    int    [] types = new int   []{
        Types.VARCHAR                 ,
        Types.VARCHAR                 ,
        Types.VARCHAR                 ,
        Types.VARCHAR                 ,
        Types.BOOLEAN                 ,
        Types.VARCHAR                 ,
        Types.VARCHAR                 ,
        Types.BOOLEAN                 ,
        Types.VARCHAR                 ,
        Types.INTEGER                 ,
        Types.TIMESTAMP
        };

    jdbcTemplate.update(queryForCreateEquipier, os, types);

    int idEquipier =  this.getLastInsertedId();
    equipier.setIdEquipier(idEquipier);

    this.updateEquipierRoles(equipier, true);

    if(logger.isDebugEnabled())
      logger.debug("Equiper inserted with id="+equipier.getIdEquipier());

    return idEquipier;
  }

  
  private final static String queryForEquipierWithThisNivolExists = 
      "SELECT COUNT(1)            \n" +
      "FROM equipier              \n" +
      "where UPPER(nivol)=UPPER(?)\n" ;
  
  public boolean equipierWithThisNivolExists(String nivol) throws Exception
  {
    return this.jdbcTemplate.queryForInt(queryForEquipierWithThisNivolExists, new Object[]{nivol}, new int[]{Types.VARCHAR}) == 1; 
  }
  
  
  private final static String queryForModifyEquipier =
    "UPDATE equipier               \n" +
    "SET    nom               = ?, \n" +
    "       prenom            = ?, \n" +
    "       indicatif         = ?, \n" +
    "       nivol         = ?, \n" +
    "       equipier_is_male  = ?, \n" +
    "       email             = ?, \n" +
    "       mobile            = ?, \n" +
    "       enabled           = ?, \n" +
    "       id_delegation     = ?  \n" +
    "WHERE  id_equipier       = ?  \n" ;

  public void                 modifyEquipier            (Equipier equipier) throws Exception
  {

    Object [] os    = new Object[]{
        equipier.getNom       (),
        equipier.getPrenom    (),
        equipier.getIndicatif (),
        equipier.getNumNivol  (),
        equipier.isHomme      (),
        equipier.getEmail     (),
        equipier.getMobile    (),
        equipier.isEnabled    (),
        equipier.getDelegation().getIdDelegation(),
        equipier.getIdEquipier()
        };
    int    [] types = new int   []{
        Types.VARCHAR                 ,
        Types.VARCHAR                 ,
        Types.VARCHAR                 ,
        Types.VARCHAR                 ,
        Types.BOOLEAN                 ,
        Types.VARCHAR                 ,
        Types.VARCHAR                 ,
        Types.BOOLEAN                 ,
        Types.VARCHAR                 ,
        Types.INTEGER
        };

    jdbcTemplate.update(queryForModifyEquipier, os, types);


    this.updateEquipierRoles(equipier,false);

    if(logger.isDebugEnabled())
      logger.debug("Equiper updated with id="+equipier.getIdEquipier());
  }


  private final static String queryForDeleteAllRolesFromEquipier=
    "DELETE FROM equipier_roles   \n" +
    "WHERE       id_equipier = ?  \n" ;

  private final static String queryForInsertRolesForEquipier=
    "INSERT INTO equipier_roles                                   \n" +
    "  (id_equipier, id_role_equipier, en_evaluation, evaluateur) \n" +
    "VALUES                                                       \n" +
    "  (?          , ?               , ?            , ?         ) \n" ;

  public void updateEquipierRoles(Equipier equipier, boolean creation) throws Exception
  {
    Object [] os              = null;
    int    [] types           = null;
    int       nbLigneUpdated  = 0;
    if(!creation)
    {
      os              = new Object[]{equipier.getIdEquipier() };
      types           = new int   []{Types.INTEGER            };

      nbLigneUpdated  = jdbcTemplate.update(queryForDeleteAllRolesFromEquipier, os, types);

      if(logger.isDebugEnabled())
        logger.debug("EquiperRoles deleted, nbLine deleted="+nbLigneUpdated);
    }

    nbLigneUpdated = 0;
    List<EquipierRole> roles = equipier.getRoles();

    if( roles != null && roles.size()>0)
    {
      for (EquipierRole equipierRole : roles)
      {
        os    = new Object[]{equipier.getIdEquipier(), equipierRole.getId(), equipierRole.isEnEvaluation(), equipierRole.isEvaluateur() };
        types = new int   []{Types.INTEGER           , Types.INTEGER       , Types.BOOLEAN                , Types.BOOLEAN               };

        nbLigneUpdated+= jdbcTemplate.update(queryForInsertRolesForEquipier, os, types);
      }
      if(logger.isDebugEnabled())
        logger.debug("EquiperRoles inserted, nbLine inserted="+nbLigneUpdated);
    }
  }


  private final static String queryForFindEquipierByMobile = selectForEquipier +
  "WHERE  e.id_delegation = d.id_delegation \n" +
  "AND e.mobile = ?\n";

  public Equipier findEquipierByMobile(String mobile) throws Exception
  {
      logger.warn("Getting Equipier by mobile='"+mobile+"' with Query \n"+queryForFindEquipierByMobile);

    Object [] os    = {mobile       };
    int    [] types = {Types.VARCHAR};

    Equipier equipier = null;

    try
    {
      equipier = jdbcTemplate.queryForObject(  queryForFindEquipierByMobile ,
                                               os    ,
                                               types ,
                                               new EquipierRowMapper(false, true));
    }
    catch(EmptyResultDataAccessException e)
    {
      Equipier eq = new Equipier();
      eq.setIdEquipier(0);
      eq.setNom       ("N/A");
      logger.warn("no equipier found with mobile='"+mobile+"'");
      return eq;// Non trouvé, on retourne un équipier vide avec 0 en IdEquipier pour satisfaire des contraintes d'intégritée
    }

    return equipier;
  }



  private final static String queryForDeleteEquipiersInfoForDispositifToBeDeleted1 =
    "DELETE FROM dispositif_equipiers    \n" +
    "WHERE  id_dispositif           = ?  \n";

  private final static String queryForDeleteEquipiersInfoForDispositifToBeDeleted2 =
    "DELETE FROM dispositif_equipiers_log\n" +
    "WHERE  id_dispositif           = ?  \n";


  private final static String queryForDeleteEquipiersInfoForDispositifToBeDeleted3 =
    "UPDATE equipier            \n" +
    "SET    id_dispositif  = 0  \n" +
    "WHERE  id_dispositif  = ?  \n";

  public void deleteEquipiersInfoForDispositifToBeDeleted(int idDispositif) throws Exception
  {
    try
    {
      Object [] os     = new Object[]{idDispositif  };
      int    [] types  = new int   []{Types.INTEGER };



      int nbLineUpdated = jdbcTemplate.update(queryForDeleteEquipiersInfoForDispositifToBeDeleted1, os, types);

      if(logger.isDebugEnabled())
        logger.debug("deleteEquipiersInfoForDispositifToBeDeleted, --DELETE dispositif_equipiers-- idDispositif='"+idDispositif+"' line updated = "+nbLineUpdated);


      os     = new Object[]{idDispositif  };
      types  = new int   []{Types.INTEGER };

      nbLineUpdated = jdbcTemplate.update(queryForDeleteEquipiersInfoForDispositifToBeDeleted2, os, types);

      if(logger.isDebugEnabled())
        logger.debug("deleteEquipiersInfoForDispositifToBeDeleted, --DELETE dispositif_equipiers_log-- idDispositif='"+idDispositif+"' line updated = "+nbLineUpdated);

      os     = new Object[]{idDispositif  };
      types  = new int   []{Types.INTEGER };

      nbLineUpdated = jdbcTemplate.update(queryForDeleteEquipiersInfoForDispositifToBeDeleted3, os, types);

      if(logger.isDebugEnabled())
        logger.debug("deleteEquipiersInfoForDispositifToBeDeleted, --UPDATE EQUIPER SET    id_dispositif  = 0 -- idDispositif='"+idDispositif+"' line updated = "+nbLineUpdated);
    }
    catch(Exception e)
    {
      logger.error("Error while deleting infos for dispositif id='"+idDispositif+"' with the following queries : \n"+queryForDeleteEquipiersInfoForDispositifToBeDeleted1+"\n"+queryForDeleteEquipiersInfoForDispositifToBeDeleted2+"\n"+queryForDeleteEquipiersInfoForDispositifToBeDeleted3,e);
      throw e;
    }


  }

}
