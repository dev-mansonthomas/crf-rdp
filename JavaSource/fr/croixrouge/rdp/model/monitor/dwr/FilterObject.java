package fr.croixrouge.rdp.model.monitor.dwr;

import java.io.Serializable;

public class FilterObject implements Serializable
{
  private static final long serialVersionUID = -6264746880876616788L;
  private String name;
  private String value;
  private String comparator;
 
  
  public static String COMP_LIKE = "LIKE";
  public static String COMP_EQUAL= "=";
  
  
  public FilterObject()
  {
    
  }
  public FilterObject(String name, String value, String comparator)
  {
    this.name       = name;
    this.value      = value;
    this.comparator = comparator;
  }
  
  public String toString()
  {
    return "[name:"+this.name+",comparator:"+this.comparator+",value:"+this.value+"]"; 
  }
  
  public String getName()
  {
    return name;
  }
  public void setName(String fieldName)
  {
    this.name = fieldName;
  }
  public String getValue()
  {
    return value;
  }
  public void setValue(String fieldValue)
  {
    this.value = fieldValue;
  }
  public String getComparator()
  {
    return comparator;
  }
  public void setComparator(String comparator)
  {
    this.comparator = comparator;
  }
}
