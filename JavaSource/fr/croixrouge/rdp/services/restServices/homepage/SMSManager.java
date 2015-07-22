package fr.croixrouge.rdp.services.restServices.homepage;

import fr.croixrouge.rdp.model.monitor.Equipier;
import fr.croixrouge.rdp.model.monitor.SMS;
import fr.croixrouge.rdp.model.monitor.SMSTemplate;
import fr.croixrouge.rdp.model.monitor.User;
import fr.croixrouge.rdp.model.monitor.dwr.FilterObject;
import fr.croixrouge.rdp.model.monitor.dwr.GridSearchFilterAndSortObject;
import fr.croixrouge.rdp.model.monitor.dwr.ListRange;
import fr.croixrouge.rdp.model.monitor.dwr.SortObject;
import fr.croixrouge.rdp.services.authentification.SecurityPrincipal;
import fr.croixrouge.rdp.services.equipier.EquipierService;
import fr.croixrouge.rdp.services.mobile.MobileService;
import fr.croixrouge.rdp.services.mobile.SMSLogService;
import fr.croixrouge.rdp.services.mobile.SMSTemplateService;
import fr.croixrouge.rdp.services.utilities.UtilitiesServiceImpl;
import fr.croixrouge.utilities.web.security.SecurityFilter;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

public class SMSManager
{
  private static Log                logger             = LogFactory.getLog(SMSManager.class);
  private        SMSLogService      smsLogService      = null;
  private        EquipierService    equipierService    = null;
  private        SMSTemplateService smsTemplateService = null;
  private        MobileService      mobileService      = null;

  private final static SimpleDateFormat sdf = new SimpleDateFormat(UtilitiesServiceImpl.dateSDF);

  public SMSManager(SMSLogService smsLogService,
                    SMSTemplateService smsTemplateService,
                    EquipierService equipierService,
                    MobileService mobileService)
  {
    this.smsLogService = smsLogService;
    this.smsTemplateService = smsTemplateService;
    this.equipierService = equipierService;
    this.mobileService = mobileService;
  }

  public ListRange<SMSTemplate> getSMSTemplates(GridSearchFilterAndSortObject gsfaso) throws Exception
  {


    FilterObject filterObject = gsfaso.getFilterObject("searchedString");

    String searchedString = null;

    if (!(filterObject == null || filterObject.getValue() == null || filterObject.getValue().equals("")))
    {
      searchedString = filterObject.getValue();
    }

    try
    {
      return this.smsTemplateService.getSMSTemplate(searchedString, gsfaso.getStart(), gsfaso.getLimit());
    } catch (Exception e)
    {
      logger.error("Erreur lors de la récupération des SMSTemplate " + gsfaso, e);
      throw e;
    }

  }

  public void changeTemplateEnableStatus(int idSMSTemplate, boolean enabled     ) throws Exception
  {
   
    try
    {
      this.smsTemplateService.changeTemplateEnableStatus(idSMSTemplate, enabled);  
    }
    catch(Exception e)
    {
      logger.error("Erreur lors de la changeTemplateEnableStatus idSMSTemplate='"+idSMSTemplate+"' enabled='"+enabled+"'", e);
      throw e;
    }
    
  }
  public void                   insertNewTemplate         (String template) throws Exception
  {
    
    try
    {
      this.smsTemplateService.insertNewTemplate(template);  
    }
    catch(Exception e)
    {
      logger.error("Erreur lors de la insertNewTemplate template='"+template+"'", e);
      throw e;
    }
    
    
    
  }
  
