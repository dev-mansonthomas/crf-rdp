alter table membres add column (status varchar(2) default 'ok', comment varchar(255));

CREATE TABLE `equipier` (
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
  `id_role_equipier2`  int(10) unsigned  NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1  COLLATE=latin1_general_ci;


update membres
set status = 'KO', comment='user disabled'
where login ='6474c6ade84b7bd4c56d9eeef5680287';



update membres
set status = 'KO', comment=comment||' no nivol'
where nivol =''
and status = 'ok';

update membres
set status = 'KO', comment=concat(comment,' nivol incorrect')
where nivol in
(select nivol from (select nivol
from membres
where nivol not regexp '[0-9]{3,9}[[:alpha:]]?') temp);

update membres
set status = 'KO', comment='nivol incorrect'
where (nivol like 'XX%'
or nivol like  '-%'
or lower(nivol) like 'd%'
)
and status = 'ok';

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


pour le nivol : 
SELECT  UCASE(REPLACE(nivol, ' ', ''))
FROM siord2.membres m
where nivol regexp '[0-9]{3,9}[[:alpha:]]?'




insert into equipier (`id_equipier_siord`,
  `num_nivol`,
  `equipier_is_male`,
  `nom`,
  `prenom`, 
  `mobile`,
  `email`)
  select id,
       UCASE(REPLACE(nivol, ' ', '')),
       REPLACE(REPLACE(sexe, 'M', 1),'F', 0),
       concat(ucase(substring(nom, 1,1)),substring(lower(nom), 2)),
       lower(prenom),
       REPLACE(telephone, ' ',''),
       lower(email)
from membres
where status = 'OK';


update membres
set
telephone = replace (telephone, ' ', '');

update membres
set
telephone = replace (telephone, '.', '');

update membres
set
telephone = replace (telephone, '-', '');

