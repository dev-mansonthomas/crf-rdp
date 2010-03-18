package fr.croixrouge.rdp.services.dwr.homepage;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import fr.croixrouge.rdp.model.monitor.Equipier;
import fr.croixrouge.rdp.model.monitor.EquipierRole;
import fr.croixrouge.rdp.model.monitor.User;
import fr.croixrouge.rdp.model.monitor.dwr.GridSearchFilterAndSortObject;
import fr.croixrouge.rdp.model.monitor.dwr.ListRange;
import fr.croixrouge.rdp.services.dwr.DWRUtils;
import fr.croixrouge.rdp.services.equipier.EquipierService;
import fr.croixrouge.rdp.services.user.UserService;
import fr.croixrouge.rdp.services.utilities.UtilitiesService;

public class EquipiersGestion extends DWRUtils
{
  private static Log          logger              = LogFactory.getLog(EquipiersGestion.class);
  
  private EquipierService         equipierService  = null;
  private UserService             userService      = null;
  private UtilitiesService        utilitiesService = null;
  
  public EquipiersGestion(EquipierService   equipierService ,
                          UserService       userService     ,
                          UtilitiesService  utilitiesService)
  {
    this.equipierService    = equipierService  ;
    this.userService        = userService      ;
    this.utilitiesService   = utilitiesService;

    if(logger.isDebugEnabled())
      logger.debug("constructor called");
  }
  
  public ListRange<Equipier> getEquipierList(GridSearchFilterAndSortObject gsfaso) throws Exception
  {
    this.validateSession();
    
    try
    {  
      return  this.equipierService.getEquipiers(gsfaso);    
    }
    catch (Exception e)
    {
      logger.error("Erreur lors de la récupération de la liste des équipiers", e);
      throw e;
    }
    
  }
  
  public List<EquipierRole>getEquipierRoles(int idEquipier) throws Exception
  {
    this.validateSession();
    try
    {
      List<EquipierRole> list = this.equipierService.getEquipierRoles(idEquipier);
      return list;
    }
    catch (Exception e)
    {
      logger.error("Erreur lors de la récupération de la liste des Roles d'un équipier", e);
      throw e;
    }
  }
  
  public int enableEquipier(int idEquipier, boolean enable) throws Exception
  {
    this.validateSession();
    try
    {
      this.equipierService.setEnableDisableEquipier(idEquipier, enable);
    }
    catch (Exception e)
    {
      logger.error("Erreur lors de la récupération de la liste des équipiers", e);
      throw e;
    }
    return 1;
  }
  

  
  public void createEquipier(Equipier equipier) throws Exception
  {
    this.validateSession();
    try
    {
      int idEquipier = this.equipierService.createEquipier(equipier);
      equipier.setIdEquipier(idEquipier);
    }
    catch (Exception e)
    {
      logger.error("Error while creating an equipier",e);
      throw e;
    }
  }
  
  public void modifyEquipier(Equipier equipier) throws Exception
  {
    this.validateSession();
    try
    {
      this.equipierService.modifyEquipier(equipier);
    }
    catch (Exception e)
    {
      logger.error("Error while updating equipier",e);
      throw e;
    }
  }
  
  public User getEquipierUserFromIdEquipier(int idEquipier) throws Exception
  {
    this.validateSession();
    try
    {
      return this.userService.getUserFromIdEquipier(idEquipier);
    }
    catch (Exception e)
    {
      logger.error("Error while getting user with idEquipier='"+idEquipier+"'",e);
      throw e;
    }
  }
  
  public User changeStatus(int idEquipier, int idUser, boolean active) throws Exception
  {
    this.validateSession();
    
    if(idUser == 0 && !active)
      throw new IllegalArgumentException("IdUser=0 => on ne peut pas desactiver un équipier qui n'est pas un utilisateur");

    try
    {
      
      if(idUser == 0)
      {
        User user = new User();
        user.setIdEquipier(idEquipier);
        user.setPassword(this.utilitiesService.generatePassword());
        
        this.userService.createUser(user);
        
        //TODO : mail du password
        
        
        return user;
      }
      
      this.userService.updateUserStatus(idUser, active);
      
      
      return this.userService.getUserFromIdEquipier(idEquipier);
    }
    catch (Exception e)
    {
      logger.error("Error while getting user with idEquipier='"+idEquipier+"'",e);
      throw e;
    }
  }
  

  public User updateRoleForUser(int idUser, int idRole, boolean active) throws Exception
  {
    this.validateSession();
    
    if(idUser == 0)
      throw new IllegalArgumentException("IdUser=0 can't set a role to a non existing user");

    try
    {
     
      this.userService.updateUserRole(idUser, idRole, active);
      
      
      return this.userService.getUser(idUser);
    }
    catch (Exception e)
    {
      logger.error("Error while updating role to user with idUser='"+idUser+"'",e);
      throw e;
    }
  }
  
  
  public User generateNewPassword(int idUser) throws Exception
  {
    this.validateSession();
    
    if(idUser == 0 )
      throw new IllegalArgumentException("IdUser=0 => can't generate new password to non existing user");

    try
    {
      
      String password = this.utilitiesService.generatePassword();
      
      this.userService.updateUserPassword(idUser, password);
      
      //TODO mail du password
      User user = this.userService.getUser(idUser);
      user.setPassword(password);
      return user;
    }
    catch (Exception e)
    {
      logger.error("Error while generating new password for user with idUser='"+idUser+"'",e);
      throw e;
    }
  }
}