package fr.croixrouge.rdp.services.mobile;

import java.sql.Types;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.jdbc.core.JdbcTemplate;

import fr.croixrouge.rdp.model.monitor.SMSTemplate;
import fr.croixrouge.rdp.model.monitor.dwr.ListRange;
import fr.croixrouge.rdp.model.monitor.rowMapper.SMSTemplateRowMapper;

public class SMSTemplateServiceImpl implements SMSTemplateService
{
  private static  Log           logger             = LogFactory.getLog(SMSTemplateServiceImpl.class);
  
  
  private JdbcTemplate jdbcTemplate = null;
  
  public SMSTemplateServiceImpl(JdbcTemplate jdbcTemplate)
  {
    this.jdbcTemplate = jdbcTemplate;
  }
  
  private final static String queryForChangeTemplateEnableStatus =
      "UPDATE `sms_template`      \n" +
      "SET    enabled         = ? \n" +
      "WHERE  id_sms_template = ? \n";
  public void                   changeTemplateEnableStatus(int idSMSTemplate, boolean enabled     ) throws Exception
  {
    if(logger.isDebugEnabled())
    {
      logger.debug("Changing enabled status for value ='"+enabled+"' for template id='"+idSMSTemplate+"'");
    }
    
    this.jdbcTemplate.update(queryForChangeTemplateEnableStatus,
        new Object[]{enabled       , idSMSTemplate }, 
        new int   []{Types.BOOLEAN , Types.INTEGER }
    );
  }
  
  private final static String queryForInsertNewTemplate = 
      "INSERT INTO `sms_template`                               \n" +
      " (`template_date`, `enabled`, `message`)\n" +
      "VALUES                                                   \n" +
      " (NOW()            , 1        , ?        )\n" ;
  
  public void                   insertNewTemplate         (String template      ) throws Exception
  {
    if(logger.isDebugEnabled())
    {
      logger.debug("Inserting new template: \n"+template+"\n");
    }
    this.jdbcTemplate.update(queryForInsertNewTemplate,
        new Object[]{template      }, 
        new int   []{Types.VARCHAR }
    );
  }
  
  
  
  
  private final static String selectForGetSMSTemplate = 
      "SELECT id_sms_template, \n" +
      "       template_date  , \n" +
      "       enabled        , \n" +
      "       message          \n" +
      "FROM `sms_template`     \n" ; 


  public ListRange<SMSTemplate> getSMSTemplate            (String searchedString, int start, int limit) throws Exception
  {
   
    String currentWhereClause = "";
    
    Object [] os    =  null;
    int    [] types =  null;
    
    if(searchedString == null || searchedString.equals(""))
    {
      os    =  new Object[]{};
      types =  new int   []{};
    }
    else
    {
      currentWhereClause += "WHERE message like ?";
      os    =  new Object[]{ "%"+searchedString+"%"};
      types =  new int   []{ Types.VARCHAR       };
    }
   
    int totalCount = this.jdbcTemplate.queryForInt(
        "SELECT COUNT(1) \nFROM   `sms_template`\n" +
        currentWhereClause, os, types);
    
    String query = selectForGetSMSTemplate +currentWhereClause+ "LIMIT "+start+", "+limit;
    
    List<SMSTemplate> smsTemplateList = jdbcTemplate.query( query , 
                                                            os    , 
                                                            types , 
                                                            new SMSTemplateRowMapper());
    
    return new  ListRange<SMSTemplate>(totalCount, smsTemplateList);
  }
  
}