package fr.croixrouge.rdp.model.monitor.dwr;

import java.io.Serializable;
import java.util.List;


public class ListRange<T> implements Serializable
{
  private static final long serialVersionUID = 8384259935841191902L;

  private int totalCount;
  
  private List<T> data;

  public ListRange()
  {
    this.data       = null;
    this.totalCount = 0;
  }
  
  public ListRange(int totalCount, List<T> data)
  {
    this.data       = data;
    this.totalCount = totalCount;
  }
  
  public int getTotalCount()
  {
    return totalCount;
  }
  public void setTotalCount(int totalCount)
  {
    this.totalCount = totalCount;
  }
  public List<T> getData()
  {
    return data;
  }

  public void setData(List<T> data)
  {
    this.data = data;
  }
}
