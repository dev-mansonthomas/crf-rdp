-- ouvrir une ligne de commande dans le répertoire courant,
-- mysql -u crfrdp crfrdp -p
-- tapper le password
-- tapper "source 00-executeAllScript.sql"
-- 
select "Creating database";
source 01-createDatabase.sql;
select "Creating stored procedure";
source 02-stored-Procedure.sql;
select "inserting initial data";
source 03-insert.sql;
select "inserting private data";
source 04-insert-private-data.sql;
select "inserting test data";
source 05-insert-test-data.sql;
select "End of import";