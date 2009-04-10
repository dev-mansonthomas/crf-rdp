package fr.croixrouge.irp.model.monitor.rowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import fr.croixrouge.irp.model.monitor.Intervention;
import fr.croixrouge.irp.model.monitor.Position;

public class InterventionRowMapper extends RowMapperHelper implements RowMapper
{

  public Object mapRow(ResultSet rs, int rowNum) throws SQLException
  {
    Intervention intervention = new Intervention();
    
    intervention.setIdIntervention                     (rs.getInt      ("id_intervention"                         ));
    intervention.setIdDispositif                       (rs.getInt      ("id_dispositif"                           ));
    intervention.setIdRegulation                       (rs.getInt      ("id_regulation"                           ));
    intervention.setIdOrigine                          (rs.getInt      ("id_origine"                              ));
    intervention.setIdMotif                            (rs.getInt      ("id_motif"                                ));
    intervention.setIdMotifAnnulation                  (rs.getInt      ("id_motif_annulation"                     ));
    intervention.setIdEtat                             (rs.getInt      ("id_etat"                                 ));
    intervention.setIdRefNumInter                      (rs.getInt      ("id_ref_num_inter"                        ));
    intervention.setAgeApproxVictime                   (rs.getInt      ("age_approx_victime"                      ));
    intervention.setVentilChiffre                      (rs.getInt      ("ventil_chiffre"                          ));
    intervention.setVentilSaturationO2                 (rs.getInt      ("ventil_saturation_o2"                    ));
    intervention.setCirculPoulsChiffre                 (rs.getInt      ("circul_pouls_chiffre"                    ));
    intervention.setCirculTensionRefBasse              (rs.getInt      ("circul_tension_ref_basse"                ));
    intervention.setCirculTensionRefHaute              (rs.getInt      ("circul_tension_ref_haute"                ));
    intervention.setDouleur                            (rs.getInt      ("douleur"                                 ));
    intervention.setGestesDsaNbChocs                   (rs.getInt      ("gestes_dsa_nb_chocs"                     ));
    intervention.setGestesInhalationO2LitreMin         (rs.getInt      ("gestes_inhalation_o2_litre_min"          ));
    intervention.setTransportMedicaliseeDe             (rs.getInt      ("transport_medicalisee_de"                ));
    intervention.setEvacHopitalDestination             (rs.getInt      ("evac_hopital_destination"                ));
    intervention.setEvacAggravationVentilation         (rs.getInt      ("evac_aggravation_ventilation"            ));
    intervention.setEvacAggravationCirculation         (rs.getInt      ("evac_aggravation_circulation"            ));
    intervention.setEvacAggravationDouleur             (rs.getInt      ("evac_aggravation_douleur"                ));
    intervention.setEvacPar                            (rs.getInt      ("evac_par"                                ));

    intervention.setCirculTensionBasse                 (rs.getFloat    ("circul_tension_basse"                    ));
    intervention.setCirculTensionHaute                 (rs.getFloat    ("circul_tension_haute"                    ));
    intervention.setGestesGlycemieGrammeLitre          (rs.getFloat    ("gestes_glycemie_gramme_litre"            ));
    intervention.setGestesTemperature                  (rs.getFloat    ("gestes_temperature"                      ));

    Position position = intervention.getPosition();
    position.setGoogleCoordsLat                        (rs.getFloat    ("google_coords_lat"                       ));
    position.setGoogleCoordsLong                       (rs.getFloat    ("google_coords_long"                      ));
    position.setRue                                    (rs.getString   ("rue"                                     ));
    position.setCodePostal                             (rs.getString   ("code_postal"                             ));
    position.setVille                                  (rs.getString   ("ville"                                   ));

    Position evacAutreDestinationPosition = intervention.getEvacAutreDestinationPosition();
    evacAutreDestinationPosition.setGoogleCoordsLat    (rs.getFloat    ("evac_autre_dest_google_coords_lat"       ));
    evacAutreDestinationPosition.setGoogleCoordsLong   (rs.getFloat    ("evac_autre_dest_google_coords_long"      ));
    evacAutreDestinationPosition.setRue                (rs.getString   ("evac_autre_dest_rue"                     ));
    evacAutreDestinationPosition.setCodePostal         (rs.getString   ("evac_autre_dest_code_postal"             ));
    evacAutreDestinationPosition.setVille              (rs.getString   ("evac_autre_dest_ville"                   ));
    
    
    intervention.setDhSaisie                           (rs.getTimestamp("DH_saisie"                               ));
    intervention.setDhReception                        (rs.getTimestamp("DH_reception"                            ));
    intervention.setDhDepart                           (rs.getTimestamp("DH_depart"                               ));
    intervention.setDhSurPlace                         (rs.getTimestamp("DH_sur_place"                            ));
    intervention.setDhBilanPrimaire                    (rs.getTimestamp("DH_bilan_primaire"                       ));
    intervention.setDhBilanSecondaire                  (rs.getTimestamp("DH_bilan_secondaire"                     ));
    intervention.setDhQuitteLesLieux                   (rs.getTimestamp("DH_quitte_les_lieux"                     ));
    intervention.setDhArriveeHopital                   (rs.getTimestamp("DH_arrivee_hopital"                      ));
    intervention.setDhFinIntervention                  (rs.getTimestamp("DH_fin_intervention"                     ));
    intervention.setDhAppelRenfortMedical              (rs.getTimestamp("DH_appel_renfort_medical"                ));
    intervention.setDhArriveeRenfortMedical            (rs.getTimestamp("DH_arrivee_renfort_medical"              ));
    intervention.setDateNaissance                      (rs.getDate     ("date_naissance"                          ));
    intervention.setGestesGarrotHeurePose              (rs.getTimestamp("gestes_garrot_heure_pose"                ));
    intervention.setEvacAggravationContactRegulation   (rs.getTimestamp("evac_aggravation_contact_regulation"     ));
    intervention.setAnnulationCommentaires             (rs.getString   ("annulation_commentaires"                 ));
    intervention.setComplementMotif                    (rs.getString   ("complement_motif"                        ));
    intervention.setNumInter                           (rs.getString   ("num_inter"                               ));
    intervention.setRefNumInter                        (rs.getString   ("ref_num_inter"                           ));
    intervention.setNomVictime                         (rs.getString   ("nom_victime"                             ));
    intervention.setNomJfVictime                       (rs.getString   ("nom_jf_victime"                          ));
    intervention.setPrenomVictime                      (rs.getString   ("prenom_victime"                          ));
    intervention.setLieuNaissance                      (rs.getString   ("lieu_naissance"                          ));
    intervention.setAdresseVictime                     (rs.getString   ("adresse_victime"                         ));
    intervention.setCodePostalVictime                  (rs.getString   ("code_postal_victime"                     ));
    intervention.setVilleVictime                       (rs.getString   ("ville_victime"                           ));
    intervention.setPaysVictime                        (rs.getString   ("pays_victime"                            ));
    intervention.setPersonneAPrevenir                  (rs.getString   ("personne_a_prevenir"                     ));
    intervention.setTelPersonneAPrevenir               (rs.getString   ("tel_personne_a_prevenir"                 ));
    intervention.setEffetOuObjetRemis                  (rs.getString   ("effet_ou_objet_remis"                    ));
    intervention.setEffetOuObjetRemisA                 (rs.getString   ("effet_ou_objet_remis_a"                  ));
    intervention.setNomContactSurPlace                 (rs.getString   ("nom_contact_sur_place"                   ));
    intervention.setCoordonneesContact                 (rs.getString   ("coordonnees_contact"                     ));
    intervention.setBatiment                           (rs.getString   ("batiment"                                ));
    intervention.setEtage                              (rs.getString   ("etage"                                   ));
    intervention.setPorte                              (rs.getString   ("porte"                                   ));
    intervention.setComplementAdresse                  (rs.getString   ("complement_adresse"                      ));
    intervention.setCsPciDuree                         (rs.getString   ("cs_pci_duree"                            ));
    intervention.setVentilCommentaire                  (rs.getString   ("ventil_commentaire"                      ));
    intervention.setCirculPoulsCommentaire             (rs.getString   ("circul_pouls_commentaire"                ));
    intervention.setGestesAutres                       (rs.getString   ("gestes_autres"                           ));
    intervention.setMedecinCivilSurPlace               (rs.getString   ("medecin_civil_sur_place"                 ));
    intervention.setEvacLaisseSurPlaceDecedeeADispoDe  (rs.getString   ("evac_laisse_sur_place_decedee_a_dispo_de"));
    intervention.setEvacNumInterBanlieu                (rs.getString   ("evac_num_inter_banlieu"                  ));
    intervention.setEvacAggravationNature              (rs.getString   ("evac_aggravation_nature"                 ));
    intervention.setEvacParAutre                       (rs.getString   ("evac_par_autre"                          ));
    intervention.setBilanCirconstances                 (rs.getString   ("bilan_circonstances"                     ));
    intervention.setBilanDetresses                     (rs.getString   ("bilan_detresses"                         ));
    intervention.setBilanAntecedents                   (rs.getString   ("bilan_antecedents"                       ));
    intervention.setBilanCommentaires                  (rs.getString   ("bilan_commentaires"                      ));
    intervention.setBilanEvaluationCi                  (rs.getString   ("bilan_evaluation_ci"                     ));
    intervention.setEvacAutreDestinationLabel          (rs.getString   ("evac_autre_dest_label"                   ));
    
    
    intervention.setHommeVictime                       (rs.getBoolean  ("homme_victime"                           ));
    intervention.setCsComa                             (rs.getBoolean  ("cs_coma"                                 ));
    intervention.setCsPci                              (rs.getBoolean  ("cs_pci"                                  ));
    intervention.setCsPcSecondaire                     (rs.getBoolean  ("cs_pc_secondaire"                        ));
    intervention.setCsAgitation                        (rs.getBoolean  ("cs_agitation"                            ));
    intervention.setCsConvulsions                      (rs.getBoolean  ("cs_convulsions"                          ));
    intervention.setVentilAbsence                      (rs.getBoolean  ("ventil_absence"                          ));
    intervention.setVentilSuperficielle                (rs.getBoolean  ("ventil_superficielle"                    ));
    intervention.setVentilRonflement                   (rs.getBoolean  ("ventil_ronflement"                       ));
    intervention.setVentilIrreguliere                  (rs.getBoolean  ("ventil_irreguliere"                      ));
    intervention.setVentilTirage                       (rs.getBoolean  ("ventil_tirage"                           ));
    intervention.setVentilPauses                       (rs.getBoolean  ("ventil_pauses"                           ));
    intervention.setVentilSueurs                       (rs.getBoolean  ("ventil_sueurs"                           ));
    intervention.setVentilSifflement                   (rs.getBoolean  ("ventil_sifflement"                       ));
    intervention.setVentilCyanose                      (rs.getBoolean  ("ventil_cyanose"                          ));
    intervention.setCirculPoulsNonPercu                (rs.getBoolean  ("circul_pouls_non_percu"                  ));
    intervention.setCirculPoulsIrregulier              (rs.getBoolean  ("circul_pouls_irregulier"                 ));
    intervention.setCirculPoulsFaible                  (rs.getBoolean  ("circul_pouls_faible"                     ));
    intervention.setCirculConjonctiveDecolorees        (rs.getBoolean  ("circul_conjonctive_decolorees"           ));
    intervention.setCirculPaleurCutanees               (rs.getBoolean  ("circul_paleur_cutanees"                  ));
    intervention.setCirculMarbrure                     (rs.getBoolean  ("circul_marbrure"                         ));
    intervention.setPupilleReactive                    (rs.getBoolean  ("pupille_reactive"                        ));
    intervention.setPupilleNonReactive                 (rs.getBoolean  ("pupille_non_reactive"                    ));
    intervention.setPupilleMyosisGauche                (rs.getBoolean  ("pupille_myosis_gauche"                   ));
    intervention.setPupilleMyosisDroite                (rs.getBoolean  ("pupille_myosis_droite"                   ));
    intervention.setPupilleMydriaseGauche              (rs.getBoolean  ("pupille_mydriase_gauche"                 ));
    intervention.setPupilleMydriaseDroite              (rs.getBoolean  ("pupille_mydriase_droite"                 ));
    intervention.setPupilleAsymetriques                (rs.getBoolean  ("pupille_asymetriques"                    ));
    intervention.setGestesLva                          (rs.getBoolean  ("gestes_lva"                              ));
    intervention.setGestesMce                          (rs.getBoolean  ("gestes_mce"                              ));
    intervention.setGestesAllongee                     (rs.getBoolean  ("gestes_allongee"                         ));
    intervention.setGestesPls                          (rs.getBoolean  ("gestes_pls"                              ));
    intervention.setGestesPansement                    (rs.getBoolean  ("gestes_pansement"                        ));
    intervention.setGestesRefroidissement              (rs.getBoolean  ("gestes_refroidissement"                  ));
    intervention.setGestesAspiration                   (rs.getBoolean  ("gestes_aspiration"                       ));
    intervention.setGestesDsa                          (rs.getBoolean  ("gestes_dsa"                              ));
    intervention.setGestesDemiAssis                    (rs.getBoolean  ("gestes_demi_assis"                       ));
    intervention.setGestesCollierCervical              (rs.getBoolean  ("gestes_collier_cervical"                 ));
    intervention.setGestesPointDeCompression           (rs.getBoolean  ("gestes_point_de_compression"             ));
    intervention.setGestesProtectionThermique          (rs.getBoolean  ("gestes_protection_thermique"             ));
    intervention.setGestesVa                           (rs.getBoolean  ("gestes_va"                               ));
    intervention.setGestesJambesSurelevees             (rs.getBoolean  ("gestes_jambes_surelevees"                ));
    intervention.setGestesAttelle                      (rs.getBoolean  ("gestes_attelle"                          ));
    intervention.setGestesGarrot                       (rs.getBoolean  ("gestes_garrot"                           ));
    intervention.setGestesImmobilisationGenerale       (rs.getBoolean  ("gestes_immobilisation_generale"          ));
    intervention.setCoordinateurBsppContacte           (rs.getBoolean  ("coordinateur_bspp_contacte"              ));
    intervention.setCoordinateurSamuContacte           (rs.getBoolean  ("coordinateur_samu_contacte"              ));
    intervention.setTransportMedicaliseeAr             (rs.getBoolean  ("transport_medicalisee_ar"                ));
    intervention.setTransportMedicaliseeUmh            (rs.getBoolean  ("transport_medicalisee_umh"               ));
    intervention.setPoliceSurPlace                     (rs.getBoolean  ("police_sur_place"                        ));
    intervention.setPompierSurPlace                    (rs.getBoolean  ("pompier_sur_place"                       ));
    intervention.setEvacLaisseSurPlace                 (rs.getBoolean  ("evac_laisse_sur_place"                   ));
    intervention.setEvacLaisseSurPlaceDecedee          (rs.getBoolean  ("evac_laisse_sur_place_decedee"           ));
    intervention.setEvacRefusDeTransport               (rs.getBoolean  ("evac_refus_de_transport"                 ));
    intervention.setEvacDecharche                      (rs.getBoolean  ("evac_decharche"                          ));
    intervention.setEvacAggravation                    (rs.getBoolean  ("evac_aggravation"                        ));
    intervention.setEvacAggravationPendantTransport    (rs.getBoolean  ("evac_aggravation_pendant_transport"      ));
    intervention.setEvacAggravationArriveADestination  (rs.getBoolean  ("evac_aggravation_arrive_a_destination"   ));

    return intervention;
  }
}
