package fr.croixrouge.irp.services.dwr.monitorCommons;

import java.util.Hashtable;
import java.util.List;

public interface MonitorCommonsService
{
  @SuppressWarnings("unchecked")
  public Hashtable<String, List> getAllList() throws Exception;
}
