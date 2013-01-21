package fr.croixrouge.rdp.services.dwr.monitor.commons;

import java.util.List;

import fr.croixrouge.rdp.model.monitor.Equipier;
import fr.croixrouge.rdp.services.dwr.DWRUtils;
import fr.croixrouge.rdp.services.evaluation.EvaluationService;

public class EvaluationDWRService extends DWRUtils
{
  private EvaluationService evaluationService;
  
  public EvaluationDWRService(EvaluationService evaluationService)
  {
    this.evaluationService = evaluationService;
  }

  
  
  public List<Integer> getRolesEvaluateurFromEquipier(int idEquipier) throws Exception
  {
    this.validateSession();
    return this.evaluationService.getRolesEvaluateurFromEquipier(idEquipier);
  }
  
  public List<Equipier> getIdEquipierEvaluableForRole(int idDispositif, int idRole) throws Exception
  {
    this.validateSession();
    return this.evaluationService.getIdEquipierEvaluableForRole(idDispositif, idRole);
  }
  
  
  //public int createEvaluationSession(int idDispositif, int idRoleEvalue, int idEquipierEvaluateur, int idEquipierEnEvaluation) throws Exception
  //{
  //  this.validateSession();
    
    
    //return this.evaluationService.createEvaluationSession(idDispositif, idRoleEvalue, idEquipierEvaluateur, idEquipierEnEvaluation);
  //}

  

}
