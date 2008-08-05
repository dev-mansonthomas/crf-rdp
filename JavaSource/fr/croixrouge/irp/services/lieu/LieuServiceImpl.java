package fr.croixrouge.irp.services.lieu;

import java.util.ArrayList;
import java.util.Hashtable;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.jdbc.core.JdbcTemplate;

import fr.croixrouge.irp.model.monitor.Lieu;
import fr.croixrouge.irp.model.monitor.LieuType;
import fr.croixrouge.irp.model.monitor.rowMapper.LieuRowMapper;
import fr.croixrouge.irp.model.monitor.rowMapper.LieuTypeRowMapper;
import fr.croixrouge.irp.services.cache.CacheService;

public class LieuServiceImpl implements LieuService
{
  private static  Log           logger            = LogFactory.getLog(LieuServiceImpl.class);
  
  private JdbcTemplate jdbcTemplate;
  private CacheService cacheService;
  public LieuServiceImpl(JdbcTemplate jdbcTemplate, CacheService cacheService)
  {
    this.jdbcTemplate = jdbcTemplate;
    this.cacheService = cacheService;
  }
  
  
  private final static String selectForGetLieuType = 
    "SELECT `id_type_lieu`,`num_ordre`, `label_type_lieu`,`icon_lieu`,`icon_lieu_shadow`\n" +
    "FROM   type_lieu\n" +
    "ORDER BY `num_ordre` ASC";
  
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
    "SELECT `id_type_lieu`,`num_ordre`, `label_type_lieu`,`icon_lieu`,`icon_lieu_shadow`\n" +
    "FROM   type_lieu\n" +
    "ORDER BY `num_ordre` ASC";
  
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
  public Hashtable<Integer, List<Lieu>> getLieuSorted() throws Exception
  {
    if(logger.isDebugEnabled())
      logger.debug("getLieuSorted - retrieving from cache");
    
    Hashtable<Integer, List<Lieu>> lieuSorted = (Hashtable<Integer, List<Lieu>>)this.cacheService.getObject("LieuSorted", true);
    if(lieuSorted != null)
      return lieuSorted;

    if(logger.isDebugEnabled())
      logger.debug("getLieuSorted - retrieving from cache : Cache MISS");

    lieuSorted = new Hashtable<Integer, List<Lieu>>(10);
    
    List<Lieu> allLieu = this.getLieu();
    
    for (Lieu lieu : allLieu)
    {
      List<Lieu> oneList = lieuSorted.get(lieu.getIdTypeLieu());
      if(oneList == null)
      {
        oneList = new ArrayList<Lieu> ();
        lieuSorted.put(lieu.getIdTypeLieu(), oneList);
      }
      
      oneList.add(lieu);
    }
    
   
    this.cacheService.setObject("LieuSorted", lieuSorted);
 
    if(logger.isDebugEnabled())
      logger.debug("getLieuSorted - added to cache");
     
    return lieuSorted;
  }
  
}
