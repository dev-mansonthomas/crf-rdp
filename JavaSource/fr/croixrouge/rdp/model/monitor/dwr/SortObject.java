package fr.croixrouge.rdp.model.monitor.dwr;

import java.io.Serializable;

public class SortObject implements Serializable
{
  
  private static final long serialVersionUID = -8690097939621623466L;
  private String  name;
  private boolean ascending;
  
  public SortObject()
  {
    
  }

  public SortObject(String name, boolean ascending)
  {
    this.name      = name;
    this.ascending = ascending;
  }
  
  public String toString()
  {
    return "[name:"+this.name+",ascending:"+this.ascending+"]"; 
  }
  
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
