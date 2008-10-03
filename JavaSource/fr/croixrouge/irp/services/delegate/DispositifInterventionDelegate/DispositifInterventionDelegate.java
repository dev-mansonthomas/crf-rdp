package fr.croixrouge.irp.services.delegate.DispositifInterventionDelegate;

import fr.croixrouge.irp.model.monitor.Position;

public interface DispositifInterventionDelegate
{
  public void action                (int idRegulation, int idIntervention, int idDispositif) throws Exception;
  public void chooseEvacDestination (int idRegulation, int idIntervention, int idDispositif, int idLieu, String destinationLabel, Position position) throws Exception;
}
