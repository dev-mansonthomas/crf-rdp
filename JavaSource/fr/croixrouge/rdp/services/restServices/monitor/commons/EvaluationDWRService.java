package fr.croixrouge.rdp.services.restServices.monitor.commons;

import fr.croixrouge.rdp.model.monitor.Equipier;
import fr.croixrouge.rdp.model.monitor.EvaluationSession;
import fr.croixrouge.rdp.model.monitor.dwr.ListRange;
import fr.croixrouge.rdp.services.equipier.EquipierService;
import fr.croixrouge.rdp.services.evaluation.EvaluationService;

import java.util.List;

public class EvaluationDWRService
{
  private EvaluationService evaluationService;
  private EquipierService   equipierService;
  
  public EvaluationDWRService(EvaluationService evaluationService,
                              EquipierService   equipierService)
  {
    this.evaluationService = evaluationService;
    this.equipierService   = equipierService  ;
  }

  
  
  public List<Integer> getRolesEvaluateurFromEquipier(int idEquipier) throws Exception
  {
    
    return this.evaluationService.getRolesEvaluateurFromEquipier(idEquipier);
  }
  
  public List<Equipier> getIdEquipierEvaluableForRole(int idDispositif, int idRole) throws Exception
  {
    
    return this.evaluationService.getIdEquipierEvaluableForRole(idDispositif, idRole);
  }
  
  public int createEvaluationSession(EvaluationSession evaluationSession) throws Exception
  {
    
    return this.evaluationService.createEvaluationSession(evaluationSession);
  }
  
  public ListRange<Equipier> terminerEvaluation(int idDispositif) throws Exception
  {
    
    this.evaluationService.terminerEvaluationSession(idDispositif);
    List<Equipier> equpierList = this.equipierService.getEquipiersForDispositif(idDispositif);
    ListRange<Equipier> equipiers = new ListRange<Equipier>(equpierList.size(), equpierList);
    return equipiers;
  }
  

}
