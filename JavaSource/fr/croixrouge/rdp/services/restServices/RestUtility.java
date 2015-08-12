package fr.croixrouge.rdp.services.restServices;

import fr.croixrouge.rdp.model.monitor.Regulation;
import fr.croixrouge.rdp.model.monitor.User;
import fr.croixrouge.rdp.services.authentification.SecurityPrincipal;
import fr.croixrouge.rdp.services.restServices.homepage.Homepage;
import fr.croixrouge.utilities.web.security.SecurityFilter;

import javax.servlet.http.HttpSession;

/**
 * Created by tmanson on 12/08/15.
 */
public class RestUtility
{
  public static int getRegulationId(HttpSession session) throws Exception
  {
    Regulation regulation = (Regulation)session.getAttribute(Homepage.REGULATION);

    if(regulation == null)
    {
      throw new Exception("Regulation not found in session, user is not connected, please reconnect");
    }

    return regulation.getRegulationId();
  }

  public static User getUser(HttpSession session) throws Exception
  {
    SecurityPrincipal principal = (SecurityPrincipal)session.getAttribute(SecurityFilter.PRINCIPAL);

    if(principal == null)
    {
      throw new Exception("Principal not found in session, user is not connected, please reconnect");
    }

    return principal.getUser();
  }


}
