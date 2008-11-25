package fr.croixrouge.irp.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.AbstractController;

import fr.croixrouge.irp.model.monitor.Regulation;
import fr.croixrouge.irp.services.regulation.RegulationService;
import fr.croixrouge.utilities.web.conf.PerMachinePropertyPlaceholderConfigurer;

public class HomepageController extends AbstractController
{
  private RegulationService                       regulationService;
  private PerMachinePropertyPlaceholderConfigurer propertyPlaceholderConfigurer = null;
  
  public HomepageController(RegulationService regulationService, PerMachinePropertyPlaceholderConfigurer propertyPlaceholderConfigurer)
  {
    this.regulationService             = regulationService;
    this.propertyPlaceholderConfigurer = propertyPlaceholderConfigurer;
  }

  @Override
  protected ModelAndView handleRequestInternal(HttpServletRequest arg0, HttpServletResponse arg1) throws Exception
  {
    List<Regulation> regulations = regulationService.getRegulations(true);
    Map<String, Object> model = new HashMap<String, Object>();
    model.put("regulations"       , regulations);
    model.put("applicationVersion", this.propertyPlaceholderConfigurer.getPropertyValue("application.version"));
    return new ModelAndView("private/home", model);
  }
}
