package fr.croixrouge.irp.model.monitor.dwr;

import java.io.Serializable;

public class GridSearchFilterAndSortObject implements Serializable
{
  private static final long serialVersionUID = 2644048316831832097L;
  private int index;
  private int limit;
  
  private FilterObject[] filterObjects;
  private SortObject  [] sortObjects  ;
  
  public int getIndex()
  {
    return index;
  }
  public void setIndex(int index)
  {
    this.index = index;
  }
  public int getLimit()
  {
    return limit;
  }
  public void setLimit(int limit)
  {
    this.limit = limit;
  }
  public FilterObject[] getFilterObjects()
  {
    return filterObjects;
  }
  public void setFilterObjects(FilterObject[] filterObjects)
  {
    this.filterObjects = filterObjects;
  }
  public SortObject[] getSortObjects()
  {
    return sortObjects;
  }
  public void setSortObjects(SortObject[] sortObjects)
  {
    this.sortObjects = sortObjects;
  }
  
  
  
  
}
