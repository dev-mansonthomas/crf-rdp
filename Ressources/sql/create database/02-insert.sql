use crfrdp;

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
 (10,0,'N/A'                      ,'N/A'       ,'N/A'        ,'');

UPDATE `lieu_type` SET `id_type_lieu` = 0 WHERE `id_type_lieu` = 10;
ALTER TABLE `lieu_type` AUTO_INCREMENT = 10;

INSERT INTO `lieu` (`id_lieu`, `id_type_lieu`, `icon`, `icon_gmap_init`, `nom`, `addresse`, `code_postal`, `ville`, `google_coords_lat`, `google_coords_long`, `info_complementaire`) VALUES (1,3,NULL,NULL,'VANVES - MALAKOFF','1 ter, rue Aristide Briand','92170','VANVES',0.000000,0.000000,NULL),(2,3,NULL,NULL,'CHATILLON','Espace Maison Blanche - Avenue Saint-Exupéry','92320','CHATILLON',0.000000,0.000000,NULL),(3,3,NULL,NULL,'MONTROUGE','45, Ave Verdier','92120','MONTROUGE',0.000000,0.000000,NULL),(4,3,NULL,NULL,'BAGNEUX','28, Avenue Paul Vaillant Couturier','92220','BAGNEUX',0.000000,0.000000,NULL),(5,3,NULL,NULL,'ANTONY','49, avenue Leon Jouhaux','92160','ANTONY',0.000000,0.000000,NULL),(6,3,NULL,NULL,'BOURG-LA-REINE','17, avenue de Montrouge','92340','Bourg-la-Reine',0.000000,0.000000,NULL),(7,3,NULL,NULL,'CHÂTENAY-MALABRY','35, Rue Jean Longuet - BP23','92292','CHATENAY-MALABRY',0.000000,0.000000,NULL),(8,3,NULL,NULL,'FONTENAY-AUX-ROSES','27 ter, Ave du Gal Leclerc','92260','FONTENAY-AUX-ROSES',0.000000,0.000000,NULL),(9,3,NULL,NULL,'SCEAUX','12, Rue Marguerite Renaudin','92330','SCEAUX',0.000000,0.000000,NULL),(10,3,NULL,NULL,'ISSY-LES-MOULINEAUX','14 bis, Rue du Chevalier de la Barre','92130','ISSY-LES-MOULINEAUX',0.000000,0.000000,NULL),(11,3,NULL,NULL,'ASNIERES','8, rue Armand Numes','92600','Asnières Sur Seine',0.000000,0.000000,NULL),(12,3,NULL,NULL,'BOIS-COLOMBES','3, Ave Villebois Mareuil','92270','BOIS-COLOMBES',0.000000,0.000000,NULL),(13,3,NULL,NULL,'BOULOGNE','11, Rue de Clamart','92100','BOULOGNE',0.000000,0.000000,NULL),(14,3,NULL,NULL,'CHAVILLE','1, rue du Gros Chêne','92370','CHAVILLE',0.000000,0.000000,NULL),(15,3,NULL,NULL,'CLAMART','183, rue de la Porte de Trivaux','92140','CLAMART',0.000000,0.000000,NULL),(16,3,NULL,NULL,'CLICHY','39, Rue du Landy','92110','CLICHY',0.000000,0.000000,NULL),(17,3,NULL,NULL,'COLOMBES','32, Bvd des Oiseaux ','92700','COLOMBES',0.000000,0.000000,NULL),(18,3,NULL,NULL,'COURBEVOIE','45, rue des Minimes','92400','COURBEVOIE',0.000000,0.000000,NULL),(19,3,NULL,NULL,'GARCHES','7, rue des Suisses','92380','GARCHES',0.000000,0.000000,NULL),(20,3,NULL,NULL,'GENNEVILLIERS','64, Ave Jean-Jaurès','92230','GENNEVILLIERS',0.000000,0.000000,NULL),(21,3,NULL,NULL,'LA GARENNE-COLOMBES','68, Rue des Champs Philippe','92250','LA GARENNE-COLOMBES',0.000000,0.000000,NULL),(22,3,NULL,NULL,'MEUDON','4, Ave Louvois','92190','MEUDON',0.000000,0.000000,NULL),(23,3,NULL,NULL,'NANTERRE','131, Avenue Hoche','92000','NANTERRE',0.000000,0.000000,NULL),(24,3,NULL,NULL,'NEUILLY/LEVALLOIS','23, Rue du Château / Neuilly','92200','NEUILLY/LEVALLOIS',0.000000,0.000000,NULL),(25,3,NULL,NULL,'PUTEAUX','Rue Chantecoq','92800','PUTEAUX',0.000000,0.000000,NULL),(26,3,NULL,NULL,'RUEIL-MALMAISON','20, Rue Michelet','92500','RUEIL-MALMAISON',0.000000,0.000000,NULL),(27,3,NULL,NULL,'SAINT-CLOUD','32, Rue du 18 Juin 1940','92210','SAINT-CLOUD',0.000000,0.000000,NULL),(28,3,NULL,NULL,'SEVRES/VILLE D AVRAY','99, Grande Rue','92310','SEVRES',0.000000,0.000000,NULL),(29,3,NULL,NULL,'SURESNES','20, Rue Merlin de Thionville','92150','SURESNES',0.000000,0.000000,NULL),(30,3,NULL,NULL,'VAUCRESSON','15, Allée des Grandes Fermes','92420','VAUCRESSON',0.000000,0.000000,NULL),(31,3,NULL,NULL,'PARIS - XIV','7, RUE CHARLES DIVRY','75014','Paris',0.000000,0.000000,NULL),(32,3,NULL,NULL,'PARIS - XV','41, RUE DES PERICHAUX','75015','Paris',0.000000,0.000000,NULL),(33,3,NULL,NULL,'PARIS - XIII','6, PLACE D\'ITALIE','75013','Paris',0.000000,0.000000,NULL),(34,3,NULL,NULL,'PARIS - XII','2, RUE ELISA LEMMONIER','75012','Paris',0.000000,0.000000,NULL),(35,3,NULL,NULL,'PARIS - XI','12, RUE AUGUSTE LAURENT','75011','Paris',0.000000,0.000000,NULL),(36,3,NULL,NULL,'PARIS - X','14, RUE CAFARELLI','75003','PARIS',0.000000,0.000000,NULL),(37,3,NULL,NULL,'PARIS - IX','14, RUE PIERRE SEMARD','75009','PARIS',0.000000,0.000000,NULL),(38,3,NULL,NULL,'PARIS - VIII','17, RUE DE MOSCOU','75008','Paris',0.000000,0.000000,NULL),(39,3,NULL,NULL,'PARIS - VII','51, RUE DE BABYLONE','75007','Paris',0.000000,0.000000,NULL),(40,3,NULL,NULL,'PARIS - VI','1, RUE BLAISE DESGOFFE','75006','Paris',0.000000,0.000000,NULL),(41,3,NULL,NULL,'PARIS - V','9, RUE LAPLACE','75005','Paris',0.000000,0.000000,NULL),(42,3,NULL,NULL,'PARIS - IV','36, rue Geoffroy l\'Asnier','75004','PARIS',0.000000,0.000000,NULL),(43,3,NULL,NULL,'PARIS - I','1, RUE D\'ABOUKIR','75002','Paris ',0.000000,0.000000,NULL),(44,3,NULL,NULL,'PARIS - XVI','68, RUE DE PASSY','75016','Paris',0.000000,0.000000,NULL),(45,3,NULL,NULL,'PARIS - XVII','2, rue Claude Pouillet','75017','Paris',0.000000,0.000000,NULL),(46,3,NULL,NULL,'PARIS - XVIII','16, PLACE DES ABBESSES','75018','Paris',0.000000,0.000000,NULL),(47,3,NULL,NULL,'PARIS - XIX','10, AVENUE MODERNE','75019','Paris',0.000000,0.000000,NULL),(48,3,NULL,NULL,'PARIS - XX','66, RUE DES COURONNES','75020','Paris',0.000000,0.000000,NULL),(49,3,NULL,NULL,'Le Vésinet','1, rue Alexandre Dumas','78110','Le Vésinet',0.000000,0.000000,NULL),(50,3,NULL,NULL,'St Quentin en Yvelines','rue du Moulin Renard','78280','Guyancourt',0.000000,0.000000,NULL),(51,3,NULL,NULL,'Poissy','14, Rue Gérard Bongard','78300','Poissy',0.000000,0.000000,NULL),(52,3,NULL,NULL,'St Germain en Laye','6, rue Jean Baptiste Lulli','78100','St Germain en Laye',0.000000,0.000000,NULL),(53,3,NULL,NULL,'Sartrouville','25, rue Faidherbe','78500','Sartrouville',0.000000,0.000000,NULL),(54,3,NULL,NULL,'Versailles','17, rue Berthier','78000','Versailles',0.000000,0.000000,NULL),(55,3,NULL,NULL,'Viroflay','185, bis av Gal Leclerc','78220','Viroflay',0.000000,0.000000,NULL),(56,3,NULL,NULL,'Houilles','88, rue Diderot','78800','Houilles',0.000000,0.000000,NULL),(57,3,NULL,NULL,'CLAYE','5, PLACE CUSINO','77290','MITRY MORY',0.000000,0.000000,NULL),(58,3,NULL,NULL,'LAGNY','2, avenue du général Leclerc','77400','Lagny',0.000000,0.000000,NULL),(59,3,NULL,NULL,'MELUN','37, rue des mezereaux','77000','MELUN',0.000000,0.000000,NULL),(60,3,NULL,NULL,'ALFORTVILLE - MAISONS-ALFORT','17, rue de mercure','94700','Maisons-Alfort',0.000000,0.000000,NULL),(61,3,NULL,NULL,'ARCUEIL - CACHAN','23, rue Guichard','94230','Cachan',0.000000,0.000000,NULL),(62,3,NULL,NULL,'BONNEUIL SUR MARNE','6, rue du Chemin Vert','94380','Bonneuil sur Marne',0.000000,0.000000,NULL),(63,3,NULL,NULL,'BRY SUR MARNE','44, bd Galliéni','94360','Bry sur Marne',0.000000,0.000000,NULL),(64,3,NULL,NULL,'CHAMPIGNY SUR MARNE','7, square Georges Pitoëff','94500','Champigny sur Marne',0.000000,0.000000,NULL),(65,3,NULL,NULL,'CHARENTON - SAINT MAURICE','91, rue du petit chateau','94220','charenton',0.000000,0.000000,NULL),(66,3,NULL,NULL,'CHENNEVIÈRES SUR MARNE','Le Fort 140 bis rue Aristide Briand','94430','Chennevières sur Marne',0.000000,0.000000,NULL),(67,3,NULL,NULL,'CHOISY - THIAIS - CHEVILLY','27 Bd des Alliées','94600','Choisy le Roi',0.000000,0.000000,NULL),(68,3,NULL,NULL,'CRÉTEIL','60, rue de Falkirk','94000','Créteil',0.000000,0.000000,NULL),(69,3,NULL,NULL,'FONTENAY SOUS BOIS','11, rue Michelet','94120','Fontenay sous Bois',0.000000,0.000000,NULL),(70,3,NULL,NULL,'IVRY SUR SEINE','40, rue Jean Jacques Rousseau','94200','Ivry sur Seine',0.000000,0.000000,NULL),(71,3,NULL,NULL,'JOINVILLE LE PONT','20, rue de Paris','94340','Joinville le Pont',0.000000,0.000000,NULL),(72,3,NULL,NULL,'L HAY LES ROSES','2, allée du Stade','94240','L\'Hay les Roses',0.000000,0.000000,NULL),(73,3,NULL,NULL,'GENTILLY - KREMLIN-BICÊTRE - VILLEJUIF','55, rue de Verdun','94800','Villejuif',0.000000,0.000000,NULL),(74,3,NULL,NULL,'LE PERREUX SUR MARNE','34, av Georges Clémenceau','94170','Le Perreux sur Marne',0.000000,0.000000,NULL),(75,3,NULL,NULL,'NOGENT SUR MARNE','6, square Tino Rossi','94130','Nogent sur Marne',0.000000,0.000000,NULL),(76,3,NULL,NULL,'LA QUEUE EN BRIE - ORMESSON-NOISEAU','19, rue d\'Aguesseau','94490','Ormesson sur Marne',0.000000,0.000000,NULL),(77,3,NULL,NULL,'FRESNES - RUNGIS','2, rue de la Pirouette','94150','Rungis',0.000000,0.000000,NULL),(78,3,NULL,NULL,'SAINT MAUR DES FOSSÉS','2, logis de la Pie','94100','Saint Maur des Fossés',0.000000,0.000000,NULL),(79,3,NULL,NULL,'SUCY EN BRIE','52, route de la Queue en Brie','94370','Sucy en Brie',0.000000,0.000000,NULL),(80,3,NULL,NULL,'ABLON - ORLY - VILLENEUVE LE ROI','41, rue du Maréchal Maunoury','94290','Villeneuve le Roi',0.000000,0.000000,NULL),(81,3,NULL,NULL,'VILLENEUVE SAINT GEORGES - VALENTON','C. Commercial Sellier - rue Henri Sellier','94190','Villeneuve St Georges',0.000000,0.000000,NULL),(82,3,NULL,NULL,'VILLIERS SUR MARNE','12, rue Marthe Debaize','94350','Villiers sur Marne',0.000000,0.000000,NULL),(83,3,NULL,NULL,'VINCENNES','25, rue de Lagny ','94300','Vincennes',0.000000,0.000000,NULL),(84,3,NULL,NULL,'VITRY SUR SEINE','138, rue Malleret de Joinville BP74','94403','Vitry sur Seine',0.000000,0.000000,NULL),(85,3,NULL,NULL,'ARGENTEUIL','2, Rue Paul Vaillant Couturier','95104','ARGENTEUIL CEDEX',0.000000,0.000000,NULL),(86,3,NULL,NULL,'BEAUMONT SUR OISE','2, Avenue Anatole France','95260','BEAUMONT SUR OISE',0.000000,0.000000,NULL),(87,3,NULL,NULL,'BORDS DE SEINE','20, Rue Pierre Brossolette - BP 26','95240','CORMEILLES EN PARISIS',0.000000,0.000000,NULL),(88,3,NULL,NULL,'DEUIL','12, rue bourgeois ','95170','DEUIL LA BARRE',0.000000,0.000000,NULL),(89,3,NULL,NULL,'DOMONT','Rue de l\'église BP 18','95330','DOMONT',0.000000,0.000000,NULL),(90,3,NULL,NULL,'ENGHIEN','6, Rue de la Barre','95880','ENGHIEN',0.000000,0.000000,NULL),(91,3,NULL,NULL,'PARISIS','9, rue d\'Ermont','95130','FRANCONVILLE',0.000000,0.000000,NULL),(92,3,NULL,NULL,'VALLEE DE L OURCQ','Rue d\'Orgemont BP 73','95500','GONESSE',0.000000,0.000000,NULL),(93,3,NULL,NULL,'BERGES DE L OISE','41, Rue de Villiers Adam','95290','L\'ISLE ADAM',0.000000,0.000000,NULL),(94,3,NULL,NULL,'LUZARCHES','1, Rue du Moanda','95270','LUZARCHES',0.000000,0.000000,NULL),(95,3,NULL,NULL,'MONTMORENCY','2, rue Corneilles','95160','MONTMORENCY',0.000000,0.000000,NULL),(96,3,NULL,NULL,'PORTES DU VEXIN','2, rue Claude Debussy','95300','PONTOISE',0.000000,0.000000,NULL),(97,3,NULL,NULL,'SAINT GRATIEN','33, rue des Raguenets','95210','ST GRATIEN',0.000000,0.000000,NULL),(98,3,NULL,NULL,'SAINT BRICE','85, Rue de Paris','95350','St BRICE SOUS FORET',0.000000,0.000000,NULL),(99,3,NULL,NULL,'SARCELLES','12, Allée Bernard Palissy','95200','SARCELLES',0.000000,0.000000,NULL),(100,3,NULL,NULL,'PORTES DE FRANCE','30, Avenue Henri Barbusse','95471','FOSSES',0.000000,0.000000,NULL),(101,3,NULL,NULL,'BOIS DE LA PLAINE','Domaine du Tertre - 42 rue Auguste Godard','95150','TAVERNY',0.000000,0.000000,NULL),(102,3,NULL,NULL,'VEXIN FRANÇAIS','Salle du grand pré','95640','MARINES',0.000000,0.000000,NULL),(103,3,NULL,NULL,'LES MUREAUX','23, rue Carnot','78130','Les Mureaux',0.000000,0.000000,NULL),(104,3,NULL,NULL,'CHALLANS','8, rue de la Poctière','85300','Challans',0.000000,0.000000,NULL),(105,3,NULL,NULL,'FONTENAY LE COMTE','4, rue du Chatêau','85200','fontenay le Comte',0.000000,0.000000,NULL),(106,3,NULL,NULL,'LA ROCHE SUR YON','159, Boulevard Edouard Branly','85000','La Roche sur Yon',0.000000,0.000000,NULL),(107,3,NULL,NULL,'LES SABLES D\'OLONNE','Centre Hospitalier - 44 Bd Pasteur','85119','Les Sables d\'Olonne',0.000000,0.000000,NULL),(108,3,NULL,NULL,'LUÇON','11, Rue de l\'Hôpital','85400','Luçon',0.000000,0.000000,NULL),(109,3,NULL,NULL,'LES HERBIERS','86, Rue Nationale ','85500','Les Herbiers',0.000000,0.000000,NULL),(110,3,NULL,NULL,'AMBOISE-CHÂTEAU RENAULT','1, Rue GERMAIN CHAUVEAU','37400','AMBOISE',0.000000,0.000000,NULL),(111,3,NULL,NULL,'Azay Le Rideau','10, Rue du COMMERCE','37510','BALLAN MIRE',0.000000,0.000000,NULL),(112,3,NULL,NULL,'EST TOURANGEAU - BLERE - VOUVRILLON','13, Rue P. L. COURIER','37150','BLERE',0.000000,0.000000,NULL),(113,3,NULL,NULL,'BOURGUEIL','BP 29','37140','BOURGUEIL',0.000000,0.000000,NULL),(114,3,NULL,NULL,'CHINON STE MAURE','16, Rue PAUL HUET','37500','CHINON',0.000000,0.000000,NULL),(115,3,NULL,NULL,'LOCHES - MONTRESOR','14, Rue DU DOCTEUR MARTINAIS','37600','LOCHES',0.000000,0.000000,NULL),(116,3,NULL,NULL,'HAUTE TOURAINE','15, Rue SAINT PIERRE','37290','PREUILLY SUR CLAISE',0.000000,0.000000,NULL),(117,3,NULL,NULL,'TOURS PLUS','25, Rue BRETONNEAU','37000','TOURS',0.000000,0.000000,NULL),(118,3,NULL,NULL,'4 GARES','121, rue de Saint-Gratien','95120','ERMONT',0.000000,0.000000,NULL),(119,3,NULL,NULL,'COTEAUX','2, rue Corneilles','95160','MONTMORENCY',0.000000,0.000000,NULL),(120,3,NULL,NULL,'PIERRE TURQUAISE','2, RUE ANATOLE FRANCE','95260','BEAUMONT SUR OISE',0.000000,0.000000,NULL),(121,3,NULL,NULL,'PLAINE DE FRANCE','BP 30018','95331','DOMONT CEDEX',0.000000,0.000000,NULL),(122,3,NULL,NULL,'VAL DE FRANCE','12, Allée Bernard PALISSY','95200','SARCELLES',0.000000,0.000000,NULL),(123,3,NULL,NULL,'ORLÉANS','69, bis rue des Anguignis','45650','St Jean Le Blanc',0.000000,0.000000,NULL),(124,3,NULL,NULL,'MONTARGIS','105, rue COQUILLET','45200','MONTARGIS',0.000000,0.000000,NULL),(125,3,NULL,NULL,'GIEN','1, rue Marius RAIMBAULT','45500','GIEN',0.000000,0.000000,NULL),(126,3,NULL,NULL,'CORBEIL ESSONNES','100, Boulevard DE FONTAINEBLEAU','91100','CORBEIL ESSONNES',0.000000,0.000000,NULL),(127,3,NULL,NULL,'VAL D YERRES','BP 116','91331','YERRES CEDEX',0.000000,0.000000,NULL),(128,3,NULL,NULL,'LA FERTE ALAIS','BP 08','91760','ITTEVILLE',0.000000,0.000000,NULL),(129,3,NULL,NULL,'LA PYRAMIDE','9, Rue Camille Flammarion BP 22','91265','JUVISY SUR ORGE CEDEX',0.000000,0.000000,NULL),(130,3,NULL,NULL,'VIRY CHATILLON','9, Avenue DU BELLAY','91170','VIRY CHATILLON',0.000000,0.000000,NULL),(131,3,NULL,NULL,'DEUX RIVIERES','2, Rue du Dauphiné','91300','MASSY',0.000000,0.000000,NULL),(132,3,NULL,NULL,'VALLEES BIEVRE YVETTE','7, Place de la victoire','91120','PALAISEAU',0.000000,0.000000,NULL),(133,3,NULL,NULL,'VAL D ORGE','76, Rue DE LIERS','91240','ST MICHEL SUR ORGE',0.000000,0.000000,NULL),(134,3,NULL,NULL,'ARPAJONNAIS','2, Boulevard EUGENE LAGAUCHE','91180','ST GERMAIN LES ARPAJON',0.000000,0.000000,NULL),(135,3,NULL,NULL,'DEUX TOURS','35, Rue EDOUARD DANAUX','91220','BRETIGNY SUR ORGE',0.000000,0.000000,NULL),(136,3,NULL,NULL,'DRAVEIL','84, Boulevard HENRI BARBUSSE','91210','DRAVEIL',0.000000,0.000000,NULL),(137,3,NULL,NULL,'ETAMPES','142, Rue SAINT JACQUES','91150','ETAMPES',0.000000,0.000000,NULL),(138,3,NULL,NULL,'LIMOURS','Rue du Saut du Loup BP 15','91470','LIMOURS',0.000000,0.000000,NULL),(139,3,NULL,NULL,'MILLY-MAISSE','41, Rue LANGLOIS','91490','MILLY LA FORET',0.000000,0.000000,NULL),(140,3,NULL,NULL,'SAINT CHERON','47 A, Route D\'ARPAJON','91650','BREUILLET',0.000000,0.000000,NULL),(141,3,NULL,NULL,'EVRY CENTRE ESSONNE ','7, Rue ALPHONSE DAUDET','91000','EVRY',0.000000,0.000000,NULL);


