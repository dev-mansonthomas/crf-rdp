-- ouvrir une ligne de commande dans le répertoire courant,
-- mysql -u crfrdp crfrdp -p
-- tapper le password
-- tapper "source 00-executeAllScript.sql"
-- 
select "Creating database";
source 01-createDatabase.sql;
select "inserting initial data";
source 02-insert.sql;
select "inserting private data";
source 03-insert-private-data.sql;
select "inserting test data";
-- source 04-insert-test-data.sql;
select "End of import";