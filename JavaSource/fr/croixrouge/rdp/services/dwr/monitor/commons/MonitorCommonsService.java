package fr.croixrouge.rdp.services.dwr.monitor.commons;

import java.util.Hashtable;
import java.util.List;

public interface MonitorCommonsService
{
  @SuppressWarnings("unchecked")
  public Hashtable<String, List> getAllList() throws Exception;
}