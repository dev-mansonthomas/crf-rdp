package fr.croixrouge.rdp.model.monitor.dwr;

import java.io.Serializable;

public class GridSearchFilterAndSortObject implements Serializable
{
  private static final long serialVersionUID = 2644048316831832097L;
  private int start;
  private int limit;
  
  private FilterObject[] filters;
  private SortObject  [] sorts  ;
  
  public String toString()
  {
    StringBuilder sb = new StringBuilder("GridSearchFilterAndSortObject:{");
    
    sb.append("start:");
    sb.append(start);
    sb.append(",limit:");
    sb.append(limit);
    
    sb.append(",filters:[");
    for (FilterObject filterObject : this.filters)
      sb.append(filterObject);
    
    sb.append("],sorts:[");
    for (SortObject sortObject : this.sorts)
      sb.append(sortObject); 

    sb.append("]}");
    return sb.toString();
  }
  
  public FilterObject getFilterObject(String filterName)
  {
    if(filters == null || filters.length == 0 || filterName == null)
      return null;
    
    for (FilterObject oneFilterObject : this.filters)
    {
      if(filterName.equals(oneFilterObject.getName()))
          return oneFilterObject;
    }
    return null;
  }
  
  public SortObject getSortObject(String sortName)
  {
    if(filters == null || filters.length == 0 || sortName == null)
      return null;
    
    for (SortObject oneSortObject : this.sorts)
    {
      if(sortName.equals(oneSortObject.getName()))
          return oneSortObject;
    }
    return null;
  }
  
  public void setSingleSort(SortObject sortObject)
  {
    this.sorts = new SortObject[1];
    this.sorts[0]=sortObject;
  }
  
  public int getStart()
  {
    return start;
  }
  public void setStart(int index)
  {
    this.start = index;
  }
  public int getLimit()
  {
    return limit;
  }
  public void setLimit(int limit)
  {
    this.limit = limit;
  }
  public FilterObject[] getFilters()
  {
    return filters;
  }
  public void setFilters(FilterObject[] filterObjects)
  {
    this.filters = filterObjects;
  }
  public SortObject[] getSorts()
  {
    return sorts;
  }
  public void setSorts(SortObject[] sortObjects)
  {
    this.sorts = sortObjects;
  }
  
  
  
  
}
