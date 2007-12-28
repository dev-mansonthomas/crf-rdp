package fr.croixrouge.irp.services.dwr.monitorInput;

import java.util.List;

import fr.croixrouge.irp.model.monitor.Delegation;
import fr.croixrouge.irp.model.monitor.Regulation;
import fr.croixrouge.irp.model.monitor.User;

public interface MonitorInputService
{
  public Regulation       getRegulation           ()                            throws Exception;
  public List<User>       getCoRegulateurs        ()                            throws Exception;
  public List<User>       getAvailableCoRegulateur(String numNivol, String nom) throws Exception;
  public String           removeCoRegulateur      (int userId, String numNivol) throws Exception;
  public List<User>       addCoRegulateur         (int userId)                  throws Exception;
  public List<Delegation> getDelegationByZipCode  (String zip)                  throws Exception;
  
  

}