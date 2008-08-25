insert into delegation (nom, departement)
values
('National'      ,'00000'),
('Département 75','75000'),
('PARIS-I'       ,'75001'),
('PARIS-III'     ,'75003'),
('PARIS-IV'      ,'75004'),
('PARIS-V'       ,'75005'),
('PARIS-VI'      ,'75006'),
('PARIS-VII'     ,'75007'),
('PARIS-VIII'    ,'75008'),
('PARIS-IX'      ,'75009'),
('PARIS-X'       ,'75010'),
('PARIS-XI'      ,'75011'),
('PARIS-XII'     ,'75012'),
('PARIS-XIII'    ,'75013'),
('PARIS-XIV'     ,'75014'),
('PARIS-XV'      ,'75015'),
('PARIS-XVI'     ,'75016'),
('PARIS-XVII'    ,'75017'),
('PARIS-XVIII'   ,'75018'),
('PARIS-XIX'     ,'75019'),
('PARIS-XX'      ,'75020'),
('Autre'         ,'{N/A}');

update delegation set id_delegation=0 where id_delegation = 22;

insert into dispositif_etat (label_etat)
values
('Dispo'),
('Intervention Affectée'),
('Parti'),
('Sur Place'),
('Primaire passé'),
('Secondaire passé'),
('Transport'),
('Arrivé à l''Hopital'),
('Intervention Terminée'),
('A sa base'),
('Indispo - Equipage incomplet'),
('Indispo - Matériel incomplet'),
('Indisponible'),
('N/A');

update dispositif_etat set id_etat = 0  where id_etat = 14;
update dispositif_etat set id_etat = -1 where id_etat = 13;
update dispositif_etat set id_etat = -2 where id_etat = 12;
update dispositif_etat set id_etat = -3 where id_etat = 11;


insert into dispositif_type (label_type)
values
('ALPHA'),
('BSPP'),
('Poste de Secours'),
('Point d''Alerte'),
('N/A');

update dispositif_type set id_type = 0 where id_type = 5;

insert into equipier_role (label_role)
values                                
('CI'),                               
('CI en eval'),                       
('Chauffeur'),                 
('CFAPSE'),                           
('AFPS'),
('N/A');

update equipier_role set id_role = 0 where id_role = 6;

insert into user_role (label_role, code_role)
values
('Administrateur', 'ADMINISTRATEUR'),
('Régulateur'    , 'REGULATEUR'    ),
('Co-Régulateur' , 'CO-REGULATEUR' ),
('Observateur'   , 'OBSERVATEUR'   ),
('N/A'           , 'N/A'           );

update user_role set id_role = 0 where id_role = 5;

insert into `user` ( `num_nivol`, `user_is_male`, `password`,`nom`,`prenom`, `id_delegation`, `autre_delegation`, `id_role`, `id_regulation` )
values
('NA', true, '0','N/A'     , 'N/A'    , 0, '', 0, 0 );

update `user` set id_user = 0 where id_user = 1;

insert into regulation (`start_date` ,`expected_end_date` ,`open`,`id_regulateur`,`label` ,`comment` )
values
(MAKEDATE(1970,1), MAKEDATE(1970,2), false, 0, 'N/A', 'N/A');

update regulation set id_regulation = 0 where id_regulation = 1;

insert into `dispositif`
(
  `id_type_dispositif` ,   `id_regulation` ,  `indicatif_vehicule` ,  `O2_B1_volume` ,
  `O2_B1_pression` ,  `O2_B2_volume` ,  `O2_B2_pression` ,  `O2_B3_volume` ,  `O2_B3_pression` ,
  `O2_B4_volume` ,  `O2_B4_pression` , `O2_B5_volume` ,  `O2_B5_pression` , `dispositif_comment` ,
  `dispositif_back_3_girl`, `dispositif_not_enough_O2`, `dispositif_set_available_with_warning`,
  `dsa_type` ,  `dsa_complet` ,  `observation` ,  `DH_debut` ,  `DH_fin` ,  `id_delegation_responsable` ,
  `autre_delegation` ,  `contact_radio` ,  `contact_tel1` ,  `contact_tel2` ,  `contact_alphapage` ,
  `identite_medecin` ,  `id_etat_dispositif`, `id_current_intervention`, `display_state`
)
VALUES
(	0, 0, 'N/A', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '', 
	false, false, false, 'N/A', 0, '',
	MAKEDATE(1970,1), MAKEDATE(1970,2), 1, 'N/A',
	'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 0, 0, 0
);

