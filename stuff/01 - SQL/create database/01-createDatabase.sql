DROP DATABASE IF EXISTS `crfrdp`;
CREATE DATABASE `crfrdp` DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

use crfrdp;

-- ----------------------------
-- TABLES pour les Types
-- ----------------------------

DROP TABLE IF EXISTS `crfrdp`.`vehicule_type`;
CREATE TABLE `vehicule_type` (
  `id_vehicule_type` int     (10 ) unsigned  NOT NULL auto_increment, 
  `label`            varchar (45 )           NOT NULL,
  PRIMARY KEY  (`id_vehicule_type`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1  COLLATE=latin1_general_ci;

DROP TABLE IF EXISTS `crfrdp`.`dispositif_etat`;
CREATE TABLE `dispositif_etat` (
  `id_etat`     int    (10) unsigned NOT NULL auto_increment,
  `label_etat`  varchar(45) NOT NULL,
  PRIMARY KEY  (`id_etat`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

DROP TABLE IF EXISTS `crfrdp`.`dispositif_type`;
CREATE TABLE `dispositif_type` (
  `id_type`             int     (10) unsigned NOT NULL auto_increment,
  `id_vehicule_type`    int     (10) unsigned NOT NULL,
  `label_type`          varchar (45) NOT NULL,
  `nombre_equipier_max` int     (10) unsigned default 0,
  `id_role_leader`      int     (10) unsigned default 0,
  `code_type`           varchar (4 ) NOT NULL,
  PRIMARY KEY  (`id_type`),
  KEY        `FK_dispositif_type_vehicule_type`       (`id_vehicule_type`),
  CONSTRAINT `FK_dispositif_type_vehicule_type`       FOREIGN KEY (`id_vehicule_type`       ) REFERENCES `vehicule_type`   (`id_vehicule_type`      )
  
) ENGINE=InnoDB DEFAULT CHARSET=latin1  COLLATE=latin1_general_ci;

DROP TABLE IF EXISTS `crfrdp`.`equipier_role`;
CREATE TABLE `equipier_role` (
  `id_role`     int     (10) unsigned NOT NULL auto_increment,
  `label_role`  varchar (45)          NOT NULL,
  `evaluable`   BOOLEAN               NOT NULL DEFAULT false,
  PRIMARY KEY  (`id_role`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1  COLLATE=latin1_general_ci;

DROP TABLE IF EXISTS `crfrdp`.`dispositif_type_definition`;
CREATE TABLE `dispositif_type_definition` (
  `id_dispositif_type`  int(10) unsigned NOT NULL,
  `id_role`             int(10) unsigned NOT NULL,
  `nombre_min`          int(10) unsigned NOT NULL,
  `nombre_max`          int(10) unsigned NOT NULL,
  PRIMARY KEY  (`id_dispositif_type`,`id_role`),
  KEY        `FK_dtd_dt`              (`id_dispositif_type`),
  KEY        `FK_dtd_er`              (`id_role`),
  CONSTRAINT `FK_dtd_dt` FOREIGN KEY  (`id_dispositif_type`) REFERENCES `dispositif_type`(`id_type`),
  CONSTRAINT `FK_dtd_er` FOREIGN KEY  (`id_role`           ) REFERENCES `equipier_role`  (`id_role`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1  COLLATE=latin1_general_ci;


DROP TABLE IF EXISTS `crfrdp`.`user_role`;
CREATE TABLE `user_role` (
  `id_role`     int    (10) unsigned NOT NULL auto_increment,
  `label_role`  varchar(45)          NOT NULL,
  `code_role`   varchar(45)          NOT NULL,
  PRIMARY KEY  (`id_role`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1  COLLATE=latin1_general_ci;

-- ----------------------------
-- TABLES pour Lieux
-- ----------------------------

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
  `id_type_lieu`                int    (10)   unsigned NOT NULL,
  `icon`                        VARCHAR(20)   NULL,
  `icon_gmap_init`              VARCHAR(500)  NULL,
  `nom`                         varchar(100)  NOT NULL,
  `addresse`                    varchar(100)  NOT NULL,
  `code_postal`                 varchar(5 )   NOT NULL,
  `ville`                       varchar(100)  NOT NULL,
  `google_coords_lat`           float  (10,6) NOT NULL,
  `google_coords_long`          float  (10,6) NOT NULL,
  `telephone`                   varchar(10 )  NULL,
  `url`                         varchar(300)  NULL,
  `mail`                        varchar(100)  NULL,
  `info_complementaire`         varchar(1000) NULL,
  `actif`                       boolean NULL default false,
  PRIMARY KEY (`id_lieu`),
  KEY        `FK_lieu_type_lieu`             (`id_type_lieu`),
  CONSTRAINT `FK_lieu_type_lieu` FOREIGN KEY (`id_type_lieu`) REFERENCES `lieu_type`(`id_type_lieu`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- ----------------------------
-- TABLES pour Delegation
-- ----------------------------

DROP TABLE IF EXISTS `crfrdp`.`delegation`;
CREATE TABLE `delegation` (
  `id_delegation` int     (10 ) unsigned  NOT NULL auto_increment,
  `id_siord`      int     (10 ) unsigned  NOT NULL, 
  `nom`           varchar (45 )           NOT NULL,
  `departement`   varchar (8  )           NOT NULL,
  `telephone`     varchar (10 )               NULL,
  `mobile`        varchar (10 )               NULL,
  `mail`          varchar (255)               NULL,
  `web`           varchar (255)               NULL,
  `id_lieu`       int     (10 ) unsigned  NOT NULL,
  `sort_order`    int     (10 ) unsigned  NOT NULL default 0,
  PRIMARY KEY  (`id_delegation`),
  UNIQUE KEY `id_siord_UNIQUE` (`id_siord`),
  KEY        `FK_delegation_lieu`             (`id_lieu`),
  CONSTRAINT `FK_delegation_lieu` FOREIGN KEY (`id_lieu`) REFERENCES `lieu`(`id_lieu`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1  COLLATE=latin1_general_ci;

-- ----------------------------
-- TABLES pour Regulation
-- ----------------------------


DROP TABLE IF EXISTS `crfrdp`.`regulation`;
CREATE TABLE `regulation` (
`id_regulation`       int     (10) unsigned NOT NULL auto_increment,
`start_date`          datetime              NOT NULL,
`expected_end_date`   datetime              NOT NULL,
`open`                boolean               NOT NULL,
`id_regulateur`       int     (10) unsigned NOT NULL,
`label`               varchar (45)          NOT NULL,
`comment`             varchar (45)              NULL,
 PRIMARY KEY  (`id_regulation`),
 KEY `FK_regulation_regulateur` (`id_regulateur`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1  COLLATE=latin1_general_ci;

-- ----------------------------
-- TABLES pour Dispositif 
-- ----------------------------

DROP TABLE IF EXISTS `crfrdp`.`dispositif`;
CREATE TABLE `dispositif` (
  `id_dispositif`                         int(10)       unsigned    NOT NULL auto_increment,
  `id_vehicule`                           int(10 )      unsigned    NOT NULL,
  `id_type_dispositif`                    int(10)       unsigned        NULL DEFAULT 0,
  `id_regulation`                         int(10)       unsigned    NOT NULL,
  `id_etat_dispositif`                    int(10)       unsigned    NOT NULL,  
  `id_current_intervention`               int(10)       unsigned        NULL DEFAULT 0,
  `display_state`                         int(3 )       unsigned    NOT NULL,
 
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
  `dispositif_comment`                    varchar(255)              NOT NULL,
  `dispositif_comment_etat`               varchar(255)                  NULL,
  `dispositif_back_3_girl`                boolean                   NOT NULL,
  `dispositif_not_enough_O2`              boolean                   NOT NULL,
  `dispositif_set_available_with_warning` boolean                   NOT NULL,  
  `dsa_type`                              varchar(3)                NOT NULL,
  `dsa_complet`                           boolean                   NOT NULL,
  `dsa_date_adulte_1`                     datetime,
  `dsa_date_adulte_2`                     datetime,
  `dsa_date_enfant`                       datetime,
  `dsa_adapteur_pediatrique`              boolean,
  `observation`                           text                      NOT NULL,
  `DH_debut`                              datetime NOT NULL,
  `DH_fin`                                datetime NOT NULL,
  `id_delegation_responsable`             int(10) unsigned NOT NULL,
  `autre_delegation`                      varchar(45) NOT NULL,
  `contact_radio`                         varchar(16) NOT NULL,
  `contact_tel1`                          varchar(16) NOT NULL,
  `contact_tel2`                          varchar(16) NOT NULL,
  `contact_alphapage`                     varchar(16) NOT NULL,
  `identite_medecin`                      varchar(45) NOT NULL,

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
  KEY        `FK_dispositif_type`                   (`id_type_dispositif`       ),
  KEY        `FK_dispositif_etat`                   (`id_etat_dispositif`       ),
  KEY        `FK_dispositif_regulation`             (`id_regulation`            ),
  KEY        `FK_dispositif_delegation`             (`id_delegation_responsable`),
  CONSTRAINT `FK_dispositif_type`       FOREIGN KEY (`id_type_dispositif`       ) REFERENCES `dispositif_type`   (`id_type`      ),
  CONSTRAINT `FK_dispositif_etat`       FOREIGN KEY (`id_etat_dispositif`       ) REFERENCES `dispositif_etat`   (`id_etat`      ),
  CONSTRAINT `FK_dispositif_regulation` FOREIGN KEY (`id_regulation`            ) REFERENCES `regulation`        (`id_regulation`),
  CONSTRAINT `FK_dispositif_delegation` FOREIGN KEY (`id_delegation_responsable`) REFERENCES `delegation`        (`id_delegation`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1  COLLATE=latin1_general_ci;

-- ----------------------------
-- TABLES pour Equipier & Users
-- ----------------------------

DROP TABLE IF EXISTS `crfrdp`.`equipier`;
CREATE TABLE `equipier` (
  `id_equipier`             int     (10) unsigned   NOT NULL auto_increment,
  `id_dispositif`           int     (10) unsigned       NULL DEFAULT 0,
  `nivol`                   varchar (16)            NOT NULL,
  `equipier_is_male`        boolean                 NOT NULL,
  `enabled`                 boolean                 NOT NULL,
  `nom`                     varchar (45)            NOT NULL,
  `prenom`                  varchar (45)            NOT NULL, 
  `indicatif`               varchar (45)                NULL,
  `mobile`                  varchar (15)                NULL,
  `email`                   varchar (255)               NULL,
  `id_delegation`           int     (10) unsigned   NOT NULL,
  `autre_delegation`        varchar (45)                NULL,
  `date_creation`           DATETIME                    NULL COMMENT 'Date de création dans RDP',
  `date_modification`       DATETIME                    NULL COMMENT 'Date de modification dans RDP',
  `id_siord`                INT          UNSIGNED       NULL COMMENT 'id du siord',
  `date_last_synchro_siord` DATETIME                    NULL COMMENT 'Date de dernière synchronisation avec le siord (avec une mise a jour effective)',
  UNIQUE `nivol_UNIQUE`  (`nivol`  ASC),
  UNIQUE `mobile_UNIQUE` (`mobile` ASC), 
  UNIQUE `email_UNIQUE`  (`email`  ASC),
  PRIMARY KEY  (`id_equipier`),
  KEY `FK_equipier_delegation` (`id_delegation`    ),
  CONSTRAINT `FK_equipier_delegation` FOREIGN KEY (`id_delegation`     ) REFERENCES `delegation`    (`id_delegation`)
)  ENGINE=InnoDB DEFAULT CHARSET=latin1  COLLATE=latin1_general_ci;



DROP TABLE IF EXISTS `crfrdp`.`user`;
CREATE TABLE `user` (
  `id_user`               int(10)     unsigned  NOT NULL auto_increment,
  `id_equipier`           int(10)     unsigned  NOT NULL,
  `password`              varchar(32)           NOT NULL,
  `enabled`               boolean               NOT NULL,
  `id_regulation`         int(10)     unsigned  NOT NULL default 0,
  `id_role_in_regulation` int(10)     unsigned  NOT NULL default 0,
  `date_creation`         DATETIME                  NULL, 
  `date_modification`     DATETIME                  NULL,
  PRIMARY KEY  (`id_user`),
  KEY `FK_user_equipier` (`id_equipier`),
  CONSTRAINT `FK_user_equipier` FOREIGN KEY (`id_equipier`) REFERENCES `equipier` (`id_equipier`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1  COLLATE=latin1_general_ci;


alter table `regulation` add CONSTRAINT `FK_regulation_regulateur` FOREIGN KEY (`id_regulateur`) REFERENCES `user` (`id_user`);



DROP TABLE IF EXISTS `crfrdp`.`user_roles`;
CREATE TABLE `user_roles` (
  `id_user` int(10) unsigned NOT NULL,
  `id_role` int(10) unsigned NOT NULL,
  PRIMARY KEY  (`id_user`, `id_role`),
  KEY `FK_user_roles_user`      (`id_user`),
  KEY `FK_user_roles_user_role` (`id_role`),
  CONSTRAINT `FK_user_roles_user`      FOREIGN KEY (`id_user`) REFERENCES `user`      (`id_user`),
  CONSTRAINT `FK_user_roles_user_role` FOREIGN KEY (`id_role`) REFERENCES `user_role` (`id_role`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1  COLLATE=latin1_general_ci;

DROP TABLE IF EXISTS `crfrdp`.`dispositif_equipiers`;
CREATE TABLE `dispositif_equipiers` (
  `id_dispositif`    int(10) unsigned NOT NULL,
  `id_equipier`      int(10) unsigned NOT NULL,
  `id_role_equipier` int(10) unsigned NOT NULL,
  `evaluation`       int(10) unsigned NOT NULL, -- 0 : pas d'evaluation, 1:Evaluateur, 2: Evalué
  `id_role_eval`     int(10) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`id_dispositif`,`id_equipier`),
  KEY `FK_dispositif_equipiers-dispositif`    (`id_dispositif`      ),
  KEY `FK_dispositif_equipiers-equipier`      (`id_equipier`        ),
  KEY `FK_dispositif_equipiers-equipier_role` (`id_role_equipier`   ),
  CONSTRAINT `FK_dispositif_equipiers-dispositif`     FOREIGN KEY (`id_dispositif`    ) REFERENCES `dispositif`    (`id_dispositif`),
  CONSTRAINT `FK_dispositif_equipiers-equipier`       FOREIGN KEY (`id_equipier`      ) REFERENCES `equipier`      (`id_equipier`  ),
  CONSTRAINT `FK_dispositif_equipiers-equipier_role`  FOREIGN KEY (`id_role_equipier` ) REFERENCES `equipier_role` (`id_role`      ),
  CONSTRAINT `FK_dispositif_equipiers-equipier_role2` FOREIGN KEY (`id_role_eval`     ) REFERENCES `equipier_role` (`id_role`      )
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
  `evaluateur`       boolean          NOT NULL,
  PRIMARY KEY (`id_equipier`,`id_role_equipier`),
  KEY `FK_equipier_roles-equipier`      (`id_equipier`        ),
  KEY `FK_equipier_roles-equipier_role` (`id_role_equipier`   ),
  CONSTRAINT `FK_equipier_roles-equipier`      FOREIGN KEY (`id_equipier`      ) REFERENCES `equipier`      (`id_equipier`  ),
  CONSTRAINT `FK_equipier_roles-equipier_role` FOREIGN KEY (`id_role_equipier` ) REFERENCES `equipier_role` (`id_role`      )
) ENGINE=InnoDB DEFAULT CHARSET=latin1  COLLATE=latin1_general_ci;


-- ----------------------------
-- TABLES pour Interventions
-- ----------------------------

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
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

DROP TABLE IF EXISTS `crfrdp`.`intervention_id`;
CREATE TABLE `intervention_id` (
  `year`                 varchar(4) NOT NULL,
  `type`                 varchar(4) NOT NULL,
  `number`               int(10) unsigned NOT NULL,
   PRIMARY KEY (`year`, `type`, `number`)
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
  `DH_annulation`                                       datetime NULL,
  

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
  `bilan_traitements`                                   text NULL,
  `bilan_commentaires`                                  text NULL,
  `bilan_evaluation_ci`                                 text NULL,
-- conscience
  `cs_coma`                                             boolean NULL,
  `cs_pci`                                              boolean NULL,
  `cs_pci_duree`                                        varchar(10) NULL,
  `cs_pc_secondaire`                                    boolean NULL,
  `cs_agitation`                                        boolean NULL,
  `cs_convulsions`                                      boolean NULL,
  
  `cs_glasgow_total`                                    tinyint NULL,
  `cs_glasgow_ouverture_yeux`                           tinyint NULL,
  `cs_glasgow_reponse_verbale`                          tinyint NULL,
  `cs_glasgow_reponse_motrice`                          tinyint NULL,
  
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



  `evac_sans_suite`                                     boolean NULL,
  `evac_aggravation`                                    boolean NULL,
  `evac_aggravation_pendant_transport`                  boolean NULL,
  `evac_aggravation_arrive_a_destination`               boolean NULL,
  `evac_aggravation_ventilation`                        int(10) unsigned NULL,
  `evac_aggravation_circulation`                        int(10) unsigned NULL,
  `evac_aggravation_saturation_o2`                      int(10) unsigned NULL,
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
  KEY        `FK_dispositif_interventions_dispositif`               (`id_dispositif`  ),
  KEY        `FK_dispositif_interventions_intervention`             (`id_intervention`),
  CONSTRAINT `FK_dispositif_interventions_dispositif`   FOREIGN KEY (`id_dispositif`  ) REFERENCES `dispositif`   (`id_dispositif`  ),
  CONSTRAINT `FK_dispositif_interventions_intervention` FOREIGN KEY (`id_intervention`) REFERENCES `intervention` (`id_intervention`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1  COLLATE=latin1_general_ci;


-- ----------------------------
-- TABLES pour Evaluation
-- ----------------------------


DROP TABLE IF EXISTS `crfrdp`.`evaluation_critere_definition`;
CREATE TABLE `evaluation_critere_definition` (
  `id_evaluation_critere_definition`  int(10) unsigned NOT NULL auto_increment,
  `id_role_evalue`                    int(10) unsigned NOT NULL,
  `num_ordre`                         int(10) unsigned NOT NULL,
  `label_critere`                     int(10) unsigned NOT NULL,
  `description_critere`               int(10) unsigned NOT NULL,
  `critere_note_max`                  int(10) unsigned     NULL,
  PRIMARY KEY  (`id_evaluation_critere_definition`),
  KEY `FK_bevaluation_critere_definition-equipier_role`                     (`id_role_evalue`),
  CONSTRAINT `FK_bevaluation_critere_definition-equipier_role` FOREIGN KEY  (`id_role_evalue`) REFERENCES `equipier_role` (`id_role`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1  COLLATE=latin1_general_ci;




DROP TABLE IF EXISTS `crfrdp`.`evaluation_session`;
CREATE TABLE `evaluation_session` (
  `id_evaluation_session`       int(10) unsigned NOT NULL auto_increment,
  `id_dispositif`               int(10) unsigned NOT NULL,
  `id_role_evalue`              int(10) unsigned NOT NULL,
  `id_equipier_evalue`          int(10) unsigned NOT NULL,
  `id_equipier_evaluateur`      int(10) unsigned NOT NULL,
  `date_start`                  timestamp        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_end`                    timestamp            NULL,
  PRIMARY KEY  (`id_evaluation_session`),
  KEY `FK_evaluation_session-dispositif`                              (`id_dispositif`          ),
  KEY `FK_evaluation_session-equipier_role`                           (`id_role_evalue`         ),
  KEY `FK_evaluation_session-equipier_evalue`                         (`id_equipier_evalue`     ),
--  CONSTRAINT `FK_evaluation_session-dispositif`           FOREIGN KEY (`id_dispositif`          ) REFERENCES `dispositif  `   (`id_dispositif`  ),
  CONSTRAINT `FK_evaluation_session-equipier_role`        FOREIGN KEY (`id_role_evalue`         ) REFERENCES `equipier_role`  (`id_role`        ),
  CONSTRAINT `FK_evaluation_session-equipier_evalue`      FOREIGN KEY (`id_equipier_evalue`     ) REFERENCES `equipier`       (`id_equipier`    ),
  CONSTRAINT `FK_evaluation_session-equipier_evaluateur`  FOREIGN KEY (`id_equipier_evaluateur` ) REFERENCES `equipier`       (`id_equipier`    )
) ENGINE=InnoDB DEFAULT CHARSET=latin1  COLLATE=latin1_general_ci;


-- ne passe pas... pkoi ??
-- ALTER TABLE `crfrdp`.`evaluation` ADD  CONSTRAINT `FK_evaluation-dispositif`           FOREIGN KEY (`id_dispositif`          ) REFERENCES `dispositif  `   (`id_dispositif`  );




DROP TABLE IF EXISTS `crfrdp`.`evaluation`;
CREATE TABLE `evaluation` (
  `id_evaluation`               int(10) unsigned NOT NULL auto_increment,
  `id_evaluation_session`       int(10) unsigned NOT NULL,
  `id_intervention`             int(10) unsigned NOT NULL,
  `date_evaluation`             timestamp        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `evaluation_validee`          boolean          NOT NULL DEFAULT false,
  `evaluation_commentaire`      text                 NULL,
  PRIMARY KEY  (`id_evaluation`),
  KEY `FK_evaluation-evaluation_session`                      (`id_evaluation_session`  ),
  KEY `FK_evaluation-intervention`                            (`id_intervention`        )
) ENGINE=InnoDB DEFAULT CHARSET=latin1  COLLATE=latin1_general_ci;


-- ALTER TABLE `evaluation` ADD CONSTRAINT `FK_evaluation-intervention`         FOREIGN KEY (`id_intervention`        ) REFERENCES `intervention`       (`id_intervention`);

-- ne passe pas... pkoi ??
-- ALTER TABLE `evaluation` ADD CONSTRAINT `FK_evaluation-evaluation_session`   FOREIGN KEY (`id_evaluation_session`  ) REFERENCES `evaluation_session` (`id_evaluation_session`);



DROP TABLE IF EXISTS `crfrdp`.`evaluation_notation`;
CREATE TABLE `evaluation_notation` (
  `id_evaluation_notation`      int(10) unsigned NOT NULL auto_increment,
  `id_evaluation`               int(10) unsigned NOT NULL,
  `id_evaluation_critere`       int(10) unsigned NOT NULL,
  `commentaire`                 text             NOT NULL,
  `note_critere`                int(10) unsigned NOT NULL,
  PRIMARY KEY  (`id_evaluation_notation`),
  KEY `FK_evaluation_notation-evaluation`                                         (`id_evaluation`        ),
  KEY `FK_evaluation_notation-evaluation_critere_definition`                      (`id_evaluation_critere`),
  CONSTRAINT `FK_evaluation_notation-evaluation`                    FOREIGN KEY   (`id_evaluation`        ) REFERENCES `evaluation`                     (`id_evaluation`),
  CONSTRAINT `FK_evaluation_notation-evaluation_critere_definition` FOREIGN KEY   (`id_evaluation_critere`) REFERENCES `evaluation_critere_definition`  (`id_evaluation_critere_definition`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1  COLLATE=latin1_general_ci;



-- ----------------------------
-- TABLES pour Vehicules 
-- ----------------------------



DROP TABLE IF EXISTS `crfrdp`.`vehicule`;

CREATE TABLE `vehicule` (
  `id_vehicule`                   int     (10 ) unsigned  NOT NULL auto_increment,
  `id_vehicule_type`              int     (10 ) unsigned  NOT NULL, 
  `indicatif`                     varchar (45 )           NOT NULL,
  `id_delegation`                 int     (10)  unsigned  NOT NULL,
  `id_dispositif`                 int     (10)  unsigned  NOT NULL COMMENT "Si le vehicule est affecté a un dispositif, l'id de celui ci est mis dans ce champs pour éviter une double affectation du véhicule",
  `last_know_coordinate_lat`      float   (10,6)              NULL,
  `last_know_coordinate_long`     float   (10,6)              NULL,
  `mobile_450_id`                 varchar (10 )               NULL,
  `mobile_150_id`                 varchar (10 )               NULL,
  `marque`                        varchar (50)            NOT NULL,
  `modele`                        varchar (50)            NOT NULL,
  `immatriculation`               varchar (50)            NOT NULL,
  `carburant`                     varchar (50)            NOT NULL,
  `date_mise_en_service`          date                    NOT NULL,
  `date_dernier_controle_tech`    date                    NOT NULL,
  `parking_rue`                   varchar (50)            NOT NULL,
  `parking_code_postal`           varchar (50)            NOT NULL,
  `parking_ville`                 varchar (50)            NOT NULL,
  `parking_coordinate_lat`        float   (10,6)              NULL,
  `parking_coordinate_long`       float   (10,6)              NULL,
  `parking_instructions`          text                        NULL,
  PRIMARY KEY  (`id_vehicule`),
  KEY        `FK_vehicule_delegation`                (`id_delegation`),
  KEY        `FK_vehicule_vehicule-type`             (`id_vehicule_type`),
  CONSTRAINT `FK_vehicule_delegation`    FOREIGN KEY (`id_delegation`   ) REFERENCES `delegation`        (`id_delegation`),
  CONSTRAINT `FK_vehicule_vehicule-type` FOREIGN KEY (`id_vehicule_type`) REFERENCES `vehicule_type`     (`id_vehicule_type`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1  COLLATE=latin1_general_ci;


-- Ajout de cette clé étrangère ici pour casser un cycle entre dispositif et vehicule.

  ALTER TABLE dispositif ADD KEY        `FK_dispositif_vehicule`         (`id_vehicule`);
  ALTER TABLE dispositif ADD CONSTRAINT `FK_dispositif_vehicule`   FOREIGN KEY (`id_vehicule`              ) REFERENCES `vehicule`          (`id_vehicule`  );



DROP TABLE IF EXISTS `crfrdp`.`vehicule_position_log`;
CREATE TABLE `vehicule_position_log` (
  `id_vehicule_position_log`      int     (10 ) unsigned  NOT NULL auto_increment,
  `id_vehicule`                   int     (10 ) unsigned  NOT NULL,
  `date_log`                      timestamp               NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `coordinate_lat`                float   (10,6)              NULL,
  `coordinate_long`               float   (10,6)              NULL,
  `coordinates_origine`           int     (10)  unsigned  NOT NULL COMMENT "2:Soit les coordonnées des radios, 1:soit les coordonnées google à la saisie des adresses",
  `id_dispositif`                 int     (10)  unsigned  NOT NULL COMMENT "0 si pas associé a un dispositif",
  `id_etat_dispositif`            int     (10)  unsigned  NOT NULL COMMENT "Permet de savoir si le véhicule à les gyrot, une victime a bord etc...",
  PRIMARY KEY  (`id_vehicule_position_log`), 
  KEY        `FK_vehicule_position_log_vehicule`                    (`id_vehicule`        ),
  KEY        `FK_vehicule_position_log_dispositif`                  (`id_dispositif`      ),
  KEY        `FK_vehicule_position_log_dispositif_etat`             (`id_etat_dispositif` ),
  CONSTRAINT `FK_vehicule_position_log_dispositif_etat` FOREIGN KEY (`id_etat_dispositif` ) REFERENCES `dispositif_etat`  (`id_etat`        ),
  CONSTRAINT `FK_vehicule_position_log_vehicule`        FOREIGN KEY (`id_vehicule`        ) REFERENCES `vehicule`         (`id_vehicule`    ),
  CONSTRAINT `FK_vehicule_position_log_dispositif`      FOREIGN KEY (`id_dispositif`      ) REFERENCES `dispositif`       (`id_dispositif`  )
) ENGINE=InnoDB DEFAULT CHARSET=latin1  COLLATE=latin1_general_ci;


--  permet de retracer la position d'un véhicule sur la durée d'une intervention
DROP TABLE IF EXISTS `crfrdp`.`vehicule_position_log_inter`;
CREATE TABLE `vehicule_position_log_inter` (
  `id_vehicule_position_log_inter`    int     (10 ) unsigned  NOT NULL auto_increment,
  `id_vehicule_position_log`          int     (10 ) unsigned  NOT NULL,
  `id_intervention`                   int     (10)  unsigned  NOT NULL,
  PRIMARY KEY  (`id_vehicule_position_log_inter`),
  KEY        `FK_vehicule_position_log_inter_intervention`                         (`id_intervention`         ),
  KEY        `FK_vehicule_position_log_inter_vehicule_position_log`                (`id_vehicule_position_log`),
  CONSTRAINT `FK_vehicule_position_log_inter_intervention`             FOREIGN KEY (`id_intervention`         ) REFERENCES `intervention`           (`id_intervention`          ),
  CONSTRAINT `FK_vehicule_position_log_inter_vehicule_position_log`    FOREIGN KEY (`id_vehicule_position_log`) REFERENCES `vehicule_position_log`  (`id_vehicule_position_log` )
) ENGINE=InnoDB DEFAULT CHARSET=latin1  COLLATE=latin1_general_ci;



-- ----------------------------
-- TABLES pour Release Applications
-- ----------------------------

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
  KEY        `FK_application_version_changelog-application_version` (`id_application_version`),
  CONSTRAINT `FK_application_version_changelog-application_version` FOREIGN KEY `FK_application_version_changelog-application_version` (`id_application_version`)
    REFERENCES `application_version` (`id`)
)
ENGINE = InnoDB DEFAULT CHARSET=latin1  COLLATE=latin1_general_ci;

-- ----------------------------
-- TABLES pour SMS
-- ----------------------------


DROP TABLE IF EXISTS `crfrdp`.`sms_type`;
CREATE TABLE `sms_type` (
  `id_sms_type`     INTEGER UNSIGNED  NOT NULL AUTO_INCREMENT,
  `label_sms_type`  varchar(45)       NOT NULL,
  PRIMARY KEY (`id_sms_type`)
) 
ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

DROP TABLE IF EXISTS `crfrdp`.`sms_log`;
CREATE TABLE `sms_log` (
  `id_sms_log`      INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_sms_type`     INTEGER UNSIGNED NOT NULL,
  `id_dispositif`   INTEGER UNSIGNED NOT NULL,
  `id_equipier`     INTEGER UNSIGNED NOT NULL,
  `api`             varchar(12  )    NOT NULL,
  `sender`          varchar(12  )    NOT NULL,
  `to`              varchar(12  )    NOT NULL,
  `message`         varchar(2048)    NOT NULL,
  `evt_date`        timestamp        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  `raw_answer`      VARCHAR(2048)        NULL,
  `status_code`     VARCHAR(6)           NULL, 
  `status_message`  VARCHAR(255)         NULL,
  `call_id`         VARCHAR(36)          NULL, 
  `nbr_sms_sent`    INTEGER UNSIGNED     NULL,

  
  
  
  
  PRIMARY KEY (`id_sms_log`),
  KEY        `FK_sms_log-sms_type`   (`id_sms_type`  ),
  KEY        `FK_sms_log-equipier`   (`id_equipier`  ),
  KEY        `FK_sms_log-dispositif` (`id_dispositif`),
  CONSTRAINT `FK_sms_log-sms_type`   FOREIGN KEY `FK_sms_log-sms_type`   (`id_sms_type`  ) REFERENCES `sms_type`   (`id_sms_type`   ),
  CONSTRAINT `FK_sms_log-user`       FOREIGN KEY `FK_sms_log-equipier`   (`id_equipier`  ) REFERENCES `equipier`   (`id_equipier`   ),
  CONSTRAINT `FK_sms_log-dispositif` FOREIGN KEY `FK_sms_log-dispositif` (`id_dispositif`) REFERENCES `dispositif` (`id_dispositif` )
) 
ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;


DROP TABLE IF EXISTS `crfrdp`.`sms_template`;
CREATE  TABLE `crfrdp`.`sms_template` (
  `id_sms_template`     INT           UNSIGNED NOT NULL AUTO_INCREMENT ,
  `id_regulation`       INT           UNSIGNED NOT NULL ,
  `template_date`       TIMESTAMP              NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `enabled`             TINYINT (1)            NOT NULL DEFAULT 1 ,
  `message`             VARCHAR (200)          NOT NULL ,
  PRIMARY KEY (`id_sms_template`) 
) 
ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;




-- ----------------------------
-- TABLES pour import SIORD
-- ----------------------------


DROP TABLE IF EXISTS `crfrdp`.`siord_synchro_type`;
CREATE TABLE `siord_synchro_type` (
  `id_synchro_type`     int    (10) UNSIGNED NOT NULL auto_increment,
  `label_synchro_type`  varchar(45)          NOT NULL,
  PRIMARY KEY  (`id_synchro_type`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;


DROP TABLE IF EXISTS `crfrdp`.`siord_synchro`;
CREATE  TABLE `crfrdp`.`siord_synchro` (
  `id_synchro_siord`          INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_synchro_type`           INT(10) UNSIGNED NOT NULL COMMENT 'Type de synchro',
  `synchro_date_start`        DATETIME         NOT NULL COMMENT 'Date de début dimport',
  `synchro_date_end`          DATETIME             NULL COMMENT 'Date de fin dimport',
  `last_imported_id`          INT(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Id du dernier élément importé',
  `sucessfull_import`         INT(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Nb dimport effectuée sans erreur',
  `warning_import`            INT(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Nb dimport effectuée avec suppression de données',
  `failed_import`             INT(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Nb dimport échoué',
 PRIMARY KEY (`id_synchro_siord`),
 KEY `id_synchro_type` (`id_synchro_type`),
 CONSTRAINT `FK_siord_s_siord_st`    FOREIGN KEY `FK_siord_s_siord_st`    (`id_synchro_type`  ) REFERENCES `siord_synchro_type` (`id_synchro_type`   )  
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;


DROP TABLE IF EXISTS `crfrdp`.`siord_membres`;
CREATE TABLE `siord_membres` (
  `id_synchro_siord`    int(10) UNSIGNED  NOT NULL,
  `id`                  int(10)           NOT NULL,
  `login`               varchar(100)      NOT NULL DEFAULT '',
  `pwd`                 varchar(100)      NOT NULL DEFAULT '',
  `nom`                 varchar(100)      NOT NULL DEFAULT '',
  `prenom`              varchar(100)      NOT NULL DEFAULT '',
  `droits`              int(2)            NOT NULL DEFAULT '0',
  `telephone`           varchar(20)           NULL DEFAULT '',
  `email`               varchar(100)          NULL DEFAULT '',
  `nivol`               varchar(20)       NOT NULL DEFAULT 'XXXXXXXXXX',
  `activation`          char(1)           NOT NULL DEFAULT 'N',
  `sexe`                char(1)           NOT NULL DEFAULT '',
  `droits_cadre`        int(3)            NOT NULL DEFAULT '0',
  `id_del_urgence`      int(10)           NOT NULL DEFAULT '0',
  `id_delegation`       int(10)           NOT NULL DEFAULT '0',
  `date_creation`       datetime          NOT NULL DEFAULT '1970-01-01 01:00:00',
  `date_modification`   datetime          NOT NULL DEFAULT '1970-01-01 01:00:00',
  `membre_update`       boolean           NOT NULL DEFAULT false,
  KEY `id_synchro_siord` (`id_synchro_siord`),
  PRIMARY KEY (`id_synchro_siord`, `id`),
  CONSTRAINT `FK_siord_m_siord_s`    FOREIGN KEY `FK_siord_m_siord_s` (`id_synchro_siord` ) REFERENCES `siord_synchro` (`id_synchro_siord`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;


DROP TABLE IF EXISTS `crfrdp`.`siord_membres_import_status_def`;
CREATE TABLE `siord_membres_import_status_def` (
  `id_status`     int    (10) NOT NULL auto_increment,
  `label_status`  varchar(100) NOT NULL,
  PRIMARY KEY  (`id_status`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;



DROP TABLE IF EXISTS `crfrdp`.`siord_membres_import_status`;
CREATE TABLE `siord_membres_import_status` (
`id_synchro_siord`    int(10) UNSIGNED NOT NULL,
`id`                  int(10) NOT NULL DEFAULT '0',
`id_status`           int(10) NOT NULL DEFAULT '0',
`commentaire`         varchar(200) NULL,
 KEY `id_synchro_siord` (`id_synchro_siord`),
 KEY `id_status`        (`id_status`),
 PRIMARY KEY (`id_synchro_siord`, `id`,`id_status` ),
 CONSTRAINT `FK_siord_mis_siord_s`    FOREIGN KEY `FK_siord_mis_siord_s`    (`id_synchro_siord` ) REFERENCES `siord_synchro`                     (`id_synchro_siord`),
 CONSTRAINT `FK_siord_mis_siord_misd` FOREIGN KEY `FK_siord_mis_siord_misd` (`id_status`        ) REFERENCES `siord_membres_import_status_def`   (`id_status`       )
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;




DROP TABLE IF EXISTS `crfrdp`.`siord_membres_competences`;
CREATE TABLE `siord_membres_competences` (
  `id_synchro_siord`  int(10) UNSIGNED  NOT NULL, 
  `id`                int(10)           NOT NULL,
  `id_membre`         int(10)           NOT NULL DEFAULT '0',
  `id_role`           int(10)           NOT NULL DEFAULT '0',
  KEY `id_membre`         (`id_membre`),
  KEY `id_role`           (`id_role`  ),
  KEY `id_synchro_siord`  (`id_synchro_siord`),
  PRIMARY KEY (`id_synchro_siord`, `id`),-- note c'est bien id et pas id_membre dans la clé
  CONSTRAINT `FK_siord_mc_siord_s`   FOREIGN KEY `FK_siord_mc_siord_s`   (`id_synchro_siord`  ) REFERENCES `siord_synchro`   (`id_synchro_siord`   )
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;





