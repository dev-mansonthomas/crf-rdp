package fr.croixrouge.rdp.model.monitor;

import java.io.Serializable;

public class Delegation implements Serializable
{
  private static final long serialVersionUID = -9036828043202493882L;
  
  private int     idDelegation;
  private String  nom         ;
  private String  departement ;
  
  public String getDepartement()
  {
    return departement;
  }
  public void setDepartement(String departement)
  {
    this.departement = departement;
  }
  public int getIdDelegation()
  {
    return idDelegation;
  }
  public void setIdDelegation(int idDelegation)
  {
    this.idDelegation = idDelegation;
  }
  public String getNom()
  {
    return nom;
  }
  public void setNom(String nom)
  {
    this.nom = nom;
  }
  
  
}
