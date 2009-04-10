package fr.croixrouge.irp.model.monitor;

import java.io.Serializable;

import fr.croixrouge.irp.model.monitor.modelInterface.ListItemInterface;

public class UserRole  implements Serializable, ListItemInterface
{
  private static final long serialVersionUID = -4652687204766213076L;

  private int               id;
  private String            label, code;

  public int getId()
  {
    return id;
  }

  public void setId(int idUserRole)
  {
    this.id = idUserRole;
  }

  public String getLabel()
  {
    return label;
  }

  public void setLabel(String label)
  {
    this.label = label;
  }

  public String getCode()
  {
    return code;
  }

  public void setCode(String code)
  {
    this.code = code;
  }

}
