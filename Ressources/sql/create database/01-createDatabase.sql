DROP DATABASE IF EXISTS `crfrdp`;
CREATE DATABASE `crfrdp` DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

use crfrdp;



DROP TABLE IF EXISTS `crfrdp`.`dispositif_etat`;
CREATE TABLE `dispositif_etat` (
  `id_etat` int(10) NOT NULL auto_increment,
  `label_etat` varchar(45) NOT NULL,
  PRIMARY KEY  (`id_etat`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

DROP TABLE IF EXISTS `crfrdp`.`dispositif_type`;
CREATE TABLE `dispositif_type` (
  `id_type` int(10) unsigned NOT NULL auto_increment,
  `label_type` varchar(45) NOT NULL,
  `nombre_equipier_max` int(10) default 0,
  PRIMARY KEY  (`id_type`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1  COLLATE=latin1_general_ci;

DROP TABLE IF EXISTS `crfrdp`.`equipier_role`;
CREATE TABLE `equipier_role` (
  `id_role` int(10) unsigned NOT NULL auto_increment,
  `label_role` varchar(45) NOT NULL,
  PRIMARY KEY  (`id_role`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1  COLLATE=latin1_general_ci;


DROP TABLE IF EXISTS `crfrdp`.`dispositif_type_definition`;
CREATE TABLE `dispositif_type_definition` (
  `id_dispositif_type` int(10) unsigned NOT NULL,
  `id_role` int(10) unsigned NOT NULL,
  `nombre_min` int(10) unsigned NOT NULL,
  `nombre_max` int(10) unsigned NOT NULL,
  PRIMARY KEY  (`id_dispositif_type`,`id_role`),
  CONSTRAINT `FK_dtd_dt` FOREIGN KEY (`id_dispositif_type`) REFERENCES `dispositif_type`(`id_type`),
  CONSTRAINT `FK_dtd_er` FOREIGN KEY (`id_role`           ) REFERENCES `equipier_role`  (`id_role`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1  COLLATE=latin1_general_ci;


DROP TABLE IF EXISTS `crfrdp`.`user_role`;
CREATE TABLE `user_role` (
  `id_role` int(10) unsigned NOT NULL auto_increment,
  `label_role` varchar(45) NOT NULL,
  `code_role` varchar(45) NOT NULL,
  PRIMARY KEY  (`id_role`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1  COLLATE=latin1_general_ci;

DROP TABLE IF EXISTS `crfrdp`.`lieu_type`;
CREATE TABLE `crfrdp`.`lieu_type`
(
  `id_type_lieu`     INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  `num_ordre`        INTEGER UNSIGNED NOT NULL, 
  `label_type_lieu`  VARCHAR(100) NOT NULL,
  `icon_class_lieu`  VARCHAR(40 ) NOT NULL,
  `icon_lieu`        VARCHAR(40 ) NOT NULL,
  `icon_gmap_init`   VARCHAR(500) NOT NULL,
  PRIMARY KEY(`id_type_lieu`)
)
ENGINE = InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;


DROP TABLE IF EXISTS `crfrdp`.`lieu`;
CREATE TABLE `lieu` (
  `id_lieu`                     int(10) unsigned NOT NULL auto_increment,
  `id_type_lieu`                int(10) unsigned NOT NULL,
  `icon`                        VARCHAR(20) NULL,
  `icon_gmap_init`              VARCHAR(500) NULL,
  `nom`                         varchar(45) NOT NULL,
  `addresse`                    varchar(45) NOT NULL,
  `code_postal`                 varchar(5 ) NOT NULL,
  `ville`                       varchar(80) NOT NULL,
  `google_coords_lat`           float(10,6) NOT NULL,
  `google_coords_long`          float(10,6) NOT NULL,
  `info_complementaire`         varchar(1000) NULL,
  PRIMARY KEY (`id_lieu`),
  CONSTRAINT `FK_lieu_type_lieu` FOREIGN KEY (`id_type_lieu`) REFERENCES `lieu_type`(`id_type_lieu`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;



DROP TABLE IF EXISTS `crfrdp`.`delegation`;
CREATE TABLE `delegation` (
  `id_delegation` int(10) unsigned NOT NULL auto_increment,
  `nom` varchar(45) NOT NULL,
  `departement` varchar(8) NOT NULL,
  `telephone` varchar(10) NULL,
  `mobile` varchar(10) NULL,
  `mail`   varchar(255) NULL,
  `web`    varchar(255) NULL,
  `id_lieu` int(10) unsigned NOT NULL,
  PRIMARY KEY  (`id_delegation`),
  CONSTRAINT `FK_delegation_lieu` FOREIGN KEY (`id_lieu`) REFERENCES `lieu`(`id_lieu`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1  COLLATE=latin1_general_ci;


DROP TABLE IF EXISTS `crfrdp`.`user`;
CREATE TABLE `user` (
  `id_user` int(10) unsigned NOT NULL auto_increment,
  `num_nivol` varchar(16) NOT NULL,
  `user_is_male` boolean NOT NULL,
  `password` varchar(32) NOT NULL,
  `nom` varchar(45) NOT NULL,
  `prenom` varchar(45) NOT NULL,
  `mobile` varchar(15) NOT NULL, 
  `email` varchar(255) NOT NULL,
  `id_delegation` int(10) unsigned NOT NULL,
  `autre_delegation` varchar(45) NOT NULL,
  `id_role` int(10) unsigned NOT NULL,
  `id_regulation` int(10) unsigned NOT NULL,
  PRIMARY KEY  (`id_user`),
  KEY `FK_user_role` (`id_role`),
  CONSTRAINT `FK_user_role` FOREIGN KEY (`id_role`) REFERENCES `user_role` (`id_role`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1  COLLATE=latin1_general_ci;


DROP TABLE IF EXISTS `crfrdp`.`regulation`;
CREATE TABLE `regulation` (
`id_regulation` int(10) unsigned NOT NULL auto_increment,
`start_date` datetime NOT NULL,
`expected_end_date` datetime NOT NULL,
`open` boolean NOT NULL,
`id_regulateur` int(10) unsigned NOT NULL,
`label` varchar(45) NOT NULL,
`comment` varchar(45) NULL,
 PRIMARY KEY  (`id_regulation`),
 KEY `FK_regulation_regulateur` (`id_regulateur`),
 CONSTRAINT `FK_regulation_regulateur` FOREIGN KEY (`id_regulateur`) REFERENCES `user` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1  COLLATE=latin1_general_ci;


DROP TABLE IF EXISTS `crfrdp`.`dispositif`;
CREATE TABLE `dispositif` (
  `id_dispositif`                         int(10)       unsigned    NOT NULL auto_increment,
  `id_type_dispositif`                    int(10)       unsigned        NULL DEFAULT 0,
  `id_regulation`                         int(10)       unsigned    NOT NULL,
  `creation_terminee`                     boolean                   NOT NULL default false,
-- Actif : en activite dans la regulation, inactif : fin de vacation
  `actif`                                 boolean                   NOT NULL default true,
  `indicatif_vehicule`                    varchar(16)               NOT NULL,
  `O2_B1_volume`                          int(10)       unsigned    NOT NULL,
  `O2_B1_pression`                        float                     NOT NULL,
  `O2_B2_volume`                          int(10)       unsigned    NOT NULL,
  `O2_B2_pression`                        float                     NOT NULL,
  `O2_B3_volume`                          int(10)       unsigned    NOT NULL,
  `O2_B3_pression`                        float                     NOT NULL,
  `O2_B4_volume`                          int(10)       unsigned    NOT NULL,
  `O2_B4_pression`                        float                     NOT NULL,
  `O2_B5_volume`                          int(10)       unsigned    NOT NULL,
  `O2_B5_pression`                        float                     NOT NULL,
  `dispositif_comment` varchar(255) NOT NULL,
  `dispositif_back_3_girl` boolean NOT NULL,
  `dispositif_not_enough_O2` boolean NOT NULL,
  `dispositif_set_available_with_warning` boolean NOT NULL,  
  `dsa_type` varchar(3) NOT NULL,
  `dsa_complet` boolean NOT NULL,
  `observation` text NOT NULL,
  `DH_debut` datetime NOT NULL,
  `DH_fin` datetime NOT NULL,
  `id_delegation_responsable` int(10) unsigned NOT NULL,
  `autre_delegation` varchar(45) NOT NULL,
  `contact_radio` varchar(16) NOT NULL,
  `contact_tel1` varchar(16) NOT NULL,
  `contact_tel2` varchar(16) NOT NULL,
  `contact_alphapage` varchar(16) NOT NULL,
  `identite_medecin` varchar(45) NOT NULL,
  `id_etat_dispositif` int(10) NOT NULL,
  
  `id_current_intervention` int(10) unsigned NULL DEFAULT 0,
  
  `display_state` int(3) unsigned NOT NULL,
  

  `current_addresse_rue`         varchar(60) NULL,
  `current_addresse_code_postal` varchar(5 ) NULL,
  `current_addresse_ville`       varchar(60) NULL,
  `current_google_coords_lat`    float(10,6) NULL,
  `current_google_coords_long`   float(10,6) NULL,

  `previous_addresse_rue`         varchar(60) NULL,
  `previous_addresse_code_postal` varchar(5 ) NULL,
  `previous_addresse_ville`       varchar(60) NULL,
  `previous_google_coords_lat`    float(10,6) NULL,
  `previous_google_coords_long`   float(10,6) NULL,

  `DH_reception`                 datetime NULL,
  `DH_depart`                    datetime NULL,
  `DH_sur_place`                 datetime NULL,
  `DH_bilan_primaire`            datetime NULL,
  `DH_bilan_secondaire`          datetime NULL,
  `DH_quitte_les_lieux`          datetime NULL,
  `DH_arrivee_hopital`           datetime NULL,
  `DH_dispo`                     datetime NULL,
  `DH_fin_intervention`          datetime NULL,
  `DH_a_sa_base`                 datetime NULL,
  `DH_appel_renfort_medical`     datetime NULL,
  `DH_arrivee_renfort_medical`   datetime NULL,

  PRIMARY KEY  (`id_dispositif`),
  KEY        `FK_dispositif_type`             (`id_type_dispositif`),
  KEY        `FK_dispositif_etat`             (`id_etat_dispositif`),
  KEY        `FK_dispositif_regulation`       (`id_regulation`   ),
  KEY        `FK_dispositif_delegation`       (`id_delegation_responsable`),
  CONSTRAINT `FK_dispositif_type`       FOREIGN KEY (`id_type_dispositif`       ) REFERENCES `dispositif_type`   (`id_type`      ),
  CONSTRAINT `FK_dispositif_etat`       FOREIGN KEY (`id_etat_dispositif`       ) REFERENCES `dispositif_etat`   (`id_etat`      ),
  CONSTRAINT `FK_dispositif_regulation` FOREIGN KEY (`id_regulation`            ) REFERENCES `regulation`        (`id_regulation`),
  CONSTRAINT `FK_dispositif_delegation` FOREIGN KEY (`id_delegation_responsable`) REFERENCES `delegation`        (`id_delegation`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1  COLLATE=latin1_general_ci;


DROP TABLE IF EXISTS `crfrdp`.`equipier`;
CREATE TABLE `equipier` (
  `id_equipier`             int     (10) unsigned   NOT NULL auto_increment,
  `id_dispositif`           int     (10) unsigned       NULL DEFAULT 0,
  `num_nivol`               varchar (16)            NOT NULL,
  `equipier_is_male`        boolean                 NOT NULL,
  `enabled`                 boolean                 NOT NULL,
  `nom`                     varchar (45)            NOT NULL,
  `prenom`                  varchar (45)            NOT NULL, 
  `mobile`                  varchar (15)            NOT NULL,
  `email`                   varchar (255)           NOT NULL,
  `id_delegation`           int     (10) unsigned   NOT NULL,
  `autre_delegation`        varchar (45)                NULL,
  PRIMARY KEY  (`id_equipier`),
  KEY `FK_equipier_delegation` (`id_delegation`    ),
  CONSTRAINT `FK_equipier_delegation` FOREIGN KEY (`id_delegation`     ) REFERENCES `delegation`    (`id_delegation`)
)  ENGINE=InnoDB DEFAULT CHARSET=latin1  COLLATE=latin1_general_ci;
  
  
DROP TABLE IF EXISTS `crfrdp`.`dispositif_equipiers`;
CREATE TABLE `dispositif_equipiers` (
  `id_dispositif`    int(10) unsigned NOT NULL,
  `id_equipier`      int(10) unsigned NOT NULL,
  `id_role_equipier` int(10) unsigned NOT NULL,
  `en_evaluation`    boolean          NOT NULL,
  `id_role_en_eval`  int(10) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`id_dispositif`,`id_equipier`),
  KEY `FK_dispositif_equipiers-dispositif`    (`id_dispositif`      ),
  KEY `FK_dispositif_equipiers-equipier`      (`id_equipier`        ),
  KEY `FK_dispositif_equipiers-equipier_role` (`id_role_equipier`   ),
  CONSTRAINT `FK_dispositif_equipiers-dispositif`     FOREIGN KEY (`id_dispositif`    ) REFERENCES `dispositif`    (`id_dispositif`),
  CONSTRAINT `FK_dispositif_equipiers-equipier`       FOREIGN KEY (`id_equipier`      ) REFERENCES `equipier`      (`id_equipier`  ),
  CONSTRAINT `FK_dispositif_equipiers-equipier_role`  FOREIGN KEY (`id_role_equipier` ) REFERENCES `equipier_role` (`id_role`      ),
  CONSTRAINT `FK_dispositif_equipiers-equipier_role2` FOREIGN KEY (`id_role_en_eval`  ) REFERENCES `equipier_role` (`id_role`      )
) ENGINE=InnoDB DEFAULT CHARSET=latin1  COLLATE=latin1_general_ci;


DROP TABLE IF EXISTS `crfrdp`.`dispositif_equipiers_log`;
CREATE TABLE `dispositif_equipiers_log` (
  `id_dispositif_equipiers_log` int(10) unsigned NOT NULL auto_increment,
  `id_dispositif`               int(10) unsigned NOT NULL,
  `id_equipier`                 int(10) unsigned NOT NULL,
  `id_role_equipier`            int(10) unsigned NOT NULL,
  `DH_debut`                    datetime         NOT NULL,
  `DH_fin`                      datetime             NULL,
  PRIMARY KEY (`id_dispositif_equipiers_log`),
  KEY `FK_dispositif_equipiers_log-dispositif`    (`id_dispositif`      ),
  KEY `FK_dispositif_equipiers_log-equipier`      (`id_equipier`        ),
  KEY `FK_dispositif_equipiers_log-equipier_role` (`id_role_equipier`   ),
  CONSTRAINT `FK_dispositif_equipiers_log-dispositif`    FOREIGN KEY (`id_dispositif`    ) REFERENCES `dispositif`    (`id_dispositif`),
  CONSTRAINT `FK_dispositif_equipiers_log-equipier`      FOREIGN KEY (`id_equipier`      ) REFERENCES `equipier`      (`id_equipier`  ),
  CONSTRAINT `FK_dispositif_equipiers_log-equipier_role` FOREIGN KEY (`id_role_equipier` ) REFERENCES `equipier_role` (`id_role`      )
) ENGINE=InnoDB DEFAULT CHARSET=latin1  COLLATE=latin1_general_ci;


DROP TABLE IF EXISTS `crfrdp`.`equipier_roles`;
CREATE TABLE `equipier_roles` (
  `id_equipier`      int(10) unsigned NOT NULL,
  `id_role_equipier` int(10) unsigned NOT NULL,
  `en_evaluation`    boolean          NOT NULL,
  PRIMARY KEY (`id_equipier`,`id_role_equipier`),
  KEY `FK_equipier_roles-equipier`      (`id_equipier`        ),
  KEY `FK_equipier_roles-equipier_role` (`id_role_equipier`   ),
  CONSTRAINT `FK_equipier_roles-equipier`      FOREIGN KEY (`id_equipier`      ) REFERENCES `equipier`      (`id_equipier`  ),
  CONSTRAINT `FK_equipier_roles-equipier_role` FOREIGN KEY (`id_role_equipier` ) REFERENCES `equipier_role` (`id_role`      )
) ENGINE=InnoDB DEFAULT CHARSET=latin1  COLLATE=latin1_general_ci;


DROP TABLE IF EXISTS `crfrdp`.`intervention_origine`;
CREATE TABLE `crfrdp`.`intervention_origine`
(
  `id_origine` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  `label_origine` VARCHAR(45) NOT NULL,
  PRIMARY KEY(`id_origine`)
)
ENGINE = InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

DROP TABLE IF EXISTS `crfrdp`.`intervention_motif`;
CREATE TABLE `crfrdp`.`intervention_motif`
(
  `id_motif` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  `label_motif` VARCHAR(45) NOT NULL,
  PRIMARY KEY(`id_motif`)
)
ENGINE = InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

DROP TABLE IF EXISTS `crfrdp`.`intervention_motif_annulation`;
CREATE TABLE `crfrdp`.`intervention_motif_annulation`
(
  `id_motif_annulation` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  `label_motif_annulation` VARCHAR(45) NOT NULL,
  PRIMARY KEY(`id_motif_annulation`)
)
ENGINE = InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

DROP TABLE IF EXISTS `crfrdp`.`intervention_etat`;
CREATE TABLE `intervention_etat` (
  `id_etat` int(10) NOT NULL auto_increment,
  `label_etat` varchar(45) NOT NULL,
  PRIMARY KEY  (`id_etat`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `crfrdp`.`intervention_seq`;
CREATE TABLE `intervention_seq` (
  `year`                 varchar(4) NOT NULL,
  `number`               int(10) unsigned NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;


DROP TABLE IF EXISTS `crfrdp`.`intervention`;
CREATE TABLE `intervention` (
  `id_intervention`                                     int(10) unsigned NOT NULL auto_increment,
  `id_dispositif`                                       int(10) unsigned NOT NULL,
  `id_regulation`                                       int(10) unsigned NOT NULL,
  `id_origine`                                          int(10) unsigned NOT NULL,
  `id_motif`                                            int(10) unsigned NOT NULL,
  `id_motif_annulation`                                 int(10) unsigned NOT NULL,
  `id_etat`                                             int(10) NOT NULL DEFAULT 0,
  `complement_motif`                                    varchar(255) NULL,
  `annulation_commentaires`                             text NULL,
  `num_inter`                                           varchar(16) NOT NULL,
  `id_ref_num_inter`                                    int(10) unsigned NULL,
  `ref_num_inter`                                       varchar(16) NULL,
  `DH_saisie`                                           datetime NOT NULL,
  `DH_reception`                                        datetime NULL,
  `DH_depart`                                           datetime NULL,
  `DH_sur_place`                                        datetime NULL,
  `DH_bilan_primaire`                                   datetime NULL,
  `DH_bilan_secondaire`                                 datetime NULL,
  `DH_quitte_les_lieux`                                 datetime NULL,
  `DH_arrivee_hopital`                                  datetime NULL,
  `DH_fin_intervention`                                 datetime NULL,
  `DH_appel_renfort_medical`                            datetime NULL,
  `DH_arrivee_renfort_medical`                          datetime NULL,
  

  `homme_victime`                                       boolean NULL,
  `nom_victime`                                         varchar(60) NULL,
  `nom_jf_victime`                                      varchar(60) NULL,
  `prenom_victime`                                      varchar(60) NULL,
  `age_approx_victime`                                  int         NULL,
  `date_naissance`                                      date        NULL,
  `lieu_naissance`                                      varchar(80) NULL,

  `adresse_victime`                                     varchar(80) NULL,
  `code_postal_victime`                                 varchar(20) NULL,
  `ville_victime`                                       varchar(60) NULL,
  `pays_victime`                                        varchar(60) NULL,

  `personne_a_prevenir`                                 varchar(60) NULL,
  `tel_personne_a_prevenir`                             varchar(60) NULL,
  `effet_ou_objet_remis`                                varchar(180) NULL,
  `effet_ou_objet_remis_a`                              varchar(60) NULL,
  `nom_contact_sur_place`                               varchar(60) NULL,
  `coordonnees_contact`                                 varchar(60) NULL,
  `batiment`                                            varchar(30) NULL,
  `etage`                                               varchar(30) NULL,
  `porte`                                               varchar(30) NULL,
  `complement_adresse`                                  varchar(255) NULL,
  `rue`                                                 varchar(80) NULL,
  `code_postal`                                         varchar(5 ) NULL,
  `ville`                                               varchar(80) NULL,
  `google_coords_lat`                                   float(10,6) NULL,
  `google_coords_long`                                  float(10,6) NULL,

  `bilan_circonstances`                                 text NULL,
  `bilan_detresses`                                     text NULL,
  `bilan_antecedents`                                   text NULL,
  `bilan_commentaires`                                  text NULL,
  `bilan_evaluation_ci`                                 text NULL,
-- conscience
  `cs_coma`                                             boolean NULL,
  `cs_pci`                                              boolean NULL,
  `cs_pci_duree`                                        varchar(10) NULL,
  `cs_pc_secondaire`                                    boolean NULL,
  `cs_agitation`                                        boolean NULL,
  `cs_convulsions`                                      boolean NULL,
-- ventilation
  `ventil_absence`                                      boolean NULL,
  `ventil_chiffre`                                      int(10) unsigned NULL,
  `ventil_commentaire`                                  varchar(16) NULL,
  `ventil_superficielle`                                boolean NULL,
  `ventil_ronflement`                                   boolean NULL,
  `ventil_irreguliere`                                  boolean NULL,
  `ventil_tirage`                                       boolean NULL,
  `ventil_pauses`                                       boolean NULL,
  `ventil_sueurs`                                       boolean NULL,
  `ventil_sifflement`                                   boolean NULL,
  `ventil_cyanose`                                      boolean NULL,
  `ventil_saturation_o2`                                int NULL,
-- circulation
  `circul_pouls_non_percu`                              boolean NULL,
  `circul_pouls_chiffre`                                int(10) unsigned NULL,
  `circul_pouls_commentaire`                            varchar(16) NULL,
  `circul_pouls_irregulier`                             boolean NULL,
  `circul_pouls_faible`                                 boolean NULL,
  `circul_conjonctive_decolorees`                       boolean NULL,
  `circul_paleur_cutanees`                              boolean NULL,
  `circul_marbrure`                                     boolean NULL,
  `circul_tension_basse`                                float NULL,
  `circul_tension_haute`                                float NULL,
  `circul_tension_ref_basse`                            int NULL,
  `circul_tension_ref_haute`                            int NULL,

-- pupille

  `pupille_reactive`                                    boolean NULL,
  `pupille_non_reactive`                                boolean NULL,
  `pupille_myosis_gauche`                               boolean NULL,
  `pupille_myosis_droite`                               boolean NULL,
  `pupille_mydriase_gauche`                             boolean NULL,
  `pupille_mydriase_droite`                             boolean NULL,
  `pupille_asymetriques`                                boolean NULL,
-- douleur

  `douleur`                                             int NULL,

-- gestes
  `gestes_lva`                                          boolean NULL,
  `gestes_mce`                                          boolean NULL,
  `gestes_allongee`                                     boolean NULL,
  `gestes_pls`                                          boolean NULL,
  `gestes_pansement`                                    boolean NULL,
  `gestes_refroidissement`                              boolean NULL,
  `gestes_aspiration`                                   boolean NULL,
  `gestes_dsa`                                          boolean NULL,
  `gestes_dsa_nb_chocs`                                 int NULL,
  `gestes_demi_assis`                                   boolean NULL,
  `gestes_collier_cervical`                             boolean NULL,
  `gestes_point_de_compression`                         boolean NULL,
  `gestes_protection_thermique`                         boolean NULL,
  `gestes_va`                                           boolean NULL,
  `gestes_jambes_surelevees`                            boolean NULL,
  `gestes_attelle`                                      boolean NULL,
  `gestes_garrot`                                       boolean NULL,
  `gestes_garrot_heure_pose`                            datetime  NULL,
  `gestes_autres`                                       varchar(200) NULL,
  `gestes_inhalation_o2_litre_min`                      int   NULL,
  `gestes_glycemie_gramme_litre`                        float NULL,
  `gestes_temperature`                                  float NULL,
  `gestes_immobilisation_generale`                      boolean NULL,
-- renfort sur intervention
  `coordinateur_bspp_contacte`                          boolean NULL,
  `coordinateur_samu_contacte`                          boolean NULL,

  `transport_medicalisee_ar`                            boolean NULL,
  `transport_medicalisee_umh`                           boolean NULL,
  `transport_medicalisee_de`                            int(10) unsigned NULL,
  `medecin_civil_sur_place`                             varchar(50),

  `police_sur_place`                                    boolean NULL,
  `pompier_sur_place`                                   boolean NULL,
-- evacutation
  `evac_laisse_sur_place`                               boolean NULL,
  `evac_laisse_sur_place_decedee`                       boolean NULL,
  `evac_laisse_sur_place_decedee_a_dispo_de`            varchar(80) NULL,
  `evac_refus_de_transport`                             boolean NULL,
  `evac_decharche`                                      boolean NULL,
  `evac_num_inter_banlieu`                              varchar(16) NULL,
  `evac_hopital_destination`                            int(10) unsigned NULL,
  `evac_autre_dest_label`                               varchar(100) NULL,
  `evac_autre_dest_rue`                                 varchar(60) NULL,
  `evac_autre_dest_code_postal`                         varchar(5 ) NULL,
  `evac_autre_dest_ville`                               varchar(60) NULL,
  `evac_autre_dest_google_coords_lat`                   float(10,6) NULL,
  `evac_autre_dest_google_coords_long`                  float(10,6) NULL,




  `evac_aggravation`                                    boolean NULL,
  `evac_aggravation_pendant_transport`                  boolean NULL,
  `evac_aggravation_arrive_a_destination`               boolean NULL,
  `evac_aggravation_ventilation`                        int(10) unsigned NULL,
  `evac_aggravation_circulation`                        int(10) unsigned NULL,
  `evac_aggravation_douleur`                            int(10) unsigned NULL,
  `evac_aggravation_contact_regulation`                 datetime  NULL,
  `evac_aggravation_nature`                             varchar(100) NULL,

  `evac_par`                                            int(10) NULL,
  `evac_par_autre`                                      varchar(100) NULL,


  PRIMARY KEY  (`id_intervention`),
  KEY `FK_intervention_dispositif`      (`id_dispositif`      ),
  KEY `FK_intervention_origine`         (`id_origine`         ),
  KEY `FK_intervention_motif`           (`id_motif`           ),
  KEY `FK_intervention_motif_annulation`(`id_motif_annulation`),
  KEY `FK_intervention_regulation`      (`id_regulation`      ),
  KEY `FK_intervention_etat`            (`id_etat`            ),


  CONSTRAINT `FK_intervention_dispositif`       FOREIGN KEY (`id_dispositif`            ) REFERENCES `dispositif`                   (`id_dispositif`        ),
  CONSTRAINT `FK_intervention_origine`          FOREIGN KEY (`id_origine`               ) REFERENCES `intervention_origine`         (`id_origine`           ),
  CONSTRAINT `FK_intervention_motif`            FOREIGN KEY (`id_motif`                 ) REFERENCES `intervention_motif`           (`id_motif`             ),
  CONSTRAINT `FK_intervention_motif_annulation` FOREIGN KEY (`id_motif_annulation`      ) REFERENCES `intervention_motif_annulation`(`id_motif_annulation`  ),
  CONSTRAINT `FK_intervention_regulation`       FOREIGN KEY (`id_regulation`            ) REFERENCES `regulation`                   (`id_regulation`        ),
  CONSTRAINT `FK_intervention_origine_smur`     FOREIGN KEY (`transport_medicalisee_de` ) REFERENCES `lieu`                         (`id_lieu`              ),
  CONSTRAINT `FK_intervention_hopital_evac`     FOREIGN KEY (`evac_hopital_destination` ) REFERENCES `lieu`                         (`id_lieu`              ),
  CONSTRAINT `FK_intervention_etat`             FOREIGN KEY (`id_etat`                  ) REFERENCES `intervention_etat`            (`id_etat`              )
) ENGINE=InnoDB DEFAULT CHARSET=latin1  COLLATE=latin1_general_ci;

DROP TABLE IF EXISTS `crfrdp`.`bilan_evolutif`;
CREATE TABLE `bilan_evolutif` (
  `id_bilan_evolutif`           int(10) unsigned NOT NULL auto_increment,
  `id_intervention`             int(10) unsigned NOT NULL,
  `DH_bilan`                    datetime NOT NULL,
  `bilan`                       text NOT NULL,
  `pouls_chiffre`               int(10) unsigned NOT NULL,
  `pouls_regularite`            varchar(16) NOT NULL,
  `pouls_force`                 varchar(16) NOT NULL,
  `ventil_chiffre`              int(10) unsigned NOT NULL,
  `ventil_regularite`           varchar(16) NOT NULL,
  `ventil_amplitude`            varchar(16) NOT NULL,
  `tension_haute`               float NOT NULL,
  `tension_basse`               float NOT NULL,
  `tension_ref_haute`           float NOT NULL,
  `tension_ref_basse`           float NOT NULL,
  `reflexe_pupillaire`          varchar(45) NOT NULL,
  `temperature`                 float NOT NULL,
  PRIMARY KEY  (`id_bilan_evolutif`),
  KEY `FK_bilan_evolutif_intervention` (`id_intervention`),
  CONSTRAINT `FK_bilan_evolutif_intervention` FOREIGN KEY (`id_intervention`) REFERENCES `intervention` (`id_intervention`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1  COLLATE=latin1_general_ci;




DROP TABLE IF EXISTS `crfrdp`.`dispositif_interventions`;
CREATE TABLE `dispositif_interventions` (
  `id_dispositif`      int(10)       unsigned    NOT NULL,
  `id_intervention`    int(10)       unsigned    NOT NULL,
  PRIMARY KEY  (`id_dispositif`, `id_intervention`),
  KEY      `FK_dispositif_interventions_dispositif`     (`id_dispositif`),
  KEY      `FK_dispositif_interventions_intervention`   (`id_intervention`),
  CONSTRAINT `FK_dispositif_interventions_dispositif`   FOREIGN KEY (`id_dispositif`  ) REFERENCES `dispositif`   (`id_dispositif`  ),
  CONSTRAINT `FK_dispositif_interventions_intervention` FOREIGN KEY (`id_intervention`) REFERENCES `intervention` (`id_intervention`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1  COLLATE=latin1_general_ci;




DROP TABLE IF EXISTS `crfrdp`.`credits`;
CREATE TABLE `crfrdp`.`credits` (
  `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  `presentation_order` INTEGER UNSIGNED NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `version` VARCHAR(45) NOT NULL,
  `url` VARCHAR(255) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET=latin1  COLLATE=latin1_general_ci;


DROP TABLE IF EXISTS `crfrdp`.`application_version`;
CREATE TABLE `crfrdp`.`application_version` (
  `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  `version_name` VARCHAR(45) NOT NULL,
  `dev_release_date` VARCHAR(45) NOT NULL,
  `production_release_date` VARCHAR(45) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
)ENGINE = InnoDB DEFAULT CHARSET=latin1  COLLATE=latin1_general_ci;

DROP TABLE IF EXISTS `crfrdp`.`application_version_changelog`;
CREATE TABLE `crfrdp`.`application_version_changelog` (
  `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_application_version` INTEGER UNSIGNED NOT NULL,
  `id_jira` VARCHAR(45) NOT NULL,
  `description` TEXT NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_application_version_changelog-application_version` (`id_application_version`),
  CONSTRAINT `FK_application_version_changelog-application_version` FOREIGN KEY `FK_application_version_changelog-application_version` (`id_application_version`)
    REFERENCES `application_version` (`id`)
)
ENGINE = InnoDB DEFAULT CHARSET=latin1  COLLATE=latin1_general_ci;