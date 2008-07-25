package fr.croixrouge.irp.services.intervention;

import java.sql.Types;
import java.util.Date;
import java.util.Hashtable;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

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
  
  private int getLastInsertedId()
  {
    return this.getLastInsertedId(jdbcTemplate, "intervention");
  }
  
  private final static String selectForInteventionTicket = 
    "SELECT  `id_intervention`, `id_regulation`, `id_dispositif`, `id_origine` , \n" +
    "        `id_motif`       , `DH_saisie`    , `rue`          , `code_postal`, \n" +
    "        `ville`          , `batiment`     , `etage`        , `porte`      , \n" +
    "        `complement_adresse`, `complement_motif`, `google_coords_lat`    , `google_coords_long` ,\n" +
    "        `nom_victime`       , `homme_victime`   , `nom_contact_sur_place`, `coordonnees_contact`\n" +
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
    "  (`id_dispositif`, `id_origine`, `id_motif`, `id_regulation`, `DH_saisie`, `num_inter`)\n"+
    "VALUES\n"+
    "  ( 0, 0, 0, ?, ?, 0)\n";

  @Transactional (propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
  public Intervention createEmptyIntervention(int idRegulation) throws Exception
  {
    Intervention intervention = new Intervention();
    
    intervention.setIdRegulation(idRegulation);
    intervention.setDhReception (new Date()  );

    Object [] os    = new Object[]{ intervention.getIdRegulation(), intervention.getDhReception()};
    int    [] types = new int   []{ Types.INTEGER                 , Types.TIMESTAMP              };
    
    jdbcTemplate.update(queryForCreateEmptyIntervention, os, types);

    intervention.setIdIntervention  (this.getLastInsertedId());
    
    if(logger.isDebugEnabled())
      logger.debug("Intervention inserted with id="+intervention.getIdIntervention());
    
    return intervention;
  }
  
  
  private final static String queryForAffectInterventionToDispositif =
    "UPDATE intervention        \n" +
    "SET    id_dispositif   = ?,\n" +
    "       DH_reception    = ?,\n" +
    "       id_etat         = 2 \n" +
    "WHERE  id_intervention = ? \n";
  
  
  public void affectInterventionToDispositif(int idIntervention, int idDispositif, Date dateAffectation) throws Exception
  {

    if(logger.isDebugEnabled())
      logger.debug("Intervention with id='"+idIntervention+"' has been assigned to dispositif "+idDispositif+"");

    int nbLineUpdated = this.jdbcTemplate.update( queryForAffectInterventionToDispositif, 
        new Object[]{idDispositif , dateAffectation, idIntervention}, 
        new int   []{Types.INTEGER, Types.TIMESTAMP, Types.INTEGER }
      );
    
    if(logger.isDebugEnabled())
      logger.debug("Intervention with id='"+idIntervention+"' has been assigned to dispositif "+idDispositif+" (line updated = '"+nbLineUpdated+"')");
  }
  
  
  
  private final static String queryForUpdateGoogleCoordinates = 
    "UPDATE intervention          \n"+
    "SET    google_coords_lat = ?,\n"+
    "       google_coords_long =? \n"+
    "WHERE  id_intervention   = ? \n";
  public void updateGoogleCoordinates(float latitude, float longitude, int idIntervention) throws Exception
  {
    if(logger.isDebugEnabled())
      logger.debug("Intervention with id='"+idIntervention+"' has its coordinates (lat,long) beeing udpdated with values ('"+latitude+"','"+longitude+"')");

    int nbLineUpdated = this.jdbcTemplate.update( queryForUpdateGoogleCoordinates, 
        new Object[]{latitude   , longitude  , idIntervention}, 
        new int   []{Types.FLOAT, Types.FLOAT, Types.INTEGER }
      );
    
    if(logger.isDebugEnabled())
      logger.debug("Intervention with id='"+idIntervention+"' has its coordinates (lat,long) udpdated with values ('"+latitude+"','"+longitude+"') (line updated = '"+nbLineUpdated+"')");
  }
  
  
  public static String[]booleanField = { 
    "cs_coma"                             ,
    "cs_pci"                              ,
    "cs_pc_secondaire"                    ,
    "cs_agitation"                        ,
    "cs_convulsions"                      ,
    "ventil_absence"                      ,
    "ventil_superficielle"                ,
    "ventil_ronflement"                   ,
    "ventil_irreguliere"                  ,
    "ventil_tirage"                       ,
    "ventil_pauses"                       ,
    "ventil_sueurs"                       ,
    "ventil_sifflement"                   ,
    "ventil_cyanose"                      ,
    "circul_pouls_non_percu"              ,
    "circul_pouls_irregulier"             ,
    "circul_pouls_faible"                 ,
    "circul_conjonctive_decolorees"       ,
    "circul_paleur_cutanees"              ,
    "circul_marbrure"                     ,
    "pupille_reactive"                    ,
    "pupille_non_reactive"                ,
    "pupille_myosis_gauche"               ,
    "pupille_myosis_droite"               ,
    "pupille_mydriase_gauche"             ,
    "pupille_mydriase_droite"             ,
    "pupille_asymetriques"                ,
    "gestes_lva"                          ,
    "gestes_mce"                          ,
    "gestes_allongee"                     ,
    "gestes_pls"                          ,
    "gestes_pansement"                    ,
    "gestes_refroidissement"              ,
    "gestes_aspiration"                   ,
    "gestes_dsa"                          ,
    "gestes_demi_assis"                   ,
    "gestes_collier_cervical"             ,
    "gestes_point_de_compression"         ,
    "gestes_protection_thermique"         ,
    "gestes_va"                           ,
    "gestes_jambes_surelevees"            ,
    "gestes_attelle"                      ,
    "gestes_garrot"                       ,
    "gestes_immobilisation_generale"      ,
    "coordinateur_bspp_contacte"          ,
    "coordinateur_samu_contacte"          ,
    "transport_medicalisee_ar"            ,
    "transport_medicalisee_umh"           ,
    "police_sur_place"                    ,
    "pompier_sur_place"                   ,
    "evac_laisse_sur_place"               ,
    "evac_laisse_sur_place_decedee"       ,
    "evac_refus_de_transport"             ,
    "evac_decharche"                      ,
    "evac_aggravation"                    ,
    "evac_aggravation_pendant_transport"  ,
    "evac_aggravation_arrive_a_destination",
    "homme_victime"};
  private static Hashtable<String, String> booleanFieldMatching = new Hashtable<String, String>(booleanField.length);
  {
    booleanFieldMatching.put("cs_coma"                              ,"cs_coma"                              );
    booleanFieldMatching.put("cs_pci"                               ,"cs_pci"                               );
    booleanFieldMatching.put("cs_pc_secondaire"                     ,"cs_pc_secondaire"                     );
    booleanFieldMatching.put("cs_agitation"                         ,"cs_agitation"                         );
    booleanFieldMatching.put("cs_convulsions"                       ,"cs_convulsions"                       );
    booleanFieldMatching.put("ventil_absence"                       ,"ventil_absence"                       );
    booleanFieldMatching.put("ventil_superficielle"                 ,"ventil_superficielle"                 );
    booleanFieldMatching.put("ventil_ronflement"                    ,"ventil_ronflement"                    );
    booleanFieldMatching.put("ventil_irreguliere"                   ,"ventil_irreguliere"                   );
    booleanFieldMatching.put("ventil_tirage"                        ,"ventil_tirage"                        );
    booleanFieldMatching.put("ventil_pauses"                        ,"ventil_pauses"                        );
    booleanFieldMatching.put("ventil_sueurs"                        ,"ventil_sueurs"                        );
    booleanFieldMatching.put("ventil_sifflement"                    ,"ventil_sifflement"                    );
    booleanFieldMatching.put("ventil_cyanose"                       ,"ventil_cyanose"                       );
    booleanFieldMatching.put("circul_pouls_non_percu"               ,"circul_pouls_non_percu"               );
    booleanFieldMatching.put("circul_pouls_irregulier"              ,"circul_pouls_irregulier"              );
    booleanFieldMatching.put("circul_pouls_faible"                  ,"circul_pouls_faible"                  );
    booleanFieldMatching.put("circul_conjonctive_decolorees"        ,"circul_conjonctive_decolorees"        );
    booleanFieldMatching.put("circul_paleur_cutanees"               ,"circul_paleur_cutanees"               );
    booleanFieldMatching.put("circul_marbrure"                      ,"circul_marbrure"                      );
    booleanFieldMatching.put("pupille_reactive"                     ,"pupille_reactive"                     );
    booleanFieldMatching.put("pupille_non_reactive"                 ,"pupille_non_reactive"                 );
    booleanFieldMatching.put("pupille_myosis_gauche"                ,"pupille_myosis_gauche"                );
    booleanFieldMatching.put("pupille_myosis_droite"                ,"pupille_myosis_droite"                );
    booleanFieldMatching.put("pupille_mydriase_gauche"              ,"pupille_mydriase_gauche"              );
    booleanFieldMatching.put("pupille_mydriase_droite"              ,"pupille_mydriase_droite"              );
    booleanFieldMatching.put("pupille_asymetriques"                 ,"pupille_asymetriques"                 );
    booleanFieldMatching.put("gestes_lva"                           ,"gestes_lva"                           );
    booleanFieldMatching.put("gestes_mce"                           ,"gestes_mce"                           );
    booleanFieldMatching.put("gestes_allongee"                      ,"gestes_allongee"                      );
    booleanFieldMatching.put("gestes_pls"                           ,"gestes_pls"                           );
    booleanFieldMatching.put("gestes_pansement"                     ,"gestes_pansement"                     );
    booleanFieldMatching.put("gestes_refroidissement"               ,"gestes_refroidissement"               );
    booleanFieldMatching.put("gestes_aspiration"                    ,"gestes_aspiration"                    );
    booleanFieldMatching.put("gestes_dsa"                           ,"gestes_dsa"                           );
    booleanFieldMatching.put("gestes_demi_assis"                    ,"gestes_demi_assis"                    );
    booleanFieldMatching.put("gestes_collier_cervical"              ,"gestes_collier_cervical"              );
    booleanFieldMatching.put("gestes_point_de_compression"          ,"gestes_point_de_compression"          );
    booleanFieldMatching.put("gestes_protection_thermique"          ,"gestes_protection_thermique"          );
    booleanFieldMatching.put("gestes_va"                            ,"gestes_va"                            );
    booleanFieldMatching.put("gestes_jambes_surelevees"             ,"gestes_jambes_surelevees"             );
    booleanFieldMatching.put("gestes_attelle"                       ,"gestes_attelle"                       );
    booleanFieldMatching.put("gestes_garrot"                        ,"gestes_garrot"                        );
    booleanFieldMatching.put("gestes_immobilisation_generale"       ,"gestes_immobilisation_generale"       );
    booleanFieldMatching.put("coordinateur_bspp_contacte"           ,"coordinateur_bspp_contacte"           );
    booleanFieldMatching.put("coordinateur_samu_contacte"           ,"coordinateur_samu_contacte"           );
    booleanFieldMatching.put("transport_medicalisee_ar"             ,"transport_medicalisee_ar"             );
    booleanFieldMatching.put("transport_medicalisee_umh"            ,"transport_medicalisee_umh"            );
    booleanFieldMatching.put("police_sur_place"                     ,"police_sur_place"                     );
    booleanFieldMatching.put("pompier_sur_place"                    ,"pompier_sur_place"                    );
    booleanFieldMatching.put("evac_laisse_sur_place"                ,"evac_laisse_sur_place"                );
    booleanFieldMatching.put("evac_laisse_sur_place_decedee"        ,"evac_laisse_sur_place_decedee"        );
    booleanFieldMatching.put("evac_refus_de_transport"              ,"evac_refus_de_transport"              );
    booleanFieldMatching.put("evac_decharche"                       ,"evac_decharche"                       );
    booleanFieldMatching.put("evac_aggravation"                     ,"evac_aggravation"                     );
    booleanFieldMatching.put("evac_aggravation_pendant_transport"   ,"evac_aggravation_pendant_transport"   );
    booleanFieldMatching.put("evac_aggravation_arrive_a_destination","evac_aggravation_arrive_a_destination");
    booleanFieldMatching.put("homme_victime"                        ,"homme_victime");
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
    "gestes_garrot_heure_pose"           ,    
    "evac_aggravation_contact_regulation",    
    "DH_saisie"                          ,    
    "DH_reception"                       ,    
    "DH_depart"                          ,    
    "DH_sur_place"                       ,    
    "DH_bilan_primaire"                  ,    
    "DH_bilan_secondaire"                ,    
    "DH_quitte_les_lieux"                ,    
    "DH_arrivee_hopital"                 ,    
    "DH_dispo"                           ,    
    "DH_a_sa_base"                       ,    
    "DH_appel_renfort_medical"           ,    
    "DH_arrivee_renfort_medical"         ,    
    "evac_arrivee_destination"               
};
  private static Hashtable<String, String> dateFieldMatching = new Hashtable<String, String>(dateField.length);
  {
    dateFieldMatching.put("gestes_garrot_heure_pose"           , "gestes_garrot_heure_pose"              );
    dateFieldMatching.put("evac_aggravation_contact_regulation", "evac_aggravation_contact_regulation"   );
    dateFieldMatching.put("DH_saisie"                          , "DH_saisie"                             );
    dateFieldMatching.put("DH_reception"                       , "DH_reception"                          );
    dateFieldMatching.put("DH_depart"                          , "DH_depart"                             );
    dateFieldMatching.put("DH_sur_place"                       , "DH_sur_place"                          );
    dateFieldMatching.put("DH_bilan_primaire"                  , "DH_bilan_primaire"                     );
    dateFieldMatching.put("DH_bilan_secondaire"                , "DH_bilan_secondaire"                   );
    dateFieldMatching.put("DH_quitte_les_lieux"                , "DH_quitte_les_lieux"                   );
    dateFieldMatching.put("DH_arrivee_hopital"                 , "DH_arrivee_hopital"                    );
    dateFieldMatching.put("DH_dispo"                           , "DH_dispo"                              );
    dateFieldMatching.put("DH_a_sa_base"                       , "DH_a_sa_base"                          );
    dateFieldMatching.put("DH_appel_renfort_medical"           , "DH_appel_renfort_medical"              );
    dateFieldMatching.put("DH_arrivee_renfort_medical"         , "DH_arrivee_renfort_medical"            );
    dateFieldMatching.put("evac_arrivee_destination"           , "evac_arrivee_destination"              );
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
    "circul_tension_basse"          ,          
    "circul_tension_haute"          ,          
    "gestes_glycemie_gramme_litre"  ,          
    "gestes_temperature"            ,          
    "google_coords_lat"             ,          
    "google_coords_long"
  };
  private static Hashtable<String, String> floatFieldMatching = new Hashtable<String, String>(floatField.length);
  {
    floatFieldMatching.put("circul_tension_basse"          , "circul_tension_basse"         );
    floatFieldMatching.put("circul_tension_haute"          , "circul_tension_haute"         );
    floatFieldMatching.put("gestes_glycemie_gramme_litre"  , "gestes_glycemie_gramme_litre" );
    floatFieldMatching.put("gestes_temperature"            , "gestes_temperature"           );
    floatFieldMatching.put("google_coords_lat"             , "google_coords_lat"            );
    floatFieldMatching.put("google_coords_long"            , "google_coords_long"           );
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
    "ventil_saturation_o2"          ,
    "gestes_inhalation_o2_litre_min",
    "circul_tension_ref_basse"      ,
    "circul_tension_ref_haute"      ,
    "douleur"                       ,
    "gestes_dsa_nb_chocs"           ,
    "evac_par"                      ,
    "id_intervention"               ,
    "id_etat"                       ,
    "id_dispositif"                 ,
    "id_regulation"                 ,
    "id_origine"                    ,
    "id_motif"                      ,
    "id_ref_num_inter"              ,
    "ventil_chiffre"                ,
    "circul_pouls_chiffre"          ,
    "transport_medicalisee_de"      ,
    "evac_hopital_destination"      ,
    "evac_aggravation_ventilation"  ,
    "evac_aggravation_circulation"  ,
    "evac_aggravation_douleur"      ,
    "age_approx_victime"
  };
  private static Hashtable<String, String> intFieldMatching = new Hashtable<String, String>(intField.length);
  {
    intFieldMatching.put("ventil_saturation_o2"          , "ventil_saturation_o2"           );
    intFieldMatching.put("gestes_inhalation_o2_litre_min", "gestes_inhalation_o2_litre_min" );       
    intFieldMatching.put("circul_tension_ref_basse"      , "circul_tension_ref_basse"       );       
    intFieldMatching.put("circul_tension_ref_haute"      , "circul_tension_ref_haute"       );       
    intFieldMatching.put("douleur"                       , "douleur"                        );       
    intFieldMatching.put("gestes_dsa_nb_chocs"           , "gestes_dsa_nb_chocs"            );       
    intFieldMatching.put("evac_par"                      , "evac_par"                       );       
    intFieldMatching.put("id_intervention"               , "id_intervention"                );       
    intFieldMatching.put("id_etat"                       , "id_etat"                        );       
    intFieldMatching.put("id_dispositif"                 , "id_dispositif"                  );       
    intFieldMatching.put("id_regulation"                 , "id_regulation"                  );       
    intFieldMatching.put("id_origine"                    , "id_origine"                     );       
    intFieldMatching.put("id_motif"                      , "id_motif"                       );       
    intFieldMatching.put("id_ref_num_inter"              , "id_ref_num_inter"               );       
    intFieldMatching.put("ventil_chiffre"                , "ventil_chiffre"                 );       
    intFieldMatching.put("circul_pouls_chiffre"          , "circul_pouls_chiffre"           );       
    intFieldMatching.put("transport_medicalisee_de"      , "transport_medicalisee_de"       );       
    intFieldMatching.put("evac_hopital_destination"      , "evac_hopital_destination"       );       
    intFieldMatching.put("evac_aggravation_ventilation"  , "evac_aggravation_ventilation"   );       
    intFieldMatching.put("evac_aggravation_circulation"  , "evac_aggravation_circulation"   );       
    intFieldMatching.put("evac_aggravation_douleur"      , "evac_aggravation_douleur"       );
    intFieldMatching.put("age_approx_victime"            , "age_approx_victime"             );
    
    
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
    "bilan_circonstances"                     ,
    "bilan_detresses"                         ,
    "bilan_antecedents"                       ,
    "bilan_commentaires"                      ,
    "commentaires"                            ,
    "eval_ci"                                 ,
    "cs_pci_duree"                            ,
    "evac_autre_destination"                  ,
    "evac_aggravation_nature"                 ,
    "evac_par_autre"                          ,
    "num_inter"                               ,
    "ref_num_inter"                           ,
    "ventil_commentaire"                      ,
    "circul_pouls_commentaire"                ,
    "evac_num_inter_banlieu"                  ,
    "effet_ou_objet_remis"                    ,
    "code_postal_victime"                     ,
    "gestes_autres"                           ,
    "complement_motif"                        ,
    "complement_adresse"                      ,
    "batiment"                                ,
    "etage"                                   ,
    "porte"                                   ,
    "code_postal"                             ,
    "medecin_civil_sur_place"                 ,
    "nom_contact_sur_place"                   ,
    "nom_victime"                             ,
    "nom_jf_victime"                          ,
    "prenom_victime"                          ,
    "ville_victime"                           ,
    "pays_victime"                            ,
    "personne_a_prevenir"                     ,
    "tel_personne_a_prevenir"                 ,
    "effet_ou_objet_remis_a"                  ,
    "coordonnees_contact"                     ,
    "lieu_naissance"                          ,
    "adresse_victime"                         ,
    "rue"                                     ,
    "ville"                                   ,
    "evac_laisse_sur_place_decedee_a_dispo_de"
};
  private static Hashtable<String, String> stringFieldMatching = new Hashtable<String, String>(stringField.length);
  {
    stringFieldMatching.put("bilan_circonstances"                     ,"bilan_circonstances"                     );
    stringFieldMatching.put("bilan_detresses"                         ,"bilan_detresses"                         );
    stringFieldMatching.put("bilan_antecedents"                       ,"bilan_antecedents"                       );
    stringFieldMatching.put("bilan_commentaires"                      ,"bilan_commentaires"                      );
    stringFieldMatching.put("commentaires"                            ,"commentaires"                            );
    stringFieldMatching.put("eval_ci"                                 ,"eval_ci"                                 );
    stringFieldMatching.put("cs_pci_duree"                            ,"cs_pci_duree"                            );
    stringFieldMatching.put("evac_autre_destination"                  ,"evac_autre_destination"                  );
    stringFieldMatching.put("evac_aggravation_nature"                 ,"evac_aggravation_nature"                 );
    stringFieldMatching.put("evac_par_autre"                          ,"evac_par_autre"                          );
    stringFieldMatching.put("num_inter"                               ,"num_inter"                               );
    stringFieldMatching.put("ref_num_inter"                           ,"ref_num_inter"                           );
    stringFieldMatching.put("ventil_commentaire"                      ,"ventil_commentaire"                      );
    stringFieldMatching.put("circul_pouls_commentaire"                ,"circul_pouls_commentaire"                );
    stringFieldMatching.put("evac_num_inter_banlieu"                  ,"evac_num_inter_banlieu"                  );
    stringFieldMatching.put("effet_ou_objet_remis"                    ,"effet_ou_objet_remis"                    );
    stringFieldMatching.put("code_postal_victime"                     ,"code_postal_victime"                     );
    stringFieldMatching.put("gestes_autres"                           ,"gestes_autres"                           );
    stringFieldMatching.put("complement_motif"                        ,"complement_motif"                        );
    stringFieldMatching.put("complement_adresse"                      ,"complement_adresse"                      );
    stringFieldMatching.put("batiment"                                ,"batiment"                                );
    stringFieldMatching.put("etage"                                   ,"etage"                                   );
    stringFieldMatching.put("porte"                                   ,"porte"                                   );
    stringFieldMatching.put("code_postal"                             ,"code_postal"                             );
    stringFieldMatching.put("medecin_civil_sur_place"                 ,"medecin_civil_sur_place"                 );
    stringFieldMatching.put("nom_contact_sur_place"                   ,"nom_contact_sur_place"                   );
    stringFieldMatching.put("nom_victime"                             ,"nom_victime"                             );
    stringFieldMatching.put("nom_jf_victime"                          ,"nom_jf_victime"                          );
    stringFieldMatching.put("prenom_victime"                          ,"prenom_victime"                          );
    stringFieldMatching.put("ville_victime"                           ,"ville_victime"                           );
    stringFieldMatching.put("pays_victime"                            ,"pays_victime"                            );
    stringFieldMatching.put("personne_a_prevenir"                     ,"personne_a_prevenir"                     );
    stringFieldMatching.put("tel_personne_a_prevenir"                 ,"tel_personne_a_prevenir"                 );
    stringFieldMatching.put("effet_ou_objet_remis_a"                  ,"effet_ou_objet_remis_a"                  );
    stringFieldMatching.put("coordonnees_contact"                     ,"coordonnees_contact"                     );
    stringFieldMatching.put("lieu_naissance"                          ,"lieu_naissance"                          );
    stringFieldMatching.put("adresse_victime"                         ,"adresse_victime"                         );
    stringFieldMatching.put("rue"                                     ,"rue"                                     );
    stringFieldMatching.put("ville"                                   ,"ville"                                   );
    stringFieldMatching.put("evac_laisse_sur_place_decedee_a_dispo_de","evac_laisse_sur_place_decedee_a_dispo_de");
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
