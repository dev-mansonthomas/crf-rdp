CREATE TABLE `lieu_delegation` (
  `id_delegation_siord`         int(10) unsigned NOT NULL,
  `id_lieu`                     int(10) unsigned NOT NULL auto_increment,
  `id_type_lieu`                int(10) unsigned default(3),
  `icon`                        VARCHAR(20) NULL,
  `icon_gmap_init`              VARCHAR(500) NULL,
  `nom`                         varchar(45) NOT NULL,
  `addresse`                    varchar(45) NOT NULL,
  `code_postal`                 varchar(5 ) NOT NULL,
  `ville`                       varchar(80) NOT NULL,
  `google_coords_lat`           float(10,6) NOT NULL,
  `google_coords_long`          float(10,6) NOT NULL,
  `info_complementaire`         varchar(1000) NULL,
  PRIMARY KEY (`id_lieu`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;



CREATE TABLE `delegation` (
  `id_delegation` int(10) unsigned NOT NULL auto_increment,
  `id_delegation_siord` int(10) unsigned NOT NULL,
  `nom`             varchar(45) NOT NULL,
  `departement`     varchar(8) NOT NULL,
  `telephone`       varchar(10) NULL,
  `mobile`          varchar(10) NULL,
  `mail`            varchar(255) NULL,
  `web`             varchar(255) NULL,
  `id_lieu`         int(10) unsigned NOT NULL,
  PRIMARY KEY  (`id_delegation`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1  COLLATE=latin1_general_ci;


alter table deleguations add column(
    status      varchar(2  ) default 'ok',
    comment     varchar(255),
    code_postal varchar(10 ),
    ville       varchar(50 ),
    address     varchar(255));

-- récupère la ville et le code posta
update deleguations d
set code_postal = (
    select cp from (
	    select id, substring(substring_index(adresse, '\r\n', 2),locate('\r\n', adresse)+2) as cp
	    from deleguations d1) temp
  where d.id = temp.id);

update deleguations d
set ville = (
    select ville from (
        select id, substring(adresse,locate('\r\n', adresse, locate('\r\n', adresse)+1)+2) as ville
        from deleguations d1) temp
  where d.id = temp.id);  
  
update deleguations d
set address = (
    select address from (
        select id, substring(adresse,1, locate('\r\n', adresse)-1) as address
        from deleguations d1) temp
        where d.id = temp.id);  
  

update deleguations
set status ='ko', comment='no address'
where code_postal = '';

update deleguations
set status ='ko', comment='is not a delegation local'
where deleguation like 'DD%'
or delelguation like '%groupement';


update deleguations
set
telephone = replace (telephone, ' ', '')
where status = 'OK';

update deleguations
set
telephone = replace (telephone, '.', '')
where status ='OK';

update deleguations
set
telephone = replace (telephone, '-', '')
where status ='OK';

update deleguations
set telephone = concat('0', trim(leading '+33' from telephone))
where status = 'OK'
and telephone like '+33%';


update deleguations
set telephone = concat('0', trim(leading '33' from telephone))
where status = 'OK'
and telephone like '33%';

update deleguations
set telephone = ''
where status = 'OK'
and length(telephone) > 10;






update deleguations
set
portable = replace (portable, ' ', '')
where status = 'OK';

update deleguations
set
portable= replace (portable, '.', '')
where status ='OK';

update deleguations
set
portable= replace (portable, '-', '')
where status ='OK';

update deleguations
set portable= concat('0', trim(leading '+33' from portable))
where status = 'OK'
and portable like '+33%';


update deleguations
set portable = concat('0', trim(leading '33' from portable))
where status = 'OK'
and portable like '33%';

update deleguations
set portable = ''
where status = 'OK'
and length(portable) > 10;

update deleguations
set portable= ''
where portable='0';


update deleguations 
set deleguation = 'Azay Le Rideau'
where id  = 161;


INSERT INTO `lieu_delegation`(
  `id_delegation_siord`         ,
  `icon`                        ,
  `icon_gmap_init`              ,
  `nom`                         ,
  `addresse`                    ,
  `code_postal`                 ,
  `ville`                       ,
  `google_coords_lat`           ,
  `google_coords_long`          ,
  `info_complementaire`       )  
SELECT id,null, null, deleguation, address, code_postal, ville, 0,0, null
from deleguations
where status = 'OK';

INSERT into `delegation`
(
  `id_delegation_siord`,
  `nom`             ,
  `departement`     ,
  `telephone`       ,
  `mobile`          ,
  `mail`            ,
  `web`             ,
  `id_lieu`         
)
select d.id, d.deleguation, d.code_postal, d.telephone, d.portable, d.email, d.site, ld.id_lieu
from deleguations d, lieu_delegation ld
where d.id = id_delegation_siord;