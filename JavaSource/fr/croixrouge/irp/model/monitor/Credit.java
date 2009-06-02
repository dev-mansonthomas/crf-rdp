package fr.croixrouge.irp.model.monitor;

import java.io.Serializable;

public class Credit implements Serializable
{
  private static final long serialVersionUID = 8958735254158859756L;
  private int    id;
  private int    order;
  private String name;
  private String version;
  private String url;
  private String description;
  
  public int getId()
  {
    return id;
  }
  public void setId(int id)
  {
    this.id = id;
  }
  public int getOrder()
  {
    return order;
  }
  public void setOrder(int order)
  {
    this.order = order;
  }
  public String getName()
  {
    return name;
  }
  public void setName(String name)
  {
    this.name = name;
  }
  public String getVersion()
  {
    return version;
  }
  public void setVersion(String version)
  {
    this.version = version;
  }
  public String getUrl()
  {
    return url;
  }
  public void setUrl(String url)
  {
    this.url = url;
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
