package fr.croixrouge.rdp.services.vehicule;

import java.util.List;

import fr.croixrouge.rdp.model.monitor.DispositifSummaryInformation;
import fr.croixrouge.rdp.model.monitor.Vehicule;

public interface VehiculeService
{
  String CARBURANT_DIESEL     = "Diesel"    ;
  String CARBURANT_ESSENCE    = "Essence"   ;
  String CARBURANT_ELECTRIQUE = "Electrique";
  
  int    GPS_ORIGINE_GOOGLE   = 1;
  int    GPS_ORIGINE_RADIO    = 2;
  
  
  List<Vehicule> getVehiculeList(int vehiculeType, boolean onlyUnAffected, int idDispositif) throws Exception;
  
  void affectVehiculeToDispositif(int idVehicule, int idDispositif) throws Exception;
  void unAffectVehiculeToDispositif(int idVehicule) throws Exception;
  
  void storeVehiculePosition(DispositifSummaryInformation dsi, int coordinateOrigin) throws Exception;
  
  
}
