  DROP PROCEDURE IF EXISTS GetInterventionBusinessId;

DELIMITER //
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
 DELIMITER ;
