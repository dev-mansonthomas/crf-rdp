﻿use crfrdp;

INSERT INTO `crfrdp`.`vehicule_type` (`label`) VALUES ('VPSP');
INSERT INTO `crfrdp`.`vehicule_type` (`label`) VALUES ('VL');
INSERT INTO `crfrdp`.`vehicule_type` (`label`) VALUES ('Bateau');
INSERT INTO `crfrdp`.`vehicule_type` (`label`) VALUES ('N/A');
UPDATE `vehicule_type` SET `id_vehicule_type` = 0 WHERE `id_vehicule_type` = 4;
ALTER TABLE `vehicule_type` AUTO_INCREMENT = 4;


-- type de lieux
INSERT INTO `lieu_type` (`id_type_lieu`,`num_ordre`,`label_type_lieu`,`icon_class_lieu`, `icon_lieu`,`icon_gmap_init`) VALUES
 (1,1,'Hopital'                        ,'hopitalIcon'         ,'gmap/hopital.png'          ,'icon=new GIcon();\r\nicon.image=contextPath+\"/img/gmap/hopital.png\";\r\nicon.shadow=contextPath+\"/img/gmap/hopital-s.png\";\r\nicon.iconSize=new GSize(24.0, 24.0);\r\nicon.shadowSize=new GSize(37.0, 24.0);\r\nicon.iconAnchor=new GPoint(12.0, 12.0);\r\nicon.infoWindowAnchor=new GPoint(12.0, 12.0);'),
 (2,2,'Centre de Secours des Pompiers' ,'pompierIcon'         ,'gmap/pompier.png'          ,'icon=new GIcon();\r\nicon.image=contextPath+\"/img/gmap/pompier.png\";\r\nicon.shadow=contextPath+\"/img/gmap/pompier-s.png\";\r\nicon.iconSize=new GSize(28.0, 30.0);\r\nicon.shadowSize=new GSize(44.0, 30.0);\r\nicon.iconAnchor=new GPoint(14.0, 15.0);\r\nicon.infoWindowAnchor=new GPoint(14.0, 15.0);'),
 (3,3,'CRF - Base locale'              ,'localCroixRougeIcon' ,'gmap/local-croix-rouge.png','icon=new GIcon();\r\nicon.image=contextPath+\"/img/gmap/local-croix-rouge.png\";\r\nicon.shadow=contextPath+\"/img/gmap/local-croix-rouge-s.png\";\r\nicon.iconSize=new GSize(32.0, 32.0);\r\nicon.shadowSize=new GSize(49.0, 32.0);\r\nicon.iconAnchor=new GPoint(16.0, 32.0);\r\nicon.infoWindowAnchor=new GPoint(16.0, 0.0);\r\n'),
 (4,4,'Station Service H24'            ,'stationserviceIcon'  ,'gmap/stationservice.png'   ,'icon=new GIcon();\r\nicon.image=contextPath+\"/img/gmap/stationservice.png\";\r\nicon.shadow=contextPath+\"/img/gmap/stationservice-s.png\";\r\nicon.iconSize=new GSize(25.0, 28.0);\r\nicon.shadowSize=new GSize(40.0, 28.0);\r\nicon.iconAnchor=new GPoint(12.0, 14.0);\r\nicon.infoWindowAnchor=new GPoint(12.0, 14.0);'),
 (5,5,'Boulangerie/Fast Food/Resto H24','restoIcon'           ,'gmap/resto.png'            ,'icon=new GIcon();\r\nicon.image=contextPath+\"/img/gmap/resto.png\";\r\nicon.shadow=contextPath+\"/img/gmap/resto-s.png\";\r\nicon.iconSize=new GSize(28.0, 28.0);\r\nicon.shadowSize=new GSize(43.0, 28.0);\r\nicon.iconAnchor=new GPoint(14.0, 14.0);\r\nicon.infoWindowAnchor=new GPoint(14.0, 14.0);'),
 (6,6,'Pharmacie H24'                  ,'pharmacieIcon'       ,'gmap/pharmacie.png'        ,'icon=new GIcon();\r\nicon.image=contextPath+\"/img/gmap/pharmacie.png\";\r\nicon.shadow=contextPath+\"/img/gmap/pharmacie-s.png\";\r\nicon.iconSize=new GSize(28.0, 28.0);\r\nicon.shadowSize=new GSize(43.0, 28.0);\r\nicon.iconAnchor=new GPoint(14.0, 14.0);\r\nicon.infoWindowAnchor=new GPoint(14.0, 14.0);'),
 (7,7,'Police'                         ,'policeIcon'          ,'gmap/police.png'           ,'icon=new GIcon();\r\nicon.image=contextPath+\"/img/gmap/police.png\";\r\nicon.shadow=contextPath+\"/img/gmap/police-s.png\";\r\nicon.iconSize=new GSize(26.0, 26.0);\r\nicon.shadowSize=new GSize(40.0, 26.0);\r\nicon.iconAnchor=new GPoint(13.0, 13.0);\r\nicon.infoWindowAnchor=new GPoint(13.0, 13.0);'),
 (8,8,'Intervention'                   ,'interventionIcon'    ,'gmap/intervention.png'     ,'icon=new GIcon();\r\nicon.image=contextPath+\"/img/gmap/intervention.png\";\r\nicon.shadow=contextPath+\"/img/gmap/intervention-s.png\";\r\nicon.iconSize=new GSize(16.0, 16.0);\r\nicon.shadowSize=new GSize(25.0, 16.0);\r\nicon.iconAnchor=new GPoint(8.0, 8.0);\r\nicon.infoWindowAnchor=new GPoint(8.0, 8.0);'),
 (9,9,'Ambulance'                      ,'ambulanceIcon'       ,'gmap/ambulance.png'        ,'icon=new GIcon();\r\nicon.image=contextPath+\"/img/gmap/ambulance.png\";\r\nicon.shadow=contextPath+\"/img/gmap/ambulance-s.png\";\r\nicon.iconSize=new GSize(24.0, 24.0);\r\nicon.shadowSize=new GSize(37.0, 24.0);\r\nicon.iconAnchor=new GPoint(12.0, 12.0);\r\nicon.infoWindowAnchor=new GPoint(12.0, 12.0);'),
 (10,0,'Sans Catégorie'                ,'N/A'                 ,'N/A'                       ,'');

UPDATE `lieu_type` SET `id_type_lieu` = 0 WHERE `id_type_lieu` = 10;
ALTER TABLE `lieu_type` AUTO_INCREMENT = 10;

INSERT INTO `lieu` 
  (`id_type_lieu`, `icon`, `icon_gmap_init`, `nom`, `addresse`, `code_postal`, `ville`, `google_coords_lat`, `google_coords_long`, `telephone`, `url`, `mail`, `info_complementaire`, `actif`) 
