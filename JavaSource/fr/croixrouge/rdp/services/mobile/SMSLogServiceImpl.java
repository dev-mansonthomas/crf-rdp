package fr.croixrouge.rdp.services.mobile;

import java.sql.Types;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.jdbc.core.JdbcTemplate;

import fr.croixrouge.rdp.model.monitor.SMS;
import fr.croixrouge.rdp.model.monitor.dwr.ListRange;
import fr.croixrouge.rdp.model.monitor.rowMapper.SMSRowMapper;

public class SMSLogServiceImpl implements SMSLogService
{
  private static  Log           logger             = LogFactory.getLog(SMSLogServiceImpl.class);
  
  
  private JdbcTemplate jdbcTemplate = null;
  
//  private final static String selectForSMSLog = 
//    "SELECT `id_sms_log`   ,\n"+ 
//    "       `id_sms_type`  ,\n"+ 
//    "       `id_dispositif`,\n"+ 
//    "       `id_equipier`  ,\n"+ 
//    "       `api`          ,\n"+ 
//    "       `sender`       ,\n"+ 
//    "       `to`           ,\n"+ 
//    "       `message`      ,\n"+ 
//    "       `evt_date`      \n";

  
  public SMSLogServiceImpl(JdbcTemplate jdbcTemplate)
  {
    this.jdbcTemplate = jdbcTemplate;
  }

  
  public void logSentSMS(SMS sms) throws Exception
  {
    sms.setApi (SMS.API_SEND_SMS);
    sms.setFrom(SMS.FROM_REGULATION);
    this.logSmsTransmission(sms);
    
  }
  
  public void logRecievedSMS(SMS sms) throws Exception
  {
    this.logSmsTransmission(sms);
  }
  
  private final static String queryForLogSmsTransmission = 
    "INSERT INTO `sms_log`                                                                          \n" +
    " (`id_sms_type`, `id_dispositif`, `id_equipier`, `api`,`sender` , `to` , `message`, `evt_date`)\n" +
    "VALUES                                                                                         \n" +
    " (?            , ?              , ?            , ?    , ?       ,  ?   , ?        , ?         )\n" ;
  
  private void logSmsTransmission(SMS sms) throws Exception
  {
    if(logger.isDebugEnabled())
    {
      logger.debug(sms); 
    }
     
    this.jdbcTemplate.update(queryForLogSmsTransmission,
        new Object[]{sms.getSmsType() , sms.getIdDispositif(), sms.getEquipierId(), sms.getApi() , sms.getFrom(), sms.getRecipient(), sms.getMessage(), sms.getEventDate()}, 
        new int   []{Types.INTEGER    , Types.INTEGER        , Types.INTEGER      , Types.VARCHAR, Types.VARCHAR, Types.VARCHAR     , Types.VARCHAR   , Types.TIMESTAMP   }
    );
  }

  private final static String selectForSearchSMSForSMSManager =
      "SELECT sl.`id_sms_log`   ,                                           \n" +
          "       sl.`id_sms_type`  ,                                           \n" +
          "       sl.`id_dispositif`,                                           \n" +
          "       sl.`id_equipier`  ,                                           \n" +
          "       sl.`api`          ,                                           \n" +
          "       sl.`sender`       ,                                           \n" +
          "       sl.`to`           ,                                           \n" +
          "       sl.`message`      ,                                           \n" +
          "       sl.`evt_date`     ,                                           \n" +
          "       concat(e.nivol,' - ', e.prenom ,' ', e.nom) as equipier_desc  \n" +
          "FROM   `sms_log` sl, equipier e                                      \n";

  private final static String whereClauseForSearchSMSForSMSManager =
      "WHERE  sl.id_equipier = e.id_equipier                                \n";


  private final static String whereClauseForDateSeach =
      "AND sl.`evt_date` BETWEEN ? AND ? \n";


  private HashMap<String, String> sortMapForSearchSMSForSMSManager = new HashMap<>();

