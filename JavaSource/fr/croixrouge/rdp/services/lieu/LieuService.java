package fr.croixrouge.rdp.services.lieu;

import java.util.Hashtable;
import java.util.List;

import fr.croixrouge.rdp.model.monitor.Lieu;
import fr.croixrouge.rdp.model.monitor.LieuType;
import fr.croixrouge.rdp.model.monitor.dwr.GridSearchFilterAndSortObject;
import fr.croixrouge.rdp.model.monitor.dwr.ListRange;

public interface LieuService
{
  public List     <LieuType          > getLieuType   (          ) throws Exception;
  public List     <Lieu              > getLieux      (          ) throws Exception;
  public Lieu                          getLieu       (int idLieu) throws Exception;
  public Hashtable<String, List<Lieu>> getLieuSorted (          ) throws Exception;
  public ListRange<Lieu>               getLieux      (GridSearchFilterAndSortObject gsfaso) throws Exception;
  
  public void                          setEnableStatusOnLieu(int idLieu, boolean enabled) throws Exception;
  
  public int createNewEmptyLieu() throws Exception;
}
