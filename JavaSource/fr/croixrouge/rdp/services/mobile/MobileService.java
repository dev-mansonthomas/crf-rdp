package fr.croixrouge.rdp.services.mobile;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import fr.croixrouge.rdp.model.monitor.SMS;

public abstract class MobileService
{
  protected abstract void rawSendSMS(String   to, String message);
  
  private static  Log           logger             = LogFactory.getLog(MobileService.class);

  protected int           smsMaxSize    = 0;
  protected SMSLogService smsLogService = null;
  
  public final static int    SMS_ONE_MESSAGE_MAX_SIZE = 150; //MAX 140 8 bit char or 160 7 bit char.
  public final static String SMS_SUBJECT              = "[CRF-RDP X/Y]\n";
  public final static String SMS_SUBJECT_ONE_MESSAGE  = "[CRF-RDP]\n";
  public final static Map<String, String> caracterToReplace = new HashMap<String, String>(){
    private static final long serialVersionUID = 1L;
    {
      put("œ","oe");
    }
  };
  
  //TODO : prendre en compte les nouveaux parametres, récupèrer la réponse et l'enregistrer en base
  public void sendSMS(SMS sms) throws Exception
  {
    //Ajout du code pays qui replace le 0 initial
    String myTo       = "33"+sms.getRecipient().substring(1);
    String myMessage  = sms.getMessage().trim();
    
    for (Entry<String, String> element : caracterToReplace.entrySet())
    {
      if(logger.isDebugEnabled())
      {
        logger.debug("replacing '"+element.getKey()+"' by '"+element.getValue()+"' in message '"+myMessage+"'");
      }
      myMessage = myMessage.replaceAll(element.getKey(), element.getValue());
      
      if(logger.isDebugEnabled())
      {
        logger.debug("replacing '"+element.getKey()+"' by '"+element.getValue()+"' result: '"+myMessage+"'");
      }

    }
    
    if(myMessage.length()+SMS_SUBJECT_ONE_MESSAGE.length()<=SMS_ONE_MESSAGE_MAX_SIZE) //+1 pour \n, il n'est pas compté dans le length()
    {//Si short subject + message <= 160
      myMessage = SMS_SUBJECT_ONE_MESSAGE+myMessage;
      
      sms.setMessage    (myMessage);
      /*NOTE : on log le SMS avec le numéro d'origine, si on ca pose un problème pour retrouver les SMS dans le log manager avec le 33 devant le numéro**/
      smsLogService.logSentSMS(sms);

      sms.setRecipient  (myTo     );
      this.rawSendSMS(myTo, myMessage);  
    }
    else
    {//Sinon on spilt en message de taille 160 - taille(sujet message long)
      String[] messageParts = splitMessage(new String(myMessage.getBytes(),"ISO-8859-1"), SMS_ONE_MESSAGE_MAX_SIZE-SMS_SUBJECT.length());

      for(int i=0, counti=messageParts.length; i<counti; i++)
      {
        String oneMessage = SMS_SUBJECT .replace("X",(i+1) +"")
                                        .replace("Y",counti+"")
                                        +messageParts[i];
        
        System.err.println(oneMessage.length());
        System.err.println((new String(oneMessage.getBytes(),"ISO-8859-1")).length());
        

        sms.setMessage    (oneMessage);
        /*NOTE : on log le SMS avec le numéro d'origine, si on ca pose un problème pour retrouver les SMS dans le log manager avec le 33 devant le numéro**/
        smsLogService.logSentSMS(sms);
        
        sms.setRecipient  (myTo      );
        this.rawSendSMS   (myTo, oneMessage);
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
  
  /*
   * 
   * on doit avoir la longueur et le nombre de caractères comptant pour deux.
   * et découper le message a 160-entete-caracteres comptant pour 2
   * afin d'envoyer des sms de taille correct
   */
 
  private String[] splitMessage(String message, int length)
  {
    ArrayList<String>parts = new ArrayList<String>(4);
    int numberOf2BytesChar = countCaractersThatUseTwoBytes(message);
    int javaMsgLength      = message.length();

    while(true)
    {
      if(javaMsgLength+numberOf2BytesChar>length)
      {
        parts.add(message.substring(0,length-numberOf2BytesChar));
        message = message.substring(length-numberOf2BytesChar);
        
        numberOf2BytesChar = countCaractersThatUseTwoBytes(message);
        javaMsgLength      = message.length();        
      }
      else
      {
        parts.add(message);
        break;
      }
    }
    
    return parts.toArray(new String[parts.size()]);
  }
  
  
  private int countCaractersThatUseTwoBytes(String message)
  {
    Pattern p = Pattern.compile("\n");
    Matcher m = p.matcher(message);
    int count = 0;
    while (m.find()) 
    { 
      count++; 
    }
    
    return count;

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
