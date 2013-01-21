package fr.croixrouge.rdp.model.monitor;

import java.io.Serializable;

public class EvaluationSession implements Serializable
{
 
  private static final long serialVersionUID = 2110094073656429668L;
  
  private int idEvaluationSession;       
  private int idDispositif;               
  private int idRoleEvalue;              
  private int idEquipierEvalue;          
  private int idEquipierEvaluateur;
  
  
  public int getIdEvaluationSession()
  {
    return idEvaluationSession;
  }
  public void setIdEvaluationSession(int idEvaluationSession)
  {
    this.idEvaluationSession = idEvaluationSession;
  }
  public int getIdDispositif()
  {
    return idDispositif;
  }
  public void setIdDispositif(int idDispositif)
  {
    this.idDispositif = idDispositif;
  }
  public int getIdRoleEvalue()
  {
    return idRoleEvalue;
  }
  public void setIdRoleEvalue(int idRoleEvalue)
  {
    this.idRoleEvalue = idRoleEvalue;
  }
  public int getIdEquipierEvalue()
  {
    return idEquipierEvalue;
  }
  public void setIdEquipierEvalue(int idEquipierEvalue)
  {
    this.idEquipierEvalue = idEquipierEvalue;
  }
  public int getIdEquipierEvaluateur()
  {
    return idEquipierEvaluateur;
  }
  public void setIdEquipierEvaluateur(int idEquipierEvaluateur)
  {
    this.idEquipierEvaluateur = idEquipierEvaluateur;
  }
  
  
  
  
}
