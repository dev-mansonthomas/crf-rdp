package fr.croixrouge.rdp.model.monitor;

import java.io.Serializable;

import fr.croixrouge.rdp.model.monitor.modelInterface.ListItemInterface;

public class VehiculeType implements Serializable, ListItemInterface
{
  private static final long serialVersionUID = -2415452034620057233L;
 
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
