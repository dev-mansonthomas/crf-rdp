package fr.croixrouge.rdp.services.lieu;

import java.util.Hashtable;
import java.util.List;

import fr.croixrouge.rdp.model.monitor.Lieu;
import fr.croixrouge.rdp.model.monitor.LieuType;

public interface LieuService
{
  public List     <LieuType          > getLieuType   () throws Exception;
  public List     <Lieu              > getLieu       () throws Exception;
  public Hashtable<String, List<Lieu>> getLieuSorted () throws Exception;
}