-- lieux
INSERT INTO `lieu` (`id_type_lieu`,`icon`,`icon_gmap_init`,`nom`,`addresse`,`code_postal`,`ville`,`google_coords_lat`,`google_coords_long`,`info_complementaire`) VALUES
 (1,NULL,NULL,'BICHAT - CLAUDE-BERNARD'   ,'46, rue Henri-Huchard','75018','Paris',48.899136,2.334483,NULL),
 (1,NULL,NULL,'HOTEL-DIEU'                ,'1, place du Parvis Notre-Dame','75004','Paris',48.853264,2.348034,'<b>Attention : </b> Entrée des urgence a changé'),
 (1,NULL,NULL,'LARIBOISIERE'              ,'9, rue Ambroise Paré','75010','Paris',48.881939,2.352589,NULL),
 (2,NULL,NULL,'Rousseau'                  ,'21, rue du Jour','75001','Paris',48.863880,2.344957,NULL),
 (2,NULL,NULL,'Sévigné'                   ,'7, rue Sévigné','75004','Paris',48.855671,2.362153,NULL),
 (2,NULL,NULL,'Dauphine'                  ,'2, rue François Millet','75016','Paris',48.850437,2.273220,NULL),
 (2,NULL,NULL,'Montmartre'                ,'12, rue Carpeaux','75018','Paris',48.891346,2.332324,NULL),
 (4,NULL,NULL,'Station Total Victor Hugo' ,'183, avenue Victor Hugo','75016','Paris',48.865891,2.276386,NULL),
 (5,NULL,NULL,'Le Pied de Cochon'         ,'6, rue Coquillière','75001','Paris',48.863377,2.343667,NULL),
 (6,NULL,NULL,'Pharmacie Les Champs'      ,'84, avenue des Champs-Elysées','75008','Paris',48.871059,2.303572,NULL),
 (6,NULL,NULL,'Pharmacie Européenne'      ,'6, place Clichy','75009','Paris',48.883270,2.327567,NULL),
 (6,NULL,NULL,'Grande Pharmacie Daumesnil','6, place Félix Eboué','75012','Paris',48.839417,2.395632,NULL),
 (7,NULL,NULL,'Commissariat Central, 20eme','48, avenue Gambetta','75020','Paris',48.865781,2.39925,NULL),
 (7,NULL,NULL,'Commissariat Central, 19eme','3, rue Erik Satie','75019','Paris',48.884248,2.38627,'S.A.R.I.J Service Accueil Recherche Investigation Judiciaire'),
 (7,NULL,NULL,'Commissariat Central, 15eme','250 rue Vaugirard','75015','Paris',48.839833,2.302275,'U.P.Q Unité Police Quartier St Lambert - S.A.R.I.J Service Accueil Recherche Investigation Judiciaire'),
 (0,NULL,NULL,'N/A','N/A','N/A','N/A',0,0,'N/A');

