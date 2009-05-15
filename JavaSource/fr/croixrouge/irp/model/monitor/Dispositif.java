package fr.croixrouge.irp.model.monitor;

import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Dispositif implements Serializable
{
  private static final long serialVersionUID = -7396645401166837188L;


  public Dispositif()
  {
    this.currentIntervention  = new InterventionTicket();
    this.currentPosition      = new Position();
    this.previousPosition     = new Position();
    this.equipierCi           = new Equipier();
    this.otherInterventions   = new HashMap<Integer, InterventionTicket>();
  }
  
  private int             idDispositif;
  private int             idTypeDispositif;
  private float           o2B1Volume;
  private float           o2B1Pression;
  private float           o2B2Volume;
  private float           o2B2Pression;
  private float           o2B3Volume;
  private float           o2B3Pression;
  private float           o2B4Volume;
  private float           o2B4Pression;
  private float           o2B5Volume;
  private float           o2B5Pression;

  private boolean         dispositifBackWith3Girls;
  private boolean         dispositifNotEnoughO2;
  private boolean         dispositifSetAvailableWithWarning;
  private boolean         creationTerminee;
  private boolean         actif;
  private boolean         dsaComplet;

  private Date            dhDebut;
  private Date            dhFin;

  private String          indicatifVehicule;
  private String          dispositifComment;
  private String          dsaType;
  private String          observation;
  private String          dhDebutStr;
  private String          dhFinStr;
  private int             idDelegation;
  private String          autreDelegation;
  private String          contactRadio;
  private String          contactTel1;
  private String          contactTel2;
  private String          contactAlphapage;
  private String          identiteMedecin;
  private int             idEtatDispositif;
  
  private int             currentInterId;
  
  
  
  
  private int             displayState;
  
  private Position currentPosition ;
  private Position previousPosition;
  
  private Date dhReception            ;
  private Date dhDepart               ;
  private Date dhSurPlace             ;
  private Date dhBilanPrimaire        ;
  private Date dhBilanSecondaire      ;
  private Date dhQuitteLesLieux       ;
  private Date dhArriveeHopital       ;
  private Date dhDispo                ;
  private Date dhASaBase              ;
  private Date dhAppelRenfortMedical  ;
  private Date dhArriveeRenfortMedical;

  private List<Equipier> equipierList = null;
  
  private Equipier           equipierCi;
  private InterventionTicket currentIntervention;
  private Map<Integer, InterventionTicket> otherInterventions;
 
  public Equipier getEquipierCi()
  {
    return equipierCi;
  }
  public void setEquipierCi(Equipier equipierCi)
  {
    this.equipierCi = equipierCi;
  }
  public InterventionTicket getCurrentIntervention()
  {
    return currentIntervention;
  }
  public void setCurrentIntervention(InterventionTicket currentIntervention)
  {
    this.currentIntervention = currentIntervention;
  }
  public String getContactAlphapage()
  {
    return contactAlphapage;
  }
  public void setContactAlphapage(String contactAlphapage)
  {
    this.contactAlphapage = contactAlphapage;
  }
  public String getContactRadio()
  {
    return contactRadio;
  }
  public void setContactRadio(String contactRadio)
  {
    this.contactRadio = contactRadio;
  }
  public String getContactTel1()
  {
    return contactTel1;
  }
  public void setContactTel1(String contactTel1)
  {
    this.contactTel1 = contactTel1;
  }
  public String getContactTel2()
  {
    return contactTel2;
  }
  public void setContactTel2(String contactTel2)
  {
    this.contactTel2 = contactTel2;
  }
  public Date getDhDebut()
  {
    return dhDebut;
  }
  public void setDhDebut(Date dhDebut)
  {
    this.dhDebut = dhDebut;
  }
  public Date getDhFin()
  {
    return dhFin;
  }
  public void setDhFin(Date dhFin)
  {
    this.dhFin = dhFin;
  }

  public boolean isDsaComplet()
  {
    return dsaComplet;
  }
  public void setDsaComplet(boolean dsaComplet)
  {
    this.dsaComplet = dsaComplet;
  }
  public int getIdDispositif()
  {
    return idDispositif;
  }
  public void setIdDispositif(int idDispositif)
  {
    this.idDispositif = idDispositif;
  }
  public String getIdentiteMedecin()
  {
    return identiteMedecin;
  }
  public void setIdentiteMedecin(String identiteMedecin)
  {
    this.identiteMedecin = identiteMedecin;
  }
  public String getIndicatifVehicule()
  {
    return indicatifVehicule;
  }
  public void setIndicatifVehicule(String indicatifVehicule)
  {
    this.indicatifVehicule = indicatifVehicule;
  }
  public float getO2B1Pression()
  {
    return o2B1Pression;
  }
  public void setO2B1Pression(float pression)
  {
    o2B1Pression = pression;
  }
  public float getO2B1Volume()
  {
    return o2B1Volume;
  }
  public void setO2B1Volume(float volume)
  {
    o2B1Volume = volume;
  }
  public float getO2B2Pression()
  {
    return o2B2Pression;
  }
  public void setO2B2Pression(float pression)
  {
    o2B2Pression = pression;
  }
  public float getO2B2Volume()
  {
    return o2B2Volume;
  }
  public void setO2B2Volume(float volume)
  {
    o2B2Volume = volume;
  }
  public float getO2B3Pression()
  {
    return o2B3Pression;
  }
  public void setO2B3Pression(float pression)
  {
    o2B3Pression = pression;
  }
  public float getO2B3Volume()
  {
    return o2B3Volume;
  }
  public void setO2B3Volume(float volume)
  {
    o2B3Volume = volume;
  }
  public String getObservation()
  {
    return observation;
  }
  public void setObservation(String observation)
  {
    this.observation = observation;
  }
  public String getDsaType()
  {
    return dsaType;
  }
  public void setDsaType(String dsaType)
  {
    this.dsaType = dsaType;
  }
  public String getAutreDelegation()
  {
    return autreDelegation;
  }
  public void setAutreDelegation(String autreDelegation)
  {
    this.autreDelegation = autreDelegation;
  }
  public String getDhDebutStr()
  {
    return dhDebutStr;
  }
  public void setDhDebutStr(String dhDebutStr)
  {
    this.dhDebutStr = dhDebutStr;
  }
  public String getDhFinStr()
  {
    return dhFinStr;
  }
  public void setDhFinStr(String dhFinStr)
  {
    this.dhFinStr = dhFinStr;
  }
  public int getCurrentInterId()
  {
    return currentInterId;
  }
  public void setCurrentInterId(int currentInterId)
  {
    this.currentInterId = currentInterId;
  }
  public int getDisplayState()
  {
    return displayState;
  }
  public void setDisplayState(int displayState)
  {
    this.displayState = displayState;
  }
  public List<Equipier> getEquipierList()
  {
    return equipierList;
  }
  public void setEquipierList(List<Equipier> equipierList)
  {
    this.equipierList = equipierList;
  }
  public int getIdDelegation()
  {
    return idDelegation;
  }
  public void setIdDelegation(int idDelegation)
  {
    this.idDelegation = idDelegation;
  }
  public int getIdEtatDispositif()
  {
    return idEtatDispositif;
  }
  public void setIdEtatDispositif(int idEtatDispositif)
  {
    this.idEtatDispositif = idEtatDispositif;
  }
  public int getIdTypeDispositif()
  {
    return idTypeDispositif;
  }
  public void setIdTypeDispositif(int idTypeDispositif)
  {
    this.idTypeDispositif = idTypeDispositif;
  }
  public boolean isDispositifBackWith3Girls()
  {
    return dispositifBackWith3Girls;
  }
  public void setDispositifBackWith3Girls(boolean dispositifBackWith3Girls)
  {
    this.dispositifBackWith3Girls = dispositifBackWith3Girls;
  }
  public String getDispositifComment()
  {
    return dispositifComment;
  }
  public void setDispositifComment(String dispositifComment)
  {
    this.dispositifComment = dispositifComment;
  }
  public boolean isDispositifNotEnoughO2()
  {
    return dispositifNotEnoughO2;
  }
  public void setDispositifNotEnoughO2(boolean dispositifNotEnoughO2)
  {
    this.dispositifNotEnoughO2 = dispositifNotEnoughO2;
  }
  public boolean isDispositifSetAvailableWithWarning()
  {
    return dispositifSetAvailableWithWarning;
  }
  public void setDispositifSetAvailableWithWarning(boolean dispositifSetAvailableWithWarning)
  {
    this.dispositifSetAvailableWithWarning = dispositifSetAvailableWithWarning;
  }
  public float getO2B4Pression()
  {
    return o2B4Pression;
  }
  public void setO2B4Pression(float pression)
  {
    o2B4Pression = pression;
  }
  public float getO2B4Volume()
  {
    return o2B4Volume;
  }
  public void setO2B4Volume(float volume)
  {
    o2B4Volume = volume;
  }
  public float getO2B5Pression()
  {
    return o2B5Pression;
  }
  public void setO2B5Pression(float pression)
  {
    o2B5Pression = pression;
  }
  public float getO2B5Volume()
  {
    return o2B5Volume;
  }
  public void setO2B5Volume(float volume)
  {
    o2B5Volume = volume;
  }
  public Date getDhAppelRenfortMedical()
  {
    return dhAppelRenfortMedical;
  }
  public void setDhAppelRenfortMedical(Date dhAppelRenfortMedical)
  {
    this.dhAppelRenfortMedical = dhAppelRenfortMedical;
  }
  public Date getDhArriveeHopital()
  {
    return dhArriveeHopital;
  }
  public void setDhArriveeHopital(Date dhArriveeHopital)
  {
    this.dhArriveeHopital = dhArriveeHopital;
  }
  public Date getDhArriveeRenfortMedical()
  {
    return dhArriveeRenfortMedical;
  }
  public void setDhArriveeRenfortMedical(Date dhArriveeRenfortMedical)
  {
    this.dhArriveeRenfortMedical = dhArriveeRenfortMedical;
  }
  public Date getDhASaBase()
  {
    return dhASaBase;
  }
  public void setDhASaBase(Date dhASaBase)
  {
    this.dhASaBase = dhASaBase;
  }
  public Date getDhBilanPrimaire()
  {
    return dhBilanPrimaire;
  }
  public void setDhBilanPrimaire(Date dhBilanPrimaire)
  {
    this.dhBilanPrimaire = dhBilanPrimaire;
  }
  public Date getDhBilanSecondaire()
  {
    return dhBilanSecondaire;
  }
  public void setDhBilanSecondaire(Date dhBilanSecondaire)
  {
    this.dhBilanSecondaire = dhBilanSecondaire;
  }
  public Date getDhDepart()
  {
    return dhDepart;
  }
  public void setDhDepart(Date dhDepart)
  {
    this.dhDepart = dhDepart;
  }
  public Date getDhDispo()
  {
    return dhDispo;
  }
  public void setDhDispo(Date dhDispo)
  {
    this.dhDispo = dhDispo;
  }
  public Date getDhQuitteLesLieux()
  {
    return dhQuitteLesLieux;
  }
  public void setDhQuitteLesLieux(Date dhQuitteLesLieux)
  {
    this.dhQuitteLesLieux = dhQuitteLesLieux;
  }
  public Date getDhReception()
  {
    return dhReception;
  }
  public void setDhReception(Date dhReception)
  {
    this.dhReception = dhReception;
  }
  public Date getDhSurPlace()
  {
    return dhSurPlace;
  }
  public void setDhSurPlace(Date dhSurPlace)
  {
    this.dhSurPlace = dhSurPlace;
  }
  public boolean isCreationTerminee()
  {
    return creationTerminee;
  }
  public void setCreationTerminee(boolean creationTerminee)
  {
    this.creationTerminee = creationTerminee;
  }
  public Position getCurrentPosition()
  {
    return currentPosition;
  }
  public void setCurrentPosition(Position currentPosition)
  {
    this.currentPosition = currentPosition;
  }
  public Position getPreviousPosition()
  {
    return previousPosition;
  }
  public void setPreviousPosition(Position previousPosition)
  {
    this.previousPosition = previousPosition;
  }
  public boolean isActif()
  {
    return actif;
  }
  public void setActif(boolean actif)
  {
    this.actif = actif;
  }
  public Map<Integer, InterventionTicket> getOtherInterventions()
  {
    return otherInterventions;
  }
  public void setOtherInterventions(Map<Integer, InterventionTicket> otherInterventions)
  {
    this.otherInterventions = otherInterventions;
  }

}