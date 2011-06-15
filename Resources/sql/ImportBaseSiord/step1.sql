alter table membres add column (status varchar(2) default 'ok', comment varchar(255));

CREATE TABLE `equipier` (
  `id_equipier`       int(10) unsigned NOT NULL auto_increment,
  `id_equipier_siord`       int(10) unsigned NOT NULL ,
  `nivol` varchar(16) NOT NULL,
  `equipier_is_male` boolean NOT NULL,
  `nom` varchar(45) NOT NULL,
  `prenom` varchar(45) NOT NULL, 
  `mobile` varchar(15) NOT NULL,
  `email` varchar(255) NOT NULL,
  `id_delegation` int(10) unsigned  NULL,
  `autre_delegation` varchar(45)  NULL,
  `id_role_equipier1`  int(10) unsigned  NULL,
  `id_role_equipier2`  int(10) unsigned  NULL,
  PRIMARY KEY (`id_equipier`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1  COLLATE=latin1_general_ci;

CREATE TABLE `equipier_roles` (
  `id_equipier`      int(10) unsigned NOT NULL,
  `id_role_equipier` int(10) unsigned NOT NULL,
  `en_evaluation`    boolean          NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1  COLLATE=latin1_general_ci;

update membres
set status = 'KO', comment='user disabled'
where droits =999;


update membres
set status = 'KO', comment=' no nivol'
where nivol =''
and status = 'ok';

-- enleve les leading 0
update membres
set nivol = TRIM(LEADING '0' FROM nivol)
where status = 'OK';

update membres
set status = 'KO', comment=concat(comment,' nivol incorrect')
where nivol in
(select nivol from (select nivol
from membres
where nivol not regexp '[0-9]{3,9}[[:alpha:]]?') temp);


update membres
set status = 'KO', comment='nivol en double'
where status = 'ok'
and nivol in(
    select * -- on peut pas mettre la table sur laquelle on fait l'update directement dans le from, il faut passer par une table temporaire
    from (
		select nivol
		from membres
		where status ='OK'
		group by nivol
		having count(1)>1
	) tmp
);







update membres
set
telephone = replace (telephone, ' ', '')
where status = 'OK';

update membres
set
telephone = replace (telephone, '.', '')
where status ='OK';

update membres
set
telephone = replace (telephone, '-', '')
where status ='OK';

update membres
set telephone = concat('0', trim(leading '+33' from telephone))
where status = 'OK'
and telephone like '+33%';


update membres
set telephone = concat('0', trim(leading '33' from telephone))
where status = 'OK'
and telephone like '33%';

update membres
set telephone = ''
where status = 'OK'
and length(telephone) > 10;


update membres
set nivol = UCASE(REPLACE(nivol, ' ', ''))
where status = 'ok';

update membres
set sexe = REPLACE(REPLACE(sexe, 'M', 1),'F', 0)
where status = 'ok';

update membres
set nom = concat(ucase(substring(nom, 1,1)),substring(lower(nom), 2))
where status = 'ok';

update membres
set prenom = concat(ucase(substring(prenom, 1,1)),substring(lower(prenom), 2))
where status = 'ok';

update membres
set email = lower(email)
where status = 'ok';




insert into equipier (`id_equipier_siord`,
  `nivol`,
  `equipier_is_male`,
  `nom`,
  `prenom`,
  `mobile`,
  `email`)
  select id,
       nivol,
       sexe,
       nom,
       prenom,
       telephone,
       email
from membres
where status = 'OK';



/*

    53->AFCPSAM - PSE 1                         ok
    33->AFPS                                    ok
38->Aide Régulateur
36->Assistant Formation
1 ->Bénévole
50->BNSSA
41->Cadre Local
39->CDO
40->CDP
    3 ->CFAPSE - PSE 2                          ok
63->Chef d'Equipe Solidarité
    54->Chef d'Inter CS                         ok
    45->Chef d'Inter Réseau                     ok
    2 ->Chef d'Intervention                     ok
    61->Chef de dispositif                      ok
    62->Chef de poste                           ok
    60->Chef de section                         ok
43->Communication
    4 ->Conducteur ASM                          ok
    19->Conducteur VL                           ok
49->DDUS
22->DLUS
27->DLUS Adj ADM
26->DLUS Adj AE
23->DLUS Adj FOR
25->DLUS Adj MOT
24->DLUS Adj MS
52->EDIR
21->Elu
64->ESE
    35->Eval Chauffeur
    34->Eval CI
57->Formateur PSE
66->Infirmier
31->Initiateur
55->Instructeur
42->Jeunesse
51->Logisticien Adm &amp; Tech
32->MNPS
56->MORAD
37->Opérateur Radio
59->Pilote cotier
58->Pilote fluviale
20->Président
46->Régulateur
29->Resp. DPS
44->Resp. Groupement
30->Resp. Local Action Sociale
28->Resp. Routier
   
 * */
insert into equipier_roles  (`id_equipier`,`id_role_equipier`,`en_evaluation`)
SELECT distinct e.id_equipier,case mc.id_role
when 61 then 01
when 62 then 02
when 60 then 03
when 2  then 04
when 45 then 05
when 54 then 06
when 4  then 07
when 5  then 08
when 3  then 09
when 53 then 10
when 33 then 11
else 0 end as role, false as `en_evaluation`
FROM equipier e, membres_competences mc
where e.id_equipier_siord = mc.id_membre
order by e.id_equipier asc;

delete from equipier_roles
where id_role_equipier = 0;

