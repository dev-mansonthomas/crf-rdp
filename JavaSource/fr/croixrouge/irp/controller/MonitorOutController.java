package fr.croixrouge.irp.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.AbstractController;

public class MonitorOutController  extends AbstractController
{
  private String googleMapsKey = null;

  public void setGoogleMapsKey(String googleMapsKey)
  {
    this.googleMapsKey = googleMapsKey;
  }
  
  @Override
  protected ModelAndView handleRequestInternal(HttpServletRequest arg0, HttpServletResponse arg1) throws Exception
  {
    Date currentDate = new Date();
    SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy hh:mm:ss");
    
    
    Map<String, String> model = new HashMap<String, String>();
    
    model.put("googleMapsKey"  , this.googleMapsKey     );
    model.put("currentDate"    , sdf.format(currentDate));
    
    return new ModelAndView("private/monitor/out", model);
  }

}
