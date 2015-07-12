package fr.croixrouge.rdp.services.lieu;

import java.util.Hashtable;
import java.util.List;

import fr.croixrouge.rdp.model.monitor.Lieu;
import fr.croixrouge.rdp.model.monitor.LieuType;
import fr.croixrouge.rdp.model.monitor.dwr.GridSearchFilterAndSortObject;
import fr.croixrouge.rdp.model.monitor.dwr.ListRange;

public interface LieuService
{
  List     <LieuType          > getLieuType   (          ) throws Exception;
  List     <Lieu              > getLieux      (          ) throws Exception;
  Lieu                          getLieu       (int idLieu) throws Exception;
  void                          deleteLieu    (int idLieu) throws Exception;
  Hashtable<String, List<Lieu>> getLieuSorted (          ) throws Exception;
  
  ListRange<Lieu>               searchLieux   (String searchString, int idLieuType, int start, int limit) throws Exception;
  ListRange<Lieu>               getLieux      (GridSearchFilterAndSortObject gsfaso) throws Exception;
  
  void                          setEnableStatusOnLieu(int idLieu, boolean enabled) throws Exception;
  
  int createNewEmptyLieu() throws Exception;
  
  
  void updateIntegerField  (int idLieu, String fieldName, int      fieldValue  ) throws Exception;
  void updateStringField   (int idLieu, String fieldName, String   fieldValue  ) throws Exception;
  
  void updateGoogleCoordinates(float latitude, float longitude, int idLieu) throws Exception;
}
