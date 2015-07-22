package fr.croixrouge.rdp.services.cache;


public interface CacheService 
{
  Object getObject(String name) throws Exception;
  Object getObject(String name, boolean silentCacheMiss) throws Exception;
  void   setObject(String name, Object object) throws Exception;
  void   clearCache() throws Exception;
  void   remove(String name) throws Exception;

}
