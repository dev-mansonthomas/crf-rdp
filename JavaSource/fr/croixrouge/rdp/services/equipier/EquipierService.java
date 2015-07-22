package fr.croixrouge.rdp.services.equipier;

import java.util.List;

import fr.croixrouge.rdp.model.monitor.Equipier;
import fr.croixrouge.rdp.model.monitor.EquipierRole;
import fr.croixrouge.rdp.model.monitor.dwr.GridSearchFilterAndSortObject;
import fr.croixrouge.rdp.model.monitor.dwr.ListRange;

public interface EquipierService
{
  List<Equipier>       getEquipiersForDispositif(int idDispositif) throws Exception;
  Equipier             getEquipierLeaderOfDispositif(int idDispositif) throws Exception;
  Equipier             findEquipierByMobile(String mobile) throws Exception;
  
  Equipier             getEquipier(int idEquipier) throws Exception;
  Equipier             getEquipierByNivol(String nivol) throws Exception;
  int                  getNbEquipiers(GridSearchFilterAndSortObject gsfaso) throws Exception;
  ListRange<Equipier>  getEquipiers(GridSearchFilterAndSortObject gsfaso) throws Exception;
  
  ListRange<Equipier>  searchEquipierWithRole(int searchType, GridSearchFilterAndSortObject gsfaso) throws Exception;
  ListRange<Equipier>  searchEquipier(String searchString, int start, int limit) throws Exception;
  
  void                 setDispositifToEquipier(int idEquipier, int idDispositif) throws Exception;
  
  void                 setEnableDisableEquipier(int idEquipier, boolean enable) throws Exception;
  int                  createEquipier(Equipier equipier) throws Exception;
  void                 updateEquipierRoles(Equipier equipier, boolean creation) throws Exception;
  void                 modifyEquipier(Equipier equipier) throws Exception;
  List<EquipierRole>   getEquipierRoles(int idEquipier) throws Exception;
  void                 deleteEquipiersInfoForDispositifToBeDeleted(int idDispositif) throws Exception;
}
