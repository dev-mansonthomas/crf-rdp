package fr.croixrouge.rdp.model.monitor;

import java.io.Serializable;

import fr.croixrouge.rdp.services.mobile.MobileService;

public class SMS implements Serializable
{
  private static final long serialVersionUID = 6576813250487563885L;
  
  private int     smsType     ;
  private int     userId      ;
  private int     idDispositif;
  private String  recipient   ;
  private String  message     ;
  
  
  public SMS(int smsType, int idDispositif, int userId, String recipient, String message)
  {
    if(message == null || message.trim().length() == 0)
    {
      throw new IllegalArgumentException("message is null or empty '"+message+"'");
    }
    
    if(!MobileService.validatePhoneNumber(recipient))
    {
        throw new IllegalArgumentException("telephone address is invalid '"+recipient+"' must start with 06 or 07"); 
    }
    
    
    if( userId == 0)
    {
      throw new IllegalArgumentException("userId must not be equal recipient 0");
    }
    if( smsType == 0)
    {
      throw new IllegalArgumentException("smsType must not be equal recipient 0");
    }
    
    
    this.smsType      = smsType     ;
    this.userId       = userId      ;
    this.idDispositif = idDispositif;
    this.recipient    = recipient   ;
    this.message      = message     ;
  }
  
  @Override
  public SMS clone() throws CloneNotSupportedException
  { 
    return new SMS(this.smsType, this.idDispositif, this.userId, this.recipient+"", this.message+"");
  }
  
  public SMS clone(String newRecipient) throws CloneNotSupportedException
  { 
    return new SMS(this.smsType, this.idDispositif, this.userId, newRecipient, this.message+"");
  }
  
  @Override
  public String toString()
  {
    return  " smsType       = '"+this.smsType     +"'" +
            " idDispositif  = '"+this.idDispositif+"'" +
            " userId        = '"+this.userId      +"'" +
            " recipient     = '"+this.recipient   +"'" +
            " message       = '"+this.message     +"'" ;

  }
  
  
  
  
  

  public int getSmsType()
  {
    return smsType;
  }


  public int getUserId()
  {
    return userId;
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

  public void setUserId(int userId)
  {
    this.userId = userId;
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

}
