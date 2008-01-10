package fr.croixrouge.irp.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.AbstractController;

import fr.croixrouge.irp.model.monitor.Regulation;
import fr.croixrouge.irp.services.regulation.RegulationService;

public class HomepageController extends AbstractController
{
  private RegulationService regulationService;
  
  public HomepageController(RegulationService regulationService)
  {
    this.regulationService = regulationService;
  }

  @Override
  protected ModelAndView handleRequestInternal(HttpServletRequest arg0, HttpServletResponse arg1) throws Exception
  {
    System.out.println("Coucou");
   
    List<Regulation> regulations = regulationService.getRegulations(true);
    
    return new ModelAndView("private/home", "regulations", regulations);
  }
}
