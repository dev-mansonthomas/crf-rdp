package fr.croixrouge.rdp.services.equipier;

import java.util.List;

import fr.croixrouge.rdp.model.monitor.Equipier;
import fr.croixrouge.rdp.model.monitor.dwr.GridSearchFilterAndSortObject;

public interface EquipierService
{
  public List<Equipier>     getEquipiersForDispositif (int idDispositif ) throws Exception;
  public Equipier           getEquipier               (int idEquipier   ) throws Exception;
  public int                getNbEquipiers            (GridSearchFilterAndSortObject gsfaso);
  public List<Equipier>     getEquipiers              (GridSearchFilterAndSortObject gsfaso);
  public List<Equipier>     getEquipiersByNivol       (String nivol     , int equipierType) throws Exception;
  public List<Equipier>     getEquipiersByNom         (String nom       , int equipierType) throws Exception;
  public void               setDispositifToEquipier   (int idEquipier   , int idDispositif) throws Exception;
}