VALUES 
(3,NULL,NULL,'VANVES - MALAKOFF','1 ter, rue Aristide Briand','92170','VANVES',48.818344,2.288632,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'CHATILLON','Espace Maison Blanche - Avenue Saint-Exupéry','92320','CHATILLON',48.808525,2.298351,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'MONTROUGE','45, Ave Verdier','92120','MONTROUGE',48.815918,2.315369,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'BAGNEUX','28, Avenue Paul Vaillant Couturier','92220','BAGNEUX',48.792732,2.315641,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'ANTONY','49, avenue Leon Jouhaux','92160','ANTONY',48.735126,2.307780,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'BOURG-LA-REINE','17, avenue de Montrouge','92340','Bourg-la-Reine',48.788593,2.313128,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'CHÂTENAY-MALABRY','35, Rue Jean Longuet - BP23','92292','CHATENAY-MALABRY',48.766136,2.260752,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'FONTENAY-AUX-ROSES','27 ter, Ave du Gal Leclerc','92260','FONTENAY-AUX-ROSES',48.789478,2.285714,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'SCEAUX','12, Rue Marguerite Renaudin','92330','SCEAUX',48.776516,2.291832,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'ISSY-LES-MOULINEAUX','14 bis, Rue du Chevalier de la Barre','92130','ISSY-LES-MOULINEAUX',48.821819,2.280550,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'ASNIERES','8, rue Armand Numes','92600','Asnières Sur Seine',48.915722,2.305420,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'BOIS-COLOMBES','3, Ave Villebois Mareuil','92270','BOIS-COLOMBES',48.916870,2.266510,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'BOULOGNE','11, Rue de Clamart','92100','BOULOGNE',48.830898,2.243632,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'CHAVILLE','1, rue du Gros Chêne','92370','CHAVILLE',48.809410,2.195139,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'CLAMART','183, rue de la Porte de Trivaux','92140','CLAMART',48.785828,2.242046,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'CLICHY','39, Rue du Landy','92110','CLICHY',48.905750,2.307463,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'COLOMBES','32, Bvd des Oiseaux ','92700','COLOMBES',48.925758,2.256278,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'COURBEVOIE','45, rue des Minimes','92400','COURBEVOIE',48.905666,2.261970,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'GARCHES','7, rue des Suisses','92380','GARCHES',48.853607,2.196660,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'GENNEVILLIERS','64, Ave Jean-Jaurès','92230','GENNEVILLIERS',48.926907,2.294509,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'LA GARENNE-COLOMBES','68, Rue des Champs Philippe','92250','LA GARENNE-COLOMBES',48.905586,2.236117,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'MEUDON','4, Ave Louvois','92190','MEUDON',48.807995,2.240610,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'NANTERRE','131, Avenue Hoche','92000','NANTERRE',48.903160,2.195415,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'NEUILLY/LEVALLOIS','23, Rue du Château / Neuilly','92200','NEUILLY/LEVALLOIS',48.885368,2.260809,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'PUTEAUX','Rue Chantecoq','92800','PUTEAUX',48.886044,2.237341,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'RUEIL-MALMAISON','20, Rue Michelet','92500','RUEIL-MALMAISON',48.885330,2.176405,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'SAINT-CLOUD','32, Rue du 18 Juin 1940','92210','SAINT-CLOUD',48.847263,2.222898,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'SEVRES/VILLE D AVRAY','99, Grande Rue','92310','SEVRES',48.822479,2.206979,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'SURESNES','20, Rue Merlin de Thionville','92150','SURESNES',48.869911,2.223552,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'VAUCRESSON','15, Allée des Grandes Fermes','92420','VAUCRESSON',48.842640,2.167995,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'PARIS - XIV','7, RUE CHARLES DIVRY','75014','Paris',48.833244,2.326984,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'PARIS - XV','41, RUE DES PERICHAUX','75015','Paris',48.830753,2.296884,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'PARIS - XIII','6, PLACE D\'ITALIE','75013','Paris',48.831852,2.354471,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'PARIS - XII','2, RUE ELISA LEMMONIER','75012','Paris',48.840061,2.390195,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'PARIS - XI','12, RUE AUGUSTE LAURENT','75011','Paris',48.857525,2.382017,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'PARIS - X','14, RUE CAFARELLI','75003','PARIS',48.863857,2.362185,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'PARIS - IX','14, RUE PIERRE SEMARD','75009','PARIS',48.877743,2.347170,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'PARIS - VIII','17, RUE DE MOSCOU','75008','Paris',48.880859,2.324323,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'PARIS - VII','51, RUE DE BABYLONE','75007','Paris',48.851746,2.317787,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'PARIS - VI','1, RUE BLAISE DESGOFFE','75006','Paris',48.846172,2.324256,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'PARIS - V','9, RUE LAPLACE','75005','Paris',48.847271,2.347555,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'PARIS - IV','36, rue Geoffroy l\'Asnier','75004','PARIS',48.855446,2.357238,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'PARIS - I','1, RUE D\'ABOUKIR','75002','Paris ',48.865887,2.341524,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'PARIS - XVI','68, RUE DE PASSY','75016','Paris',48.857983,2.277350,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'PARIS - XVII','2, rue Claude Pouillet','75017','Paris',48.883347,2.315671,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'PARIS - XVIII','16, PLACE DES ABBESSES','75018','Paris',48.884308,2.338751,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'PARIS - XIX','10, AVENUE MODERNE','75019','Paris',48.883671,2.382283,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'PARIS - XX','66, RUE DES COURONNES','75020','Paris',48.870586,2.388240,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'Le Vésinet','1, rue Alexandre Dumas','78110','Le Vésinet',48.897640,2.122972,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'St Quentin en Yvelines','rue du Moulin Renard','78280','Guyancourt',48.777203,2.079641,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'Poissy','14, Rue Gérard Bongard','78300','Poissy',48.935589,2.050221,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'St Germain en Laye','6, rue Jean Baptiste Lulli','78100','St Germain en Laye',48.895645,2.068748,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'Sartrouville','25, rue Faidherbe','78500','Sartrouville',48.932838,2.161658,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'Versailles','17, rue Berthier','78000','Versailles',48.811504,2.128383,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'Viroflay','185, bis av Gal Leclerc','78220','Viroflay',48.801785,2.169188,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'Houilles','88, rue Diderot','78800','Houilles',48.927391,2.173538,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'CLAYE','5, PLACE CUSINO','77290','MITRY MORY',48.955002,2.603423,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'LAGNY','2, avenue du général Leclerc','77400','Lagny',48.876789,2.700904,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'MELUN','37, rue des mezereaux','77000','MELUN',48.549229,2.671592,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'ALFORTVILLE - MAISONS-ALFORT','17, rue de mercure','94700','Maisons-Alfort',48.809582,2.456842,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'ARCUEIL - CACHAN','23, rue Guichard','94230','Cachan',48.794216,2.337068,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'BONNEUIL SUR MARNE','6, rue du Chemin Vert','94380','Bonneuil sur Marne',48.771423,2.484262,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'BRY SUR MARNE','44, bd Galliéni','94360','Bry sur Marne',48.843719,2.523947,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'CHAMPIGNY SUR MARNE','7, square Georges Pitoëff','94500','Champigny sur Marne',48.825916,2.511181,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'CHARENTON - SAINT MAURICE','91, rue du petit chateau','94220','charenton',48.827202,2.402303,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'CHENNEVIÈRES SUR MARNE','Le Fort 140 bis rue Aristide Briand','94430','Chennevières sur Marne',48.799118,2.533661,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'CHOISY - THIAIS - CHEVILLY','27 Bd des Alliées','94600','Choisy le Roi',48.766319,2.404131,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'CRÉTEIL','60, rue de Falkirk','94000','Créteil',48.771481,2.460324,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'FONTENAY SOUS BOIS','11, rue Michelet','94120','Fontenay sous Bois',48.852699,2.474035,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'IVRY SUR SEINE','40, rue Jean Jacques Rousseau','94200','Ivry sur Seine',48.817715,2.394241,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'JOINVILLE LE PONT','20, rue de Paris','94340','Joinville le Pont',48.818611,2.465755,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'L HAY LES ROSES','2, allée du Stade','94240','L\'Hay les Roses',48.775135,2.343631,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'GENTILLY - KREMLIN-BICÊTRE - VILLEJUIF','55, rue de Verdun','94800','Villejuif',48.793400,2.354035,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'LE PERREUX SUR MARNE','34, av Georges Clémenceau','94170','Le Perreux sur Marne',48.838375,2.506264,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'NOGENT SUR MARNE','6, square Tino Rossi','94130','Nogent sur Marne',48.831657,2.489311,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'LA QUEUE EN BRIE - ORMESSON-NOISEAU','19, rue d\'Aguesseau','94490','Ormesson sur Marne',48.784824,2.535631,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'FRESNES - RUNGIS','2, rue de la Pirouette','94150','Rungis',48.749264,2.349735,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'SAINT MAUR DES FOSSÉS','2, logis de la Pie','94100','Saint Maur des Fossés',48.798042,2.480086,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'SUCY EN BRIE','52, route de la Queue en Brie','94370','Sucy en Brie',48.758530,2.529749,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'ABLON - ORLY - VILLENEUVE LE ROI','41, rue du Maréchal Maunoury','94290','Villeneuve le Roi',48.729027,2.410433,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'VILLENEUVE SAINT GEORGES - VALENTON','C. Commercial Sellier - rue Henri Sellier','94190','Villeneuve St Georges',48.752842,2.447016,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'VILLIERS SUR MARNE','12, rue Marthe Debaize','94350','Villiers sur Marne',48.827950,2.543167,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'VINCENNES','25, rue de Lagny ','94300','Vincennes',48.849018,2.423558,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'VITRY SUR SEINE','138, rue Malleret de Joinville BP74','94403','Vitry sur Seine',48.789444,2.389323,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'ARGENTEUIL','2, Rue Paul Vaillant Couturier','95104','ARGENTEUIL CEDEX',48.946651,2.254751,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'BEAUMONT SUR OISE','2, Avenue Anatole France','95260','BEAUMONT SUR OISE',49.141617,2.283692,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'BORDS DE SEINE','20, Rue Pierre Brossolette - BP 26','95240','CORMEILLES EN PARISIS',48.974934,2.202152,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'DEUIL','12, rue bourgeois ','95170','DEUIL LA BARRE',48.976719,2.327439,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'DOMONT','Rue de l\'église BP 18','95330','DOMONT',49.033211,2.319563,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'ENGHIEN','6, Rue de la Barre','95880','ENGHIEN',48.963287,2.311886,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'PARISIS','9, rue d\'Ermont','95130','FRANCONVILLE',48.983849,2.233329,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'VALLEE DE L OURCQ','Rue d\'Orgemont BP 73','95500','GONESSE',48.984940,2.456858,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'BERGES DE L OISE','41, Rue de Villiers Adam','95290','L\'ISLE ADAM',49.107552,2.220778,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'LUZARCHES','1, Rue du Moanda','95270','LUZARCHES',49.117207,2.421653,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'MONTMORENCY','2, rue Corneilles','95160','MONTMORENCY',48.990314,2.318877,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'PORTES DU VEXIN','2, rue Claude Debussy','95300','PONTOISE',49.056519,2.096902,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'SAINT GRATIEN','33, rue des Raguenets','95210','ST GRATIEN',48.960625,2.287199,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'SAINT BRICE','85, Rue de Paris','95350','St BRICE SOUS FORET',49.001255,2.355178,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'SARCELLES','12, Allée Bernard Palissy','95200','SARCELLES',48.976196,2.384058,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'PORTES DE FRANCE','30, Avenue Henri Barbusse','95471','FOSSES',49.097363,2.518541,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'BOIS DE LA PLAINE','Domaine du Tertre - 42 rue Auguste Godard','95150','TAVERNY',49.030781,2.225485,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'VEXIN FRANÇAIS','Salle du grand pré','95640','MARINES',49.144878,1.982632,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'LES MUREAUX','23, rue Carnot','78130','Les Mureaux',48.992905,1.909715,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'CHALLANS','8, rue de la Poctière','85300','Challans',46.845020,-1.867954,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'FONTENAY LE COMTE','4, rue du Chatêau','85200','fontenay le Comte',46.468571,-0.804127,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'LA ROCHE SUR YON','159, Boulevard Edouard Branly','85000','La Roche sur Yon',46.680424,-1.440548,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'LES SABLES D\'OLONNE','Centre Hospitalier - 44 Bd Pasteur','85119','Les Sables d\'Olonne',46.491936,-1.770023,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'LUÇON','11, Rue de l\'Hôpital','85400','Luçon',46.451668,-1.168896,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'LES HERBIERS','86, Rue Nationale ','85500','Les Herbiers',46.868610,-1.001408,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'AMBOISE-CHÂTEAU RENAULT','1, Rue GERMAIN CHAUVEAU','37400','AMBOISE',47.421494,0.983572,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'Azay Le Rideau','10, Rue du COMMERCE','37510','BALLAN MIRE',47.340252,0.614062,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'EST TOURANGEAU - BLERE - VOUVRILLON','13, Rue P. L. COURIER','37150','BLERE',47.327377,0.989693,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'BOURGUEIL','BP 29','37140','BOURGUEIL',47.281631,0.168915,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'CHINON STE MAURE','16, Rue PAUL HUET','37500','CHINON',47.166763,0.253920,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'LOCHES - MONTRESOR','14, Rue DU DOCTEUR MARTINAIS','37600','LOCHES',47.129124,1.004836,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'HAUTE TOURAINE','15, Rue SAINT PIERRE','37290','PREUILLY SUR CLAISE',46.854321,0.930962,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'TOURS PLUS','25, Rue BRETONNEAU','37000','TOURS',47.395180,0.680363,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'4 GARES','121, rue de Saint-Gratien','95120','ERMONT',48.978271,2.263703,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'COTEAUX','2, rue Corneilles','95160','MONTMORENCY',48.990314,2.318877,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'PIERRE TURQUAISE','2, RUE ANATOLE FRANCE','95260','BEAUMONT SUR OISE',49.141617,2.283692,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'PLAINE DE FRANCE','BP 30018','95331','DOMONT CEDEX',0.000000,0.000000,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'VAL DE FRANCE','12, Allée Bernard PALISSY','95200','SARCELLES',48.976196,2.384058,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'ORLÉANS','69, bis rue des Anguignis','45650','St Jean Le Blanc',47.882683,1.912490,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'MONTARGIS','105, rue COQUILLET','45200','MONTARGIS',47.988293,2.732519,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'GIEN','1, rue Marius RAIMBAULT','45500','GIEN',47.693001,2.632728,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'CORBEIL ESSONNES','100, Boulevard DE FONTAINEBLEAU','91100','CORBEIL ESSONNES',48.594765,2.475945,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'VAL D YERRES','BP 116','91331','YERRES CEDEX',0.000000,0.000000,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'LA FERTE ALAIS','BP 08','91760','ITTEVILLE',48.509933,2.343810,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'LA PYRAMIDE','9, Rue Camille Flammarion BP 22','91265','JUVISY SUR ORGE CEDEX',0.000000,0.000000,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'VIRY CHATILLON','9, Avenue DU BELLAY','91170','VIRY CHATILLON',48.674290,2.365624,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'DEUX RIVIERES','2, Rue du Dauphiné','91300','MASSY',48.736523,2.297925,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'VALLEES BIEVRE YVETTE','7, Place de la victoire','91120','PALAISEAU',48.712269,2.243031,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'VAL D ORGE','76, Rue DE LIERS','91240','ST MICHEL SUR ORGE',48.634216,2.315445,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'ARPAJONNAIS','2, Boulevard EUGENE LAGAUCHE','91180','ST GERMAIN LES ARPAJON',48.592724,2.252950,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'DEUX TOURS','35, Rue EDOUARD DANAUX','91220','BRETIGNY SUR ORGE',48.603104,2.285696,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'DRAVEIL','84, Boulevard HENRI BARBUSSE','91210','DRAVEIL',48.701466,2.424487,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'ETAMPES','142, Rue SAINT JACQUES','91150','ETAMPES',48.432339,2.152865,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'LIMOURS','Rue du Saut du Loup BP 15','91470','LIMOURS',48.645794,2.077105,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'MILLY-MAISSE','41, Rue LANGLOIS','91490','MILLY LA FORET',48.403309,2.469281,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'SAINT CHERON','47 A, Route D\'ARPAJON','91650','BREUILLET',48.570698,2.179562,NULL,NULL,NULL,NULL,1), 
(3,NULL,NULL,'EVRY CENTRE ESSONNE ','7, Rue ALPHONSE DAUDET','91000','EVRY',48.627964,2.449751,NULL,NULL,NULL,NULL,1), 
(2,NULL,NULL,'Rousseau','21, rue du Jour','75001','Paris',48.863880,2.344957,NULL,NULL,NULL,NULL,1), 
(2,NULL,NULL,'Sévigné','7, rue Sévigné','75004','Paris',48.855671,2.362153,NULL,NULL,NULL,NULL,1), 
(2,NULL,NULL,'Dauphine','2, rue François Millet','75016','Paris',48.850437,2.273220,NULL,NULL,NULL,NULL,1), 
(2,NULL,NULL,'Montmartre','12, rue Carpeaux','75018','Paris',48.891346,2.332324,NULL,NULL,NULL,NULL,1), 
(4,NULL,NULL,'Station Total Victor Hugo','183, avenue Victor Hugo','75016','Paris',48.865891,2.276386,NULL,NULL,NULL,NULL,1), 
(5,NULL,NULL,'Le Pied de Cochon','6, rue Coquillière','75001','Paris',48.863377,2.343667,NULL,NULL,NULL,NULL,1), 
(6,NULL,NULL,'Pharmacie Les Champs','84, avenue des Champs-Elysées','75008','Paris',48.871059,2.303572,NULL,NULL,NULL,NULL,1), 
(6,NULL,NULL,'Pharmacie Européenne','6, place Clichy','75009','Paris',48.883270,2.327567,NULL,NULL,NULL,NULL,1), 
(6,NULL,NULL,'Grande Pharmacie Daumesnil','6, place Félix Eboué','75012','Paris',48.839417,2.395632,NULL,NULL,NULL,NULL,1), 
(7,NULL,NULL,'Commissariat Central, 20eme','48, avenue Gambetta','75020','Paris',48.865780,2.399250,NULL,NULL,NULL,NULL,1), 
(7,NULL,NULL,'Commissariat Central, 19eme','3, rue Erik Satie','75019','Paris',48.884247,2.386270,NULL,NULL,NULL,'S.A.R.I.J Service Accueil Recherche Investigation Judiciaire',1), 
(7,NULL,NULL,'Commissariat Central, 15eme','250 rue Vaugirard','75015','Paris',48.839832,2.302275,NULL,NULL,NULL,'U.P.Q Unité Police Quartier St Lambert - S.A.R.I.J Service Accueil Recherche Investigation Judiciaire',1), 
(1,NULL,NULL,'Hotel Dieu','1, place Parvis Notre Dame','75004','Paris',48.853264,2.348034,'0142348234','http://www.aphp.fr/index.php?module=hopital&action=hopitaux_detail&vue=hopital_detail&obj=20','',NULL,1), 
(1,NULL,NULL,'Val de Grâce','74, boulevard Port Royal','75005','Paris',48.838398,2.342194,'0140514000','http://www.defense.gouv.fr/sante/votre_espace/hopitaux/val_de_grace_a_paris/hia_du_val_de_grace_a_paris','',NULL,1), 
(1,NULL,NULL,'La Collegiale','33, rue du Fer à Moulin','75005','Paris',48.838734,2.352191,'0144083000','http://www.aphp.fr/index.php?module=hopital&action=hopitaux_detail&vue=hopital_detail&obj=19','',NULL,1), 
(1,NULL,NULL,'Lariboisière','2, rue Ambroise Paré','75010','Paris',48.883404,2.353257,'0149956565','http://www.aphp.fr/index.php?module=hopital&action=hopitaux_detail&vue=hopital_detail&obj=23','',NULL,1), 
(1,NULL,NULL,'Saint Louis','1, avenue Claude Vellefaux','75010','Paris',48.873493,2.369785,'0142494949','http://www.aphp.fr/index.php?module=hopital&action=hopitaux_detail&vue=hopital_detail&obj=37','',NULL,1), 
(1,NULL,NULL,'Fernand-Widal','200, rue du Faubourg Saint-Denis','75010','Paris',48.881405,2.358184,'0140054545','http://www.aphp.fr/index.php?module=hopital&action=hopitaux_detail&vue=hopital_detail&obj=27','',NULL,1), 
(1,NULL,NULL,'Armand Trousseau','26, avenue Docteur Arnold Netter','75012','Paris',48.843002,2.405262,'0144737475','http://www.aphp.fr/index.php?module=hopital&action=hopitaux_detail&vue=hopital_detail&obj=42','',NULL,1), 
(1,NULL,NULL,'Rotschild','33, boulevard Picpus','75012','Paris',48.843330,2.401426,'0140193000','http://www.aphp.fr/index.php?module=hopital&action=hopitaux_detail&vue=hopital_detail&obj=34','',NULL,1), 
(1,NULL,NULL,'Saint Antoine','184, rue Faubourg St Antoine','75012','Paris',48.829365,2.426541,'0149282000','http://www.aphp.fr/index.php?module=hopital&action=hopitaux_detail&vue=hopital_detail&obj=35','',NULL,1), 
(1,NULL,NULL,'Pitié-Salpétrière','47, boulevard Hôpital','75013','Paris',48.830757,2.359204,'0142160000','http://www.aphp.fr/index.php?module=hopital&action=hopitaux_detail&vue=hopital_detail&obj=30','',NULL,1), 
(1,NULL,NULL,'Broca','54-56, rue Pascal','75013','Paris',48.834690,2.347826,'0144083000','http://www.aphp.fr/index.php?module=hopital&action=hopitaux_detail&vue=hopital_detail&obj=6','',NULL,1), 
(1,NULL,NULL,'Cochin','11, rue Faubourg St Jacques','75014','Paris',48.836971,2.340134,'0158414141','http://www.aphp.fr/index.php?module=hopital&action=hopitaux_detail&vue=hopital_detail&obj=9','',NULL,1), 
(1,NULL,NULL,'Léopold Bellan','19, rue Vercingétorix','75014','Paris',48.837440,2.320100,'0140486868','http://www.hopital.bellan.fr','',NULL,1), 
(1,NULL,NULL,'Notre Dame du Bon Secours','68, rue des Plantes','75014','Paris',48.826347,2.319749,'0144123333','http://www.hpsj.fr','',NULL,1), 
(1,NULL,NULL,'Saint Joseph','185, rue Raymond Losserand','75014','Paris',48.830288,2.311227,'0144123333','http://www.hpsj.fr','',NULL,1), 
(1,NULL,NULL,'Saint Vincent de Paul','82, avenue Denfert Rochereau','75014','Paris',48.837013,2.334888,'0158414141','http://www.aphp.fr/index.php?module=hopital&action=hopitaux_detail&vue=hopital_detail&obj=38','',NULL,1), 
(1,NULL,NULL,'Sainte Anne','1, rue Cabanis','75014','Paris',48.830246,2.340896,'0145658000','http://www.ch-sainte-anne.fr','',NULL,1), 
(1,NULL,NULL,'Sainte Anne - CPOA','17, rue Broussais','75014','Paris',48.828392,2.336591,'0145658000','http://www.ch-sainte-anne.fr','',NULL,1), 
(1,NULL,NULL,'La Rochefoucauld','15, avenue du Général Leclerc','75014','Paris',48.832134,2.330573,'0144083000','http://www.aphp.fr/index.php?module=hopital&action=hopitaux_detail&vue=hopital_detail&obj=24','',NULL,1), 
(1,NULL,NULL,'Georges Pompidou','20, rue Leblanc','75015','Paris',48.839714,2.272998,'0156092000','http://www.aphp.fr/index.php?module=hopital&action=hopitaux_detail&vue=hopital_detail&obj=17','',NULL,1), 
(1,NULL,NULL,'Necker','149, rue Sèvres','75015','Paris',48.846497,2.315603,'0144494000','http://www.aphp.fr/index.php?module=hopital&action=hopitaux_detail&vue=hopital_detail&obj=28','',NULL,1), 
(1,NULL,NULL,'Vaugirard - Gabriel-Pallez','10, rue Vaugelas','75015','Paris',48.834194,2.294305,'0140458000','http://www.aphp.fr/index.php?module=hopital&action=hopitaux_detail&vue=hopital_detail&obj=43','',NULL,1), 
(1,NULL,NULL,'Sainte-Perine - Rossini - Chardon-Lagache','11, rue Chardon-Lagache','75016','Paris',48.843212,2.264947,'0144963131','http://www.aphp.fr/index.php?module=hopital&action=hopitaux_detail&vue=hopital_detail&obj=39','',NULL,1), 
(1,NULL,NULL,'Bichat','46, rue Henri Huchard','75018','Paris',48.899158,2.330772,'0140258080','http://www.aphp.fr/index.php?module=hopital&action=hopitaux_detail&vue=hopital_detail&obj=4','',NULL,1), 
(1,NULL,NULL,'Bretonneau? ','23 Rue Joseph de Maistre','75018','Paris',48.889771,2.331421,'0153111800','http://www.aphp.fr/index.php?module=hopital&action=hopitaux_detail&vue=hopital_detail&obj=16','',NULL,1), 
(1,NULL,NULL,'Robert Debré','48, boulevard Sérurier','75019','Paris',48.878639,2.402254,'0140032000','http://www.aphp.fr/index.php?module=hopital&action=hopitaux_detail&vue=hopital_detail&obj=33','',NULL,1), 
(1,NULL,NULL,'Tenon','4, rue de chine','75020','Paris',48.866161,2.402136,'0156017000','http://www.aphp.fr/index.php?module=hopital&action=hopitaux_detail&vue=hopital_detail&obj=41','',NULL,1), 
(1,NULL,NULL,'Hôpital de Nanterre - Max Fourestier','403 avenue République','92000','Nanterre',48.894180,2.207113,'0147696565','http://www.cash-nanterre.fr/','',NULL,1), 
(1,NULL,NULL,'Ambroise Paré','9, avenue Charles-de-Gaulle','92100','Boulogne-Billancourt',48.849342,2.237503,'0149095000','http://www.aphp.fr/index.php?module=hopital&action=hopitaux_detail&vue=hopital_detail&obj=5','',NULL,1), 
(1,NULL,NULL,'Beaujon','100, boulevard du Général Leclerc','92110','Clichy',48.906754,2.308861,'0140875000','http://www.aphp.fr/index.php?module=hopital&action=hopitaux_detail&vue=hopital_detail&obj=1','',NULL,1), 
(1,NULL,NULL,'Corentin-Celton','4, parvis Corentin-Celton','92133','Issy Les Moulineaux',48.827900,2.278415,'0158004000','http://www.aphp.fr/index.php?module=hopital&action=hopitaux_detail&vue=hopital_detail&obj=10','',NULL,1), 
(1,NULL,NULL,'Antoine Béclère','157, rue de la Porte de Trivaux','92141','Clamart',48.788860,2.250855,'0145374444','http://www.aphp.fr/index.php?module=hopital&action=hopitaux_detail&vue=hopital_detail&obj=13','',NULL,1), 
(1,NULL,NULL,'Percy','101 avenue Henri Barbusse','92141','Clamart',48.811047,2.258272,'0141466000','http://www.defense.gouv.fr/sante/votre_espace/hopitaux/percy_a_clamart/hia_percy_a_clamart','',NULL,1), 
(1,NULL,NULL,'Foch','40 rue Worth','92150','Suresnes',48.870750,2.221110,'0826207220','http://www.hopital-foch.org','',NULL,1), 
(1,NULL,NULL,'Hôpital Privé','1 rue Velpeau','92160','Antony',48.754433,2.301195,'0146743700','http://www.hp-antony.com','hopital@hp-antony.com',NULL,1), 
(1,NULL,NULL,'Hopital Américain','63 boulevard Victor Hugo','92200','Neuilly Sur Seine',48.893265,2.273497,'0146412525','http://www.american-hospital.org','',NULL,1), 
(1,NULL,NULL,'Centre Hospitalier de Courbevoie - Neuilly sur Seine ','36 boulevard Générale Leclerc','92205','Neuilly Sur Seine',48.883633,2.272521,'0140886000','http://www.hopitalcourbevoieneuilly.com','',NULL,1), 
(1,NULL,NULL,'Hôpital Val d\'Or','16 rue Pasteur','92210','Saint Cloud',48.842045,2.203770,'0147117711','http://www.clinique-valdor.com','',NULL,1), 
(1,NULL,NULL,'Hopital Perpetuel Secours','4 rue Kléber','92300','Levallois Perret',48.892334,2.279097,'0147595959','http://www.british-hospital.org','',NULL,1), 
(1,NULL,NULL,'Hôpital Jean Rostand','141 Grande Rue','92310','Sèvres',48.821087,2.202104,'0141147515','http://www.ch-4villes.fr','',NULL,1), 
(1,NULL,NULL,'Raymond Poincaré','104, boulevard Raymond-Poincaré','92380','Garches',48.838367,2.170837,'0147107900','http://www.aphp.fr/index.php?module=hopital&action=hopitaux_detail&vue=hopital_detail&obj=31','',NULL,1), 
(1,NULL,NULL,'Stell','1 rue Charles Drot','92500','Rueil Malmaison',48.876648,2.187156,'0141299000','http://etablissements.fhf.fr/annuaire/hopital-fiche.php?id_struct=2547','',NULL,1), 
(1,NULL,NULL,'Louis Mourier','178, rue des Renouillers','92701','Colombes',48.923038,2.254941,'0147606162','http://www.aphp.fr/index.php?module=hopital&action=hopitaux_detail&vue=hopital_detail&obj=26','',NULL,1), 
(1,NULL,NULL,'Avicenne','125, rue de Stalingrad','93009','Bobigny',48.915916,2.424921,'0148955555','http://www.aphp.fr/index.php?module=hopital&action=hopitaux_detail&vue=hopital_detail&obj=44','',NULL,1), 
(1,NULL,NULL,'Hôpital André Grégoire','56 boulevard Boissière','93100','Montreuil Sous Bois',48.878387,2.453468,'0149203040','http://www.chi-andre-gregoire.fr','',NULL,1), 
(1,NULL,NULL,'Jean Verdier','Avenue du 14 Juillet','93143','Bondy',48.913704,2.491628,'0148026666','http://www.aphp.fr/index.php?module=hopital&action=hopitaux_detail&vue=hopital_detail&obj=15','',NULL,1), 
(1,NULL,NULL,'Centre Hospitalier Général Saint Denis (hôpital Delafontaine)','2 rue Docteur Delafontaine','93200','Saint Denis',48.936203,2.372783,'0142356140','www.ch-stdenis.fr/','',NULL,1), 
(1,NULL,NULL,'Les Lilas - Maternité','12 rue Coq Français','93260','Les Lilas',48.878609,2.414410,'0149726465','http://www.maternite-des-lilas.com','contact@maternite-des-lilas.com',NULL,1), 
(1,NULL,NULL,'Rene-Muret - Bigottini','Avenue du Docteur Schaeffner','93270','Sevran',48.938046,2.526289,'0141525999','http://www.aphp.fr/index.php?module=hopital&action=hopitaux_detail&vue=hopital_detail&obj=32','',NULL,1), 
(1,NULL,NULL,'Centre Hospitalier De Maison Blanche ','3 avenue Jean Jaurès','93330','Neuilly Sur Marne',48.862034,2.543408,'0149444040','www.ch-maison-blanche.fr/','',NULL,1), 
(1,NULL,NULL,'Etablissement Public Santé de Ville- Evrard ','202 avenue Jean Jaurès','93330','Neuilly Sur Marne',48.865196,2.561127,'0143093030','http://www.eps-ville-evrard.fr','',NULL,1), 
(1,NULL,NULL,'Groupe Hospitalier Intercommunal le Raincy-Montfermeil ','10 rue Gén Leclerc','93370','Montfermeil',48.899384,2.565240,'0141708000','http://www.ch-montfermeil.fr','',NULL,1), 
(1,NULL,NULL,'Hôpital Intercommunal Robert Ballanger ','boulevard Robert Ballanger','93602','Aulnay Sous Bois',48.955921,2.540230,'0149367123','http://www.ch-aulnay.fr','',NULL,1), 
(1,NULL,NULL,'Albert Chenevier','40 rue Mesly','94000','Créteil',48.790180,2.460880,'0149813131','http://www.aphp.fr/index.php?module=portail&action=afficherPortail&vue=portail&NIHOPITAL=11','',NULL,1), 
(1,NULL,NULL,'Centre Hospitalier Intercommunal de Créteil ','40 avenue Verdun','94000','Créteil',48.788483,2.456761,'0145175000','http://www.chicreteil.fr','',NULL,1), 
(1,NULL,NULL,'Albert-Chenevier','40, rue de Mesly','94010','Creteil',48.790279,2.460849,'0149813131','http://www.aphp.fr/index.php?module=hopital&action=hopitaux_detail&vue=hopital_detail&obj=11','',NULL,1), 
(1,NULL,NULL,'Henri Mondor','51, av du Maréchal de Tassigny','94010','Creteil',48.788902,2.452028,'0149812111','http://www.aphp.fr/index.php?module=hopital&action=hopitaux_detail&vue=hopital_detail&obj=12','',NULL,1), 
(1,NULL,NULL,'Hôpital d\'Instruction des Armées Bégin ','69 avenue Paris','94160','Saint Mande',48.840874,2.417678,'0143985000','http://www.defense.gouv.fr/sante/votre_espace/hopitaux/begin_a_saint_mande/hia_begin_a_saint_mande','',NULL,1), 
(1,NULL,NULL,'Ivry - Charles Foix','7, avenue de la République','94205','Ivry-Sur-Seine',48.782818,2.339787,'0149594000','http://www.aphp.fr/index.php?module=hopital&action=hopitaux_detail&vue=hopital_detail&obj=21','',NULL,1), 
(1,NULL,NULL,'Bicetre ','78, rue du Général Leclerc','94275','Le Kremlin-Bicetre',48.780872,2.315957,'0145212121','http://www.aphp.fr/index.php?module=hopital&action=hopitaux_detail&vue=hopital_detail&obj=3','',NULL,1), 
(1,NULL,NULL,'Sainte Camille','2 rue Pères Camilliens','94360','Bry Sur Marne',48.839813,2.526013,'0149831010','http://etablissements.fhf.fr/annuaire/hopital-fiche.php?id_struct=3292','',NULL,1), 
(1,NULL,NULL,'Hôpital Esquirol ','57 rue Maréchal Leclerc','94410','Saint Maurice',48.817917,2.432591,'0143966161','http://www.hopital-esquirol.fr/','',NULL,1), 
(1,NULL,NULL,'Hôpital National de Saint-Maurice ','14 rue Val d\'Osne','94410','Saint Maurice',48.821102,2.423466,'0143966363','www.hopital-saint-maurice.fr','',NULL,1), 
(1,NULL,NULL,'Limeil Br. - Emile Roux','1, avenue de Verdun','94456','Limeil Brevannes',48.749619,2.480442,'0145958080','http://www.aphp.fr/index.php?module=hopital&action=hopitaux_detail&vue=hopital_detail&obj=14','',NULL,1), 
(1,NULL,NULL,'Institut Gustave Roussy ','39 rue Camille Desmoulins','94800','Villejuif',48.796364,2.349528,'0142114211','http://www.igr.fr','',NULL,1), 
(1,NULL,NULL,'Villejuif - Paul Brousse','12, avenue Paul-Vaillant-Couturier','94804','Villejuif',48.794601,2.360398,'0145593000','http://www.aphp.fr/index.php?module=hopital&action=hopitaux_detail&vue=hopital_detail&obj=45','',NULL,1), 
(1,NULL,NULL,'Centre Hospitalier Intercommunal De Villeneuve Saint Georges','40 allée Source','94190','Villeneuve Saint Georges',48.740875,2.449839,'0143862000','www.chiv.fr','',NULL,1), 
(0,NULL,NULL,'N/A','N/A','N/A','N/A',0.000000,0.000000,NULL,NULL,NULL,'N/A', 0);


