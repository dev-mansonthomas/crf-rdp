package fr.croixrouge.irp.services.delegate.DispositifInterventionDelegate;

import java.util.Date;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import fr.croixrouge.irp.model.monitor.Dispositif;
import fr.croixrouge.irp.model.monitor.Intervention;
import fr.croixrouge.irp.services.dispositif.DispositifService;
import fr.croixrouge.irp.services.intervention.InterventionService;

public class DispositifInterventionDelegateImpl implements DispositifInterventionDelegate
{
  private static Log          logger              = LogFactory.getLog(DispositifInterventionDelegateImpl.class);
  
  private DispositifService   dispositifService   = null;
  private InterventionService interventionService = null;
  
  public DispositifInterventionDelegateImpl(DispositifService dispositifService, InterventionService interventionService)
  {
    this.dispositifService  = dispositifService;
    this.interventionService= interventionService;
  }
  
  /**
   * G�re l'action sur un dispositif (affectation, d�part, arriv� sur place etc..)
   * 
   * La cin�matique de changement (d'�tat et d'adresse) standard est la suivante : 
   *  
   * Synth�se des modification apport�es au dispositif et � l'intervention au cours des changements d'�tats 
   * 
   * Cr�ation du dispositif :
   * 
   * currentAddresse = Adresse Saisie
   * previousAddresse = NULL
   * 
   * Affectation d'une inter :
   * 
   * Date R�ception(Inter/Dispositif) = Date courante  
   * Etat = 2
   * currentAddresse = Inchang�
   * previousAddresse = inchang�
   * dispositif.currentInterId = id Inter
   * intervention.idDispositif = id dispositif
   * 
   * Parti :
   * 
   * Date D�part(Inter/Dispositif) = Date courante
   * Etat = 3
   * currentAddresse : Addresse Intervention
   * previousAddresse: Adresse pr�c�dente
   * 
   * Sur place :
   * Etat = 4 
   * currentAddresse : Inchang�
   * previousAddresse: Adresse Intervention
   * 
   * Primaire
   * Etat = 5 
   * CurrentAddress & Previous Addresse : no change
   * 
   * Secondaire 
   * Etat = 6 
   * CurrentAddress & Previous Addresse : no change
   * 
   * Transport(quitte les lieux) : 
   *            
   * Etat = 7
   * currentAddresse : Adresse Hopital Intervention
   * previousAddresse : inchang�
   *
   * Arriv� a l'hopital : 
   * 
   * Etat = 8
   * currentAddresse : inchang�
   * previousAddresse : currentAddresse
   * 
   * A sa base : 
   * currentAddresse : base
   * previousAddresse: base
   * 
   * 
   * 
   * */
  public void action(int idRegulation, int idIntervention, int idDispositif) throws Exception
  {
    if(logger.isDebugEnabled())
      logger.debug("Action done on intervention="+idIntervention+", dispositif="+idDispositif+", regulation="+idRegulation);
    Dispositif   dispositif   = this.dispositifService  .getDispositif  (idRegulation, idDispositif);
    Intervention intervention = this.interventionService.getIntervention(idIntervention);
    
    int idEtatDispositif   = dispositif  .getIdEtatDispositif();
    int idEtatIntervention = intervention.getIdEtat          ();
    
    if(idEtatDispositif < 1 || idEtatDispositif > 7)
      throw new Exception("L'�tat du dispositif ne permet pas d'effectuer cette op�ration idEtatDispositif="+idEtatDispositif);
    
    if(idEtatDispositif != idEtatIntervention)
      throw new Exception("L'�tat du dispositif est diff�rent de l'�tat de l'intervention. idEtatIntervention="+idEtatIntervention+" idEtatDispositif="+idEtatDispositif);

    Date actionDate = new Date();
    if(idEtatDispositif == 1)
    {//Affectation de l'intervention au dispositif
      
      if(logger.isDebugEnabled())
        logger.debug("Action is 'Affectation Intervention au dispositif' on intervention="+idIntervention+", dispositif="+idDispositif+", regulation="+idRegulation);

      this.dispositifService  .affectInterventionToDispositif(idIntervention, idDispositif, actionDate);
      this.interventionService.affectInterventionToDispositif(idIntervention, idDispositif, actionDate);
      
      if(logger.isDebugEnabled())
        logger.debug("Action is DONE : 'Affectation Intervention au dispositif' on intervention="+idIntervention+", dispositif="+idDispositif+", regulation="+idRegulation);

    }
    else if(idEtatDispositif == 2)
    {//Parti
      if(logger.isDebugEnabled())
        logger.debug("Action is 'Dispositif Parti' on intervention="+idIntervention+", dispositif="+idDispositif+", regulation="+idRegulation);

      this.dispositifService  .actionOnDispositif            (idDispositif  , idEtatDispositif+1, actionDate);
      this.interventionService.affectInterventionToDispositif(idIntervention, idEtatDispositif+1, actionDate);
      this.dispositifService  .updateDispositifPosition      (idDispositif  , intervention.getPosition(), dispositif.getPreviousPosition());
      
      if(logger.isDebugEnabled())
        logger.debug("Action is DONE : 'Dispositif Parti' on intervention="+idIntervention+", dispositif="+idDispositif+", regulation="+idRegulation);
    }
    else if(idEtatDispositif == 3)
    {//SurPlace 
      
      if(logger.isDebugEnabled())
        logger.debug("Action is 'Dispositif se pr�sente' on intervention="+idIntervention+", dispositif="+idDispositif+", regulation="+idRegulation);

      this.dispositifService  .actionOnDispositif            (idDispositif  , idEtatDispositif+1, actionDate);
      this.interventionService.affectInterventionToDispositif(idIntervention, idEtatDispositif+1, actionDate);
      this.dispositifService  .updateDispositifPosition      (idDispositif  , null, intervention.getPosition());
      
      if(logger.isDebugEnabled())
        logger.debug("Action is DONE : 'Dispositif se pr�sente' on intervention="+idIntervention+", dispositif="+idDispositif+", regulation="+idRegulation);

    }
    else if(idEtatDispositif == 4)
    {//Bilan Primaire 
      if(logger.isDebugEnabled())
        logger.debug("Action is 'Dispositif passe son primaire' on intervention="+idIntervention+", dispositif="+idDispositif+", regulation="+idRegulation);

      this.dispositifService  .actionOnDispositif            (idDispositif  , idEtatDispositif+1, actionDate);
      this.interventionService.affectInterventionToDispositif(idIntervention, idEtatDispositif+1, actionDate);
      
      if(logger.isDebugEnabled())
        logger.debug("Action is DONE : 'Dispositif passe son primaire' on intervention="+idIntervention+", dispositif="+idDispositif+", regulation="+idRegulation);

    }
    else if(idEtatDispositif == 5)
    {//Bilan Secondaire 
      if(logger.isDebugEnabled())
        logger.debug("Action is 'Dispositif passe son secondaire' on intervention="+idIntervention+", dispositif="+idDispositif+", regulation="+idRegulation);

      this.dispositifService  .actionOnDispositif            (idDispositif  , idEtatDispositif+1, actionDate);
      this.interventionService.affectInterventionToDispositif(idIntervention, idEtatDispositif+1, actionDate);
      
      if(logger.isDebugEnabled())
        logger.debug("Action is DONE : 'Dispositif passe son secondaire' on intervention="+idIntervention+", dispositif="+idDispositif+", regulation="+idRegulation);

    }
    else if(idEtatDispositif == 6)
    {//Quitte les lieux 
      if(logger.isDebugEnabled())
        logger.debug("Action is 'Dispositif quitte les lieux' on intervention="+idIntervention+", dispositif="+idDispositif+", regulation="+idRegulation);

      this.dispositifService  .actionOnDispositif            (idDispositif  , idEtatDispositif+1, actionDate);
      this.interventionService.affectInterventionToDispositif(idIntervention, idEtatDispositif+1, actionDate);
      //a ce moment, dispositif.getCurrentPosition contiendra la position de l'hopital.
      //Lorsque l'utilisateur clic sur Action, on affiche la listes des hopitaux de paris(ou adresse en saisie libre, dans ce cas, on met -1 pour evac_hopital_destination), il choisi, update ajax, sur le retour, on appel la m�thode actionOnDispositif
      this.dispositifService  .updateDispositifPosition      (idDispositif  , dispositif.getCurrentPosition(), null);
      
      if(logger.isDebugEnabled())
        logger.debug("Action is DONE : 'Dispositif quitte les lieux' on intervention="+idIntervention+", dispositif="+idDispositif+", regulation="+idRegulation);

    }
    else if(idEtatDispositif == 7)
    {//Arrive � l'hopital
      if(logger.isDebugEnabled())
        logger.debug("Action is 'Dispositif arrive a l'hopital' on intervention="+idIntervention+", dispositif="+idDispositif+", regulation="+idRegulation);

      this.dispositifService  .actionOnDispositif            (idDispositif  , idEtatDispositif+1, actionDate);
      this.interventionService.affectInterventionToDispositif(idIntervention, idEtatDispositif+1, actionDate);
      //a ce moment, dispositif.getCurrentPosition contiendra la position de l'hopital.
      //Lorsque l'utilisateur clic sur Action, on affiche la listes des hopitaux de paris(ou adresse en saisie libre, dans ce cas, on met -1 pour evac_hopital_destination), il choisi, update ajax, sur le retour, on appel la m�thode actionOnDispositif
      this.dispositifService  .updateDispositifPosition      (idDispositif  , dispositif.getCurrentPosition(), null);
      
      if(logger.isDebugEnabled())
        logger.debug("Action is DONE : 'Dispositif arrive a l'hopital' on intervention="+idIntervention+", dispositif="+idDispositif+", regulation="+idRegulation);
    }
    
  }
}
