package fr.croixrouge.rdp.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.AbstractController;

import fr.croixrouge.utilities.web.conf.PerMachinePropertyPlaceholderConfigurer;

public class LoginController extends AbstractController
{
  private PerMachinePropertyPlaceholderConfigurer propertyPlaceholderConfigurer = null;
  
  public LoginController(PerMachinePropertyPlaceholderConfigurer propertyPlaceholderConfigurer)
  {
    
    this.propertyPlaceholderConfigurer = propertyPlaceholderConfigurer;
  }
 

  @Override
  protected ModelAndView handleRequestInternal(HttpServletRequest request, HttpServletResponse response) throws Exception
  {    
    Map<String, Object> model = new HashMap<>();
    
    model.put("applicationVersion"          , this.propertyPlaceholderConfigurer.getPropertyValue("application.version"         ));
    model.put("environment"                 , this.propertyPlaceholderConfigurer.getPropertyValue("application.environment"     ));
    model.put("environmentCode"             , this.propertyPlaceholderConfigurer.getPropertyValue("application.environment.code"));
    
    return new ModelAndView("public/login", model);
  }

}