UPDATE `lieu` SET `id_lieu` = 0 WHERE `id_lieu` = 221;
ALTER TABLE `lieu` AUTO_INCREMENT = 221;

INSERT INTO `delegation` (`nom`, `departement`, `telephone`, `mobile`, `mail`, `web`, `id_lieu`,`sort_order`,`id_siord`) 
VALUES 
('VANVES - MALAKOFF','92170','0146452030','0664498518','dl.vanvesmalakoff@croix-rouge.fr','http://vanvesmalakoff.croix-rouge.fr',1,92170,1),
('CHATILLON','92320','0140928084','0661944410','','',2,92320,2),
('MONTROUGE','92120','0146579530','0665336216','dlusmontrouge@yahoo.fr','http://montrouge.croix-rouge.fr',3,92120,3),
('BAGNEUX','92220','0145361710','0664024904','dl.bagneux@croix-rouge.fr','http://bagneux.croix-rouge.fr',4,92220,4),
('ANTONY','92160','0146663947','0661266385','dl.antony@croix-rouge.fr','http://antony.croix-rouge.fr/',5,92160,5),
('BOURG-LA-REINE','92340','0146646877','0665539826','dl.bourglareine@croix-rouge.fr','http://bourglareine.croix-rouge.fr',6,92340,6),
('CHÂTENAY-MALABRY','92292','0141137282','0668171092','sabrina.laurendeau@yahoo.fr','',7,92292,7),
('FONTENAY-AUX-ROSES','92260','0147021833','0682172326','dl.fontenayauxroses@croix-rouge.fr','',8,92260,8),
('SCEAUX','92330','0147027597','','','',9,92330,9),
('ISSY-LES-MOULINEAUX','92130','0140935016','0664498479','crf.issy@free.fr','http://issylesmoulineaux.croix-rouge.fr/',10,92130,10),
('ASNIERES','92600','0147933270','0607741980','dl.asnieres@croix-rouge.fr','http://asnieres.croix-rouge.fr',11,92600,16),
('BOIS-COLOMBES','92270','0147822424','0664498485','dl.boiscolombes@croix-rouge.fr','http://boiscolombes.croix-rouge.fr/',12,92270,18),
('BOULOGNE','92100','0146215356','0624664167','dl.boulogne@croix-rouge.fr','',13,92100,19),
('CHAVILLE','92370','0147503800','0699476890','dl.chaville@croix-rouge.fr','http://chaville.croix-rouge.fr',14,92370,23),
('CLAMART','92140','0146321214','0663826465','dl.clamart@croix-rouge.fr','http://clamart.croix-rouge.fr/',15,92140,24),
('CLICHY','92110','0147371639','','','',16,92110,25),
('COLOMBES','92700','0142422461','','','http://colombes.croix-rouge.fr/',17,92700,26),
('COURBEVOIE','92400','','0650573400','dl.courbevoie@croix-rouge.fr','http://courbevoie.croix-rouge.fr',18,92400,27),
('GARCHES','92380','0147951864','','direction@crf-garches.com','www.crf-garches.com',19,92380,29),
('GENNEVILLIERS','92230','0147994116','','','',20,92230,30),
('LA GARENNE-COLOMBES','92250','0147822463','0663339218','dl.lagarennecolombes@croix-rouge.fr','lagarennecolombes.croix-rouge.fr',21,92250,32),
('MEUDON','92190','0146231118','0609884341','dl.meudon@croix-rouge.fr','http:\\\\meudon.croix-rouge.fr',22,92190,33),
('NANTERRE','92000','0147259697','0607221894','topaze9225@gmail.com','http://nanterre.croix-rouge.fr/',23,92000,35),
('NEUILLY/LEVALLOIS','92200','0146240986','0622296572','','',24,92200,36),
('PUTEAUX','92800','0147761118','0614323891','dl.puteaux@croix-rouge.fr','http://puteaux.croix-rouge.fr',25,92800,37),
('RUEIL-MALMAISON','92500','0147519947','0609510723','crf.rueil@free.fr','',26,92500,38),
('SAINT-CLOUD','92210','','0664421888','escr9229@yahoo.fr','http://saintcloud.croix-rouge.fr',27,92210,39),
('SEVRES/VILLE D AVRAY','92310','0145071360','','dl.sevres@croix-rouge.fr','',28,92310,41),
('SURESNES','92150','0147724526','0664498560','dl.suresnes@croix-rouge.fr','http://suresnes.croix-rouge.fr',29,92150,42),
('VAUCRESSON','92420','0147952785','0664498512','dl.vaucresson@croix-rouge.fr','',30,92420,43),
('PARIS - XIV','75014','0145415876','','dlus@dl14.crf75.org','http://paris14.croix-rouge.fr',31,75014,54),
('PARIS - XV','75015','0148280315','0663390354','dlus7515@yahoo.fr','http://paris15.croix-rouge.fr/ ',32,75015,55),
('PARIS - XIII','75013','0147070947','','','',33,75013,56),
('PARIS - XII','75012','0143408010','0608546728','','',34,75012,57),
('PARIS - XI','75011','0143798510','0684515764','dl.paris11@croix-rouge.fr','http://paris11.croix-rouge.fr',35,75011,58),
('PARIS - X','75003','0142779563','','','',36,75003,59),
('PARIS - IX','75009','0148786387','0699407509','dl.paris09@croix-rouge.fr','http://paris09.croix-rouge.fr/',37,75009,60),
('PARIS - VIII','75008','0153040140','0664497651','topaze@crf-paris8.org','http://paris08.croix-rouge.fr',38,75008,61),
('PARIS - VII','75007','0145513444','0629159086','dl.paris07@croix-rouge.fr','http://paris07.croix-rouge.fr/',39,75007,62),
('PARIS - VI','75006','0142224685','0624244172','dl.paris06@croix-rouge.fr','http://paris06.croix-rouge.fr/',40,75006,63),
('PARIS - V','75005','0871127505','','dl7505@free.fr','',41,75005,64),
('PARIS - IV','75004','0142747380','','','',42,75004,65),
('PARIS - I','75002','0142331476','0664498535','','',43,75002,68),
('PARIS - XVI','75016','0142885669','','','http://paris16.croix-rouge.fr/',44,75016,69),
('PARIS - XVII','75017','0146220209','','dl.paris17@croix-rouge.fr','paris17.croix-rouge.fr',45,75017,70),
('PARIS - XVIII','75018','0142621376','0664498445','dl7518@free.fr','http://paris18.croix-rouge.fr/',46,75018,71),
('PARIS - XIX','75019','0142492044','','dlus@dl19.crf75.org','',47,75019,72),
('PARIS - XX','75020','0146363031','','','',48,75020,73),
('Le Vésinet','78110','0139520288','0613292547','dl.levesinet@croix-rouge.fr','',49,178110,75),
('St Quentin en Yvelines','78280','0130489217','0628536851','crf7815@yahoo.fr','http://sqy.croix-rouge.fr',50,178280,77),
('Poissy','78300','0139119039','0672006885','crf_poissy_secourisme@yahoo.fr','http://poissy.croix-rouge.fr/',51,178300,78),
('St Germain en Laye','78100','0134511536','0682679404','dl.stgermainenlaye@croix-rouge.fr','http://saintgermain.croix-rouge.fr',52,178100,79),
('Sartrouville','78500','0139144446','0684344271','crf.sartrouville-secourisme@laposte.net','http://sartrouville.croix-rouge.fr/',53,178500,80),
('Versailles','78000','0139501194','0615644121','dlus7825@croix-rouge.fr, crf7825@gmail.com','http://versailles.croix-rouge.fr/',54,178000,81),
('Viroflay','78220','0130242159','0627422098','dl.viroflay@croix-rouge.fr','http://viroflay.croix-rouge.fr',55,178220,82),
('Houilles','78800','0130869272','0686504902','dl.houillescarrieres@croix-rouge.fr','http://houillescarrieres.croix-rouge.fr',56,178800,83),
('CLAYE','77290','0952357705','0686406361','dl.croix.rouge.7705@free.fr','',57,177290,94),
('LAGNY','77400','0160076873','','dl.lagnysurmarne@croix-rouge.fr','http://lagnysurmarne.croix-rouge.fr/',58,177400,97),
('MELUN','77000','0160680180','0617244394','crfmelun@gmail.com','http://melun.croix-rouge.fr',59,177000,100),
('ALFORTVILLE - MAISONS-ALFORT','94700','0953099425','0664789425','dl.maisons-alfort@croix-rouge.fr','http://maisonsalfort.croix-rouge.fr',60,94700,105),
('ARCUEIL - CACHAN','94230','0146650185','0664900587','action9403@crf94.org','http://arcueilcachan.croix-rouge.fr',61,94230,106),
('BONNEUIL SUR MARNE','94380','0143390601','','9405@crf94.org','',62,94380,107),
('BRY SUR MARNE','94360','0149837333','0687656835','dl.brysurmarne@croix-rouge.fr','http://brysurmarne.croix-rouge.fr/',63,94360,108),
('CHAMPIGNY SUR MARNE','94500','0148824711','0621771199','9408@crf94.org ; gkerirzin@yahoo.fr','',64,94500,109),
('CHARENTON - SAINT MAURICE','94220','0148937700','','9409@crf94.org','',65,94220,110),
('CHENNEVIÈRES SUR MARNE','94430','0145942228','','9410@crf94.org','',66,94430,111),
('CHOISY - THIAIS - CHEVILLY','94600','0148522434','','9412@crf94.org','',67,94600,112),
('CRÉTEIL','94000','0143990003','','9413@crf94.org','http://creteil.croix-rouge.fr',68,94000,113),
('FONTENAY SOUS BOIS','94120','0143942170','','dl.fontenay@croix-rouge.fr','http://fontenaysousbois.croix-rouge.fr',69,94120,114),
('IVRY SUR SEINE','94200','0146580972','','9417@crf94.org','',70,94200,115),
('JOINVILLE LE PONT','94340','0148861289','','9418@crf94.org','',71,94340,116),
('L HAY LES ROSES','94240','0141240267','','9419@crf94.org','http://lhaylesroses.croix-rouge.fr',72,94240,117),
('GENTILLY - KREMLIN-BICÊTRE - VILLEJUIF','94800','0146770900','','9421@crf94.org','http://villejuif.croix-rouge.fr',73,94800,118),
('LE PERREUX SUR MARNE','94170','0143240744','0628056806','dl.leperreux@croix-rouge.fr','http://leperreux.croix-rouge.fr',74,94170,119),
('NOGENT SUR MARNE','94130','0143241000','','9428@crf94.org','',75,94130,120),
('LA QUEUE EN BRIE - ORMESSON-NOISEAU','94490','0145944694','','9431@crf94.org','',76,94490,121),
('FRESNES - RUNGIS','94150','0149790568','0951789433','9433@crf94.org','http://fresnesrungis.croix-rouge.fr',77,94150,122),
('SAINT MAUR DES FOSSÉS','94100','0143979070','','9435@crf94.org','',78,94100,123),
('SUCY EN BRIE','94370','0149825144','','9438@crf94.org','',79,94370,124),
('ABLON - ORLY - VILLENEUVE LE ROI','94290','0145977919','','villeneuveleroi@crf94.org','villeneuveleroi.croix-rouge.fr',80,94290,125),
('VILLENEUVE SAINT GEORGES - VALENTON','94190','0143826183','','9444@crf94.org','',81,94190,126),
('VILLIERS SUR MARNE','94350','0149306496','','9445@crf94.org','',82,94350,127),
('VINCENNES','94300','0148085158','','9446@crf94.org','',83,94300,128),
('VITRY SUR SEINE','94403','0146819456','','contact@crfvitry.org','',84,94403,129),
('ARGENTEUIL','95104','0139615638','','dl.argenteuilbezons@croix-rouge.fr','',85,195104,130),
('BEAUMONT SUR OISE','95260','0134709634','','dl.beaumontsuroise@croix-rouge.fr','',86,195260,131),
('BORDS DE SEINE','95240','0134507190','','dl.cormeilles@croix-rouge.fr','',87,195240,132),
('DEUIL','95170','0139840338','','dl.deuillabarre@croix-rouge.fr','',88,195170,133),
('DOMONT','95330','0139910520','','dl.domont@croix-rouge.fr','',89,195330,134),
('ENGHIEN','95880','0134280111','0632349127','dl.enghien@croix-rouge.fr','',90,195880,136),
('PARISIS','95130','0134144108','','dl.franconville@croix-rouge.fr','',91,195130,138),
('VALLEE DE L OURCQ','95500','0134539750','','dl.gonesse@croix-rouge.fr','',92,195500,140),
('BERGES DE L OISE','95290','0134692199','','dl.lisleadam@croix-rouge.fr','',93,195290,141),
('LUZARCHES','95270','0130350197','','dl.luzarches@croix-rouge.fr','',94,195270,142),
('MONTMORENCY','95160','0134127660','','dl.montmorency@croix-rouge.fr','',95,195160,143),
('PORTES DU VEXIN','95300','0130734590','','louis.berthorelly@neuf.fr','',96,195300,144),
('SAINT GRATIEN','95210','0134174393','','dl.stgratien@croix-rouge.fr','',97,195210,145),
('SAINT BRICE','95350','0139940455','','dl.stbricesousforet@croix-rouge.fr','',98,195350,146),
('SARCELLES','95200','0139937725','','dl.sarcelles@croix-rouge.fr','',99,195200,147),
('PORTES DE FRANCE','95471','0134682721','','dl.survilliers@croix-rouge.fr','',100,195471,149),
('BOIS DE LA PLAINE','95150','0130409598','','dl.taverny@croix-rouge.fr','',101,195150,150),
('VEXIN FRANÇAIS','95640','0130398846','','dl.vexin@croix-rouge.fr','',102,195640,151),
('LES MUREAUX','78130','','0617656947','topaze.7811@yahoo.fr','',103,178130,152),
('CHALLANS','85300','0251930679','','dl.challans@croix-rouge.fr','',104,185300,153),
('FONTENAY LE COMTE','85200','0251692168','','dl.fontenaylecomte@croix-rouge.fr','',105,185200,154),
('LA ROCHE SUR YON','85000','0251370709','0618455152','dl.larochesuryon@croix-rouge.fr','',106,185000,155),
('LES SABLES D\'OLONNE','85119','0251237223','0614653503','dl.lessablesdolonne@croix-rouge.fr','',107,185119,156),
('LUÇON','85400','0251286373','','dl.lucon@croix-rouge.fr','',108,185400,157),
('LES HERBIERS','85500','0251929508','','dl.lesherbiers@croix-rouge.fr','',109,185500,158),
('AMBOISE-CHÂTEAU RENAULT','37400','0247305258','','dl.amboise@croix-rouge.fr','',110,137400,160),
('Azay Le Rideau','37510','0247679909','','dl.paysindreetcher@croix-rouge.fr','',111,137510,161),
('EST TOURANGEAU - BLERE - VOUVRILLON','37150','0247235062','','dl.blere@croix-rouge.fr','',112,137150,162),
('BOURGUEIL','37140','0247950599','0630281216','dl.bourgueil@croix-rouge.fr','',113,137140,163),
('CHINON STE MAURE','37500','0247930904','','dl.chinon@croix-rouge.fr','',114,137500,164),
('LOCHES - MONTRESOR','37600','0247593492','0247593492','dl.loches@croix-rouge.fr','',115,137600,165),
('HAUTE TOURAINE','37290','0247946210','0247946210','dl.preuillysurclaise@croix-rouge.fr','http://preuilly.croix-rouge.fr',116,137290,166),
('TOURS PLUS','37000','0247613305','0247665775','dl.tours@croix-rouge.fr','',117,137000,167),
('4 GARES','95120','0134159284','','dl.4gares@croix-rouge.fr','http://4gares.croix-rouge.fr',118,195120,1000009),
('COTEAUX','95160','0134127660','0619560961','','',119,195160,1000010),
('PIERRE TURQUAISE','95260','0134709634','0621230726','dl.pierreturquaise@croix-rouge.fr','',120,195260,1000011),
('PLAINE DE FRANCE','95331','0139910520','','','',121,195331,1000012),
('VAL DE FRANCE','95200','0139937725','','','',122,195200,1000013),
('ORLÉANS','45650','0238533076','0660321583','adrienmenti@hotmail.com','',123,145650,1000016),
('MONTARGIS','45200','0238854502','0660321583','gueremy.franck@wanadoo.fr; ddus45@croix-rouge','',124,145200,1000017),
('GIEN','45500','0238677782','0680284227','ddus45@croix-rouge','',125,145500,1000018),
('CORBEIL ESSONNES','91100','0164962848','','dl.corbeilessonnes@croix-rouge.fr','',126,191100,1000020),
('VAL D YERRES','91331','','0698443155','dl.valdyerres@croix-rouge.fr','',127,191331,1000021),
('LA FERTE ALAIS','91760','0164930302','0677078203','dl.lafertealais@croix-rouge.fr','',128,191760,1000022),
('LA PYRAMIDE','91265','0169542964','','dl.pyramide@croix-rouge.fr','',129,191265,1000023),
('VIRY CHATILLON','91170','0169458484','','dl.virychatillon@croix-rouge.fr','http://viry-chatillon.croix-rouge.fr',130,191170,1000024),
('DEUX RIVIERES','91300','0160112150','','dl.DEUXRIVIERES@croix-rouge.Fr','',131,191300,1000025),
('VALLEES BIEVRE YVETTE','91120','0169311393','','dl.VALLEESBIEVREsYVETTE@croix-rouge.Fr','http://bievre.croix-rouge.fr',132,191120,1000026),
('VAL D ORGE','91240','0169463000','','dl.VALDORGE@croix-rouge.Fr','http://valdorge.croix-rouge.fr',133,191240,1000027),
('ARPAJONNAIS','91180','0160834548','','dl.ARPAJON@croix-rouge.Fr','',134,191180,1000028),
('DEUX TOURS','91220','0169888843','','dl.lesdeuxtours@croix-rouge.fr','',135,191220,1000029),
('DRAVEIL','91210','0169037297','','dl.DRAVEIL@croix-rouge.Fr','',136,191210,1000030),
('ETAMPES','91150','0164941224','','dl.ETAMPES@croix-rouge.Fr','',137,191150,1000031),
('LIMOURS','91470','','0676887389','dl.limours@croix-rouge.fr','http://sites.croix-rouge.fr/sites/91/les_molieres/index.php',138,191470,1000032),
('MILLY-MAISSE','91490','0164989405','','dl.milly-maisse@croix-rouge.fr','',139,191490,1000033),
('SAINT CHERON','91650','0164587665','','dl.StCheron@croix-rouge.fr','',140,191650,1000034),
('EVRY CENTRE ESSONNE ','91000','0160773664','','dl.evry@croix-rouge.fr','http://evry.croix-rouge.fr',141,191000,1000036);