UPDATE `lieu` SET `id_lieu` = 0 WHERE `id_lieu` = 157;
ALTER TABLE `lieu` AUTO_INCREMENT = 157;



INSERT INTO `delegation` (`id_delegation`, `nom`, `departement`, `telephone`, `mobile`, `mail`, `web`, `id_lieu`) VALUES (1,'VANVES - MALAKOFF','92170','0146452030','0664498518','dl.vanvesmalakoff@croix-rouge.fr','http://vanvesmalakoff.croix-rouge.fr',1),(2,'CHATILLON','92320','0140928084','0661944410','','',2),(3,'MONTROUGE','92120','0146579530','0665336216','dlusmontrouge@yahoo.fr','http://montrouge.croix-rouge.fr',3),(4,'BAGNEUX','92220','0145361710','0664024904','dl.bagneux@croix-rouge.fr','http://bagneux.croix-rouge.fr',4),(5,'ANTONY','92160','0146663947','0661266385','dl.antony@croix-rouge.fr','http://antony.croix-rouge.fr/',5),(6,'BOURG-LA-REINE','92340','0146646877','0665539826','dl.bourglareine@croix-rouge.fr','http://bourglareine.croix-rouge.fr',6),(7,'CHÂTENAY-MALABRY','92292','0141137282','0668171092','sabrina.laurendeau@yahoo.fr','',7),(8,'FONTENAY-AUX-ROSES','92260','0147021833','0682172326','dl.fontenayauxroses@croix-rouge.fr','',8),(9,'SCEAUX','92330','0147027597','','','',9),(10,'ISSY-LES-MOULINEAUX','92130','0140935016','0664498479','crf.issy@free.fr','http://issylesmoulineaux.croix-rouge.fr/',10),(11,'ASNIERES','92600','0147933270','0607741980','dl.asnieres@croix-rouge.fr','http://asnieres.croix-rouge.fr',11),(12,'BOIS-COLOMBES','92270','0147822424','0664498485','dl.boiscolombes@croix-rouge.fr','http://boiscolombes.croix-rouge.fr/',12),(13,'BOULOGNE','92100','0146215356','0624664167','dl.boulogne@croix-rouge.fr','',13),(14,'CHAVILLE','92370','0147503800','0699476890','dl.chaville@croix-rouge.fr','http://chaville.croix-rouge.fr',14),(15,'CLAMART','92140','0146321214','0663826465','dl.clamart@croix-rouge.fr','http://clamart.croix-rouge.fr/',15),(16,'CLICHY','92110','0147371639','','','',16),(17,'COLOMBES','92700','0142422461','','','http://colombes.croix-rouge.fr/',17),(18,'COURBEVOIE','92400','','0650573400','dl.courbevoie@croix-rouge.fr','http://courbevoie.croix-rouge.fr',18),(19,'GARCHES','92380','0147951864','','direction@crf-garches.com','www.crf-garches.com',19),(20,'GENNEVILLIERS','92230','0147994116','','','',20),(21,'LA GARENNE-COLOMBES','92250','0147822463','0663339218','dl.lagarennecolombes@croix-rouge.fr','lagarennecolombes.croix-rouge.fr',21),(22,'MEUDON','92190','0146231118','0609884341','dl.meudon@croix-rouge.fr','http:\\\\meudon.croix-rouge.fr',22),(23,'NANTERRE','92000','0147259697','0607221894','topaze9225@gmail.com','http://nanterre.croix-rouge.fr/',23),(24,'NEUILLY/LEVALLOIS','92200','0146240986','0622296572','','',24),(25,'PUTEAUX','92800','0147761118','0614323891','dl.puteaux@croix-rouge.fr','http://puteaux.croix-rouge.fr',25),(26,'RUEIL-MALMAISON','92500','0147519947','0609510723','crf.rueil@free.fr','',26),(27,'SAINT-CLOUD','92210','','0664421888','escr9229@yahoo.fr','http://saintcloud.croix-rouge.fr',27),(28,'SEVRES/VILLE D AVRAY','92310','0145071360','','dl.sevres@croix-rouge.fr','',28),(29,'SURESNES','92150','0147724526','0664498560','dl.suresnes@croix-rouge.fr','http://suresnes.croix-rouge.fr',29),(30,'VAUCRESSON','92420','0147952785','0664498512','dl.vaucresson@croix-rouge.fr','',30),(31,'PARIS - XIV','75014','0145415876','','dlus@dl14.crf75.org','http://paris14.croix-rouge.fr',31),(32,'PARIS - XV','75015','0148280315','0663390354','dlus7515@yahoo.fr','http://paris15.croix-rouge.fr/ ',32),(33,'PARIS - XIII','75013','0147070947','','','',33),(34,'PARIS - XII','75012','0143408010','0608546728','','',34),(35,'PARIS - XI','75011','0143798510','0684515764','dl.paris11@croix-rouge.fr','http://paris11.croix-rouge.fr',35),(36,'PARIS - X','75003','0142779563','','','',36),(37,'PARIS - IX','75009','0148786387','0699407509','dl.paris09@croix-rouge.fr','http://paris09.croix-rouge.fr/',37),(38,'PARIS - VIII','75008','0153040140','0664497651','topaze@crf-paris8.org','http://paris08.croix-rouge.fr',38),(39,'PARIS - VII','75007','0145513444','0629159086','dl.paris07@croix-rouge.fr','http://paris07.croix-rouge.fr/',39),(40,'PARIS - VI','75006','0142224685','0624244172','dl.paris06@croix-rouge.fr','http://paris06.croix-rouge.fr/',40),(41,'PARIS - V','75005','0871127505','','dl7505@free.fr','',41),(42,'PARIS - IV','75004','0142747380','','','',42),(43,'PARIS - I','75002','0142331476','0664498535','','',43),(44,'PARIS - XVI','75016','0142885669','','','http://paris16.croix-rouge.fr/',44),(45,'PARIS - XVII','75017','0146220209','','dl.paris17@croix-rouge.fr','paris17.croix-rouge.fr',45),(46,'PARIS - XVIII','75018','0142621376','0664498445','dl7518@free.fr','http://paris18.croix-rouge.fr/',46),(47,'PARIS - XIX','75019','0142492044','','dlus@dl19.crf75.org','',47),(48,'PARIS - XX','75020','0146363031','','','',48),(49,'Le Vésinet','78110','0139520288','0613292547','dl.levesinet@croix-rouge.fr','',49),(50,'St Quentin en Yvelines','78280','0130489217','0628536851','crf7815@yahoo.fr','http://sqy.croix-rouge.fr',50),(51,'Poissy','78300','0139119039','0672006885','crf_poissy_secourisme@yahoo.fr','http://poissy.croix-rouge.fr/',51),(52,'St Germain en Laye','78100','0134511536','0682679404','dl.stgermainenlaye@croix-rouge.fr','http://saintgermain.croix-rouge.fr',52),(53,'Sartrouville','78500','0139144446','0684344271','crf.sartrouville-secourisme@laposte.net','http://sartrouville.croix-rouge.fr/',53),(54,'Versailles','78000','0139501194','0615644121','dlus7825@croix-rouge.fr, crf7825@gmail.com','http://versailles.croix-rouge.fr/',54),(55,'Viroflay','78220','0130242159','0627422098','dl.viroflay@croix-rouge.fr','http://viroflay.croix-rouge.fr',55),(56,'Houilles','78800','0130869272','0686504902','dl.houillescarrieres@croix-rouge.fr','http:\\\\houillescarrieres.croix-rouge.fr',56),(57,'CLAYE','77290','0952357705','0686406361','dl.croix.rouge.7705@free.fr','',57),(58,'LAGNY','77400','0160076873','','dl.lagnysurmarne@croix-rouge.fr','http://lagnysurmarne.croix-rouge.fr/',58),(59,'MELUN','77000','0160680180','0617244394','crfmelun@gmail.com','http://melun.croix-rouge.fr',59),(60,'ALFORTVILLE - MAISONS-ALFORT','94700','0953099425','0664789425','dl.maisons-alfort@croix-rouge.fr','http://maisonsalfort.croix-rouge.fr',60),(61,'ARCUEIL - CACHAN','94230','0146650185','0664900587','action9403@crf94.org','http://arcueilcachan.croix-rouge.fr',61),(62,'BONNEUIL SUR MARNE','94380','0143390601','','9405@crf94.org','',62),(63,'BRY SUR MARNE','94360','0149837333','0687656835','dl.brysurmarne@croix-rouge.fr','http://brysurmarne.croix-rouge.fr/',63),(64,'CHAMPIGNY SUR MARNE','94500','0148824711','0621771199','9408@crf94.org ; gkerirzin@yahoo.fr','',64),(65,'CHARENTON - SAINT MAURICE','94220','0148937700','','9409@crf94.org','',65),(66,'CHENNEVIÈRES SUR MARNE','94430','0145942228','','9410@crf94.org','',66),(67,'CHOISY - THIAIS - CHEVILLY','94600','0148522434','','9412@crf94.org','',67),(68,'CRÉTEIL','94000','0143990003','','9413@crf94.org','http://creteil.croix-rouge.fr',68),(69,'FONTENAY SOUS BOIS','94120','0143942170','','dl.fontenay@croix-rouge.fr','http://fontenaysousbois.croix-rouge.fr',69),(70,'IVRY SUR SEINE','94200','0146580972','','9417@crf94.org','',70),(71,'JOINVILLE LE PONT','94340','0148861289','','9418@crf94.org','',71),(72,'L HAY LES ROSES','94240','0141240267','','9419@crf94.org','http://lhaylesroses.croix-rouge.fr',72),(73,'GENTILLY - KREMLIN-BICÊTRE - VILLEJUIF','94800','0146770900','','9421@crf94.org','http://villejuif.croix-rouge.fr',73),(74,'LE PERREUX SUR MARNE','94170','0143240744','0628056806','dl.leperreux@croix-rouge.fr','http://leperreux.croix-rouge.fr',74),(75,'NOGENT SUR MARNE','94130','0143241000','','9428@crf94.org','',75),(76,'LA QUEUE EN BRIE - ORMESSON-NOISEAU','94490','0145944694','','9431@crf94.org','',76),(77,'FRESNES - RUNGIS','94150','0149790568','0951789433','9433@crf94.org','http://fresnesrungis.croix-rouge.fr',77),(78,'SAINT MAUR DES FOSSÉS','94100','0143979070','','9435@crf94.org','',78),(79,'SUCY EN BRIE','94370','0149825144','','9438@crf94.org','',79),(80,'ABLON - ORLY - VILLENEUVE LE ROI','94290','0145977919','','villeneuveleroi@crf94.org','villeneuveleroi.croix-rouge.fr',80),(81,'VILLENEUVE SAINT GEORGES - VALENTON','94190','0143826183','','9444@crf94.org','',81),(82,'VILLIERS SUR MARNE','94350','0149306496','','9445@crf94.org','',82),(83,'VINCENNES','94300','0148085158','','9446@crf94.org','',83),(84,'VITRY SUR SEINE','94403','0146819456','','contact@crfvitry.org','',84),(85,'ARGENTEUIL','95104','0139615638','','dl.argenteuilbezons@croix-rouge.fr','',85),(86,'BEAUMONT SUR OISE','95260','0134709634','','dl.beaumontsuroise@croix-rouge.fr','',86),(87,'BORDS DE SEINE','95240','0134507190','','dl.cormeilles@croix-rouge.fr','',87),(88,'DEUIL','95170','0139840338','','dl.deuillabarre@croix-rouge.fr','',88),(89,'DOMONT','95330','0139910520','','dl.domont@croix-rouge.fr','',89),(90,'ENGHIEN','95880','0134280111','0632349127','dl.enghien@croix-rouge.fr','',90),(91,'PARISIS','95130','0134144108','','dl.franconville@croix-rouge.fr','',91),(92,'VALLEE DE L OURCQ','95500','0134539750','','dl.gonesse@croix-rouge.fr','',92),(93,'BERGES DE L OISE','95290','0134692199','','dl.lisleadam@croix-rouge.fr','',93),(94,'LUZARCHES','95270','0130350197','','dl.luzarches@croix-rouge.fr','',94),(95,'MONTMORENCY','95160','0134127660','','dl.montmorency@croix-rouge.fr','',95),(96,'PORTES DU VEXIN','95300','0130734590','','louis.berthorelly@neuf.fr','',96),(97,'SAINT GRATIEN','95210','0134174393','','dl.stgratien@croix-rouge.fr','',97),(98,'SAINT BRICE','95350','0139940455','','dl.stbricesousforet@croix-rouge.fr','',98),(99,'SARCELLES','95200','0139937725','','dl.sarcelles@croix-rouge.fr','',99),(100,'PORTES DE FRANCE','95471','0134682721','','dl.survilliers@croix-rouge.fr','',100),(101,'BOIS DE LA PLAINE','95150','0130409598','','dl.taverny@croix-rouge.fr','',101),(102,'VEXIN FRANÇAIS','95640','0130398846','','dl.vexin@croix-rouge.fr','',102),(103,'LES MUREAUX','78130','','0617656947','topaze.7811@yahoo.fr','',103),(104,'CHALLANS','85300','0251930679','','dl.challans@croix-rouge.fr','',104),(105,'FONTENAY LE COMTE','85200','0251692168','','dl.fontenaylecomte@croix-rouge.fr','',105),(106,'LA ROCHE SUR YON','85000','0251370709','0618455152','dl.larochesuryon@croix-rouge.fr','',106),(107,'LES SABLES D\'OLONNE','85119','0251237223','0614653503','dl.lessablesdolonne@croix-rouge.fr','',107),(108,'LUÇON','85400','0251286373','','dl.lucon@croix-rouge.fr','',108),(109,'LES HERBIERS','85500','0251929508','','dl.lesherbiers@croix-rouge.fr','',109),(110,'AMBOISE-CHÂTEAU RENAULT','37400','0247305258','','dl.amboise@croix-rouge.fr','',110),(111,'Azay Le Rideau','37510','0247679909','','dl.paysindreetcher@croix-rouge.fr','',111),(112,'EST TOURANGEAU - BLERE - VOUVRILLON','37150','0247235062','','dl.blere@croix-rouge.fr','',112),(113,'BOURGUEIL','37140','0247950599','0630281216','dl.bourgueil@croix-rouge.fr','',113),(114,'CHINON STE MAURE','37500','0247930904','','dl.chinon@croix-rouge.fr','',114),(115,'LOCHES - MONTRESOR','37600','0247593492','0247593492','dl.loches@croix-rouge.fr','',115),(116,'HAUTE TOURAINE','37290','0247946210','0247946210','dl.preuillysurclaise@croix-rouge.fr','http://preuilly.croix-rouge.fr',116),(117,'TOURS PLUS','37000','0247613305','0247665775','dl.tours@croix-rouge.fr','',117),(118,'4 GARES','95120','0134159284','','dl.4gares@croix-rouge.fr','http://4gares.croix-rouge.fr',118),(119,'COTEAUX','95160','0134127660','0619560961','','',119),(120,'PIERRE TURQUAISE','95260','0134709634','0621230726','dl.pierreturquaise@croix-rouge.fr','',120),(121,'PLAINE DE FRANCE','95331','0139910520','','','',121),(122,'VAL DE FRANCE','95200','0139937725','','','',122),(123,'ORLÉANS','45650','0238533076','0660321583','adrienmenti@hotmail.com','',123),(124,'MONTARGIS','45200','0238854502','0660321583','gueremy.franck@wanadoo.fr; ddus45@croix-rouge','',124),(125,'GIEN','45500','0238677782','0680284227','ddus45@croix-rouge','',125),(126,'CORBEIL ESSONNES','91100','0164962848','','dl.corbeilessonnes@croix-rouge.fr','',126),(127,'VAL D YERRES','91331','','0698443155','dl.valdyerres@croix-rouge.fr','',127),(128,'LA FERTE ALAIS','91760','0164930302','0677078203','dl.lafertealais@croix-rouge.fr','',128),(129,'LA PYRAMIDE','91265','0169542964','','dl.pyramide@croix-rouge.fr','',129),(130,'VIRY CHATILLON','91170','0169458484','','dl.virychatillon@croix-rouge.fr','http://viry-chatillon.croix-rouge.fr',130),(131,'DEUX RIVIERES','91300','0160112150','','dl.DEUXRIVIERES@croix-rouge.Fr','',131),(132,'VALLEES BIEVRE YVETTE','91120','0169311393','','dl.VALLEESBIEVREsYVETTE@croix-rouge.Fr','http://bievre.croix-rouge.fr',132),(133,'VAL D ORGE','91240','0169463000','','dl.VALDORGE@croix-rouge.Fr','http://valdorge.croix-rouge.fr',133),(134,'ARPAJONNAIS','91180','0160834548','','dl.ARPAJON@croix-rouge.Fr','',134),(135,'DEUX TOURS','91220','0169888843','','dl.lesdeuxtours@croix-rouge.fr','',135),(136,'DRAVEIL','91210','0169037297','','dl.DRAVEIL@croix-rouge.Fr','',136),(137,'ETAMPES','91150','0164941224','','dl.ETAMPES@croix-rouge.Fr','',137),(138,'LIMOURS','91470','','0676887389','dl.limours@croix-rouge.fr','http://sites.croix-rouge.fr/sites/91/les_molieres/index.php',138),(139,'MILLY-MAISSE','91490','0164989405','','dl.milly-maisse@croix-rouge.fr','',139),(140,'SAINT CHERON','91650','0164587665','','dl.StCheron@croix-rouge.fr','',140),(141,'EVRY CENTRE ESSONNE ','91000','0160773664','','dl.evry@croix-rouge.fr','http://evry.croix-rouge.fr',141);


