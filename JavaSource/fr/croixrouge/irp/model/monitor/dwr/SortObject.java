package fr.croixrouge.irp.model.monitor.dwr;

import java.io.Serializable;

public class SortObject implements Serializable
{
  private static final long serialVersionUID = -8690097939621623466L;
  private String name;
  private boolean ascending;
  
  
  public String getName()
  {
    return name;
  }
  public void setName(String fieldName)
  {
    this.name = fieldName;
  }
  public boolean isAscending()
  {
    return ascending;
  }
  public void setAscending(boolean ascending)
  {
    this.ascending = ascending;
  }
}