update dispositif set id_dispositif = 0 where id_dispositif = 1;

insert into intervention_origine
  (label_origine)
values
  ('SAMU'),
  ('BSPP'),
  ('Poste de Secours'),
  ('Point d''Alerte'),
  ('Se présente'),
  ('Autre'),
  ('N/A');

update intervention_origine set id_origine = 0 where id_origine = 7;

insert into intervention_motif
  (label_motif)
values
  ('Personne Malade'),
  ('Personne Blessée'),
  ('AVP'),
  ('Malaise'),
  ('Autre'),
  ('N/A');

update intervention_motif set id_motif = 0 where id_motif = 6;

-- etat_intervention -1: intervention annnulée, 0:en cours de création, 1: création terminée, 2:intervention affectée, 3:intervention terminée
insert into intervention_etat (label_etat)
values
('Non Affectée'),
('Affectée'),
('Dispositif Parti'),
('Dispositif Sur Place'),
('Primaire passé'),
('Secondaire passé'),
('Transport'),
('Arrivé à l''Hopital'),
('Terminée'),
('Annulée'),
('En cours de création');

update intervention_etat set id_etat = 0 where id_etat = 11;

-- type de lieux
INSERT INTO `lieu_type` (`id_type_lieu`,`num_ordre`,`label_type_lieu`,`icon_class_lieu`, `icon_lieu`,`icon_gmap_init`) VALUES 
 (1,1,'Hopital'                        ,'hopitalIcon'         ,'gmap/hopital.png'          ,'icon=new GIcon();\r\nicon.image=contextPath+\"/img/gmap/hopital.png\";\r\nicon.shadow=contextPath+\"/img/gmap/hopital-s.png\";\r\nicon.iconSize=new GSize(24.0, 24.0);\r\nicon.shadowSize=new GSize(37.0, 24.0);\r\nicon.iconAnchor=new GPoint(12.0, 12.0);\r\nicon.infoWindowAnchor=new GPoint(12.0, 12.0);'),
 (2,2,'Centre de Secours des Pompiers' ,'pompierIcon'         ,'gmap/pompier.png'          ,'icon=new GIcon();\r\nicon.image=contextPath+\"/img/gmap/pompier.png\";\r\nicon.shadow=contextPath+\"/img/gmap/pompier-s.png\";\r\nicon.iconSize=new GSize(28.0, 30.0);\r\nicon.shadowSize=new GSize(44.0, 30.0);\r\nicon.iconAnchor=new GPoint(14.0, 15.0);\r\nicon.infoWindowAnchor=new GPoint(14.0, 15.0);'),
 (3,3,'CRF - Base locale'              ,'localCroixRougeIcon' ,'gmap/local-croix-rouge.png','icon=new GIcon();\r\nicon.image=contextPath+\"/img/gmap/local-croix-rouge.png\";\r\nicon.shadow=contextPath+\"/img/gmap/local-croix-rouge-s.png\";\r\nicon.iconSize=new GSize(32.0, 32.0);\r\nicon.shadowSize=new GSize(49.0, 32.0);\r\nicon.iconAnchor=new GPoint(16.0, 32.0);\r\nicon.infoWindowAnchor=new GPoint(16.0, 0.0);\r\n'),
 (4,4,'Station Service H24'            ,'stationserviceIcon'  ,'gmap/stationservice.png'   ,'icon=new GIcon();\r\nicon.image=contextPath+\"/img/gmap/stationservice.png\";\r\nicon.shadow=contextPath+\"/img/gmap/stationservice-s.png\";\r\nicon.iconSize=new GSize(25.0, 28.0);\r\nicon.shadowSize=new GSize(40.0, 28.0);\r\nicon.iconAnchor=new GPoint(12.0, 14.0);\r\nicon.infoWindowAnchor=new GPoint(12.0, 14.0);'),
 (5,5,'Boulangerie/Fast Food/Resto H24','restoIcon'           ,'gmap/resto.png'            ,'icon=new GIcon();\r\nicon.image=contextPath+\"/img/gmap/resto.png\";\r\nicon.shadow=contextPath+\"/img/gmap/resto-s.png\";\r\nicon.iconSize=new GSize(28.0, 28.0);\r\nicon.shadowSize=new GSize(43.0, 28.0);\r\nicon.iconAnchor=new GPoint(14.0, 14.0);\r\nicon.infoWindowAnchor=new GPoint(14.0, 14.0);'),
 (6,6,'Pharmacie H24'                  ,'pharmacieIcon'       ,'gmap/pharmacie.png'        ,'icon=new GIcon();\r\nicon.image=contextPath+\"/img/gmap/pharmacie.png\";\r\nicon.shadow=contextPath+\"/img/gmap/pharmacie-s.png\";\r\nicon.iconSize=new GSize(28.0, 28.0);\r\nicon.shadowSize=new GSize(43.0, 28.0);\r\nicon.iconAnchor=new GPoint(14.0, 14.0);\r\nicon.infoWindowAnchor=new GPoint(14.0, 14.0);'),
 (7,7,'Police'                         ,'policeIcon'          ,'gmap/police.png'           ,'icon=new GIcon();\r\nicon.image=contextPath+\"/img/gmap/police.png\";\r\nicon.shadow=contextPath+\"/img/gmap/police-s.png\";\r\nicon.iconSize=new GSize(26.0, 26.0);\r\nicon.shadowSize=new GSize(40.0, 26.0);\r\nicon.iconAnchor=new GPoint(13.0, 13.0);\r\nicon.infoWindowAnchor=new GPoint(13.0, 13.0);'),
 (8,8,'Intervention'                   ,'interventionIcon'    ,'gmap/intervention.png'     ,'icon=new GIcon();\r\nicon.image=contextPath+\"/img/gmap/intervention.png\";\r\nicon.shadow=contextPath+\"/img/gmap/intervention-s.png\";\r\nicon.iconSize=new GSize(16.0, 16.0);\r\nicon.shadowSize=new GSize(25.0, 16.0);\r\nicon.iconAnchor=new GPoint(8.0, 8.0);\r\nicon.infoWindowAnchor=new GPoint(8.0, 8.0);'),
 (9,9,'Ambulance'                      ,'ambulanceIcon'       ,'gmap/ambulance.png'        ,'icon=new GIcon();\r\nicon.image=contextPath+\"/img/gmap/ambulance.png\";\r\nicon.shadow=contextPath+\"/img/gmap/ambulance-s.png\";\r\nicon.iconSize=new GSize(24.0, 24.0);\r\nicon.shadowSize=new GSize(37.0, 24.0);\r\nicon.iconAnchor=new GPoint(12.0, 12.0);\r\nicon.infoWindowAnchor=new GPoint(12.0, 12.0);');
