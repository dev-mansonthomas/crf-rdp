package fr.croixrouge.rdp.services.evaluation;

import java.util.List;

import fr.croixrouge.rdp.model.monitor.Equipier;
import fr.croixrouge.rdp.model.monitor.EvaluationSession;

public interface EvaluationService
{
  List<Integer>  getRolesEvaluateurFromEquipier(int idEquipier) throws Exception;
  List<Equipier> getIdEquipierEvaluableForRole(int idDispositif, int idRole) throws Exception;

  void           terminerEvaluationSession(int idDispositif) throws Exception;
  
  int            createEvaluationSession(EvaluationSession evaluationSession)  throws Exception;
  


}
