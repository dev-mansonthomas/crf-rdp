package fr.croixrouge.utilities.web.security;

import java.io.IOException;
import java.security.Principal;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.oro.text.regex.Pattern;
import org.apache.oro.text.regex.PatternCompiler;
import org.apache.oro.text.regex.PatternMatcher;
import org.apache.oro.text.regex.Perl5Compiler;
import org.apache.oro.text.regex.Perl5Matcher;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;


public class SecurityFilter implements Filter
{
  private static Log   logger = LogFactory.getLog(SecurityFilter.class);
  
  private static final String BEAN_PARAM             = "bean";
  private static final String URL_PATTERN_PARAM      = "url-pattern";
  private static final String LOGIN_PAGE_PARAM       = "login-page";
  private static final String LOGIN_ERROR_PAGE_PARAM = "login-error-page";
  private static final String LOGIN_URL_PARAM        = "login-url";

  private static final String LOGIN_URL              = "/j_security_check";
  private static final String LOGIN_USERNAME         = "j_username";
  private static final String LOGIN_PASSWORD         = "j_password";

  private static final String PRINCIPAL              = SecurityFilter.class.getName() + ".principal";
  private static final String CONTINUE_URL           = SecurityFilter.class.getName() + ".continueUrl";

  private String              beanName               = null;
  private String              urlPattern             = null;
  private String              loginPage              = null;
  private String              loginErrorPage         = null;
  private String              loginUrl               = null;

  private PatternMatcher      patternMatcher         = null;
  private PatternCompiler     patternCompiler        = null;
  private Pattern             pattern                = null;

  public void init(FilterConfig config) throws ServletException
  {
    beanName        = config.getInitParameter(BEAN_PARAM            );
    urlPattern      = config.getInitParameter(URL_PATTERN_PARAM     );
    loginPage       = config.getInitParameter(LOGIN_PAGE_PARAM      );
    loginErrorPage  = config.getInitParameter(LOGIN_ERROR_PAGE_PARAM);
    loginUrl        = config.getInitParameter(LOGIN_URL_PARAM       );
    
    if (loginUrl == null)
      loginUrl = LOGIN_URL;
  
    if(logger.isInfoEnabled())
      logger.info ("beanName='"+beanName+
                   "' urlPattern='"+urlPattern+
                   "' loginPage='"+loginPage+
                   "' loginErrorPage='"+loginErrorPage+
                   "' loginUrl='"+loginUrl+"'");
    
    patternMatcher  = new Perl5Matcher ();
    patternCompiler = new Perl5Compiler();

    try
    {
      pattern = patternCompiler.compile(urlPattern);
    }
    catch (Exception e)
    {
      throw new ServletException(e);
    }
  }

  public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException
  {
    HttpServletRequest  httpServletRequest  = (HttpServletRequest ) request ;
    HttpServletResponse httpServletResponse = (HttpServletResponse) response;
    HttpSession         httpSession         = httpServletRequest.getSession();

    String url = this.getUrl(httpServletRequest);

    if(logger.isDebugEnabled())
    {
      logger.debug("url=" + url);
      logger.debug("servletPath="   + httpServletRequest.getServletPath ());
      logger.debug("pathInfo="      + httpServletRequest.getPathInfo    ());
      logger.debug("getRequestURI=" + httpServletRequest.getRequestURI  ());
      
    }

    Principal principal = (Principal) httpSession.getAttribute(PRINCIPAL);

    WebApplicationContext applicationContext = WebApplicationContextUtils.getRequiredWebApplicationContext(httpSession.getServletContext());

    SecurityRealm realm = (SecurityRealm) applicationContext.getBean(beanName);

    SecurityRequestWrapper wrappedRequest = new SecurityRequestWrapper(httpServletRequest, realm);
    wrappedRequest.setUserPrincipal(principal);

    if (url.equalsIgnoreCase(loginUrl))
    {
      String username = httpServletRequest.getParameter(LOGIN_USERNAME);
      String password = httpServletRequest.getParameter(LOGIN_PASSWORD);

      if(logger.isDebugEnabled())
      {
        logger.debug("username=" + username);
        logger.debug("password Length=" + password==null?"null":password.length()+"");
      }

      principal = realm.authenticate(username, password);

      if (principal != null)
      {
        String continueUrl = (String) httpSession.getAttribute(CONTINUE_URL);

        if (continueUrl == null)
          continueUrl = "/";
        
        if(logger.isDebugEnabled())
        {
          logger.debug("continueUrl=" + continueUrl);
          logger.debug("sessionId=" + httpSession.getId());
        }


        httpSession.invalidate();
        httpSession = httpServletRequest.getSession();
        httpSession.setAttribute(PRINCIPAL, principal);
        httpServletResponse.sendRedirect(httpServletResponse.encodeRedirectURL(httpServletRequest.getContextPath() + continueUrl));
      }
      else
      {
        if(logger.isDebugEnabled())
          logger.debug("continueUrl="+loginErrorPage);
        
        httpServletResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        request.getRequestDispatcher(loginErrorPage).forward(wrappedRequest, response);
      }
    }
    else
    {
      if (this.isUrlMatched(httpServletRequest))
      {
        if (principal != null)
          chain.doFilter(wrappedRequest, response);
        else
        {
          String continueUrl = this.getUrl(httpServletRequest);
          if (httpServletRequest.getQueryString() != null)
            continueUrl += "?" + httpServletRequest.getQueryString();

          httpSession.setAttribute(CONTINUE_URL, continueUrl);
          
          if(logger.isDebugEnabled())
          {
            logger.debug("continueUrl2=" + continueUrl);
            logger.debug("sessionId=" + httpSession.getId());
          }
          
          httpServletResponse.sendRedirect(httpServletResponse.encodeRedirectURL(httpServletRequest.getContextPath() + loginPage));
        }
      }
      else
        chain.doFilter(wrappedRequest, response);
    }
  }

  private String getUrl(HttpServletRequest request)
  {
    return request.getRequestURI().substring(request.getContextPath().length());
  }

  private boolean isUrlMatched(HttpServletRequest request)
  {
    return patternMatcher.matchesPrefix(this.getUrl(request), pattern);
  }

  public void destroy()
  {
  }
}
