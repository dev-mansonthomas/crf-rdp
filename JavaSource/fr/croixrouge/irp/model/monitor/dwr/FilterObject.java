package fr.croixrouge.irp.model.monitor.dwr;

import java.io.Serializable;

public class FilterObject implements Serializable
{
  private static final long serialVersionUID = -6264746880876616788L;
  private String name;
  private String value;
  
  
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
}
