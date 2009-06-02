package fr.croixrouge.irp.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.AbstractController;

import fr.croixrouge.irp.services.authentification.SecurityPrincipal;
import fr.croixrouge.utilities.web.conf.PerMachinePropertyPlaceholderConfigurer;

public class MonitorOutController  extends AbstractController
{
  private PerMachinePropertyPlaceholderConfigurer propertyPlaceholderConfigurer = null;
  public MonitorOutController(PerMachinePropertyPlaceholderConfigurer propertyPlaceholderConfigurer)
  {
    this.propertyPlaceholderConfigurer = propertyPlaceholderConfigurer; 
  }
  
  @Override
  protected ModelAndView handleRequestInternal(HttpServletRequest request, HttpServletResponse response) throws Exception
  {
    SimpleDateFormat    sdf   = new SimpleDateFormat("dd/MM/yyyy hh:mm:ss");
    Map<String, Object> model = new HashMap<String, Object>();
    
    model.put("applicationVersion", this.propertyPlaceholderConfigurer.getPropertyValue("application.version"));
    model.put("googleMapsKey"     , this.propertyPlaceholderConfigurer.getPropertyValue("google.maps.key"    ));
    model.put("currentDate"       , sdf.format(new Date()));
    model.put("environment"       , this.propertyPlaceholderConfigurer.getPropertyValue("application.environment"));
    
    SecurityPrincipal securityPrincipal = (SecurityPrincipal)request.getUserPrincipal();
    model.put("currentUser"       , securityPrincipal.getUser());
    
    return new ModelAndView("private/monitor/out", model);
  }

}
