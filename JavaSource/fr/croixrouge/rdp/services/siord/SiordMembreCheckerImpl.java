package fr.croixrouge.rdp.services.siord;

import java.sql.Types;
import java.util.ArrayList;
import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;

import fr.croixrouge.rdp.model.siord.Membre;
import fr.croixrouge.rdp.model.siord.MembreImportStatus;
import fr.croixrouge.rdp.model.siord.SiordSynchro;

public class SiordMembreCheckerImpl implements SiordMembreChecker
{
  private JdbcTemplate crfrdpJdbcTemplate;
  
  
  public SiordMembreCheckerImpl(JdbcTemplate crfrdpJdbcTemplate)
  {
    this.crfrdpJdbcTemplate = crfrdpJdbcTemplate;
  }

  
  public List<MembreImportStatus> checkMembre(SiordSynchro siordSynchro , Membre membre) throws Exception
  {
    List<MembreImportStatus> status = new ArrayList<MembreImportStatus>();
    
    membre.setNom     (membre.getNom    ().trim());
    membre.setPrenom  (membre.getPrenom ().trim());
    membre.setEmail   (membre.getEmail  ().trim());
    
    if(membre.getDroits() == 999)
    {
      status.add(new MembreImportStatus(siordSynchro.getIdSynchroSiord(), 2, ""));
      status.add(new MembreImportStatus(siordSynchro.getIdSynchroSiord(), 3, ""));
      return status;
    }
    //TODO externaliser la chaine
    if(!membre.getNivol().matches("[0-9]{3,9}[A-Z]"))
    {
      status.add(new MembreImportStatus(siordSynchro.getIdSynchroSiord(), 2, ""));
      status.add(new MembreImportStatus(siordSynchro.getIdSynchroSiord(), 7, "NIVOL="+membre.getNivol()));
      return status;
    }
    
    
    if(checkIfNivolExists(siordSynchro, membre))
    {//si nivol existe => on ne le réimporte pas si c'est une création
      if(!membre.isUpdate())
      {
        status.add(new MembreImportStatus(siordSynchro.getIdSynchroSiord(), 2, ""));
        status.add(new MembreImportStatus(siordSynchro.getIdSynchroSiord(), 4, "NIVOL="+membre.getNivol()));   
        return status;
      }
    }
    else
    {//s'il n'existe pas et que c'est un update => on ne réimporte pas
      if(membre.isUpdate())
      {
        status.add(new MembreImportStatus(siordSynchro.getIdSynchroSiord(), 2, ""));
        status.add(new MembreImportStatus(siordSynchro.getIdSynchroSiord(), 11, "NIVOL="+membre.getNivol()));        
        return status;
      }
    }
    
    if(!checkIfDelegationExists(siordSynchro, membre))
    {//si délégation n'existe pas, on ne l'importe pas.
      status.add(new MembreImportStatus(siordSynchro.getIdSynchroSiord(), 2, ""));
      status.add(new MembreImportStatus(siordSynchro.getIdSynchroSiord(), 5, "id delegation siord non reconnu="+membre.getIdDelegation()));
      return status;
    }
    
    
    checkForFakeAccount(siordSynchro, membre, status);

    
    
    return status;
  }
  
  
  private final static String[] fakeAccountsSearchedWords = 
  { "test", "visit", "routier","missions", "reseau", "réseau", "crf", "rlms", "dlus", "psl", "formation", "maraude", "president", "telephone", 
    "equipe", "utilisateur", "generique","générique", "topaze","rdas", "action", "laser", "ide", "cd", "ddus", "opera", "format", 
    "invit", "action", "media", "edir", "vigie", "solidarit", "responsable", "...", "diamant", "autre", "bénévole", "equipier", "exterieur", 
    "renfort","effectif","infirmier", "utilisateur", "admin", "local", "titane","radar", "onyx", "exterieur", "urgence", "volontaire","pse",
    
  };

  
  private void checkForFakeAccount(SiordSynchro siordSynchro ,Membre membre, List<MembreImportStatus> status)
  {
    
    String nom    = membre.getNom   ().toLowerCase();
    String prenom = membre.getPrenom().toLowerCase();
    String email  = membre.getEmail ().toLowerCase();
   
    if( nom.equals("") || prenom.equals(""))
    {
      status.add(new MembreImportStatus(siordSynchro.getIdSynchroSiord(), 2, ""));
      status.add(new MembreImportStatus(siordSynchro.getIdSynchroSiord(), 6, "nom ou prenom vide"));
      return;
    }
    
    if( nom.matches(".*[0-9].*") || prenom.matches(".*[0-9].*"))
    {
      status.add(new MembreImportStatus(siordSynchro.getIdSynchroSiord(), 2, ""));
      status.add(new MembreImportStatus(siordSynchro.getIdSynchroSiord(), 6, "nom ou prenom contient un ou plusieurs chiffre"));
      return;
    }
    
    for (String  fakeWord : fakeAccountsSearchedWords)
    {
      if(nom.indexOf(fakeWord)>0)
      {
        status.add(new MembreImportStatus(siordSynchro.getIdSynchroSiord(), 2, ""));
        status.add(new MembreImportStatus(siordSynchro.getIdSynchroSiord(), 6, "le nom contient la chaine '"+fakeWord+"'"));
        return;
      }
      if(prenom.indexOf(fakeWord)>0)
      {
        status.add(new MembreImportStatus(siordSynchro.getIdSynchroSiord(), 2, ""));
        status.add(new MembreImportStatus(siordSynchro.getIdSynchroSiord(), 6, "le prenom contient la chaine '"+fakeWord+"'"));
        return;
      }
      if(email.indexOf(fakeWord)>0)
      {
        status.add(new MembreImportStatus(siordSynchro.getIdSynchroSiord(), 2, ""));
        status.add(new MembreImportStatus(siordSynchro.getIdSynchroSiord(), 6, "le email contient la chaine '"+fakeWord+"'"));
        return;
      }
    }

    return;

  }
  
  
  
  private final static String queryForCheckIfNivolExists=
    "SELECT count(1)            \n"+
    "FROM   equipier            \n"+
    "WHERE  nivol            = ?\n";
  
  private boolean checkIfNivolExists(SiordSynchro siordSynchro ,Membre membre)
  {
    
    
    Object[] objects = new Object[]{
        membre.getNivol()
      };
    int[] types = new int   []
      {
        Types.CHAR
      };
    
    
    int count = this.crfrdpJdbcTemplate.queryForInt(queryForCheckIfNivolExists, objects, types);
    return count > 0;
  }
  
  
  
  private final static String queryForCheckIfDelegationExists=
    "SELECT count(1)     \n"+
    "FROM   delegation   \n"+
    "WHERE  id_siord  = ?\n";
  
  private boolean checkIfDelegationExists(SiordSynchro siordSynchro ,Membre membre)
  {
    Object[] objects = new Object[]
      {
        membre.getIdDelegation()
      };
    int[] types = new int   []
      {
        Types.CHAR
      };
    
    
    int count = this.crfrdpJdbcTemplate.queryForInt(queryForCheckIfDelegationExists, objects, types);
    return count > 0;
  }  
}
