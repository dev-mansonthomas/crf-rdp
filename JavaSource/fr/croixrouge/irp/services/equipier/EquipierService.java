package fr.croixrouge.irp.services.equipier;

import java.util.List;

import fr.croixrouge.irp.model.monitor.Equipier;

public interface EquipierService
{
  public List<Equipier>     getEquipiersForDispositif (int idDispositif );
  public Equipier           getEquipier               (int idEquipier   );
  public List<Equipier>     getEquipiersByNivol       (String nivol     , int equipierType);
  public List<Equipier>     getEquipiersByNom         (String nom       , int equipierType);
  public void               setDispositifToEquipier   (int idEquipier   , int idDispositif, int idRoleDansDispositif);
}
