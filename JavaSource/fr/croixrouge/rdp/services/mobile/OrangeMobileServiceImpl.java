package fr.croixrouge.rdp.services.mobile;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.utils.URIUtils;
import org.apache.http.client.utils.URLEncodedUtils;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

public class OrangeMobileServiceImpl extends MobileService
{
  private static Log          logger              = LogFactory.getLog(OrangeMobileServiceImpl.class);
  
  public static final int MODE_BOUCHON    = 0;
  public static final int MODE_PRODUCTION = 1;
  
  
  private String  protocol            ; 
  private String  host                ;
  private int     port                ;
  private String  urlPath             ;
  private String  encoding            ;
  private String  orangeAPIKey        ;
  private String  fromNumber          ;
  private String  parameterNameKey    ;
  private String  parameterNameFrom   ;
  private String  parameterNameTo     ;
  private String  parameterNameMessage;
  private int     executionMode       ;
  
  public OrangeMobileServiceImpl( String        protocol            ,
                                  String        host                ,
                                  int           port                ,
                                  String        urlPath             ,
                                  String        encoding            ,
                                  String        orangeAPIKey        ,
                                  String        fromNumber          ,
                                  String        parameterNameKey    ,
                                  String        parameterNameFrom   ,
                                  String        parameterNameTo     ,
                                  String        parameterNameMessage,
                                  int           executionMode       ,
                                  int           smsMaxSize          ,
                                  SMSLogService smsLogService       )
  {
    this.protocol             = protocol            ;
    this.host                 = host                ;
    this.port                 = port                ;
    this.urlPath              = urlPath             ;
    this.encoding             = encoding            ; 
    this.orangeAPIKey         = orangeAPIKey        ;
    this.fromNumber           = fromNumber          ;
    this.parameterNameKey     = parameterNameKey    ;
    this.parameterNameFrom    = parameterNameFrom   ;
    this.parameterNameTo      = parameterNameTo     ;
    this.parameterNameMessage = parameterNameMessage;
    this.executionMode        = executionMode       ;
    this.smsMaxSize           = smsMaxSize          ;
    this.smsLogService        = smsLogService        ;
  }

  @Override
  protected void rawSendSMS(String to, String message)
  {
    List<NameValuePair> qparams = new ArrayList<NameValuePair>();
    
    qparams.add(new BasicNameValuePair(this.parameterNameKey    , this.orangeAPIKey ));
    qparams.add(new BasicNameValuePair(this.parameterNameFrom   , this.fromNumber   ));
    qparams.add(new BasicNameValuePair(this.parameterNameTo     , to                ));
    qparams.add(new BasicNameValuePair(this.parameterNameMessage, message           ));
    
    try
    {
      HttpClient httpclient = new DefaultHttpClient();

      URI uri = URIUtils.createURI( this.protocol , 
                                    this.host     , 
                                    this.port     , 
                                    this.urlPath  , 
                                    URLEncodedUtils.format(qparams, this.encoding), 
                                    null);

      HttpGet httpget = new HttpGet(uri);
      
      if(logger.isDebugEnabled())
      {
        logger.debug("Sending SMS to '"+to+"' message='"+message+"' \nURI:'"+httpget.getURI()+"'");
      }
      
      if(this.executionMode == MODE_PRODUCTION)
      {
        HttpResponse  response        = httpclient  .execute  (httpget);
        HttpEntity    entity          = response    .getEntity(       );
        String        responseContent = EntityUtils .toString (entity );
        
        if(logger.isDebugEnabled())
        {
          logger.debug( "http status='"+response.getStatusLine().getStatusCode()+"'"+
                        "responseContent='"+responseContent+"'");  
        }  
      }
      else
      {
        logger.error("Mode Bouchon Envoie SMS : "+httpget.getURI());
      }
      
    }
    catch(Exception e)
    {
      logger.error("Error while sending SMS", e);
    }
  }
}


