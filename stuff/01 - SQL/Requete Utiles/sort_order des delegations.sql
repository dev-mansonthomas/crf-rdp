
-- par défaut on met le sort_order au code postal
update delegation 
set    sort_order = cast( departement as unsigned)
where id_delegation >0;



-- pour celle qu'on veut voir après paris et département limitrophe on refait le truc a préfixant par 1 (pour faire fois 10)
update delegation 
set    sort_order = cast( concat("1",departement) as unsigned)
where departement not like '75%'
AND   departement not like '92%'
AND   departement not like '93%'
AND   departement not like '94%'
AND   id_delegation >0;

select * from delegation order by sort_order ASC;