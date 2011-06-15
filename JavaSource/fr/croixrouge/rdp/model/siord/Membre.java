package fr.croixrouge.rdp.model.siord;

import java.io.Serializable;
import java.util.Date;

public class Membre implements Serializable
{
  private static final long serialVersionUID = 5593774447485018118L;
  
  private int       idImport      ;
  private int       id            ;
  private String    login         ;
  private String    pwd           ;
  private String    nom           ;
  private String    prenom        ;
  private int       droits        ;
  private String    telephone     ;
  private String    email         ;
  private String    nivol         ;
  private String    activation    ;
  private String    sexe          ;
  private int       droitsCadre   ;
  private int       idDelUrgence  ;
  
  private int       idDelegation  ;
  private Date      dateCreation  ;
  private Date      dateModification;
  private boolean   update;
  
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
  public String getLogin()
  {
    return login;
  }
  public void setLogin(String login)
  {
    this.login = login;
  }
  public String getPwd()
  {
    return pwd;
  }
  public void setPwd(String pwd)
  {
    this.pwd = pwd;
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
  public int getDroits()
  {
    return droits;
  }
  public void setDroits(int droits)
  {
    this.droits = droits;
  }
  public String getTelephone()
  {
    return telephone;
  }
  public void setTelephone(String telephone)
  {
    this.telephone = telephone;
  }
  public String getEmail()
  {
    return email;
  }
  public void setEmail(String email)
  {
    this.email = email;
  }
  public String getNivol()
  {
    return nivol;
  }
  public void setNivol(String nivol)
  {
    this.nivol = nivol;
  }
  public String getActivation()
  {
    return activation;
  }
  public void setActivation(String activation)
  {
    this.activation = activation;
  }
  public String getSexe()
  {
    return sexe;
  }
  public void setSexe(String sexe)
  {
    this.sexe = sexe;
  }
  public int getDroitsCadre()
  {
    return droitsCadre;
  }
  public void setDroitsCadre(int droitsCadre)
  {
    this.droitsCadre = droitsCadre;
  }
  public int getIdDelUrgence()
  {
    return idDelUrgence;
  }
  public void setIdDelUrgence(int idDelUrgence)
  {
    this.idDelUrgence = idDelUrgence;
  }
  public int getIdDelegation()
  {
    return idDelegation;
  }
  public void setIdDelegation(int idDelegation)
  {
    this.idDelegation = idDelegation;
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
  public boolean isUpdate()
  {
    return update;
  }
  public void setUpdate(boolean update)
  {
    this.update = update;
  }
}
