package fr.croixrouge.rdp.services.regulation;

import java.util.List;

import fr.croixrouge.rdp.model.monitor.Delegation;
import fr.croixrouge.rdp.model.monitor.Regulation;
import fr.croixrouge.rdp.model.monitor.dwr.ListRange;

public interface RegulationService
{  
  public List<Regulation> getRegulations        (boolean    open                          );  
  public void             createRegulation      (Regulation regulation                    );
  public void             changeRegulationState (int        idRegulation, boolean open    );
  public Regulation       getRegulation         (int        idRegulation                  );
  
  public ListRange<Delegation>  searchDelegation (String     search     , int start, int limit);
  public void                   createDelegation (Delegation delegation);
}
