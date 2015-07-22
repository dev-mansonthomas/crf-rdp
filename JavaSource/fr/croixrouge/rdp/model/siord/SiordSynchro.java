package fr.croixrouge.rdp.model.siord;

import fr.croixrouge.rdp.services.utilities.UtilitiesServiceImpl;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;

public class SiordSynchro implements Serializable
{
  private static final long             serialVersionUID = 633701804197010060L;
  private              SimpleDateFormat sdf              = new SimpleDateFormat(UtilitiesServiceImpl.dateTimeSDF);

  private int  idSynchroSiord;
  private int  idSynchroType;
  private Date synchroDateStart;
  private Date synchroDateEnd;
  private int  lastImportedId;
  private int  sucessfullImport;
  private int  warningImport;
  private int  failedImport;

  private int  previousIdSynchroSiord;
  private Date previousSynchroDateEnd;
  private Date previousSynchroDateStart;
  private int  previousLastImportedId;

  @Override
  public String toString()
  {


    return
        "idSynchroSiord          :'" + idSynchroSiord + "'\n" +
            "idSynchroType           :'" + idSynchroType + "'\n" +
            "synchroDateStart        :'"+    (synchroDateStart         == null ?"":sdf.format(synchroDateStart))           +"'\n"+
    "synchroDateEnd          :'"+    (synchroDateEnd           == null ?"":sdf.format(synchroDateEnd  ))           +"'\n"+  
    "lastImportedId          :'"+    lastImportedId                         +"'\n"+  
    "sucessfullImport        :'"+    sucessfullImport                       +"'\n"+  
    "warningImport           :'"+    warningImport                          +"'\n"+  
    "failedImport            :'"+    failedImport                           +"'\n"+  
    "previousIdSynchroSiord  :'"+    previousIdSynchroSiord                 +"'\n"+  
    "previousSynchroDateEnd  :'"+    (previousSynchroDateEnd   == null ?"":sdf.format(previousSynchroDateEnd  ))   +"'\n"+  
    "previousSynchroDateStart:'"+    (previousSynchroDateStart == null ?"":sdf.format(previousSynchroDateStart))   +"'\n"+  
    "previousLastImportedId  :'"+    previousLastImportedId                 +"'\n";

  }
  
  
  public int getIdSynchroSiord()
  {
    return idSynchroSiord;
  }
  public void setIdSynchroSiord(int idSynchroSiord)
  {
    this.idSynchroSiord = idSynchroSiord;
  }
  public int getIdSynchroType()
  {
    return idSynchroType;
  }
  public void setIdSynchroType(int idSynchroType)
  {
    this.idSynchroType = idSynchroType;
  }
  public Date getSynchroDateStart()
  {
    return synchroDateStart;
  }
  public void setSynchroDateStart(Date synchroDateStart)
  {
    this.synchroDateStart = synchroDateStart;
  }
  public Date getSynchroDateEnd()
  {
    return synchroDateEnd;
  }
  public void setSynchroDateEnd(Date synchroDateEnd)
  {
    this.synchroDateEnd = synchroDateEnd;
  }
  public int getLastImportedId()
  {
    return lastImportedId;
  }
  public void setLastImportedId(int lastImportedId)
  {
    this.lastImportedId = lastImportedId;
  }
  public int getSucessfullImport()
  {
    return sucessfullImport;
  }
  public void setSucessfullImport(int sucessfullImport)
  {
    this.sucessfullImport = sucessfullImport;
  }
  public int getWarningImport()
  {
    return warningImport;
  }
  public void setWarningImport(int warningImport)
  {
    this.warningImport = warningImport;
  }
  public int getFailedImport()
  {
    return failedImport;
  }
  public void setFailedImport(int failedImport)
  {
    this.failedImport = failedImport;
  }
  public int getPreviousIdSynchroSiord()
  {
    return previousIdSynchroSiord;
  }
  public void setPreviousIdSynchroSiord(int previousIdSynchroSiord)
  {
    this.previousIdSynchroSiord = previousIdSynchroSiord;
  }

  public int getPreviousLastImportedId()
  {
    return previousLastImportedId;
  }
  public void setPreviousLastImportedId(int previousLastImportedId)
  {
    this.previousLastImportedId = previousLastImportedId;
  }
  public Date getPreviousSynchroDateEnd()
  {
    return previousSynchroDateEnd;
  }
  public void setPreviousSynchroDateEnd(Date previousSynchroDateEnd)
  {
    this.previousSynchroDateEnd = previousSynchroDateEnd;
  }
  public Date getPreviousSynchroDateStart()
  {
    return previousSynchroDateStart;
  }
  public void setPreviousSynchroDateStart(Date previousSynchroDateStart)
  {
    this.previousSynchroDateStart = previousSynchroDateStart;
  }

  
}
