package fr.croixrouge.rdp.controller;

import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.Map;
import java.util.SortedMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.AbstractController;

import fr.croixrouge.rdp.model.monitor.SMS;
import fr.croixrouge.rdp.services.mobile.MobileService;
import fr.croixrouge.utilities.web.conf.PerMachinePropertyPlaceholderConfigurer;

public class TestController extends AbstractController
{
  private static Log logger           = LogFactory.getLog(TestController.class);
  
  private PerMachinePropertyPlaceholderConfigurer propertyPlaceholderConfigurer = null;
  private MobileService mobileService = null;
  
  public TestController(PerMachinePropertyPlaceholderConfigurer propertyPlaceholderConfigurer,
                        MobileService mobileService)
  {
    this.propertyPlaceholderConfigurer = propertyPlaceholderConfigurer; 
    this.mobileService                 = mobileService;
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
    
    
    

    SortedMap<String, Charset> cs = Charset.availableCharsets();
    System.out.printf("%d charsets:%n", cs.size());
    for (String s : cs.keySet())
    {
      System.out.println(s);
    }
    //this.mobileService.sendSMS("33664664296", "Coucou");
    
    String shortMessage = "New Inter : 000001\n"+
    "Personne Malade\n"+
    "bla bla bla bla bla bla\n"+
    "Mr Manson Thomas 31 ans\n"+
    "135 route de la reine 92100 boulogne\n";


    String longMessage = "New Inter : 000002\n"+
    "Personne Blessée\n"+
    "Coucou tata titi atootat aplsjkfl jsdfljs dflsdj flmsdjfslmdfjdslmfj sdflkjlsjdflkjds flkjsdflsmdkjfmsldfj sldmfjjsdf\n"+
    "Mr Manson Thomas 31 ans\n"+
    "135 route de la reine 92100 boulogne\n";
    logger.debug("short message");
    //this.mobileService.sendSMS(new SMS(1,1, 1, "0664664296", shortMessage));
    
    logger.debug("long message");
    //this.mobileService.sendSMS(new SMS[]{new SMS(2,1, 1, "0664664296", longMessage), new SMS(2,1, 1, "0664664297", longMessage)} );
    
    
    
    
    
    Map<String, Object> model = new HashMap<String, Object>();
    return new ModelAndView("private/test/testThomas", model);
  }

}
