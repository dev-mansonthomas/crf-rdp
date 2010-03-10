package fr.croixrouge.rdp.services.dwr.monitorCommons;

import java.util.Hashtable;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import fr.croixrouge.rdp.model.monitor.Lieu;
import fr.croixrouge.rdp.model.monitor.LieuType;
import fr.croixrouge.rdp.services.dwr.DWRUtils;
import fr.croixrouge.rdp.services.lieu.LieuService;
import fr.croixrouge.rdp.services.list.ListService;

public class MonitorCommonsImpl  extends DWRUtils implements MonitorCommonsService
{
  private static Log logger           = LogFactory.getLog(MonitorCommonsImpl.class);
  private ListService         listService         = null;
  private LieuService         lieuService         = null;
  
  public MonitorCommonsImpl(ListService         listService,
                            LieuService         lieuService)
  {
    this.listService       = listService;
    this.lieuService       = lieuService;
    
    if(logger.isDebugEnabled())
      logger.debug("constructor called");
  }
  
  
  @SuppressWarnings("unchecked")
  public Hashtable<String, List> getAllList() throws Exception
  {
    this.validateSession();
    
    return this.listService.getAllList();
  }
  
  public List<LieuType> getLieuType() throws Exception
  {
    this.validateSession();
    
    return this.lieuService.getLieuType();
  }
  
  public Hashtable<String, List<Lieu>> getAllLieu() throws Exception
  {
    this.validateSession();
    Hashtable<String, List<Lieu>> lieux =null;
    try
    {
      lieux = this.lieuService.getLieuSorted();
    }
    catch(Exception e)
    {
      logger.error("Error while getting all Lieux",e);
      throw e;
    }
    
    return lieux;
  }
}
