package fr.croixrouge.rdp.model.monitor;

import java.util.Date;

public class InterventionTicket
{
  public InterventionTicket()
  {
    this.position = new Position ();
  }
  
  private int idIntervention;
  private int idDispositif  ;
  private int idRegulation  ;
  private int idOrigine     ;
  private int idMotif       ;
  private int idEtat        ;
  private int ageApproxVictime;
  
  private String  interventionBusinessId    ;
  private Date    dhSaisie                  ;
  private Date    dhReception               ;
  private boolean victimeHomme              ;
  private String  nomVictime                ;
  private String  prenomVictime             ;
  private String  nomContactSurPlace        ;
  private String  coordonneesContactSurPlace;
  private String  batiment                  ;
  private String  etage                     ;
  private String  porte                     ;
  private String  complementAdresse         ;
  private String  complementMotif           ;
  
  private Position position                 ;
  
  

  public Date getDhSaisie()
  {
    return dhSaisie;
  }
  public void setDhSaisie(Date dhSaisie)
  {
    this.dhSaisie = dhSaisie;
  }
  public int getIdDispositif()
  {
    return idDispositif;
  }
  public void setIdDispositif(int idDispositif)
  {
    this.idDispositif = idDispositif;
  }
  public int getIdIntervention()
  {
    return idIntervention;
  }
  public void setIdIntervention(int idIntervention)
  {
    this.idIntervention = idIntervention;
  }
  public int getIdMotif()
  {
    return idMotif;
  }
  public void setIdMotif(int idMotif)
  {
    this.idMotif = idMotif;
  }
  public int getIdOrigine()
  {
    return idOrigine;
  }
  public void setIdOrigine(int idOrigine)
  {
    this.idOrigine = idOrigine;
  }
 
  public Position getPosition()
  {
    return position;
  }
  public void setPosition(Position position)
  {
    this.position = position;
  }
  public int getIdRegulation()
  {
    return idRegulation;
  }
  public void setIdRegulation(int idRegulation)
  {
    this.idRegulation = idRegulation;
  }
  public String getBatiment()
  {
    return batiment;
  }
  public void setBatiment(String batiment)
  {
    this.batiment = batiment;
  }
  public String getEtage()
  {
    return etage;
  }
  public void setEtage(String etage)
  {
    this.etage = etage;
  }
  public String getPorte()
  {
    return porte;
  }
  public void setPorte(String porte)
  {
    this.porte = porte;
  }
  public String getComplementAdresse()
  {
    return complementAdresse;
  }
  public void setComplementAdresse(String complementAdresse)
  {
    this.complementAdresse = complementAdresse;
  }
  public String getComplementMotif()
  {
    return complementMotif;
  }
  public void setComplementMotif(String complementMotif)
  {
    this.complementMotif = complementMotif;
  }
  public String getNomVictime()
  {
    return nomVictime;
  }
  public void setNomVictime(String nomVictime)
  {
    this.nomVictime = nomVictime;
  }
  public String getNomContactSurPlace()
  {
    return nomContactSurPlace;
  }
  public void setNomContactSurPlace(String nomContactSurPlace)
  {
    this.nomContactSurPlace = nomContactSurPlace;
  }
  public String getCoordonneesContactSurPlace()
  {
    return coordonneesContactSurPlace;
  }
  public void setCoordonneesContactSurPlace(String coordonneesContactSurPlace)
  {
    this.coordonneesContactSurPlace = coordonneesContactSurPlace;
  }
  public boolean isVictimeHomme()
  {
    return victimeHomme;
  }
  public void setVictimeHomme(boolean victimeHomme)
  {
    this.victimeHomme = victimeHomme;
  }
  public String getPrenomVictime()
  {
    return prenomVictime;
  }
  public void setPrenomVictime(String prenomVictime)
  {
    this.prenomVictime = prenomVictime;
  }
  public int getIdEtat()
  {
    return idEtat;
  }
  public void setIdEtat(int idEtat)
  {
    this.idEtat = idEtat;
  }
  public String getInterventionBusinessId()
  {
    return interventionBusinessId;
  }
  public void setInterventionBusinessId(String interventionBusinessId)
  {
    this.interventionBusinessId = interventionBusinessId;
  }
  public int getAgeApproxVictime()
  {
    return ageApproxVictime;
  }
  public void setAgeApproxVictime(int ageApproxVictime)
  {
    this.ageApproxVictime = ageApproxVictime;
  }
  public Date getDhReception()
  {
    return dhReception;
  }
  public void setDhReception(Date dhReception)
  {
    this.dhReception = dhReception;
  }

}