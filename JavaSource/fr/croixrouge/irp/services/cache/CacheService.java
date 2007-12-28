package fr.croixrouge.irp.services.cache;


public interface CacheService 
{
  public Object getObject(String name)               throws Exception;
  public void   setObject(String name, Object object)throws Exception;
  public void   clearCache()                         throws Exception;

}
