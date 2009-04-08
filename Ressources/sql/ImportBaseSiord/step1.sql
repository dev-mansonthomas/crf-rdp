alter table membres add column (status varchar(2) default 'ok', comment varchar(255));

update membres
set status = 'KO', comment='user disabled'
where login ='6474c6ade84b7bd4c56d9eeef5680287';

-- a vérifier si c'est bien excact
update membres 
set status = 'KO', comment='user disabled'
where length(pwd) <>32
and status ='ok';


update membres
set status = 'KO', comment='no nivol'
where nivol =''
and status = 'ok';

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