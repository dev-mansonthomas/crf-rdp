package fr.croixrouge.irp.model.monitor;

import java.io.Serializable;

import fr.croixrouge.irp.model.monitor.modelInterface.ListItemInterface;

public class InterventionMotifAnnulation implements Serializable, ListItemInterface
{
  private static final long serialVersionUID = 3615810007207462918L;
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
