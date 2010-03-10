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
  
  public void createLieu(Lieu lieu)
  {
    
  }
  
  public void updateLieu(Lieu lieu)
  {
    
  }
}