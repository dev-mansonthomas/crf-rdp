package fr.croixrouge.rdp.services.siord.RowCallbackHandler;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.validator.EmailValidator;
import org.apache.log4j.Logger;
import org.springframework.jdbc.core.RowCallbackHandler;

import fr.croixrouge.rdp.model.monitor.Delegation;
import fr.croixrouge.rdp.model.monitor.Equipier;
import fr.croixrouge.rdp.model.monitor.EquipierRole;
import fr.croixrouge.rdp.model.siord.Membre;
import fr.croixrouge.rdp.model.siord.MembreImportStatus;
import fr.croixrouge.rdp.model.siord.SiordSynchro;
import fr.croixrouge.rdp.model.siord.rowMapper.MembreRowMapper;
import fr.croixrouge.rdp.services.equipier.EquipierService;
import fr.croixrouge.rdp.services.siord.SiordMembreChecker;
import fr.croixrouge.rdp.services.siord.SiordService;

public class CrfrdpDBMembreRowCallbackHandler implements RowCallbackHandler
{
  private SiordService        siordService;
  private SiordSynchro        siordSynchro;
  private SiordMembreChecker  siordMembreChecker;
  private EquipierService     equipierService;
  private MembreRowMapper membreRowMapper = new MembreRowMapper(true);
  private static Logger   logger          = Logger.getLogger(CrfrdpDBMembreRowCallbackHandler.class);
  
  private EmailValidator emailValidator = null;
  
