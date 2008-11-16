package fr.croixrouge.irp.services.delegate.DispositifInterventionDelegate;

import java.util.Date;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import fr.croixrouge.irp.model.monitor.Dispositif;
import fr.croixrouge.irp.model.monitor.InterventionTicket;
import fr.croixrouge.irp.model.monitor.Position;
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

    if(logger.isDebugEnabled())
      logger.debug("constructor called");
  }
  
  /**
   * Gère l'action sur un dispositif (affectation, départ, arrivé sur place etc..)
   * 
   * La cinématique de changement (d'état et d'adresse) standard est la suivante : 
   *  
   * Synthèse des modification apportées au dispositif et à l'intervention au cours des changements d'états 
   * 
   * Création du dispositif :
   * 
   * currentAddresse = Adresse Saisie
   * previousAddresse = NULL
   * 
   * Affectation d'une inter :
   * 
   * Date Réception(Inter/Dispositif) = Date courante  
   * Etat = 2
   * currentAddresse = Inchangé
   * previousAddresse = inchangé
   * dispositif.currentInterId = id Inter
   * intervention.idDispositif = id dispositif
   * 
   * Parti :
   * 
   * Date Départ(Inter/Dispositif) = Date courante
   * Etat = 3
   * currentAddresse : Addresse Intervention
   * previousAddresse: Adresse précédente
   * 
   * Sur place :
   * Etat = 4 
   * currentAddresse : Inchangé
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
   * previousAddresse : inchangé
   *
   * Arrivé a l'hopital : 
   * 
   * Etat = 8
   * currentAddresse : inchangé
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
      logger.debug("\"Action Button\" pushed for intervention="+idIntervention+", dispositif="+idDispositif+", regulation="+idRegulation);

    Dispositif dispositif         = this.dispositifService.getDispositif      (idRegulation, idDispositif);
    int        idEtatDispositif   = dispositif            .getIdEtatDispositif();
    Date       actionDate         = new Date();
    
    if(idEtatDispositif < 1)
    {
      if(logger.isDebugEnabled())
        logger.debug("Action is : set Dispotitif to etat 1 disponible for dispositif="+idDispositif+", regulation="+idRegulation+" with idEtatDispositif = "+idEtatDispositif+" < 1 => setting idEtatDispositif to 1 == disponible");

      this.dispositifService  .actionOnDispositif(idDispositif, 1, actionDate);
      
      if(logger.isDebugEnabled())
      {
        logger.debug("DONE      : set Dispotitif to etat 1 disponible for dispositif="+idDispositif+", regulation="+idRegulation+" with idEtatDispositif = "+idEtatDispositif+" < 1 => setting idEtatDispositif to 1 == disponible");
        logger.debug("\"Action Button\" pushed DONE : for intervention="+idIntervention+", dispositif="+idDispositif+", regulation="+idRegulation);        
      }
      return;
    }
    
    InterventionTicket  interventionTicket = null;
    
    if(dispositif.getIdEtatDispositif() == 1)//A l'état 1 pour le dispositif, l'intervention n'est pas encore affecté (c'est justement ce qu'on fait... l'affectation)
      interventionTicket = this.interventionService.getInterventionTicket(idIntervention);
    else
      interventionTicket = dispositif.getCurrentIntervention();
    
    if(interventionTicket == null || interventionTicket.getIdEtat() == 0)
      throw new Exception("Le dispositif n'as pas d'intervention affectée");
    
   
    int idEtatIntervention = interventionTicket.getIdEtat          ();
    
    if(idEtatDispositif < 1 || idEtatDispositif > 8)
      throw new Exception("L'état du dispositif ne permet pas d'effectuer cette opération idEtatDispositif="+idEtatDispositif);
    
    if(idEtatDispositif != idEtatIntervention)
      throw new Exception("L'état du dispositif est différent de l'état de l'intervention. idEtatIntervention="+idEtatIntervention+" idEtatDispositif="+idEtatDispositif);

    
    if(idEtatDispositif == 1)
    {//Affectation de l'intervention au dispositif
      
      if(logger.isDebugEnabled())
        logger.debug("Action is 'Affectation Intervention au dispositif' on intervention="+idIntervention+", dispositif="+idDispositif+", regulation="+idRegulation);

      this.dispositifService  .affectInterventionToDispositif(idIntervention, idDispositif, actionDate);
      this.interventionService.affectInterventionToDispositif(idIntervention, idDispositif, actionDate);
      
      if(logger.isDebugEnabled())
        logger.debug("DONE    : 'Affectation Intervention au dispositif' on intervention="+idIntervention+", dispositif="+idDispositif+", regulation="+idRegulation);

    }
    else if(idEtatDispositif == 2)
    {//Parti
      if(logger.isDebugEnabled())
        logger.debug("Action is 'Dispositif Parti' on intervention="+idIntervention+", dispositif="+idDispositif+", regulation="+idRegulation);

      this.dispositifService  .actionOnDispositif            (idDispositif  , idEtatDispositif+1              , actionDate);
      this.interventionService.actionOnIntervention          (idIntervention, idEtatDispositif+1              , actionDate);
      this.dispositifService  .updateDispositifPosition      (idDispositif  , interventionTicket.getPosition(), dispositif.getCurrentPosition());
      
      if(logger.isDebugEnabled())
        logger.debug("DONE    : 'Dispositif Parti' on intervention="+idIntervention+", dispositif="+idDispositif+", regulation="+idRegulation);
    }
    else if(idEtatDispositif == 3)
    {//SurPlace 
      
      if(logger.isDebugEnabled())
        logger.debug("Action is 'Dispositif se présente' on intervention="+idIntervention+", dispositif="+idDispositif+", regulation="+idRegulation);

      this.dispositifService  .actionOnDispositif            (idDispositif  , idEtatDispositif+1, actionDate);
      this.interventionService.actionOnIntervention          (idIntervention, idEtatDispositif+1, actionDate);
      this.dispositifService  .updateDispositifPosition      (idDispositif  , null              , interventionTicket.getPosition());
      
      if(logger.isDebugEnabled())
        logger.debug("DONE    : 'Dispositif se présente' on intervention="+idIntervention+", dispositif="+idDispositif+", regulation="+idRegulation);

    }
    else if(idEtatDispositif == 4)
    {//Bilan Primaire 
      if(logger.isDebugEnabled())
        logger.debug("Action is 'Dispositif passe son primaire' on intervention="+idIntervention+", dispositif="+idDispositif+", regulation="+idRegulation);

      this.dispositifService  .actionOnDispositif   (idDispositif  , idEtatDispositif+1, actionDate);
      this.interventionService.actionOnIntervention (idIntervention, idEtatDispositif+1, actionDate);
      
      if(logger.isDebugEnabled())
        logger.debug("DONE    : 'Dispositif passe son primaire' on intervention="+idIntervention+", dispositif="+idDispositif+", regulation="+idRegulation);

    }
    else if(idEtatDispositif == 5)
    {//Bilan Secondaire 
      if(logger.isDebugEnabled())
        logger.debug("Action is 'Dispositif passe son secondaire' on intervention="+idIntervention+", dispositif="+idDispositif+", regulation="+idRegulation);

      this.dispositifService  .actionOnDispositif   (idDispositif  , idEtatDispositif+1, actionDate);
      this.interventionService.actionOnIntervention (idIntervention, idEtatDispositif+1, actionDate);
      
      if(logger.isDebugEnabled())
        logger.debug("DONE    : 'Dispositif passe son secondaire' on intervention="+idIntervention+", dispositif="+idDispositif+", regulation="+idRegulation);

    }
    else if(idEtatDispositif == 6)
    {//Quitte les lieux => choisi hoptial destination
      
      /*Séquencement : 
       * 
       * Lorsque l'utilisateur clic sur Action, 
       * on affiche la listes des hopitaux de paris(ou adresse en saisie libre, dans ce cas, on met 0 pour evac_hopital_destination),
       * il choisi ou saisie, 
       * update ajax met a jour l'inter, le dispositif et appel cette méthode. 
       * 
       * currentPosition et previousPosition sont déja correct
       */
      
      if(logger.isDebugEnabled())
        logger.debug("Action is 'Dispositif quitte les lieux' on intervention="+idIntervention+", dispositif="+idDispositif+", regulation="+idRegulation);

      this.dispositifService  .actionOnDispositif       (idDispositif  , idEtatDispositif+1, actionDate);
      this.interventionService.actionOnIntervention     (idIntervention, idEtatDispositif+1, actionDate);
      //a ce moment, dispositif.getCurrentPosition contiendra la position de l'hopital.
      //          et dispositif.getPreviousPosition contiendra la position de l'intervention
      if(logger.isDebugEnabled())
        logger.debug("DONE    : 'Dispositif quitte les lieux' on intervention="+idIntervention+", dispositif="+idDispositif+", regulation="+idRegulation);
    }
    else if(idEtatDispositif == 7)
    {//Arrive à l'hopital
      if(logger.isDebugEnabled())
        logger.debug("Action is 'Dispositif arrive a l'hopital' on intervention="+idIntervention+", dispositif="+idDispositif+", regulation="+idRegulation);

      this.dispositifService  .actionOnDispositif       (idDispositif  , idEtatDispositif+1, actionDate);
      this.interventionService.actionOnIntervention     (idIntervention, idEtatDispositif+1, actionDate);
      //a ce moment, dispositif.getCurrentPosition contiendra la position de l'hopital.
      //         On change previousPosition a l'addresse de l'hopital pour signifier que le dispositif n'est plus en mouvement.
      this.dispositifService  .updateDispositifPosition (idDispositif  , null, dispositif.getCurrentPosition());
      
      if(logger.isDebugEnabled())
        logger.debug("DONE    : 'Dispositif arrive a l'hopital' on intervention="+idIntervention+", dispositif="+idDispositif+", regulation="+idRegulation);
    }
    else if(idEtatDispositif == 8)
    {//Inter terminée
      if(logger.isDebugEnabled())
        logger.debug("Action is 'Intervention Terminée' on intervention="+idIntervention+", dispositif="+idDispositif+", regulation="+idRegulation);

      this.dispositifService  .actionOnDispositif       (idDispositif  , idEtatDispositif+1, actionDate);
      this.interventionService.actionOnIntervention     (idIntervention, idEtatDispositif+1, actionDate);

      //currentInter Id est ré initialisé a vide.
      
      if(logger.isDebugEnabled())
        logger.debug("DONE    : 'Intervention Terminée' on intervention="+idIntervention+", dispositif="+idDispositif+", regulation="+idRegulation);
    }
    
    if(logger.isDebugEnabled())
      logger.debug("\"Action Button\" pushed DONE : for intervention="+idIntervention+", dispositif="+idDispositif+", regulation="+idRegulation);

  }

  
  /**
   * Met a jour l'intervention avec l'hoptial choisi ou l'addresse spécifique
   * Met a jour la previous position du dispositif avec sa current Position
   * Met a jour la current position avec l'adresse destination
   * */
  public void chooseEvacDestination(int idRegulation, int idIntervention, int idDispositif, int idLieu, String destinationLabel, Position position) throws Exception
  {
    this.interventionService.chooseEvacDestination(idIntervention, idLieu, destinationLabel, position);
    Dispositif dispositif = this.dispositifService.getDispositif(idRegulation, idDispositif);
    this.dispositifService.updateDispositifPosition(idDispositif, position, dispositif.getCurrentPosition());
  }
  
  public void endOfIntervention(int idRegulation, int idIntervention, int idDispositif) throws Exception
  {
    Date actionDate = new Date();                                      //8=arrivé hopital => 8+1=9 : inter terminée
    this.interventionService.actionOnIntervention     (idIntervention, 8+1, actionDate);
    this.dispositifService  .actionOnDispositif       (idDispositif  , 8+1, actionDate);//Pour l'historisation du changement d'état
    this.dispositifService  .actionEndOfIntervention  (idDispositif                   );
  }
}