package fr.croixrouge.irp.controller;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.AbstractController;

public class MonitorOutController  extends AbstractController
{

  @Override
  protected ModelAndView handleRequestInternal(HttpServletRequest arg0, HttpServletResponse arg1) throws Exception
  {
    Date currentDate = new Date();
    SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy hh:mm:ss");
    
    return new ModelAndView("private/monitor/out", "currentDate", sdf.format(currentDate));
  }

}
