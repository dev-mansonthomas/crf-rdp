package fr.croixrouge.rdp.services.dwr.homepage;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import fr.croixrouge.rdp.model.monitor.Lieu;
import fr.croixrouge.rdp.model.monitor.dwr.GridSearchFilterAndSortObject;
import fr.croixrouge.rdp.model.monitor.dwr.ListRange;
import fr.croixrouge.rdp.services.dwr.DWRUtils;
import fr.croixrouge.rdp.services.lieu.LieuService;

public class LieuEditor extends DWRUtils
{
  private static Log          logger              = LogFactory.getLog(LieuEditor.class);
  
  private LieuService                         lieuService               = null;
  
  public LieuEditor( LieuService lieuService )
  {
    this.lieuService               = lieuService              ; 

    if(logger.isDebugEnabled())
      logger.debug("constructor called");
  }
  
  public ListRange<Lieu> getLieux(GridSearchFilterAndSortObject gsfaso) throws Exception
  {
    this.validateSession();
    
    try
    {  
      return  this.lieuService.getLieux(gsfaso);    
    }
    catch (Exception e)
    {
      logger.error("Erreur lors de la récupération de la liste des lieux", e);
      throw e;
    }
    
  }

  
  public Lieu getLieu(int idLieu) throws Exception
  {
    this.validateSession();
    try
    {  
      return  this.lieuService.getLieu(idLieu);    
    }
    catch (Exception e)
    {
      logger.error("Erreur lors de la récupération du lieu '"+idLieu+"'", e);
      throw e;
    }
  }
  
  public void enableLieu (int idLieu) throws Exception
  {
    this.validateSession();
    try
    {  
      this.lieuService.setEnableStatusOnLieu(idLieu, true);    
    }
    catch (Exception e)
    {
      logger.error("Erreur lors de l'activation du lieu '"+idLieu+"'", e);
      throw e;
    }
  }
  
  public void disableLieu(int idLieu) throws Exception
  {
    this.validateSession();
    try
    {  
      this.lieuService.setEnableStatusOnLieu(idLieu, true);  
    }
    catch (Exception e)
    {
      logger.error("Erreur lors de l'activation du lieu '"+idLieu+"'", e);
      throw e;
    }
  }
  
  public void deleteLieu(int idLieu) throws Exception
  {
    this.validateSession();
    try
    {  
      this.lieuService.deleteLieu(idLieu);  
    }
    catch (Exception e)
    {
      String msg = "Erreur lors de la suppression du lieu '"+idLieu+"'. Ce lieu a peut etre été référencé dans l'application, vous ne pouvez que le désactiver";
      logger.error(msg, e);


      throw new Exception(msg + "\n\n" +e.getMessage());
    }
  }
  
  public int createNewEmptyLieu() throws Exception
  {
    this.validateSession();
    try
    {  
      return this.lieuService.createNewEmptyLieu();  
    }
    catch (Exception e)
    {
      logger.error("Erreur lors de la création d'un nouveau lieu", e);
      throw e;
    }
  }
  
  
  public void updateGoogleCoordinates(float latitude, float longitude, int idLieu) throws Exception
  {
    this.validateSession();
    try
    {
      this.lieuService.updateGoogleCoordinates(latitude, longitude, idLieu);
    }
    catch(Exception e)
    {
      throw e;
    }
  }
  
  public void updateIntegerField(int idLieu, String fieldName, int      fieldValue) throws Exception
  {
    this.validateSession();
    try
    {
      this.lieuService.updateIntegerField(idLieu, fieldName, fieldValue);
    }
    catch(Exception e)
    {
      logger.error("Error while updating integer field on lieu id='"+idLieu+"' fieldName='"+fieldName+"' fieldValue='"+fieldValue+"'",e);
      throw e;
    }
    
  }
  public void updateFloatField  (int idLieu, String fieldName, float    fieldValue) throws Exception
  {
    this.validateSession();
    try
    {
      this.lieuService.updateFloatField(idLieu, fieldName, fieldValue);
    }
    catch(Exception e)
    {
      logger.error("Error while updating float field on lieu id='"+idLieu+"' fieldName='"+fieldName+"' fieldValue='"+fieldValue+"'",e);
      throw e;
    }
  }
  public void updateStringField (int idLieu, String fieldName, String   fieldValue) throws Exception
  {
    this.validateSession();
    try
    {
      this.lieuService.updateStringField(idLieu, fieldName, fieldValue);
    }
    catch(Exception e)
    {
      logger.error("Error while updating String field on lieu id='"+idLieu+"' fieldName='"+fieldName+"' fieldValue='"+fieldValue+"'",e);
      throw e;
    }
  }
  
  
}
