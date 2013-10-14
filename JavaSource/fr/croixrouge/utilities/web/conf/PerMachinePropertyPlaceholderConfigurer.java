package fr.croixrouge.utilities.web.conf;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.InetAddress;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.Set;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.config.PropertyPlaceholderConfigurer;
import org.springframework.util.FileCopyUtils;

public class PerMachinePropertyPlaceholderConfigurer extends PropertyPlaceholderConfigurer implements Map<String, String>
{
  private static final Log log                         = LogFactory.getLog(PerMachinePropertyPlaceholderConfigurer.class);

  private Properties       originalProperties          = null;
  private Properties       properties                  = null;
  private Properties       exportedProperties          = null;
  private String           prefix                      = null;
  private String           exportPath                  = null;
  private List<String>     exportHostList              = null;
  private boolean          exportedPropertyUsed        = false;
  private boolean          appendApplicationServerType = true;
  
  private String           propertyFileName            = "application";
  private String           hostname                    = "localhost";
  private String           exportPropertyFullPath      = null;
  private String           originalLocation            = null;
  
  protected String resolvePlaceholder(String placeholder, Properties props)
  {
    if(logger.isDebugEnabled())
      logger.debug("placeholder='"+placeholder+"'");
    
    this.originalLocation = placeholder;
    
    if (originalProperties == null)
    {
      this.originalProperties = props;
      this.properties         = new Properties();
      this.exportedProperties = new Properties();
      
      if(prefix != null)
        this.propertyFileName = prefix;
      
      this.hostname = "localhost";
      
      try
      {
        this.hostname = InetAddress.getLocalHost().getHostName().toLowerCase();
      }
      catch (Exception e)
      {
        e.printStackTrace();
        System.err.println("Unable to get hostname, using localhost instead");
      }
      
      if(logger.isDebugEnabled())
        logger.debug("detected hostname : '"+this.hostname+"'");
      
      this.propertyFileName += "-" + this.hostname;

      if (this.appendApplicationServerType)
      {      
        if (System.getProperty("jboss.home.dir") != null)
        {
          this.propertyFileName += "-jboss";
          
          if(logger.isDebugEnabled())
            logger.debug("detected server type : 'jboss' as System.getProperty(\"jboss.home.dir\") is not null");
        }
        else if (System.getProperty("was.install.root") != null)
        {
          this.propertyFileName += "-websphere";
          
          if(logger.isDebugEnabled())
            logger.debug("detected server type : 'websphere' as System.getProperty(\"was.install.root\") is not null");
        }
      }

      this.propertyFileName += ".properties";

      InputStream inputStream = Thread.currentThread().getContextClassLoader().getResourceAsStream(this.propertyFileName);

      if (inputStream == null && log.isWarnEnabled())
        log.warn("No specific properties for this machine (missing file " + this.propertyFileName + ")");
      else
      {
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

          if (!exportDir.exists())
            exportDir.mkdirs();

          this.exportPropertyFullPath = exportDir.getAbsolutePath() + File.separator + new File(this.propertyFileName).getName();
          
          File destinationFile = new File(exportPropertyFullPath);

          if (!destinationFile.exists())
          {
            try
            {
              FileCopyUtils.copy(inputStream, new FileOutputStream(destinationFile));
            }
            catch (Exception e)
            {
              if (log.isErrorEnabled())
                log.error("Unable to export properties", e);
            }
          }

          try
          {
            exportedProperties.load(new FileInputStream(destinationFile));
          }
          catch (Exception e)
          {
            if (log.isErrorEnabled())
              log.error("Unable to load exported properties", e);
          }
        }

        try
        {
          properties.load(inputStream);
        }
        catch (Exception e)
        {
          if (log.isErrorEnabled())
            log.error("Unable to load properties from file "+this.propertyFileName, e);
        }
      }
    }

    return getPropertyValue(placeholder);
  }

  public String getPropertyValue(String name)
  {
    String value = exportedProperties.getProperty(name);

    if(logger.isDebugEnabled())
      logger.debug("fetching property '"+name+"' from exportedProperties ("+(this.exportPropertyFullPath  != null ? this.exportPropertyFullPath +"":"exported property not used on this host")+"), value = "+(value == null ?"NOT FOUND":"'"+value+"'. This value is used as it overrides the webapp property (original and per machine property)")+"");
    
    if(value != null)
      return value;
    
    value = properties.getProperty(name);

    if(logger.isDebugEnabled())
      logger.debug("fetching property '"+name+"' from machineSpecific property ("+this.propertyFileName+"), value = "+(value == null ?"NOT FOUND":"'"+value+"'. This value is used as it overrides the webapp original property")+"");

    if( value != null )
      return value;
    
    value = originalProperties.getProperty(name);

    if(logger.isDebugEnabled())
      logger.debug("fetching property '"+name+"' from original property ("+this.originalLocation+"), value = "+(value == null ?"NOT FOUND":"'"+value+"'. This value is used as it has not been overriden by per machine property of exported property")+"");
    
    return value;
  }

  public void clear()
  {
  }

  public boolean containsKey(Object arg0)
  {
    return false;
  }

  public boolean containsValue(Object arg0)
  {
    return false;
  }

  public Set<Entry<String, String>> entrySet()
  {
    return null;
  }

  public String get(Object name)
  {
    return getPropertyValue((String) name);
  }

  public boolean isEmpty()
  {
    return false;
  }

  public Set<String> keySet()
  {
    return null;
  }

  public String put(String arg0, String arg1)
  {
    return null;
  }

  
  @SuppressWarnings("rawtypes")
  public void putAll(Map arg0)
  {
  }

  public String remove(Object arg0)
  {
    return null;
  }

  public int size()
  {
    return 0;
  }

  public Collection<String> values()
  {
    return null;
  }
  
  
  public void setPrefix(String prefix)
  {
    this.prefix = prefix;
  }
  public void setExportPath(String exportPath)
  {
    this.exportPath = exportPath;
  }
  public void setExportHostList(List<String> exportHostList)
  {
    this.exportHostList = exportHostList;
  }
  public void setAppendApplicationServerType(boolean appendApplicationServerType)
  {
    this.appendApplicationServerType = appendApplicationServerType;
  }
}
