insert into crfrdp.lieu (  
  `id_type_lieu`         ,  
  `icon`                 ,  
  `icon_gmap_init`       ,  
  `nom`                  ,  
  `addresse`             ,  
  `code_postal`          ,  
  `ville`                ,  
  `google_coords_lat`    ,  
  `google_coords_long`   ,  
  `info_complementaire`    
)
select 3, null, null, nom, addresse, code_postal, ville, 0, 0, null
from lieu_delegation;




insert into crfrdp.delegation (
nom, departement, telephone, mobile, mail, web, id_lieu
)
select nom, departement, telephone, mobile, mail, web, id_lieu
from delegation;



insert into crfrdp.equipier_role (label_role)
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

insert into crfrdp.dispositif_type (label_type)
values
('ALPHA'),
('BSPP'),
('Poste de Secours'),
('Point d''Alerte'),
('N/A');

update crfrdp.dispositif_type set id_type = 0 where id_type = 5;
ALTER TABLE crfrdp.dispositif_type AUTO_INCREMENT = 5;



insert into crfrdp.dispositif_etat (label_etat)
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

update crfrdp.dispositif_etat set id_etat = 0  where id_etat = 14;
update crfrdp.dispositif_etat set id_etat = -1 where id_etat = 13;
update crfrdp.dispositif_etat set id_etat = -2 where id_etat = 12;
update crfrdp.dispositif_etat set id_etat = -3 where id_etat = 11;
ALTER TABLE crfrdp.dispositif_etat AUTO_INCREMENT = 14;


insert into crfrdp.user_role (label_role, code_role)
values
('Administrateur', 'ADMINISTRATEUR'),
('Régulateur'    , 'REGULATEUR'    ),
('Co-Régulateur' , 'CO-REGULATEUR' ),
('Observateur'   , 'OBSERVATEUR'   ),
('N/A'           , 'N/A'           );

update crfrdp.user_role set id_role = 0 where id_role = 5;
ALTER TABLE crfrdp.user_role AUTO_INCREMENT = 5;

insert into crfrdp.`user` ( `nivol`, `user_is_male`, `password`,`nom`,`prenom`,`mobile`, `email` ,`id_delegation`, `autre_delegation`, `id_role`, `id_regulation` )
values
('NA', true, '0','N/A'     , 'N/A'    , '0', 't@t.com', 0, '', 0, 0 );

update crfrdp.`user` set id_user = 0 where id_user = 1;
ALTER TABLE crfrdp.`user` AUTO_INCREMENT = 1;

insert into crfrdp.regulation (`start_date` ,`expected_end_date` ,`open`,`id_regulateur`,`label` ,`comment` )
values
(MAKEDATE(1970,1), MAKEDATE(1970,2), false, 0, 'N/A', 'N/A');

insert into crfrdp.`dispositif`
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
( 0, 0, 'N/A', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '', 
  false, false, false, 'N/A', 0, '',
  MAKEDATE(1970,1), MAKEDATE(1970,2), 1, 'N/A',
  'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 0, 0, 0
);

update equipier
set id_delegation = 0
where id_delegation is null;

//TODO : ajouter insert into delegation avec l id 0


insert into crfrdp.equipier
(  `id_dispositif`    ,
  `nivol`        ,
  `equipier_is_male` ,
  `enabled`          ,
  `nom`              ,
  `prenom`           ,
  `mobile`           ,
  `email`            ,
  `id_delegation`    ,
  `autre_delegation` )
select 0, `nivol`        ,
  `equipier_is_male` ,
  false,
  `nom`              ,
  `prenom`           ,
  `mobile`           ,
  `email`            ,
  `id_delegation`    ,
  `autre_delegation`
  from equipier;

delete from crfrdp.equipier
where id_delegation = 0;



insert into crfrdp.equipier_roles 
( id_equipier, id_role_equipier, en_evaluation
)
select id_equipier, id_role_equipier, false
from equipier_roles;


export des données en ligne de commande : 

mysqldump  -i -c  -u crfrdp -pCRFCRF crfrdp delegation     > delegation.sql
mysqldump  -i -c --skip-extended-insert -u crfrdp -pCRFCRF crfrdp equipier       > equipier.sql 
mysqldump  -i -c  -u crfrdp -pCRFCRF crfrdp equipier_roles > equipier_roles.sql
mysqldump  -i -c  -u crfrdp -pCRFCRF crfrdp lieu           > lieu.sql