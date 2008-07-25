package fr.croixrouge.irp.services.dwr.monitor;

import java.util.Date;

import org.directwebremoting.ScriptBuffer;

import fr.croixrouge.irp.model.monitor.Dispositif;
import fr.croixrouge.irp.model.monitor.dwr.ListRange;
import fr.croixrouge.irp.services.dispositif.DispositifService;
import fr.croixrouge.irp.services.dwr.DWRUtils;
import fr.croixrouge.irp.services.intervention.InterventionService;

public class MonitorOutputDispositf  extends DWRUtils
{
  private DispositifService   dispositifService   = null;
  private InterventionService interventionService = null;
  public MonitorOutputDispositf(DispositifService dispositifService, InterventionService interventionService)
  {
    this.dispositifService  = dispositifService;
    this.interventionService= interventionService;
  }

  public ListRange getAllDispositif() throws Exception
  {
    int  currentUserRegulationId = this.validateSessionAndGetRegulationId();
    return this.dispositifService.getAllDispositif(currentUserRegulationId);
  }
  
  public void setInterventionToDispositif(int idIntervention, int idDispositif) throws Exception
  {
    int currentUserRegulationId = this.validateSessionAndGetRegulationId();
    Date affectationDate        = new Date();
    
    this.dispositifService  .affectInterventionToDispositif(idIntervention, idDispositif, affectationDate);
    this.interventionService.affectInterventionToDispositif(idIntervention, idDispositif, affectationDate);
    
    Dispositif dispositif = this.dispositifService.getDispositif(currentUserRegulationId, idDispositif, false);

    ScriptBuffer script = new ScriptBuffer();
    
    script.appendScript("moDispositifCs.updateDispositif(")
                        .appendData(dispositif)
                        .appendScript(");");
    
    updateRegulationUser(script, outPageName);
  }
  
  public void actionOnDispositif(int idIntervention, int idDispositif) throws Exception
  {
    int currentUserRegulationId = this.validateSessionAndGetRegulationId();
    
    Date actionDate        = new Date();
    
    //Determine l'état suivant, met a jour la date de l'action courante.
    
    Dispositif dispositif = this.dispositifService.getDispositif(currentUserRegulationId, idDispositif, false);

    ScriptBuffer script = new ScriptBuffer();
    
    script.appendScript("moDispositifCs.updateDispositif(")
                        .appendData(dispositif)
                        .appendScript(");");
    
    updateRegulationUser(script, outPageName);
  }
  
  
}