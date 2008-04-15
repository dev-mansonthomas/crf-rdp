package fr.croixrouge.irp.services.dwr.monitor;

import java.util.Date;

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
    this.validateSession();
    int  currentUserRegulationId = this.getRegulationId();
    return this.dispositifService.getAllDispositif(currentUserRegulationId);
  }
  
  public void setInterventionToDispositif(int idIntervention, int idDispositif) throws Exception
  {
    this.validateSession();
    Date affectationDate = new Date();
    this.dispositifService  .affectInterventionToDispositif(idIntervention, idDispositif, affectationDate);
    this.interventionService.affectInterventionToDispositif(idIntervention, idDispositif, affectationDate);
  }
}