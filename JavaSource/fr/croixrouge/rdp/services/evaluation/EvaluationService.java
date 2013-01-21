package fr.croixrouge.rdp.services.evaluation;

import java.util.List;

import fr.croixrouge.rdp.model.monitor.Equipier;
import fr.croixrouge.rdp.model.monitor.EvaluationSession;

public interface EvaluationService
{
  public List<Integer>  getRolesEvaluateurFromEquipier(int idEquipier                ) throws Exception;
  public List<Equipier> getIdEquipierEvaluableForRole (int idDispositif, int idRole  ) throws Exception;

  
  
  public int createEvaluationSession(EvaluationSession evaluationSession)  throws Exception;
  


}
