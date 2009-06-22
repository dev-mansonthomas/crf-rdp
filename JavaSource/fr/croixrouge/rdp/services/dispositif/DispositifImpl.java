package fr.croixrouge.rdp.services.dispositif;

import java.sql.Types;
import java.util.Date;
import java.util.Hashtable;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import fr.croixrouge.rdp.model.monitor.Dispositif;
import fr.croixrouge.rdp.model.monitor.DispositifTicket;
import fr.croixrouge.rdp.model.monitor.Equipier;
import fr.croixrouge.rdp.model.monitor.Position;
import fr.croixrouge.rdp.model.monitor.Regulation;
import fr.croixrouge.rdp.model.monitor.dwr.ListRange;
import fr.croixrouge.rdp.model.monitor.rowMapper.DispositifEquipierIdAndRoleRowMapper;
import fr.croixrouge.rdp.model.monitor.rowMapper.DispositifRowMapper;
import fr.croixrouge.rdp.model.monitor.rowMapper.DispositifTicketRowMapper;
import fr.croixrouge.rdp.services.JDBCHelper;
import fr.croixrouge.rdp.services.equipier.EquipierService;
import fr.croixrouge.rdp.services.intervention.InterventionService;

public class DispositifImpl extends JDBCHelper implements DispositifService
{
  public final static int STATUS_INDISPO_EQUIPAGE_INCOMPLET = -3; //indispo equipage incomplet
  public final static int STATUS_INDISPO_MATERIEL_INCOMPLET = -2; //indispo materiel incomplet
  public final static int STATUS_INDISPO                    = -1; //indispo
  public final static int STATUS_NA                         = 0 ; //N/A
  public final static int STATUS_DISPO                      = 1 ; //dispo
  public final static int STATUS_INTERVENTION_AFFECTEE      = 2 ; //intervention affecté
  public final static int STATUS_PARTI                      = 3 ; //Parti
  public final static int STATUS_SUR_PLACE                  = 4 ; //Sur place
  public final static int STATUS_PRIMAIRE                   = 5 ; //Primaire
  public final static int STATUS_SECONDAIRE                 = 6 ; //Secondaire
  public final static int STATUS_TRANSPORT                  = 7 ; //transport
  public final static int STATUS_ARRIVE_HOSPITAL            = 8 ; //Arrivé hopital
  
  
  
  
  private static Log          logger              = LogFactory.getLog(DispositifImpl.class);
  private JdbcTemplate        jdbcTemplate        = null;
  private EquipierService     equipierService     = null;
  private InterventionService interventionService = null;
  
  public DispositifImpl(JdbcTemplate  jdbcTemplate)
  {
    this.jdbcTemplate        = jdbcTemplate       ;

    if(logger.isDebugEnabled())
      logger.debug("constructor called");
  }
  /*Injection faite par setter pour résoudre une dépendence cyclique entre les services equipier et dispositif*/
  public void setEquipierService(EquipierService equipierService)
  {
    this.equipierService = equipierService;
  }
  /*Injection faite par setter pour résoudre une dépendence cyclique entre les services equipier et intervention*/
  public void setInterventionService(InterventionService interventionService)
  {
    this.interventionService = interventionService;
  }
  private int getLastInsertedId()
  {
    return this.getLastInsertedId(jdbcTemplate, "dispositif");
  }
  

  private final static String queryForAffectEquipierToDispositif = 
    "INSERT INTO `dispositif_equipiers` (  \n"+  
    "  `id_dispositif`    ,                \n"+  
    "  `id_equipier`      ,                \n"+  
    "  `id_role_equipier` ,                \n"+  
    "  `en_evaluation`                     \n"+  
    ")                                     \n"+  
    "VALUES                                \n"+  
    "(?, ?, ?, false)                      \n";  


  private final static String queryForAffectEquipierToDispositif2 = 
    "INSERT INTO `dispositif_equipiers_log` (  \n"+  
    "  `id_dispositif`    ,                \n"+  
    "  `id_equipier`      ,                \n"+  
    "  `id_role_equipier` ,                \n"+    
    "  `DH_debut`         ,                \n"+
    "  `DH_fin`                            \n"+
    ")                                     \n"+  
    "VALUES                                \n"+  
    "(?, ?, ?, NOW(), NULL)                \n";  
  
