package fr.croixrouge.utilities.web.conf;

import java.io.File;
import java.io.FileNotFoundException;
import java.net.InetAddress;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.core.io.ClassPathResource;
import org.springframework.util.FileCopyUtils;
import org.springframework.util.Log4jConfigurer;

public class PerMachineLog4JConfigurer 
{
  private String         log4jBasePath        = null;
  private String         log4jFileBase        = null;
  private String         log4jExtension       = null;
  private List<String>   exportHostList       = null;
  private String         exportPath           = null;
  private long           refreshInterval      = 0; 
  private static Logger  logService           = Logger.getLogger(PerMachineLog4JConfigurer.class);
  private boolean        exportedPropertyUsed = false;
  private String         hostname             = null;
  private String         log4jFileUsed        = null;
  
  public void init() throws Exception
  {
    this.hostname      = "localhost";
    try
    {
      this.hostname      = InetAddress.getLocalHost().getHostName().toLowerCase();  
    }
    catch(Exception e)
    {
      e.printStackTrace();
      System.err.println("Unable to get hostname, using localhost instead");
    }
    
    String            log4jLocation = this.log4jBasePath + "/" + log4jFileBase +"-"+ hostname + "." + this.log4jExtension;
    ClassPathResource cpr           = new ClassPathResource(log4jLocation); 
    File              log4jFile     = null;
    
    try
    {
      log4jFile = cpr.getFile();
    }
    catch(FileNotFoundException e)
    {
      System.err.println("classpath:"+log4jLocation+" file not found. Fall back to default log4j configuration file (classpath:log4j.xml or classpath:log4j.properties)");
      return;
    }
    catch(Exception e)
    {
      throw e;
    }
    
    this.log4jFileUsed = log4jFile.getAbsolutePath();

    if(this.exportHostList != null && this.exportPath != null)
    {
      for (int n = 0,count=this.exportHostList.size(); n < count; n++)
      {
        String host = this.exportHostList.get(n).toLowerCase();

        if (this.hostname.equals(host))
        {
          this.exportedPropertyUsed = true;//if machine is listed and export path is defined then use export path mecanism
          break;
        }
      }
    }
    
      
    if (this.exportedPropertyUsed)
    {
      File exportDir = new File(this.exportPath);
      if(!exportDir.exists())
        exportDir.mkdirs();
      
      File destinationFile = new File(exportDir.getAbsolutePath() + File.separator + log4jFile.getName());
      
      if(!destinationFile.exists())
      {
        try
        {
          FileCopyUtils.copy(log4jFile, destinationFile);
        }
        catch(Exception e)
        {
          throw e;
        }
      }
      this.log4jFileUsed = destinationFile.getAbsolutePath();
    }
    
    //DOMConfigurator.configure(new URL)
    if(this.refreshInterval == 0)
      Log4jConfigurer.initLogging(log4jFileUsed);
    else
      Log4jConfigurer.initLogging(log4jFileUsed, refreshInterval);
      
    logService.info("Log4 initialized with the following configuration file : '"+log4jFileUsed+"' and the refreshInterval set to '"+(this.refreshInterval == 0?"DISABLED":this.refreshInterval+"")+"'");
  }
  
  public void setRefreshInterval( long refreshInterval )
  {
    this.refreshInterval = refreshInterval;
  }
  public void setLog4jBasePath( String log4jBasePath )
  {
    this.log4jBasePath = log4jBasePath;
  }
  public void setLog4jExtension( String log4jExtension )
  {
    this.log4jExtension = log4jExtension;
  }
  public void setExportPath( String exportPath )
  {
    this.exportPath = exportPath;
  }
  public void setLog4jFileBase( String log4jFileBase )
  {
    this.log4jFileBase = log4jFileBase;
  }
  public void setExportHostList(List<String> exportHostList)
  {
    this.exportHostList = exportHostList;
  }
}
