package fr.croixrouge.irp.model.monitor.dwr;

import java.io.Serializable;

public class GridSearchFilterAndSortObject implements Serializable
{
  private static final long serialVersionUID = 2644048316831832097L;
  private int start;
  private int limit;
  
  private FilterObject[] filters;
  private SortObject  [] sorts  ;
  
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
