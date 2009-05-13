package fr.croixrouge.irp.services.delegate.DispositifInterventionDelegate;

import fr.croixrouge.irp.model.monitor.Position;

public interface DispositifInterventionDelegate
{
  public boolean  action                (int idRegulation, int idIntervention, int idDispositif) throws Exception;
  public void     chooseEvacDestination (int idRegulation, int idIntervention, int idDispositif, int idLieu, String destinationLabel, Position position) throws Exception;
  public void     endOfIntervention     (int idRegulation, int idIntervention, int idDispositif) throws Exception;

  public void     changeDispositifStatus(int idRegulation, int idDispositif  , int newEtatDispositif) throws Exception;
}
