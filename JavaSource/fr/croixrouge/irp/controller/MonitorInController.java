package fr.croixrouge.irp.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.AbstractController;

import fr.croixrouge.utilities.web.conf.PerMachinePropertyPlaceholderConfigurer;

public class MonitorInController  extends AbstractController
{
  private PerMachinePropertyPlaceholderConfigurer propertyPlaceholderConfigurer = null;
  public MonitorInController(PerMachinePropertyPlaceholderConfigurer propertyPlaceholderConfigurer)
  {
    this.propertyPlaceholderConfigurer = propertyPlaceholderConfigurer; 
  }

  @Override
  protected ModelAndView handleRequestInternal(HttpServletRequest arg0, HttpServletResponse arg1) throws Exception
  {
    Map<String, String> model = new HashMap<String, String>();
    
    model.put("applicationVersion", this.propertyPlaceholderConfigurer.getPropertyValue("application.version"));
    model.put("googleMapsKey"     , this.propertyPlaceholderConfigurer.getPropertyValue("google.maps.key"    ));
    
    return new ModelAndView("private/monitor/in", model);
  }
}
