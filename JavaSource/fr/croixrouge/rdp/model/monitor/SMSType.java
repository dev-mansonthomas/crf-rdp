package fr.croixrouge.rdp.model.monitor;

import java.io.Serializable;

import fr.croixrouge.rdp.model.monitor.modelInterface.ListItemInterface;

public class SMSType implements Serializable, ListItemInterface
{

  private static final long serialVersionUID = 5703531526853082110L;
  
  private int               id;
  private String            label;

  public int getId()
  {
    return id;
  }

  public void setId(int id)
  {
    this.id = id;
  }

  public String getLabel()
  {
    return label;
  }

  public void setLabel(String label)
  {
    this.label = label;
  }

}
