package fr.croixrouge.rdp.model.monitor.rowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import fr.croixrouge.rdp.model.monitor.Dispositif;
import fr.croixrouge.rdp.model.monitor.Position;

public class DispositifRowMapper extends RowMapperHelper implements RowMapper<Dispositif>
{

  public Dispositif mapRow(ResultSet rs, int rowNum) throws SQLException
  {
    Dispositif      dispositif      = new Dispositif    ();
    
    dispositif.setO2B1Volume                (rs.getFloat  ("O2_B1_Volume"       ));
    dispositif.setO2B1Pression              (rs.getFloat  ("O2_B1_Pression"     ));
    dispositif.setO2B2Volume                (rs.getFloat  ("O2_B2_Volume"       ));
    dispositif.setO2B2Pression              (rs.getFloat  ("O2_B2_Pression"     ));
    dispositif.setO2B3Volume                (rs.getFloat  ("O2_B3_Volume"       ));
    dispositif.setO2B3Pression              (rs.getFloat  ("O2_B3_Pression"     ));
    dispositif.setO2B4Volume                (rs.getFloat  ("O2_B4_Volume"       ));
    dispositif.setO2B4Pression              (rs.getFloat  ("O2_B4_Pression"     ));
    dispositif.setO2B5Volume                (rs.getFloat  ("O2_B5_Volume"       ));
    dispositif.setO2B5Pression              (rs.getFloat  ("O2_B5_Pression"     ));
    
    dispositif.setDhDebut                   (rs.getTimestamp("DH_debut"                    ));
    dispositif.setDhFin                     (rs.getTimestamp("DH_fin"                      ));
    
    dispositif.setDsaDatePeremptionAdulte1  (rs.getTimestamp("dsa_date_adulte_1"           ));
    dispositif.setDsaDatePeremptionAdulte2  (rs.getTimestamp("dsa_date_adulte_2"           ));
    dispositif.setDsaDatePeremptionEnfant   (rs.getTimestamp("dsa_date_enfant"             ));    
    
    
    dispositif.setDhReception               (rs.getTimestamp("DH_reception"                ));
    dispositif.setDhDepart                  (rs.getTimestamp("DH_depart"                   ));
    dispositif.setDhSurPlace                (rs.getTimestamp("DH_sur_place"                ));
    dispositif.setDhBilanPrimaire           (rs.getTimestamp("DH_bilan_primaire"           ));
    dispositif.setDhBilanSecondaire         (rs.getTimestamp("DH_bilan_secondaire"         ));
    dispositif.setDhQuitteLesLieux          (rs.getTimestamp("DH_quitte_les_lieux"         ));
    dispositif.setDhArriveeHopital          (rs.getTimestamp("DH_arrivee_hopital"          ));
    dispositif.setDhDispo                   (rs.getTimestamp("DH_dispo"                    ));
    dispositif.setDhASaBase                 (rs.getTimestamp("DH_a_sa_base"                ));
    dispositif.setDhAppelRenfortMedical     (rs.getTimestamp("DH_appel_renfort_medical"    ));
    dispositif.setDhArriveeRenfortMedical   (rs.getTimestamp("DH_arrivee_renfort_medical"  ));
    
    dispositif.setDsaDatePeremptionAdulte1  (rs.getDate("dsa_date_adulte_1"   ));
    dispositif.setDsaDatePeremptionAdulte2  (rs.getDate("dsa_date_adulte_2"   ));
    dispositif.setDsaDatePeremptionEnfant   (rs.getDate("dsa_date_enfant"     ));
    
    
    dispositif.setDispositifComment         (rs.getString("dispositif_comment" ));
    dispositif.setDispositifCommentEtat     (rs.getString("dispositif_comment_etat"));
    
    dispositif.setIndicatifVehicule         (rs.getString("indicatif_vehicule" ));
    dispositif.setDsaType                   (rs.getString("dsa_type"           ));
    dispositif.setObservation               (rs.getString("observation"        ));
    dispositif.setContactRadio              (rs.getString("contact_radio"      ));
    dispositif.setContactTel1               (rs.getString("contact_tel1"       ));
    dispositif.setContactTel2               (rs.getString("contact_tel2"       ));
    dispositif.setContactAlphapage          (rs.getString("contact_alphapage"  ));
    dispositif.setIdentiteMedecin           (rs.getString("identite_medecin"   ));
    dispositif.setAutreDelegation           (rs.getString("autre_delegation"   ));
    
    Position currentPosition  = dispositif.getCurrentPosition ();
    Position previousPosition = dispositif.getPreviousPosition();
    
    currentPosition .setGoogleCoordsLat (rs.getFloat ("current_google_coords_lat"    ));
    currentPosition .setGoogleCoordsLong(rs.getFloat ("current_google_coords_long"   ));
    currentPosition .setRue             (rs.getString("current_addresse_rue"         ));
    currentPosition .setCodePostal      (rs.getString("current_addresse_code_postal" ));
    currentPosition .setVille           (rs.getString("current_addresse_ville"       ));

    previousPosition.setGoogleCoordsLat (rs.getFloat ("previous_google_coords_lat"   ));
    previousPosition.setGoogleCoordsLong(rs.getFloat ("previous_google_coords_long"  ));
    previousPosition.setRue             (rs.getString("previous_addresse_rue"        ));
    previousPosition.setCodePostal      (rs.getString("previous_addresse_code_postal"));
    previousPosition.setVille           (rs.getString("previous_addresse_ville"      ));
    
    
    dispositif.setIdDispositif              (rs.getInt    ("id_dispositif"            ));
    dispositif.setIdVehicule                (rs.getInt    ("id_vehicule"              ));
    
    dispositif.setIdDelegation              (rs.getInt    ("id_delegation_responsable"));
    
    dispositif.setIdTypeDispositif          (rs.getInt    ("id_type_dispositif"       ));
    dispositif.setIdEtatDispositif          (rs.getInt    ("id_etat_dispositif"       ));

    dispositif.setDisponible                (dispositif.getIdEtatDispositif() == 1);
    
    
    dispositif.setDsaComplet                        (rs.getBoolean("dsa_complet"                          ));   
    dispositif.setDsaAdaptateurPediatrique          (rs.getBoolean("dsa_adapteur_pediatrique"             ));   
    
    dispositif.setDispositifBackWith3Girls          (rs.getBoolean("dispositif_back_3_girl"               ));
    dispositif.setDispositifNotEnoughO2             (rs.getBoolean("dispositif_not_enough_O2"             ));
    dispositif.setDispositifSetAvailableWithWarning (rs.getBoolean("dispositif_set_available_with_warning"));
    dispositif.setCreationTerminee                  (rs.getBoolean("creation_terminee"                    ));
    dispositif.setActif                             (rs.getBoolean("actif"                                ));

    return dispositif;
  }
}
