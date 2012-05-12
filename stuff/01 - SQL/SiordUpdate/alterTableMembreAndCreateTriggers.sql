delimiter //

ALTER TABLE membres
ADD COLUMN(
 date_creation      datetime not null default '1970-01-01 01:00:00',
 date_modification  datetime not null default '1970-01-01 01:00:00'
)//



DROP TRIGGER IF EXISTS membresOnInsert //


CREATE TRIGGER membresOnInsert BEFORE INSERT ON membres
FOR EACH ROW
BEGIN

  SET NEW.date_modification  = NOW() ;
  SET NEW.date_creation      = NOW() ;

END
//

drop trigger if exists membresUpdateDateModif//


CREATE TRIGGER membresUpdateDateModif BEFORE UPDATE ON membres
FOR EACH ROW
BEGIN

 SET NEW.date_modification  = NOW();
 
END
//


drop trigger if exists membresCompetencesUpdateDateModifOnInsert//

CREATE TRIGGER membresCompetencesUpdateDateModifOnInsert BEFORE INSERT ON membres_competences
FOR EACH ROW
BEGIN

  update membres set date_modification = NOW() where id = NEW.id_membre;
  
END
//

drop trigger if exists membresCompetencesUpdateDateModifOnUpdate//

CREATE TRIGGER membresCompetencesUpdateDateModifOnUpdate BEFORE UPDATE ON membres_competences
FOR EACH ROW
BEGIN

  update membres set date_modification = NOW() where id = NEW.id_membre;
  
END
//

drop trigger if exists membresCompetencesUpdateDateModifOnDelete//

CREATE TRIGGER membresCompetencesUpdateDateModifOnDelete BEFORE DELETE ON membres_competences
FOR EACH ROW
BEGIN

  update membres set date_modification = NOW() where id = OLD.id_membre;
  
END
//


drop trigger if exists membresDelegationsUpdateDateModifOnInsert//


CREATE TRIGGER membresDelegationsUpdateDateModifOnInsert BEFORE INSERT ON membres_delegations
FOR EACH ROW
BEGIN

  update membres set date_modification = NOW() where id = NEW.id_membre;
  
END
//

drop trigger if exists membresDelegationsUpdateDateModifOnUpdate//

CREATE TRIGGER membresDelegationsUpdateDateModifOnUpdate BEFORE UPDATE ON membres_delegations
FOR EACH ROW
BEGIN

  update membres set date_modification = NOW() where id = NEW.id_membre;
  
END
//

drop trigger if exists membresDelegationsUpdateDateModifOnDelete//

CREATE TRIGGER membresDelegationsUpdateDateModifOnDelete BEFORE DELETE ON membres_delegations
FOR EACH ROW
BEGIN

  update membres set date_modification = NOW() where id = OLD.id_membre;
  
END
//


drop trigger if exists membresInfosUpdateDateModifOnInsert//


CREATE TRIGGER membresInfosUpdateDateModifOnInsert BEFORE INSERT ON membres_infos
FOR EACH ROW
BEGIN

  update membres set date_modification = NOW() where id = NEW.id_membre;
  
END
//

drop trigger if exists membresInfosUpdateDateModifOnUpdate//

CREATE TRIGGER membresInfosUpdateDateModifOnUpdate BEFORE UPDATE ON membres_infos
FOR EACH ROW
BEGIN

  update membres set date_modification = NOW() where id = NEW.id_membre;
  
END
//

drop trigger if exists membresInfosUpdateDateModifOnDelete//

CREATE TRIGGER membresInfosUpdateDateModifOnDelete BEFORE DELETE ON membres_infos
FOR EACH ROW
BEGIN

  update membres set date_modification = NOW() where id = OLD.id_membre;
  
END
//