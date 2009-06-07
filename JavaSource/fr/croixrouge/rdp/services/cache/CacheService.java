package fr.croixrouge.rdp.services.cache;


public interface CacheService 
{
  public Object getObject (String name                         ) throws Exception;
  public Object getObject (String name, boolean silentCacheMiss) throws Exception;
  public void   setObject (String name, Object object          ) throws Exception;
  public void   clearCache(                                    ) throws Exception;

}
