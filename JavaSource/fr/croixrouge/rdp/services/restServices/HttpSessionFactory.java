package fr.croixrouge.rdp.services.restServices;

import org.glassfish.hk2.api.Factory;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 * Created by tmanson on 12/08/15.
 */
public class HttpSessionFactory  implements Factory<HttpSession>
{
  private final HttpServletRequest request;

  @Inject
  public HttpSessionFactory(HttpServletRequest request)
  {
    this.request = request;
  }

  @Override
  public HttpSession provide()
  {
    return request.getSession();
  }

  @Override
  public void dispose(HttpSession httpSession)
  {

  }
}
