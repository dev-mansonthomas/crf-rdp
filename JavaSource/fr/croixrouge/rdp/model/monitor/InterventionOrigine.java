package fr.croixrouge.rdp.model.monitor;

import java.io.Serializable;

import fr.croixrouge.rdp.model.monitor.modelInterface.ListItemInterface;

public class InterventionOrigine implements Serializable, ListItemInterface
{
  private static final long serialVersionUID = -6551129408242576584L;
  private int               id;
  private String            label;

  public int getId()
  {
    return id;
  }

  public void setId(int idOrigine)
  {
    this.id = idOrigine;
  }

  public String getLabel()
  {
    return label;
  }

  public void setLabel(String labelOrigine)
  {
    this.label = labelOrigine;
  }

}
