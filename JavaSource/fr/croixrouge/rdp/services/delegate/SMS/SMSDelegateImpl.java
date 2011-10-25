package fr.croixrouge.rdp.services.delegate.SMS;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import fr.croixrouge.rdp.model.monitor.Equipier;
import fr.croixrouge.rdp.model.monitor.SMS;
import fr.croixrouge.rdp.services.equipier.EquipierService;
import fr.croixrouge.rdp.services.mobile.SMSLogService;

public class SMSDelegateImpl implements SMSDelegate
{
  private static  Log           logger             = LogFactory.getLog(SMSDelegateImpl.class);
  
  private SMSLogService   smsLogService  ;
  private EquipierService equipierService;
  
  public SMSDelegateImpl(SMSLogService smsLogService, EquipierService equipierService)
  {
    this.smsLogService   = smsLogService  ;
    this.equipierService = equipierService;
  }
  
  
  public void storeRecievedSMSAndNotifiy(SMS sms) throws Exception
  {
    if(logger.isDebugEnabled())
    {
      logger.debug("storing sms "+sms);  
    }
    
    //retrouve l'équipier :
    Equipier equipier = this.equipierService.findEquipierByMobile(sms.getFrom());

    //soit l'équipier est reconnu et on a son ID, soit il est inconnu et equipier.getIdEquipier() == 0
    sms.setEquipierId(equipier.getIdEquipier());
    
    if(logger.isDebugEnabled())
    {
      logger.debug("storing sms "+sms.getFrom() +" match equipier id='"+equipier.getIdEquipier()+"'");  
    }
    
    this.smsLogService.logRecievedSMS(sms);
    
    //TODO notify the clientside/reverseAjax
  }
  
  
  
  
  
}
