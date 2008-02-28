package fr.croixrouge.irp.services.intervention;

import java.sql.Types;
import java.util.Date;
import java.util.Hashtable;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.jdbc.core.JdbcTemplate;

import fr.croixrouge.irp.model.monitor.Intervention;
import fr.croixrouge.irp.model.monitor.InterventionTicket;
import fr.croixrouge.irp.model.monitor.dwr.ListRange;
import fr.croixrouge.irp.model.monitor.rowMapper.InterventionRowMapper;
import fr.croixrouge.irp.model.monitor.rowMapper.InterventionTicketRowMapper;
import fr.croixrouge.irp.services.JDBCHelper;

public class InterventionServiceImpl extends JDBCHelper implements InterventionService
{
  private         JdbcTemplate  jdbcTemplate  = null;
  private static  Log           logger        = LogFactory.getLog(InterventionServiceImpl.class);


  
  public InterventionServiceImpl(JdbcTemplate jdbcTemplate)
  {
    this.jdbcTemplate = jdbcTemplate;
  }
  
  
  private final static String selectForInteventionTicket = 
    "SELECT  `id_intervention`, `id_regulation`, `id_dispositif`, `id_origine` , \n" +
    "        `id_motif`       , `DH_reception` , `rue`          , `code_postal`, \n" +
    "        `ville`          , `batiment`     , `etage`        , `porte`      , \n" +
    "        `complement_adresse`, `complement_motif`, `google_coords_lat`, `google_coords_long`,\n" +
    "        `nom_victime`       , `nom_contact_sur_place`, `coordonnees_contact`\n" +
    "FROM     intervention                                                       \n";
  
  private final static String queryForGetInterventionTicket =
    selectForInteventionTicket +
    "WHERE    id_intervention = ?\n";
  

  public InterventionTicket getInterventionTicket(int idIntervention) throws Exception
  {
    return (InterventionTicket)this.jdbcTemplate.queryForObject(queryForGetInterventionTicket   , 
                                                                new Object[]{idIntervention}    ,
                                                                new int   []{Types.INTEGER}     ,
                                                                new InterventionTicketRowMapper());
  }
  
  private final static String queryForGetInterventionTicketWithStatus =
    selectForInteventionTicket           +
    "WHERE    id_regulation = ?\n"+
    "AND      id_etat       = ?\n";
  
  
  private final static String queryForGetInterventionTicketWithStatusCount =
    "SELECT   count(1)         \n" +
    "FROM     intervention     \n"+
    "WHERE    id_regulation = ?\n"+
    "AND      id_etat       = ?\n";
  
  @SuppressWarnings("unchecked")
  public ListRange getInterventionTicketWithStatus(int idRegulation, int status, int index, int limit) throws Exception
  {
    if(logger.isDebugEnabled())
      logger.debug("getting internvetion ticket for regulation id='"+idRegulation+"' with status status='"+status+"' from index='"+index+"' with limit='"+limit+"'");

    int totalCount = this.jdbcTemplate.queryForInt(queryForGetInterventionTicketWithStatusCount,
        new Object[]{idRegulation , status       },
        new int   []{Types.INTEGER, Types.INTEGER});
    
    List<InterventionTicket> list = this.jdbcTemplate.query( queryForGetInterventionTicketWithStatus + "LIMIT    ?,?              \n", 
        new Object[]{idRegulation , status       , index        , limit        },
        new int   []{Types.INTEGER, Types.INTEGER, Types.INTEGER, Types.INTEGER},
        new InterventionTicketRowMapper      ()); 
    
    
    return new ListRange(totalCount, list); 
  }
  
  @SuppressWarnings("unchecked")
  public List<InterventionTicket> getAllInterventionTicketWithStatus(int idRegulation, int status) throws Exception
  {
    return this.jdbcTemplate.query( queryForGetInterventionTicketWithStatus , 
        new Object[]{idRegulation , status       },
        new int   []{Types.INTEGER, Types.INTEGER},
        new InterventionTicketRowMapper      ()); 
  }
  
  
  
