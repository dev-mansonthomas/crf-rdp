package fr.croixrouge.irp.model.monitor;

import java.io.Serializable;

public class User implements Serializable
{
  private static final long serialVersionUID = -2287932440494229684L;
  private int               idUser;
  private boolean           homme;  
  private String            nom, prenom, mobile, email, nivol, autreDelegation, password, challengePassword;
  private Delegation        delegation;
  private int               idRole;

  public String toString()
  {
    StringBuffer buffer = new StringBuffer("\nUser id='");
    
    buffer.append(this.idUser);
    buffer.append("'\nnom='");
    buffer.append(this.nom);
    buffer.append("'\nprenom='");
    buffer.append(this.prenom);
    buffer.append("'\nmobile='");
    buffer.append(this.mobile);
    buffer.append("'\nemail='");
    buffer.append(this.email);
    buffer.append("'\nNivol='");
    buffer.append(this.nivol);
    buffer.append("'\nautreDelegation='");
    buffer.append(this.autreDelegation);
    buffer.append("'\ndelegation");
    buffer.append(delegation);
    buffer.append("'\nidRole");
    buffer.append(idRole);
    return buffer.toString();
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

  public String getNom()
  {
    return nom;
  }

  public void setNom(String nom)
  {
    this.nom = nom;
  }

  public String getNivol()
  {
    return nivol;
  }

  public void setNivol(String numNivol)
  {
    this.nivol = numNivol;
  }

  public String getPrenom()
  {
    return prenom;
  }

  public void setPrenom(String prenom)
  {
    this.prenom = prenom;
  }


  public int getIdRole()
  {
    return idRole;
  }


  public void setIdRole(int idRole)
  {
    this.idRole = idRole;
  }


  public int getIdUser()
  {
    return idUser;
  }

  public void setIdUser(int idUser)
  {
    this.idUser = idUser;
  }


public String getChallengePassword() {
	return challengePassword;
}


public void setChallengePassword(String challengePassword) {
	this.challengePassword = challengePassword;
}


public String getPassword() {
	return password;
}


public void setPassword(String password) {
	this.password = password;
}


public boolean isHomme()
{
  return homme;
}


public void setHomme(boolean homme)
{
  this.homme = homme;
}


public String getEmail()
{
  return email;
}


public void setEmail(String email)
{
  this.email = email;
}


public String getMobile()
{
  return mobile;
}


public void setMobile(String mobile)
{
  this.mobile = mobile;
}

}
