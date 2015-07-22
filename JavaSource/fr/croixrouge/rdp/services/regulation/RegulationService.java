package fr.croixrouge.rdp.services.regulation;

import java.util.List;

import fr.croixrouge.rdp.model.monitor.Delegation;
import fr.croixrouge.rdp.model.monitor.Regulation;
import fr.croixrouge.rdp.model.monitor.dwr.ListRange;

public interface RegulationService
{  
  List<Regulation> getRegulations(boolean open);
  void             createRegulation(Regulation regulation);
  void             changeRegulationState(int idRegulation, boolean open);
  Regulation       getRegulation(int idRegulation);
  
  ListRange<Delegation>  searchDelegation(String search, int start, int limit);
  void                   createDelegation(Delegation delegation);
}
