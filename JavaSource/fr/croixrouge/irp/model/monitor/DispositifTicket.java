package fr.croixrouge.irp.model.monitor;

import java.io.Serializable;
import java.util.Date;

public class DispositifTicket implements Serializable
{
  private static final long serialVersionUID = 3165824454988623867L;

  private int             idDispositif;
  private int             idTypeDispositif;

  private boolean         creationTerminee;

  private Date            dhDebut;
  private Date            dhFin;
  private String          indicatifVehicule;
  private int             idDelegation;
  private String          autreDelegation;
  private int             idEtatDispositif;
  private int             displayState;
  
  public int getIdDispositif()
  {
    return idDispositif;
  }
  public void setIdDispositif(int idDispositif)
  {
    this.idDispositif = idDispositif;
  }
  public int getIdTypeDispositif()
  {
    return idTypeDispositif;
  }
  public void setIdTypeDispositif(int idTypeDispositif)
  {
    this.idTypeDispositif = idTypeDispositif;
  }
  public boolean isCreationTerminee()
  {
    return creationTerminee;
  }
  public void setCreationTerminee(boolean creationTerminee)
  {
    this.creationTerminee = creationTerminee;
  }
  public Date getDhDebut()
  {
    return dhDebut;
  }
  public void setDhDebut(Date dhDebut)
  {
    this.dhDebut = dhDebut;
  }
  public Date getDhFin()
  {
    return dhFin;
  }
  public void setDhFin(Date dhFin)
  {
    this.dhFin = dhFin;
  }
  public String getIndicatifVehicule()
  {
    return indicatifVehicule;
  }
  public void setIndicatifVehicule(String indicatifVehicule)
  {
    this.indicatifVehicule = indicatifVehicule;
  }
  public int getIdDelegation()
  {
    return idDelegation;
  }
  public void setIdDelegation(int idDelegation)
  {
    this.idDelegation = idDelegation;
  }
  public String getAutreDelegation()
  {
    return autreDelegation;
  }
  public void setAutreDelegation(String autreDelegation)
  {
    this.autreDelegation = autreDelegation;
  }
  public int getIdEtatDispositif()
  {
    return idEtatDispositif;
  }
  public void setIdEtatDispositif(int idEtatDispositif)
  {
    this.idEtatDispositif = idEtatDispositif;
  }
  public int getDisplayState()
  {
    return displayState;
  }
  public void setDisplayState(int displayState)
  {
    this.displayState = displayState;
  }
}