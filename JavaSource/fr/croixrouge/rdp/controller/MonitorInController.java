package fr.croixrouge.rdp.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.AbstractController;

import fr.croixrouge.rdp.services.authentification.SecurityPrincipal;
import fr.croixrouge.utilities.web.conf.PerMachinePropertyPlaceholderConfigurer;

public class MonitorInController  extends AbstractController
{
  private PerMachinePropertyPlaceholderConfigurer propertyPlaceholderConfigurer = null;
  public MonitorInController(PerMachinePropertyPlaceholderConfigurer propertyPlaceholderConfigurer)
  {
    this.propertyPlaceholderConfigurer = propertyPlaceholderConfigurer; 
  }

  @Override
  protected ModelAndView handleRequestInternal(HttpServletRequest request, HttpServletResponse response) throws Exception
  {
    Map<String, Object> model = new HashMap<>();
    
    model.put("applicationVersion", this.propertyPlaceholderConfigurer.getPropertyValue("application.version"));
    model.put("googleMapsKey"     , this.propertyPlaceholderConfigurer.getPropertyValue("google.maps.key"    ));
    model.put("environment"       , this.propertyPlaceholderConfigurer.getPropertyValue("application.environment"));
    SecurityPrincipal securityPrincipal = (SecurityPrincipal)request.getUserPrincipal();
    model.put("currentUser"       , securityPrincipal.getUser());
    
    return new ModelAndView("private/monitor/in", model);
  }
}
