package fr.croixrouge.rdp.services.delegate.DispositifInterventionDelegate;

import java.util.Date;

import fr.croixrouge.rdp.model.monitor.Position;
import fr.croixrouge.rdp.model.monitor.dwr.DataForCloneIntervention;

public interface DispositifInterventionDelegate
{
  public void     action                                    (int idRegulation, int idDispositif                 ) throws Exception;
  public void     affectInterventionToDispositif            (int idRegulation, int idIntervention, int idDispositif, Date actionDate) throws Exception;
  public void     reAffectInterventionToDispositif          (int idRegulation, int idIntervention, int idDispositifOrigine, int idDispositifCible, Date actionDate) throws Exception;
  public void     chooseEvacDestination                     (int idRegulation, int idDispositif, int idLieu, String destinationLabel, Position position) throws Exception;
  public void     endOfIntervention                         (int idRegulation, int idDispositif                 ) throws Exception;

  public void     changeDispositifStatus                    (int idRegulation, int idDispositif  , int newEtatDispositif            ) throws Exception;
  public void     cloneIntervention                         (int idRegulation, DataForCloneIntervention dataForCloneIntervention    ) throws Exception;
  public void     handlePrimaireAndSecondaireOnIntervention (int idDispositif, int idIntervention, boolean isPrimaire               ) throws Exception;
}
