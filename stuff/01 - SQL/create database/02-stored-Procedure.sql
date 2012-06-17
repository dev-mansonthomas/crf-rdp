DELIMITER //
DROP PROCEDURE IF EXISTS GetInterventionBusinessId//


 CREATE PROCEDURE GetInterventionBusinessId(
									IN  v_id_dispositif int,
									OUT o_BusinessId  	varchar(15)
								    )
   BEGIN
	DECLARE current_year VARCHAR(4);
	DECLARE v_type VARCHAR(4);
	
	SET current_year = DATE_FORMAT(NOW(), '%Y');
	
	SELECT 	dt.code_type
	INTO	v_type
	FROM   	dispositif 		d , 
			dispositif_type dt
	WHERE  	d.id_type_dispositif = dt.id_type
	AND		d.id_dispositif      = v_id_dispositif;

	SELECT 	MAX(1)
	INTO   	o_BusinessId
	FROM	 	intervention_id
	WHERE	type	= v_type
	AND		year like current_year;

	IF( o_BusinessId IS NULL ) THEN
		INSERT INTO intervention_id 
			(year, type, number)
		VALUES
			(current_year, v_type, 0);
	END IF;

	UPDATE 	intervention_id
	SET	  	number = number +1
	WHERE	type   = v_type
	AND		year   = current_year;

	SELECT 	CONCAT(current_year,'-',type,'-', LPAD(number,5,'0'))
	INTO 	o_BusinessId
	FROM 	intervention_id
	WHERE	type   = v_type
	AND		year   = current_year;

END //


 
 
 
 
 
 
 
DROP PROCEDURE IF EXISTS CleanUpImportedMembreData//


 CREATE PROCEDURE CleanUpImportedMembreData(IN v_id_synchro_siord int)
BEGIN
 
update siord_membres
set nivol = TRIM(LEADING '0' FROM nivol)
WHERE id_synchro_siord = v_id_synchro_siord;

update siord_membres
set nivol = replace (nivol, ' ', '')
where id_synchro_siord = v_id_synchro_siord;


update siord_membres
set telephone = replace (telephone, ' ', '')
where id_synchro_siord = v_id_synchro_siord;


update siord_membres
set telephone = replace (telephone, '.', '')
where id_synchro_siord = v_id_synchro_siord;

update siord_membres
set telephone = replace (telephone, '-', '')
where id_synchro_siord = v_id_synchro_siord;

update siord_membres
set telephone = concat('0', trim(leading '+33' from telephone))
where id_synchro_siord = v_id_synchro_siord
and telephone like '+33%';


update siord_membres
set telephone = concat('0', trim(leading '33' from telephone))
where id_synchro_siord = v_id_synchro_siord
and telephone like '33%';

update siord_membres
set telephone = ''
where id_synchro_siord = v_id_synchro_siord
and telephone not regexp '[0-9]{10}';


update siord_membres
set nivol = UCASE(REPLACE(nivol, ' ', ''))
where id_synchro_siord = v_id_synchro_siord;


update siord_membres 
set prenom = substring(prenom from 3) 
where prenom like 'as %';

update siord_membres 
set prenom = substring(prenom from 3) 
where prenom like ' - %'; 



update siord_membres
set nom = concat(ucase(substring(nom, 1,1)),substring(lower(nom), 2))
where id_synchro_siord = v_id_synchro_siord;

update siord_membres
set prenom = concat(ucase(substring(prenom, 1,1)),substring(lower(prenom), 2))
where id_synchro_siord = v_id_synchro_siord;

update siord_membres
set email = lower(email)
where id_synchro_siord = v_id_synchro_siord;

END //
DELIMITER ;
