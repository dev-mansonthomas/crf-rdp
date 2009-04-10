package fr.croixrouge.utilities.web.security;

import java.security.Principal;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;

public class SecurityRequestWrapper extends HttpServletRequestWrapper
{
  private SecurityRealm realm     = null;
  private Principal     principal = null;

  public SecurityRequestWrapper(HttpServletRequest request, SecurityRealm realm)
  {
    super(request);
    this.realm = realm;
  }

  public void setUserPrincipal(Principal principal)
  {
    this.principal = principal;
  }

  public Principal getUserPrincipal()
  {
    return principal;
  }

  public boolean isUserInRole(String role)
  {
    return realm.isUserInRole(principal, role);
  }
}