INSERT INTO `delegation` ( `nom`, `departement`, `telephone`, `mobile`, `mail`, `web`, `id_lieu`) VALUES
('N/A','N/A','N/A','N/A','N/A','N/A',0);

update delegation set id_delegation=0 where id_delegation = 142;
ALTER TABLE delegation AUTO_INCREMENT = 142;

insert into dispositif_etat (label_etat)
values
('Dispo'),
('Intervention Affectée'),
('Parti'),
('Sur Place'),
('Primaire passé'),
('Secondaire passé'),
('Transport'),
('Arrivé à l''Hopital'),
('Intervention Terminée'),
('A sa base'),
('Indispo - Equipage incomplet'),
('Indispo - Matériel incomplet'),
('Indisponible'),
('N/A');

update dispositif_etat set id_etat = 0  where id_etat = 14;
update dispositif_etat set id_etat = -1 where id_etat = 13;
update dispositif_etat set id_etat = -2 where id_etat = 12;
update dispositif_etat set id_etat = -3 where id_etat = 11;
ALTER TABLE dispositif_etat AUTO_INCREMENT = 14;

insert into dispositif_type (label_type, nb_equipier_max)
values
('ALPHA'            ,5),
('BSPP'             ,5),
('Poste de Secours' ,0),
('Point d''Alerte'  ,0),
('N/A'              ,0);

