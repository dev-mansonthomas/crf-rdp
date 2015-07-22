package fr.croixrouge.rdp.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.AbstractController;

import fr.croixrouge.rdp.model.monitor.SMS;
import fr.croixrouge.rdp.services.delegate.SMS.SMSDelegate;

public class SmsController extends AbstractController
{  
  private static final Log  logger             = LogFactory.getLog(SmsController.class);
  
  private SMSDelegate smsDelegate;
  
  public SmsController(SMSDelegate smsDelegate)
  {
    this.smsDelegate = smsDelegate;
  }
 
/*documentation :  http://api.orange.com/fr/api/sms-api/documentation */
  @Override
  protected ModelAndView handleRequestInternal(HttpServletRequest request, HttpServletResponse response) throws Exception
  {
    Map<String, Object> model = new HashMap<>();
    
    String api      = request.getParameter("api"    );
    
    if(!SMS.API_RECIEVED_SMS.equals(api))
    {
      logger.error("Wrong API code api='"+api+"' from '"+request.getRemoteAddr()+"' host='"+request.getRemoteHost()+"' port='"+request.getRemotePort()+"'");
      
      model.put("status", "KO");
      model.put("msg", "api code is incorrect '"+api+"'");
      return new ModelAndView("public/sms", model);
    }

    String from     = request.getParameter("from"   ); 
    String to       = request.getParameter("to"     );
    String message  = request.getParameter("content");
    
    if(message == null || message.length() == 0 || from == null || from.length() == 0)
    {
      model.put("status", "KO");
      model.put("msg", "message ='"+message+"' or from='"+from+"'");
      return new ModelAndView("public/sms", model);
    }
    
    SMS sms =  new SMS(api, from, to, message);

    try
    {
      this.smsDelegate.storeRecievedSMSAndNotifiy(sms);  
    }
    catch(Exception e)
    {
      logger.error("Error while storing SMS "+sms,e);
      model.put("status", "KO");
      model.put("msg", "store error "+e.getMessage());
      model.put("sms", sms.toString());
      return new ModelAndView("public/sms", model);
      
    }
        
    
    model.put("status", "OK");
    return new ModelAndView("public/sms", model);
  }

}
