package fr.croixrouge.rdp.services.dwr.monitor.commons;

import java.util.List;

import fr.croixrouge.rdp.model.monitor.Equipier;
import fr.croixrouge.rdp.model.monitor.EvaluationSession;
import fr.croixrouge.rdp.model.monitor.dwr.ListRange;
import fr.croixrouge.rdp.services.dwr.DWRUtils;
import fr.croixrouge.rdp.services.equipier.EquipierService;
import fr.croixrouge.rdp.services.evaluation.EvaluationService;

public class EvaluationDWRService extends DWRUtils
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
    this.validateSession();
    return this.evaluationService.getRolesEvaluateurFromEquipier(idEquipier);
  }
  
  public List<Equipier> getIdEquipierEvaluableForRole(int idDispositif, int idRole) throws Exception
  {
    this.validateSession();
    return this.evaluationService.getIdEquipierEvaluableForRole(idDispositif, idRole);
  }
  
  public int createEvaluationSession(EvaluationSession evaluationSession) throws Exception
  {
    this.validateSession();
    return this.evaluationService.createEvaluationSession(evaluationSession);
  }
  
  public ListRange<Equipier> terminerEvaluation(int idDispositif) throws Exception
  {
    this.validateSession();
    this.evaluationService.terminerEvaluationSession(idDispositif);
    List<Equipier> equpierList = this.equipierService.getEquipiersForDispositif(idDispositif);
    ListRange<Equipier> equipiers = new ListRange<Equipier>(equpierList.size(), equpierList);
    return equipiers;
  }
  

}