update dispositif_type set id_type = 0 where id_type = 5;
ALTER TABLE dispositif_type AUTO_INCREMENT = 5;

insert into equipier_role (label_role)
values                     /*RDP - SIORD */
('Chef de Dispositif'   ), /*01  - 61*/
('Chef de Poste'        ), /*02  - 62*/
('Chef de Section'      ), /*03  - 60*/
('CI'                   ), /*04  - 2 */
('CI Réseau (Alpha)'    ), /*05  - 45*/
('CI CS     (BSPP)'     ), /*06  - 54*/
('Chauffeur ASM'        ), /*07  - 4 */
('Chauffeur VL'         ), /*08  - 5 */
('PSE2'                 ), /*09  - 3 */
('PSE1'                 ), /*10  - 53*/
('PSC1'                 ), /*11  - 33*/
('N/A'                  ); /*00  - */

update equipier_role set id_role = 0 where id_role = 12;
ALTER TABLE equipier_role AUTO_INCREMENT = 12;


INSERT INTO `dispositif_type_definition` (`id_dispositif_type`, `id_role`, `nombre_min`, `nombre_max`) VALUES 
(1,5,1,1),(1,7,1,1),(1,9,2,3),(1,10,0,1),(1,11,0,1), -- alpha
(2,5,1,1),(2,7,1,1),(2,9,2,3),(2,10,0,1),(2,11,0,1); -- BSPP