  private final static String selectForIntevention = 
    "SELECT  `id_intervention`,`id_dispositif`,`id_regulation`,`id_origine`,  `id_motif`, `complement_motif`, \n"+
    "        `num_inter`,  `id_ref_num_inter`,  `ref_num_inter`,  `DH_reception`,  `DH_depart`,               \n"+
    "        `DH_sur_place`,  `DH_bilan_primaire`,  `DH_bilan_secondaire`,  `DH_quitte_les_lieux`,            \n"+
    "        `DH_arrivee_hopital`,  `DH_dispo`,  `DH_a_sa_base`,  `DH_appel_renfort_medical`,                 \n"+
    "        `DH_arrivee_renfort_medical`,  `nom_victime`,  `nom_contact_sur_place`,  `coordonnees_contact`,  \n"+
    "        `batiment`,  `etage`,  `porte`,  `complement_adresse`,  `rue`,  `code_postal`,  `ville`,         \n"+
    "        `bilan_primaire`,  `bilan_secondaire`,  `pouls_chiffre`,  `pouls_regularite`,  `pouls_force`,    \n"+
    "        `ventil_chiffre`,  `ventil_regularite`,  `ventil_amplitude`,  `tension_haute`,  `tension_basse`, \n"+
    "        `tension_ref_haute`,  `tension_ref_basse`,  `reflexe_pupillaire`,  `temperature`,                \n"+
    "        `police_sur_place`,  `pompier_sur_place`,  `coordinateur_bspp`,  `coordinateur_samu`,            \n"+
    "        `renfort_medical`,  `transport_medicalisee`,  `laisse_sur_place`,  `laisse_sur_place_vivant`,    \n"+
    "        `decharche`, `utilisation_dsa`, `renfort_medical_type`, `id_etat`, `num_inter_banlieu`,          \n"+  
    "        `hopital`, `eval_ci`, `google_coords_lat`, `google_coords_long`                                  \n"+
    "FROM     intervention                                                                                    \n";
  
  private final static String queryForGetIntervention =
    selectForIntevention +
    "WHERE    id_intervention = ? \n";
  
  public Intervention getIntervention(int idIntervention) throws Exception
  {
    return (Intervention)this.jdbcTemplate.queryForObject(queryForGetIntervention, 
                                                          new Object[]{idIntervention},
                                                          new int   []{Types.INTEGER},
                                                          new InterventionRowMapper());
  }
  

  private final static String queryForCreateEmptyIntervention = 
    "INSERT INTO `intervention`\n"+
    "  (`id_dispositif`, `id_origine`, `id_motif`, `id_regulation`, `DH_reception`, `num_inter`)\n"+
    "VALUES\n"+
    "  ( 0, 0, 0, ?, ?, 0)\n";

  
  public Intervention createEmptyIntervention(int idRegulation) throws Exception
  {
    Intervention intervention = new Intervention();
    intervention.setDhReception(new Date());

    Object [] os    = new Object[]
                    {
                      idRegulation,
                      intervention.getDhReception()
                      
                    };
    
    int    [] types = new int[]
                    {
                      Types.INTEGER,              
                      Types.TIMESTAMP
                      
                    };
    
    jdbcTemplate.update(queryForCreateEmptyIntervention, os, types);
    
    intervention.setIdIntervention  (getLastInsertedId(jdbcTemplate));
    intervention.setIdRegulation    (idRegulation);
    
    if(logger.isDebugEnabled())
      logger.debug("Intervention inserted with id="+intervention.getIdIntervention());
    
    return intervention;
  }
  
  
  
