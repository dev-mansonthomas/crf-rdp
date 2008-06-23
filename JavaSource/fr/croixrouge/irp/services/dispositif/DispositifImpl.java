package fr.croixrouge.irp.services.dispositif;

import java.sql.Types;
import java.util.Date;
import java.util.Hashtable;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.jdbc.core.JdbcTemplate;

import fr.croixrouge.irp.model.monitor.Dispositif;
import fr.croixrouge.irp.model.monitor.DispositifTicket;
import fr.croixrouge.irp.model.monitor.Equipier;
import fr.croixrouge.irp.model.monitor.Regulation;
import fr.croixrouge.irp.model.monitor.dwr.ListRange;
import fr.croixrouge.irp.model.monitor.rowMapper.DispositifEquipierIdAndRoleRowMapper;
import fr.croixrouge.irp.model.monitor.rowMapper.DispositifRowMapper;
import fr.croixrouge.irp.model.monitor.rowMapper.DispositifTicketRowMapper;
import fr.croixrouge.irp.services.JDBCHelper;
import fr.croixrouge.irp.services.equipier.EquipierService;
import fr.croixrouge.irp.services.intervention.InterventionService;

public class DispositifImpl extends JDBCHelper implements DispositifService
{
  private static Log          logger              = LogFactory.getLog(DispositifImpl.class);
  private JdbcTemplate        jdbcTemplate        = null;
  private EquipierService     equipierService     = null;
  private InterventionService interventionService = null;
  
  public DispositifImpl(JdbcTemplate  jdbcTemplate, InterventionService interventionService)
  {
    this.jdbcTemplate        = jdbcTemplate       ;
    this.interventionService = interventionService;
  }
  public void setEquipierService(EquipierService equipierService)
  {
    this.equipierService = equipierService;
  }
  
  private int getLastInsertedId()
  {
    return this.getLastInsertedId(jdbcTemplate, "dispositif");
  }
  
  private final static String queryForAffectInterventionToDispositif =
    "UPDATE dispositif                    \n" +
    "SET    id_current_intervention   = ?,\n" +
    "       id_etat_dispositif        = 5,\n" +
    "       DH_reception              = ? \n" +
    "WHERE  id_dispositif             = ? \n";
  
  
  public void affectInterventionToDispositif(int idIntervention, int idDispositif, Date dateAffectation) throws Exception
  {

    if(logger.isDebugEnabled())
      logger.debug("Dispositif with id='"+idDispositif+"' has been assigned the intervention "+idIntervention+"");

    int nbLineUpdated = this.jdbcTemplate.update( queryForAffectInterventionToDispositif, 
        new Object[]{idIntervention , dateAffectation, idDispositif }, 
        new int   []{Types.INTEGER  , Types.TIMESTAMP, Types.INTEGER}
      );
    
    if(logger.isDebugEnabled())
      logger.debug("Dispositif with id='"+idDispositif+"' has been assigned the intervention "+idIntervention+" (line updated = '"+nbLineUpdated+"')");
  }
  
  
  private final static String queryForGetEquipierIdAndRoleOfDispositif=
    "SELECT  `equipier_1_id`     , `equipier_2_id`     , `equipier_3_id`     , `equipier_4_id`  , `equipier_5_id`  ,\n" +
    "        `equipier_1_role`   , `equipier_2_role`   , `equipier_3_role`   , `equipier_4_role`, `equipier_5_role` \n" +
    "FROM    dispositif d\n"    +
    "WHERE   id_dispositif=?\n" +
    "AND     id_regulation=?\n";
  
  @SuppressWarnings("unchecked")
  public List<Equipier> getEquipierIdAndRoleOfDispositif(int idRegulation, int idDispositif) throws Exception
  {
    if(logger.isDebugEnabled())
      logger.debug("getEquipierIdAndRoleOfDispositif idRegulation="+idRegulation+" idDispositif="+idDispositif);
    
    return (List<Equipier>)this.jdbcTemplate.queryForObject(queryForGetEquipierIdAndRoleOfDispositif, 
        new Object[]{idDispositif , idRegulation },
        new int   []{Types.INTEGER, Types.INTEGER},
        new DispositifEquipierIdAndRoleRowMapper());
  }
  
