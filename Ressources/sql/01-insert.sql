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
 (9,9,'Ambulance'                      ,'ambulanceIcon'       ,'gmap/ambulance.png'        ,'icon=new GIcon();\r\nicon.image=contextPath+\"/img/gmap/ambulance.png\";\r\nicon.shadow=contextPath+\"/img/gmap/ambulance-s.png\";\r\nicon.iconSize=new GSize(24.0, 24.0);\r\nicon.shadowSize=new GSize(37.0, 24.0);\r\nicon.iconAnchor=new GPoint(12.0, 12.0);\r\nicon.infoWindowAnchor=new GPoint(12.0, 12.0);'),
 (10,0,'N/A'                      ,'N/A'       ,'N/A'        ,'');

UPDATE `lieu_type` SET `id_type_lieu` = 0 WHERE `id_type_lieu` = 10;
ALTER TABLE `lieu_type` AUTO_INCREMENT = 10;

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
 (18,7,NULL,NULL,'Commissariat Central, 15eme','250 rue Vaugirard','75015','Paris',48.839833,2.302275,'U.P.Q Unité Police Quartier St Lambert - S.A.R.I.J Service Accueil Recherche Investigation Judiciaire'),
 (19,0,NULL,NULL,'N/A','N/A','N/A','N/A',0,0,'N/A');

UPDATE `lieu` SET `id_lieu` = 0 WHERE `id_lieu` = 19;
ALTER TABLE `lieu` AUTO_INCREMENT = 19;





insert into delegation (nom, departement, id_lieu)
values
('National'      ,'00000',8 ),
('Département 75','75000',9 ),
('PARIS-I'       ,'75001',10),
('PARIS-III'     ,'75003',8 ),
('PARIS-IV'      ,'75004',9 ),
('PARIS-V'       ,'75005',10),
('PARIS-VI'      ,'75006',8 ),
('PARIS-VII'     ,'75007',9 ),
('PARIS-VIII'    ,'75008',10),
('PARIS-IX'      ,'75009',8 ),
('PARIS-X'       ,'75010',9 ),
('PARIS-XI'      ,'75011',10),
('PARIS-XII'     ,'75012',8 ),
('PARIS-XIII'    ,'75013',9 ),
('PARIS-XIV'     ,'75014',10),
('PARIS-XV'      ,'75015',8 ),
('PARIS-XVI'     ,'75016',9 ),
('PARIS-XVII'    ,'75017',10),
('PARIS-XVIII'   ,'75018',8 ),
('PARIS-XIX'     ,'75019',9 ),
('PARIS-XX'      ,'75020',10),
('Autre'         ,'{N/A}',10);

update delegation set id_delegation=0 where id_delegation = 22;
ALTER TABLE delegation AUTO_INCREMENT = 22;

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
ALTER TABLE dispositif_etat AUTO_INCREMENT = 14;

insert into dispositif_type (label_type)
values
('ALPHA'),
('BSPP'),
('Poste de Secours'),
('Point d''Alerte'),
('N/A');

update dispositif_type set id_type = 0 where id_type = 5;
ALTER TABLE dispositif_type AUTO_INCREMENT = 5;

insert into equipier_role (label_role)
values                     /*RDP - SIORD */
('Chef de Dispositif'   ), /*01  - 61*/
('Chef de Poste'        ), /*02  - 62*/
('Chef de Section'      ), /*03  - 60*/
('CI'                   ), /*04  - 2 */
('CI Réseau (Alpha)'    ), /*05  - 45*/
('CI CS     (BSPP)'     ), /*06  - 54*/
('Chauffeur ASM'        ), /*07  - 4 */
('Chauffeur VL'         ), /*08  - 5 */
('PSE2'                 ), /*09  - 3 */
('PSE1'                 ), /*10  - 53*/
('PSC1'                 ), /*11  - 33*/
('N/A'                  ); /*00  - */


update equipier_role set id_role = 0 where id_role = 12;
ALTER TABLE equipier_role AUTO_INCREMENT = 7;

insert into user_role (label_role, code_role)
values
('Administrateur', 'ADMINISTRATEUR'),
('Régulateur'    , 'REGULATEUR'    ),
('Co-Régulateur' , 'CO-REGULATEUR' ),
('Observateur'   , 'OBSERVATEUR'   ),
('N/A'           , 'N/A'           );

update user_role set id_role = 0 where id_role = 5;
ALTER TABLE user_role AUTO_INCREMENT = 5;


insert into `user` ( `num_nivol`, `user_is_male`, `password`,`nom`,`prenom`,`mobile`, `email` ,`id_delegation`, `autre_delegation`, `id_role`, `id_regulation` )
values
('NA', true, '0','N/A'     , 'N/A'    , '0', 't@t.com', 0, '', 0, 0 );

update `user` set id_user = 0 where id_user = 1;
ALTER TABLE `user` AUTO_INCREMENT = 1;

insert into regulation (`start_date` ,`expected_end_date` ,`open`,`id_regulateur`,`label` ,`comment` )
values
(MAKEDATE(1970,1), MAKEDATE(1970,2), false, 0, 'N/A', 'N/A');

update regulation set id_regulation = 0 where id_regulation = 1;
ALTER TABLE `regulation` AUTO_INCREMENT = 1;