INSERT INTO `delegation` ( `nom`, `departement`, `telephone`, `mobile`, `mail`, `web`, `id_lieu`,`sort_order`, `id_siord`)
VALUES
('N/A','N/A','N/A','N/A','N/A','N/A',0,0,0);

update delegation set id_delegation=0 where id_delegation = 142;
ALTER TABLE delegation AUTO_INCREMENT = 142;


-- par défaut on met le sort_order au code postal
update delegation 
set    sort_order = cast( departement as unsigned)
where id_delegation >0;



-- pour celle qu'on veut voir après paris et département limitrophe on refait le truc a préfixant par 1 (pour faire fois 10)
update delegation 
set    sort_order = cast( concat("1",departement) as unsigned)
where departement not like '75%'
AND   departement not like '92%'
AND   departement not like '93%'
AND   departement not like '94%'
AND   id_delegation >0;

INSERT INTO `crfrdp`.`vehicule` (`id_vehicule`, `id_vehicule_type`, `indicatif`, `id_delegation`, `id_dispositif`, `last_know_coordinate_lat`, `last_know_coordinate_long`, `mobile_450_id`, `mobile_150_id`, `marque`, `modele`, `immatriculation`, `carburant`, `date_mise_en_service`, `date_dernier_controle_tech`, `parking_rue`, `parking_code_postal`, `parking_ville`) VALUES ('1', '1', '042', '42', '0', '0', '0', 'None', 'None', 'Citroen', 'Jumber', 'N/A', 'Diesel', '2012-07-01', '2012-07-01', 'N/A', 'N/A', 'N/A');
INSERT INTO `crfrdp`.`vehicule` (`id_vehicule`, `id_vehicule_type`, `indicatif`, `id_delegation`, `id_dispositif`, `last_know_coordinate_lat`, `last_know_coordinate_long`, `mobile_450_id`, `mobile_150_id`, `marque`, `modele`, `immatriculation`, `carburant`, `date_mise_en_service`, `date_dernier_controle_tech`, `parking_rue`, `parking_code_postal`, `parking_ville`) VALUES ('2', '1', '052', '41', '0', '0', '0', 'None', 'None', 'Citroen', 'Jumber', 'N/A', 'Diesel', '2012-07-01', '2012-07-01', 'N/A', 'N/A', 'N/A');
INSERT INTO `crfrdp`.`vehicule` (`id_vehicule`, `id_vehicule_type`, `indicatif`, `id_delegation`, `id_dispositif`, `last_know_coordinate_lat`, `last_know_coordinate_long`, `mobile_450_id`, `mobile_150_id`, `marque`, `modele`, `immatriculation`, `carburant`, `date_mise_en_service`, `date_dernier_controle_tech`, `parking_rue`, `parking_code_postal`, `parking_ville`) VALUES ('3', '1', '192', '47', '0', '0', '0', 'None', 'None', 'Citroen', 'Jumber', 'N/A', 'Diesel', '2012-07-01', '2012-07-01', 'N/A', 'N/A', 'N/A');
INSERT INTO `crfrdp`.`vehicule` (`id_vehicule`, `id_vehicule_type`, `indicatif`, `id_delegation`, `id_dispositif`, `last_know_coordinate_lat`, `last_know_coordinate_long`, `mobile_450_id`, `mobile_150_id`, `marque`, `modele`, `immatriculation`, `carburant`, `date_mise_en_service`, `date_dernier_controle_tech`, `parking_rue`, `parking_code_postal`, `parking_ville`) VALUES ('4', '1', '162', '44', '0', '0', '0', 'None', 'None', 'Citroen', 'Jumber', 'N/A', 'Diesel', '2012-07-01', '2012-07-01', 'N/A', 'N/A', 'N/A');
INSERT INTO `crfrdp`.`vehicule` (`id_vehicule`, `id_vehicule_type`, `indicatif`, `id_delegation`, `id_dispositif`, `last_know_coordinate_lat`, `last_know_coordinate_long`, `mobile_450_id`, `mobile_150_id`, `marque`, `modele`, `immatriculation`, `carburant`, `date_mise_en_service`, `date_dernier_controle_tech`, `parking_rue`, `parking_code_postal`, `parking_ville`) VALUES ('0', '0', '000', '0' , '0', '0', '0', 'None', 'None', 'N/A'    , 'N/A'   , 'N/A', 'N/A'   , '1970-01-01', '1970-01-01', 'N/A', 'N/A', 'N/A');

