package fr.croixrouge.irp.services.list;

import java.util.Hashtable;
import java.util.List;

import fr.croixrouge.irp.model.monitor.DispositifEtat;
import fr.croixrouge.irp.model.monitor.DispositifType;
import fr.croixrouge.irp.model.monitor.EquipierRole;
import fr.croixrouge.irp.model.monitor.InterventionMotif;
import fr.croixrouge.irp.model.monitor.InterventionOrigine;
import fr.croixrouge.irp.model.monitor.UserRole;

public interface ListService
{
  public List<DispositifType      > getTypesDispositif      ();
  public List<DispositifEtat      > getEtatsDispositif      ();
  public List<EquipierRole        > getRolesEquipier        ();
  public List<UserRole            > getRolesUser            ();
  public List<InterventionMotif   > getMotifsIntervention   ();
  public List<InterventionOrigine > getOriginesIntervention ();
  
  public void                                       getAllListInit          ();
  @SuppressWarnings("unchecked")
  public Hashtable<String, List> getAllList              ();
}
