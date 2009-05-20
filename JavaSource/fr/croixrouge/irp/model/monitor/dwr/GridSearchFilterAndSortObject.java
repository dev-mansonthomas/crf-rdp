package fr.croixrouge.irp.model.monitor.dwr;

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