  private final static String queryForGetIdTypeDispositif=
    "SELECT  `id_type_dispositif`\n" +
    "FROM    dispositif d\n"    +
    "WHERE   id_dispositif=?\n" +
    "AND     id_regulation=?\n";
  
  public int getIdTypeDispositif(int idRegulation, int idDispositif) throws Exception
  {
    return this.jdbcTemplate.queryForInt(queryForGetIdTypeDispositif, 
        new Object[]{idDispositif , idRegulation},
        new int   []{Types.INTEGER, Types.INTEGER});
  }
  
  
  private final static String dispositifSelectQuery = 
    "SELECT  `id_dispositif`     , `id_type_dispositif`, `indicatif_vehicule`, `equipier_1_id` ,                                               \n" +
    "        `O2_B1_volume`      , `O2_B1_pression`    , `O2_B2_volume`      ,                                                                \n" +
    "        `O2_B2_pression`    , `O2_B3_volume`      , `O2_B3_pression`    ,                                                                \n" +
    "        `O2_B4_volume`      , `O2_B4_pression`    , `O2_B5_volume`      , `O2_B5_pression`, `google_coords_lat`, `google_coords_long`,   \n" +
    "        `dispositif_comment`, `dispositif_back_3_girl`, `dispositif_not_enough_O2`, `dispositif_set_available_with_warning`,             \n" +
    "        `dsa_type`          , `dsa_complet`       , `observation`       ,                                                                \n" +
    "        `DH_debut`          , `DH_fin`            , `id_delegation_responsable`, `autre_delegation`,                                     \n" +
    "        `contact_radio`     , `contact_tel1`      , `contact_tel2`      ,                                                                \n" +
    "        `contact_alphapage` , `identite_medecin`  , `id_etat_dispositif`, `id_current_intervention`, `display_state`,                    \n" +
    "        `current_addresse_rue`, `current_addresse_code_postal`, `current_addresse_ville`,                                                \n" +
    "        `DH_reception`      , `DH_depart`, `DH_sur_place`, `DH_bilan_primaire`       , `DH_bilan_secondaire`, `DH_quitte_les_lieux`,     \n" +
    "        `DH_arrivee_hopital`, `DH_dispo` , `DH_a_sa_base`, `DH_appel_renfort_medical`, `DH_arrivee_renfort_medical`, `creation_terminee` \n" +
    "FROM    dispositif d             \n";  
  
  
  private final static String queryForGetAllDispositif = dispositifSelectQuery + 
  "WHERE   id_regulation=?          \n"+
  "AND     creation_terminee = true \n"+
  "ORDER BY indicatif_vehicule ASC  \n";

  @SuppressWarnings("unchecked")
  public ListRange getAllDispositif(int regulationId) throws Exception
  {
    
    List <Dispositif> dispositifs = this.jdbcTemplate.query(queryForGetAllDispositif, 
                                                            new Object[]{new Integer(regulationId)},
                                                            new int   []{Types.INTEGER},
                                                            new DispositifRowMapper()); 
    
    for (Dispositif dispositif : dispositifs)
    {
      if(dispositif.getEquipierCi().getIdEquipier() != 0)
        dispositif.setEquipierCi(this.equipierService.getEquipier(dispositif.getEquipierCi().getIdEquipier()));
      
      if(dispositif.getCurrentIntervention().getIdIntervention() != 0)
        dispositif.setCurrentIntervention(interventionService.getInterventionTicket(dispositif.getCurrentIntervention().getIdIntervention()));
    }
    
    return new ListRange(dispositifs.size(), dispositifs);
  }
  
  private final static String queryForGetDispositif = dispositifSelectQuery + 
  "WHERE   id_dispositif=?\n" +
  "AND     id_regulation=?\n";
  

