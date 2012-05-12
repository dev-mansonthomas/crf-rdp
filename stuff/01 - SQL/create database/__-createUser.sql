grant all    on crfrdp.* to 'crfrdp'@'localhost' identified by 'CRFCRF';
grant all    on siord.*  to 'siord' @'localhost' identified by 'siord' ;
grant select on mysql.*  to 'crfrdp'@'localhost';

CREATE DATABASE `siord` DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

flush privileges;