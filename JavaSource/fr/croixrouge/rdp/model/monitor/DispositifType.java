package fr.croixrouge.rdp.model.monitor;

import java.io.Serializable;

import fr.croixrouge.rdp.model.monitor.modelInterface.ListItemInterface;

public class DispositifType implements Serializable, ListItemInterface
{
  private static final long serialVersionUID = 5472546213352116331L;
  private int               id;
  private String            label;
  private int               nombreEquipierMax = 0;
  private int               idRoleLeader      = 0;
  private int               idVehiculeType    = 0;
  

  public int getId()
  {
    return id;
  }

  public void setId(int id)
  {
    this.id = id;
  }

  public String getLabel()
  {
    return label;
  }

  public void setLabel(String label)
  {
    this.label = label;
  }

  public int getNombreEquipierMax()
  {
    return nombreEquipierMax;
  }

  public void setNombreEquipierMax(int nombreEquipierMax)
  {
    this.nombreEquipierMax = nombreEquipierMax;
  }

  public int getIdRoleLeader()
  {
    return idRoleLeader;
  }

  public void setIdRoleLeader(int idRoleLeaderDispositif)
  {
    this.idRoleLeader = idRoleLeaderDispositif;
  }

  public int getIdVehiculeType()
  {
    return idVehiculeType;
  }

  public void setIdVehiculeType(int idTypeVehicule)
  {
    this.idVehiculeType = idTypeVehicule;
  }
}
