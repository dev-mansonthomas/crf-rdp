package fr.croixrouge.rdp.model.monitor;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import fr.croixrouge.rdp.services.mobile.MobileService;

public class SMS implements Serializable
{
  private static final long serialVersionUID = 6576813250487563885L;
  private static final Log  logger             = LogFactory.getLog(SMS.class);
  
  private final SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
  
  
  public static final int TYPE_DETAIL_INTERVENTION          = 1;
  public static final int TYPE_MESSAGE_EQUIPIERS_DISPOSITIF = 2;
  public static final int TYPE_SENT_SMS_VIA_SMS_MANAGER     = 3;
  public static final int TYPE_RECIEVED_SMS_VIA_SMS_MANAGER = 4;
  
  public static final String API_RECIEVED_SMS               = "receiveSMS";
  public static final String API_SEND_SMS                   = "sendSMS";
  public static final String FROM_REGULATION                = "REGULATION75";
  
  private int     idSMS       ;
  private int     smsType     ;
  private int     equipierId  ;
  private String  equipierDesc;
  private int     idDispositif;
  private String  api         ;
  private String  from        ;
  private String  recipient   ;
  private String  message     ;
  private Date    eventDate   ;
  
  
  /***
   * Used for recieved SMS
   * @param api
   * @param from
   * @param recipient
   * @param message
   */
  
  public SMS(String api, String from, String recipient, String message)
  {
    
    if(!SMS.API_RECIEVED_SMS.equals(api))
    {
      if(logger.isWarnEnabled())
      {
        logger.warn("API code is not the one expected '"+api+"' from '"+from+"' message='"+message+"'");
      }
    }
    
    this.api            = SMS.API_RECIEVED_SMS  ;
    this.from           = from                  ;
    this.smsType        = SMS.TYPE_RECIEVED_SMS_VIA_SMS_MANAGER;
    this.equipierId     = 0                     ;
    this.idDispositif   = 0                     ;
    this.recipient      = recipient             ;
    this.message        = message               ;
    this.eventDate      = new Date()            ;
  }
  
  /**
   * Used for send SMS
   * */
  public SMS(int smsType, int idDispositif, int idEquipierUser, String recipient, String message)
  {
    if(message == null || message.trim().length() == 0)
    {
      throw new IllegalArgumentException("message is null or empty '"+message+"'");
    }
    
    if(!MobileService.validatePhoneNumber(recipient))
    {
        throw new IllegalArgumentException("telephone address is invalid '"+recipient+"' must start with 06 or 07"); 
    }
    
    
    if( idEquipierUser == 0)
    {
      throw new IllegalArgumentException("userId must not be equal recipient 0");
    }
    if( smsType == 0)
    {
      throw new IllegalArgumentException("smsType must not be equal recipient 0");
    }
    
    this.api            = SMS.API_SEND_SMS      ;
    this.from           = SMS.FROM_REGULATION   ;
    this.smsType        = smsType               ;
    this.equipierId     = idEquipierUser        ;
    this.idDispositif   = idDispositif          ;
    this.recipient      = recipient             ;
    this.message        = message               ;
    this.eventDate      = new Date()            ;
  }
  
  /**
   * Used for JDBC Template rowMapper
   * */
  public SMS(int idSMS, int smsType, int idDispositif, int idEquipierUser, String api, String from, String recipient, String message, Date eventDate, String equipierDesc)
  {
    this.idSMS          = idSMS                 ;
    this.smsType        = smsType               ;
    this.idDispositif   = idDispositif          ;
    this.equipierId     = idEquipierUser        ;
    this.api            = api                   ;
    this.from           = from                  ;
    this.recipient      = recipient             ;
    this.message        = message               ;
    this.eventDate      = eventDate             ;
    this.equipierDesc   = equipierDesc          ;
  }
  
  
  @Override
  public SMS clone() throws CloneNotSupportedException
  { 
    return new SMS(this.smsType, this.idDispositif, this.equipierId, this.recipient+"", this.message+"");
  }
  
  public SMS clone(String newRecipient) throws CloneNotSupportedException
  { 
    return new SMS(this.smsType, this.idDispositif, this.equipierId, newRecipient, this.message+"");
  }
  
  @Override
  public String toString()
  {
    return  "{ idSMS         : '"+this.idSMS         +"'" +
            "  smsType       : '"+this.smsType       +"'" +
            "  idDispositif  : '"+this.idDispositif  +"'" +
            "  equipierId    : '"+this.equipierId    +"'" +
            "  api           : '"+this.api           +"'" +
            "  eventDate     : '"+dateFormat.format(this.eventDate)+"'" +
            "  from          : '"+this.from          +"'" +
            "  recipient     : '"+this.recipient     +"'" +
            "  message       : '"+this.message       +"' }" ;

  }
  
  
  
  
  

  public int getSmsType()
  {
    return smsType;
  }


  public int getEquipierId()
  {
    return equipierId;
  }


  public String getRecipient()
  {
    return recipient;
  }


  public String getMessage()
  {
    return message;
  }

  public void setMessage(String message)
  {
    this.message = message;
  }

  public void setSmsType(int smsType)
  {
    this.smsType = smsType;
  }

  public void setEquipierId(int userId)
  {
    this.equipierId = userId;
  }

  public void setRecipient(String recipient)
  {
    this.recipient = recipient;
  }

  public int getIdDispositif()
  {
    return idDispositif;
  }

  public void setIdDispositif(int idDispositif)
  {
    this.idDispositif = idDispositif;
  }

  public String getApi()
  {
    return api;
  }

  public void setApi(String api)
  {
    this.api = api;
  }

  public String getFrom()
  {
    return from;
  }

  public void setFrom(String from)
  {
    this.from = from;
  }

  public Date getEventDate()
  {
    return eventDate;
  }

  public void setEventDate(Date recievedDate)
  {
    this.eventDate = recievedDate;
  }

  public int getIdSMS()
  {
    return idSMS;
  }

  public void setIdSMS(int idSMS)
  {
    this.idSMS = idSMS;
  }

  public String getEquipierDesc()
  {
    return equipierDesc;
  }

  public void setEquipierDesc(String equipierDesc)
  {
    this.equipierDesc = equipierDesc;
  }

}
