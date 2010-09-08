package fr.croixrouge.rdp.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.AbstractController;

import fr.croixrouge.rdp.model.monitor.Regulation;
import fr.croixrouge.rdp.services.authentification.SecurityPrincipal;
import fr.croixrouge.rdp.services.regulation.RegulationService;
import fr.croixrouge.utilities.web.conf.PerMachinePropertyPlaceholderConfigurer;

public class HomepageController extends AbstractController implements InitializingBean
{
  private RegulationService                       regulationService;
  private PerMachinePropertyPlaceholderConfigurer propertyPlaceholderConfigurer = null;
  
  public HomepageController(RegulationService regulationService, PerMachinePropertyPlaceholderConfigurer propertyPlaceholderConfigurer)
  {
    this.regulationService             = regulationService;
    this.propertyPlaceholderConfigurer = propertyPlaceholderConfigurer;
  }
 

  @Override
  protected ModelAndView handleRequestInternal(HttpServletRequest request, HttpServletResponse response) throws Exception
  {    
    List<Regulation> regulations = regulationService.getRegulations(true);
    Map<String, Object> model = new HashMap<String, Object>();
    model.put("regulations"                 , regulations);
    
    model.put("applicationVersion"          , this.propertyPlaceholderConfigurer.getPropertyValue("application.version"         ));
    model.put("environment"                 , this.propertyPlaceholderConfigurer.getPropertyValue("application.environment"     ));
    model.put("environmentCode"             , this.propertyPlaceholderConfigurer.getPropertyValue("application.environment.code"));
    model.put("applicationDeclarationCnil"  , this.propertyPlaceholderConfigurer.getPropertyValue("application.declarationCnil" ));    
    model.put("googleMapsKey"               , this.propertyPlaceholderConfigurer.getPropertyValue("google.maps.key"    ));
    
    SecurityPrincipal securityPrincipal = (SecurityPrincipal)request.getUserPrincipal();
    model.put("currentUser"       , securityPrincipal.getUser());
    
    return new ModelAndView("private/home", model);
  }


  @Override
  public void afterPropertiesSet() throws Exception
  {
    logger.warn("application version          is "+this.propertyPlaceholderConfigurer.getPropertyValue("application.version"         ));
    
    
    logger.warn("Environment                  is "+this.propertyPlaceholderConfigurer.getPropertyValue("application.environment"     ));
    logger.warn("EnvironmentCode              is "+this.propertyPlaceholderConfigurer.getPropertyValue("application.environment.code"));
    logger.warn("ApplicationDeclarationCnil   is "+this.propertyPlaceholderConfigurer.getPropertyValue("application.declarationCnil" )); 
    logger.warn("GoogleMaps API Key           is "+this.propertyPlaceholderConfigurer.getPropertyValue("google.maps.key"             ));
    
    
  }
}
