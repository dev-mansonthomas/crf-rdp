INSERT INTO `intervention` (`id_intervention`, `id_dispositif`, `id_regulation`, `id_origine`, `id_motif`, `id_motif_annulation`, `id_etat`, `complement_motif`, `annulation_commentaires`, `num_inter`, `id_ref_num_inter`, `ref_num_inter`, `DH_saisie`, `DH_reception`, `DH_depart`, `DH_sur_place`, `DH_bilan_primaire`, `DH_bilan_secondaire`, `DH_quitte_les_lieux`, `DH_arrivee_hopital`, `DH_fin_intervention`, `DH_appel_renfort_medical`, `DH_arrivee_renfort_medical`, `homme_victime`, `nom_victime`, `nom_jf_victime`, `prenom_victime`, `age_approx_victime`, `date_naissance`, `lieu_naissance`, `adresse_victime`, `code_postal_victime`, `ville_victime`, `pays_victime`, `personne_a_prevenir`, `tel_personne_a_prevenir`, `effet_ou_objet_remis`, `effet_ou_objet_remis_a`, `nom_contact_sur_place`, `coordonnees_contact`, `batiment`, `etage`, `porte`, `complement_adresse`, `rue`, `code_postal`, `ville`, `google_coords_lat`, `google_coords_long`, `bilan_circonstances`, `bilan_detresses`, `bilan_antecedents`, `bilan_commentaires`, `bilan_evaluation_ci`, `cs_coma`, `cs_pci`, `cs_pci_duree`, `cs_pc_secondaire`, `cs_agitation`, `cs_convulsions`, `ventil_absence`, `ventil_chiffre`, `ventil_commentaire`, `ventil_superficielle`, `ventil_ronflement`, `ventil_irreguliere`, `ventil_tirage`, `ventil_pauses`, `ventil_sueurs`, `ventil_sifflement`, `ventil_cyanose`, `ventil_saturation_o2`, `circul_pouls_non_percu`, `circul_pouls_chiffre`, `circul_pouls_commentaire`, `circul_pouls_irregulier`, `circul_pouls_faible`, `circul_conjonctive_decolorees`, `circul_paleur_cutanees`, `circul_marbrure`, `circul_tension_basse`, `circul_tension_haute`, `circul_tension_ref_basse`, `circul_tension_ref_haute`, `pupille_reactive`, `pupille_non_reactive`, `pupille_myosis_gauche`, `pupille_myosis_droite`, `pupille_mydriase_gauche`, `pupille_mydriase_droite`, `pupille_asymetriques`, `douleur`, `gestes_lva`, `gestes_mce`, `gestes_allongee`, `gestes_pls`, `gestes_pansement`, `gestes_refroidissement`, `gestes_aspiration`, `gestes_dsa`, `gestes_dsa_nb_chocs`, `gestes_demi_assis`, `gestes_collier_cervical`, `gestes_point_de_compression`, `gestes_protection_thermique`, `gestes_va`, `gestes_jambes_surelevees`, `gestes_attelle`, `gestes_garrot`, `gestes_garrot_heure_pose`, `gestes_autres`, `gestes_inhalation_o2_litre_min`, `gestes_glycemie_gramme_litre`, `gestes_temperature`, `gestes_immobilisation_generale`, `coordinateur_bspp_contacte`, `coordinateur_samu_contacte`, `transport_medicalisee_ar`, `transport_medicalisee_umh`, `transport_medicalisee_de`, `medecin_civil_sur_place`, `police_sur_place`, `pompier_sur_place`, `evac_laisse_sur_place`, `evac_laisse_sur_place_decedee`, `evac_laisse_sur_place_decedee_a_dispo_de`, `evac_refus_de_transport`, `evac_decharche`, `evac_num_inter_banlieu`, `evac_hopital_destination`, `evac_autre_dest_label`, `evac_autre_dest_rue`, `evac_autre_dest_code_postal`, `evac_autre_dest_ville`, `evac_autre_dest_google_coords_lat`, `evac_autre_dest_google_coords_long`, `evac_aggravation`, `evac_aggravation_pendant_transport`, `evac_aggravation_arrive_a_destination`, `evac_aggravation_ventilation`, `evac_aggravation_circulation`, `evac_aggravation_douleur`, `evac_aggravation_contact_regulation`, `evac_aggravation_nature`, `evac_par`, `evac_par_autre`) 
VALUES 
(1,3,1,1,1,0,9,'Diarhrée Explosive',NULL,'0',NULL,NULL,'2009-09-10 19:28:30','2009-09-10 19:35:37','2009-09-10 19:35:50','2009-09-10 19:36:29','2009-09-10 19:36:35','2009-09-10 19:37:02','2009-09-10 19:37:13','2009-09-10 19:37:43','2009-09-10 19:37:47',NULL,NULL,1,'Tanpion',NULL,'Tar',89,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'1','4','au fond a droite','interphone : 7884','5 Impasse Poule','75020','Paris',48.853390,2.399246,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,142,'BICHAT - CLAUDE-BERNARD','46, rue Henri-Huchard','75018','Paris',48.899136,2.334483,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(2,2,1,2,2,0,9,'Tombé d\'un abri bus',NULL,'0',NULL,NULL,'2009-09-10 19:31:10','2009-09-10 19:35:47','2009-09-10 19:35:52','2009-09-10 19:36:30','2009-09-10 19:36:37','2009-09-10 19:37:01','2009-09-10 19:37:18','2009-09-10 19:37:36','2009-09-10 19:37:38',NULL,NULL,1,'Titi',NULL,'Toto',67,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'1','4','9','Interphone : 677','135 route de la Reine','92100','Boulogne Billancourt',48.840565,2.229522,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,143,'HOTEL-DIEU','1, place du Parvis Notre-Dame','75004','Paris',48.853264,2.348034,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(3,1,1,1,1,0,9,'Malaise',NULL,'0',NULL,NULL,'2009-09-10 19:34:28','2009-09-10 19:35:41','2009-09-10 19:35:53','2009-09-10 19:36:31','2009-09-10 19:36:51','2009-09-10 19:37:00','2009-09-10 19:37:27','2009-09-10 19:37:39','2009-09-10 19:37:44',NULL,NULL,0,'TIti',NULL,'Toto',34,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'1','5','6','dflkjgdflkgh','7 impasse Sesquez','92600','Asnières Sur Seine',48.906723,2.286325,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,144,'LARIBOISIERE','9, rue Ambroise Paré','75010','Paris',48.881939,2.352589,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(4,1,1,1,1,0,9,'Malaise',NULL,'',NULL,NULL,'2009-09-10 19:34:28','2009-09-10 19:35:41','2009-09-10 19:35:53','2009-09-10 19:36:31','2009-09-10 19:36:52','2009-09-10 19:37:04','2009-09-10 19:37:27','2009-09-10 19:37:39','2009-09-10 19:37:44',NULL,NULL,1,'Gldskjlsd',NULL,'lsdkjflsdjf',45,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'1','5','6','dflkjgdflkgh','7 impasse Sesquez','92600','Asnières Sur Seine',48.906723,2.286325,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,144,'LARIBOISIERE','9, rue Ambroise Paré','75010','Paris',48.881939,2.352589,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);

INSERT INTO `dispositif` (`id_dispositif`, `id_type_dispositif`, `id_regulation`, `creation_terminee`, `actif`, `indicatif_vehicule`, `O2_B1_volume`, `O2_B1_pression`, `O2_B2_volume`, `O2_B2_pression`, `O2_B3_volume`, `O2_B3_pression`, `O2_B4_volume`, `O2_B4_pression`, `O2_B5_volume`, `O2_B5_pression`, `dispositif_comment`, `dispositif_back_3_girl`, `dispositif_not_enough_O2`, `dispositif_set_available_with_warning`, `dsa_type`, `dsa_complet`, `observation`, `DH_debut`, `DH_fin`, `id_delegation_responsable`, `autre_delegation`, `contact_radio`, `contact_tel1`, `contact_tel2`, `contact_alphapage`, `identite_medecin`, `id_etat_dispositif`, `id_current_intervention`, `display_state`, `current_addresse_rue`, `current_addresse_code_postal`, `current_addresse_ville`, `current_google_coords_lat`, `current_google_coords_long`, `previous_addresse_rue`, `previous_addresse_code_postal`, `previous_addresse_ville`, `previous_google_coords_lat`, `previous_google_coords_long`, `DH_reception`, `DH_depart`, `DH_sur_place`, `DH_bilan_primaire`, `DH_bilan_secondaire`, `DH_quitte_les_lieux`, `DH_arrivee_hopital`, `DH_dispo`, `DH_fin_intervention`, `DH_a_sa_base`, `DH_appel_renfort_medical`, `DH_arrivee_renfort_medical`) 
VALUES 
(1,1,1,1,1,'Alpha Sud',5,200,5,200,5,200,5,200,5,200,'',0,0,0,'DSA',1,'','2009-09-10 18:57:14','2009-09-11 18:57:14',36,'N/A','75042','06 64 66 42 96','N/A','N/A','N/A',1,0,0,'9, rue Ambroise Paré','75010','Paris',48.881939,2.352589,'9, rue Ambroise Paré','75010','Paris',48.881939,2.352589,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2009-09-10 19:37:46','2009-09-10 19:37:44',NULL,NULL,NULL),
(2,2,1,1,1,'Rousseau',5,200,5,200,5,200,5,200,5,200,'',0,0,0,'DSA',1,'','2009-09-10 18:57:14','2009-09-11 18:57:14',37,'N/A','75062','N/A','N/A','N/A','N/A',1,0,0,'1, place du Parvis Notre-Dame','75004','Paris',48.853264,2.348034,'1, place du Parvis Notre-Dame','75004','Paris',48.853264,2.348034,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2009-09-10 19:37:47','2009-09-10 19:37:38',NULL,NULL,NULL),
(3,1,1,1,1,'Alpha Nord',5,200,5,200,5,200,5,200,5,200,'',0,0,0,'DSA',1,'','2009-09-10 18:57:14','2009-09-11 18:57:14',45,'N/A','75092','N/A','N/A','N/A','N/A',1,0,0,'46, rue Henri-Huchard','75018','Paris',48.899136,2.334483,'46, rue Henri-Huchard','75018','Paris',48.899136,2.334483,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2009-09-10 19:37:48','2009-09-10 19:37:47',NULL,NULL,NULL);

alter table dispositif auto_increment = 3;
alter table intervention auto_increment = 3;

INSERT INTO `dispositif_equipiers` (`id_dispositif`, `id_equipier`, `id_role_equipier`, `en_evaluation`, `id_role_en_eval`) VALUES (1,68,9,0,0),(1,589,5,0,0),(1,1064,9,0,0),(1,1856,9,0,0),(1,2525,7,0,0),(2,20,7,0,0),(2,98,9,0,0),(2,158,6,0,0),(2,463,9,0,0),(2,796,9,0,0),(3,179,7,0,0),(3,282,9,0,0),(3,537,9,0,0),(3,898,9,0,0),(3,1099,5,0,0);

