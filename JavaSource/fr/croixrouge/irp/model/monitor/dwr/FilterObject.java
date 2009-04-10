package fr.croixrouge.irp.model.monitor.dwr;

import java.io.Serializable;

public class FilterObject implements Serializable
{
  private static final long serialVersionUID = -6264746880876616788L;
  private String fieldName;
  private String fieldValue;
  
  
  public String getFieldName()
  {
    return fieldName;
  }
  public void setFieldName(String fieldName)
  {
    this.fieldName = fieldName;
  }
  public String getFieldValue()
  {
    return fieldValue;
  }
  public void setFieldValue(String fieldValue)
  {
    this.fieldValue = fieldValue;
  }
}