UPDATE `vehicule` SET `id_vehicule` = 0 WHERE `id_vehicule` = 5;
ALTER TABLE `vehicule` AUTO_INCREMENT = 5;


insert into dispositif_etat (label_etat)
values
('Disponible'),
('Intervention Affectée'),
('Parti'),
('Sur Place'),
('Primaire passé'),
('Secondaire passé'),
('Transport'),
('Arrivé à l''Hopital'),
('Intervention Terminée'),
('Vacation Terminée'),
('Indisponible');

update dispositif_etat set id_etat = 0  where id_etat = 11;
ALTER TABLE dispositif_etat AUTO_INCREMENT = 11;

insert into dispositif_type (id_vehicule_type, label_type, nombre_equipier_max, id_role_leader, code_type)
values
(1, 'ALPHA'            ,5,5,'SAMU'),
(1, 'BSPP'             ,5,6,'BSPP'),
(0, 'Poste de Secours' ,0,4,'POSE'),
(0, 'Point d''Alerte'  ,0,9,'POAL'),
(0, 'N/A'              ,0,0,'----');

update dispositif_type set id_type = 0 where id_type = 5;
ALTER TABLE dispositif_type AUTO_INCREMENT = 5;

insert into equipier_role (label_role, evaluable)
values                     /*RDP - SIORD */
('Chef de Dispositif'   ,false), /*01  - 61*/
('Chef de Poste'        ,false), /*02  - 62*/
('Chef de Section'      ,false), /*03  - 60*/
('CI'                   ,false), /*04  - 2 */
('CI Réseau (Alpha)'    ,true ), /*05  - 45*/
('CI CS     (BSPP)'     ,true ), /*06  - 54*/
('Chauffeur ASM'        ,true ), /*07  - 4 */
('Chauffeur VL'         ,false), /*08  - 5 */
('PSE2'                 ,false), /*09  - 3 */
('PSE1'                 ,false), /*10  - 53*/
('PSC1'                 ,false), /*11  - 33*/
('N/A'                  ,false); /*00  - */