  public void affectEquipierToDispositif(int idDispositif, int idEquipier, int idRoleEquipier) throws Exception
  {
    if(logger.isDebugEnabled())
      logger.debug("Dispositif with id='"+idDispositif+"' has been assigned a new equipier id='"+idEquipier+"' with role ='"+idRoleEquipier+"'");

    int nbLineUpdated = this.jdbcTemplate.update( queryForAffectEquipierToDispositif, 
        new Object[]{idDispositif , idEquipier   , idRoleEquipier }, 
        new int   []{Types.INTEGER, Types.INTEGER, Types.INTEGER  }
      );
    
    if(logger.isDebugEnabled())
      logger.debug("Dispositif with id='"+idDispositif+"' has been assigned a new equipier id='"+idEquipier+"' with role ='"+idRoleEquipier+"'(line inserted = '"+nbLineUpdated+"')");
    
    if(logger.isDebugEnabled())
      logger.debug("Inserting in logging table for : Dispositif with id='"+idDispositif+"' has been assigned a new equipier id='"+idEquipier+"' with role ='"+idRoleEquipier+"'");

    
    nbLineUpdated = this.jdbcTemplate.update( queryForAffectEquipierToDispositif2, 
        new Object[]{idDispositif , idEquipier   , idRoleEquipier }, 
        new int   []{Types.INTEGER, Types.INTEGER, Types.INTEGER  }
      );
    
    if(logger.isDebugEnabled())
      logger.debug("Inserting in logging table for : Dispositif with id='"+idDispositif+"' has been assigned a new equipier id='"+idEquipier+"' with role ='"+idRoleEquipier+"'(line inserted = '"+nbLineUpdated+"')");
    
  }
  
  
  private final static String queryForUnAffectEquipierToDispositif = 
    "DELETE `dispositif_equipiers` \n"+  
    "WHERE  `id_dispositif` = ?    \n"+  
    "AND    `id_equipier`   = ?    \n";  


  private final static String queryForUnAffectEquipierToDispositif2 = 
    "UPDATE `dispositif_equipiers_log` \n"+  
    "SET    `DH_fin`        = NOW()    \n"+
    "WHERE  `id_dispositif` = ?   ,    \n"+  
    "AND    `id_equipier`   = ?   ,    \n"+  
    "AND    `DH_fin`        IS NULL    \n";    
  
  public void unaffectEquipierToDispositif(int idDispositif, int idEquipier) throws Exception
  {
    if(logger.isDebugEnabled())
      logger.debug("Dispositif with id='"+idDispositif+"' has been unassigned an equipier id='"+idEquipier+"'");

    int nbLineUpdated = this.jdbcTemplate.update( queryForUnAffectEquipierToDispositif, 
        new Object[]{idDispositif , idEquipier   }, 
        new int   []{Types.INTEGER, Types.INTEGER}
      );
    
    if(logger.isDebugEnabled())
      logger.debug("Dispositif with id='"+idDispositif+"' has been unassigned an equipier id='"+idEquipier+"' (line deleted = '"+nbLineUpdated+"')");
    
    if(logger.isDebugEnabled())
      logger.debug("updating in logging table for : Dispositif with id='"+idDispositif+"' has been assigned a new equipier id='"+idEquipier+"' ");

    
    nbLineUpdated = this.jdbcTemplate.update( queryForUnAffectEquipierToDispositif2, 
        new Object[]{idDispositif , idEquipier    }, 
        new int   []{Types.INTEGER, Types.INTEGER }
      );
    
    if(logger.isDebugEnabled())
      logger.debug("updating in logging table for : Dispositif with id='"+idDispositif+"' has been assigned a new equipier id='"+idEquipier+"' with (line inserted = '"+nbLineUpdated+"')");
  }
  
  
  private final static String queryForAffectInterventionToDispositif =
    "UPDATE dispositif                    \n" +
    "SET    id_etat_dispositif        = ?,\n" +
    "       DH_reception              = ? \n" +
    "WHERE  id_dispositif             = ? \n";
  
  public void affectInterventionToDispositif  (int idDispositif, int idIntervention, Date dateAffectation) throws Exception
  {
    //attache l'intervention au dispositif
    this.attachInterventionToDispositif(idDispositif, idIntervention);
    
    //met a jour status, date 
    if(logger.isDebugEnabled())
      logger.debug("Dispositif with id='"+idDispositif+"' has its status and DH_RECEPTION updated");

    int nbLineUpdated = this.jdbcTemplate.update( queryForAffectInterventionToDispositif, 
        new Object[]{STATUS_INTERVENTION_AFFECTEE, dateAffectation, idDispositif }, 
        new int   []{Types.INTEGER               , Types.TIMESTAMP, Types.INTEGER}
      );
    
    if(logger.isDebugEnabled())
      logger.debug("Dispositif with id='"+idDispositif+"' has its status and DH_RECEPTION updated (line updated = '"+nbLineUpdated+"')");
  }
  