  private final static String queryForUpdateGoogleCoordinates = 
    "UPDATE intervention          \n"+
    "SET    google_coords_lat = ?,\n"+
    "       google_coords_long =? \n"+
    "WHERE  id_intervention   = ? \n";
  public void updateGoogleCoordinates(float latitude, float longitude, int idIntervention) throws Exception
  {
    int nbLineUpdated = this.jdbcTemplate.update( queryForUpdateGoogleCoordinates, 
        new Object[]{latitude   , longitude  , idIntervention}, 
        new int   []{Types.FLOAT, Types.FLOAT, Types.INTEGER }
      );
    
    if(logger.isDebugEnabled())
      logger.debug("Intervention with id='"+idIntervention+"' has its coordinates (lat,long) udpdated with values ('"+latitude+"','"+longitude+"') (line updated = '"+nbLineUpdated+"')");
  }
  
  
  public static String[]booleanField = { 
    "police_sur_place"       ,
    "pompier_sur_place"      ,
    "coordinateur_bspp"      ,
    "coordinateur_samu"      ,
    "renfort_medical"        ,
    "transport_medicalisee"  ,
    "laisse_sur_place"       ,
    "laisse_sur_place_vivant",
    "decharche"              ,
    "utilisation_dsa"        };
  private static Hashtable<String, String> booleanFieldMatching = new Hashtable<String, String>(booleanField.length);
  {
    booleanFieldMatching.put("police_sur_place"       , "police_sur_place"        ); 
    booleanFieldMatching.put("pompier_sur_place"      , "pompier_sur_place"       ); 
    booleanFieldMatching.put("coordinateur_bspp"      , "coordinateur_bspp"       ); 
    booleanFieldMatching.put("coordinateur_samu"      , "coordinateur_samu"       ); 
    booleanFieldMatching.put("renfort_medical"        , "renfort_medical"         ); 
    booleanFieldMatching.put("transport_medicalisee"  , "transport_medicalisee"   ); 
    booleanFieldMatching.put("laisse_sur_place"       , "laisse_sur_place"        ); 
    booleanFieldMatching.put("laisse_sur_place_vivant", "laisse_sur_place_vivant" ); 
    booleanFieldMatching.put("decharche"              , "decharche"               ); 
    booleanFieldMatching.put("utilisation_dsa"        , "utilisation_dsa"         ); 
  }
  public void updateInterventionBooleanField(int idIntervention, String fieldName, boolean fieldValue) throws Exception
  {
    String realFieldName = booleanFieldMatching.get(fieldName);
    
    if(realFieldName == null)
      throw new Exception("Unknown boolean field '"+fieldName+"' for intervention update");

    String query = 
      "UPDATE intervention         \n"+
      "SET    "+realFieldName+" = ?\n"+
      "WHERE  id_intervention   = ?\n";
    
    int nbLineUpdated = this.jdbcTemplate.update( query, 
                                                  new Object[]{fieldValue   , idIntervention}, 
                                                  new int   []{Types.BOOLEAN, Types.INTEGER}
                                                );
    
    if(logger.isDebugEnabled())
      logger.debug("Intervention with id='"+idIntervention+"' has its field '"+realFieldName+"' updated with value '"+fieldValue+"' (line updated = '"+nbLineUpdated+"')");
  }

  public static String[]dateField = {
    "DH_reception"              ,
    "DH_depart"                 ,
    "DH_sur_place"              ,
    "DH_bilan_primaire"         ,
    "DH_bilan_secondaire"       ,
    "DH_quitte_les_lieux"       ,
    "DH_arrivee_hopital"        ,
    "DH_dispo"                  ,
    "DH_a_sa_base"              ,
    "DH_appel_renfort_medical"  ,
    "DH_arrivee_renfort_medical"
};
  private static Hashtable<String, String> dateFieldMatching = new Hashtable<String, String>(dateField.length);
  {
    dateFieldMatching.put("DH_reception"               , "DH_reception"               );
    dateFieldMatching.put("DH_depart"                  , "DH_depart"                  );
    dateFieldMatching.put("DH_sur_place"               , "DH_sur_place"               );
    dateFieldMatching.put("DH_bilan_primaire"          , "DH_bilan_primaire"          );
    dateFieldMatching.put("DH_bilan_secondaire"        , "DH_bilan_secondaire"        );
    dateFieldMatching.put("DH_quitte_les_lieux"        , "DH_quitte_les_lieux"        );
    dateFieldMatching.put("DH_arrivee_hopital"         , "DH_arrivee_hopital"         );
    dateFieldMatching.put("DH_dispo"                   , "DH_dispo"                   );
    dateFieldMatching.put("DH_a_sa_base"               , "DH_a_sa_base"               );
    dateFieldMatching.put("DH_appel_renfort_medical"   , "DH_appel_renfort_medical"   );
    dateFieldMatching.put("DH_arrivee_renfort_medical" , "DH_arrivee_renfort_medical" );  
  }
  public void updateInterventionDateField   (int idIntervention, String fieldName, Date fieldValue) throws Exception
  {
    String realFieldName = dateFieldMatching.get(fieldName);
    
    if(realFieldName == null)
      throw new Exception("Unknown date field '"+fieldName+"' for intervention update");

    String query = 
      "UPDATE intervention         \n"+
      "SET    "+realFieldName+" = ?\n"+
      "WHERE  id_intervention     = ?\n";
    
    int nbLineUpdated = this.jdbcTemplate.update( query, 
                                                  new Object[]{fieldValue, idIntervention}, 
                                                  new int   []{Types.TIMESTAMP, Types.INTEGER}
                                                );
    
    if(logger.isDebugEnabled())
      logger.debug("Intervention with id='"+idIntervention+"' has its field '"+realFieldName+"' updated with value '"+fieldValue+"' (line updated = '"+nbLineUpdated+"')");  
  }

