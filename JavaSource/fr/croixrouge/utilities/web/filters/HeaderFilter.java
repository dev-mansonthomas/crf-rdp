package fr.croixrouge.utilities.web.filters;


import java.io.IOException;
import java.util.HashMap;
import java.util.LinkedHashMap;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

public class HeaderFilter implements Filter
{
private static Logger logger        = Logger.getLogger(HeaderFilter.class);
  
  private FilterConfig            filterConfig  = null;
  private HashMap<String,String>  headers       = null;
  private String                  oneHeaderName = null;
  private String                  oneHeaderValue= null;
  private boolean                 oneHeader     = true;
  
  public void init( FilterConfig filterConfig ) throws ServletException
  {
    this.filterConfig    = filterConfig;
    String headersConfig = this.filterConfig.getInitParameter("headers");
 
    if(headersConfig == null || headersConfig.trim().equals(""))
      throw new ServletException("<param-name>headers</param-name> is missing or it's param-value is empty, specify header like \"expires:Thu, 30 Jan 2025 23:59:59 GMT\"");
    
    if(logger.isDebugEnabled())
      logger.info("headers config = "+headersConfig+"");
    
    if(headersConfig.indexOf( "|" )>-1)
    {
      this.headers = new LinkedHashMap<String,String>(5);
      String[] headers = headersConfig.split( "|" );
      for(int i=0,counti=headers.length;i<counti;i++)
        this.parseHeader(headers[i]);
      oneHeader = false;
    }
    else
      parseOneHeader(headersConfig);
  }

  public void doFilter( ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException
  { 
    HttpServletResponse  httpServletResponse = (HttpServletResponse)response;

    if(oneHeader)
      httpServletResponse.setHeader( this.oneHeaderName, this.oneHeaderValue);
    else
    {
      for (String headerName : headers.keySet())
        httpServletResponse.setHeader( headerName, this.headers.get(headerName));  
    }
    chain.doFilter(request, response);
  }

  public void destroy()
  {
    this.filterConfig  = null;
    this.headers       = null;
    this.oneHeaderName = null;
    this.oneHeaderValue= null;
  }
  
  private void parseHeader(String header) 
  {
    String headerName  = header.substring(0, header.indexOf(":"));
    String headerValue = null;
    if(!headers.containsKey(headerName))
    {
      headerValue = header.substring(header.indexOf(":") + 1);
      this.headers.put(headerName, headerValue);
      
      if(logger.isDebugEnabled())
        logger.debug("header name = '"+headerName+"' value='"+headerValue+"'");
    }

  }
  private void parseOneHeader(String header) 
  {
    this.oneHeaderName  = header.substring(0, header.indexOf(":"));
    this.oneHeaderValue = header.substring(header.indexOf(":") + 1);
    
    if(logger.isDebugEnabled())
      logger.debug("headers name = '"+this.oneHeaderName+"' value='"+this.oneHeaderValue+"'");
  }
}
