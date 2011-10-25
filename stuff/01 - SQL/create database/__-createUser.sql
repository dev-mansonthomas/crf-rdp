grant all    on crfrdp.* to 'crfrdp'@'localhost' identified by 'CRFCRF';
grant select on mysql.*  to 'crfrdp'@'localhost';

flush privileges;