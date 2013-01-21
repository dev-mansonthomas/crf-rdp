package fr.croixrouge.rdp.model.monitor;

import java.io.Serializable;
import java.util.Date;

public class Vehicule implements Serializable
{
  private static final long serialVersionUID = 5283652791586639453L;
  
  private  int    idVehicule              ;
  private  int    idVehiculeType          ;
  private  String indicatif               ;
  private  int    idDelegation            ;
  private  int    idDispositif            ;
  private  float  lastKnowCoordinateLat   ;
  private  float  lastKnowCoordinateLong  ;
  private  String mobile450Id             ;
  private  String mobile150Id             ;
  
  private  String marque                  ;
  private  String modele                  ;
  private  String immatriculation         ;
  private  String carburant               ;
  private  Date   dateDernierControleTech ;
  private  Date   dateMiseEnService       ;
  
  private  String parkingRue              ;
  private  String parkingCodePostal       ;
  private  String ParkingVille            ;
  private  float  parkingCoordinateLat    ;
  private  float  parkingCoordinateLong   ;
  private  String parkingInstructions     ;
  
    
  public int getIdVehicule()
  {
    return idVehicule;
  }
  public void setIdVehicule(int idVehicule)
  {
    this.idVehicule = idVehicule;
  }
  public int getIdVehiculeType()
  {
    return idVehiculeType;
  }
  public void setIdVehiculeType(int idVehiculeType)
  {
    this.idVehiculeType = idVehiculeType;
  }
  public String getIndicatif()
  {
    return indicatif;
  }
  public void setIndicatif(String indicatif)
  {
    this.indicatif = indicatif;
  }
  public int getIdDelegation()
  {
    return idDelegation;
  }
  public void setIdDelegation(int idDelegation)
  {
    this.idDelegation = idDelegation;
  }
  public float getLastKnowCoordinateLat()
  {
    return lastKnowCoordinateLat;
  }
  public void setLastKnowCoordinateLat(float lastKnowCoordinateLat)
  {
    this.lastKnowCoordinateLat = lastKnowCoordinateLat;
  }
  public float getLastKnowCoordinateLong()
  {
    return lastKnowCoordinateLong;
  }
  public void setLastKnowCoordinateLong(float lastKnowCoordinateLong)
  {
    this.lastKnowCoordinateLong = lastKnowCoordinateLong;
  }
  public String getMobile450Id()
  {
    return mobile450Id;
  }
  public void setMobile450Id(String mobile450Id)
  {
    this.mobile450Id = mobile450Id;
  }
  public String getMobile150Id()
  {
    return mobile150Id;
  }
  public void setMobile150Id(String mobile150Id)
  {
    this.mobile150Id = mobile150Id;
  }
  public String getMarque()
  {
    return marque;
  }
  public void setMarque(String marque)
  {
    this.marque = marque;
  }
  public String getModele()
  {
    return modele;
  }
  public void setModele(String modele)
  {
    this.modele = modele;
  }
  public String getCarburant()
  {
    return carburant;
  }
  public void setCarburant(String carburant)
  {
    this.carburant = carburant;
  }
  public Date getDateDernierControleTech()
  {
    return dateDernierControleTech;
  }
  public void setDateDernierControleTech(Date dateDernierControleTech)
  {
    this.dateDernierControleTech = dateDernierControleTech;
  }
  public int getIdDispositif()
  {
    return idDispositif;
  }
  public void setIdDispositif(int idDispositif)
  {
    this.idDispositif = idDispositif;
  }
  public String getImmatriculation()
  {
    return immatriculation;
  }
  public void setImmatriculation(String immatriculation)
  {
    this.immatriculation = immatriculation;
  }
  public Date getDateMiseEnService()
  {
    return dateMiseEnService;
  }
  public void setDateMiseEnService(Date dateMiseEnService)
  {
    this.dateMiseEnService = dateMiseEnService;
  }
  public String getParkingRue()
  {
    return parkingRue;
  }
  public void setParkingRue(String parkingRue)
  {
    this.parkingRue = parkingRue;
  }
  public String getParkingCodePostal()
  {
    return parkingCodePostal;
  }
  public void setParkingCodePostal(String parkingCodePostal)
  {
    this.parkingCodePostal = parkingCodePostal;
  }
  public String getParkingVille()
  {
    return ParkingVille;
  }
  public void setParkingVille(String parkingVille)
  {
    ParkingVille = parkingVille;
  }
  public float getParkingCoordinateLat()
  {
    return parkingCoordinateLat;
  }
  public void setParkingCoordinateLat(float parkingCoordinateLat)
  {
    this.parkingCoordinateLat = parkingCoordinateLat;
  }
  public float getParkingCoordinateLong()
  {
    return parkingCoordinateLong;
  }
  public void setParkingCoordinateLong(float parkingCoordinateLong)
  {
    this.parkingCoordinateLong = parkingCoordinateLong;
  }
  public String getParkingInstructions()
  {
    return parkingInstructions;
  }
  public void setParkingInstructions(String parkingInstructions)
  {
    this.parkingInstructions = parkingInstructions;
  }
  
    
}
