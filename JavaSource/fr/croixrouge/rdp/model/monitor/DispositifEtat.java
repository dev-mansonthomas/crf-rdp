package fr.croixrouge.rdp.model.monitor;

import java.io.Serializable;

import fr.croixrouge.rdp.model.monitor.modelInterface.ListItemInterface;

public class DispositifEtat implements Serializable, ListItemInterface
{
  private static final long serialVersionUID = 3888801599336209235L;
  private int    id;
  private String label;

  public int getId()
  {
    return this.id;
  }

  public void setId(final int id)
  {
    this.id = id;
  }

  public String getLabel()
  {
    return this.label;
  }

  public void setLabel(final String label)
  {
    this.label = label;
  }
}
