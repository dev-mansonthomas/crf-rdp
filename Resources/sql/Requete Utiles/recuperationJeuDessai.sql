mysqldump  -i -c  -u crfrdp -pCRFCRF crfrdp dispositif     > dispositif.sql
mysqldump  -i -c  -u crfrdp -pCRFCRF crfrdp dispositif_equipiers     > dispositif_equipiers.sql
mysqldump  -i -c  -u crfrdp -pCRFCRF crfrdp intervention     > intervention.sql

alter table dispositif auto_increment = 3;
alter table intervention auto_increment = 3;

update equipier e
set    id_dispositif = (select de.id_dispositif from dispositif_equipiers de where e.id_equipier = de.id_equipier);

