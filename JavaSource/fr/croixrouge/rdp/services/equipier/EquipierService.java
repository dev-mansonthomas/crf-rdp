package fr.croixrouge.rdp.services.equipier;

import java.util.List;

import fr.croixrouge.rdp.model.monitor.Equipier;
import fr.croixrouge.rdp.model.monitor.EquipierRole;
import fr.croixrouge.rdp.model.monitor.dwr.GridSearchFilterAndSortObject;
import fr.croixrouge.rdp.model.monitor.dwr.ListRange;

public interface EquipierService
{
  public List<Equipier>       getEquipiersForDispositif     (int idDispositif ) throws Exception;
  public Equipier             getEquipierLeaderOfDispositif (int idDispositif ) throws Exception;
  public Equipier             findEquipierByMobile          (String mobile    ) throws Exception;
  
  public Equipier             getEquipier               (int idEquipier   ) throws Exception;
  public int                  getNbEquipiers            (GridSearchFilterAndSortObject gsfaso);
  public ListRange<Equipier>  getEquipiers              (GridSearchFilterAndSortObject gsfaso) throws Exception;
  
  public ListRange<Equipier>  searchEquipierWithRole    (int idRole, String searchString, int start, int limit) throws Exception;
  public ListRange<Equipier>  searchEquipier            (            String searchString, int start, int limit) throws Exception;
  
  public void                 setDispositifToEquipier   (int idEquipier   , int idDispositif) throws Exception;
  
  public void                 setEnableDisableEquipier  (int idEquipier   , boolean enable) throws Exception;
  public int                  createEquipier            (Equipier equipier) throws Exception;
  public void                 updateEquipierRoles       (Equipier equipier, boolean creation) throws Exception;
  public void                 modifyEquipier            (Equipier equipier) throws Exception;
  public List<EquipierRole>   getEquipierRoles          (int idEquipier);
}
