package fr.croixrouge.rdp.services.restServices.monitor.input;

import fr.croixrouge.rdp.model.monitor.Equipier;
import fr.croixrouge.rdp.model.monitor.SMS;
import fr.croixrouge.rdp.services.equipier.EquipierService;
import fr.croixrouge.rdp.services.mobile.MobileService;
import fr.croixrouge.rdp.services.restServices.RestUtility;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import javax.inject.Inject;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

public class MonitorInputSMS
{
  private static Log             logger          = LogFactory.getLog(MonitorInputSMS.class);
  private        EquipierService equipierService = null;
  private        MobileService   mobileService   = null;

  @Inject
  private HttpSession session;

  public MonitorInputSMS(EquipierService equipierService,
                         MobileService mobileService)
  {
    this.equipierService = equipierService;
    this.mobileService = mobileService;
  }

  public List<Equipier> getEquipiersFromDispositif(int idDispositif) throws Exception
  {


    return this.equipierService.getEquipiersForDispositif(idDispositif);
  }

  public void sendSMS(int idDispositif, int[] idEquipiers, String message) throws Exception
  {
    int currentUserId           = RestUtility.getUser(this.session).getIdUser();
    if(logger.isDebugEnabled())
    {
      StringBuilder sb = new StringBuilder("{");
      for (int i : idEquipiers)
      {
        sb.append(i);
        sb.append(",");
      }
      sb.append("}");
      logger.debug("sending sms to equipier from dispositif='"+idDispositif+"', message=¤"+message+"¤ to equpiers : "+sb.toString());
    }
    
    List<Equipier>  equipiers = this.equipierService.getEquipiersForDispositif(idDispositif);
    List<SMS>       smss      = new ArrayList<>(idEquipiers.length);
    SMS             template  = new SMS(SMS.TYPE_MESSAGE_EQUIPIERS_DISPOSITIF, idDispositif,currentUserId, "0606060606", message );
    
    
    for (Equipier equipier : equipiers)
    {
      int idEquipier = equipier.getIdEquipier();
      
      boolean isDestinataire = false;
      for (int oneIdEquipier : idEquipiers)
      {
        if(idEquipier == oneIdEquipier)
        {
          isDestinataire = true;
          break;
        }
      }
      
      if(isDestinataire)
      {
        smss.add(template.clone(equipier.getMobile()));
      }
    }
    
    this.mobileService.sendSMS(smss);
  }
  
}
