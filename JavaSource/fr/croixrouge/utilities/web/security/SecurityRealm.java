package fr.croixrouge.utilities.web.security;

import java.security.Principal;

public interface SecurityRealm
{
  public Principal authenticate(String username    , String password);
  public boolean   isUserInRole(Principal principal, String rolename);
}
