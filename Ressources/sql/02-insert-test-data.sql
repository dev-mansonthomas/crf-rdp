-- Insert test data
insert into `user` ( `num_nivol`, `user_is_male`, `password`,`nom`,`prenom`,`mobile`,`email`, `id_delegation`, `autre_delegation`, `id_role`, `id_regulation` )
values
('75233A', true , '033bd94b1168d7e4f0d644c3c95e35bf','Manson' , 'Thomas' ,'06060606060', 'toto@toto.com', 4, '', 1, 0 ),
('111111', false, '033bd94b1168d7e4f0d644c3c95e35bf','Manson' , 'User1'  ,'06060606060', 'toto@toto.com', 4, '', 2, 0 ),
('222222', false, '033bd94b1168d7e4f0d644c3c95e35bf','Manson' , 'User2'  ,'06060606060', 'toto@toto.com', 4, '', 3, 0 ),
('223222', false, '033bd94b1168d7e4f0d644c3c95e35bf','Manson' , 'User3'  ,'06060606060', 'toto@toto.com', 4, '', 3, 0 ),
('224333', true , '033bd94b1168d7e4f0d644c3c95e35bf','Manson' , 'User4'  ,'06060606060', 'toto@toto.com', 4, '', 3, 0 ),
('224334', true , '033bd94b1168d7e4f0d644c3c95e35bf','Manson' , 'User5'  ,'06060606060', 'toto@toto.com', 4, '', 3, 0 ),
('224344', true , '033bd94b1168d7e4f0d644c3c95e35bf','Manson' , 'User6'  ,'06060606060', 'toto@toto.com', 4, '', 3, 0 ),
('224335', false, '033bd94b1168d7e4f0d644c3c95e35bf','Manson' , 'User7'  ,'06060606060', 'toto@toto.com', 4, '', 2, 0 ),
('224336', true , '033bd94b1168d7e4f0d644c3c95e35bf','Manson' , 'User8'  ,'06060606060', 'toto@toto.com', 4, '', 3, 0 ),
('224337', false, '033bd94b1168d7e4f0d644c3c95e35bf','Manson' , 'User9'  ,'06060606060', 'toto@toto.com', 4, '', 4, 0 ),
('222223', true , '033bd94b1168d7e4f0d644c3c95e35bf','Manson' , 'User10' ,'06060606060', 'toto@toto.com', 4, '', 1, 0 );



insert into regulation (`start_date` ,`expected_end_date` ,`open`,`id_regulateur`,`label` ,`comment` )
values
(NOW()            , ADDDATE(NOW(),1 ), true , 2, 'Régulation Paris' , 'Régulation de Test'),
(NOW()            , ADDDATE(NOW(),1 ), true , 3, 'Marathon de Paris', 'Régulation de Test'),
(ADDDATE(NOW(),-2), ADDDATE(NOW(),-1), false, 2, 'Régulation Paris' , 'Régulation de Test'),
(ADDDATE(NOW(),-3), ADDDATE(NOW(),-2), false, 2, 'Régulation Paris' , 'Régulation de Test');

