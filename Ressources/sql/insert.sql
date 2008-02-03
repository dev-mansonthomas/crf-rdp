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
('Indispo - Equipage incomplet'),
('Indispo - Matériel incomplet'),
('Indisponible'),
('Dispo'),
('Parti'),
('Sur Place'),
('Primaire passé'),
('Secondaire passé'),
('Transport'),
('Arrivé à l''Hopital'),
('A sa base'),
('N/A');

update dispositif_etat set id_etat = 0 where id_etat = 12;

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
('Non Affecté'),
('Affecté'),
('Terminé'),
('Annulé'),
('En cours de création');

update intervention_etat set id_etat = 0 where id_etat = 5;

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
(0, '75233A', true , 'Manson'     , 'Thomas'    , MAKEDATE(1970, 1), MAKEDATE(1970, 1),6,'', 4, 0, 0 ),
(0, '224311', true , 'Arecki'     , 'Thomas'    , MAKEDATE(1970, 1), MAKEDATE(1970, 1),6,'', 1, 0, 0 ),
(0, '224321', false, 'Escoube'    , 'Raphaelle' , MAKEDATE(1970, 1), MAKEDATE(1970, 1),6,'', 5, 0, 0 ),
(0, '224322', false, 'Coutant'    , 'Séverine'  , MAKEDATE(1970, 1), MAKEDATE(1970, 1),6,'', 4, 0, 0 ),
(0, '224333', true , 'Philipakis' , 'Alexandre' , MAKEDATE(1970, 1), MAKEDATE(1970, 1),6,'', 4, 0, 0 ),
(0, '224334', true , 'Phills'     , 'Richard'   , MAKEDATE(1970, 1), MAKEDATE(1970, 1),6,'', 3, 0, 0 ),
(0, '224344', true , 'Poules'     , 'Titi'      , MAKEDATE(1970, 1), MAKEDATE(1970, 1),6,'', 3, 0, 0 ),
(0, '224345', true , 'Doré'       , 'Bastien'   , MAKEDATE(1970, 1), MAKEDATE(1970, 1),6,'', 2, 0, 0 ),
(0, '224335', false, 'Sergent'    , 'Stéphanie' , MAKEDATE(1970, 1), MAKEDATE(1970, 1),6,'', 1, 0, 0 ),
(0, '224336', true , 'Valet'      , 'Sébastien' , MAKEDATE(1970, 1), MAKEDATE(1970, 1),6,'', 1, 3, 0 ),
(0, '224337', false, 'Soulas'     , 'Marine'    , MAKEDATE(1970, 1), MAKEDATE(1970, 1),6,'', 4, 0, 0 ),
(0, '224323', true , 'Legualle'   , 'Philippe'  , MAKEDATE(1970, 1), MAKEDATE(1970, 1),6,'', 1, 3, 0 ),
(0, '224324', true , 'Legualle1'   , 'Philippe1'  , MAKEDATE(1970, 1), MAKEDATE(1970, 1),6,'', 1, 3, 0 ),
(0, '224325', true , 'Legualle2'   , 'Philippe2'  , MAKEDATE(1970, 1), MAKEDATE(1970, 1),6,'', 1, 3, 0 ),
(0, '224326', true , 'Legualle3'   , 'Philippe3'  , MAKEDATE(1970, 1), MAKEDATE(1970, 1),6,'', 1, 3, 0 );

commit;