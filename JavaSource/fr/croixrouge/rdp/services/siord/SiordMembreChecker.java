package fr.croixrouge.rdp.services.siord;

import java.util.List;

import fr.croixrouge.rdp.model.siord.Membre;
import fr.croixrouge.rdp.model.siord.MembreImportStatus;
import fr.croixrouge.rdp.model.siord.SiordSynchro;

public interface SiordMembreChecker
{
  String NIVOL_REGEXP = "[0-9]{3,9}[A-Z]";
  List<MembreImportStatus> checkMembre(SiordSynchro siordSynchro, Membre membre) throws Exception;
}
