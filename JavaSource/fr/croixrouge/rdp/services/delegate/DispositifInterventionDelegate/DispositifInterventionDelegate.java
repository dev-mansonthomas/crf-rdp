package fr.croixrouge.rdp.services.delegate.DispositifInterventionDelegate;

import java.util.Date;

import fr.croixrouge.rdp.model.monitor.Position;
import fr.croixrouge.rdp.model.monitor.dwr.DataForCloneIntervention;

public interface DispositifInterventionDelegate
{
  String   action(int idRegulation, int idDispositif) throws Exception;
  void     affectInterventionToDispositif(int idEquipierCurrentUser, int idRegulation, int idIntervention, int idDispositif, Date actionDate) throws Exception;
  void     reAffectInterventionToDispositif(int idRegulation, int idIntervention, int idDispositifOrigine, int idDispositifCible, Date actionDate) throws Exception;
  void     chooseEvacDestination(int idRegulation, int idDispositif, int idLieu, String destinationLabel, Position position) throws Exception;
  void     laisseSurPlace(int idRegulation, int idDispositif, boolean decede, boolean decharge, String dcdADispoDe) throws Exception;
  
  String   endOfIntervention(int idRegulation, int idDispositif) throws Exception;

  void     changeDispositifStatus(int idRegulation, int idDispositif, int newEtatDispositif) throws Exception;
  void     cloneIntervention(int idRegulation, DataForCloneIntervention dataForCloneIntervention) throws Exception;
  void     handlePrimaireAndSecondaireOnIntervention(int idDispositif, int idIntervention, boolean isPrimaire) throws Exception;
  
  void    cancelIntervention(int regulationId, int idDispositif, int idIntervention, int idMotifAnnulation) throws Exception;
}
