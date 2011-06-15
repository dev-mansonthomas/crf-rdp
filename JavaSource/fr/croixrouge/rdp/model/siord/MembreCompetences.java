package fr.croixrouge.rdp.model.siord;

import java.io.Serializable;

public class MembreCompetences implements Serializable
{
  private static final long serialVersionUID = -4954419789267061926L;
  
  private int idImport ;
  private int id       ; 
  private int idMembre ;
  private int idRole   ;
  
  public int getIdImport()
  {
    return idImport;
  }
  public void setIdImport(int idImport)
  {
    this.idImport = idImport;
  }
  public int getId()
  {
    return id;
  }
  public void setId(int id)
  {
    this.id = id;
  }
  public int getIdMembre()
  {
    return idMembre;
  }
  public void setIdMembre(int idMembre)
  {
    this.idMembre = idMembre;
  }
  public int getIdRole()
  {
    return idRole;
  }
  public void setIdRole(int idRole)
  {
    this.idRole = idRole;
  }

}
