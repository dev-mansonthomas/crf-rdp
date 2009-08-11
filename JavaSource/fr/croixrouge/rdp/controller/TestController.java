package fr.croixrouge.rdp.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.AbstractController;

import fr.croixrouge.utilities.web.conf.PerMachinePropertyPlaceholderConfigurer;

public class TestController extends AbstractController
{
  private static Log logger           = LogFactory.getLog(TestController.class);
  
  private PerMachinePropertyPlaceholderConfigurer propertyPlaceholderConfigurer = null;
  public TestController(PerMachinePropertyPlaceholderConfigurer propertyPlaceholderConfigurer)
  {
    this.propertyPlaceholderConfigurer = propertyPlaceholderConfigurer; 
  }
  
  @Override
  protected ModelAndView handleRequestInternal(HttpServletRequest arg0, HttpServletResponse arg1) throws Exception
  {
    
    String envCode = propertyPlaceholderConfigurer.get("application.environment.code");
    
    if(!envCode.equals("DEV"))
    {
      logger.error("Illegal access to test page while envCode is not equal to 'DEV' but "+envCode);
      throw new Exception("Illegal access to this page");
    }
    
    
    Map<String, Object> model = new HashMap<String, Object>();
    // TODO Auto-generated method stub
    return new ModelAndView("private/test/testThomas", model);
  }

}
