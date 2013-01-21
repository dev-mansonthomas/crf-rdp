package fr.croixrouge.rdp.model.monitor.rowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import fr.croixrouge.rdp.model.monitor.Vehicule;

public class VehiculeRowMapper extends RowMapperHelper implements RowMapper<Vehicule>
{

  public Vehicule mapRow(ResultSet rs, int rowNum) throws SQLException
  {
    Vehicule vehicule = new Vehicule();
    vehicule.setIdVehicule               (rs.getInt   ( "id_vehicule"                ));      
    vehicule.setIdVehiculeType           (rs.getInt   ( "id_vehicule_type"           ));      
    vehicule.setIndicatif                (rs.getString( "indicatif"                  ));      
    vehicule.setIdDelegation             (rs.getInt   ( "id_delegation"              ));      
    vehicule.setIdDispositif             (rs.getInt   ( "id_dispositif"              ));
    vehicule.setLastKnowCoordinateLat    (rs.getFloat ( "last_know_coordinate_lat"   ));      
    vehicule.setLastKnowCoordinateLong   (rs.getFloat ( "last_know_coordinate_long"  ));      
    vehicule.setMobile450Id              (rs.getString( "mobile_450_id"              ));      
    vehicule.setMobile150Id              (rs.getString( "mobile_150_id"              ));      
    vehicule.setMarque                   (rs.getString( "marque"                     ));      
    vehicule.setModele                   (rs.getString( "modele"                     ));
    vehicule.setImmatriculation          (rs.getString( "immatriculation"            ));
    vehicule.setCarburant                (rs.getString( "carburant"                  ));      
    vehicule.setDateMiseEnService        (rs.getDate  ( "date_mise_en_service"       ));
    vehicule.setDateDernierControleTech  (rs.getDate  ( "date_dernier_controle_tech" ));
    
    vehicule.setParkingRue               (rs.getString( "parking_rue"                ));
    vehicule.setParkingCodePostal        (rs.getString( "parking_code_postal"        ));
    vehicule.setParkingVille             (rs.getString( "parking_ville"              ));
    vehicule.setParkingInstructions      (rs.getString( "parking_instructions"       ));
    vehicule.setParkingCoordinateLat     (rs.getFloat ( "parking_coordinate_lat"     ));
    vehicule.setParkingCoordinateLong    (rs.getFloat ( "parking_coordinate_long"    ));
          
    return vehicule;
  }
}
