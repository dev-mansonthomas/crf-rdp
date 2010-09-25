package fr.croixrouge.rdp.services.mobile;

import java.sql.Types;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.jdbc.core.JdbcTemplate;

import fr.croixrouge.rdp.model.monitor.SMS;

public abstract class MobileService
{
  protected abstract void rawSendSMS(String   to, String message);
  
  private static  Log           logger             = LogFactory.getLog(MobileService.class);
  
  protected JdbcTemplate jdbcTemplate = null;
  protected int          smsMaxSize   = 0;
  
  public final static int    SMS_ONE_MESSAGE_MAX_SIZE = 160;
  public final static String SMS_SUBJECT              = "[CRF-RDP X/Y]\n";
  public final static String SMS_SUBJECT_ONE_MESSAGE  = "[CRF-RDP]\n";
  
  public void sendSMS(SMS sms) throws Exception
  {
    //Ajout du code pays qui replace le 0 initial
    String myTo       = "33"+sms.getRecipient().substring(1);
    String myMessage  = sms.getMessage().trim();
    
    if(myMessage.length()<=SMS_ONE_MESSAGE_MAX_SIZE-SMS_SUBJECT_ONE_MESSAGE.length())
    {//Si short subject + message <= 160
      myMessage = SMS_SUBJECT_ONE_MESSAGE+myMessage;
      
      sms.setRecipient  (myTo     );
      sms.setMessage    (myMessage);
      
      this.logSmsTransmission(sms);
      this.rawSendSMS(myTo, myMessage);  
    }
    else
    {//Sinon on spilt en message de taille 160 - taille(sujet message long)
      String[] messageParts = splitMessage(myMessage, SMS_ONE_MESSAGE_MAX_SIZE-SMS_SUBJECT.length());

      for(int i=0, counti=messageParts.length; i<counti; i++)
      {
        String oneMessage = SMS_SUBJECT .replace("X",(i+1) +"")
                                        .replace("Y",counti+"")
                                        +messageParts[i];
        
        
        sms.setRecipient  (myTo      );
        sms.setMessage    (oneMessage);

        this.logSmsTransmission(sms);
        this.rawSendSMS        (myTo, oneMessage);
      }
    }
  }
  
  
  public void sendSMS(List<SMS> smss) throws Exception
  {
    this.sendSMS(smss.toArray(new SMS[smss.size()]));
  }
  
  public void sendSMS(SMS[] smss) throws Exception
  {
    for(int i=0,counti=smss.length;i<counti;i++)
    {//on n'appel pas checkParameter car si un tel n'est pas bon, il faut quand meme envoyer les autres
      (new ThreadedSMSSend(this, i, smss[i])).start();
    }
      
  }
  
  
  private String[] splitMessage(String message, int length)
  {
    ArrayList<String>parts = new ArrayList<String>(4);
    int msgLength = message.length();

    while(true)
    {
      if(msgLength>length)
      {
        parts.add(message.substring(0,length));
        message = message.substring(length);
        msgLength = message.length();        
      }
      else
      {
        parts.add(message);
        break;
      }
    }
    
    return parts.toArray(new String[parts.size()]);
  }
  
  private final static String queryForLogSmsTransmission = 
    "INSERT INTO `sms_log` " +
    " (`id_sms_type`, `id_dispositif`, `id_user`, `to`, `message`, `send_date`)\n" +
    "VALUES                                                   \n" +
    " (?            , ?              , ?        , ?   , ?        , NOW()      )\n" ;
  
  private void logSmsTransmission(SMS sms)
  {
    if(logger.isDebugEnabled())
    {
      logger.debug(sms); 
    }
     
    this.jdbcTemplate.update(queryForLogSmsTransmission,
        new Object[]{sms.getSmsType() , sms.getIdDispositif(), sms.getUserId(), sms.getRecipient(), sms.getMessage()   }, 
        new int   []{Types.INTEGER    , Types.INTEGER        , Types.INTEGER  , Types.VARCHAR     , Types.VARCHAR      }
    );
    
    
  }
  /**
   * Returns true if hte phone number is a mobile (starts with 06, 07)
   * 
   * */
  public static boolean validatePhoneNumber(String phone)
  {
    if(phone == null || phone.trim().length() == 0 || !(phone.startsWith("06") || phone.startsWith("07")))
    {
      return false;
    }
    return true;
  }
  
}
