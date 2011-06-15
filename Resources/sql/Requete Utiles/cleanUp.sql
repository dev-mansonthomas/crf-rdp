-- Désaffecter tous les équipiers
update equipier set id_dispositif = 0;
delete from dispositif_equipiers;
delete from dispositif_equipiers_log;
