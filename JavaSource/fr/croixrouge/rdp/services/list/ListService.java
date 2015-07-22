package fr.croixrouge.rdp.services.list;

import java.util.Hashtable;
import java.util.List;

import fr.croixrouge.rdp.model.monitor.Delegation;
import fr.croixrouge.rdp.model.monitor.DispositifEtat;
import fr.croixrouge.rdp.model.monitor.DispositifType;
import fr.croixrouge.rdp.model.monitor.EquipierRole;
import fr.croixrouge.rdp.model.monitor.InterventionEtat;
import fr.croixrouge.rdp.model.monitor.InterventionMotif;
import fr.croixrouge.rdp.model.monitor.InterventionMotifAnnulation;
import fr.croixrouge.rdp.model.monitor.InterventionOrigine;
import fr.croixrouge.rdp.model.monitor.SMSType;
import fr.croixrouge.rdp.model.monitor.UserRole;
import fr.croixrouge.rdp.model.monitor.VehiculeType;

public interface ListService
{
  List<DispositifType              > getTypesDispositif();
  List<DispositifEtat              > getEtatsDispositif();
  List<EquipierRole                > getRolesEquipier();
  List<UserRole                    > getRolesUser();
  List<InterventionMotif           > getMotifsIntervention();
  List<InterventionMotifAnnulation > getMotifsAnnulationIntervention();
  List<InterventionOrigine         > getOriginesIntervention();
  List<Delegation                  > getDelegations();
  List<InterventionEtat            > getEtatsIntervention();
  List<SMSType                     > getSMSType();
  List<VehiculeType                > getVehiculeType();
  
  void                       getAllListInit();
  Hashtable<String, List<?>> getAllList();
}
