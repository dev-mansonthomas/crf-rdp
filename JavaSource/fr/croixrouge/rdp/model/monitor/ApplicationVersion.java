package fr.croixrouge.rdp.model.monitor;

import java.io.Serializable;

public class ApplicationVersion implements Serializable
{
  private static final long serialVersionUID = 7147548826920395912L;
  private int id;
  private String versionName;
  private String devReleaseDate;
  private String productionReleaseDate;
  private String description;
  
  
  public int getId()
  {
    return id;
  }
  public void setId(int id)
  {
    this.id = id;
  }
  public String getVersionName()
  {
    return versionName;
  }
  public void setVersionName(String versionName)
  {
    this.versionName = versionName;
  }
  public String getDevReleaseDate()
  {
    return devReleaseDate;
  }
  public void setDevReleaseDate(String devReleaseDate)
  {
    this.devReleaseDate = devReleaseDate;
  }
  public String getProductionReleaseDate()
  {
    return productionReleaseDate;
  }
  public void setProductionReleaseDate(String productionReleaseDate)
  {
    this.productionReleaseDate = productionReleaseDate;
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