-- lieux
INSERT INTO `lieu` (`id_lieu`,`id_type_lieu`,`icon`,`icon_gmap_init`,`nom`,`addresse`,`code_postal`,`ville`,`google_coords_lat`,`google_coords_long`,`info_complementaire`) VALUES 
 (1 ,1,NULL,NULL,'BICHAT - CLAUDE-BERNARD'   ,'46, rue Henri-Huchard','75018','Paris',48.899136,2.334483,NULL),
 (2 ,1,NULL,NULL,'HOTEL-DIEU'                ,'1, place du Parvis Notre-Dame','75004','Paris',48.853264,2.348034,'<b>Attention : </b> Entrée des urgence a changé'),
 (3 ,1,NULL,NULL,'LARIBOISIERE'              ,'9, rue Ambroise Paré','75010','Paris',48.881939,2.352589,NULL),
 (4 ,2,NULL,NULL,'Rousseau'                  ,'21, rue du Jour','75001','Paris',48.863880,2.344957,NULL),
 (5 ,2,NULL,NULL,'Sévigné'                   ,'7, rue Sévigné','75004','Paris',48.855671,2.362153,NULL),
 (6 ,2,NULL,NULL,'Dauphine'                  ,'2, rue François Millet','75016','Paris',48.850437,2.273220,NULL),
 (7 ,2,NULL,NULL,'Montmartre'                ,'12, rue Carpeaux','75018','Paris',48.891346,2.332324,NULL),
 (8 ,3,NULL,NULL,'CRF - Base IV'             ,"36, rue Geoffroy l'Asnier",'75004','Paris',48.855434,2.357217,NULL),
 (9 ,3,NULL,NULL,'CRF - Base XVI'            ,'68, rue de Passy','75016','Paris',48.857967,2.277349,NULL),
 (10,3,NULL,NULL,'CRF - Base XIV'            ,'72, rue Halle','75014','Paris',48.829185,2.331103,NULL),
 (11,4,NULL,NULL,'Station Total Victor Hugo' ,'183, avenue Victor Hugo','75016','Paris',48.865891,2.276386,NULL),
 (12,5,NULL,NULL,'Le Pied de Cochon'         ,'6, rue Coquillière','75001','Paris',48.863377,2.343667,NULL),
 (13,6,NULL,NULL,'Pharmacie Les Champs'      ,'84, avenue des Champs-Elysées','75008','Paris',48.871059,2.303572,NULL),
 (14,6,NULL,NULL,'Pharmacie Européenne'      ,'6, place Clichy','75009','Paris',48.883270,2.327567,NULL),
 (15,6,NULL,NULL,'Grande Pharmacie Daumesnil','6, place Félix Eboué','75012','Paris',48.839417,2.395632,NULL),
 (16,7,NULL,NULL,'Commissariat Central, 20eme','48, avenue Gambetta','75020','Paris',48.865781,2.39925,NULL),
 (17,7,NULL,NULL,'Commissariat Central, 19eme','3, rue Erik Satie','75019','Paris',48.884248,2.38627,'S.A.R.I.J Service Accueil Recherche Investigation Judiciaire'),
 (18,7,NULL,NULL,'Commissariat Central, 15eme','250 rue Vaugirard','75015','Paris',48.839833,2.302275,'U.P.Q Unité Police Quartier St Lambert - S.A.R.I.J Service Accueil Recherche Investigation Judiciaire');


