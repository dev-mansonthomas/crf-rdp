package fr.croixrouge.rdp.services.delegate.DispositifInterventionDelegate;

import fr.croixrouge.rdp.model.monitor.*;
import fr.croixrouge.rdp.model.monitor.dwr.DataForCloneIntervention;
import fr.croixrouge.rdp.services.dispositif.DispositifService;
import fr.croixrouge.rdp.services.equipier.EquipierService;
import fr.croixrouge.rdp.services.intervention.InterventionService;
import fr.croixrouge.rdp.services.list.ListService;
import fr.croixrouge.rdp.services.mobile.MobileService;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class DispositifInterventionDelegateImpl implements DispositifInterventionDelegate
{
  private static Log          logger              = LogFactory.getLog(DispositifInterventionDelegateImpl.class);
  
  private DispositifService   dispositifService   = null;
  private InterventionService interventionService = null;
  private MobileService       mobileService       = null;
  private EquipierService     equipierService     = null;
  private ListService         listService         = null;
  
  private final static int DISPOSITIF_TYPE_SAMU= 1;
  private final static int CI_ALPHA_ROLE       = 5;
  private final static int CI_CS_ROLE          = 6;
  private final static int CHAUFFEUR_ROLE      = 7;
  
  private final static int SMS_TYPE_ENVOIE_OI  = 1;
  
  
  public DispositifInterventionDelegateImpl(DispositifService   dispositifService  , 
                                            InterventionService interventionService,
                                            MobileService       mobileService      ,
                                            EquipierService     equipierService    ,
                                            ListService         listService        
                                            )
  {
    this.dispositifService   = dispositifService  ;
    this.interventionService = interventionService;
    this.mobileService       = mobileService      ;
    this.equipierService     = equipierService    ;
    this.listService         = listService        ;
   
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
   * Etat = indisponible (ou disponible)
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
   * 
   * 
   * 
   * */
  @Transactional (propagation=Propagation.REQUIRED, rollbackFor=Exception.class)  
  public String action(int idRegulation, int idDispositif) throws Exception
  {
    if(logger.isDebugEnabled())
      logger.debug("\"Action Button\" pushed for dispositif="+idDispositif+", regulation="+idRegulation);
    
    Dispositif                dispositif         = this.dispositifService.getDispositif      (idRegulation, idDispositif);
    int                       idEtatDispositif   = dispositif            .getIdEtatDispositif();
    Date                      actionDate         = new Date();
    List<InterventionTicket>  interventions      = dispositif.getInterventions();

    if(idEtatDispositif == DispositifService.STATUS_INDISPO)
    {
      if(logger.isDebugEnabled())
        logger.debug("Action is : set Dispotitif to etat "+DispositifService.STATUS_DISPO+" disponible for dispositif="+idDispositif+", regulation="+idRegulation+" with idEtatDispositif = "+idEtatDispositif+" (indispo)");

      this.dispositifService  .actionOnDispositif(idDispositif, DispositifService.STATUS_DISPO, actionDate);
      
      if(logger.isDebugEnabled())
      {
        logger.debug("DONE      : set Dispotitif to etat "+DispositifService.STATUS_DISPO+" disponible for dispositif="+idDispositif+", regulation="+idRegulation+" with idEtatDispositif = "+idEtatDispositif+" (indispo)");
        logger.debug("\"Action Button\" pushed DONE : for dispositif="+idDispositif+", regulation="+idRegulation);
      }
      return "var actionReturnStatus={status:0};";
    }
    String              interventionsIds  = this.interventionService.generateIdsList(interventions);    
    InterventionTicket  firstIntervention = null;
    
    if(interventions.size() > 0)
    {
      firstIntervention = interventions.get(0);
    }
    
    if(firstIntervention == null || firstIntervention.getIdEtat() == 0)
    {
      logger.error("Le dispositif n'as pas d'intervention affectée");
      return "var actionReturnStatus={status:1,message:'Le dispositif n\'as pas d'intervention affectée'};";
    }
      
    
    //on suppose que toutes les interventions sont au meme état
    int idEtatIntervention = firstIntervention.getIdEtat          ();
    
    //On vérifie que toutes les interventions sont dans le meme état
    for (InterventionTicket interventionTicket : interventions)
    {
      if(interventionTicket.getIdEtat() != idEtatIntervention)
      {
        logger.error("les interventions d'id "+interventionsIds+" associées au dispositif "+idDispositif+" n'ont pas tous le même état");
        return "var actionReturnStatus={status:2,message:'les interventions d\'id "+interventionsIds+" associées au dispositif "+idDispositif+" n\'ont pas tous le même état'};";
      }
        
    }

    
    //idEtatDispositif == DispositifService.STATUS_INDISPO ==> testé en premier
    if(idEtatDispositif > DispositifService.STATUS_ARRIVE_HOSPITAL)
    {
      logger.error("L'état du dispositif ne permet pas d'effectuer cette opération idEtatDispositif="+idEtatDispositif);
      return "var actionReturnStatus={status:3,message:'L\'état du dispositif ne permet pas d'effectuer cette opération idEtatDispositif="+idEtatDispositif+"'};";
    }

    
    if(idEtatDispositif != idEtatIntervention)
    {
      logger.error("L'état du dispositif est différent de l'état de l'intervention. idEtatIntervention="+idEtatIntervention+" idEtatDispositif="+idEtatDispositif);
      return "var actionReturnStatus={status:4,message:\"L'état du dispositif est différent de l'état de l'intervention. idEtatIntervention="+idEtatIntervention+" idEtatDispositif="+idEtatDispositif+"\"};";
    }
      


    if(idEtatDispositif == DispositifService.STATUS_DISPO)
    {//Affectation de l'intervention au dispositif
      
      logger.error("Wrong dispositif state ("+DispositifService.STATUS_DISPO+"), affectation has its own method.");
      return "var actionReturnStatus={status:5,message:'Wrong dispositif state ("+DispositifService.STATUS_DISPO+"), affectation has its own method'};";
    }
    else if(idEtatDispositif == DispositifService.STATUS_INTERVENTION_AFFECTEE)
    {//Inter Affecté => Parti
      if(logger.isDebugEnabled())
        logger.debug("Action is 'Dispositif Parti' on intervention="+interventionsIds+", dispositif="+idDispositif+", regulation="+idRegulation);

      this.dispositifService  .actionOnDispositif            (idDispositif  , DispositifService.STATUS_PARTI , actionDate);
      this.interventionService.actionOnInterventions         (interventions , DispositifService.STATUS_PARTI , actionDate);
      this.dispositifService  .updateDispositifPosition      (idDispositif  , firstIntervention.getPosition(), dispositif.getCurrentPosition());
      
      if(logger.isDebugEnabled())
        logger.debug("DONE    : 'Dispositif Parti' on intervention="+interventionsIds+", dispositif="+idDispositif+", regulation="+idRegulation);
    }
    else if(idEtatDispositif == DispositifService.STATUS_PARTI)
    {//Parti => SurPlace 
      
      if(logger.isDebugEnabled())
        logger.debug("Action is 'Dispositif se présente' on intervention="+interventionsIds+", dispositif="+idDispositif+", regulation="+idRegulation);

      this.dispositifService  .actionOnDispositif            (idDispositif  , DispositifService.STATUS_SUR_PLACE, actionDate);
      this.interventionService.actionOnInterventions         (interventions , DispositifService.STATUS_SUR_PLACE, actionDate);
      this.dispositifService  .updateDispositifPosition      (idDispositif  , null              , firstIntervention.getPosition());
      
      if(logger.isDebugEnabled())
        logger.debug("DONE    : 'Dispositif se présente' on intervention="+interventionsIds+", dispositif="+idDispositif+", regulation="+idRegulation);

    }
    else if(idEtatDispositif == DispositifService.STATUS_SUR_PLACE)
    {//Sur Place => Bilan Primaire 
      if(logger.isDebugEnabled())
        logger.debug("Action is 'Dispositif passe son primaire' on intervention="+interventionsIds+", dispositif="+idDispositif+", regulation="+idRegulation);

      this.dispositifService  .actionOnDispositif   (idDispositif  , DispositifService.STATUS_PRIMAIRE, actionDate);
      if(interventions.size() == 1)
        this.interventionService.actionOnIntervention(interventions.get(0).getIdIntervention() , DispositifService.STATUS_PRIMAIRE, actionDate);
      //else : on ne fait rien, pour les multi intervention, on passe les primaires pour chaque inter via un appel ajax spécifique (handlePrimaireAndSecondaireOnIntervention), puis sur le dispositif
      if(logger.isDebugEnabled())
        logger.debug("DONE    : 'Dispositif passe son primaire' on intervention="+interventionsIds+", dispositif="+idDispositif+", regulation="+idRegulation);

    }
    else if(idEtatDispositif == DispositifService.STATUS_PRIMAIRE)
    {//Primaire => Bilan Secondaire 
      if(logger.isDebugEnabled())
        logger.debug("Action is 'Dispositif passe son secondaire' on intervention="+interventionsIds+", dispositif="+idDispositif+", regulation="+idRegulation);

      this.dispositifService  .actionOnDispositif   (idDispositif  , DispositifService.STATUS_SECONDAIRE, actionDate);
      if(interventions.size() == 1)
        this.interventionService.actionOnIntervention(interventions.get(0).getIdIntervention() , DispositifService.STATUS_SECONDAIRE, actionDate);
      //else : on ne fait rien, pour les multi intervention, on passe les secondaires pour chaque inter via un appel ajax spécifique (handlePrimaireAndSecondaireOnIntervention), puis sur le dispositif
      
      if(logger.isDebugEnabled())
        logger.debug("DONE    : 'Dispositif passe son secondaire' on intervention="+interventionsIds+", dispositif="+idDispositif+", regulation="+idRegulation);

    }
    else if(idEtatDispositif == DispositifService.STATUS_SECONDAIRE)
    {//Secondaire => choisi hoptial destination=>Transport
      
      /*Séquencement : 
       * 
       * Lorsque l'utilisateur clic sur Action, 
       * on affiche la listes des hopitaux de paris(ou adresse en saisie libre, dans ce cas, on met 0 pour evac_hopital_destination),
       * il choisi ou saisie, 
       * update ajax met a jour l'inter, le dispositif et appel cette méthode. 
       * 
       * currentPosition et previousPosition sont déja correct
       * 
       * Dans le cas ou la victime est laissé sur place, l'inter se termine et la gestion de l'état se fait a la fin de cette méthode
       */
      
      if(logger.isDebugEnabled())
        logger.debug("Action is 'Dispositif quitte les lieux' on intervention="+interventionsIds+", dispositif="+idDispositif+", regulation="+idRegulation);

      this.dispositifService  .actionOnDispositif       (idDispositif  , DispositifService.STATUS_TRANSPORT, actionDate);
      this.interventionService.actionOnInterventions    (interventions , DispositifService.STATUS_TRANSPORT, actionDate);
      //a ce moment, dispositif.getCurrentPosition contiendra la position de l'hopital.
      //          et dispositif.getPreviousPosition contiendra la position de l'intervention
      if(logger.isDebugEnabled())
        logger.debug("DONE    : 'Dispositif quitte les lieux' on intervention="+interventionsIds+", dispositif="+idDispositif+", regulation="+idRegulation);
    }
    else if(idEtatDispositif == DispositifService.STATUS_TRANSPORT)
    {//Transport => Arrive à l'hopital
      if(logger.isDebugEnabled())
        logger.debug("Action is 'Dispositif arrive a l'hopital' on intervention="+interventionsIds+", dispositif="+idDispositif+", regulation="+idRegulation);

      this.dispositifService  .actionOnDispositif       (idDispositif  , DispositifService.STATUS_ARRIVE_HOSPITAL, actionDate);
      this.interventionService.actionOnInterventions    (interventions , DispositifService.STATUS_ARRIVE_HOSPITAL, actionDate);
      //a ce moment, dispositif.getCurrentPosition contiendra la position de l'hopital.
      //         On change previousPosition a l'addresse de l'hopital pour signifier que le dispositif n'est plus en mouvement.
      this.dispositifService  .updateDispositifPosition (idDispositif  , null, dispositif.getCurrentPosition());
      
      if(logger.isDebugEnabled())
        logger.debug("DONE    : 'Dispositif arrive a l'hopital' on intervention="+interventionsIds+", dispositif="+idDispositif+", regulation="+idRegulation);
    }
    /*
    else if(idEtatDispositif == DispositifService.STATUS_ARRIVE_HOSPITAL )
    {//Arrivé Hospital => Inter terminée, ou laissé sur place décédé ou non, l'inter se termine a ce moment la
      if(logger.isDebugEnabled())
        logger.debug("Action is 'Intervention Terminée' on intervention="+interventionsIds+", dispositif="+idDispositif+", regulation="+idRegulation);

      this.dispositifService  .actionOnDispositif       (idDispositif  , DispositifService.STATUS_INTER_TERMINEE, actionDate);
      this.interventionService.actionOnInterventions    (interventions , DispositifService.STATUS_INTER_TERMINEE, actionDate);

      //currentInter Id est ré initialisé a vide.
      
      if(logger.isDebugEnabled())
        logger.debug("DONE    : 'Intervention Terminée' on intervention="+interventionsIds+", dispositif="+idDispositif+", regulation="+idRegulation);
    }
   */
    if(logger.isDebugEnabled())
      logger.debug("\"Action Button\" pushed DONE : for intervention="+interventionsIds+", dispositif="+idDispositif+", regulation="+idRegulation);
    
    return "var actionReturnStatus={status:0}";
  }

  @Transactional (propagation=Propagation.REQUIRED, rollbackFor=Exception.class)  
  public void affectInterventionToDispositif(int idEquipierCurrentUser, int idRegulation, int idIntervention, int idDispositif, Date actionDate) throws Exception
  {
    if(logger.isDebugEnabled())
      logger.debug("Action is 'Affectation Intervention au dispositif' on intervention="+idIntervention+", dispositif="+idDispositif+", regulation="+idRegulation);

    this.dispositifService  .affectInterventionToDispositif(idDispositif  , idIntervention, actionDate);
    this.interventionService.affectInterventionToDispositif(idIntervention, idDispositif  , actionDate);
    
    DispositifTicket   dispositif   = this.dispositifService  .getDispositifTicket  (idDispositif);
    
    
    if(dispositif.getIdTypeDispositif() == DISPOSITIF_TYPE_SAMU)
    {
      Intervention    intervention = this.interventionService.getIntervention          (idIntervention);
      ArrayList<SMS>  smss         = new ArrayList<>(3);
      List<Equipier>  equipiers    = this.equipierService    .getEquipiersForDispositif(idDispositif  );
      
      
      
      List<InterventionMotif> interventionMotifList = this.listService.getMotifsIntervention();
      InterventionMotif motif = null;
      
      for (InterventionMotif interventionMotif : interventionMotifList)
      {
        if(intervention.getIdMotif() == interventionMotif.getId())
        {
          motif = interventionMotif;
          break;
        }
      }
      
      /********
       * Génération du message du SMS
       * 
       */
      String detail = generateDataForSMS("Bat",intervention.getBatiment())+generateDataForSMS("Etage",intervention.getEtage())+generateDataForSMS("Porte",intervention.getPorte());
      
      String message = "Inter:"+getDataForSMS(intervention.getInterventionBusinessId(),false, false)+"\n"+
      (motif != null ? motif.getLabel()+"\n":"")+
      getDataForSMS(intervention.getComplementMotif(), true, false)+
      (intervention.isHommeVictime()?"Mr":"Mme")+" "+getDataForSMS(intervention.getNomVictime(), false, true)+getDataForSMS(intervention.getPrenomVictime(), false, true)+getDataForSMS(intervention.getAgeApproxVictime()+"", true, false, "ans")+
      getDataForSMS(intervention.getPosition().getRue(), false, true)+getDataForSMS(intervention.getPosition().getCodePostal(), false, true)+ getDataForSMS(intervention.getPosition().getVille(), true, false) +
      getDataForSMS(detail, true, false)+
      getDataForSMS(intervention.getComplementAdresse(), false, false);
      
      /* numéro de tel surchargé*/
      SMS templateSMS = new SMS(SMS_TYPE_ENVOIE_OI, idDispositif, idEquipierCurrentUser, "0666666666", message );
    
      for (Equipier equipier : equipiers)
      {
        int idRoleDansDispositif = equipier.getIdRoleDansDispositif();
        if( equipier.getEvaluationDansDispositif() == Equipier.EVAL_EVALUE || 
            idRoleDansDispositif == CI_ALPHA_ROLE   || 
            idRoleDansDispositif == CI_CS_ROLE      || 
            idRoleDansDispositif == CHAUFFEUR_ROLE
          )
        {
          String recipient = equipier.getMobile();
          if(MobileService.validatePhoneNumber(recipient))
          {
            smss.add(templateSMS.clone(recipient));
          }
        }
      }
      
      this.mobileService.sendSMS(smss);
      
    }
    
    if(logger.isDebugEnabled())
      logger.debug("DONE    : 'Affectation Intervention au dispositif' on intervention="+idIntervention+", dispositif="+idDispositif+", regulation="+idRegulation);
  }
  
  @Transactional (propagation=Propagation.REQUIRED, rollbackFor=Exception.class)  
  public void reAffectInterventionToDispositif(int idRegulation, int idIntervention, int idDispositifOrigine, int idDispositifCible, Date actionDate) throws Exception
  {
    if(logger.isDebugEnabled())
      logger.debug("Action is 'RéAffectation Intervention' on intervention="+idIntervention+", dispositifOrigine="+idDispositifOrigine+", dispositifCible="+idDispositifCible+", regulation="+idRegulation);

    this.dispositifService  .unAffectInterventionToDispositif (idDispositifOrigine , idIntervention               );
    this.dispositifService  .affectInterventionToDispositif   (idDispositifCible   , idIntervention   , actionDate);
    this.interventionService.reAffectInterventionToDispositif (idIntervention      , idDispositifCible, actionDate);//méthode spécifique afin de ne pas re généré un idMétier
    
    if(logger.isDebugEnabled())
      logger.debug("DONE    : 'Affectation Intervention au dispositif' on intervention="+idIntervention+", dispositif="+idDispositifCible+", regulation="+idRegulation);
  }
  
  @Transactional (propagation=Propagation.REQUIRED, rollbackFor=Exception.class)  
  public void laisseSurPlace(int idRegulation, int idDispositif, boolean decede, boolean decharge, String dcdADispoDe) throws Exception
  {
    Dispositif dispositif = this.dispositifService.getDispositif(idRegulation, idDispositif);
    
    for (InterventionTicket intervention : dispositif.getInterventions())
    {
      
      if(decede)
      {
        this.interventionService.updateInterventionBooleanField(intervention.getIdIntervention(), "evac_laisse_sur_place_decedee"           , true);
        this.interventionService.updateInterventionStringField (intervention.getIdIntervention(), "evac_laisse_sur_place_decedee_a_dispo_de", dcdADispoDe);
      }
      else
      {
        
        this.interventionService.updateInterventionBooleanField(intervention.getIdIntervention(), "evac_laisse_sur_place" , true);
        this.interventionService.updateInterventionBooleanField(intervention.getIdIntervention(), "evac_decharche"        , decharge);
      } 
    }
  }
  
  
  /**
   * Met a jour l'intervention avec l'hoptial choisi ou l'addresse spécifique
   * Met a jour la previous position du dispositif avec sa current Position
   * Met a jour la current position avec l'adresse destination
   * */
  @Transactional (propagation=Propagation.REQUIRED, rollbackFor=Exception.class)  
  public void chooseEvacDestination(int idRegulation, int idDispositif, int idLieu, String destinationLabel, Position position) throws Exception
  {
    Dispositif dispositif = this.dispositifService.getDispositif(idRegulation, idDispositif);
    
    for (InterventionTicket intervention : dispositif.getInterventions())
      this.interventionService.chooseEvacDestination(intervention.getIdIntervention(), idLieu, destinationLabel, position);      

    this.dispositifService.updateDispositifPosition(idDispositif, position, dispositif.getCurrentPosition());
  }
  
  @Transactional (propagation=Propagation.REQUIRED, rollbackFor=Exception.class)  
  public String endOfIntervention(int idRegulation, int idDispositif) throws Exception
  {
    Date actionDate = new Date();                                      //8=arrivé hopital => 8+1=9 : inter terminée
    
    Dispositif dispositif =  this.dispositifService.getDispositif(idRegulation, idDispositif);
    //met a jour la date de fin d'intervention
    for (InterventionTicket intervention : dispositif.getInterventions())
    {
      this.interventionService.actionOnIntervention     (intervention.getIdIntervention(), DispositifService.STATUS_INTER_TERMINEE, actionDate);
    }
    
    this.dispositifService  .actionOnDispositif       (idDispositif  , DispositifService.STATUS_INTER_TERMINEE, actionDate);//Pour l'historisation du changement d'état
    this.dispositifService  .actionEndOfIntervention  (idDispositif                   );
    
    return "var actionReturnStatus={status:0};";
  }
  
  @Transactional (propagation=Propagation.REQUIRED, rollbackFor=Exception.class)  
  public void changeDispositifStatus(int idRegulation, int idDispositif, int newEtatDispositif) throws Exception
  {
    Dispositif dispositif = this.dispositifService.getDispositif(idRegulation, idDispositif);
    
    this.dispositifService.updateEtatDispositif(idDispositif, newEtatDispositif);
    //on met a jour l'objet local (pour propagation via reverse ajax)
    dispositif.setIdEtatDispositif(newEtatDispositif);
    
    if(dispositif.getInterventions().size() != 0)//si une intervention en cours, on met a jours sont état de facon
      this.interventionService.updateEtatInterventions(dispositif.getInterventions(), newEtatDispositif);

    //TODO Websocket replace dwr code
/*    this.updateRegulationUser(new ScriptBuffer().appendCall("moDispositifCs.updateDispositif", dispositif),
        outPageName);*/
  }
  @Transactional (propagation=Propagation.REQUIRED, rollbackFor=Exception.class)  
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
  @Transactional (propagation=Propagation.REQUIRED, rollbackFor=Exception.class)  
  public void cloneIntervention(int idRegulation, DataForCloneIntervention dataForCloneIntervention) throws Exception
  {
    int idClonedIntervention = this.interventionService.cloneIntervention(dataForCloneIntervention);
    //on affecte l'intervention pour avoir l'id metier
    this.interventionService.affectInterventionToDispositif(idClonedIntervention, dataForCloneIntervention.getIdDispositif(), new Date());
    
    if(logger.isDebugEnabled())
      logger.debug("Attaching new intervention with id='"+idClonedIntervention+"' at dispositif id='"+dataForCloneIntervention.getIdDispositif()+"'");
    
    this.dispositifService.attachInterventionToDispositif(dataForCloneIntervention.getIdDispositif(), idClonedIntervention);
    
    Dispositif dispositif = this.dispositifService.getDispositif(idRegulation, dataForCloneIntervention.getIdDispositif());
    //TODO Websocket replace dwr code
    /*
    this.updateRegulationUser(new ScriptBuffer().appendCall("moDispositifCs.updateDispositif", dispositif),
        outPageName);*/
  }
  
  @Transactional (propagation=Propagation.REQUIRED, rollbackFor=Exception.class)  
  public void handlePrimaireAndSecondaireOnIntervention(int idDispositif, int idIntervention, boolean isPrimaire) throws Exception
  {
    int idNextEtat = isPrimaire?DispositifService.STATUS_PRIMAIRE:DispositifService.STATUS_SECONDAIRE;

    //TODO get RegulationId From Session
    int currentUserRegulationId = 1;//this.validateSessionAndGetRegulationId();
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
    //TODO Websocket replace dwr code
    /*this.updateRegulationUser(new ScriptBuffer().appendCall("moDispositifCs.updateDispositif", dispositif),
        outPageName);*/
  }
  
  @Transactional (propagation=Propagation.REQUIRED, rollbackFor=Exception.class)  
  public void cancelIntervention(int regulationId, int idDispositif, int idIntervention, int idMotifAnnulation) throws Exception
  {
    if(logger.isDebugEnabled())
      logger.debug("cancelling intervention id='"+idIntervention+"' of dispositif id='"+idDispositif+"' with motif id='"+idMotifAnnulation+"'");
    
    this.interventionService.cancelIntervention(idIntervention);
    this.dispositifService  .unAffectInterventionToDispositif (idDispositif, idIntervention);//guère la modification de l'état du dispositif
    
    Dispositif dispositif = this.dispositifService.getDispositif(regulationId, idDispositif);
    //TODO Websocket replace dwr code
   /* this.updateRegulationUser(new ScriptBuffer().appendCall("moDispositifCs.updateDispositif",dispositif), DWRUtils.outPageName);
 */
  }
  
  private String generateDataForSMS(String title, String value)
  {
    if( value == null || value.trim().length() == 0)
    {
      return "";
    }
    return title+":"+value.trim()+",";
  }
  
  private String getDataForSMS(String value, boolean eol, boolean fieldNext)
  {
    return this.getDataForSMS(value, eol, fieldNext, "");
  }
  
  private String getDataForSMS(String value, boolean eol, boolean fieldNext, String suffixToAppendIfNotNull)
  {
    if(value == null || value.trim().length() == 0 || value.trim().equals("0"))
    {
      return "";
    }
    return value + suffixToAppendIfNotNull + (eol?"\n":(fieldNext?" ":""));
  }
  
}
