package fr.croixrouge.rdp.services.regulation;

import java.util.List;

import fr.croixrouge.rdp.model.monitor.Delegation;
import fr.croixrouge.rdp.model.monitor.Regulation;
import fr.croixrouge.rdp.model.monitor.User;

public interface RegulationService
{
  
  public List<User>       getCoRegulateurs      (String     numNivol    , String nom      );
  public void             getCoRegulateurs      (Regulation regulation                    );
  public List<User>       getRegulateur         ();
  public void             setRegulationToUser   (int idUser             , int idRegulation);
  public void             createUser            (User user                                );
  
  public List<Regulation> getRegulations        (boolean    open                          );  
  public void             createRegulation      (Regulation regulation                    );
  public void             changeRegulationState (int        idRegulation, boolean open    );
  public Regulation       getRegulation         (int        idRegulation                  );
  
  public List<Delegation> getDelegationsByZipCode (String zip           );
  public void             createDelegation        (Delegation delegation);
}
