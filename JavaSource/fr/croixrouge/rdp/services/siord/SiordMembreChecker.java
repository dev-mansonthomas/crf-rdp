package fr.croixrouge.rdp.services.siord;

import java.util.List;

import fr.croixrouge.rdp.model.siord.Membre;
import fr.croixrouge.rdp.model.siord.MembreImportStatus;
import fr.croixrouge.rdp.model.siord.SiordSynchro;

public interface SiordMembreChecker
{
  public List<MembreImportStatus> checkMembre(SiordSynchro siordSynchro , Membre membre) throws Exception;
}
