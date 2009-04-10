package fr.croixrouge.irp.model.monitor;

import java.io.Serializable;

import fr.croixrouge.irp.model.monitor.modelInterface.ListItemInterface;

public class DispositifType implements Serializable, ListItemInterface
{
  private static final long serialVersionUID = 5472546213352116331L;
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