  public Dispositif getDispositif(int idRegulation, int disposifitId) throws Exception
  {
    return this.getDispositif(idRegulation, disposifitId, true);
  }
  
  @SuppressWarnings("unchecked")
  public Dispositif getDispositif(int idRegulation, int disposifitId, boolean withEquipierList) throws Exception
  {
    Dispositif dispositif = (Dispositif)this.jdbcTemplate.queryForObject(queryForGetDispositif, 
                                                    new Object[]{disposifitId , idRegulation},
                                                    new int   []{Types.INTEGER, Types.INTEGER},
                                                    new DispositifRowMapper());
    
    if(dispositif.getEquipierCi().getIdEquipier() != 0)
      dispositif.setEquipierCi(this.equipierService.getEquipier(dispositif.getEquipierCi().getIdEquipier()));
    
    if(dispositif.getCurrentIntervention().getIdIntervention() != 0)
      dispositif.setCurrentIntervention(interventionService.getInterventionTicket(dispositif.getCurrentIntervention().getIdIntervention()));

    if(withEquipierList)
      dispositif.setEquipierList(this.equipierService.getEquipiersForDispositif(idRegulation, disposifitId));
    
    return dispositif;
  }

  
  
  private final static String dispositifTicketSelectQuery = 
    "SELECT  `id_dispositif`, `id_type_dispositif`, `indicatif_vehicule`       , `id_etat_dispositif`, `creation_terminee`,\n" +
    "        `DH_debut`     , `DH_fin`            , `id_delegation_responsable`, `autre_delegation`  , `display_state`     \n" +
    "FROM    dispositif\n";  
  
  private final static String queryForGetDispositifTicketWithStatus = dispositifTicketSelectQuery + 
  "WHERE    id_regulation     = ? \n" +
  "AND      creation_terminee = ? \n" +
  "ORDER BY indicatif_vehicule ASC\n";
  
  
  private final static String queryForGetDispositifTicketWithStatusCount =
    "SELECT   count(1)             \n" +
    "FROM     dispositif           \n"+
    "WHERE    id_regulation     = ?\n"+
    "AND      creation_terminee = ?\n";
  
  @SuppressWarnings("unchecked")
  public ListRange getDispositifTicketWithStatus(int idRegulation, boolean creationTerminee, int index, int limit) throws Exception
  {
    if(logger.isDebugEnabled())
      logger.debug("getting dispositif ticket for regulation id='"+idRegulation+"' with status creationTerminee='"+creationTerminee+"' from index='"+index+"' with limit='"+limit+"'");
    
    int totalCount = this.jdbcTemplate.queryForInt(queryForGetDispositifTicketWithStatusCount,
        new Object[]{idRegulation , creationTerminee?1:0  },
        new int   []{Types.INTEGER, Types.INTEGER});
    
    List<DispositifTicket> list = this.jdbcTemplate.query( queryForGetDispositifTicketWithStatus + "LIMIT    ?,?              \n", 
        new Object[]{idRegulation , creationTerminee?1:0       , index        , limit        },
        new int   []{Types.INTEGER, Types.INTEGER, Types.INTEGER, Types.INTEGER},
        new DispositifTicketRowMapper      ()); 
    
    return new ListRange(totalCount, list); 
  }
  
