package fr.croixrouge.rdp.services.delegate.DispositifInterventionDelegate;

import java.util.Date;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.directwebremoting.ScriptBuffer;

import fr.croixrouge.rdp.model.monitor.Dispositif;
import fr.croixrouge.rdp.model.monitor.InterventionTicket;
import fr.croixrouge.rdp.model.monitor.Position;
import fr.croixrouge.rdp.model.monitor.dwr.DataForCloneIntervention;
import fr.croixrouge.rdp.services.dispositif.DispositifService;
import fr.croixrouge.rdp.services.dwr.DWRUtils;
import fr.croixrouge.rdp.services.intervention.InterventionService;

public class DispositifInterventionDelegateImpl extends DWRUtils implements DispositifInterventionDelegate
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
   * Retourne true si on doit supprimer l'intervention des interventions a affecter.
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
  public void action(int idRegulation, int idDispositif) throws Exception
  {
    if(logger.isDebugEnabled())
      logger.debug("\"Action Button\" pushed for dispositif="+idDispositif+", regulation="+idRegulation);
    
    Dispositif                dispositif         = this.dispositifService.getDispositif      (idRegulation, idDispositif);
    int                       idEtatDispositif   = dispositif            .getIdEtatDispositif();
    Date                      actionDate         = new Date();
    List<InterventionTicket>  interventions      = dispositif.getInterventions();

    if(idEtatDispositif < 1)
    {
      if(logger.isDebugEnabled())
        logger.debug("Action is : set Dispotitif to etat 1 disponible for dispositif="+idDispositif+", regulation="+idRegulation+" with idEtatDispositif = "+idEtatDispositif+" < 1 => setting idEtatDispositif to 1 == disponible");

      this.dispositifService  .actionOnDispositif(idDispositif, 1, actionDate);
      
      if(logger.isDebugEnabled())
      {
        logger.debug("DONE      : set Dispotitif to etat 1 disponible for dispositif="+idDispositif+", regulation="+idRegulation+" with idEtatDispositif = "+idEtatDispositif+" < 1 => setting idEtatDispositif to 1 == disponible");
        logger.debug("\"Action Button\" pushed DONE : for dispositif="+idDispositif+", regulation="+idRegulation);
      }
      return;
    }
    String                    interventionsIds   = this.interventionService.generateIdsList(interventions);    
    InterventionTicket  firstIntervention = null;
    if(interventions.size() > 0)
    firstIntervention = interventions.get(0);
    
    
    if(firstIntervention == null || firstIntervention.getIdEtat() == 0)
      throw new Exception("Le dispositif n'as pas d'intervention affectée");
    
    //on suppose que toutes les interventions sont au meme état
    int idEtatIntervention = firstIntervention.getIdEtat          ();
    
    //ON vérifie que toutes les interventions sont dans le meme état
    for (InterventionTicket interventionTicket : interventions)
    {
      if(interventionTicket.getIdEtat() != idEtatIntervention)
        throw new Exception("les interventions d'id "+interventionsIds+" associées au dispositif "+idDispositif+" n'ont pas tous le même état");
    }

    
    
    if(idEtatDispositif < 1 || idEtatDispositif > 8)
      throw new Exception("L'état du dispositif ne permet pas d'effectuer cette opération idEtatDispositif="+idEtatDispositif);
    
    if(idEtatDispositif != idEtatIntervention)
      throw new Exception("L'état du dispositif est différent de l'état de l'intervention. idEtatIntervention="+idEtatIntervention+" idEtatDispositif="+idEtatDispositif);


    if(idEtatDispositif == 1)
    {//Affectation de l'intervention au dispositif
      throw new Exception("Wrong dispositif state (1), affectation has its own method.");
    }
    else if(idEtatDispositif == 2)
    {//Parti
      if(logger.isDebugEnabled())
        logger.debug("Action is 'Dispositif Parti' on intervention="+interventionsIds+", dispositif="+idDispositif+", regulation="+idRegulation);

      this.dispositifService  .actionOnDispositif            (idDispositif  , idEtatDispositif+1              , actionDate);
      this.interventionService.actionOnInterventions         (interventions , idEtatDispositif+1              , actionDate);
      this.dispositifService  .updateDispositifPosition      (idDispositif  , firstIntervention.getPosition(), dispositif.getCurrentPosition());
      
      if(logger.isDebugEnabled())
        logger.debug("DONE    : 'Dispositif Parti' on intervention="+interventionsIds+", dispositif="+idDispositif+", regulation="+idRegulation);
    }
    else if(idEtatDispositif == 3)
    {//SurPlace 
      
      if(logger.isDebugEnabled())
        logger.debug("Action is 'Dispositif se présente' on intervention="+interventionsIds+", dispositif="+idDispositif+", regulation="+idRegulation);

      this.dispositifService  .actionOnDispositif            (idDispositif  , idEtatDispositif+1, actionDate);
      this.interventionService.actionOnInterventions         (interventions , idEtatDispositif+1, actionDate);
      this.dispositifService  .updateDispositifPosition      (idDispositif  , null              , firstIntervention.getPosition());
      
      if(logger.isDebugEnabled())
        logger.debug("DONE    : 'Dispositif se présente' on intervention="+interventionsIds+", dispositif="+idDispositif+", regulation="+idRegulation);

    }
    else if(idEtatDispositif == 4)
    {//Bilan Primaire 
      if(logger.isDebugEnabled())
        logger.debug("Action is 'Dispositif passe son primaire' on intervention="+interventionsIds+", dispositif="+idDispositif+", regulation="+idRegulation);

      this.dispositifService  .actionOnDispositif   (idDispositif  , idEtatDispositif+1, actionDate);
      if(interventions.size() == 1)
        this.interventionService.actionOnIntervention(interventions.get(0).getIdIntervention() , idEtatDispositif+1, actionDate);
      //else : on ne fait rien, pour les multi intervention, on passe les primaires pour chaque inter, puis sur le dispositif
      if(logger.isDebugEnabled())
        logger.debug("DONE    : 'Dispositif passe son primaire' on intervention="+interventionsIds+", dispositif="+idDispositif+", regulation="+idRegulation);

    }
    else if(idEtatDispositif == 5)
    {//Bilan Secondaire 
      if(logger.isDebugEnabled())
        logger.debug("Action is 'Dispositif passe son secondaire' on intervention="+interventionsIds+", dispositif="+idDispositif+", regulation="+idRegulation);

      this.dispositifService  .actionOnDispositif   (idDispositif  , idEtatDispositif+1, actionDate);
      if(interventions.size() == 1)
        this.interventionService.actionOnIntervention(interventions.get(0).getIdIntervention() , idEtatDispositif+1, actionDate);
      //else : on ne fait rien, pour les multi intervention, on passe les primaires pour chaque inter, puis sur le dispositif
      
      if(logger.isDebugEnabled())
        logger.debug("DONE    : 'Dispositif passe son secondaire' on intervention="+interventionsIds+", dispositif="+idDispositif+", regulation="+idRegulation);

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
        logger.debug("Action is 'Dispositif quitte les lieux' on intervention="+interventionsIds+", dispositif="+idDispositif+", regulation="+idRegulation);

      this.dispositifService  .actionOnDispositif       (idDispositif  , idEtatDispositif+1, actionDate);
      this.interventionService.actionOnInterventions    (interventions , idEtatDispositif+1, actionDate);
      //a ce moment, dispositif.getCurrentPosition contiendra la position de l'hopital.
      //          et dispositif.getPreviousPosition contiendra la position de l'intervention
      if(logger.isDebugEnabled())
        logger.debug("DONE    : 'Dispositif quitte les lieux' on intervention="+interventionsIds+", dispositif="+idDispositif+", regulation="+idRegulation);
    }
    else if(idEtatDispositif == 7)
    {//Arrive à l'hopital
      if(logger.isDebugEnabled())
        logger.debug("Action is 'Dispositif arrive a l'hopital' on intervention="+interventionsIds+", dispositif="+idDispositif+", regulation="+idRegulation);

      this.dispositifService  .actionOnDispositif       (idDispositif  , idEtatDispositif+1, actionDate);
      this.interventionService.actionOnInterventions    (interventions , idEtatDispositif+1, actionDate);
      //a ce moment, dispositif.getCurrentPosition contiendra la position de l'hopital.
      //         On change previousPosition a l'addresse de l'hopital pour signifier que le dispositif n'est plus en mouvement.
      this.dispositifService  .updateDispositifPosition (idDispositif  , null, dispositif.getCurrentPosition());
      
      if(logger.isDebugEnabled())
        logger.debug("DONE    : 'Dispositif arrive a l'hopital' on intervention="+interventionsIds+", dispositif="+idDispositif+", regulation="+idRegulation);
    }
    else if(idEtatDispositif == 8)
    {//Inter terminée
      if(logger.isDebugEnabled())
        logger.debug("Action is 'Intervention Terminée' on intervention="+interventionsIds+", dispositif="+idDispositif+", regulation="+idRegulation);

      this.dispositifService  .actionOnDispositif       (idDispositif  , idEtatDispositif+1, actionDate);
      this.interventionService.actionOnInterventions    (interventions , idEtatDispositif+1, actionDate);

      //currentInter Id est ré initialisé a vide.
      
      if(logger.isDebugEnabled())
        logger.debug("DONE    : 'Intervention Terminée' on intervention="+interventionsIds+", dispositif="+idDispositif+", regulation="+idRegulation);
    }
    
    if(logger.isDebugEnabled())
      logger.debug("\"Action Button\" pushed DONE : for intervention="+interventionsIds+", dispositif="+idDispositif+", regulation="+idRegulation);
  }

  
  public void affectInterventionToDispositif(int idRegulation, int idIntervention, int idDispositif, Date actionDate) throws Exception
  {
    if(logger.isDebugEnabled())
      logger.debug("Action is 'Affectation Intervention au dispositif' on intervention="+idIntervention+", dispositif="+idDispositif+", regulation="+idRegulation);

    this.dispositifService  .affectInterventionToDispositif(idDispositif  ,idIntervention, actionDate);
    this.interventionService.affectInterventionToDispositif(idIntervention, idDispositif , actionDate);
    
    if(logger.isDebugEnabled())
      logger.debug("DONE    : 'Affectation Intervention au dispositif' on intervention="+idIntervention+", dispositif="+idDispositif+", regulation="+idRegulation);
  }
  
  
  public void reAffectInterventionToDispositif(int idRegulation, int idIntervention, int idDispositifOrigine, int idDispositifCible, Date actionDate) throws Exception
  {
    if(logger.isDebugEnabled())
      logger.debug("Action is 'RéAffectation Intervention' on intervention="+idIntervention+", dispositifOrigine="+idDispositifOrigine+", dispositifCible="+idDispositifCible+", regulation="+idRegulation);

    this.dispositifService  .unAffectInterventionToDispositif (idDispositifOrigine ,idIntervention    , actionDate);
    this.dispositifService  .affectInterventionToDispositif   (idDispositifCible   ,idIntervention    , actionDate);
    this.interventionService.affectInterventionToDispositif   (idIntervention      , idDispositifCible, actionDate);
    
    if(logger.isDebugEnabled())
      logger.debug("DONE    : 'Affectation Intervention au dispositif' on intervention="+idIntervention+", dispositif="+idDispositifCible+", regulation="+idRegulation);
  }
  
  
  /**
   * Met a jour l'intervention avec l'hoptial choisi ou l'addresse spécifique
   * Met a jour la previous position du dispositif avec sa current Position
   * Met a jour la current position avec l'adresse destination
   * */
  public void chooseEvacDestination(int idRegulation, int idDispositif, int idLieu, String destinationLabel, Position position) throws Exception
  {
    Dispositif dispositif = this.dispositifService.getDispositif(idRegulation, idDispositif);
    
    for (InterventionTicket intervention : dispositif.getInterventions())
      this.interventionService.chooseEvacDestination(intervention.getIdIntervention(), idLieu, destinationLabel, position);      

    this.dispositifService.updateDispositifPosition(idDispositif, position, dispositif.getCurrentPosition());
  }
  
  public void endOfIntervention(int idRegulation, int idDispositif) throws Exception
  {
    Date actionDate = new Date();                                      //8=arrivé hopital => 8+1=9 : inter terminée
    
    Dispositif dispositif =  this.dispositifService.getDispositif(idRegulation, idDispositif);
    
    for (InterventionTicket intervention : dispositif.getInterventions())
      this.interventionService.actionOnIntervention     (intervention.getIdIntervention(), 8+1, actionDate);  
    
    this.dispositifService  .actionOnDispositif       (idDispositif  , 8+1, actionDate);//Pour l'historisation du changement d'état
    this.dispositifService  .actionEndOfIntervention  (idDispositif                   );
  }
  
  public void changeDispositifStatus(int idRegulation, int idDispositif, int newEtatDispositif) throws Exception
  {
    Dispositif dispositif = this.dispositifService.getDispositif(idRegulation, idDispositif);
    
    this.dispositifService.updateEtatDispositif(idDispositif, newEtatDispositif);
    //on met a jour l'objet local (pour propagation via reverse ajax)
    dispositif.setIdEtatDispositif(newEtatDispositif);
    
    if(dispositif.getInterventions().size() != 0)//si une intervention en cours, on met a jours sont état de facon
      this.interventionService.updateEtatInterventions(dispositif.getInterventions(), newEtatDispositif);
    
    this.updateRegulationUser(new ScriptBuffer().appendCall("moDispositifCs.updateDispositif", dispositif), 
        outPageName);
  }
  
  public void updateDispositifTiming(int idRegulation, int idDispositif, String fieldName, Date fieldValue) throws Exception
  {
    Dispositif dispositif = this.dispositifService.getDispositif(idRegulation, idDispositif);
    
    this.dispositifService.updateDispositifDateField(idDispositif, fieldName, fieldValue);
    
    if(dispositif.getInterventions().size() != 0)
    {
      for (InterventionTicket intervention : dispositif.getInterventions())
        this.interventionService.updateInterventionDateField(intervention.getIdIntervention(), fieldName, fieldValue);
    }
  }
  
  public void cloneIntervention(int idRegulation, DataForCloneIntervention dataForCloneIntervention) throws Exception
  {
    int idClonedIntervention = this.interventionService.cloneIntervention(dataForCloneIntervention);
    
    if(logger.isDebugEnabled())
      logger.debug("Attaching new intervention with id='"+idClonedIntervention+"' at dispositif id='"+dataForCloneIntervention.getIdDispositif()+"'");
    
    this.dispositifService.attachInterventionToDispositif(dataForCloneIntervention.getIdDispositif(), idClonedIntervention);
    
    Dispositif dispositif = this.dispositifService.getDispositif(idRegulation, dataForCloneIntervention.getIdDispositif());
    this.updateRegulationUser(new ScriptBuffer().appendCall("moDispositifCs.updateDispositif", dispositif), 
        outPageName);
  }
  
  
  public void handlePrimaireAndSecondaireOnIntervention(int idDispositif, int idIntervention, boolean isPrimaire) throws Exception
  {
    int idNextEtat = isPrimaire?5:6;
    
    int currentUserRegulationId = this.validateSessionAndGetRegulationId();
    if(logger.isDebugEnabled())
      logger.debug((isPrimaire?"Primaire":"Secondaire")+" passed for internvention id='"+idIntervention+"' of dispositif id='"+idDispositif+"'");
    
    //update inter status
    this.interventionService.actionOnIntervention(idIntervention, idNextEtat, new Date());
    
    
    Dispositif dispositif = this.dispositifService.getDispositif(currentUserRegulationId, idDispositif);
    //check if on inter exists with primaire(or secondaire) still to be passed
    boolean interWithPrimaireToBePassedExist = false;
    for (InterventionTicket intervention : dispositif.getInterventions())
    {
      if(intervention.getIdEtat() == (idNextEtat-1))//looking for intervention still at previous state
      {
        interWithPrimaireToBePassedExist = true;
        break;
      }
    }
    //if not, change the dispositif status.
    if(!interWithPrimaireToBePassedExist)
    {
      if(logger.isDebugEnabled())
        logger.debug("All "+(isPrimaire?"Primaire":"Secondaire")+" passed for dispositif id='"+idDispositif+"', changing idEtatDispositif to "+idNextEtat);
      
      this.dispositifService.actionOnDispositif(idDispositif, idNextEtat, new Date());
      //update the dispositif
      dispositif = this.dispositifService.getDispositif(currentUserRegulationId, idDispositif);
    }
    
    this.updateRegulationUser(new ScriptBuffer().appendCall("moDispositifCs.updateDispositif", dispositif), 
        outPageName);
  }
  
}