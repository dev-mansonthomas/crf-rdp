package fr.croixrouge.rdp.model.monitor;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

public class Equipier extends CrfDto  implements Serializable
{
  private static final long serialVersionUID = -569522743428603329L;

  public final static int EVAL_EVALUATEUR=1;
  public final static int EVAL_EVALUE    =2;

  public Equipier()
  {

  }

  private int       idEquipier            ;
  private int       idDispositif          ;
  private boolean   homme                 ;
  private boolean   enabled               ;
  private String    numNivol               = null;
  private String    nom                    = null;
  private String    prenom                 = null;
  private String    indicatif              = null;
  private String    mobile                 = null;
  private String    email                  = null;
  
  private Delegation  delegation          = null;
  private String      autreDelegation     = null;

  //données récupéré de la table dispositif_equipiers
  private int         idRoleDansDispositif       = 0;
  private int         evaluationDansDispositif   = 0;
  private int         idRoleEnEval               = 0;
  
  private Date        dateCreation = null;
  private Date        dateModification = null;
  
  private int         idSiord = 0;
  private Date        dateLastSynchroSiord = null;
  
  private List<EquipierRole> roles;
  

  public String toString()
  {
    
    SimpleDateFormat  sdf         = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");

    
    return 
    "idEquipier                :"+idEquipier                 +"\n"+
    "idDispositif              :"+idDispositif               +"\n"+
    "homme                     :"+homme                      +"\n"+
    "enabled                   :"+enabled                    +"\n"+
    "numNivol                  :"+numNivol                   +"\n"+
    "nom                       :"+nom                        +"\n"+
    "prenom                    :"+prenom                     +"\n"+
    "indicatif                 :"+indicatif                  +"\n"+
    "mobile                    :"+mobile                     +"\n"+
    "email                     :"+email                      +"\n"+
    "delegation                :"+delegation                 +"\n"+
    "autreDelegation           :"+autreDelegation            +"\n"+
    "idRoleDansDispositif      :"+idRoleDansDispositif       +"\n"+
    "enEvaluationDansDispositif:"+evaluationDansDispositif   +"\n"+
    "idRoleEnEval              :"+idRoleEnEval               +"\n"+
    "dateCreation              :"+sdf.format(dateCreation)    +"\n"+
    "dateModification          :"+sdf.format(dateModification)+"\n"+
    "idSiord                   :"+idSiord                     +"\n"+
    "dateLastSynchroSiord      :"+sdf.format(dateLastSynchroSiord)+"\n";
  }
  

  public String getAutreDelegation()
  {
    return autreDelegation;
  }
  public void setAutreDelegation(String autreDelegation)
  {
    this.autreDelegation = autreDelegation;
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
  public void setIdDispositif(int idDispositif)
  {
    this.idDispositif = idDispositif;
  }
  public int getIdEquipier()
  {
    return idEquipier;
  }
  public void setIdEquipier(int idEquipier)
  {
    this.idEquipier = idEquipier;
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
  public void setNumNivol(String numNivol)
  {
    this.numNivol = numNivol;
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

  public boolean isEnabled()
  {
    return enabled;
  }
  public void setEnabled(boolean enabled)
  {
    this.enabled = enabled;
  }
  public int getIdRoleEnEval()
  {
    return idRoleEnEval;
  }
  public void setIdRoleEnEval(int idRoleEnEval)
  {
    this.idRoleEnEval = idRoleEnEval;
  }
  public String getIndicatif()
  {
    return indicatif;
  }
  public void setIndicatif(String indicatif)
  {
    this.indicatif = indicatif;
  }


  public Date getDateCreation()
  {
    return dateCreation;
  }


  public void setDateCreation(Date dateCreation)
  {
    this.dateCreation = dateCreation;
  }


  public Date getDateModification()
  {
    return dateModification;
  }


  public void setDateModification(Date dateModification)
  {
    this.dateModification = dateModification;
  }


  public int getIdSiord()
  {
    return idSiord;
  }


  public void setIdSiord(int idSiord)
  {
    this.idSiord = idSiord;
  }


  public Date getDateLastSynchroSiord()
  {
    return dateLastSynchroSiord;
  }


  public void setDateLastSynchroSiord(Date dateLastSynchroSiord)
  {
    this.dateLastSynchroSiord = dateLastSynchroSiord;
  }


  public int getEvaluationDansDispositif()
  {
    return evaluationDansDispositif;
  }


  public void setEvaluationDansDispositif(int evaluationDansDispositif)
  {
    this.evaluationDansDispositif = evaluationDansDispositif;
  }
}