  public static String[]floatField = {  
    "tension_haute"    ,
    "tension_basse"    ,
    "tension_ref_haute",
    "tension_ref_basse",
    "temperature"      ,
    "google_coords_lat", 
    "google_coords_long"
  };
  private static Hashtable<String, String> floatFieldMatching = new Hashtable<String, String>(floatField.length);
  {
    floatFieldMatching.put("tension_haute"      , "tension_haute"       );
    floatFieldMatching.put("tension_basse"      , "tension_basse"       );
    floatFieldMatching.put("tension_ref_haute"  , "tension_ref_haute"   );
    floatFieldMatching.put("tension_ref_basse"  , "tension_ref_basse"   );
    floatFieldMatching.put("temperature"        , "temperature"         );
    floatFieldMatching.put("google_coords_lat"  , "google_coords_lat"   );
    floatFieldMatching.put("google_coords_long" , "google_coords_long"  );
  }
  public void updateInterventionFloatField  (int idIntervention, String fieldName, float fieldValue) throws Exception
  {
    String realFieldName = floatFieldMatching.get(fieldName);
    
    if(realFieldName == null)
      throw new Exception("Unknown float field '"+fieldName+"' for intervention update");

    String query = 
      "UPDATE intervention         \n"+
      "SET    "+realFieldName+" = ?\n"+
      "WHERE  id_intervention   = ?\n";
    
    int nbLineUpdated = this.jdbcTemplate.update( query, 
                                                  new Object[]{fieldValue   , idIntervention}, 
                                                  new int   []{Types.DECIMAL, Types.INTEGER}
                                                );
    
    if(logger.isDebugEnabled())
      logger.debug("Intervention with id='"+idIntervention+"' has its field '"+realFieldName+"' updated with value '"+fieldValue+"' (line updated = '"+nbLineUpdated+"')");

  }

  public static String[]intField = {  
    "id_dispositif"   ,
    "id_origine"      ,
    "id_motif"        ,
    "id_ref_num_inter",
    "pouls_chiffre"   ,
    "ventil_chiffre"  ,
    "etat_intervention"
  };
  private static Hashtable<String, String> intFieldMatching = new Hashtable<String, String>(intField.length);
  {
    intFieldMatching.put("id_dispositif"    , "id_dispositif"    );
    intFieldMatching.put("id_origine"       , "id_origine"       );
    intFieldMatching.put("id_motif"         , "id_motif"         );
    intFieldMatching.put("id_ref_num_inter" , "id_ref_num_inter" );
    intFieldMatching.put("pouls_chiffre"    , "pouls_chiffre"    );
    intFieldMatching.put("ventil_chiffre"   , "ventil_chiffre"   );
    intFieldMatching.put("id_etat"          , "id_etat"          );
  }
  public void updateInterventionIntegerField(int idIntervention, String fieldName, int fieldValue) throws Exception
  {
    String realFieldName = intFieldMatching.get(fieldName);
    
    if(realFieldName == null)
      throw new Exception("Unknown int field '"+fieldName+"' for intervention update");

    String query = 
      "UPDATE intervention         \n"+
      "SET    "+realFieldName+" = ?\n"+
      "WHERE  id_intervention   = ?\n";
    
    int nbLineUpdated = this.jdbcTemplate.update( query, 
                                                  new Object[]{fieldValue   , idIntervention}, 
                                                  new int   []{Types.INTEGER,Types.INTEGER}
                                                );
    
    if(logger.isDebugEnabled())
      logger.debug("Intervention with id='"+idIntervention+"' has its field '"+realFieldName+"' updated with value '"+fieldValue+"' (line updated = '"+nbLineUpdated+"')");

  }