  private final static String queryForAttachInterventionToDispositif=
    "INSERT INTO dispositif_interventions \n" +
    "(`id_dispositif`,`id_intervention`)  \n" +
    "VALUES                               \n" +
    "( ?, ?)\n" ;
  
  public void attachInterventionToDispositif(int idDispositif, int idIntervention) throws Exception
  {
    if(logger.isDebugEnabled())
      logger.debug("Dispositif with id='"+idDispositif+"' has been assigned the intervention "+idIntervention+"");

    int nbLineUpdated = this.jdbcTemplate.update( queryForAttachInterventionToDispositif, 
        new Object[]{idDispositif , idIntervention}, 
        new int   []{Types.INTEGER, Types.INTEGER }
      );
    
    if(logger.isDebugEnabled())
      logger.debug("Dispositif with id='"+idDispositif+"' has been assigned the intervention "+idIntervention+" (line updated = '"+nbLineUpdated+"')");

  }
  
  private final static String queryForUnAffectInterventionToDispositif =
    "UPDATE dispositif                          \n" + 
    "SET    id_etat_dispositif           = ?,   \n" + 
    "       `DH_reception`               = null,\n" + 
    "       `DH_depart`                  = null,\n" + 
    "       `DH_sur_place`               = null,\n" + 
    "       `DH_bilan_primaire`          = null,\n" + 
    "       `DH_bilan_secondaire`        = null,\n" + 
    "       `DH_quitte_les_lieux`        = null,\n" + 
    "       `DH_arrivee_hopital`         = null,\n" + 
    "       `DH_dispo`                   = null,\n" + 
    "       `DH_a_sa_base`               = null,\n" + 
    "       `DH_appel_renfort_medical`   = null,\n" + 
    "       `DH_arrivee_renfort_medical` = null \n" + 
    "WHERE  id_dispositif                = ?    \n";  
  
  private final static String queryForUnAffectInterventionToDispositif2 =
    "DELETE FROM dispositif_interventions \n" +
    "WHERE id_dispositif   = ?            \n" +
    "AND   id_intervention = ?            \n";
  
  
  public void unAffectInterventionToDispositif(int idDispositif, int idIntervention, Date dateAffectation) throws Exception
  {
    if(logger.isDebugEnabled())
      logger.debug("Dispositif with id='"+idDispositif+"' has its intervention unaffected");

    int nbLineUpdated = this.jdbcTemplate.update( queryForUnAffectInterventionToDispositif2, 
        new Object[]{idDispositif   , idIntervention}, 
        new int   []{Types.INTEGER  , Types.INTEGER }
      );
    
    if(logger.isDebugEnabled())
      logger.debug("Dispositif with id='"+idDispositif+"' has its intervention unaffected (line updated = '"+nbLineUpdated+"')");
    
    if(logger.isDebugEnabled())
      logger.debug("Dispositif with id='"+idDispositif+"' has its intervention unaffected");

    nbLineUpdated = this.jdbcTemplate.update( queryForUnAffectInterventionToDispositif, 
        new Object[]{STATUS_DISPO  , idDispositif }, 
        new int   []{Types.INTEGER , Types.INTEGER}
      );
    
    if(logger.isDebugEnabled())
      logger.debug("Dispositif with id='"+idDispositif+"' has its intervention unaffected (line updated = '"+nbLineUpdated+"')");
  }


  private final static Hashtable <Integer,String> idEtatDateFieldMapping = new Hashtable<Integer,String>();
  {
    /*
  `DH_reception`                 datetime NULL,
  `DH_depart`                    datetime NULL,
  `DH_sur_place`                 datetime NULL,
  `DH_bilan_primaire`            datetime NULL,
  `DH_bilan_secondaire`          datetime NULL,
  `DH_quitte_les_lieux`          datetime NULL,
  `DH_arrivee_hopital`           datetime NULL,
  `DH_dispo`                     datetime NULL,
  `DH_a_sa_base`                 datetime NULL,
  `DH_appel_renfort_medical`     datetime NULL,
  `DH_arrivee_renfort_medical`   datetime NULL, 
     * */
    idEtatDateFieldMapping.put(1, "DH_dispo");
    idEtatDateFieldMapping.put(3, "DH_depart");
    idEtatDateFieldMapping.put(4, "DH_sur_place");
    idEtatDateFieldMapping.put(5, "DH_bilan_primaire");
    idEtatDateFieldMapping.put(6, "DH_bilan_secondaire");
    idEtatDateFieldMapping.put(7, "DH_quitte_les_lieux");
    idEtatDateFieldMapping.put(8, "DH_arrivee_hopital");
    idEtatDateFieldMapping.put(9, "DH_fin_intervention");
  }
  private final static String queryForActionOnDispositif = 
    "UPDATE dispositif                    \n" +
    "SET    id_etat_dispositif        = ?,\n" +
    "       <<DateField>>             = ? \n" +
    "WHERE  id_dispositif             = ? \n";
   