  public void createDispositif(Dispositif dispositif) throws Exception
  {
    String query =  "INSERT INTO `dispositif`\n"+
                    "  ( `id_dispositif`       , `id_regulation` , `indicatif_vehicule`, `O2_B1_volume`     ,\n"+
                    "    `O2_B1_pression`      , `O2_B2_volume`      , `O2_B2_pression`, `O2_B3_volume`      , `O2_B3_pression`   ,\n"+
                    "    `O2_B4_volume`      , `O2_B4_pression`    , `O2_B5_volume`      , `O2_B5_pression`,\n" +
                    "    `dispositif_comment`, `dispositif_back_3_girl`, `dispositif_not_enough_O2`, `dispositif_set_available_with_warning`,\n" +
                    "    `dsa_type`            , `dsa_complet`       , `observation`   , `DH_debut`          , `DH_fin`           ,\n"+
                    "    `section_responsable` , `contact_radio`     , `contact_tel1`  , `contact_tel2`      , `contact_alphapage`,\n"+
                    "    `identite_medecin`    , `id_etat_dispositif`, `id_current_intervention`, `display_state`\n"+
                    "  )\n"+
                    "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0)\n";
                    
    Object [] objects = new Object[]
                        {
                          dispositif.getIdDispositif      (),
                          dispositif.getIndicatifVehicule (),
                          dispositif.getO2B1Volume        (),
                          dispositif.getO2B1Pression      (),
                          dispositif.getO2B2Volume        (),
                          dispositif.getO2B2Pression      (),
                          dispositif.getO2B3Volume        (),
                          dispositif.getO2B3Pression      (),
                          dispositif.getO2B4Volume        (),
                          dispositif.getO2B4Pression      (),
                          dispositif.getO2B5Volume        (),
                          dispositif.getO2B5Pression      (),
                          dispositif.getDispositifComment (),
                          dispositif.isDispositifBackWith3Girls         (),
                          dispositif.isDispositifNotEnoughO2            (),
                          dispositif.isDispositifSetAvailableWithWarning(),
                          dispositif.getDsaType           (),
                          dispositif.isDsaComplet         (),
                          dispositif.getObservation       (),
                          dispositif.getDhDebut           (),
                          dispositif.getDhFin             (),
                          dispositif.getIdDelegation      (),
                          dispositif.getContactRadio      (),
                          dispositif.getContactTel1       (),
                          dispositif.getContactTel2       (),
                          dispositif.getContactAlphapage  (),
                          dispositif.getIdentiteMedecin   (),
                          dispositif.getIdEtatDispositif  ()
                        };
    int []types = new int[]
                          {
                            Types.INTEGER,
                            Types.VARCHAR,
                            Types.DECIMAL,
                            Types.DECIMAL,
                            Types.DECIMAL,
                            Types.DECIMAL,
                            Types.DECIMAL,
                            Types.DECIMAL,
                            Types.DECIMAL,
                            Types.DECIMAL,
                            Types.DECIMAL,
                            Types.DECIMAL,
                            Types.VARCHAR,
                            Types.BIT,
                            Types.BIT,
                            Types.BIT,
                            Types.VARCHAR,
                            Types.BIT,
                            Types.VARCHAR,
                            Types.TIMESTAMP,
                            Types.TIMESTAMP,
                            Types.INTEGER,
                            Types.VARCHAR,
                            Types.VARCHAR,
                            Types.VARCHAR,
                            Types.VARCHAR,
                            Types.VARCHAR,
                            Types.INTEGER
                          };
    
    jdbcTemplate.update( query, objects, types);
    int idDispositif = getLastInsertedId();
    
    if(logger.isDebugEnabled())
      logger.debug("Dispositif inserted with id="+idDispositif);
    
    dispositif.setIdDispositif(idDispositif);
    dispositif.setIdTypeDispositif(0);
  }
  
  
  public Dispositif createEmptyDispositif(Regulation regulation) throws Exception
  {
    if(logger.isDebugEnabled())
      logger.debug("Creating new empty dispositif for regulation id='"+regulation.getRegulationId()+"'");
    
    Dispositif dispositif  = new Dispositif();
    
    String query =  "INSERT INTO `dispositif`\n"+
    "  ( `id_type_dispositif`         , `id_regulation`         , `indicatif_vehicule`, `O2_B1_volume`            ,\n"                     +
    "    `O2_B1_pression`             , `O2_B2_volume`          , `O2_B2_pression`    , `O2_B3_volume`            , `O2_B3_pression`   ,\n"+
    "    `O2_B4_volume`               , `O2_B4_pression`        , `O2_B5_volume`      , `O2_B5_pression`          ,\n"                     +
    "    `dispositif_comment`         , `dispositif_back_3_girl`, `dispositif_not_enough_O2`, `dispositif_set_available_with_warning`  ,\n"+    
    "    `dsa_type`                   , `dsa_complet`           , `observation`       , `DH_debut`                , `DH_fin`           ,\n"+
    "    `id_delegation_responsable`  , `autre_delegation`      , `contact_radio`     , `contact_tel1`            , `contact_tel2`     ,\n"+
    "    `contact_alphapage`          , `identite_medecin`      , `id_etat_dispositif`, `id_current_intervention` , `display_state`    ,\n"+
    "    `creation_terminee`\n"+
    "  )\n"+
    "VALUES (0, ?, '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,'', false, false, false, 'N/A', 0, '', ?, ?, 0, 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 0, 0, 0, false)\n";
  
    this.jdbcTemplate.update(query, new Object[]{regulation.getRegulationId(), regulation.getStartDate(), regulation.getExpectedEndDate()}, new int[]{Types.INTEGER, Types.TIMESTAMP, Types.TIMESTAMP});
    
    int idDispositif = this.getLastInsertedId();
    
    if(logger.isDebugEnabled())
      logger.debug("new empty dispositif created with id='"+idDispositif+"'for regulation id='"+regulation.getRegulationId()+"'");

    dispositif.setIdDispositif(idDispositif                   );
    dispositif.setDhDebut     (regulation.getStartDate      ());
    dispositif.setDhFin       (regulation.getExpectedEndDate());
    
    dispositif.setDhDebutStr  (dateFormat.format(regulation.getStartDate      ()));
    dispositif.setDhFinStr    (dateFormat.format(regulation.getExpectedEndDate()));

    return dispositif;
  }

  
  private final static String queryForUpdateGoogleCoordinates = 
    "UPDATE dispositif             \n"+
    "SET    google_coords_lat  = ?,\n"+
    "       google_coords_long = ? \n"+
    "WHERE  id_dispositif      = ? \n";
  public void updateGoogleCoordinates(float latitude, float longitude, int idDispositif) throws Exception
  {
    int nbLineUpdated = this.jdbcTemplate.update( queryForUpdateGoogleCoordinates, 
        new Object[]{latitude   , longitude  , idDispositif}, 
        new int   []{Types.FLOAT, Types.FLOAT, Types.INTEGER }
      );
    
    if(logger.isDebugEnabled())
      logger.debug("Dispositif with id='"+idDispositif+"' has its coordinates (lat,long) udpdated with values ('"+latitude+"','"+longitude+"') (line updated = '"+nbLineUpdated+"')");
  }
  
