package fr.croixrouge.rdp.services.vehicule;

import java.sql.Types;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import fr.croixrouge.rdp.model.monitor.DispositifSummaryInformation;
import fr.croixrouge.rdp.model.monitor.Vehicule;
import fr.croixrouge.rdp.model.monitor.rowMapper.VehiculeRowMapper;
import fr.croixrouge.rdp.services.JDBCHelper;

public class VehiculeServiceImpl  extends JDBCHelper  implements VehiculeService
{
  
  private static  Log           logger            = LogFactory.getLog(VehiculeServiceImpl.class);
  
  private JdbcTemplate jdbcTemplate;

  public VehiculeServiceImpl(JdbcTemplate jdbcTemplate)
  {
    this.jdbcTemplate = jdbcTemplate;
    
    if(logger.isDebugEnabled())
      logger.debug("constructor called");
  }
  

  private final static String selectForGetVehiculeList = 
      "SELECT     `id_vehicule` , `id_vehicule_type`,  `indicatif`,  `id_delegation`, `id_dispositif`, `last_know_coordinate_lat`,  `last_know_coordinate_long`,\n" +
      "           `mobile_450_id`,  `mobile_150_id`,  `marque`,  `modele`, `immatriculation`,  `carburant`,  `date_mise_en_service` , `date_dernier_controle_tech`,\n" +
      "           `parking_rue`, `parking_code_postal`, `parking_ville`, `parking_coordinate_lat`, `parking_coordinate_long`, `parking_instructions`\n"+
      "FROM       `vehicule`        \n";
  
  /**
   * récupère la liste des véhicules d'un type particulier
   * Si vehiculeType == -1, alors récupère tous les véhicules.
   * 
   * onlyUnAffected : recupere les dispositif dont idDispositif = 0 ou =idDispositif
   * 
   * */
  public List<Vehicule> getVehiculeList(int vehiculeType, boolean onlyUnAffected, int idDispositif) throws Exception
  {    
    String query = selectForGetVehiculeList;
    
    Object[] values;
    int   [] types ;
    
    if(vehiculeType != -1)
    {
      query   += "WHERE      `id_vehicule_type` = ?\n";
      
      if(onlyUnAffected)
      {
        query += "AND        (`id_dispositif`    = 0 \n";
        query += "OR          `id_dispositif`    = ?)\n";
        
        values = new Object[]{vehiculeType , idDispositif };
        types  = new int   []{Types.INTEGER, Types.INTEGER};
      }
      else
      {
        values = new Object[]{vehiculeType };
        types  = new int   []{Types.INTEGER};
      }

      
    }
    else
    {
      if(onlyUnAffected)
      {
        query += "WHERE      (`id_dispositif`    > 0 \n";
        query += "OR          `id_dispositif`    = ?)\n";
        
        values = new Object[]{idDispositif };
        types  = new int   []{Types.INTEGER};
      }
      else
      {
        values = new Object[]{};
        types  = new int   []{};
      }
    }
    
    
    query +="ORDER BY   `indicatif` ASC   \n";
    
    
    if(logger.isDebugEnabled())
      logger.debug("getting vehicule of types '"+vehiculeType+"' onlyUnAffected='"+onlyUnAffected+"' idDispositif='"+idDispositif+"' \n"+query);
    
    return this.jdbcTemplate.query(query   , 
        values,
        types,
        new VehiculeRowMapper());
  }
  
  
  public void unAffectVehiculeToDispositif(int idVehicule) throws Exception
  {
    this.affectVehiculeToDispositif(idVehicule, 0);
  }
  
  
  private final static String queryForAffectVehiculeToDispositif =
      "UPDATE  vehicule           \n" +
      "SET     id_dispositif  = ? \n" +
      "WHERE   id_vehicule    = ? \n";
  
  
  
  
  
  public void affectVehiculeToDispositif(int idVehicule, int idDispositif) throws Exception
  {
    if(logger.isDebugEnabled())
    {
      logger.debug("updating vehicule '"+idVehicule+"' with id_dispositif='"+idDispositif+"'");
    }
   
    //Si on fait une affectation au vehicule 0, c'est qu'on desaffecte.
    if(idVehicule==0)
    {
      idDispositif= 0;
    }
    
    this.jdbcTemplate.update(queryForAffectVehiculeToDispositif, new Object[]{idDispositif, idVehicule}, new int[]{Types.INTEGER, Types.INTEGER});
  }
  
  private final static String queryForStoreVehiculePosition = 
      "INSERT INTO  `vehicule_position_log` \n" +
      "           ( `id_vehicule`  , `coordinate_lat` , `coordinate_long`, `coordinates_origine`, \n" +
      "             `id_dispositif`, `id_etat_dispositif`) \n" +
      "VALUES     (?, ?, ?, ?, ?, ?)\n"; 
  
  
  @Transactional (propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
  public void storeVehiculePosition(DispositifSummaryInformation dsi, int coordinateOrigin) throws Exception
  {
    if(logger.isDebugEnabled())
    {
      logger.debug("storing vehicule position (coordinateOrigin='"+coordinateOrigin+"' "+dsi );
    }
    
    Object[] values = new Object[]{dsi.getIdVehicule(), dsi.getCoordinateLat(), dsi.getCoordinateLong(), coordinateOrigin, dsi.getIdDispositif(), dsi.getIdEtatDispositif() };
    int   [] types  = new int   []{Types.INTEGER      , Types.FLOAT           , Types.FLOAT            , Types.INTEGER   ,  Types.INTEGER       , Types.INTEGER             };
    
    this.jdbcTemplate.update(queryForStoreVehiculePosition, values, types);
    
    int idVehiculePositionLog = this.getLastInsertedId(jdbcTemplate, "vehicule_position_log");
    
    this.storeVehiculePositionIntervention(idVehiculePositionLog, dsi.getIdInterventions());
    
    
  }
  
  private final static String queryForStoreVehiculePositionInter = 
      "INSERT INTO  `vehicule_position_log_inter` \n" +
      "           ( `id_vehicule_position_log`  , `id_intervention`) \n" +
      "VALUES     (?, ?)\n"; 
  
  protected void storeVehiculePositionIntervention(int idVehiculePositionLog, int[] idInterventions) throws Exception
  {
    
    if(logger.isDebugEnabled())
    {
      logger.debug("storing vehicule position intervention (idVehiculePositionLog='"+idVehiculePositionLog+"' ");
    }
    
    Object[] values;
    int   [] types ;
    
    for (int i : idInterventions)
    {
      values = new Object[]{idVehiculePositionLog, i          };
      types  = new int   []{Types.INTEGER      , Types.INTEGER};
      this.jdbcTemplate.update(queryForStoreVehiculePositionInter, values, types);
    }
    

    
  }

  @Override
  protected int getLastInsertedId()
  {
    return this.getLastInsertedId(jdbcTemplate, "vehicule");
  }
  
}