  public void actionOnDispositif(int idDispositif, int newIdEtat, Date actionDate) throws Exception
  {
    if((newIdEtat<3  || newIdEtat>9) && newIdEtat != 1)
      throw new Exception("Cette action n'est pas gérée par la méthode DispositifImpl.actionOnDispositif. idDispositif="+idDispositif+", newIdEtat="+newIdEtat+", actionDate="+actionDate);
   
    String etatDateField = idEtatDateFieldMapping.get(newIdEtat);
    String query         = queryForActionOnDispositif.replaceAll("<<DateField>>", etatDateField);
    
    if(logger.isDebugEnabled())
      logger.debug("Dispositif with id='"+idDispositif+"' has been updated with new idEtat="+newIdEtat+",  "+etatDateField+"="+actionDate);

    int nbLineUpdated = this.jdbcTemplate.update( query, 
        new Object[]{newIdEtat      , actionDate     , idDispositif }, 
        new int   []{Types.INTEGER  , Types.TIMESTAMP, Types.INTEGER}
      );
    
    if(logger.isDebugEnabled())
      logger.debug("Dispositif with id='"+idDispositif+"' has been updated with new idEtat="+newIdEtat+",  "+etatDateField+"="+actionDate+" (line updated = '"+nbLineUpdated+"')");
  }
  
  private final static String queryForActionEndOfIntervention = 
    "UPDATE dispositif                            \n" +
    "SET    id_etat_dispositif             = -1,  \n" +
    "       `DH_reception`                 = NULL,\n" +
    "       `DH_depart`                    = NULL,\n" +
    "       `DH_sur_place`                 = NULL,\n" +
    "       `DH_bilan_primaire`            = NULL,\n" +
    "       `DH_bilan_secondaire`          = NULL,\n" +
    "       `DH_quitte_les_lieux`          = NULL,\n" +
    "       `DH_arrivee_hopital`           = NULL,\n" +
    "       `DH_dispo`                     = NULL,\n" +
    "       `DH_a_sa_base`                 = NULL,\n" +
    "       `DH_appel_renfort_medical`     = NULL,\n" +
    "       `DH_arrivee_renfort_medical`   = NULL \n" +
    "WHERE  id_dispositif                  = ? \n";
  
  private final static String queryForActionEndOfIntervention2 = 
    "DELETE FROM dispositif_interventions  \n" +
    "WHERE       id_dispositif = ?";
  
  public void actionEndOfIntervention(int idDispositif) throws Exception
  {
    if(logger.isDebugEnabled())
      logger.debug("Dispositif with id='"+idDispositif+"' has ended its intervention. Etat and dates are beeing reseted");

    int nbLineUpdated = this.jdbcTemplate.update( queryForActionEndOfIntervention, 
        new Object[]{idDispositif  }, 
        new int   []{Types.INTEGER }
      );
    
    if(logger.isDebugEnabled())
      logger.debug("Dispositif with id='"+idDispositif+"' has ended its intervention. Etat, and dates has been reseted (line updated = '"+nbLineUpdated+"')");
    
    if(logger.isDebugEnabled())
      logger.debug("Dispositif with id='"+idDispositif+"' has ended its intervention. Affected intervetion are beeing detached");

    nbLineUpdated = this.jdbcTemplate.update( queryForActionEndOfIntervention2, 
        new Object[]{idDispositif  }, 
        new int   []{Types.INTEGER }
      );
    
    if(logger.isDebugEnabled())
      logger.debug("Dispositif with id='"+idDispositif+"' has ended its intervention. Affected intervetion has been detached (line updated = '"+nbLineUpdated+"')");
    
  
  }
  