-- Insert test data
insert into `user` ( `num_nivol`, `user_is_male`, `password`,`nom`,`prenom`, `id_delegation`, `autre_delegation`, `id_role`, `id_regulation` )
values
('75233A', true , '033bd94b1168d7e4f0d644c3c95e35bf','Manson'     , 'Thomas'    , 4, '', 1, 0 ),
('111111', false, '033bd94b1168d7e4f0d644c3c95e35bf','Arecki'     , 'Thomas'    , 4, '', 2, 0 ),
('222222', false, '033bd94b1168d7e4f0d644c3c95e35bf','Escoube'    , 'Raphaelle' , 4, '', 3, 0 ),
('223222', false, '033bd94b1168d7e4f0d644c3c95e35bf','Coutant'    , 'Séverine'  , 4, '', 3, 0 ),
('224333', true , '033bd94b1168d7e4f0d644c3c95e35bf','Philipakis' , 'Alexandre' , 4, '', 3, 0 ),
('224334', true , '033bd94b1168d7e4f0d644c3c95e35bf','Phills'     , 'Richard'   , 4, '', 3, 0 ),
('224344', true , '033bd94b1168d7e4f0d644c3c95e35bf','Poules'     , 'Titi'      , 4, '', 3, 0 ),
('224335', false, '033bd94b1168d7e4f0d644c3c95e35bf','Sergent'    , 'Stéphanie' , 4, '', 2, 0 ),
('224336', true , '033bd94b1168d7e4f0d644c3c95e35bf','Valet'      , 'Fabien'    , 4, '', 3, 0 ),
('224337', false, '033bd94b1168d7e4f0d644c3c95e35bf','Soulas'     , 'Marine'    , 4, '', 4, 0 ),
('222223', true , '033bd94b1168d7e4f0d644c3c95e35bf','Legualle'   , 'Philippe'  , 4, '', 1, 0 );