  {
    sortMapForSearchSMSForSMSManager.put("idSMS", "id_sms_log");
    sortMapForSearchSMSForSMSManager.put("smsType", "id_sms_type");
    sortMapForSearchSMSForSMSManager.put("equipierDesc", "id_equipier");
    sortMapForSearchSMSForSMSManager.put("idDispositif", "id_dispositif");
    sortMapForSearchSMSForSMSManager.put("api", "api");
    sortMapForSearchSMSForSMSManager.put("from", "sender");
    sortMapForSearchSMSForSMSManager.put("recipient", "`to`");
    sortMapForSearchSMSForSMSManager.put("message", "message");
    sortMapForSearchSMSForSMSManager.put("eventDate", "evt_date");
    sortMapForSearchSMSForSMSManager.put("evt_date", "evt_date");
  }

  public ListRange<SMS> searchSMSForSMSManager(int idEquipier, String mobile, Date searchDate, boolean allSMS, String sortColumn, boolean sortAscending, int start, int limit) throws Exception
  {
    if (logger.isDebugEnabled())
    {
      logger.debug("searching SMS : idEquipier='" + idEquipier + "', mobile='" + mobile + "', searchDate='" + searchDate + "', allSMS='" + allSMS + "', sortColumn='" + sortColumn + "', sortAscending='" + sortAscending + "', start='" + start + "', limit='" + limit + "'");
    }

    String orderByField = sortMapForSearchSMSForSMSManager.get(sortColumn);

    if (orderByField == null)
      throw new Exception("Invalid sort column '" + sortColumn + "'");

    String orderBy = "\nORDER BY ";
    orderBy += orderByField;
    orderBy += " " + (sortAscending ? " ASC" : " DESC");


    ArrayList<Object>  osA    = new ArrayList<>();
    ArrayList<Integer> typesA = new ArrayList<>();

    Object[] os    = null;
    int[]    types = null;

    String currentWhereClause = whereClauseForSearchSMSForSMSManager;

    String whereClause = "";

    if (idEquipier != 0)
    {
      whereClause += "   sl.`id_equipier` = ? \n";
      osA.add(idEquipier);
      typesA.add(Types.INTEGER);
    }

    if (!"".equals(mobile))
    {
      if (osA.size() == 1)
      {
        whereClause += "OR";
      }

      whereClause += "   sl.`to`          = ? \n";
      osA.add(mobile);
      typesA.add(Types.CHAR);
      whereClause += "OR   sl.`sender`      = ? \n";
      osA.add(mobile);
      typesA.add(Types.CHAR);
    }

    if (osA.size() > 0)
    {
      whereClause = "AND (              \n" + whereClause + "\n)\n";
    }

    currentWhereClause += whereClause;

    if (searchDate != null)
    {
      Calendar calendar = GregorianCalendar.getInstance();

      calendar.setTime(searchDate);
      calendar.add(Calendar.DAY_OF_YEAR, 1);
      
      Date searchDatePlusOneDay = calendar.getTime();
      
      
      osA   .add(searchDate);
      typesA.add(Types.TIMESTAMP);
      osA   .add(searchDatePlusOneDay);
      typesA.add(Types.TIMESTAMP);
      
      currentWhereClause+=whereClauseForDateSeach;
    }
  
    

    if(!allSMS)
    {// si on ne prends pas tout les SMS, on exclue les SMS envoyés à un SAMU à l'affectation, ou les sms envoyés aux membres d'un équipage
      
      currentWhereClause +="AND sl.`id_dispositif` = 0\n";
    }
    
    
    os    = osA.toArray(new Object [osA.size()] );
     
    Integer[] typesI= typesA.toArray(new Integer[typesA.size()]);
    types = new int[typesI.length];
    
    for(int i=0,counti=typesI.length;i<counti;i++)
      types[i]=typesI[i];
    
  
    int totalCount = this.jdbcTemplate.queryForObject(
        "SELECT COUNT(1) \nFROM   `sms_log` sl, equipier e \n" +
            currentWhereClause, os, types, Integer.class);
    
    
    String query = selectForSearchSMSForSMSManager +currentWhereClause+ orderBy+ "\nLIMIT "+start+", "+limit;
    
    
    if(logger.isDebugEnabled())
      logger.debug("searching for equipier : idEquipier='"+idEquipier+"', mobile='"+mobile+"', searchDate='"+searchDate+"', allSMS='"+allSMS+"', start='"+start+"', limit='"+limit+"' (totalCount='"+totalCount+"') with SQL query : \n"+query);
    
    List<SMS> smsList = jdbcTemplate.query( query , 
        os    , 
        types , 
        new SMSRowMapper());
    
    
    return new ListRange<>(totalCount, smsList);
  }
  
  
}
