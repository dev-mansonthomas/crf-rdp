package fr.croixrouge.rdp.services.lieu;

import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import fr.croixrouge.rdp.model.monitor.Lieu;
import fr.croixrouge.rdp.model.monitor.LieuType;
import fr.croixrouge.rdp.model.monitor.dwr.FilterObject;
import fr.croixrouge.rdp.model.monitor.dwr.GridSearchFilterAndSortObject;
import fr.croixrouge.rdp.model.monitor.dwr.ListRange;
import fr.croixrouge.rdp.model.monitor.dwr.SortObject;
import fr.croixrouge.rdp.model.monitor.rowMapper.LieuRowMapper;
import fr.croixrouge.rdp.model.monitor.rowMapper.LieuTypeRowMapper;
import fr.croixrouge.rdp.services.JDBCHelper;
import fr.croixrouge.rdp.services.cache.CacheService;

public class LieuServiceImpl  extends JDBCHelper implements LieuService
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
  
  
  private final static String queryForSearchLieuWhere =
      "WHERE  id_type_lieu     = ?                    \n"+
      "AND                                            \n"+
      "(                                              \n"+
      "       nom          LIKE CONVERT(_utf8 ? USING utf8) COLLATE utf8_general_ci \n" +
      " OR    addresse     LIKE CONVERT(_utf8 ? USING utf8) COLLATE utf8_general_ci \n" +
      " OR    ville        LIKE CONVERT(_utf8 ? USING utf8) COLLATE utf8_general_ci \n" +
      " OR    code_postal  LIKE ?                        \n"+
      ")\n";
  
  /***
   * Cherche sur nom/prénom/nivol/mobile
   */
  public ListRange<Lieu> searchLieux(String searchString, int idLieuType, int start, int limit) throws Exception
  {

    Object [] os    =  new Object[]{idLieuType   , searchString , searchString , searchString , searchString };
    int    [] types =  new int   []{Types.INTEGER, Types.CHAR   , Types.CHAR   , Types.CHAR   , Types.CHAR   };


    int totalCount = this.jdbcTemplate.queryForObject(
        "SELECT COUNT(1) \n" +
            "FROM   lieu l\n"
            + queryForSearchLieuWhere, os, types, Integer.class);


    String query = selectForGetLieux+"\n"+
    queryForSearchLieuWhere +"\n"+
    "LIMIT "+start+", "+limit;

    if(logger.isDebugEnabled())
      logger.debug("searching for lieu : searchString='"+searchString+"', idLieuType='"+idLieuType+"', start='"+start+"', limit='"+limit+"' (totalCount='"+totalCount+"') with SQL query : \n"+query);

    List<Lieu> equipierList = jdbcTemplate.query( query ,
                                                      os    ,
                                                      types ,
                                                      new LieuRowMapper());


    return new ListRange<Lieu>(totalCount, equipierList);
  }

  
  
  
  
  
  
  private final static String selectForGetLieuType = 
    "SELECT   `id_type_lieu`,`num_ordre`, `label_type_lieu`,`icon_class_lieu`,`icon_lieu`,`icon_gmap_init`\n" +
    "FROM     `lieu_type`       \n" +
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
  
  private final static String selectForGetLieux = 
    "SELECT    `id_lieu`    , `id_type_lieu`, `icon`              , `icon_gmap_init`    , `nom`      ,`addresse`, \n" +
    "          `code_postal`, `ville`       , `google_coords_lat` , `google_coords_long`, `telephone`, `mail`   , \n" +
    "          `url`        , `info_complementaire`, `actif`                                                      \n" +
    "FROM      `lieu`           \n" ;
  private final static String whereClauseForGetLieux =
    "WHERE     `id_lieu` > 0    \n" +
    "AND       `actif`   = 1    \n" +
    "ORDER BY `id_type_lieu` ASC\n";
  
  public List<Lieu> getLieux() throws Exception
  {
    if(logger.isDebugEnabled())
      logger.debug("getting lieux");
    
    return this.jdbcTemplate.query(selectForGetLieux + whereClauseForGetLieux   , 
        new Object[]{}    ,
        new int   []{}     ,
        new LieuRowMapper());
  }
  
  private final static String whereClauseForGetLieu =
    "WHERE     `id_lieu` = ?    \n" ;
  public Lieu getLieu(int idLieu) throws Exception
  {
    if(logger.isDebugEnabled())
      logger.debug("getting lieux");
    
    return this.jdbcTemplate.queryForObject(selectForGetLieux + whereClauseForGetLieu   , 
        new Object[]{idLieu       },
        new int   []{Types.INTEGER},
        new LieuRowMapper());
  }
  
  
  private HashMap<String, String> whereMapForGetLieu = new HashMap<String, String>();
  {

    whereMapForGetLieu.put("idTypeLieu"       , "id_type_lieu" );
    whereMapForGetLieu.put("nom"              , "nom"          );
    whereMapForGetLieu.put("codePostal"       , "code_postal"  );
  }
  
  private HashMap<String, String> sortMapForGetLieu = new HashMap<String, String>();
  {
    sortMapForGetLieu.put("idLieu"           , "id_lieu"      );
    sortMapForGetLieu.put("idTypeLieu"       , "id_type_lieu" );
    sortMapForGetLieu.put("nom"              , "nom"          );
    sortMapForGetLieu.put("addresse"         , "addresse"     );
    sortMapForGetLieu.put("ville"            , "ville"        );
    sortMapForGetLieu.put("codePostal"       , "code_postal"  );
    sortMapForGetLieu.put("id"               , "id_lieu"      );
    sortMapForGetLieu.put("actif"            , "actif"        );
  }
  public ListRange<Lieu> getLieux(GridSearchFilterAndSortObject gsfaso) throws Exception
  {
    String queryForCountLieu  = "SELECT COUNT(1) \nFROM lieu\n";
    String queryForGetLieu    = selectForGetLieux;
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
        
        if(whereClause.indexOf("WHERE")<0)
        {
          whereClause.append( "WHERE ");
        }
        else
        {
          whereClause.append( "AND ");  
        }
        
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
      String orderByField = sortMapForGetLieu.get(so.getName());
      
      if(orderByField == null)
        throw new Exception("Invalid sort column '"+so.getName()+"'");
      
      orderBy+=orderByField;
      orderBy+=" "+(so.isAscending()?" ASC":" DESC");
    }
    else
    {
      orderBy+=" id_lieu ASC ";
    }

    
    String queryCount = queryForCountLieu + whereClause;
    String query      = queryForGetLieu   + whereClause + orderBy + "\nLIMIT "+gsfaso.getStart()+", "+gsfaso.getLimit()+" \n";
    
    if(logger.isDebugEnabled())
    {
      logger.debug("queryCount :\n"+queryCount+"\n\nquery :\n"+query);
    }
    
    int nbEquipiers = jdbcTemplate.queryForObject(queryCount,
        os,
        types, Integer.class);
    
    

   
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
    
    List<Lieu> allLieu = this.getLieux();
    
    for (Lieu lieu : allLieu)
    {
      List<Lieu> oneList = lieuSorted.get(lieu.getIdTypeLieu()+"");
      if(oneList != null)
        oneList.add(lieu);
    }
      
      
    this.cacheService.setObject("LieuSorted", lieuSorted);
 
    if(logger.isDebugEnabled())
      logger.debug("getLieuSorted - added to cache");
     
    return lieuSorted;
  }
  
  public static final String queryForSetEnableStatusOnLieu =
    "UPDATE lieu       \n" +
    "SET    actif   = ?\n" +
    "WHERE  id_lieu = ?\n";
  
  public void setEnableStatusOnLieu(int idLieu, boolean enabled) throws Exception
  {
    if(logger.isDebugEnabled())
      logger.debug("set enable='"+enabled+"' to lieu id='"+idLieu+"'");
    
    int nbRowUpdated = this.jdbcTemplate.update(queryForSetEnableStatusOnLieu , 
        new Object[]{enabled      , idLieu       },
        new int   []{Types.BOOLEAN, Types.INTEGER});
    
    this.cacheService.remove("LieuSorted");
    
    if(logger.isDebugEnabled())
      logger.debug("set enable='"+enabled+"' to lieu id='"+idLieu+"' (nbRowUpdated='"+nbRowUpdated+"'");
  }
  
  
  public static final String queryForDeleteLieu =
    "DELETE FROM lieu       \n" +
    "WHERE  id_lieu = ?\n";
  
  public void deleteLieu(int idLieu) throws Exception
  {
    if(logger.isDebugEnabled())
      logger.debug("delete lieu id='"+idLieu+"'");
    
    int nbRowUpdated = this.jdbcTemplate.update(queryForDeleteLieu , 
        new Object[]{idLieu       },
        new int   []{Types.INTEGER});
    
    this.cacheService.remove("LieuSorted");
    
    if(logger.isDebugEnabled())
      logger.debug("delete lieu id='"+idLieu+"' (nbRowUpdated='"+nbRowUpdated+"'");
  }
  
  
  /*
   * 
   *   private final static String selectForGetLieux = 
    "SELECT    `id_lieu`    , `id_type_lieu`, `icon`              , `icon_gmap_init`    , `nom`      ,`addresse`, \n" +
    "          `code_postal`, `ville`       , `google_coords_lat` , `google_coords_long`, `telephone`, `mail`   , \n" +
    "          `url`        , `info_complementaire`, `actif`                                                      \n" +
    "FROM      `lieu`           \n" ;
   * 
   * */
  
  
  private final static String queryForCreateNewEmptyLieu = 
    "INSERT INTO `lieu`\n"+
    "  ( `id_type_lieu`, `nom`              , `addresse`          , `code_postal`,\n"+
    "    `ville`       , `google_coords_lat`, `google_coords_long`, `actif`       \n"+
    "  )\n"+
    "VALUES (0, '', '', '', '', 0, 0, 0)\n";
  
  @Transactional (propagation=Propagation.REQUIRED, rollbackFor=Exception.class)  
  public int createNewEmptyLieu() throws Exception
  {
    this.jdbcTemplate.update(queryForCreateNewEmptyLieu, 
        new Object[]{}, 
        new int   []{});

    int idLieu = this.getLastInsertedId();
    
    if(logger.isDebugEnabled())
      logger.debug("new empty lieu created with id='"+idLieu+"'");
    
    return idLieu;
  }
  
  protected int getLastInsertedId()
  {
    return this.getLastInsertedId(jdbcTemplate, "lieu");
  }
  
  
  public static String[]stringField = { 
    "icon"              ,   
    "iconGmapInit"      ,   
    "nom"               ,   
    "addresse"          ,   
    "codePostal"        ,   
    "ville"             ,   
    "telephone"         ,
    "mail"              ,
    "url"               ,
    "infoComplementaire",

};
  private static Hashtable<String, String> stringFieldMatching = new Hashtable<String, String>(stringField.length);
  {
    stringFieldMatching.put("icon"              , "icon"               );
    stringFieldMatching.put("iconGmapInit"      , "icon_gmap_init"     );
    stringFieldMatching.put("nom"               , "nom"                );
    stringFieldMatching.put("addresse"          , "addresse"           );
    stringFieldMatching.put("codePostal"        , "code_postal"        );
    stringFieldMatching.put("ville"             , "ville"              );
    stringFieldMatching.put("telephone"         , "telephone"          );
    stringFieldMatching.put("mail"              , "mail"               );
    stringFieldMatching.put("url"               , "url"                );
    stringFieldMatching.put("infoComplementaire", "info_complementaire");
  }
  
  public void updateStringField   (int idLieu, String fieldName, String   fieldValue  ) throws Exception
  {
    String realFieldName = stringFieldMatching.get(fieldName);
    
    if(realFieldName == null)
      throw new Exception("Unknown string field '"+fieldName+"' for lieu update");

    String query = 
      "UPDATE lieu                  \n"+
      "SET    "+realFieldName+" = ? \n"+
      "WHERE  id_lieu   = ?         \n";
    
    int nbLineUpdated = this.jdbcTemplate.update( query, 
                                                  new Object[]{fieldValue   , idLieu}, 
                                                  new int   []{Types.VARCHAR, Types.INTEGER}
                                                );
    if(logger.isDebugEnabled())
      logger.debug("Lieu with id='"+idLieu+"' has its field '"+realFieldName+"' updated with value '"+fieldValue+"' (line updated = '"+nbLineUpdated+"')");

  }
  
  public static String[]intField = {  
    "idTypeLieu"
  };
  private static Hashtable<String, String> intFieldMatching = new Hashtable<String, String>(intField.length);
  {
    intFieldMatching.put("idTypeLieu"          , "id_type_lieu"           );
   
  }
  
  
  public void updateIntegerField  (int idLieu, String fieldName, int      fieldValue  ) throws Exception
  {
    String realFieldName = intFieldMatching.get(fieldName);
    
    if(realFieldName == null)
      throw new Exception("Unknown int field '"+fieldName+"' for lieu update");

    String query = 
      "UPDATE lieu                 \n"+
      "SET    "+realFieldName+" = ?\n"+
      "WHERE  id_lieu           = ?\n";
    
    int nbLineUpdated = this.jdbcTemplate.update( query, 
                                                  new Object[]{fieldValue   , idLieu}, 
                                                  new int   []{Types.VARCHAR, Types.INTEGER}
                                                );
    if(logger.isDebugEnabled())
      logger.debug("Lieu with id='"+idLieu+"' has its field '"+realFieldName+"' updated with value '"+fieldValue+"' (line updated = '"+nbLineUpdated+"')");

  }
  

  
  private final static String queryForUpdateGoogleCoordinates = 
    "UPDATE lieu                   \n"+
    "SET    google_coords_lat  = ?,\n"+
    "       google_coords_long =?  \n"+
    "WHERE  id_lieu            = ? \n";
  
  public void updateGoogleCoordinates(float latitude, float longitude, int idLieu) throws Exception
  {
    if(logger.isDebugEnabled())
      logger.debug("Lieu with id='"+idLieu+"' has its coordinates (lat,long) beeing udpdated with values ('"+latitude+"','"+longitude+"')");

    int nbLineUpdated = this.jdbcTemplate.update( queryForUpdateGoogleCoordinates, 
        new Object[]{latitude   , longitude  , idLieu}, 
        new int   []{Types.FLOAT, Types.FLOAT, Types.INTEGER }
      );
    
    if(logger.isDebugEnabled())
      logger.debug("Lieu with id='"+idLieu+"' has its coordinates (lat,long) udpdated with values ('"+latitude+"','"+longitude+"') (line updated = '"+nbLineUpdated+"')");
  
  }

  
}