insert into user_role (label_role, code_role)
values
('Administrateur', 'ADMINISTRATEUR'),
('Régulateur'    , 'REGULATEUR'    ),
('Co-Régulateur' , 'CO-REGULATEUR' ),
('Observateur'   , 'OBSERVATEUR'   ),
('N/A'           , 'N/A'           );

update user_role set id_role = 0 where id_role = 5;
ALTER TABLE user_role AUTO_INCREMENT = 5;


insert into `user` ( `num_nivol`, `user_is_male`, `password`,`nom`,`prenom`,`mobile`, `email` ,`id_delegation`, `autre_delegation`, `id_role`, `id_regulation` )
values
('NA', true, '0','N/A'     , 'N/A'    , '0', 't@t.com', 0, '', 0, 0 );

update `user` set id_user = 0 where id_user = 1;
ALTER TABLE `user` AUTO_INCREMENT = 1;

insert into regulation (`start_date` ,`expected_end_date` ,`open`,`id_regulateur`,`label` ,`comment` )
values
(MAKEDATE(1970,1), MAKEDATE(1970,2), false, 0, 'N/A', 'N/A');

update regulation set id_regulation = 0 where id_regulation = 1;
ALTER TABLE `regulation` AUTO_INCREMENT = 1;


insert into `dispositif`
(
  `id_type_dispositif` ,   `id_regulation` ,  `indicatif_vehicule` ,  `O2_B1_volume` ,
  `O2_B1_pression` ,  `O2_B2_volume`  , `O2_B2_pression`,  `O2_B3_volume`  ,  `O2_B3_pression` ,
  `O2_B4_volume`   ,  `O2_B4_pression`, `O2_B5_volume`  ,  `O2_B5_pression`, `dispositif_comment` ,
  `dispositif_back_3_girl`, `dispositif_not_enough_O2`, `dispositif_set_available_with_warning`,
  `dsa_type` ,  `dsa_complet` ,  `observation` ,  `DH_debut` ,  `DH_fin` ,  `id_delegation_responsable` ,
  `autre_delegation` ,  `contact_radio` ,  `contact_tel1` ,  `contact_tel2` ,  `contact_alphapage` ,
  `identite_medecin` ,  `id_etat_dispositif`, `id_current_intervention`, `display_state`
)
VALUES
(	0, 0, 'N/A', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '', 
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
('Annulée'),
('En cours de création');

update intervention_etat set id_etat = 0 where id_etat = 11;
ALTER TABLE `intervention_etat` AUTO_INCREMENT = 11;



insert into credits (`presentation_order`, `name`, `version`, `url`, `description`)
values
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
('0.4.0','2009-06-01'   ,'No production release','Ré implémentation du Drag & Drop, affectation de plusieurs victime à un dispositif')
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
(4,'IRP-27', 'Gestion de N victimes par dispositif');
  
insert into `user` ( `num_nivol`, `user_is_male`, `password`,`nom`,`prenom`,`mobile`,`email`, `id_delegation`, `autre_delegation`, `id_role`, `id_regulation` )
values
('75233A' , true , md5('TEST'      ),'Manson'     , 'Thomas'         ,'0', 'toto@toto.com'            , 42 , '', 2, 0 );

insert into regulation (`start_date` ,`expected_end_date` ,`open`,`id_regulateur`,`label` ,`comment` )
values
(NOW()            , ADDDATE(NOW(),1 ), true , 1, 'Régulation Paris' , 'Régulation Permanente');

commit;