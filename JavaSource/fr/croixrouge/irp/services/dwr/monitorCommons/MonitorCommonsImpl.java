package fr.croixrouge.irp.services.dwr.monitorCommons;

import java.util.Hashtable;
import java.util.List;

import fr.croixrouge.irp.services.dwr.DWRUtils;
import fr.croixrouge.irp.services.list.ListService;

public class MonitorCommonsImpl  extends DWRUtils implements MonitorCommonsService
{
  private ListService         listService         = null;
  
  public MonitorCommonsImpl(ListService         listService)
  {
    System.err.println("New MonitorCommons");
    this.listService       = listService; 
  }
  
  
  @SuppressWarnings("unchecked")
  public Hashtable<String, List> getAllList() throws Exception
  {
    this.validateSession();
    
    return this.listService.getAllList();
  }
  
}