update equipier_role set id_role = 0 where id_role = 12;
ALTER TABLE equipier_role AUTO_INCREMENT = 12;


INSERT INTO `dispositif_type_definition` (`id_dispositif_type`, `id_role`, `nombre_min`, `nombre_max`) VALUES 
(1,5,1,1),(1,7,1,1),(1,9,2,3),(1,10,0,1),(1,11,0,1), -- alpha
(2,6,1,1),(2,7,1,1),(2,9,2,3),(2,10,0,1),(2,11,0,1), -- BSPP
(3,6,1,1),(3,9,2,3),(3,10,0,1),(3,11,0,1), -- Poste de secours
(4,9,2,3),(4,10,0,1),(4,11,0,1); -- Point d'alerte

insert into user_role (label_role, code_role)
values
('Administrateur', 'ADMINISTRATEUR'),
('Régulateur'    , 'REGULATEUR'    ),
('Co-Régulateur' , 'CO-REGULATEUR' ),
('Observateur'   , 'OBSERVATEUR'   ),
('N/A'           , 'N/A'           );

update user_role set id_role = 0 where id_role = 5;
ALTER TABLE user_role AUTO_INCREMENT = 5;


INSERT INTO `equipier` (`id_equipier`, `id_dispositif`, `nivol`, `equipier_is_male`, `enabled`, `nom`, `prenom`, `mobile`, `email`, `id_delegation`, `autre_delegation`) 
VALUES                 (0,0,'N/A',1,0,'NA','NA','NA','na@na.na',0,NULL);

