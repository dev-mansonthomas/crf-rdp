use mysql;

DROP DATABASE IF EXISTS `crfirp`;
CREATE DATABASE `crfirp` DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

use crfirp;


DROP TABLE IF EXISTS `crfirp`.`delegation`;
CREATE TABLE `delegation` (
  `id_delegation` int(10) unsigned NOT NULL auto_increment,
  `nom` varchar(45) NOT NULL,
  `departement` varchar(8) NOT NULL,
  PRIMARY KEY  (`id_delegation`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1  COLLATE=latin1_general_ci;

DROP TABLE IF EXISTS `crfirp`.`dispositif_etat`;
CREATE TABLE `dispositif_etat` (
  `id_etat` int(10) unsigned NOT NULL auto_increment,
  `label_etat` varchar(45) NOT NULL,
  PRIMARY KEY  (`id_etat`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `crfirp`.`dispositif_type`;
CREATE TABLE `dispositif_type` (
  `id_type` int(10) unsigned NOT NULL auto_increment,
  `label_type` varchar(45) NOT NULL,
  PRIMARY KEY  (`id_type`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1  COLLATE=latin1_general_ci;

DROP TABLE IF EXISTS `crfirp`.`equipier_role`;
CREATE TABLE `equipier_role` (
  `id_role` int(10) unsigned NOT NULL auto_increment,
  `label_role` varchar(45) NOT NULL,
  PRIMARY KEY  (`id_role`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1  COLLATE=latin1_general_ci;

DROP TABLE IF EXISTS `crfirp`.`user_role`;
CREATE TABLE `user_role` (
  `id_role` int(10) unsigned NOT NULL auto_increment,
  `label_role` varchar(45) NOT NULL,
  `code_role` varchar(45) NOT NULL,
  PRIMARY KEY  (`id_role`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1  COLLATE=latin1_general_ci;

DROP TABLE IF EXISTS `crfirp`.`user`;
CREATE TABLE `user` (
  `id_user` int(10) unsigned NOT NULL auto_increment,
  `num_nivol` varchar(16) NOT NULL,
  `user_is_male` boolean NOT NULL,
  `password` varchar(32) NOT NULL,
  `nom` varchar(45) NOT NULL,
  `prenom` varchar(45) NOT NULL,
  `id_delegation` int(10) unsigned NOT NULL,
  `autre_delegation` varchar(45) NOT NULL,
  `id_role` int(10) unsigned NOT NULL,
  `id_regulation` int(10) unsigned NOT NULL,
  PRIMARY KEY  (`id_user`),
  KEY `FK_user_role` (`id_role`),
  CONSTRAINT `FK_user_role` FOREIGN KEY (`id_role`) REFERENCES `user_role` (`id_role`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1  COLLATE=latin1_general_ci;


DROP TABLE IF EXISTS `crfirp`.`regulation`;
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


DROP TABLE IF EXISTS `crfirp`.`dispositif`;
CREATE TABLE `dispositif` (
  `id_dispositif`                         int(10) unsigned NOT NULL auto_increment,
  `id_type_dispositif`                    int(10) unsigned NULL DEFAULT 0,
  `id_regulation` int(10)                 unsigned NOT NULL,
  `indicatif_vehicule`            varchar(16) NOT NULL,
  `O2_B1_volume` int(10) unsigned NOT NULL,
  `O2_B1_pression` float NOT NULL,
  `O2_B2_volume` int(10) unsigned NOT NULL,
  `O2_B2_pression` float NOT NULL,
  `O2_B3_volume` int(10) unsigned NOT NULL,
  `O2_B3_pression` float NOT NULL,
  `O2_B4_volume` int(10) unsigned NOT NULL,
  `O2_B4_pression` float NOT NULL,
  `O2_B5_volume` int(10) unsigned NOT NULL,
  `O2_B5_pression` float NOT NULL,
  `dispositif_comment` varchar(255) NOT NULL,
  `dispositif_back_3_girl` boolean NOT NULL,
  `dispositif_not_enough_O2` boolean NOT NULL,
  `dispositif_set_available_with_warning` boolean NOT NULL,
  `creation_terminee` boolean NOT NULL default false,
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
  `id_etat_dispositif` int(10) unsigned NOT NULL,
  `id_current_intervention` int(10) unsigned NOT NULL,
  `display_state` int(3) unsigned NOT NULL,
  `equipier_1_id`   int(10) unsigned NULL DEFAULT 0,
  `equipier_2_id`   int(10) unsigned NULL DEFAULT 0,
  `equipier_3_id`   int(10) unsigned NULL DEFAULT 0,
  `equipier_4_id`   int(10) unsigned NULL DEFAULT 0,
  `equipier_5_id`   int(10) unsigned NULL DEFAULT 0,
  `equipier_1_role` int(10) unsigned NULL DEFAULT 0,
  `equipier_2_role` int(10) unsigned NULL DEFAULT 0,
  `equipier_3_role` int(10) unsigned NULL DEFAULT 0,
  `equipier_4_role` int(10) unsigned NULL DEFAULT 0,
  `equipier_5_role` int(10) unsigned NULL DEFAULT 0,

  `current_addresse_rue`         varchar(60) NULL,
  `current_addresse_code_postal` varchar(5 ) NULL,
  `current_addresse_ville`       varchar(60) NULL,
  `google_coords_lat`            float(10,6) NULL,
  `google_coords_long`           float(10,6) NULL,
  `DH_reception`                 datetime NULL,
  `DH_depart`                    datetime NULL,
  `DH_sur_place`                 datetime NULL,
  `DH_bilan_primaire`            datetime NULL,
  `DH_bilan_secondaire`          datetime NULL,
  `DH_quitte_les_lieux`          datetime NULL,
  `DH_arrivee_hopital`           datetime NULL,
  `DH_dispo`                     datetime NULL,
  `DH_a_sa_base`                 datetime NULL,
  `DH_appel_renfort_medical`     datetime NULL,
  `DH_arrivee_renfort_medical`   datetime NULL,

  PRIMARY KEY  (`id_dispositif`),
  KEY      `FK_dispositif_type`             (`id_type_dispositif`),
  KEY      `FK_dispositif_etat`             (`id_etat_dispositif`),
  KEY      `FK_dispositif_regulation`       (`id_regulation`   ),
  KEY      `FK_dispositif_delegation`       (`id_delegation_responsable`),
  CONSTRAINT `FK_dispositif_etat`       FOREIGN KEY (`id_etat_dispositif`) REFERENCES `dispositif_etat`   (`id_etat`),
  CONSTRAINT `FK_dispositif_type`       FOREIGN KEY (`id_type_dispositif`) REFERENCES `dispositif_type`   (`id_type`),
  CONSTRAINT `FK_dispositif_regulation` FOREIGN KEY (`id_regulation`     ) REFERENCES `regulation`        (`id_regulation`),
  CONSTRAINT `FK_dispositif_delegation` FOREIGN KEY (`id_delegation_responsable`) REFERENCES `delegation`   (`id_delegation`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1  COLLATE=latin1_general_ci;

DROP TABLE IF EXISTS `crfirp`.`equipier`;
CREATE TABLE `equipier` (
  `id_equipier`       int(10) unsigned NOT NULL auto_increment,
  `id_dispositif`       int(10) unsigned NULL DEFAULT 0,
  `id_role_dans_dispositif` int(10) unsigned NULL DEFAULT 0,
  `num_nivol` varchar(16) NOT NULL,
  `equipier_is_male` boolean NOT NULL,
  `nom` varchar(45) NOT NULL,
  `prenom` varchar(45) NOT NULL,
  `DH_debut` datetime NOT NULL,
  `DH_fin` datetime NOT NULL,
  `id_delegation` int(10) unsigned NOT NULL,
  `autre_delegation` varchar(45) NOT NULL,
  `id_role_equipier1`  int(10) unsigned NOT NULL,
  `id_role_equipier2`  int(10) unsigned NOT NULL,
  PRIMARY KEY  (`id_equipier`),
  KEY `FK_equipier_role1`      (`id_role_equipier1`),
  KEY `FK_equipier_role2`      (`id_role_equipier2`),
  KEY `FK_equipier_delegation` (`id_delegation`    ),
  CONSTRAINT `FK_equipier_delegation` FOREIGN KEY (`id_delegation`     ) REFERENCES `delegation`    (`id_delegation`),
  CONSTRAINT `FK_equipier_role1`      FOREIGN KEY (`id_role_equipier1` ) REFERENCES `equipier_role` (`id_role`      ),
  CONSTRAINT `FK_equipier_role2`      FOREIGN KEY (`id_role_equipier2` ) REFERENCES `equipier_role` (`id_role`      )
) ENGINE=InnoDB DEFAULT CHARSET=latin1  COLLATE=latin1_general_ci;




DROP TABLE IF EXISTS `crfirp`.`intervention_origine`;
CREATE TABLE `crfirp`.`intervention_origine`
(
  `id_origine` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  `label_origine` VARCHAR(45) NOT NULL,
  PRIMARY KEY(`id_origine`)
)
ENGINE = InnoDB;

DROP TABLE IF EXISTS `crfirp`.`intervention_motif`;
CREATE TABLE `crfirp`.`intervention_motif`
(
  `id_motif` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  `label_motif` VARCHAR(45) NOT NULL,
  PRIMARY KEY(`id_motif`)
)
ENGINE = InnoDB;


DROP TABLE IF EXISTS `crfirp`.`intervention_seq`;
CREATE TABLE `intervention_seq` (
  `year`                 varchar(4) NOT NULL,
  `number`               int(10) unsigned NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1  COLLATE=latin1_general_ci;

DROP TABLE IF EXISTS `crfirp`.`intervention_etat`;
CREATE TABLE `intervention_etat` (
  `id_etat` int(10) unsigned NOT NULL auto_increment,
  `label_etat` varchar(45) NOT NULL,
  PRIMARY KEY  (`id_etat`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `crfirp`.`intervention`;
CREATE TABLE `intervention` (
  `id_intervention`             int(10) unsigned NOT NULL auto_increment,
  `id_dispositif`               int(10) unsigned NOT NULL,
  `id_regulation`               int(10) unsigned NOT NULL,
  `id_origine`                  int(10) unsigned NOT NULL,
  `id_motif`                    int(10) unsigned NOT NULL,
  `id_etat`                     int(10) unsigned NOT NULL DEFAULT 0,
  `complement_motif`            varchar(255) NULL,
  `num_inter`                   varchar(16) NOT NULL,
  `id_ref_num_inter`            int(10) unsigned NULL,
  `ref_num_inter`               varchar(16) NULL,
  `DH_reception`                datetime NOT NULL,
  `DH_depart`                   datetime NULL,
  `DH_sur_place`                datetime NULL,
  `DH_bilan_primaire`           datetime NULL,
  `DH_bilan_secondaire`         datetime NULL,
  `DH_quitte_les_lieux`         datetime NULL,
  `DH_arrivee_hopital`          datetime NULL,
  `DH_dispo`                    datetime NULL,
  `DH_a_sa_base`                datetime NULL,
  `DH_appel_renfort_medical`    datetime NULL,
  `DH_arrivee_renfort_medical`  datetime NULL,
  `nom_victime`                 varchar(60) NULL,
  `nom_contact_sur_place`       varchar(60) NULL,
  `coordonnees_contact`         varchar(60) NULL,
  `batiment`                    varchar(30) NULL,
  `etage`                       varchar(30) NULL,
  `porte`                       varchar(30) NULL,
  `complement_adresse`          varchar(255) NULL,
  `rue`                         varchar(80) NULL,
  `code_postal`                 varchar(5 ) NULL,
  `ville`                       varchar(80) NULL,
  `google_coords_lat`            float(10,6) NULL,
  `google_coords_long`           float(10,6) NULL,
  `bilan_primaire`              text NULL,
  `bilan_secondaire`            text NULL,

  `pouls_chiffre`               int(10) unsigned NULL,
  `pouls_regularite`            varchar(16) NULL,
  `pouls_force`                 varchar(16) NULL,
  `ventil_chiffre`              int(10) unsigned NULL,
  `ventil_regularite`           varchar(16) NULL,
  `ventil_amplitude`            varchar(16) NULL,
  `tension_haute`               float NULL,
  `tension_basse`               float NULL,
  `tension_ref_haute`           float NULL,
  `tension_ref_basse`           float NULL,
  `reflexe_pupillaire`          varchar(45) NULL,
  `temperature`                 float NULL,

  `police_sur_place`            boolean NULL,
  `pompier_sur_place`           boolean NULL,
  `coordinateur_bspp`           boolean NULL,
  `coordinateur_samu`           boolean NULL,
  `renfort_medical`             boolean NULL,
  `transport_medicalisee`       boolean NULL,
  `laisse_sur_place`            boolean NULL,
  `laisse_sur_place_vivant`     boolean NULL,
  `decharche`                   boolean NULL,
  `utilisation_dsa`             boolean NULL,

  `renfort_medical_type`        varchar(45) NULL,
  `num_inter_banlieu`           varchar(16) NULL,
  `hopital`                     varchar(45) NULL,
  `eval_ci`                     text NULL,
  PRIMARY KEY  (`id_intervention`),
  KEY `FK_intervention_dispositif` (`id_dispositif`),
  KEY `FK_intervention_origine`    (`id_origine`   ),
  KEY `FK_intervention_motif`      (`id_motif`     ),
  KEY `FK_intervention_regulation` (`id_regulation`),
  KEY `FK_intervention_etat`       (`id_etat`      ),


  CONSTRAINT `FK_intervention_dispositif` FOREIGN KEY (`id_dispositif`) REFERENCES `dispositif`          (`id_dispositif`),
  CONSTRAINT `FK_intervention_origine`    FOREIGN KEY (`id_origine`   ) REFERENCES `intervention_origine`(`id_origine`   ),
  CONSTRAINT `FK_intervention_motif`      FOREIGN KEY (`id_motif`     ) REFERENCES `intervention_motif`  (`id_motif`     ),
  CONSTRAINT `FK_intervention_regulation` FOREIGN KEY (`id_regulation`) REFERENCES `regulation`          (`id_regulation`),
  CONSTRAINT `FK_intervention_etat`       FOREIGN KEY (`id_etat`      ) REFERENCES `intervention_etat`   (`id_etat`      )
) ENGINE=InnoDB DEFAULT CHARSET=latin1  COLLATE=latin1_general_ci;

DROP TABLE IF EXISTS `crfirp`.`bilan_evolutif`;
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