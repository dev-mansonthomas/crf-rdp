/*
 * Créé le 20 déc. 04
 * 
 */
package fr.croixrouge.rdp.services.cache;

import net.sf.ehcache.Cache;
import net.sf.ehcache.CacheException;
import net.sf.ehcache.Element;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;


/**
 * @author A15205 - Thomas Manson - RS2i
 * @version $Revision: 1.3 $ $date$
 */

public class EHCacheService implements CacheService
{
  private        Cache cache  = null; 
  private static Log   logger = LogFactory.getLog(EHCacheService.class);
  
  public EHCacheService(Cache cache)
  {
    this.cache = cache;
    
    if(logger.isDebugEnabled())
      logger.debug("constructor called");
  }
  
  /**
   * récupere un objet dans dans la région region du cache
   * Si objet non trouvé, lance un exception
   * <P>
   * 
   * @param   name    nom de l'objet a récuperer   
   *                  
   * @return                  Objet de cache demandé
   * @since   1.0
   *
   */
  public Object getObject(String name) throws Exception
  {
    return this.getObject(name, false);
  }
  
  /**
   * récupere un objet dans dans la région region du cache
   * Si objet non trouvé, lance un exception si silentCacheMiss == false, sinon retourne null
   * <P>
   * 
   * @param   name    nom de l'objet a récuperer   
   *                  
   * @return                  Objet de cache demandé
   * @since   1.0
   *
   */
  public Object getObject(String name, boolean silentCacheMiss) throws Exception
  {

    if(logger.isDebugEnabled())
      logger.debug("Retrieving '"+name+"' object from cache");
    
    try
    {
      Element e = cache.get(name);
      
      if(e == null && !silentCacheMiss)
        throw new Exception("Objet '"+name+"' non trouvé.");
      else if( e == null)
        return null;

      if(logger.isDebugEnabled())
        logger.debug("Object '"+name+"' found in cache");

      return e.getObjectValue();
    }
    catch(CacheException e)
    {
      logger.error("Object '"+name+"' not found in cache");
      throw new Exception(e);
    }
  }
  
  /**
   * Met un objet dans dans la région region du cache
   * <P>
   * 
   * @param   name    nom de l'objet a mettre en cache
   *          object  objet a mettre en cache
   *
   * @since   1.0
   *
   */  

  public void setObject(String name, Object object) throws Exception
  {
    try
    {
      if(logger.isDebugEnabled())
        logger.debug("setting Object '"+name+"' in cache");

      cache.put(new Element(name, object));
      
      if(logger.isDebugEnabled())
        logger.debug("Object '"+name+"' set in cache");
      
    }
    catch(CacheException e)
    {
      logger.error("Error while setting Object '"+name+"' in cache");
      throw new Exception(e);
    }
  }

  /**
   * Vide entierement le cache
   * <P>
   * @since   1.0
   *
   */  
  public void clearCache() throws Exception
  {
    if(logger.isDebugEnabled())
      logger.debug("Clearing cache");
    
    try
    {
      cache.flush();
      
      if(logger.isDebugEnabled())
        logger.debug("Clearing cache Done");
      
    }
    catch(CacheException e)
    {
      logger.error("Clearing cache");
      throw new Exception(e);
    } 
  }
  
  
  /**
   * Remove an object from the cache
   */
  public void remove(String name) throws Exception
  {
    try
    {
      cache.remove(name);
    }
    catch(Exception e)
    {
      logger.error("error while removing object with name :'"+name+"'", e);
      throw e;
    }
    
  }
  
}
