package fr.croixrouge.rdp.services.list;

import java.util.Hashtable;
import java.util.List;

import fr.croixrouge.rdp.model.monitor.DispositifEtat;
import fr.croixrouge.rdp.model.monitor.DispositifType;
import fr.croixrouge.rdp.model.monitor.EquipierRole;
import fr.croixrouge.rdp.model.monitor.InterventionMotif;
import fr.croixrouge.rdp.model.monitor.InterventionOrigine;
import fr.croixrouge.rdp.model.monitor.UserRole;

public interface ListService
{
  public List<DispositifType      > getTypesDispositif      ();
  public List<DispositifEtat      > getEtatsDispositif      ();
  public List<EquipierRole        > getRolesEquipier        ();
  public List<UserRole            > getRolesUser            ();
  public List<InterventionMotif   > getMotifsIntervention   ();
  public List<InterventionOrigine > getOriginesIntervention ();
  
  public void                                       getAllListInit          ();
  public Hashtable<String, List> getAllList              ();
}