  private final static String queryForUpdateDispositifSetIntervention = 
    "UPDATE dispositif                  \n" +
    "SET    id_current_intervention = ? \n" +
    "WHERE  id_dispositif           = ? \n";
  
  public void updateDispositifSetIntervention(int idDispositif, int idIntervention) throws Exception
  {
    
    Object [] os     = new Object[]{idIntervention  , idDispositif };
    int    [] types  = new int   []{Types.INTEGER , Types.INTEGER};
    
    int nbLineUpdated = jdbcTemplate.update(queryForUpdateDispositifSetIntervention, os, types);
    
    if(logger.isDebugEnabled())
      logger.debug("updateDispositifDisplayState (line updated = "+nbLineUpdated+")");
  }
  
  
  private final static String queryForUpdateEtatDispositif = 
    "UPDATE dispositif            \n" +
    "SET    id_etat_dispositif = ?\n" +
    "WHERE  id_dispositif      = ?\n";
  
  public void updateEtatDispositif(int idDispositif, int idEtatDispositif) throws Exception
  {
	  Object [] os     = new Object[]{idEtatDispositif, idDispositif };
	  int    [] types  = new int   []{Types.INTEGER   , Types.INTEGER};
	  
    int nbLineUpdated = jdbcTemplate.update(queryForUpdateEtatDispositif, os, types);
	  
    if(logger.isDebugEnabled())
      logger.debug("updateEtatDispositif (line updated = "+nbLineUpdated+")");
  }


  
  public static String[]booleanField = {
    "dsa_complet"                           , 
    "dispositif_back_3_girl"                , 
    "dispositif_not_enough_O2"              , 
    "dispositif_set_available_with_warning" , 
    "creation_terminee"
    };
  private static Hashtable<String, String> booleanFieldMatching = new Hashtable<String, String>(booleanField.length);
  {
    booleanFieldMatching.put("dsa_complet"                          , "dsa_complet"                           );
    booleanFieldMatching.put("dispositif_back_3_girl"               , "dispositif_back_3_girl"                ); 
    booleanFieldMatching.put("dispositif_not_enough_O2"             , "dispositif_not_enough_O2"              );
    booleanFieldMatching.put("dispositif_set_available_with_warning", "dispositif_set_available_with_warning" );
    booleanFieldMatching.put("creation_terminee"                    , "creation_terminee"                     );
  }
  public void updateDispositifBooleanField(int idDispositif, String fieldName, boolean fieldValue) throws Exception
  {
    String realFieldName = booleanFieldMatching.get(fieldName);
    
    if(realFieldName == null)
      throw new Exception("Unknown boolean field '"+fieldName+"' for dispositif update");

    String query = 
      "UPDATE dispositif           \n"+
      "SET    "+realFieldName+" = ?\n"+
      "WHERE  id_dispositif     = ?\n";
    
    int nbLineUpdated = this.jdbcTemplate.update( query, 
                                                  new Object[]{fieldValue   , idDispositif}, 
                                                  new int   []{Types.BOOLEAN, Types.INTEGER}
                                                );
    
    if(logger.isDebugEnabled())
      logger.debug("Dispositif with id='"+idDispositif+"' has its field '"+realFieldName+"' updated with value '"+fieldValue+"' (line updated = '"+nbLineUpdated+"')");
  }

