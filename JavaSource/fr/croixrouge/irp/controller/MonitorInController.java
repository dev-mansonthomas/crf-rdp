package fr.croixrouge.irp.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.AbstractController;

public class MonitorInController  extends AbstractController
{
  private String googleMapsKey = null;

  public void setGoogleMapsKey(String googleMapsKey)
  {
    this.googleMapsKey = googleMapsKey;
  }

  @Override
  protected ModelAndView handleRequestInternal(HttpServletRequest arg0, HttpServletResponse arg1) throws Exception
  {
    
    Map<String, String> model = new HashMap<String, String>();
    
    model.put("googleMapsKey"  , this.googleMapsKey     );
    
    return new ModelAndView("private/monitor/in", model);
  }
}
