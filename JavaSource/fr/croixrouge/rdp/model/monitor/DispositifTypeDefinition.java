package fr.croixrouge.rdp.model.monitor;

import java.io.Serializable;

public class DispositifTypeDefinition implements Serializable
{
  private static final long serialVersionUID = -7256942697611821509L;
  
  private int idTypeDispositif;
  private int idRole;
  private int nombreMin;
  private int nombreMax;
  
  
  
  public int getIdTypeDispositif()
  {
    return idTypeDispositif;
  }
  public void setIdTypeDispositif(int idTypeDispositif)
  {
    this.idTypeDispositif = idTypeDispositif;
  }
  public int getIdRole()
  {
    return idRole;
  }
  public void setIdRole(int idRole)
  {
    this.idRole = idRole;
  }
  public int getNombreMin()
  {
    return nombreMin;
  }
  public void setNombreMin(int nombreMin)
  {
    this.nombreMin = nombreMin;
  }
  public int getNombreMax()
  {
    return nombreMax;
  }
  public void setNombreMax(int nombreMax)
  {
    this.nombreMax = nombreMax;
  }
  
  
  
}
