alter table membres add column (status varchar(2) default 'ok', comment varchar(255));

CREATE TABLE `equipier` (
  `id_equipier`       int(10) unsigned NOT NULL auto_increment,
  `id_equipier_siord`       int(10) unsigned NOT NULL ,
  `num_nivol` varchar(16) NOT NULL,
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
  `num_nivol`,
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