  private final static String queryForUpdateDispositifCurrentPosition=
    "UPDATE dispositif                        \n" +
    "SET    current_addresse_rue          = ?,\n" +
    "       current_addresse_code_postal  = ?,\n" +
    "       current_addresse_ville        = ?,\n" +
    "       current_google_coords_lat     = ?,\n" +
    "       current_google_coords_long    = ? \n" +
    "WHERE  id_dispositif                 = ? \n";

  private final static String queryForUpdateDispositifPreviousPosition=
    "UPDATE dispositif                         \n" +
    "SET    previous_addresse_rue          = ?,\n" +
    "       previous_addresse_code_postal  = ?,\n" +
    "       previous_addresse_ville        = ?,\n" +
    "       previous_google_coords_lat     = ?,\n" +
    "       previous_google_coords_long    = ? \n" +
    "WHERE  id_dispositif                  = ? \n";
  
  public void updateDispositifPosition(int idDispositif, Position currentPosition, Position previousPosition) throws Exception
  {
    if(currentPosition == null && previousPosition == null)
      throw new Exception("currentPosition and previousPosition are null for dispositif id="+idDispositif);
    
    int nbLineUpdated = 0;
    if(currentPosition != null)
    {
      if(logger.isDebugEnabled())
        logger.debug("updateDispositifPosition, dispositif with id="+idDispositif+" current position is beeing updated with position : "+currentPosition.toString());

      nbLineUpdated = this.jdbcTemplate.update( queryForUpdateDispositifCurrentPosition, 
          new Object[]{currentPosition.getRue(), currentPosition.getCodePostal(), currentPosition.getVille(), currentPosition.getGoogleCoordsLat(), currentPosition.getGoogleCoordsLong(), idDispositif }, 
          new int   []{Types.VARCHAR           , Types.VARCHAR                  , Types.VARCHAR             , Types.FLOAT                          , Types.FLOAT                          , Types.INTEGER}
        );
      
      if(logger.isDebugEnabled())
        logger.debug("updateDispositifPosition, dispositif with id="+idDispositif+" current position has been updated with position : "+currentPosition.toString()+" (nbLineUpdated="+nbLineUpdated+")");
    }
    else if(logger.isDebugEnabled())
      logger.debug("updateDispositifPosition, skipping current Position Update");
    
    
    if(previousPosition != null)
    {
      if(logger.isDebugEnabled())
        logger.debug("updateDispositifPosition, dispositif with id="+idDispositif+" previous position is beeing updated with position : "+previousPosition.toString());

      nbLineUpdated = this.jdbcTemplate.update( queryForUpdateDispositifPreviousPosition, 
          new Object[]{previousPosition.getRue(), previousPosition.getCodePostal(), previousPosition.getVille(), previousPosition.getGoogleCoordsLat(), previousPosition.getGoogleCoordsLong(), idDispositif }, 
          new int   []{Types.VARCHAR            , Types.VARCHAR                   , Types.VARCHAR              , Types.FLOAT                           , Types.FLOAT                           , Types.INTEGER}
        );
      
      if(logger.isDebugEnabled())
        logger.debug("updateDispositifPosition, dispositif with id="+idDispositif+" previous position has been updated with position : "+previousPosition.toString()+" (nbLineUpdated="+nbLineUpdated+")");
    }
    else if(logger.isDebugEnabled())
      logger.debug("updateDispositifPosition, skipping previous Position Update");
    
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
    "SELECT  `id_dispositif`     , `id_type_dispositif`, `indicatif_vehicule`, 0 as 'id_equipier_responsable',                                                  \n" +
    "        `O2_B1_volume`      , `O2_B1_pression`    , `O2_B2_volume`      ,                                                                                 \n" +
    "        `O2_B2_pression`    , `O2_B3_volume`      , `O2_B3_pression`    ,                                                                                 \n" +
    "        `O2_B4_volume`      , `O2_B4_pression`    , `O2_B5_volume`      , `O2_B5_pression`,                                                               \n" +
    "        `dispositif_comment`, `dispositif_back_3_girl`, `dispositif_not_enough_O2`, `dispositif_set_available_with_warning`,                              \n" +
    "        `dsa_type`          , `dsa_complet`       , `observation`       ,                                                                                 \n" +
    "        `DH_debut`          , `DH_fin`            , `id_delegation_responsable`, `autre_delegation`,                                                      \n" +
    "        `contact_radio`     , `contact_tel1`      , `contact_tel2`      ,                                                                                 \n" +
    "        `contact_alphapage` , `identite_medecin`  , `id_etat_dispositif`, `id_current_intervention`, `display_state`,                                     \n" +
    "        `current_addresse_rue` , `current_addresse_code_postal` , `current_addresse_ville` , `current_google_coords_lat` , `current_google_coords_long` , \n" +
    "        `previous_addresse_rue`, `previous_addresse_code_postal`, `previous_addresse_ville`, `previous_google_coords_lat`, `previous_google_coords_long`, \n" +
    "        `DH_reception`      , `DH_depart`, `DH_sur_place`, `DH_bilan_primaire`       , `DH_bilan_secondaire`, `DH_quitte_les_lieux`,                      \n" +
    "        `DH_arrivee_hopital`, `DH_dispo` , `DH_a_sa_base`, `DH_appel_renfort_medical`, `DH_arrivee_renfort_medical`, `creation_terminee`, `actif`         \n" +
    "FROM    dispositif d             \n";  
  
  
  private final static String queryForGetAllDispositif = dispositifSelectQuery + 
  "WHERE   id_regulation=?          \n"+
  "AND     creation_terminee = true \n"+
  "AND     actif             = true \n"+
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
      
      dispositif.setInterventions(interventionService.getInterventionsTicketFromDispositif(dispositif.getIdDispositif()));
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
  

  public Dispositif getDispositif(int idRegulation, int disposifitId, boolean withEquipierList) throws Exception
  {
    Dispositif dispositif = (Dispositif)this.jdbcTemplate.queryForObject(queryForGetDispositif, 
                                                    new Object[]{disposifitId , idRegulation},
                                                    new int   []{Types.INTEGER, Types.INTEGER},
                                                    new DispositifRowMapper());
    
    if(dispositif.getEquipierCi().getIdEquipier() != 0)
      dispositif.setEquipierCi(this.equipierService.getEquipier(dispositif.getEquipierCi().getIdEquipier()));
    
    dispositif.setInterventions(interventionService.getInterventionsTicketFromDispositif(dispositif.getIdDispositif()));
 
    if(withEquipierList)
      dispositif.setEquipierList(this.equipierService.getEquipiersForDispositif(disposifitId));
    
    return dispositif;
  }

  
  
  private final static String dispositifTicketSelectQuery = 
    "SELECT  `id_dispositif`, `id_type_dispositif`, `indicatif_vehicule`       , `id_etat_dispositif`, `creation_terminee`,\n" +
    "        `DH_debut`     , `DH_fin`            , `id_delegation_responsable`, `autre_delegation`  , `display_state`     \n" +
    "FROM    dispositif\n";  
  
  private final static String queryForActiveDispositif = dispositifTicketSelectQuery + 
  "WHERE    id_regulation     = ?    \n" +
  "AND      creation_terminee = true \n" +
  "AND      actif             = true \n" +
  "ORDER BY indicatif_vehicule ASC   \n";
  
  
  private final static String queryForGetActiveDispositifCount =
    "SELECT   count(1)                \n"+
    "FROM     dispositif              \n"+
    "WHERE    id_regulation     = ?   \n"+
    "AND      creation_terminee = true\n"+
    "AND      actif             = true\n";
  
  @SuppressWarnings("unchecked")
  public ListRange getActiveDispositif(int idRegulation, int index, int limit) throws Exception
  {
    if(logger.isDebugEnabled())
      logger.debug("getting dispositif for regulation id='"+idRegulation+"' with creationTerminee='true' and actif='true' from index='"+index+"' with limit='"+limit+"'");
    
    int totalCount = this.jdbcTemplate.queryForInt(queryForGetActiveDispositifCount,
        new Object[]{idRegulation  },
        new int   []{Types.INTEGER });
    
    List<DispositifTicket> list = this.jdbcTemplate.query( queryForActiveDispositif + "LIMIT    ?,?              \n", 
        new Object[]{idRegulation , index        , limit        },
        new int   []{Types.INTEGER, Types.INTEGER, Types.INTEGER},
        new DispositifTicketRowMapper      ()); 

    if(logger.isDebugEnabled())
      logger.debug("Dispositif for regulation id='"+idRegulation+"' with creationTerminee='true' and actif='true' from index='"+index+"' with limit='"+limit+"' (total count = '"+totalCount+"', numberOfResult in List : '"+list.size()+"')");
    
    return new ListRange(totalCount, list); 
  }
  
  
  
  private final static String queryForGetDispositifTicket = dispositifTicketSelectQuery+
  "WHERE id_dispositif = ?\n";
  
  public DispositifTicket getDispositifTicket(int idDispositif) throws Exception
  {
    if(logger.isDebugEnabled())
      logger.debug("getting dispositifTicket for dispositif id='"+idDispositif+"'");

    return (DispositifTicket)this.jdbcTemplate.queryForObject(queryForGetDispositifTicket, 
        new Object[]{idDispositif },
        new int   []{Types.INTEGER},
        new DispositifTicketRowMapper());
  }
  
  
  
  private final static String queryForCreateEmptyDispositif = 
    "INSERT INTO `dispositif`\n"+
    "  ( `id_type_dispositif`         , `id_regulation`         , `indicatif_vehicule`, `O2_B1_volume`            ,\n"                     +
    "    `O2_B1_pression`             , `O2_B2_volume`          , `O2_B2_pression`    , `O2_B3_volume`            , `O2_B3_pression`   ,\n"+
    "    `O2_B4_volume`               , `O2_B4_pression`        , `O2_B5_volume`      , `O2_B5_pression`          ,\n"                     +
    "    `dispositif_comment`         , `dispositif_back_3_girl`, `dispositif_not_enough_O2`, `dispositif_set_available_with_warning`  ,\n"+    
    "    `dsa_type`                   , `dsa_complet`           , `observation`       , `DH_debut`                , `DH_fin`           ,\n"+
    "    `id_delegation_responsable`  , `autre_delegation`      , `contact_radio`     , `contact_tel1`            , `contact_tel2`     ,\n"+
    "    `contact_alphapage`          , `identite_medecin`      , `id_etat_dispositif`, `id_current_intervention` , `display_state`    ,\n"+
    "    `creation_terminee`\n"+
    "  )\n"+
    "VALUES (0, ?, '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,'', false, false, false, 'N/A', 0, '', ?, ?, 0, 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', -1, 0, 0, false)\n";
  
  @Transactional (propagation=Propagation.REQUIRED, rollbackFor=Exception.class)  
  public Dispositif createEmptyDispositif(Regulation regulation) throws Exception
  {
    if(logger.isDebugEnabled())
      logger.debug("Creating new empty dispositif for regulation id='"+regulation.getRegulationId()+"'");
    
    Dispositif dispositif  = new Dispositif();
    
    
    this.jdbcTemplate.update(queryForCreateEmptyDispositif, 
                             new Object[]{regulation.getRegulationId(), regulation.getStartDate(), regulation.getExpectedEndDate()}, 
                             new int[]{Types.INTEGER, Types.TIMESTAMP, Types.TIMESTAMP});
    
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

  private final static String queryForNumberOfIntervention = 
    "SELECT count(1)          \n"+
    "FROM   intervention      \n"+
    "WHERE  id_dispositif = ? ";  
  
  public int numberOfInterventionAffectedToDispositif(int idDispositif) throws Exception
  {
    int numberOfIntervention = this.jdbcTemplate.queryForInt( queryForNumberOfIntervention, 
                                                              new Object[]{idDispositif}, 
                                                              new int[]{Types.INTEGER});
    
    return numberOfIntervention;
  }
  
  private final static String queryGetCurrentInterventionId = 
    "SELECT id_current_intervention   \n"+
    "FROM   dispositif        \n"+
    "WHERE  id_dispositif = ? "; 

  public int getCurrentInterventionId (int idDispositif) throws Exception
  {
    int currentInterventionId = this.jdbcTemplate.queryForInt( queryGetCurrentInterventionId, 
        new Object[]{idDispositif}, 
        new int[]{Types.INTEGER});
    
    return currentInterventionId;
  }
  
  
  private final static String queryDeleteDispositif = 
    "DELETE from dispositif        \n"+
    "WHERE  id_dispositif = ? ";  
  
  
  public void deleteDispositif(int idDispositif) throws Exception
  {
    int nbLineUpdated = this.jdbcTemplate.update( queryDeleteDispositif, 
                                                  new Object[]{idDispositif }, 
                                                  new int   []{Types.INTEGER});
    
    if(logger.isDebugEnabled())
      logger.debug("Dispositif with id='"+idDispositif+"' has been deleted (line deleted = '"+nbLineUpdated+"')");

  }
  
  
  
  private final static String queryUpdateActifValueOfDispositif = 
    "UPDATE dispositif        \n" +
    "SET    actif         = ?\n"+
    "WHERE  id_dispositif = ?\n";  
  
  
  public void updateActifValueOfDispositif(int idDispositif, boolean actif) throws Exception
  {
    int nbLineUpdated = this.jdbcTemplate.update( queryUpdateActifValueOfDispositif, 
                                                  new Object[]{actif        , idDispositif  }, 
                                                  new int   []{Types.BOOLEAN, Types.INTEGER });
    
    if(logger.isDebugEnabled())
      logger.debug("Dispositif with id='"+idDispositif+"' has its actif status udpdated with values ('"+actif+"') (line updated = '"+nbLineUpdated+"')");

  }
  
  
  
  private final static String queryForUpdateGoogleCoordinates_current = 
    "UPDATE dispositif                      \n"+
    "SET    current_google_coords_lat  = ?, \n"+
    "       current_google_coords_long = ?  \n"+
    "WHERE  id_dispositif      = ?          \n";
  
  private final static String queryForUpdateGoogleCoordinates_previous = 
    "UPDATE dispositif                      \n"+
    "SET    previous_google_coords_lat  = ?, \n"+
    "       previous_google_coords_long = ?  \n"+
    "WHERE  id_dispositif      = ?          \n";
  public void updateGoogleCoordinates(float latitude, float longitude, int idDispositif, boolean current) throws Exception
  {
    int nbLineUpdated = this.jdbcTemplate.update( current?queryForUpdateGoogleCoordinates_current:queryForUpdateGoogleCoordinates_previous, 
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
      logger.debug("updateEtatDispositif id='"+idDispositif+"' with idEtat='"+idEtatDispositif+"'(line updated = "+nbLineUpdated+")");
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
    "current_google_coords_lat", 
    "current_google_coords_long", 
    "previous_google_coords_lat", 
    "previous_google_coords_long"};
  private static Hashtable<String, String> floatFieldMatching = new Hashtable<String, String>(floatField.length);
  {
    floatFieldMatching.put("O2_B1_pression"              , "O2_B1_pression"              );
    floatFieldMatching.put("O2_B2_pression"              , "O2_B2_pression"              );
    floatFieldMatching.put("O2_B3_pression"              , "O2_B3_pression"              );
    floatFieldMatching.put("O2_B4_pression"              , "O2_B4_pression"              );
    floatFieldMatching.put("O2_B5_pression"              , "O2_B5_pression"              );
    floatFieldMatching.put("current_google_coords_lat"   , "current_google_coords_lat"   );
    floatFieldMatching.put("current_google_coords_long"  , "current_google_coords_long"  );
    floatFieldMatching.put("previous_google_coords_lat"  , "previous_google_coords_lat"  );
    floatFieldMatching.put("previous_google_coords_long" , "previous_google_coords_long" );
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
                                    "id_delegation_responsable"
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

  public static String[]stringField = { "indicatif_vehicule"           ,
                                        "dispositif_comment"           ,
                                        "dsa_type"                     ,
                                        "autre_delegation"             ,
                                        "contact_radio"                ,
                                        "contact_tel1"                 ,
                                        "contact_tel2"                 ,
                                        "contact_alphapage"            ,
                                        "identite_medecin"             ,
                                        "current_addresse_rue"         ,
                                        "current_addresse_code_postal" ,
                                        "current_addresse_ville"       ,
                                        "previous_addresse_rue"        ,
                                        "previous_addresse_code_postal",
                                        "previous_addresse_ville"      
                                      };
  private static Hashtable<String, String> stringFieldMatching = new Hashtable<String, String>(stringField.length);
  {
    stringFieldMatching.put("indicatif_vehicule"           , "indicatif_vehicule"           );
    stringFieldMatching.put("dispositif_comment"           , "dispositif_comment"           );
    stringFieldMatching.put("dsa_type"                     , "dsa_type"                     );
    stringFieldMatching.put("autre_delegation"             , "autre_delegation"             );
    stringFieldMatching.put("contact_radio"                , "contact_radio"                );
    stringFieldMatching.put("contact_tel1"                 , "contact_tel1"                 );
    stringFieldMatching.put("contact_tel2"                 , "contact_tel2"                 );
    stringFieldMatching.put("contact_alphapage"            , "contact_alphapage"            );
    stringFieldMatching.put("identite_medecin"             , "identite_medecin"             );
    stringFieldMatching.put("current_addresse_rue"         , "current_addresse_rue"         );
    stringFieldMatching.put("current_addresse_code_postal" , "current_addresse_code_postal" );
    stringFieldMatching.put("current_addresse_ville"       , "current_addresse_ville"       );
    stringFieldMatching.put("previous_addresse_rue"        , "previous_addresse_rue"        );
    stringFieldMatching.put("previous_addresse_code_postal", "previous_addresse_code_postal");
    stringFieldMatching.put("previous_addresse_ville"      , "previous_addresse_ville"      );
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