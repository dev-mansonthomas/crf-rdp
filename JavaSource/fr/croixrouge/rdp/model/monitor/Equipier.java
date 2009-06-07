package fr.croixrouge.rdp.model.monitor;

import java.util.Date;

public class Equipier extends CrfDto
{
  private static final long serialVersionUID = -569522743428603329L;
 
  private int       idEquipier            ;
  private int       equipierRank          ;
  private int       idDispositif          ;
  private boolean   homme;
  private String    numNivol               = null;
  private String    nom                    = null;
  private String    prenom                 = null;
  private String    mobile                 = null;
  private String    email                  = null;
  
  private Date      dhDebut                = null;
  private Date      dhFin                  = null;
  
  private Delegation  delegation          = null;
  
  private String      autreDelegation     = null;

  private int         idRole1;
  private int         idRole2;
  private int         idRoleDansDispositif;
  
  
  public String getAutreDelegation()
  {
    return autreDelegation;
  }
  public void setAutreDelegation(String autre_delegation)
  {
    this.autreDelegation = autre_delegation;
  }
  public Delegation getDelegation()
  {
    return delegation;
  }
  public void setDelegation(Delegation delegation)
  {
    this.delegation = delegation;
  }
  public Date getDhDebut()
  {
    return dhDebut;
  }
  public void setDhDebut(Date dh_debut)
  {
    dhDebut = dh_debut;
  }
  public Date getDhFin()
  {
    return dhFin;
  }
  public void setDhFin(Date dh_fin)
  {
    dhFin = dh_fin;
  }
  public int getIdDispositif()
  {
    return idDispositif;
  }
  public void setIdDispositif(int id_dispositif)
  {
    this.idDispositif = id_dispositif;
  }
  public int getIdEquipier()
  {
    return idEquipier;
  }
  public void setIdEquipier(int id_equipier)
  {
    this.idEquipier = id_equipier;
  }
  public String getNom()
  {
    return nom;
  }
  public void setNom(String nom)
  {
    this.nom = nom;
  }
  public String getNumNivol()
  {
    return numNivol;
  }
  public void setNumNivol(String num_nivol)
  {
    this.numNivol = num_nivol;
  }
  public String getPrenom()
  {
    return prenom;
  }
  public void setPrenom(String prenom)
  {
    this.prenom = prenom;
  }
  public int getIdRole1()
  {
    return idRole1;
  }
  public void setIdRole1(int idRole1)
  {
    this.idRole1 = idRole1;
  }
  public int getIdRole2()
  {
    return idRole2;
  }
  public void setIdRole2(int idRole2)
  {
    this.idRole2 = idRole2;
  }
  public int getIdRoleDansDispositif()
  {
    return idRoleDansDispositif;
  }
  public void setIdRoleDansDispositif(int idRoleDansDispositif)
  {
    this.idRoleDansDispositif = idRoleDansDispositif;
  }
  public boolean isHomme()
  {
    return homme;
  }
  public void setHomme(boolean homme)
  {
    this.homme = homme;
  }
  public int getEquipierRank()
  {
    return equipierRank;
  }
  public void setEquipierRank(int equipierRank)
  {
    this.equipierRank = equipierRank;
  }
  public String getMobile()
  {
    return mobile;
  }
  public void setMobile(String mobile)
  {
    this.mobile = mobile;
  }
  public String getEmail()
  {
    return email;
  }
  public void setEmail(String email)
  {
    this.email = email;
  }
 
      
}
