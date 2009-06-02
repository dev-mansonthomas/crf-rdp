package fr.croixrouge.irp.model.monitor;

import java.io.Serializable;

public class ApplicationVersionChangeLog implements Serializable
{
  private static final long serialVersionUID = -9097100939643717263L;
  private int id;
  private int idApplicationVersion;
  private String idJira;
  private String description;
  
  public int getId()
  {
    return id;
  }
  public void setId(int id)
  {
    this.id = id;
  }
  public int getIdApplicationVersion()
  {
    return idApplicationVersion;
  }
  public void setIdApplicationVersion(int idApplicationVersion)
  {
    this.idApplicationVersion = idApplicationVersion;
  }
  public String getIdJira()
  {
    return idJira;
  }
  public void setIdJira(String idJira)
  {
    this.idJira = idJira;
  }
  public String getDescription()
  {
    return description;
  }
  public void setDescription(String description)
  {
    this.description = description;
  }
}
