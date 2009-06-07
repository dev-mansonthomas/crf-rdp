package fr.croixrouge.rdp.model.monitor;

import java.io.Serializable;

import fr.croixrouge.rdp.model.monitor.modelInterface.ListItemInterface;

public class InterventionEtat implements Serializable, ListItemInterface
{
  private static final long serialVersionUID = -6040575333924047657L;
  private int               id;
  private String            label;

  public int getId()
  {
    return id;
  }

  public void setId(int idMotif)
  {
    this.id = idMotif;
  }

  public String getLabel()
  {
    return label;
  }

  public void setLabel(String labelMotif)
  {
    this.label = labelMotif;
  }

}
