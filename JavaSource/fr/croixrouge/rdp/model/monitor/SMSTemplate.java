package fr.croixrouge.rdp.model.monitor;

import java.io.Serializable;
import java.util.Date;

public class SMSTemplate implements Serializable
{
  private static final long serialVersionUID = -1022960989240160479L;
  
  private int     idSmsTemplate  ;       
  private Date    templateDate  ;
  private boolean enabled        ;
  private String  message        ;
  
  public SMSTemplate( int     idSmsTemplate  ,       
                      Date    templateDate   ,
                      boolean enabled        ,
                      String  message        
     )
  {
    this.idSmsTemplate = idSmsTemplate  ;       
    this.templateDate  = templateDate   ;
    this.enabled       = enabled        ;
    this.message       = message        ;
  }
  
  
  public int getIdSmsTemplate()
  {
    return idSmsTemplate;
  }
  public void setIdSmsTemplate(int id_sms_template)
  {
    this.idSmsTemplate = id_sms_template;
  }
  public Date getTemplateDate()
  {
    return templateDate;
  }
  public void setTemplateDate(Date template_date)
  {
    this.templateDate = template_date;
  }
  public boolean isEnabled()
  {
    return enabled;
  }
  public void setEnabled(boolean enabled)
  {
    this.enabled = enabled;
  }
  public String getMessage()
  {
    return message;
  }
  public void setMessage(String message)
  {
    this.message = message;
  }
}
