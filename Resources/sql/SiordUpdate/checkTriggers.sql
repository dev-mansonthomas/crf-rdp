-- executer les requetes sql par pair (modification et check)
-- date création ne doit etre mise a jour qu'a l'insertion
-- date modification doit etre mise a jour a chaque modification des tables membres, membres_competences, membres_delegations, membres_infos
-- seul le membre modifié doit avoir sa date de modification mise à jour

-- TABLE MEMBRES

-- check insert
INSERT INTO `membres` ( `login`, `pwd`, `nom`, `prenom`, `droits`, `telephone`, `email`, `nivol`, `activation`, `sexe`, `droits_cadre`, `id_del_urgence`) VALUES ('jgallois2', 'c8acf19113c2323ab1974d5cbbb584b4', 'GALLOIS', 'Julien', 4, '0688452068', 'j.gallois@wanadoo.fr', '22675X', 'Y', 'M', 0, 0);
select id, login, date_creation, date_modification from membres where login = 'jgallois2';
-- check update
update membres set prenom ='juju'  where login='jgallois2' limit 1;
select id, login, date_creation, date_modification from membres where login = 'jgallois2';


-- TABLE MEMBRES_COMPETENCES

select id, login, date_creation, date_modification from membres where id=36;

-- check insert competences
insert into membres_competences (id_membre, id_role) values (36,99);
select id, login, date_creation, date_modification from membres where id=36;
-- check delete competences
delete from membres_competences where id_membre = 36 and id_role =99;
select id, login, date_creation, date_modification from membres where id=36;

-- TABLE MEMBRES_DELEGATIONS

select id, login, date_creation, date_modification from membres where id=36;
-- check insert delegations
insert into membres_delegations (id_membre, id_delegation) values (36,99);
select id, login, date_creation, date_modification from membres where id=36;
-- check delete delegations
delete from membres_delegations where id_membre = 36 and id_delegation =99;
select id, login, date_creation, date_modification from membres where id=36;



-- TABLE MEMBRES_INFOS
select id, login, date_creation, date_modification from membres where id=36;

INSERT INTO `membres_infos` ( `id_membre`, `photo`, `tourne_exterieur`, `accepte_email`, `secteur_dispo`, `limite_secteur`) VALUES ( 36, '1113647391.jpg', 1, 1, 99990001, 'non');
select id, login, date_creation, date_modification from membres where id=36;

DELETE from membres_infos where id_membre = 36 limit 1;
select id, login, date_creation, date_modification from membres where id=36;

update membres_infos set photo = 'toto.jpg' where id_membre=36 limit 1;
select id, login, date_creation, date_modification from membres where id=36;
