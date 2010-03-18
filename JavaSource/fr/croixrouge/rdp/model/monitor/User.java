package fr.croixrouge.rdp.model.monitor;

import java.io.Serializable;
import java.util.List;

public class User implements Serializable
{
  private static final long serialVersionUID = -2287932440494229684L;
  private int               idUser;
  private int               idEquipier;   
  private String            password, challengePassword;
  private boolean           enabled = false;
  private Equipier          equipier;
  private List<UserRole>    roles;
  
  public String toString()
  {
    StringBuffer buffer = new StringBuffer("\nUser id='");
    buffer.append(this.idUser);
    buffer.append("'\nEnabled='");
    buffer.append(this.enabled);
    buffer.append("'\nidEquipier='");
    buffer.append(this.idEquipier);
    
    return buffer.toString();
  }

  public int getIdUser()
  {
    return idUser;
  }

  public void setIdUser(int idUser)
  {
    this.idUser = idUser;
  }

  public int getIdEquipier()
  {
    return idEquipier;
  }

  public void setIdEquipier(int idEquipier)
  {
    this.idEquipier = idEquipier;
  }

  public String getPassword()
  {
    return password;
  }

  public void setPassword(String password)
  {
    this.password = password;
  }

  public String getChallengePassword()
  {
    return challengePassword;
  }

  public void setChallengePassword(String challengePassword)
  {
    this.challengePassword = challengePassword;
  }

  public Equipier getEquipier()
  {
    return equipier;
  }

  public void setEquipier(Equipier equipier)
  {
    this.equipier = equipier;
  }

  public boolean isEnabled()
  {
    return enabled;
  }

  public void setEnabled(boolean enabled)
  {
    this.enabled = enabled;
  }

  public List<UserRole> getRoles()
  {
    return roles;
  }

  public void setRoles(List<UserRole> roles)
  {
    this.roles = roles;
  }
 
  
}
