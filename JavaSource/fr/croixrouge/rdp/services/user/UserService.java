package fr.croixrouge.rdp.services.user;

import java.util.List;

import fr.croixrouge.rdp.model.monitor.Regulation;
import fr.croixrouge.rdp.model.monitor.User;

public interface UserService
{
  /**return null if user does not exists*/
  User             authenticateUser(String username, String password);

  void             updateUserStatus(int idUser, boolean active);
  void             updateUserRole(int idUser, int idRole, boolean active);
  void             updateUserPassword(int idUser, String password);
  
  List<User>       getCoRegulateurs(String numNivol, String nom);
  void             getCoRegulateurs(Regulation regulation);
  List<User>       getRegulateur();
  void             setRegulationToUser(int idUser, int idRegulation);
  void             createUser(User user);
  
  User             getUserFromIdEquipier(int idEquipier) throws Exception;
  User             getUser(int idUser) throws Exception;
}