insert into regulation (`start_date` ,`expected_end_date` ,`open`,`id_regulateur`,`label` ,`comment` )
values
(NOW()            , ADDDATE(NOW(),1 ), true , 2, 'Régulation Paris' , 'Régulation de Test'),
(NOW()            , ADDDATE(NOW(),1 ), true , 3, 'Marathon de Paris', 'Régulation de Test'),
(ADDDATE(NOW(),-2), ADDDATE(NOW(),-1), false, 2, 'Régulation Paris' , 'Régulation de Test'),
(ADDDATE(NOW(),-3), ADDDATE(NOW(),-2), false, 2, 'Régulation Paris' , 'Régulation de Test');





insert into `equipier` (  `id_dispositif`, `num_nivol`, `equipier_is_male`, `nom`,`prenom`, 
                          `DH_debut`, `DH_fin`, `id_delegation`, `autre_delegation`, 
                          `id_role_equipier1`, `id_role_equipier2`, `id_role_dans_dispositif`)
values
(0, '22223A', true , 'Manson'     , 'Thomas'    , MAKEDATE(1970, 1), MAKEDATE(1970, 1),6,'', 4, 0, 0 ),
(0, '222211', true , 'Arecki'     , 'Thomas'    , MAKEDATE(1970, 1), MAKEDATE(1970, 1),6,'', 1, 0, 0 ),
(0, '222221', false, 'Escoube'    , 'Raphaelle' , MAKEDATE(1970, 1), MAKEDATE(1970, 1),6,'', 5, 0, 0 ),
(0, '222222', false, 'Coutant'    , 'Séverine'  , MAKEDATE(1970, 1), MAKEDATE(1970, 1),6,'', 4, 0, 0 ),
(0, '222233', true , 'Philipakis' , 'Alexandre' , MAKEDATE(1970, 1), MAKEDATE(1970, 1),6,'', 4, 0, 0 ),
(0, '222234', true , 'Phills'     , 'Richard'   , MAKEDATE(1970, 1), MAKEDATE(1970, 1),6,'', 3, 0, 0 ),
(0, '222244', true , 'Poules'     , 'Titi'      , MAKEDATE(1970, 1), MAKEDATE(1970, 1),6,'', 3, 0, 0 ),
(0, '222245', true , 'Doré'       , 'Bastien'   , MAKEDATE(1970, 1), MAKEDATE(1970, 1),6,'', 2, 0, 0 ),
(0, '222235', false, 'Sergent'    , 'Stéphanie' , MAKEDATE(1970, 1), MAKEDATE(1970, 1),6,'', 1, 0, 0 ),
(0, '222236', true , 'Valet'      , 'Sébastien' , MAKEDATE(1970, 1), MAKEDATE(1970, 1),6,'', 1, 3, 0 ),
(0, '222237', false, 'Soulas'     , 'Marine'    , MAKEDATE(1970, 1), MAKEDATE(1970, 1),6,'', 4, 0, 0 ),
(0, '222223', true , 'Legualle'   , 'Philippe'  , MAKEDATE(1970, 1), MAKEDATE(1970, 1),6,'', 1, 3, 0 ),
(0, '222224', true , 'Legualle1'   , 'Philippe1'  , MAKEDATE(1970, 1), MAKEDATE(1970, 1),6,'', 1, 3, 0 ),
(0, '222225', true , 'Legualle2'   , 'Philippe2'  , MAKEDATE(1970, 1), MAKEDATE(1970, 1),6,'', 1, 3, 0 ),
(0, '222226', true , 'Legualle3'   , 'Philippe3'  , MAKEDATE(1970, 1), MAKEDATE(1970, 1),6,'', 1, 3, 0 ),
(0, '222227', true , 'Legualle4'   , 'Philippe4'  , MAKEDATE(1970, 1), MAKEDATE(1970, 1),6,'', 1, 3, 0 ),
(0, '222228', true , 'Legualle5'   , 'Philippe5'  , MAKEDATE(1970, 1), MAKEDATE(1970, 1),6,'', 1, 3, 0 ),
(0, '222229', true , 'Legualle6'   , 'Philippe6'  , MAKEDATE(1970, 1), MAKEDATE(1970, 1),6,'', 1, 3, 0 );


