package fr.croixrouge.rdp.services.lieu;

import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.jdbc.core.JdbcTemplate;

import fr.croixrouge.rdp.model.monitor.Lieu;
import fr.croixrouge.rdp.model.monitor.LieuType;
import fr.croixrouge.rdp.model.monitor.dwr.FilterObject;
import fr.croixrouge.rdp.model.monitor.dwr.GridSearchFilterAndSortObject;
import fr.croixrouge.rdp.model.monitor.dwr.ListRange;
import fr.croixrouge.rdp.model.monitor.dwr.SortObject;
import fr.croixrouge.rdp.model.monitor.rowMapper.LieuRowMapper;
import fr.croixrouge.rdp.model.monitor.rowMapper.LieuTypeRowMapper;
import fr.croixrouge.rdp.services.cache.CacheService;

public class LieuServiceImpl implements LieuService
{
  private static  Log           logger            = LogFactory.getLog(LieuServiceImpl.class);
  
  private JdbcTemplate jdbcTemplate;
  private CacheService cacheService;
  public LieuServiceImpl(JdbcTemplate jdbcTemplate, CacheService cacheService)
  {
    this.jdbcTemplate = jdbcTemplate;
    this.cacheService = cacheService;
    
    if(logger.isDebugEnabled())
      logger.debug("constructor called");
  }
  
  
  private final static String selectForGetLieuType = 
    "SELECT   `id_type_lieu`,`num_ordre`, `label_type_lieu`,`icon_class_lieu`,`icon_lieu`,`icon_gmap_init`\n" +
    "FROM     `lieu_type`       \n" +
    "WHERE    `id_type_lieu` > 0\n" +
    "ORDER BY `num_ordre` ASC   \n";
  
  public List<LieuType> getLieuType() throws Exception
  {
    if(logger.isDebugEnabled())
      logger.debug("getting lieu_type");
    return this.jdbcTemplate.query(selectForGetLieuType   , 
        new Object[]{}    ,
        new int   []{}     ,
        new LieuTypeRowMapper());
  }
  
  private final static String selectForGetLieu = 
    "SELECT    `id_lieu`,`id_type_lieu`, `icon`, `icon_gmap_init`, `nom`,`addresse`, \n" +
    "          `code_postal`, `ville`, `google_coords_lat`, `google_coords_long`, `info_complementaire`\n" +
    "FROM      `lieu`           \n" ;
  private final static String whereClauseForGetLieu =
    "WHERE     `id_lieu` > 0    \n" +
    "ORDER BY `id_type_lieu` ASC\n";
  
  public List<Lieu> getLieu() throws Exception
  {
    if(logger.isDebugEnabled())
      logger.debug("getting lieu");
    
    return this.jdbcTemplate.query(selectForGetLieu + whereClauseForGetLieu   , 
        new Object[]{}    ,
        new int   []{}     ,
        new LieuRowMapper());
  }
  
  
  private HashMap<String, String> whereMapForGetLieu = new HashMap<String, String>();
  {
    whereMapForGetLieu.put("NOM"              , "E.NOM"              );
    whereMapForGetLieu.put("PRENOM"           , "E.PRENOM"           );
    whereMapForGetLieu.put("NUM_NIVOL"        , "E.NUM_NIVOL"        );
    whereMapForGetLieu.put("EQUIPIER_IS_MALE" , "E.EQUIPIER_IS_MALE" );
    whereMapForGetLieu.put("ID_ROLE_EQUIPIER" , "ER.ID_ROLE_EQUIPIER"); 
    whereMapForGetLieu.put("EMAIL"            , "E.EMAIL"            );
    whereMapForGetLieu.put("MOBILE"           , "E.MOBILE"           );
    whereMapForGetLieu.put("ENABLED"          , "E.ENABLED"          );
    whereMapForGetLieu.put("ID_DELEGATION"    , "E.ID_DELEGATION"    );
  }
  
  
  public ListRange<Lieu> getLieux(GridSearchFilterAndSortObject gsfaso) throws Exception
  {
    String queryForCountLieu  = "SELECT COUNT(1) \nFROM lieu\n";
    String queryForGetLieu    = selectForGetLieu;
    Object [] os    = {};
    int    [] types = {};
 
    
    StringBuffer   whereClause = new StringBuffer();
    FilterObject[] filters     = gsfaso.getFilters();
    
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
          String filterFieldName = whereMapForGetLieu.get(currentFilter.getName());
          if(filterFieldName == null)
            throw new Exception("Invalid filter field '"+currentFilter.getName()+"");
          
          whereClause.append( filterFieldName);
          whereClause.append( " = ? \n");

          os   [i] = new Integer(currentFilter.getValue());
          types[i] = Types.INTEGER;
        }
        else if ("LIKE".equals(currentFilter.getComparator()))
        {
          String filterFieldName = whereMapForGetLieu.get(currentFilter.getName());
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
 
    String orderBy = "ORDER BY ";
    
    SortObject[] sortObjects = gsfaso.getSorts();
    
    if(sortObjects!= null && sortObjects.length>0 && sortObjects[0] != null)
    {
      SortObject so = sortObjects[0];
      String orderByField = whereMapForGetLieu.get(so.getName());
      
      if(orderByField == null)
        throw new Exception("Invalid sort column '"+so.getName()+"'");
      
      orderBy+=orderByField;
      orderBy+=" "+(so.isAscending()?" ASC":" DESC");
    }

    
    String queryCount = queryForCountLieu + whereClause;
    String query      = queryForGetLieu   + whereClause + orderBy + "\nLIMIT "+gsfaso.getStart()+", "+gsfaso.getLimit()+" \n";
    
    if(logger.isDebugEnabled())
    {
      logger.debug("queryCount :\n"+queryCount+"\n\nquery :\n"+query);
    }
    
    int nbEquipiers = jdbcTemplate.queryForInt( queryCount, 
                                                os        , 
                                                types     );
    
    

   
    List<Lieu> equipierList = jdbcTemplate.query( query , 
                                                      os    , 
                                                      types , 
                                                      new LieuRowMapper());

    
    return  new ListRange<Lieu>(nbEquipiers, equipierList);
  }
  
  @SuppressWarnings("unchecked")
  public Hashtable<String, List<Lieu>> getLieuSorted() throws Exception
  {
    if(logger.isDebugEnabled())
      logger.debug("getLieuSorted - retrieving from cache");
    
    Hashtable<String, List<Lieu>> lieuSorted = (Hashtable<String, List<Lieu>>)this.cacheService.getObject("LieuSorted", true);
    if(lieuSorted != null)
      return lieuSorted;

    if(logger.isDebugEnabled())
      logger.debug("getLieuSorted - retrieving from cache : Cache MISS");

    List<LieuType> typeLieu = this.getLieuType();

    lieuSorted = new Hashtable<String, List<Lieu>>(typeLieu.size());
    
    for (LieuType lieuType : typeLieu)//initialise de cette facon, pour que les catégories vides (intevention/ambulance) soit quand meme initialisé, sinon ca a des effets de bords.
      lieuSorted.put(lieuType.getIdTypeLieu()+"", new ArrayList<Lieu> ());
    
    List<Lieu> allLieu = this.getLieu();
    
    for (Lieu lieu : allLieu)
      lieuSorted.get(lieu.getIdTypeLieu()+"").add(lieu);
      
    this.cacheService.setObject("LieuSorted", lieuSorted);
 
    if(logger.isDebugEnabled())
      logger.debug("getLieuSorted - added to cache");
     
    return lieuSorted;
  }
  
}
