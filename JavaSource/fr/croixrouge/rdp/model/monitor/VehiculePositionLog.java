package fr.croixrouge.rdp.model.monitor;

import java.io.Serializable;

public class VehiculePositionLog implements Serializable
{
  private static final long serialVersionUID = 5922246257717301390L;
  
  
  private int   idVehiculePositionLog;
  private int   idVehicule           ;
  private float coordinateLat        ;
  private float coordinateLong       ;
  private int   coordinatesOrigine   ;
  
  public int getIdVehiculePositionLog()
  {
    return idVehiculePositionLog;
  }
  public void setIdVehiculePositionLog(int idVehiculePositionLog)
  {
    this.idVehiculePositionLog = idVehiculePositionLog;
  }
  public int getIdVehicule()
  {
    return idVehicule;
  }
  public void setIdVehicule(int idVehicule)
  {
    this.idVehicule = idVehicule;
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
  public int getCoordinatesOrigine()
  {
    return coordinatesOrigine;
  }
  public void setCoordinatesOrigine(int coordinatesOrigine)
  {
    this.coordinatesOrigine = coordinatesOrigine;
  }
  
}
