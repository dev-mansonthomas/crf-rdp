package fr.croixrouge.rdp.services.lieu;

import java.util.ArrayList;
import java.util.Hashtable;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.jdbc.core.JdbcTemplate;

import fr.croixrouge.rdp.model.monitor.Lieu;
import fr.croixrouge.rdp.model.monitor.LieuType;
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
  
  @SuppressWarnings("unchecked")
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
    "FROM      `lieu`           \n" +
    "WHERE     `id_lieu` > 0    \n" +
    "ORDER BY `id_type_lieu` ASC\n";
  
  @SuppressWarnings("unchecked")
  public List<Lieu> getLieu() throws Exception
  {
    if(logger.isDebugEnabled())
      logger.debug("getting lieu");
    
    return this.jdbcTemplate.query(selectForGetLieu   , 
        new Object[]{}    ,
        new int   []{}     ,
        new LieuRowMapper());
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
