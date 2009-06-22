package fr.croixrouge.rdp.model.monitor.dwr;

import java.io.Serializable;

public class DataForCloneIntervention implements Serializable
{
  private static final long serialVersionUID = 4422743429960830852L;
  
  private int     idDispositif;
  private int     idInterventionOrigine;
  private String  nom;
  private String  prenom;
  private boolean hommeVictime;
  private int     age;
  
  public int getIdDispositif()
  {
    return idDispositif;
  }
  public void setIdDispositif(int idDispositif)
  {
    this.idDispositif = idDispositif;
  }
  public int getIdInterventionOrigine()
  {
    return idInterventionOrigine;
  }
  public void setIdInterventionOrigine(int idInterventionOrigine)
  {
    this.idInterventionOrigine = idInterventionOrigine;
  }
  public String getNom()
  {
    return nom;
  }
  public void setNom(String nom)
  {
    this.nom = nom;
  }
  public String getPrenom()
  {
    return prenom;
  }
  public void setPrenom(String prenom)
  {
    this.prenom = prenom;
  }
  public boolean isHommeVictime()
  {
    return hommeVictime;
  }
  public void setHommeVictime(boolean hommeVictime)
  {
    this.hommeVictime = hommeVictime;
  }
  public int getAge()
  {
    return age;
  }
  public void setAge(int age)
  {
    this.age = age;
  }
}
