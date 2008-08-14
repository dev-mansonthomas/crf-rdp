package fr.croixrouge.irp.services.dwr.monitorCommons;

import java.util.Hashtable;
import java.util.List;

import fr.croixrouge.irp.model.monitor.Lieu;
import fr.croixrouge.irp.model.monitor.LieuType;
import fr.croixrouge.irp.services.dwr.DWRUtils;
import fr.croixrouge.irp.services.lieu.LieuService;
import fr.croixrouge.irp.services.list.ListService;

public class MonitorCommonsImpl  extends DWRUtils implements MonitorCommonsService
{
  private ListService         listService         = null;
  private LieuService         lieuService         = null;
  
  public MonitorCommonsImpl(ListService         listService,
                            LieuService         lieuService)
  {
    System.err.println("New MonitorCommons");
    this.listService       = listService;
    this.lieuService       = lieuService;
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
    
    return this.lieuService.getLieuSorted();
  }
}
