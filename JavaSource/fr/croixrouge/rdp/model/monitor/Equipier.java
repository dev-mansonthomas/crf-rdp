package fr.croixrouge.rdp.model.monitor;

import java.util.List;

public class Equipier extends CrfDto
{
  private static final long serialVersionUID = -569522743428603329L;
 
  private int       idEquipier            ;
  private int       idDispositif          ;
  private boolean   homme                 ;
  private boolean   enabled               ;
  private String    numNivol               = null;
  private String    nom                    = null;
  private String    prenom                 = null;
  private String    mobile                 = null;
  private String    email                  = null;
  
  private Delegation  delegation          = null;
  private String      autreDelegation     = null;
  
  //données récupéré de la table dispositif_equipiers
  private int         idRoleDansDispositif= 0;
  private boolean     enEvaluationDansDispositif = false;
  
  
  private List<EquipierRole> roles;
  
  
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
  public List<EquipierRole> getRoles()
  {
    return roles;
  }
  public void setRoles(List<EquipierRole> roles)
  {
    this.roles = roles;
  }
  public boolean isEnEvaluationDansDispositif()
  {
    return enEvaluationDansDispositif;
  }
  public void setEnEvaluationDansDispositif(boolean enEvaluationDansDispositif)
  {
    this.enEvaluationDansDispositif = enEvaluationDansDispositif;
  }
  public boolean isEnabled()
  {
    return enabled;
  }
  public void setEnabled(boolean enabled)
  {
    this.enabled = enabled;
  }
 
      
}