  public ListRange<SMS> getSMS(GridSearchFilterAndSortObject gsfaso) throws Exception
  {
    
    
    int     idEquipier  = 0;
    String  mobile      = "";
    Date    searchDate  = null;
    boolean allSMS      = false;
    
    FilterObject filterObject = null;
    
/*    
    'idEquipier
    'mobile'   
    'date'     
    'allSMS'   
*/

    filterObject = gsfaso.getFilterObject("idEquipier");
    if(!(filterObject == null  || filterObject.getValue() == null || filterObject.getValue().equals("")))
    {
      try
      {
        idEquipier = Integer.parseInt(filterObject.getValue());  
      }
      catch(Exception e)
      {
      }
       
    }
    filterObject = gsfaso.getFilterObject("mobile");
    if(!(filterObject == null  || filterObject.getValue() == null || filterObject.getValue().equals("")))
    {
      try
      {
        mobile = filterObject.getValue();
      }
      catch(Exception e)
      {
      }  
    }
    
    filterObject = gsfaso.getFilterObject("date");
    if(!(filterObject == null  || filterObject.getValue() == null))
    {
      try
      {
        searchDate = sdf.parse(filterObject.getValue());
      }
      catch(Exception e)
      {
      }
    }
    
    filterObject = gsfaso.getFilterObject("allSMS");
    if(!(filterObject == null  || filterObject.getValue() == null))
    {
      try
      {
        allSMS = "1".equals(filterObject.getValue());
      }
      catch(Exception e)
      {
      }
    }
    
    String  sortColumn    = "";
    boolean sortAscending = false;
    
    SortObject[] sortObjects = gsfaso.getSorts();
    
    if(sortObjects!= null && sortObjects.length>0 && sortObjects[0] != null)
    {
      SortObject so = sortObjects[0];
      
      sortColumn    = so.getName    ();
      sortAscending = so.isAscending();
      
      
    }
    else
    {
      sortColumn    = "evt_date";
      sortAscending = false;
    }
    

    
    
    try
    {  
      return this.smsLogService.searchSMSForSMSManager(idEquipier, mobile, searchDate, allSMS, sortColumn, sortAscending, gsfaso.getStart(), gsfaso.getLimit());
    }
    catch (Exception e)
    {
      logger.error("Erreur lors de la récupération des SMS"+gsfaso, e);
      throw e;
    }
  }
  
  public ListRange<Equipier> searchEquipier(GridSearchFilterAndSortObject gsfaso) throws Exception
  {
    
    try
    {  
      String        searchString = null;
      FilterObject  filterObject = gsfaso.getFilterObject("search");
      
      if(filterObject == null  || filterObject.getValue() == null || filterObject.getValue().equals(""))
        return new ListRange<>(0, new ArrayList<Equipier>());
      
      searchString = filterObject.getValue();
      
      
      return this.equipierService.searchEquipier( searchString+"%" ,
                                                  gsfaso.getStart(),
                                                  gsfaso.getLimit()); 
    }
    catch (Exception e)
    {
      logger.error("Erreur lors de la récupération des Equipiers "+gsfaso, e);
      throw e;
    }
  }
  
  
  public Equipier getEquipierDetails(int equipierId) throws Exception
  {
    
    try
    { 
      return this.equipierService.getEquipier(equipierId);
    }
    catch (Exception e)
    {
      logger.error("Erreur lors de la récupération de l'Equipiers "+equipierId, e);
      throw e;
    }
  }
  
  public void sendSMS(String[] recipients, String message) throws Exception
  {
    //TODO get Session
    HttpSession session = (HttpSession)new Object();
    User        user    = new User();
    try
    {
      SecurityPrincipal principal = (SecurityPrincipal) session.getAttribute(SecurityFilter.PRINCIPAL);
      
      
      user      = principal.getUser();
      
      SMS[] smss = new SMS[recipients.length];
      int i = 0;
      for (String recipient : recipients)
      {
        smss[i++] = new SMS(SMS.TYPE_SENT_SMS_VIA_SMS_MANAGER, 0, user.getIdUser(), recipient, message);
      }
      
      this.mobileService.sendSMS(smss);
    }
    catch(Exception e)
    {
      String recipientList = "";
      for (String recipient : recipients)
      {
        recipientList+=recipient+", ";
      }
      logger.error("Erreur lors de l'envoi du SMS aux destinataires ("+recipientList+"), utilisateur: "+user.getIdUser()+" : "+message, e);
      throw e;
    }
  }
}
