package fr.croixrouge.rdp.services.restServices.monitor.commons;

import fr.croixrouge.rdp.model.monitor.Lieu;
import fr.croixrouge.rdp.model.monitor.LieuType;
import fr.croixrouge.rdp.model.monitor.dwr.FilterObject;
import fr.croixrouge.rdp.model.monitor.dwr.GridSearchFilterAndSortObject;
import fr.croixrouge.rdp.model.monitor.dwr.ListRange;
import fr.croixrouge.rdp.services.lieu.LieuService;
import fr.croixrouge.rdp.services.list.ListService;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.util.ArrayList;
import java.util.Hashtable;
import java.util.List;

public class MonitorCommonsImpl
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
  
  
  public ListRange<Lieu> searchLieux(int idLieuType, GridSearchFilterAndSortObject gridSearchFilterAndSortObject) throws Exception
  {
   


   FilterObject filterObject = gridSearchFilterAndSortObject.getFilterObject("searchString");
    
    if(filterObject == null  || filterObject.getValue() == null || filterObject.getValue().equals(""))
      return new ListRange<>(0, new ArrayList<Lieu>());
 
    String searchString = filterObject.getValue();
    
    return this.lieuService.searchLieux("%"+searchString+"%", 
                                        idLieuType, 
                                        gridSearchFilterAndSortObject.getStart(),
                                        gridSearchFilterAndSortObject.getLimit());
  }
  
  
  public Hashtable<String, List<?>> getAllList() throws Exception
  {
   
    
    return this.listService.getAllList();
  }
  
  public List<LieuType> getLieuType() throws Exception
  {
   
    
    return this.lieuService.getLieuType();
  }
  
  public Hashtable<String, List<Lieu>> getAllLieu() throws Exception
  {
   
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
