package fr.croixrouge.rdp.services.vehicule;

import java.util.List;

import fr.croixrouge.rdp.model.monitor.DispositifSummaryInformation;
import fr.croixrouge.rdp.model.monitor.Vehicule;

public interface VehiculeService
{
  public final static String CARBURANT_DIESEL     = "Diesel"    ;
  public final static String CARBURANT_ESSENCE    = "Essence"   ;
  public final static String CARBURANT_ELECTRIQUE = "Electrique";
  
  public final static int    GPS_ORIGINE_GOOGLE   = 1;
  public final static int    GPS_ORIGINE_RADIO    = 2;
  
  
  public List<Vehicule> getVehiculeList(int vehiculeType, boolean onlyUnAffected, int idDispositif) throws Exception;
  
  public void affectVehiculeToDispositif  (int idVehicule, int idDispositif ) throws Exception;
  public void unAffectVehiculeToDispositif(int idVehicule                   ) throws Exception;
  
  public void storeVehiculePosition(DispositifSummaryInformation dsi, int coordinateOrigin) throws Exception;
  
  
}
