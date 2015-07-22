package fr.croixrouge.utilities.web.security;

import java.security.Principal;

public interface SecurityRealm
{
  Principal authenticate(String username, String password);
  boolean   isUserInRole(Principal principal, String rolename);
}