update `equipier` set id_equipier = 0 where id_equipier = 1;
ALTER TABLE `equipier` AUTO_INCREMENT = 1;


insert into `user` ( `id_equipier`, `password`, `enabled`, `id_regulation` )
values
(0, '*********',true,  0 );

update `user` set id_user = 0 where id_user = 1;
ALTER TABLE `user` AUTO_INCREMENT = 1;

insert into regulation (`start_date` ,`expected_end_date` ,`open`,`id_regulateur`,`label` ,`comment` )
values
(MAKEDATE(1970,1), MAKEDATE(1970,2), false, 0, 'N/A', 'N/A');

update regulation set id_regulation = 0 where id_regulation = 1;
ALTER TABLE `regulation` AUTO_INCREMENT = 1;


insert into `dispositif`
(
  `id_type_dispositif`,  `id_vehicule`, `id_regulation` ,  `indicatif_vehicule` ,  `O2_B1_volume` ,
  `O2_B1_pression` ,  `O2_B2_volume`  , `O2_B2_pression`,  `O2_B3_volume`  ,  `O2_B3_pression` ,
  `O2_B4_volume`   ,  `O2_B4_pression`, `O2_B5_volume`  ,  `O2_B5_pression`, `dispositif_comment` ,
  `dispositif_back_3_girl`, `dispositif_not_enough_O2`, `dispositif_set_available_with_warning`,
  `dsa_type` ,  `dsa_complet` ,  `observation` ,  `DH_debut` ,  `DH_fin` ,  `id_delegation_responsable` ,
  `autre_delegation` ,  `contact_radio` ,  `contact_tel1` ,  `contact_tel2` ,  `contact_alphapage` ,
  `identite_medecin` ,  `id_etat_dispositif`, `id_current_intervention`, `display_state`
)
VALUES
(	0, 0, 0, 'N/A', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '', 
	false, false, false, 'N/A', 0, '',
	MAKEDATE(1970,1), MAKEDATE(1970,2), 1, 'N/A',
	'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 0, 0, 0
);

update dispositif set id_dispositif = 0 where id_dispositif = 1;
ALTER TABLE `dispositif` AUTO_INCREMENT = 1;

insert into intervention_origine
  (label_origine)
values
  ('SAMU'),
  ('BSPP'),
  ('Poste de Secours'),
  ('Point d''Alerte'),
  ('Se présente'),
  ('Autre'),
  ('N/A');

update intervention_origine set id_origine = 0 where id_origine = 7;
ALTER TABLE `intervention_origine` AUTO_INCREMENT = 7;

insert into intervention_motif
  (label_motif)
values
  ('Personne Malade'),
  ('Personne Blessée'),
  ('AVP'),
  ('Malaise'),
  ('Autre'),
  ('N/A');

update intervention_motif set id_motif = 0 where id_motif = 6;
ALTER TABLE `intervention_motif` AUTO_INCREMENT = 6;

insert into intervention_motif_annulation
  (label_motif_annulation)
values
  ('Sans suite CRF'),
  ('Autre moyen CRF déjà sur place'),
  ('Autre moyen NON CRF déjà sur place'),
  ('Victime absente'),
  ('Autre'),
  ('N/A');

update intervention_motif_annulation set id_motif_annulation = 0 where id_motif_annulation = 6;
ALTER TABLE `intervention_motif_annulation` AUTO_INCREMENT = 6;

-- etat_intervention -1: intervention annnulée, 0:en cours de création, 1: création terminée, 2:intervention affectée, 3:intervention terminée
insert into intervention_etat (label_etat)
values
('Non Affectée'),
('Affectée'),
('Dispositif Parti'),
('Dispositif Sur Place'),
('Primaire passé'),
('Secondaire passé'),
('Transport'),
('Arrivé à l''Hopital'),
('Terminée'),
('Vacation Terminée'),
('Intervention Annulée'),
('En cours de création');

update intervention_etat set id_etat = 0 where id_etat = 12;
ALTER TABLE `intervention_etat` AUTO_INCREMENT = 12;



insert into credits (`presentation_order`, `name`, `version`, `url`, `description`)
values
(0 , 'Thomas Manson'     , '1.0 (beta version ;)', 'http://blog.mansonthomas.com'                    , ''),
(1 , 'DWR'               , '3.0 RC1(build113)'   , 'http://www.directwebremoting.org'                , 'a Java integrated Ajax Framework that allow you to call java methods from javascript'),
(18, 'Jakarta Commons'   , '*'                   , 'http://commons.apache.org'                       , 'Very usefull Java libraries'),
(6 , 'JAWR'              , '2.5.1'               , 'http://jawr.dev.java.net'                        , 'Performance Librairy that do the following to your css & js files : minify, put in one file, gzip, set far expiry date, i18n handling, load js & css from jar'),
(7 , 'EHCache'           , '1.4.1'               , 'http://ehcache.sourceforge.net/'                 , 'A very efficient java cache manager'),
(17, 'mozilla js'        , '1.7'                 , 'http://www.mozilla.org/rhino/'                   , 'Jawr dependency'),
(16, 'Jakarta ORO'       , '2.0.8'               , 'http://jakarta.apache.org/oro/'                  , 'Text processing library'),
(15, 'JSR107-Cache'      , '1.0'                 , 'http://sourceforge.net/projects/jsr107cache/'    , 'EHCache dependency'),
(14, 'Log4J'             , '1.2.14'              , 'http://logging.apache.org/log4j/'                , 'Logging framework'),
(1 , 'Quartz'            , '1.6.1-RC1'           , 'https://quartz.dev.java.net/'                    , 'Job Scheduler'),
(2 , 'Spring'            , '2.5.6'               , 'http://www.springsource.org/'                    , 'Java IOC Framework'),
(13, 'YUI Compression'   , '2.3.6'               , 'http://developer.yahoo.com/yui/compressor/'      , 'js & css compression librairy'),
(5 , 'Tomcat'            , '6'                   , 'http://tomcat.apache.org'                        , 'J2EE application server'),
(4 , 'MySQL'             , '5.1'                 , 'http://www.mysql.org'                            , 'Database Server'),
(3 , 'ExtJS'             , '2.2.1'               , 'http://www.extjs.com'                            , 'Javascript Framework for GUI'),
(12, 'FamFamFam'         , '1.00'                , 'http://www.famfamfam.com'                        , 'Image librairy'),
(11, 'Ubuntu Server'     , '9.04'                , 'http://www.ubuntu.com'                           , 'Operating System'),
(10, 'Prototype'         , '1.6.0.1'             , 'http://www.prototypejs.org'                      , 'Javascript utility librairy'),
(9 , 'ScriptAculoUs'     , '1.8.1'               , 'http://www.script.aculo.us'                      , 'Javascript GUI effect library'),
(8 , 'Google Maps'       , '2.x'                 , 'http://code.google.com/intl/fr/apis/maps/'       , 'Map display & geocoding api');


insert into `application_version` (`version_name`, `dev_release_date`, `production_release_date`, `description`)
values
('0.1.0','milieu 2008'  ,'No production release','Première version mise à disposition pour présentation'),
('0.2.0','fin 2008'     ,'No production release','Bug fix release'),
('0.3.0','2009-03-13'   ,'No production release','Google Maps Traffic et Street View'),
('0.4.0','2009-06-01'   ,'No production release','Ré implémentation du Drag & Drop, affectation de plusieurs victime à un dispositif'),
('0.4.2','2010-03-11'   ,'No production release','Mise a jours de composants techniques'),
('0.4.3','2010-03-18'   ,'No production release','Ajout d\'une interface d\'edition des utilisateur de l\'application + Bug Fix'),
('0.4.4','2010-09-04'   ,'No production release','Gestion des Lieux, ID Métier pour les inters, Affichage des inters d\'un bénévole, + bug fix'),
('0.4.5','2010-09-30'   ,'No production release','Gestion des SMS sur affecation à un alpha, envoie de SMS a un équipage, logging des echanges SMS'),
('0.4.6','2010-10-07'   ,'No production release','Bug fix release + focus à la fenêtre de saisie lorsqu\'on doit saisir qqch dedans'),
('0.5'  ,'2012-01-04'   ,'No production release','Bug fix + Envoie SMS équipage Alpha sur affectation + Synchro SIORD + SMS Manager + Traffic Sytadin new version + Gestion Laissé sur place'),
('0.5.1','2012-04-27'   ,'No production release','Bug fix + Prise en compte de retours des test'),
('0.5.2','2012-09-15'   ,'No production release','Bug fix + avancement gestionnaire de SMS, gestion du vehicule, controle de saisie sur les équipiers')
;

insert into application_version_changelog(`id_application_version`, `id_jira`, `description`)
values
(1,'','Première version déployée avec les fonctionnalités majeurs opérationnelles'),
(1,'IRP-11', 'Ajout d\'une intervention'),
(1,'IRP-10', 'Ajout d\'un dispositif'),
(1,'IRP-10', 'Edition d\'un dispositif'),
(2,'IRP-19', 'Edition d\'une intervention'),
(2,'IRP-16', 'Affectation d\'une intervention à un dispositif'),
(2,'IRP-6' , 'Bouton d\'édition d\'une intervention'),
(3,'IRP-65', 'Gestion de l\'annulation d\'une intervention'),
(3,'IRP-43', 'Overlay Traffic sur google Maps'),
(3,'IRP-40', 'Street View Sur google Maps'),
(4,'IRP-26', 'Transfert d\'une victime d\'un dispositif à un autre'),
(4,'IRP-77', 'Affichage Credit et changelog'),
(4,'IRP-75', 'Bouton pour cloner une intervention'),
(4,'IRP-73', 'Reprise des données du SIORD'),
(4,'IRP-59', 'Affichage de l\'environnement sur lequel tourne l\'application '),
(4,'IRP-27', 'Gestion de N victimes par dispositif'),
(4,'IRP-79', 'Déclaration CNIL'),
(4,'IRP-83', 'Changement d\'implémentation de la gestion des roles des équipiers'),
(4,'IRP-82', 'Changment d\'implémentation de l\'affectation des équipiers'),
(4,'IRP-59', 'Affichage de l\'environnement (dev, recette, production)'),
(4,'IRP-49', 'Interface d\'éditions des bénévoles'),
(5,'IRP-36', 'Utilisation de YUI Compressor'),
(5,'IRP-34', 'Upgrade vers Spring 3+dependencies'),
(5,'IRP-86', 'Upgrade dwr, jawr'),
(5,'IRP-87', 'Ajout de 140 hopitaux et 67 délégations avec coordonnées et géoloc'),
(6,'IRP-89', 'Début d\'implémentation de la gestion des utilisateurs et des droits'),
(7,'IRP-120', 'Implémenter le choix de l\'état du dispositif lorsque l\'état est \'disponible\' ou qu\'il y a une désynchro entre inter et dispositif'),
(7,'IRP-119', 'Amélioration des idEtatInterventions'),
(7,'IRP-112', 'Création d\'une interface de gestion des lieux'),
(7,'IRP-111', 'Mutualiser la fenetre de controle d\'ajout de dispositif et la mettre sur la gestion de ticket'),
(7,'IRP-110', 'Spliter in.jsp et out.jsp afin d\'améliorer la maintenabilité et les performances d\'éditions'),
(7,'IRP-108', 'Afficher un bouton dans la partie gestion des utilisateurs, qui permet d\'afficher toutes les inters auquel il a participer'),
(7,'IRP-107', 'Afficher un bouton sur la partie IN pour afficher toutes les inters traitées par le dispositif'),
(7,'IRP-106', 'une fois un dispositif sorti du réseau (fin de vacation), si on clic sur terminer, il réapparait dans monitor OUT'),
(7,'IRP-105', 'Edition du ticket d\'inter puis valider d\'une inter déjà affecté => l\'inter est représenté pour affectation'),
(7,'IRP-99' , 'Afficher un message d\'erreur lors d\'une erreur d\'authentificaiton'),
(7,'IRP-68' , 'Bug sur la gestion de certaine checkbox'),
(7,'IRP-48' , 'Attribution d\'un ID Métier par intervention'),
(7,'IRP-25' , 'Drop down pour le volume des bouteilles'),
(7,'IRP-7'  , 'Bouton de visualisation du dispositif sur la google map'),
(8,'IRP-124', 'SMS : logging de l\'activité sms de l\'application '),
(8,'IRP-126', 'Chargement du ticket d\'intervention incomplet'),
(8,'IRP-122', 'Envoie de SMS au CI à l\'affectation d\'une intervention alpha'),
(8,'IRP-123', 'Envoie de SMS à l\'équipage du dispositif avec message personnalisé'),
(9,'IRP-134', 'Mise à jour de l\'heure du serveur automatique avec ntpd'),
(9,'IRP-135', 'l\'application donne le focus a la fenetre de saisie lorsqu\'on doit saisir qqch'),
(9,'IRP-133', 'Fix sur le découpage des sms en message de 160 char'),
(9,'IRP-131', 'Fix : le nivol est une clé dans la base des équipiers (impossible de saisir 2 équipiers avec le meme nivol)'),
(9,'IRP-130', 'Fix sur la publication d\'une intervention'),
(10, "IRP-173", "Annulation de l'intervention : bugs"),
(10, "IRP-172", "Bilan : si on déchoche une case a coché, l'information n'est pas sauvegardé en base de données"),
(10, "IRP-171", "Gestion du 'Laissé Sur Place' d'une intervention"),
(10, "IRP-158", "Remplacement de l'ancienne vue sytadin (gif) par la nouvelle"),
(10, "IRP-126", "Chargement du ticket d'intervention incomplet"),
(10, "IRP-124", "SMS : logging de l'activité sms de l'application"),
(10, "IRP-122", "Envoie de SMS au CI à l'affectation d'une intervention alpha"),
(10, "IRP-96" , "Ajouter l'indicatif dans la table équipier"),
(10, "IRP-80" , "Afficher le n° de déclaration CNIL dans l'application"),