  public static String[]dateField = {
    "DH_debut"                   , 
    "DH_fin"                     ,
    "DH_depart"                  ,
    "DH_sur_place"               ,
    "DH_bilan_primaire"          ,
    "DH_bilan_secondaire"        ,
    "DH_quitte_les_lieux"        ,
    "DH_arrivee_hopital"         ,
    "DH_dispo"                   ,
    "DH_a_sa_base"               ,
    "DH_appel_renfort_medical"   ,
    "DH_arrivee_renfort_medical"
};
  private static Hashtable<String, String> dateFieldMatching = new Hashtable<String, String>(dateField.length);
  {
    dateFieldMatching.put("DH_debut"                   , "DH_debut"                   );
    dateFieldMatching.put("DH_fin"                     , "DH_fin"                     );
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
  public void updateDispositifDateField   (int idDispositif, String fieldName, Date fieldValue) throws Exception
  {
    String realFieldName = dateFieldMatching.get(fieldName);
    
    if(realFieldName == null)
      throw new Exception("Unknown date field '"+fieldName+"' for dispositif update");

    String query = 
      "UPDATE dispositif           \n"+
      "SET    "+realFieldName+" = ?\n"+
      "WHERE  id_dispositif     = ?\n";
    
    int nbLineUpdated = this.jdbcTemplate.update( query, 
                                                  new Object[]{fieldValue, idDispositif}, 
                                                  new int   []{Types.TIMESTAMP, Types.INTEGER}
                                                );
    
    if(logger.isDebugEnabled())
      logger.debug("Dispositif with id='"+idDispositif+"' has its field '"+realFieldName+"' updated with value '"+fieldValue+"' (line updated = '"+nbLineUpdated+"')");  
  }

  public static String[]floatField = {
    "O2_B1_pression", 
    "O2_B2_pression", 
    "O2_B3_pression", 
    "O2_B4_pression", 
    "O2_B5_pression", 
    "google_coords_lat", 
    "google_coords_long"};
  private static Hashtable<String, String> floatFieldMatching = new Hashtable<String, String>(floatField.length);
  {
    floatFieldMatching.put("O2_B1_pression"     , "O2_B1_pression"     );
    floatFieldMatching.put("O2_B2_pression"     , "O2_B2_pression"     );
    floatFieldMatching.put("O2_B3_pression"     , "O2_B3_pression"     );
    floatFieldMatching.put("O2_B4_pression"     , "O2_B4_pression"     );
    floatFieldMatching.put("O2_B5_pression"     , "O2_B5_pression"     );
    floatFieldMatching.put("google_coords_lat"  , "google_coords_lat"  );
    floatFieldMatching.put("google_coords_long" , "google_coords_long" );
  }
  public void updateDispositifFloatField  (int idDispositif, String fieldName, float fieldValue) throws Exception
  {
    String realFieldName = floatFieldMatching.get(fieldName);
    
    if(realFieldName == null)
      throw new Exception("Unknown float field '"+fieldName+"' for dispositif update");

    String query = 
      "UPDATE dispositif           \n"+
      "SET    "+realFieldName+" = ?\n"+
      "WHERE  id_dispositif     = ?\n";
    
    int nbLineUpdated = this.jdbcTemplate.update( query, 
                                                  new Object[]{fieldValue   , idDispositif}, 
                                                  new int   []{Types.DECIMAL, Types.INTEGER}
                                                );
    
    if(logger.isDebugEnabled())
      logger.debug("Dispositif with id='"+idDispositif+"' has its field '"+realFieldName+"' updated with value '"+fieldValue+"' (line updated = '"+nbLineUpdated+"')");

  }

  public static String[]intField = {"id_dispositif"            , 
                                    "id_type_dispositif"       , 
                                    "id_regulation"            , 
                                    "O2_B1_volume"             , 
                                    "O2_B2_volume"             , 
                                    "O2_B3_volume"             , 
                                    "O2_B4_volume"             , 
                                    "O2_B5_volume"             , 
                                    "id_delegation_responsable", 
                                    "id_etat_dispositif"       , 
                                    "equipier_1_id"            , 
                                    "equipier_1_role"          , 
                                    "equipier_2_id"            , 
                                    "equipier_2_role"          , 
                                    "equipier_3_id"            , 
                                    "equipier_3_role"          , 
                                    "equipier_4_id"            , 
                                    "equipier_4_role"          , 
                                    "equipier_5_id"            , 
                                    "equipier_5_role"           
                                };
  private static Hashtable<String, String> intFieldMatching = new Hashtable<String, String>(intField.length);
  {
    intFieldMatching.put("id_dispositif"            , "id_dispositif"             );
    intFieldMatching.put("id_type_dispositif"       , "id_type_dispositif"        );
    intFieldMatching.put("id_regulation"            , "id_regulation"             );
    intFieldMatching.put("O2_B1_volume"             , "O2_B1_volume"              );
    intFieldMatching.put("O2_B2_volume"             , "O2_B2_volume"              );
    intFieldMatching.put("O2_B3_volume"             , "O2_B3_volume"              );
    intFieldMatching.put("O2_B4_volume"             , "O2_B4_volume"              );
    intFieldMatching.put("O2_B5_volume"             , "O2_B5_volume"              );
    intFieldMatching.put("id_delegation_responsable", "id_delegation_responsable" );
    intFieldMatching.put("id_etat_dispositif"       , "id_etat_dispositif"        );
    intFieldMatching.put("equipier_1_id"            , "equipier_1_id"             );
    intFieldMatching.put("equipier_1_role"          , "equipier_1_role"           );
    intFieldMatching.put("equipier_2_id"            , "equipier_2_id"             );
    intFieldMatching.put("equipier_2_role"          , "equipier_2_role"           );
    intFieldMatching.put("equipier_3_id"            , "equipier_3_id"             );
    intFieldMatching.put("equipier_3_role"          , "equipier_3_role"           );
    intFieldMatching.put("equipier_4_id"            , "equipier_4_id"             );
    intFieldMatching.put("equipier_4_role"          , "equipier_4_role"           );
    intFieldMatching.put("equipier_5_id"            , "equipier_5_id"             );
    intFieldMatching.put("equipier_5_role"          , "equipier_5_role"           );
  }
  public void updateDispositifIntegerField(int idDispositif, String fieldName, int fieldValue) throws Exception
  {
    String realFieldName = intFieldMatching.get(fieldName);
    
    if(realFieldName == null)
      throw new Exception("Unknown int field '"+fieldName+"' for dispositif update");

    String query = 
      "UPDATE dispositif           \n"+
      "SET    "+realFieldName+" = ?\n"+
      "WHERE  id_dispositif     = ?\n";
    
    int nbLineUpdated = this.jdbcTemplate.update( query, 
                                                  new Object[]{fieldValue   , idDispositif}, 
                                                  new int   []{Types.INTEGER,Types.INTEGER}
                                                );
    
    if(logger.isDebugEnabled())
      logger.debug("Dispositif with id='"+idDispositif+"' has its field '"+realFieldName+"' updated with value '"+fieldValue+"' (line updated = '"+nbLineUpdated+"')");

  }

  public static String[]stringField = { "indicatif_vehicule"          ,
                                        "dispositif_comment"          ,
                                        "dsa_type"                    ,
                                        "autre_delegation"            ,
                                        "contact_radio"               ,
                                        "contact_tel1"                ,
                                        "contact_tel2"                ,
                                        "contact_alphapage"           ,
                                        "identite_medecin"            ,
                                        "current_addresse_rue"        ,
                                        "current_addresse_code_postal",
                                        "current_addresse_ville"      
                                      };
  private static Hashtable<String, String> stringFieldMatching = new Hashtable<String, String>(stringField.length);
  {
    stringFieldMatching.put("indicatif_vehicule"          , "indicatif_vehicule"          );
    stringFieldMatching.put("dispositif_comment"          , "dispositif_comment"          );
    stringFieldMatching.put("dsa_type"                    , "dsa_type"                    );
    stringFieldMatching.put("autre_delegation"            , "autre_delegation"            );
    stringFieldMatching.put("contact_radio"               , "contact_radio"               );
    stringFieldMatching.put("contact_tel1"                , "contact_tel1"                );
    stringFieldMatching.put("contact_tel2"                , "contact_tel2"                );
    stringFieldMatching.put("contact_alphapage"           , "contact_alphapage"           );
    stringFieldMatching.put("identite_medecin"            , "identite_medecin"            );
    stringFieldMatching.put("current_addresse_rue"        , "current_addresse_rue"        );
    stringFieldMatching.put("current_addresse_code_postal", "current_addresse_code_postal");
    stringFieldMatching.put("current_addresse_ville"      , "current_addresse_ville"      );
  }
  public void updateDispositifStringField (int idDispositif, String fieldName, String fieldValue) throws Exception
  {
    String realFieldName = stringFieldMatching.get(fieldName);
    
    if(realFieldName == null)
      throw new Exception("Unknown string field '"+fieldName+"' for dispositif update");

    String query = 
      "UPDATE dispositif           \n"+
      "SET    "+realFieldName+" = ?\n"+
      "WHERE  id_dispositif     = ?\n";
    
    int nbLineUpdated = this.jdbcTemplate.update( query, 
                                                  new Object[]{fieldValue   , idDispositif}, 
                                                  new int   []{Types.VARCHAR, Types.INTEGER}
                                                );
    
    if(logger.isDebugEnabled())
      logger.debug("Dispositif with id='"+idDispositif+"' has its field '"+realFieldName+"' updated with value '"+fieldValue+"' (line updated = '"+nbLineUpdated+"')");
  }
  

}