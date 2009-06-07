package fr.croixrouge.rdp.model.monitor;

import java.util.Date;
import java.util.List;

public class Regulation extends CrfDto
{
  private static final long serialVersionUID = -4623749623013839801L;
  private int               regulationId;
  private Date              startDate;
  private Date              expectedEndDate;
  
  private String            startDateStr;
  private String 			      expectedEndDateStr;
  
  private boolean           open;
  private User              regulateur;
  private String            label;
  private String            comment;
  
  private List<User>        coRegulateurs;
  
  
  @Override
  public String toString()
  {
    StringBuffer buffer = new StringBuffer("\nRégulation id='");
    
    buffer.append(regulationId);
    buffer.append("'\nstartDate='");
    buffer.append(dateFormatter.format(startDate));
    buffer.append("'\nexpectedEndDate='");
    buffer.append(dateFormatter.format(expectedEndDate));
    buffer.append("'\nopen='");
    buffer.append(open);
    buffer.append("'\n");
    buffer.append(regulateur);
    buffer.append("\nlabel='");
    buffer.append(label);
    buffer.append("'\ncomment:\n-------------\n");
    buffer.append(comment);
    buffer.append("'\n-------------\n");
    return buffer.toString();
  }
  
  public String getComment()
  {
    return comment;
  }

  public void setComment(String comment)
  {
    this.comment = comment;
  }

  public Date getExpectedEndDate()
  {
    return expectedEndDate;
  }

  public void setExpectedEndDate(Date expectedEndDate)
  {
    this.expectedEndDate = expectedEndDate;
  }

  public int getRegulationId()
  {
    return regulationId;
  }

  public void setRegulationId(int idRegulation)
  {
    this.regulationId = idRegulation;
  }

  public String getLabel()
  {
    return label;
  }

  public void setLabel(String label)
  {
    this.label = label;
  }

  public boolean isOpen()
  {
    return open;
  }

  public void setOpen(boolean open)
  {
    this.open = open;
  }

  public User getRegulateur()
  {
    return regulateur;
  }

  public void setRegulateur(User regulateur)
  {
    this.regulateur = regulateur;
  }

  public Date getStartDate()
  {
    return startDate;
  }

  public void setStartDate(Date startDate)
  {
    this.startDate = startDate;
  }

public String getExpectedEndDateStr() {
	return expectedEndDateStr;
}

public void setExpectedEndDateStr(String expectedEndDateStr) {
	this.expectedEndDateStr = expectedEndDateStr;
}

public String getStartDateStr() {
	return startDateStr;
}

public void setStartDateStr(String startDateStr) {
	this.startDateStr = startDateStr;
}

public List<User> getCoRegulateurs()
{
  return coRegulateurs;
}

public void setCoRegulateurs(List<User> coRegulateurs)
{
  this.coRegulateurs = coRegulateurs;
}

}
