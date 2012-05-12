package fr.croixrouge.rdp.services.dwr.homepage;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import fr.croixrouge.rdp.model.monitor.Equipier;
import fr.croixrouge.rdp.model.monitor.SMS;
import fr.croixrouge.rdp.model.monitor.SMSTemplate;
import fr.croixrouge.rdp.model.monitor.dwr.FilterObject;
import fr.croixrouge.rdp.model.monitor.dwr.GridSearchFilterAndSortObject;
import fr.croixrouge.rdp.model.monitor.dwr.ListRange;
import fr.croixrouge.rdp.services.dwr.DWRUtils;
import fr.croixrouge.rdp.services.equipier.EquipierService;
import fr.croixrouge.rdp.services.mobile.SMSLogService;
import fr.croixrouge.rdp.services.mobile.SMSTemplateService;

public class SMSManager  extends DWRUtils
{
  private static  Log                 logger              = LogFactory.getLog(SMSManager.class);
  private         SMSLogService       smsLogService       = null;
  private         EquipierService     equipierService     = null;
  private         SMSTemplateService  smsTemplateService  = null;
  
  private final static SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
  
  public SMSManager(SMSLogService      smsLogService,
                    SMSTemplateService smsTemplateService,
                    EquipierService    equipierService)
  {
    this.smsLogService      = smsLogService     ;
    this.smsTemplateService = smsTemplateService;
    this.equipierService    = equipierService   ;
  }
  
  public ListRange<SMSTemplate> getSMSTemplates(GridSearchFilterAndSortObject gsfaso) throws Exception
  {
    this.validateSession();
    
    FilterObject filterObject = gsfaso.getFilterObject("searchedString");
    
    String searchedString = null;
    
    if(!(filterObject == null  || filterObject.getValue() == null || filterObject.getValue().equals("")))
    {
      searchedString = filterObject.getValue();
    }
    
    try
    {
      return this.smsTemplateService.getSMSTemplate(searchedString, gsfaso.getStart(), gsfaso.getLimit());  
    }
    catch(Exception e)
    {
      logger.error("Erreur lors de la récupération des SMSTemplate "+gsfaso, e);
      throw e;
    }
    
  }
  
  public void                   changeTemplateEnableStatus(int idSMSTemplate, boolean enabled     ) throws Exception
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
    this.validateSession();
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
    this.validateSession();
    
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
    
    
    try
    {  
      return this.smsLogService.searchSMSForSMSManager(idEquipier, mobile, searchDate, allSMS, gsfaso.getStart(), gsfaso.getLimit());
    }
    catch (Exception e)
    {
      logger.error("Erreur lors de la récupération des SMS"+gsfaso, e);
      throw e;
    }
  }
  
  public ListRange<Equipier> searchEquipier(GridSearchFilterAndSortObject gsfaso) throws Exception
  {
    this.validateSession();
    try
    {  
      String        searchString = null;
      FilterObject  filterObject = gsfaso.getFilterObject("search");
      
      if(filterObject == null  || filterObject.getValue() == null || filterObject.getValue().equals(""))
        return new ListRange<Equipier>(0, new ArrayList<Equipier>());
      
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
  
  
  
  
}
