package fr.croixrouge.irp.services.dwr.monitor;

import org.directwebremoting.ScriptBuffer;

import fr.croixrouge.irp.model.monitor.Dispositif;
import fr.croixrouge.irp.model.monitor.dwr.ListRange;
import fr.croixrouge.irp.services.delegate.DispositifInterventionDelegate.DispositifInterventionDelegate;
import fr.croixrouge.irp.services.dispositif.DispositifService;
import fr.croixrouge.irp.services.dwr.DWRUtils;

public class MonitorOutputDispositf  extends DWRUtils
{
  private DispositifService              dispositifService              = null;
  private DispositifInterventionDelegate dispositifInterventionDelegate = null;
  
  public MonitorOutputDispositf(DispositifService dispositifService, DispositifInterventionDelegate dispositifInterventionDelegate)
  {
    this.dispositifService              = dispositifService             ;
    this.dispositifInterventionDelegate = dispositifInterventionDelegate;
  }

  public ListRange getAllDispositif() throws Exception
  {
    int  currentUserRegulationId = this.validateSessionAndGetRegulationId();
    return this.dispositifService.getAllDispositif(currentUserRegulationId);
  }
  
  public void actionOnDispositif(int idIntervention, int idDispositif) throws Exception
  {
    int currentUserRegulationId = this.validateSessionAndGetRegulationId();
    
    //Determine l'état suivant, met a jour la date de l'action courante.
    this.dispositifInterventionDelegate.action(currentUserRegulationId, idIntervention, idDispositif);
    
    //Met a jour tous les navigateurs avec le nouvel état du dispositif
    Dispositif dispositif = this.dispositifService.getDispositif(currentUserRegulationId, idDispositif, false);

    ScriptBuffer script = new ScriptBuffer();
    
    script.appendScript("moDispositifCs.updateDispositif(")
                        .appendData(dispositif)
                        .appendScript(");");
    
    updateRegulationUser(script, outPageName);
  }
  
  
}