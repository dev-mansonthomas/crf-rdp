package fr.croixrouge.rdp.model.monitor;

import java.io.Serializable;

public class DispositifSummaryInformation implements Serializable
{
  private static final long serialVersionUID = -4060633116822667718L;

 
  
  private int   idDispositif;
  private int   idVehicule;
  private int   idEtatDispositif;
  private int[] idInterventions;
  private float coordinateLat;
  private float coordinateLong;
  
  
  @Override
  public String toString()
  {
    StringBuilder sb = new StringBuilder("\n DispositifSummaryInformation idDispositif='");
    sb.append(idDispositif);
    sb.append("'\nidVehicule='");
    sb.append(idVehicule);
    sb.append("'\nidEtatDispositif='");
    sb.append(idEtatDispositif);
    sb.append("'\nidInterventions=[");
    
    if(idInterventions != null)
    {
      for (int idIntervention : idInterventions)
      {
        sb.append(idIntervention);
        sb.append(",");
      }
    }
    
    
    sb.append("]\ncoordinateLat='");
    sb.append(coordinateLat); 
    sb.append("'\ncoordinateLong='");
    sb.append(coordinateLong);
    return sb.toString();
  }
  
  
  public int getIdDispositif()
  {
    return idDispositif;
  }
  public void setIdDispositif(int idDispositif)
  {
    this.idDispositif = idDispositif;
  }
  public int getIdVehicule()
  {
    return idVehicule;
  }
  public void setIdVehicule(int idVehicule)
  {
    this.idVehicule = idVehicule;
  }
  public int getIdEtatDispositif()
  {
    return idEtatDispositif;
  }
  public void setIdEtatDispositif(int idEtatDispositif)
  {
    this.idEtatDispositif = idEtatDispositif;
  }
  public int[] getIdInterventions()
  {
    return idInterventions;
  }
  public void setIdInterventions(int[] idInterventions)
  {
    this.idInterventions = idInterventions;
  }
  public float getCoordinateLat()
  {
    return coordinateLat;
  }
  public void setCoordinateLat(float coordinateLat)
  {
    this.coordinateLat = coordinateLat;
  }
  public float getCoordinateLong()
  {
    return coordinateLong;
  }
  public void setCoordinateLong(float coordinateLong)
  {
    this.coordinateLong = coordinateLong;
  }
  
}