INSERT INTO `dispositif` (`id_dispositif`,`id_type_dispositif`,`id_regulation`,`indicatif_vehicule`,`O2_B1_volume`,`O2_B1_pression`,`O2_B2_volume`,`O2_B2_pression`,`O2_B3_volume`,`O2_B3_pression`,`O2_B4_volume`,`O2_B4_pression`,`O2_B5_volume`,`O2_B5_pression`,`dispositif_comment`,`dispositif_back_3_girl`,`dispositif_not_enough_O2`,`dispositif_set_available_with_warning`,`creation_terminee`,`dsa_type`,`dsa_complet`,`observation`,`DH_debut`,`DH_fin`,`id_delegation_responsable`,`autre_delegation`,`contact_radio`,`contact_tel1`,`contact_tel2`,`contact_alphapage`,`identite_medecin`,`id_etat_dispositif`,`id_current_intervention`,`display_state`,`equipier_1_id`,`equipier_2_id`,`equipier_3_id`,`equipier_4_id`,`equipier_5_id`,`equipier_1_role`,`equipier_2_role`,`equipier_3_role`,`equipier_4_role`,`equipier_5_role`,`current_addresse_rue`,`current_addresse_code_postal`,`current_addresse_ville`,`current_google_coords_lat`,`current_google_coords_long`,`previous_addresse_rue`,`previous_addresse_code_postal`,`previous_addresse_ville`,`previous_google_coords_lat`,`previous_google_coords_long`,`DH_reception`,`DH_depart`,`DH_sur_place`,`DH_bilan_primaire`,`DH_bilan_secondaire`,`DH_quitte_les_lieux`,`DH_arrivee_hopital`,`DH_dispo`,`DH_a_sa_base`,`DH_appel_renfort_medical`,`DH_arrivee_renfort_medical`) VALUES 
 (2,1,2,'Alpha Sud',5,200,5,200,5,200,5,200,5,200,'',0,0,0,1,'DEA',1,'','2008-07-26 09:50:56','2008-07-27 09:50:56',5,'N/A','75042','06 64 66 42 96','N/A','N/A','N/A',1,0,0,2,6,3,4,5,1,3,4,4,4,'36, rue geoffroy l\'asnier','75004','Paris',48.855434, 2.357217,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);

