package fr.croixrouge.rdp.services.dwr.homepage;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import fr.croixrouge.rdp.model.monitor.Equipier;
import fr.croixrouge.rdp.model.monitor.EquipierRole;
import fr.croixrouge.rdp.model.monitor.dwr.GridSearchFilterAndSortObject;
import fr.croixrouge.rdp.model.monitor.dwr.ListRange;
import fr.croixrouge.rdp.services.dwr.DWRUtils;
import fr.croixrouge.rdp.services.equipier.EquipierService;

public class EquipiersGestion extends DWRUtils
{
  private static Log          logger              = LogFactory.getLog(EquipiersGestion.class);
  
  private EquipierService                         equipierService               = null;
  
  public EquipiersGestion( EquipierService equipierService )
  {
    this.equipierService               = equipierService              ; 

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
    try
    {
      this.validateSession();
      
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
    try
    {
      this.validateSession();
      
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
    try
    {
      this.validateSession();
      
      this.equipierService.modifyEquipier(equipier);
    }
    catch (Exception e)
    {
      logger.error("Error while updating equipier",e);
      throw e;
    }
  }
}