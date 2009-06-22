package fr.croixrouge.rdp.model.monitor;

import fr.croixrouge.rdp.model.monitor.modelInterface.ListItemInterface;

public class EquipierRole extends CrfDto  implements ListItemInterface
{
  private static final long serialVersionUID = -7926172871308046266L;
 
  private int     id;
  private String  label;
  private boolean enEvalution=false;
  
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
  public boolean isEnEvalution()
  {
    return enEvalution;
  }
  public void setEnEvalution(boolean enEvalution)
  {
    this.enEvalution = enEvalution;
  }
  
   
}