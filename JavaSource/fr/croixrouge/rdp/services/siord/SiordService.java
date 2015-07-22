package fr.croixrouge.rdp.services.siord;

import java.util.List;

import fr.croixrouge.rdp.model.siord.Membre;
import fr.croixrouge.rdp.model.siord.MembreCompetences;
import fr.croixrouge.rdp.model.siord.MembreImportStatus;
import fr.croixrouge.rdp.model.siord.SiordSynchro;

public interface SiordService
{

  SiordSynchro             startNewSiordSynchro(int idSynchroType) throws Exception;
  void                     importDataFromSiordDatabase(SiordSynchro siordSynchro) throws Exception;
  List<MembreCompetences>  getSiordDBMembreCompetences(int membreId) throws Exception;
  void                     insertMembreInCRFRDPDB(SiordSynchro siordSynchro, Membre membre) throws Exception;
  void                     insertMembreCompetencesInCRFRDPDB(SiordSynchro siordSynchro, List<MembreCompetences> competences) throws Exception;
  void                     insertImportMembreStatus(SiordSynchro siordSynchro, int idMembre, List<MembreImportStatus> status) throws Exception;
  void                     processMembresImportedFromSiordDB(SiordSynchro siordSynchro) throws Exception;
  void                     cleanUpImportedMembreData(SiordSynchro siordSynchro) throws Exception;
  List<Integer>            getSiordCompetences(SiordSynchro siordSynchro, Membre membre) throws Exception;
  int                      getDelegationIdFromSiordDelegationId(int idDelegationSiord) throws Exception;
  void                     storeLastImportedId(SiordSynchro siordSynchro) throws Exception;

}