INSERT INTO `dispositif` (`id_dispositif`,`id_type_dispositif`,`id_regulation`,`actif`,`indicatif_vehicule`,`O2_B1_volume`,`O2_B1_pression`,`O2_B2_volume`,`O2_B2_pression`,`O2_B3_volume`,`O2_B3_pression`,`O2_B4_volume`,`O2_B4_pression`,`O2_B5_volume`,`O2_B5_pression`,`dispositif_comment`,`dispositif_back_3_girl`,`dispositif_not_enough_O2`,`dispositif_set_available_with_warning`,`creation_terminee`,`dsa_type`,`dsa_complet`,`observation`,`DH_debut`,`DH_fin`,`id_delegation_responsable`,`autre_delegation`,`contact_radio`,`contact_tel1`,`contact_tel2`,`contact_alphapage`,`identite_medecin`,`id_etat_dispositif`,`id_current_intervention`,`display_state`,`current_addresse_rue`,`current_addresse_code_postal`,`current_addresse_ville`,`current_google_coords_lat`,`current_google_coords_long`,`previous_addresse_rue`,`previous_addresse_code_postal`,`previous_addresse_ville`,`previous_google_coords_lat`,`previous_google_coords_long`,`DH_reception`,`DH_depart`,`DH_sur_place`,`DH_bilan_primaire`,`DH_bilan_secondaire`,`DH_quitte_les_lieux`,`DH_arrivee_hopital`,`DH_dispo`,`DH_a_sa_base`,`DH_appel_renfort_medical`,`DH_arrivee_renfort_medical`) VALUES
 (1,1,1,true,'Alpha Sud',5,200,5,200,5,200,5,200,5,200,'',0,0,0,1,'DEA',1,'','2008-09-18 20:23:09','2008-09-19 20:23:09',5,'N/A','75042','06 64 66 42 96','N/A','N/A','N/A'  ,1,0,0,'36 rue Geoffroy l asnier','75004','Paris',48.855434,2.357217,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
 (2,1,1,true,'Alpha Nord',5,200,5,200,5,200,5,200,5,200,'',0,0,0,1,'DEA',1,'','2008-09-18 20:23:09','2008-09-19 20:23:09',6,'N/A','75052','06 64 66 01','N/A','N/A','N/A'    ,1,0,0,'5 rue de Thann','75017','Paris',48.881165,2.309461,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
 (3,2,1,true,'Port Royal',5,200,5,200,5,200,5,200,5,200,'',0,0,0,1,'DEA',1,'','2008-09-18 20:23:09','2008-09-19 20:23:09',17,'N/A','75162','06 64 66 42 04','N/A','N/A','N/A',1,0,0,'17 rue de Cronstadt','75015','Paris',48.834469,2.302085,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);



INSERT INTO `equipier` (`id_equipier`,`id_dispositif`,`num_nivol`,`equipier_is_male`, `enabled`, `nom`,`prenom`,`mobile`,`email`,`id_delegation`,`autre_delegation`) VALUES
 (1 ,1,'22223A',1,1,'Manson' ,'Thomas'   ,'0606060606','toto@toto.com',6,''),
 (2 ,1,'222211',1,1,'Manson' ,'Thomas'   ,'0606060606','toto@toto.com',6,''),
 (3 ,1,'222221',0,1,'Manson' ,'Raphaelle','0606060606','toto@toto.com',6,''),
 (4 ,1,'222222',0,1,'Manson' ,'Séverine' ,'0606060606','toto@toto.com',6,''),
 (5 ,2,'222233',1,1,'Manson' ,'Alexandre','0606060606','toto@toto.com',6,''),
 (6 ,1,'222234',1,1,'Manson' ,'Richard'  ,'0606060606','toto@toto.com',6,''),
 (7 ,2,'222244',1,1,'Manson' ,'Titi'     ,'0606060606','toto@toto.com',6,''),
 (8 ,3,'222245',1,1,'Manson' ,'Bastien'  ,'0606060606','toto@toto.com',6,''),
 (9 ,2,'222235',0,1,'Manson' ,'Stéphanie','0606060606','toto@toto.com',6,''),
 (10,3,'222236',1,1,'Manson' ,'Sébastien','0606060606','toto@toto.com',6,''),
 (11,2,'222237',0,1,'Manson' ,'Marine'   ,'0606060606','toto@toto.com',6,''),
 (12,3,'222223',1,1,'Manson' ,'Philippe' ,'0606060606','toto@toto.com',6,''),
 (13,2,'222224',1,1,'Manson' ,'Philippe1','0606060606','toto@toto.com',6,''),
 (14,3,'222225',1,1,'Manson' ,'Philippe2','0606060606','toto@toto.com',6,''),
 (15,3,'222226',1,1,'Manson' ,'Philippe3','0606060606','toto@toto.com',6,''),
 (16,0,'222227',1,1,'Manson' ,'Philippe4','0606060606','toto@toto.com',6,''),
 (17,0,'222228',1,1,'Manson' ,'Philippe5','0606060606','toto@toto.com',6,''),
 (18,0,'222229',1,1,'Manson' ,'Philippe6','0606060606','toto@toto.com',6,''),
 (19,0,'222227',1,1,'Manson' ,'Philippe4','0606060606','toto@toto.com',6,''),
 (20,0,'222228',1,1,'Manson' ,'Philippe5','0606060606','toto@toto.com',6,''),
 (21,0,'222229',1,1,'Manson' ,'Philippe6','0606060606','toto@toto.com',6,'');



INSERT INTO `dispositif_equipiers` (
  `id_dispositif`    ,
  `id_equipier`      ,
  `id_role_equipier` ,
  `en_evaluation`       
)
VALUES
(1,1 ,9,false),
(1,2 ,4,true ),
(1,3 ,9,false),
(1,4 ,9,false),
(2,5 ,9,false),
(1,6 ,7,false),
(2,7 ,7,false),
(3,8 ,9,false),
(2,9 ,4,false),
(3,10,7,true ),
(2,11,9,false),
(3,12,4,false),
(2,13,9,false),
(3,14,9,false),
(3,15,9,false),
(0,16,0,false),
(0,17,0,false),
(0,18,0,false);


INSERT INTO `equipier_roles` (
  `id_equipier`     ,
  `id_role_equipier`,
  `en_evaluation`   
)
VALUES
(1 ,9 ,false),
(1 ,10,false),
(1 ,11,false),
(2 ,4 ,true ),
(2 ,7 ,false),
(2 ,9 ,false),
(2 ,10,false),
(2 ,11,false),
(3 ,9 ,false),
(3 ,10,false),
(3 ,11,false),
(4 ,9 ,false),
(4 ,10,false),
(4 ,11,false),
(5 ,9 ,false),
(5 ,10,false),
(5 ,11,false),
(6 ,7 ,false),
(6 ,9 ,false),
(6 ,10,false),
(6 ,11,false),
(7 ,7 ,false),
(7 ,9 ,false),
(7 ,10,false),
(7 ,11,false),
(8 ,9 ,false),
(8 ,10,false),
(8 ,11,false),
(9 ,4 ,false),
(9 ,9 ,false),
(9 ,10,false),
(9 ,11,false),
(10,7 ,true ),
(10,9 ,false),
(10,10,false),
(10,11,false),
(11,9 ,false),
(11,10,false), 
(11,11,false), 
(12,4 ,false),
(12,9 ,false),
(12,10,false),
(12,11,false),
(13,9 ,false), 
(13,10,false), 
(13,11,false), 
(14,9 ,false),
(14,10,false), 
(14,11,false), 
(15,9 ,false),
(15,10,false), 
(15,11,false),
(16,4 ,false),
(16,7 ,false),
(16,9 ,false),
(16,10,false), 
(16,11,false),
(17,4 ,false),
(17,7 ,false),
(17,9 ,false),
(17,10,false), 
(17,11,false),
(18,4 ,false),
(18,7 ,false),
(18,9 ,false),
(18,10,false), 
(18,11,false),
(19,4 ,false),
(19,7 ,false),
(19,9 ,false),
(19,10,false), 
(19,11,false),
(20,4 ,false),
(20,7 ,false),
(20,9 ,false),
(20,10,false), 
(20,11,false),
(21,4 ,false),
(21,7 ,false),
(21,9 ,false),
(21,10,false), 
(21,11,false);

INSERT INTO `intervention` (`id_intervention`,`id_dispositif`,`id_regulation`,`id_origine`,`id_motif`,`id_motif_annulation`,`id_etat`,`complement_motif`,`num_inter`,`id_ref_num_inter`,`ref_num_inter`,`DH_saisie`,`DH_reception`,`DH_depart`,`DH_sur_place`,`DH_bilan_primaire`,`DH_bilan_secondaire`,`DH_quitte_les_lieux`,`DH_arrivee_hopital`,`DH_fin_intervention`,`DH_appel_renfort_medical`,`DH_arrivee_renfort_medical`,`homme_victime`,`nom_victime`,`nom_jf_victime`,`prenom_victime`,`age_approx_victime`,`date_naissance`,`lieu_naissance`,`adresse_victime`,`code_postal_victime`,`ville_victime`,`pays_victime`,`personne_a_prevenir`,`tel_personne_a_prevenir`,`effet_ou_objet_remis`,`effet_ou_objet_remis_a`,`nom_contact_sur_place`,`coordonnees_contact`,`batiment`,`etage`,`porte`,`complement_adresse`,`rue`,`code_postal`,`ville`,`google_coords_lat`,`google_coords_long`,`bilan_circonstances`,`bilan_detresses`,`bilan_antecedents`,`bilan_commentaires`,`bilan_evaluation_ci`,`cs_coma`,`cs_pci`,`cs_pci_duree`,`cs_pc_secondaire`,`cs_agitation`,`cs_convulsions`,`ventil_absence`,`ventil_chiffre`,`ventil_commentaire`,`ventil_superficielle`,`ventil_ronflement`,`ventil_irreguliere`,`ventil_tirage`,`ventil_pauses`,`ventil_sueurs`,`ventil_sifflement`,`ventil_cyanose`,`ventil_saturation_o2`,`circul_pouls_non_percu`,`circul_pouls_chiffre`,`circul_pouls_commentaire`,`circul_pouls_irregulier`,`circul_pouls_faible`,`circul_conjonctive_decolorees`,`circul_paleur_cutanees`,`circul_marbrure`,`circul_tension_basse`,`circul_tension_haute`,`circul_tension_ref_basse`,`circul_tension_ref_haute`,`pupille_reactive`,`pupille_non_reactive`,`pupille_myosis_gauche`,`pupille_myosis_droite`,`pupille_mydriase_gauche`,`pupille_mydriase_droite`,`pupille_asymetriques`,`douleur`,`gestes_lva`,`gestes_mce`,`gestes_allongee`,`gestes_pls`,`gestes_pansement`,`gestes_refroidissement`,`gestes_aspiration`,`gestes_dsa`,`gestes_dsa_nb_chocs`,`gestes_demi_assis`,`gestes_collier_cervical`,`gestes_point_de_compression`,`gestes_protection_thermique`,`gestes_va`,`gestes_jambes_surelevees`,`gestes_attelle`,`gestes_garrot`,`gestes_garrot_heure_pose`,`gestes_autres`,`gestes_inhalation_o2_litre_min`,`gestes_glycemie_gramme_litre`,`gestes_temperature`,`gestes_immobilisation_generale`,`coordinateur_bspp_contacte`,`coordinateur_samu_contacte`,`transport_medicalisee_ar`,`transport_medicalisee_umh`,`transport_medicalisee_de`,`medecin_civil_sur_place`,`police_sur_place`,`pompier_sur_place`,`evac_laisse_sur_place`,`evac_laisse_sur_place_decedee`,`evac_laisse_sur_place_decedee_a_dispo_de`,`evac_refus_de_transport`,`evac_decharche`,`evac_num_inter_banlieu`,`evac_hopital_destination`,`evac_autre_dest_label`,`evac_autre_dest_rue`,`evac_autre_dest_code_postal`,`evac_autre_dest_ville`,`evac_autre_dest_google_coords_lat`,`evac_autre_dest_google_coords_long`,`evac_aggravation`,`evac_aggravation_pendant_transport`,`evac_aggravation_arrive_a_destination`,`evac_aggravation_ventilation`,`evac_aggravation_circulation`,`evac_aggravation_douleur`,`evac_aggravation_contact_regulation`,`evac_aggravation_nature`,`evac_par`,`evac_par_autre`) VALUES
 (1,0,1,1,1,0,1,'Complément info personne malade ','0',NULL,NULL,'2008-09-18 20:55:59',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'Manson',NULL,'Thomas',30,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Manson Robert','06 64 66 42 96','1','7','1','code porte:  35496798','135 route de la reine','92100','Boulogne Billancourt',48.840576,2.229526,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
 (2,0,1,1,4,0,1,'Complement info malaise','0',NULL,NULL,'2008-09-18 20:57:01',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'Nours',NULL,'Bisous',78,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'papa Nours','06 45 78 94 12','1','3','1','fsdfsdf',                           '7 impasse Sesquez','92600','Asnières Sur  Seine',48.906731,2.286220,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
 (3,0,1,2,3,0,1,'Accident de poucette.','0',NULL,NULL,'2008-09-18 20:58:32',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'Moujeau',NULL,'Papi',126,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Mme Moujeau','01 45 78 99 55','1','1','1','bla bla bla',   '5 Impasse Poule','75020','Paris',48.853390,2.399246,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);