insert into `dispositif`
(
  `id_type_dispositif` ,   `id_regulation` ,  `indicatif_vehicule` ,  `O2_B1_volume` ,
  `O2_B1_pression` ,  `O2_B2_volume`  , `O2_B2_pression`,  `O2_B3_volume`  ,  `O2_B3_pression` ,
  `O2_B4_volume`   ,  `O2_B4_pression`, `O2_B5_volume`  ,  `O2_B5_pression`, `dispositif_comment` ,
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
ALTER TABLE `dispositif` AUTO_INCREMENT = 1;

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
ALTER TABLE `intervention_origine` AUTO_INCREMENT = 7;

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
ALTER TABLE `intervention_motif` AUTO_INCREMENT = 6;

insert into intervention_motif_annulation
  (label_motif_annulation)
values
  ('Sans suite CRF'),
  ('Autre moyen CRF déjà sur place'),
  ('Autre moyen NON CRF déjà sur place'),
  ('Victime absente'),
  ('Autre'),
  ('N/A');

update intervention_motif_annulation set id_motif_annulation = 0 where id_motif_annulation = 6;
ALTER TABLE `intervention_motif_annulation` AUTO_INCREMENT = 6;

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
ALTER TABLE `intervention_etat` AUTO_INCREMENT = 11;



insert into credits (`presentation_order`, `name`, `version`, `url`, `description`)
values
(1 , 'DWR'               , '3.0 RC1(build113)'   , 'http://www.directwebremoting.org'                , 'a Java integrated Ajax Framework that allow you to call java methods from javascript'),
(18, 'Jakarta Commons'   , '*'                   , 'http://commons.apache.org'                       , 'Very usefull Java libraries'),
(6 , 'JAWR'              , '2.5.1'               , 'http://jawr.dev.java.net'                        , 'Performance Librairy that do the following to your css & js files : minify, put in one file, gzip, set far expiry date, i18n handling, load js & css from jar'),
(7 , 'EHCache'           , '1.4.1'               , 'http://ehcache.sourceforge.net/'                 , 'A very efficient java cache manager'),
(17, 'mozilla js'        , '1.7'                 , 'http://www.mozilla.org/rhino/'                   , 'Jawr dependency'),
(16, 'Jakarta ORO'       , '2.0.8'               , 'http://jakarta.apache.org/oro/'                  , 'Text processing library'),
(15, 'JSR107-Cache'      , '1.0'                 , 'http://sourceforge.net/projects/jsr107cache/'    , 'EHCache dependency'),
(14, 'Log4J'             , '1.2.14'              , 'http://logging.apache.org/log4j/'                , 'Logging framework'),
(1 , 'Quartz'            , '1.6.1-RC1'           , 'https://quartz.dev.java.net/'                    , 'Job Scheduler'),
(2 , 'Spring'            , '2.5.6'               , 'http://www.springsource.org/'                    , 'Java IOC Framework'),
(13, 'YUI Compression'   , '2.3.6'               , 'http://developer.yahoo.com/yui/compressor/'      , 'js & css compression librairy'),
(5 , 'Tomcat'            , '6'                   , 'http://tomcat.apache.org'                        , 'J2EE application server'),
(4 , 'MySQL'             , '5.1'                 , 'http://www.mysql.org'                            , 'Database Server'),
(3 , 'ExtJS'             , '2.2.1'               , 'http://www.extjs.com'                            , 'Javascript Framework for GUI'),
(12, 'FamFamFam'         , '1.00'                , 'http://www.famfamfam.com'                        , 'Image librairy'),
(11, 'Ubuntu Server'     , '9.04'                , 'http://www.ubuntu.com'                           , 'Operating System'),
(10, 'Prototype'         , '1.6.0.1'             , 'http://www.prototypejs.org'                      , 'Javascript utility librairy'),
(9 , 'ScriptAculoUs'     , '1.8.1'               , 'http://www.script.aculo.us'                      , 'Javascript GUI effect library'),
(8 , 'Google Maps'       , '2.x'                 , 'http://code.google.com/intl/fr/apis/maps/'       , 'Map display & geocoding api');


insert into `application_version` (`version_name`, `dev_release_date`, `production_release_date`, `description`)
values
('0.1.0','milieu 2008'  ,'No production release','Première version mise à disposition pour présentation'),
('0.2.0','fin 2008'     ,'No production release','Bug fix release'),
('0.3.0','2009-03-13'   ,'No production release','Google Maps Traffic et Street View'),
('0.4.0','2009-06-01'   ,'No production release','Ré implémentation du Drag & Drop, affectation de plusieurs victime à un dispositif')
;

insert into application_version_changelog(`id_application_version`, `id_jira`, `description`)
values
(1,'','Première version déployée avec les fonctionnalités majeurs opérationnelles'),
(1,'IRP-11', 'Ajout d\'une intervention'),
(1,'IRP-10', 'Ajout d\'un dispositif'),
(1,'IRP-10', 'Edition d\'un dispositif'),
(2,'IRP-19', 'Edition d\'une intervention'),
(2,'IRP-16', 'Affectation d\'une intervention à un dispositif'),
(2,'IRP-6' , 'Bouton d\'édition d\'une intervention'),
(3,'IRP-65', 'Gestion de l\'annulation d\'une intervention'),
(3,'IRP-43', 'Overlay Traffic sur google Maps'),
(3,'IRP-40', 'Street View Sur google Maps'),
(4,'IRP-26', 'Transfert d\'une victime d\'un dispositif à un autre'),
(4,'IRP-77', 'Affichage Credit et changelog'),
(4,'IRP-75', 'Bouton pour cloner une intervention'),
(4,'IRP-73', 'Reprise des données du SIORD'),
(4,'IRP-59', 'Affichage de l\'environnement sur lequel tourne l\'application '),
(4,'IRP-27', 'Gestion de N victimes par dispositif');
  

commit;