  public static String[]stringField = { 
    "complement_motif"     ,
    "num_inter"            ,
    "ref_num_inter"        ,
    "nom_victime"          ,
    "nom_contact_sur_place",
    "coordonnees_contact"  ,
    "batiment"             ,
    "etage"                ,
    "porte"                ,
    "complement_adresse"   ,
    "rue"                  ,
    "code_postal"          ,
    "ville"                ,
    "pouls_regularite"     ,
    "pouls_force"          ,
    "ventil_regularite"    ,
    "ventil_amplitude"     ,
    "reflexe_pupillaire"   ,
    "renfort_medical_type" ,
    "num_inter_banlieu"    ,
    "hopital"              ,
    "eval_ci"              ,
    "bilan_primaire"       ,
    "bilan_secondaire"
};
  private static Hashtable<String, String> stringFieldMatching = new Hashtable<String, String>(stringField.length);
  {
    stringFieldMatching.put("complement_motif"     , "complement_motif"     );
    stringFieldMatching.put("num_inter"            , "num_inter"            );
    stringFieldMatching.put("ref_num_inter"        , "ref_num_inter"        );
    stringFieldMatching.put("nom_victime"          , "nom_victime"          );
    stringFieldMatching.put("nom_contact_sur_place", "nom_contact_sur_place");
    stringFieldMatching.put("coordonnees_contact"  , "coordonnees_contact"  );
    stringFieldMatching.put("batiment"             , "batiment"             );
    stringFieldMatching.put("etage"                , "etage"                );
    stringFieldMatching.put("porte"                , "porte"                );
    stringFieldMatching.put("complement_adresse"   , "complement_adresse"   );
    stringFieldMatching.put("rue"                  , "rue"                  );
    stringFieldMatching.put("code_postal"          , "code_postal"          );
    stringFieldMatching.put("ville"                , "ville"                );
    stringFieldMatching.put("pouls_regularite"     , "pouls_regularite"     );
    stringFieldMatching.put("pouls_force"          , "pouls_force"          );
    stringFieldMatching.put("ventil_regularite"    , "ventil_regularite"    );
    stringFieldMatching.put("ventil_amplitude"     , "ventil_amplitude"     );
    stringFieldMatching.put("reflexe_pupillaire"   , "reflexe_pupillaire"   );
    stringFieldMatching.put("renfort_medical_type" , "renfort_medical_type" );
    stringFieldMatching.put("num_inter_banlieu"    , "num_inter_banlieu"    );
    stringFieldMatching.put("hopital"              , "hopital"              );
    stringFieldMatching.put("eval_ci"              , "eval_ci"              );
    stringFieldMatching.put("bilan_primaire"       , "bilan_primaire"       );
    stringFieldMatching.put("bilan_secondaire"     , "bilan_secondaire"     );
  }
  public void updateInterventionStringField (int idIntervention, String fieldName, String fieldValue) throws Exception
  {
    String realFieldName = stringFieldMatching.get(fieldName);
    
    if(realFieldName == null)
      throw new Exception("Unknown string field '"+fieldName+"' for intervention update");

    String query = 
      "UPDATE intervention         \n"+
      "SET    "+realFieldName+" = ?\n"+
      "WHERE  id_intervention   = ?\n";
    
    int nbLineUpdated = this.jdbcTemplate.update( query, 
                                                  new Object[]{fieldValue   , idIntervention}, 
                                                  new int   []{Types.VARCHAR, Types.INTEGER}
                                                );
    
    if(logger.isDebugEnabled())
      logger.debug("Intervention with id='"+idIntervention+"' has its field '"+realFieldName+"' updated with value '"+fieldValue+"' (line updated = '"+nbLineUpdated+"')");
  }

  
  
}
