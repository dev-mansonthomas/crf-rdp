package fr.croixrouge.rdp.services.dwr.monitor.commons;

import java.util.Hashtable;
import java.util.List;

import fr.croixrouge.rdp.model.monitor.Lieu;
import fr.croixrouge.rdp.model.monitor.LieuType;

public interface MonitorCommonsService
{
  public Hashtable<String, List<?>>     getAllList () throws Exception;
  public List<LieuType>                 getLieuType() throws Exception;
  public Hashtable<String, List<Lieu>>  getAllLieu () throws Exception;
}