  public CrfrdpDBMembreRowCallbackHandler(SiordService    siordService, SiordSynchro siordSynchro, SiordMembreChecker siordMembreChecker, EquipierService equipierService)
  {
    this.siordService       = siordService;
    this.siordSynchro       = siordSynchro;
    this.siordMembreChecker = siordMembreChecker;
    this.equipierService    = equipierService;
    this.emailValidator     = EmailValidator.getInstance();

  }
  /**
   * Lit la table siord_membre et pour chaque ligne, check que l'utilisateur est valide
   * puis lit la table siord_membre_competence 
   * Effectue une transcodification
   * 
   * puis insert le bénévoles dans les tables CRFRDP
   * */
  @Override
  public void processRow(ResultSet rs) throws SQLException
  {
    if(logger.isDebugEnabled())
    {
      logger.debug("processing membre with row nubmer=:"+rs.getRow());
    }
    
    Membre membre = membreRowMapper.mapRow(rs, 0);
    
    List<MembreImportStatus> status = null;
    try
    {
      status = this.siordMembreChecker.checkMembre(this.siordSynchro, membre);  
    }
    catch(Exception e)
    {
      logger.error("Error while checking membre, row number="+rs.getRow(),e);
      return;
    }
    
    int idDelegation = 0;
    
    try
    {
      idDelegation = this.siordService.getDelegationIdFromSiordDelegationId(membre.getIdDelegation());  
    }
    catch(Exception e)
    {
      logger.error("Error while getting the delegationId idSiord = "+membre.getIdDelegation(),e);
      status.add(new MembreImportStatus(siordSynchro.getIdSynchroSiord(),9,"Delegation with ID(siord)='"+membre.getIdDelegation()+"' n'a pas de correspondance dans la base CRFRDP" ));
    }
    if(logger.isDebugEnabled())
    {
      logger.debug("idDelegation="+idDelegation+" pour idSiord="+membre.getIdDelegation());
    }
    
    
    
    if(status.size()>0)
    {
      String msg = "";
      
      try
      {
       
        for (MembreImportStatus membreImportStatus : status)
        {
          msg+="["+membreImportStatus.getIdStatus()+"|"+membreImportStatus.getCommentaire()+"]";
        }
        
        if(logger.isDebugEnabled())
        {
          logger.debug("membre '"+membre.getId()+"' with row nubmer=:"+rs.getRow()+" fails to validate:"+msg);
        }
        this.siordService.insertImportMembreStatus(this.siordSynchro, membre.getId(), status);
      }
      catch (Exception e)
      {
        logger.error("Error while inserting import status : "+msg,e);
      }
      return;
    }
    List<EquipierRole>        equipierRoles = null;
    
    //réinitialise pour n'inserer que les warning
    status        = new ArrayList<MembreImportStatus>();
    try
    {
      equipierRoles = getCompetences(membre, siordSynchro);  
    }
    catch(Exception e)
    {
      logger.error("Error while decoding roles",e);
    }
    
    
    Equipier equipier = new Equipier();
    equipier.setRoles(equipierRoles);
    equipier.setIdSiord(membre.getId());
    equipier.setDateLastSynchroSiord(siordSynchro.getSynchroDateStart());
    
    Date dateCreation = new Date();
    equipier.setDateCreation    (dateCreation);
    equipier.setDateModification(dateCreation);
    
    equipier.setNumNivol    (membre.getNivol());
    equipier.setHomme       ("1".equals(membre.getSexe()));
    equipier.setEnabled     (true);
    equipier.setNom         (membre.getNom());
    equipier.setPrenom      (membre.getPrenom());
    
    String telephone = membre.getTelephone();
    if(!(telephone.startsWith("06") || telephone.startsWith("07")))
    {
      telephone = "";
      status.add(new MembreImportStatus(siordSynchro.getIdSynchroSiord(),8,"'"+membre.getTelephone()+"' n'est pas un portable" ));
    }
    equipier.setMobile  (telephone);
    
    String email = membre.getEmail();
    if(!emailValidator.isValid(email))
    {
      email = "";
      status.add(new MembreImportStatus(siordSynchro.getIdSynchroSiord(),9,"'"+membre.getEmail()+"' n'est pas valide" ));
    }
    equipier.setEmail(email);
    
    
    
    equipier.setDelegation(new Delegation(idDelegation));
    
    
    String msg = "";
    
    try
    {
     
      for (MembreImportStatus membreImportStatus : status)
      {
        msg+="["+membreImportStatus.getIdStatus()+"|"+membreImportStatus.getCommentaire()+"]";
      }
      if(logger.isDebugEnabled())
      {
        logger.debug("membre '"+membre.getId()+"' with row nubmer=:"+rs.getRow()+" has warnings :"+msg);  
      }
      
      
      this.siordService.insertImportMembreStatus(this.siordSynchro, membre.getId(), status);
    }
    catch (Exception e)
    {
      logger.error("Error while inserting import status : "+msg,e);
    }
    
    try
    {
      if(!membre.isUpdate())
      {
        equipierService.createEquipier(equipier);  
      }
      else
      {
        //TODO :  si l'id siord est vide dans la base CRFRDP, le mettre a jour (pour les bénévoles créé directement dans l'application CRFRDP)
        equipierService.updateEquipierRoles(equipier, false);
      }
    }
    catch(Exception e)
    {
      logger.error("Error while creating new equipier "+equipier,e);
    }
    
    
  }
  
  
  private List<EquipierRole> getCompetences(Membre membre, SiordSynchro siordSynchro) throws Exception
  {
    
    List<Integer> rolesSiord = this.siordService.getSiordCompetences(siordSynchro, membre );
    
    if(rolesSiord == null)
      return null;
    
    List<EquipierRole> roles = new ArrayList<EquipierRole>(rolesSiord.size());
    
    boolean chauffeurEnEval = false;
    boolean ciEnEval        = false;
    
    for (int siordRole : rolesSiord)
    {
      if(siordRole == 34)
      {
        ciEnEval = true;
      }
      else if(siordRole == 35)
      {
        chauffeurEnEval = true;
      }
    }
    
    for (int siordRole : rolesSiord)
    {
    
      switch (siordRole)
      {
        case 61:
          roles.add(new EquipierRole(1,false));
          break;
        case 62:
          roles.add(new EquipierRole(2,false));
          break;
        case 60:
          roles.add(new EquipierRole(3,false));
          break;
        case  2:
          roles.add(new EquipierRole(4,false));
          break;
        case 45:
          roles.add(new EquipierRole(5,ciEnEval));
          break;
        case 54:
          roles.add(new EquipierRole(6,ciEnEval));
          break;
        case  4:
          roles.add(new EquipierRole(7,chauffeurEnEval));
          break;
        case  5:
          roles.add(new EquipierRole(8,false));
          break;
        case  3:
          roles.add(new EquipierRole(9,false));
          break;
        case 53:
          roles.add(new EquipierRole(10,false));
          break;
        case 33:
          roles.add(new EquipierRole(11,false));
          break;

        default:
          break;
      }
    }
    
    
    /*
when 61 then 01
when 62 then 02
when 60 then 03
when 2  then 04
when 45 then 05
when 54 then 06
when 4  then 07
when 5  then 08
when 3  then 09
when 53 then 10
when 33 then 11

    35->Eval Chauffeur
    34->Eval CI
     */
    
    return roles;
  }
  
  

  
  
}
