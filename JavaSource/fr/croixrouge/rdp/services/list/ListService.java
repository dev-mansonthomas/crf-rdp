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
  public List<DispositifType              > getTypesDispositif              ();
  public List<DispositifEtat              > getEtatsDispositif              ();
  public List<EquipierRole                > getRolesEquipier                ();
  public List<UserRole                    > getRolesUser                    ();
  public List<InterventionMotif           > getMotifsIntervention           ();
  public List<InterventionMotifAnnulation > getMotifsAnnulationIntervention ();
  public List<InterventionOrigine         > getOriginesIntervention         ();
  public List<Delegation                  > getDelegations                  ();
  public List<InterventionEtat            > getEtatsIntervention            ();
  public List<SMSType                     > getSMSType                      ();
  public List<VehiculeType                > getVehiculeType                 ();
  
  public void                       getAllListInit          ();
  public Hashtable<String, List<?>> getAllList              ();
}
