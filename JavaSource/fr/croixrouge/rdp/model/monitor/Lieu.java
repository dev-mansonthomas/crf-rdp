package fr.croixrouge.rdp.model.monitor;

import java.io.Serializable;

public class Lieu implements Serializable
{
  private static final long serialVersionUID = -7990736631867351632L;
  
  private int     idLieu            ;  
  private int     idTypeLieu        ;
  private String  icon              ;
  private String  iconGmapInit      ;
  private String  nom               ;
  private String  addresse          ;
  private String  codePostal        ;
  private String  ville             ;
  private float   googleCoordsLat   ;
  private float   googleCoordsLong  ;
  private String  telephone         ;
  private String  mail              ;
  private String  url               ;
  private String  infoComplementaire;
  private boolean actif             ;
  
  public int getIdLieu()
  {
    return idLieu;
  }
  public int getIdTypeLieu()
  {
    return idTypeLieu;
  }
  public String getNom()
  {
    return nom;
  }
  public String getAddresse()
  {
    return addresse;
  }
  public String getCodePostal()
  {
    return codePostal;
  }
  public String getVille()
  {
    return ville;
  }
  public float getGoogleCoordsLat()
  {
    return googleCoordsLat;
  }
  public float getGoogleCoordsLong()
  {
    return googleCoordsLong;
  }
  public String getInfoComplementaire()
  {
    return infoComplementaire;
  }
  public void setIdLieu(int idLieu)
  {
    this.idLieu = idLieu;
  }
  public void setIdTypeLieu(int idTypeLieu)
  {
    this.idTypeLieu = idTypeLieu;
  }
  public String getIcon()
  {
    return icon;
  }
  public String getIconGmapInit()
  {
    return iconGmapInit;
  }
  public void setIcon(String icon)
  {
    this.icon = icon;
  }
  public void setIconGmapInit(String iconGmapInit)
  {
    this.iconGmapInit = iconGmapInit;
  }
  public void setNom(String nom)
  {
    this.nom = nom;
  }
  public void setAddresse(String addresse)
  {
    this.addresse = addresse;
  }
  public void setCodePostal(String codePostal)
  {
    this.codePostal = codePostal;
  }
  public void setVille(String ville)
  {
    this.ville = ville;
  }
  public void setGoogleCoordsLat(float googleCoordsLat)
  {
    this.googleCoordsLat = googleCoordsLat;
  }
  public void setGoogleCoordsLong(float googleCoordsLong)
  {
    this.googleCoordsLong = googleCoordsLong;
  }
  public void setInfoComplementaire(String infoComplementaire)
  {
    this.infoComplementaire = infoComplementaire;
  }
  public String getTelephone()
  {
    return telephone;
  }
  public void setTelephone(String telephone)
  {
    this.telephone = telephone;
  }
  public String getUrl()
  {
    return url;
  }
  public void setUrl(String url)
  {
    this.url = url;
  }
  public String getMail()
  {
    return mail;
  }
  public void setMail(String mail)
  {
    this.mail = mail;
  }
  public boolean isActif()
  {
    return actif;
  }
  public void setActif(boolean actif)
  {
    this.actif = actif;
  }
}
