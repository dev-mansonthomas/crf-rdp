package fr.croixrouge.rdp.services.siord;

import java.util.List;

import fr.croixrouge.rdp.model.siord.Membre;
import fr.croixrouge.rdp.model.siord.MembreCompetences;
import fr.croixrouge.rdp.model.siord.MembreImportStatus;
import fr.croixrouge.rdp.model.siord.SiordSynchro;

public interface SiordService
{

  public SiordSynchro             startNewSiordSynchro                (int          idSynchroType ) throws Exception;
  public void                     importDataFromSiordDatabase         (SiordSynchro siordSynchro  ) throws Exception;
  public List<MembreCompetences>  getSiordDBMembreCompetences         (int          membreId      ) throws Exception;
  public void                     insertMembreInCRFRDPDB              (SiordSynchro siordSynchro  , Membre membre                                 ) throws Exception;
  public void                     insertMembreCompetencesInCRFRDPDB   (SiordSynchro siordSynchro  , List<MembreCompetences>competences            ) throws Exception;
  public void                     insertImportMembreStatus            (SiordSynchro siordSynchro  , int idMembre, List<MembreImportStatus> status ) throws Exception;
  public void                     processMembresImportedFromSiordDB   (SiordSynchro siordSynchro  ) throws Exception;
  public void                     cleanUpImportedMembreData           (SiordSynchro siordSynchro  ) throws Exception;
  public List<Integer>            getSiordCompetences                 (SiordSynchro siordSynchro  , Membre membre) throws Exception;
  public int                      getDelegationIdFromSiordDelegationId(int idDelegationSiord      ) throws Exception; 

}
