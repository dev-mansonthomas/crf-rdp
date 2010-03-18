package fr.croixrouge.rdp.services.user;

import java.util.List;

import fr.croixrouge.rdp.model.monitor.Regulation;
import fr.croixrouge.rdp.model.monitor.User;

public interface UserService
{
  /**return null if user does not exists*/
  public User             authenticateUser      (String username, String password);

  public void             updateUserStatus      (int idUser, boolean active                 );
  public void             updateUserRole        (int idUser, int idRole     , boolean active);
  public void             updateUserPassword    (int idUser, String password                );
  
  public List<User>       getCoRegulateurs      (String     numNivol    , String nom      );
  public void             getCoRegulateurs      (Regulation regulation                    );
  public List<User>       getRegulateur         ();
  public void             setRegulationToUser   (int idUser             , int idRegulation);
  public void             createUser            (User user                                );
  
  public User             getUserFromIdEquipier (int idEquipier                           ) throws Exception;
  public User             getUser               (int idUser                               ) throws Exception;
}