INSERT INTO `intervention` (`id_intervention`,`id_dispositif`,`id_regulation`,`id_origine`,`id_motif`,`id_etat`,`complement_motif`,`num_inter`,`id_ref_num_inter`,`ref_num_inter`,`DH_saisie`,`DH_reception`,`DH_depart`,`DH_sur_place`,`DH_bilan_primaire`,`DH_bilan_secondaire`,`DH_quitte_les_lieux`,`DH_arrivee_hopital`,`DH_fin_intervention`,`DH_appel_renfort_medical`,`DH_arrivee_renfort_medical`,`homme_victime`,`nom_victime`,`nom_jf_victime`,`prenom_victime`,`age_approx_victime`,`date_naissance`,`lieu_naissance`,`adresse_victime`,`code_postal_victime`,`ville_victime`,`pays_victime`,`personne_a_prevenir`,`tel_personne_a_prevenir`,`effet_ou_objet_remis`,`effet_ou_objet_remis_a`,`nom_contact_sur_place`,`coordonnees_contact`,`batiment`,`etage`,`porte`,`complement_adresse`,`rue`,`code_postal`,`ville`,`google_coords_lat`,`google_coords_long`,`bilan_circonstances`,`bilan_detresses`,`bilan_antecedents`,`bilan_commentaires`,`cs_coma`,`cs_pci`,`cs_pci_duree`,`cs_pc_secondaire`,`cs_agitation`,`cs_convulsions`,`ventil_absence`,`ventil_chiffre`,`ventil_commentaire`,`ventil_superficielle`,`ventil_ronflement`,`ventil_irreguliere`,`ventil_tirage`,`ventil_pauses`,`ventil_sueurs`,`ventil_sifflement`,`ventil_cyanose`,`ventil_saturation_o2`,`circul_pouls_non_percu`,`circul_pouls_chiffre`,`circul_pouls_commentaire`,`circul_pouls_irregulier`,`circul_pouls_faible`,`circul_conjonctive_decolorees`,`circul_paleur_cutanees`,`circul_marbrure`,`circul_tension_basse`,`circul_tension_haute`,`circul_tension_ref_basse`,`circul_tension_ref_haute`,`pupille_reactive`,`pupille_non_reactive`,`pupille_myosis_gauche`,`pupille_myosis_droite`,`pupille_mydriase_gauche`,`pupille_mydriase_droite`,`pupille_asymetriques`,`douleur`,`gestes_lva`,`gestes_mce`,`gestes_allongee`,`gestes_pls`,`gestes_pansement`,`gestes_refroidissement`,`gestes_aspiration`,`gestes_dsa`,`gestes_dsa_nb_chocs`,`gestes_demi_assis`,`gestes_collier_cervical`,`gestes_point_de_compression`,`gestes_protection_thermique`,`gestes_va`,`gestes_jambes_surelevees`,`gestes_attelle`,`gestes_garrot`,`gestes_garrot_heure_pose`,`gestes_autres`,`gestes_inhalation_o2_litre_min`,`gestes_glycemie_gramme_litre`,`gestes_temperature`,`gestes_immobilisation_generale`,`coordinateur_bspp_contacte`,`coordinateur_samu_contacte`,`transport_medicalisee_ar`,`transport_medicalisee_umh`,`transport_medicalisee_de`,`medecin_civil_sur_place`,`police_sur_place`,`pompier_sur_place`,`evac_laisse_sur_place`,`evac_laisse_sur_place_decedee`,`evac_laisse_sur_place_decedee_a_dispo_de`,`evac_refus_de_transport`,`evac_decharche`,`evac_num_inter_banlieu`,`evac_hopital_destination`,`evac_autre_destination`,`evac_aggravation`,`evac_aggravation_pendant_transport`,`evac_aggravation_arrive_a_destination`,`evac_aggravation_ventilation`,`evac_aggravation_circulation`,`evac_aggravation_douleur`,`evac_aggravation_contact_regulation`,`evac_aggravation_nature`,`evac_par`,`evac_par_autre`) VALUES
 (1,0,2,1,1,1,'Vomissement','0',NULL,NULL,'2008-07-26 09:56:36',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'Manson',NULL,' Héloise',25,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Manson Thomas','0664664296','1','1','1','Complemtent adresse','136, route de la reine','92100','Boulogne Billancourt',48.840576, 2.229526,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);

commit;