(11,"IRP-221","Bilan et ticket: calcul des coordonnées GPS pas toujours déclenché"),
(11,"IRP-220","Edition d'un ticket d'intervention, DH réception mal initialisé"),
(11,"IRP-217","Msg d'erreur suppression de ticket d'inter"),
(11,"IRP-213","Message d'erreur saisie t° ou glycémie"),
(11,"IRP-212","Implémentation des évaluations : Ajout de la notion d'évaluateur (siord contient le role évaluateur et non le role évalué)"),
(11,"IRP-211","RaZ affichage dates patch + Etat défibrillateur"),
(11,"IRP-210","Pas de controle patch pédia"),
(11,"IRP-204","Implémentation des évaluations : edition des équipiers, ajouter la case a cocher Evaluation"),
(11,"IRP-202","Probleme d'highlight des champs dates sur l'écran dispositif"),
(11,"IRP-201","Agrandissment de la zone de saisie pour la saisie des dispositif"),
(11,"IRP-200","Recherche equipier : si on fait deux fois de suite la meme recherche, la seconde fois ne rammene aucun résultat"),
(11,"IRP-199","Téléphone dispositif"),
(11,"IRP-198","Recherche d'équipier"),
(11,"IRP-196","Horaires des inters"),
(11,"IRP-194","Enregistrement champ 'Ref Ext Inter'"),
(11,"IRP-188","Enregistrement date patch DSA"),
(11,"IRP-186","Bouton Edition de l'intervention depuis la page MonitorOut ne fonctionne pas lors du premier click. Au second click ca passe"),
(11,"IRP-184","DIspositif : Ajouter une case pour indiqué la présence d'un adapteur pédiatrique"),
(11,"IRP-183","Sauvegarde des horaires appels renforts médicalisé et arrivé renfort médicalisé, actuellement non sauvegardé"),
(11,"IRP-182","Bilan : Séparé antécédant et traitement"),
(11,"IRP-181","Glycémie et température, ajouter les décimales"),
(11,"IRP-179","Saisie du sexe de la victime non effectif sur la fiche bilan"),
(11,"IRP-178","Bug sur la restitution de la date de naissance sur la fiche bilan"),
(11,"IRP-177","format du code postal non vérifié"),
(11,"IRP-176","Suppression d'un dispositif sans inter"),
(11,"IRP-174","Si Erreur de saisie sur dispositif (manque PSE2), correction.la validation échoue"),
(11,"IRP-157","Monitor: Inter a affecter => permettre d'éditer le ticket directement."),
(11,"IRP-155","Forcé input en majuscule"),
(11,"IRP-116","bouton annuler une intervention"),
(11,"IRP-101","Saisie dispositif : ajouter champ pour la validité des patch"),

(12, "IRP-257", "IRP-166  Changement de vehicule, desaffecter le précédent véhicule"                                                                                                                                           ),
(12, "IRP-256", "IRP-166  Fin de vacation : desaffecter le vehicule au dispositif"                                                                                                                                             ),
(12, "IRP-255", "IRP-166  Affichage des vehicules du type correct en fonction du dispositif. (ajouter dans la définition du dispositif le type de véhicule)"                                                                   ),
(12, "IRP-254", "IRP-166  Une position de véhicule doit être associé avec le dispositif et l'intervention (si le vehicule est associé a un disposit et a une intervention) + info si victime a bord en fonction du status"     ),
(12, "IRP-253", "IRP-166  Vehicule : lien croisé : vehicule=> dispositif, dispositif => vehicule pour ne pas pouvoir attribuer un véhicule a 2 dispositif"                                                                     ),
(12, "IRP-250", "javascript : console.log, faire un check pour voir si la console est active dans tout le code."                                                                                                               ),
(12, "IRP-249", "Edition d'un dispositif : Dispositif 1 en cours d'édition avec liste des inter traites ouverte, ouverture d'un autre dispositif alors, la liste des inter ouvertes n'est pas fermée"                          ),
(12, "IRP-248", "Edition d'un dispositif : la liste des interventions traitées, n'est pas recharché quand on change de dispositif"                                                                                             ),
(12, "IRP-247", "Edition d'un dispositif : voir l'interventio en cours ne gère pas le multi - intervention"                                                                                                                  ),
(12, "IRP-246", "Edition d'un dispositif : fin de vacation ne gère pas le multi - intervention"                                                                                                                                ),
(12, "IRP-245", "IRP-169  Voir pour avoir un numéro pour recevoir des sms, avec tentative d'identifier le téléphone emettant le SMS."                                                                                          ),
(12, "IRP-241", "IRP-169  Avec completion auto, sélection de plusieurs personne."                                                                                                                                              ),
(12, "IRP-240", "IRP-169  Faire une page dédiée pour l'envoie de sms afin de gérer les crises."                                                                                                                                ),
(12, "IRP-238", "SMSManager : gérer les tris sur les SMSGrids"                                                                                                                                                                 ),
(12, "IRP-237", "mauvaise collation pour intervention_etat"                                                                                                                                                                    ),
(12, "IRP-236", "CSS : -moz-border-radius a remplacer par border-radius"                                                                                                                                                       ),
(12, "IRP-234", "Bilan : Mise a jour des Checkbox : décocher la checkbox n'est pas sauvegardé"                                                                                                                                 ),
(12, "IRP-233", "Pb affichage lors de l'ajout des équipiers"                                                                                                                                                                   ),
(12, "IRP-223", "Script d'import des données du siord"                                                                                                                                                                         ),
(12, "IRP-218", "Fin de vacation le dispositif ne disparait pas"                                                                                                                                                               ),
(12, "IRP-195", "Disparition dispositif"                                                                                                                                                                                       ),
(12, "IRP-187", "Renforcer les controles de gestions sur l'ajouter/modification d'un équipier"                                                                                                                                 ) 
;





INSERT INTO `sms_type` (`label_sms_type`) VALUES ('Envoie Détails Intervention');
INSERT INTO `sms_type` (`label_sms_type`) VALUES ('Message vers équipiers du dispositif');
INSERT INTO `sms_type` (`label_sms_type`) VALUES ('Message vers équipiers via le SMS Manager');
INSERT INTO `sms_type` (`label_sms_type`) VALUES ('Message recu via le SMS Manager');
INSERT INTO `sms_type` (`label_sms_type`) VALUES ('N/A');

update sms_type set id_sms_type = 0 where id_sms_type = 5;
ALTER TABLE `sms_type` AUTO_INCREMENT = 5;



INSERT INTO `equipier` (`id_equipier`, `id_dispositif`, `nivol`, `equipier_is_male`, `enabled`, `nom`, `prenom`, `mobile`, `email`, `id_delegation`, `autre_delegation`) 
VALUES (1,0,'75233A',1,1,'Manson','Thomas','0664664296','mt@mansonthomas.com',42,NULL);

insert into `user` ( `id_equipier`, `password`,`enabled`, `id_regulation` )
values
(1  ,md5('TEST'  ), true,0 );    
-- '75233A'      'Manson'    , 'Thomas');

insert into `user_roles` ( `id_user`, `id_role`)
values
(1  ,1 );  

insert into `equipier_roles` ( `id_equipier`, `id_role_equipier`,`en_evaluation`, `evaluateur`)
values
(1  ,7 ,0 , 0),
(1  ,8 ,0 , 0),
(1  ,9 ,0 , 0),
(1  ,10,0 , 0),
(1  ,11,0 , 0);


insert into regulation (`start_date` ,`expected_end_date` ,`open`,`id_regulateur`,`label` ,`comment` )
values
(NOW()            , ADDDATE(NOW(),1 ), true , 1, 'Régulation Paris' , 'Régulation Permanente');


INSERT INTO `siord_synchro_type` VALUES 
(1,'membres'),
(2,'activitées');

INSERT INTO `siord_membres_import_status_def` VALUES 
(1,'Importé avec Succès'),
(2,'Echec : Non Importé'),
(3,'Utilisateur désactivé (droits=999)'),
(4,'NIVOL déjà présent dans la base CRF RDP'),
(5,'ID Delegation non reconnu'),
(6,'utilisateur de test ou anonyme'),
(7,'Format du NIVOL incorrect'),
(8,'Tel n''est pas un tel portable'),
(9,'email non valide'),
(10,'délégation non trouvée'),
(11,'Membre en mise a jour depuis le SIORD, mais n''existe pas dans la base CRFRDP'),
(12,'Email déjà présent dans la base de CRF-RDP => doublons'),
(13,'mobile déjà présent dans la base de CRF-RDP => doublons');

INSERT INTO `crfrdp`.`siord_synchro` (`id_synchro_type`, `synchro_date_start`, `synchro_date_end`, `last_imported_id`, `sucessfull_import`, `warning_import`, `failed_import`) 
VALUES (1, DATE ('1970-01-01'), DATE ('1970-01-01'), 0, true, false, false);
INSERT INTO `crfrdp`.`siord_synchro` (`id_synchro_type`, `synchro_date_start`, `synchro_date_end`, `last_imported_id`, `sucessfull_import`, `warning_import`, `failed_import`) 
VALUES (2, DATE ('1970-01-01'), DATE ('1970-01-01'), 0, true, false, false);
commit;