package fr.croixrouge.rdp.model.monitor;

import fr.croixrouge.rdp.model.monitor.modelInterface.ListItemInterface;

public class EquipierRole extends CrfDto  implements ListItemInterface
{
  private static final long serialVersionUID = -7926172871308046266L;
 
  private int     id;
  private String  label;
  private boolean enEvaluation=false;//est ce que la personne est en évaluation pour ce role
  private boolean evaluateur  =false;//est ce que la personne est évaluateur pour ce role
  private boolean evaluable   =false;//est ce que le role est évaluable 
  
  public EquipierRole()
  {
    
  }
  
  public EquipierRole(int id, boolean enEvaluation, boolean evaluateur)
  {
    this.id           = id;
    this.enEvaluation = enEvaluation;
    this.evaluateur   = evaluateur;
  }
  
  public int getId()
  {
    return id;
  }
  public void setId(int id)
  {
    this.id = id;
  }
  public String getLabel()
  {
    return label;
  }
  public void setLabel(String label)
  {
    this.label = label;
  }
  public boolean isEnEvaluation()
  {
    return enEvaluation;
  }
  public void setEnEvaluation(boolean enEvaluation)
  {
    this.enEvaluation = enEvaluation;
  }
  public boolean isEvaluable()
  {
    return evaluable;
  }
  public void setEvaluable(boolean evaluable)
  {
    this.evaluable = evaluable;
  }

  public boolean isEvaluateur()
  {
    return evaluateur;
  }

  public void setEvaluateur(boolean evaluateur)
  {
    this.evaluateur = evaluateur;
  }
  
   
}