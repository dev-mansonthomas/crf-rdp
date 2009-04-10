package fr.croixrouge.irp.services.authentification;

import java.security.Principal;

import fr.croixrouge.irp.model.monitor.User;

public class SecurityPrincipal implements Principal
{
  private User user;

  public SecurityPrincipal(User user)
  {
    this.user = user;
  }

  public String getName()
  {
    return user.getNivol();
  }

  public User getUser()
  {
    return user;
  }
}
