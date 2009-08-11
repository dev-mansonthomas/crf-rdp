package fr.croixrouge.rdp.services.equipier;

import java.sql.Types;
import java.util.Hashtable;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.jdbc.core.JdbcTemplate;

import fr.croixrouge.rdp.model.monitor.Equipier;
import fr.croixrouge.rdp.model.monitor.dwr.GridSearchFilterAndSortObject;
import fr.croixrouge.rdp.model.monitor.dwr.ListRange;
import fr.croixrouge.rdp.model.monitor.dwr.SortObject;
import fr.croixrouge.rdp.model.monitor.rowMapper.EquipierRowMapper;
import fr.croixrouge.rdp.services.dispositif.DispositifService;

public class EquipierServiceImpl implements EquipierService 
{
  private JdbcTemplate      jdbcTemplate;
  private static Logger     logger = Logger.getLogger(EquipierServiceImpl.class);
  private Hashtable<String, String> sortMap = new Hashtable<String, String>();
  
  public EquipierServiceImpl(JdbcTemplate jdbcTemplate, DispositifService dispositifService)
  {
    this.jdbcTemplate      = jdbcTemplate;
    
    sortMap.put("nom"                       , "nom");
    sortMap.put("prenom"                    , "prenom");
    sortMap.put("homme"                     , "equipier_is_male");
    sortMap.put("delegation.idDelegation"   , "nom_delegation");
    sortMap.put("numNivol"                  , "num_nivol");
    

    if(logger.isDebugEnabled())
      logger.debug("constructor called");
  }
  
  
  
  private final static String equipierSelect =     
  "SELECT e.id_equipier         ,                  \n"+
  "       e.id_dispositif       ,                  \n"+
  "       e.num_nivol           ,                  \n"+
  "       e.equipier_is_male    ,                  \n"+
  "       e.enabled             ,                  \n"+
  "       e.nom                 ,                  \n"+
  "       e.prenom              ,                  \n"+
  "       e.mobile              ,                  \n"+
  "       e.email               ,                  \n"+
  "       d.id_delegation       ,                  \n"+
  "       d.nom         as nom_delegation         ,\n"+
  "       d.departement as departement_delegation ,\n"+
  "       e.autre_delegation                       \n";
  
  private final static String equipierFrom =
    "FROM   equipier      e  ,                       \n"+
    "       delegation    d                          \n";
  
  private final static String selectForEquipier = equipierSelect+equipierFrom;
    
  
  private final static  String queryForGetEquipiersForDispositif = 
    equipierSelect+
    ", de.id_role_equipier                     ,\n"+
    "de.en_evaluation                           \n"+
    equipierFrom+
    ",      dispositif_equipiers de, delegation d    \n"+                 
    "WHERE  de.id_dispositif     = ?                 \n"+                 
    "AND    de.id_equipier       = e.id_equipier     \n"+                 
    "AND    e.id_delegation      = d.id_delegation   \n"+
    "AND    e.enabled            = true              \n"+
    "ORDER BY de.id_role_equipier ASC                \n";  

  
  @SuppressWarnings("unchecked")  
  public List<Equipier> getEquipiersForDispositif(int idDispositif) throws Exception
  {
    if(logger.isDebugEnabled())
      logger.debug("Getting EquipiersForDispositif '"+idDispositif+"'");

    Object [] os    = {idDispositif};
    int    [] types = {Types.INTEGER};
   
    List<Equipier> equiperList= (List<Equipier>)jdbcTemplate.query(  queryForGetEquipiersForDispositif , 
                                                                     os    , 
                                                                     types , 
                                                                     new EquipierRowMapper(true));
    
  
    
    
    
    return equiperList;
  }
  
  private final static String queryForGetEquipier = 
    selectForEquipier+
    "WHERE  e.id_delegation      = d.id_delegation   \n"+
    "AND    e.id_equipier        = ?                 \n"; 
  
  public Equipier getEquipier(int idEquipier)
  {

    if(logger.isDebugEnabled())
      logger.debug("Getting Equipiers '"+idEquipier+"'");
    
    Object [] os    = {idEquipier};
    int    [] types = {Types.INTEGER};
   
    Equipier equipier = (Equipier)jdbcTemplate.queryForObject( queryForGetEquipier , 
                                                               os    , 
                                                               types , 
                                                               new EquipierRowMapper());
    
    return equipier;
  }
  
  
  private final static String queryForGetNbEquipiers = 
	  "SELECT count(1) FROM equipier e, delegation d WHERE e.id_delegation = d.id_delegation"; 
	  
  public int getNbEquipiers(GridSearchFilterAndSortObject gsfaso)
  {
    return (int)jdbcTemplate.queryForLong(queryForGetNbEquipiers);
  }
  
  private final static String queryForGetEquipiers = 
	  selectForEquipier+
	  "WHERE  e.id_delegation      = d.id_delegation   \n"; 
	  
  @SuppressWarnings("unchecked")  
  public List<Equipier> getEquipiers(GridSearchFilterAndSortObject gsfaso)
  {
	String queryForGetEquipiersCustom = queryForGetEquipiers;
	String orders = "ORDER BY ";
	
	if (gsfaso.getSorts()!= null && gsfaso.getSorts().length>0){
		for (int i = 0; i < gsfaso.getSorts().length; i++) {
			SortObject so = gsfaso.getSorts()[i];
			orders += sortMap.get(so.getName()) + (so.isAscending()?" ASC":" DESC");
			if(i<gsfaso.getSorts().length-1){
				orders += ", ";
			}
		}
	}
	
	queryForGetEquipiersCustom += orders + "\n";
	queryForGetEquipiersCustom += "LIMIT "+gsfaso.getStart()+", "+gsfaso.getLimit()+" \n";
	
	System.out.println("queryForGetEquipiersCustom="+queryForGetEquipiersCustom);
	
    Object [] os    = {};
    int    [] types = {};
   
    List<Equipier> equipierList = jdbcTemplate.query( queryForGetEquipiersCustom , 
                                                      os    , 
                                                      types , 
                                                      new EquipierRowMapper());
    return equipierList;
  }
  
  private final static String queryForSearchEquipierWhere =
    "WHERE  e.id_dispositif     = 0                 \n"+
    "AND    e.id_equipier       = er.id_equipier    \n"+
    "AND    e.enabled           = true              \n"+
    "AND    er.id_role_equipier = ?                 \n"+
    "AND    e.id_delegation     = d.id_delegation   \n"+
    "AND                                            \n"+
    "(                                              \n"+
    "       e.num_nivol         LIKE ?              \n" +
    " OR    e.nom               LIKE ?              \n" +
    ")\n";

  
  
  @SuppressWarnings("unchecked")
  public ListRange searchEquipier(int idRole, String searchString, int start, int limit) throws Exception
  {
    
    Object [] os    =  new Object[]{idRole       , searchString , searchString };
    int    [] types =  new int   []{Types.INTEGER, Types.CHAR   , Types.CHAR   };
   
    
    int totalCount = this.jdbcTemplate.queryForInt(
        "SELECT COUNT(1) \n" +
    		"FROM   equipier e, equipier_roles er, delegation d \n"
        +queryForSearchEquipierWhere, os, types);
    
    
    String query = equipierSelect+ ", er.id_role_equipier, er.en_evaluation\n"
    +equipierFrom + ", equipier_roles er\n"+
    queryForSearchEquipierWhere 
    +"LIMIT "+start+", "+limit;
    
    if(logger.isDebugEnabled())
      logger.debug("searching for equipier : idRole='"+idRole+"', searchString='"+searchString+"', start='"+start+"', limit='"+limit+"' with SQL query : \n"+query);
    
    List<Equipier> equipierList = jdbcTemplate.query( query , 
                                                      os    , 
                                                      types , 
                                                      new EquipierRowMapper(true));
    
    
    return new ListRange(totalCount, equipierList);
  }
  
  
  private final static String queryForGetEquipiersByNivol = 
    selectForEquipier+
    ", equipier_roles er                            \n"+
    "WHERE  e.id_dispositif     = 0                 \n"+
    "AND    e.id_equipier       = er.id_equipier    \n"+
    "AND    e.enabled           = true              \n"+
    "AND    er.id_role_equipier = ?                 \n"+
    "AND    e.id_delegation     = d.id_delegation   \n"+
    "AND    e.num_nivol         LIKE ?              \n";
  
  @SuppressWarnings("unchecked")  
  public List<Equipier> getEquipiersByNivol(String nivol, int equipierRole) 
  {
    if(nivol.indexOf("*")>-1)
      nivol = nivol.replaceAll("*", "%");
    else
      nivol += "%";
    
    if(logger.isDebugEnabled())
      logger.debug("Getting EquipiersByNivol '"+nivol+"' query : \n"+queryForGetEquipiersByNivol);

    Object [] os    =  new Object[]{equipierRole , nivol     };
    int    [] types =  new int   []{Types.INTEGER, Types.CHAR};
   
    List<Equipier> equipierList = jdbcTemplate.query( queryForGetEquipiersByNivol , 
                                                      os    , 
                                                      types , 
                                                      new EquipierRowMapper());
    
    return equipierList;
  }
  
  
  private final static String queryForGetEquipiersByNom = 
    selectForEquipier+
    ", equipier_roles er                           \n"+
    "WHERE  e.id_dispositif     = 0                 \n"+
    "AND    e.id_equipier       = er.id_equipier    \n"+
    "AND    e.enabled           = true              \n"+
    "AND    er.id_role_equipier = ?                 \n"+
    "AND    e.id_delegation     = d.id_delegation   \n"+
    "AND    e.nom               LIKE ?              \n";
  
  @SuppressWarnings("unchecked")  
  public List<Equipier> getEquipiersByNom(String nom, int equipierRole)
  {
    if(nom.indexOf("*")>-1)
      nom = nom.replaceAll("*", "%");
    else
      nom += "%";
    
    if(logger.isDebugEnabled())
      logger.debug("Getting EquipiersByNom '"+nom+"', equipierRole='"+equipierRole+"'");

    

    
    Object [] os    = new Object[]{ equipierRole , nom       };
    int    [] types = new int   []{ Types.INTEGER, Types.CHAR};

   
    List<Equipier> equipierList = jdbcTemplate.query( queryForGetEquipiersByNom , 
                                                      os    , 
                                                      types , 
                                                      new EquipierRowMapper());
    
    return equipierList;
  }
  
  private final static String queryForSetDispositifToEquipier =
    "UPDATE equipier                     \n" +
    "SET    id_dispositif           = ?  \n" +
    "WHERE  id_equipier             = ?  \n";
  
  public void setDispositifToEquipier(int idEquipier, int idDispositif)
  {
    Object [] os     = new Object[]{idDispositif  , idEquipier   };
    int    [] types  = new int   []{Types.INTEGER , Types.INTEGER};
    
    int nbLineUpdated = jdbcTemplate.update(queryForSetDispositifToEquipier, os, types);
    
    if(logger.isDebugEnabled())
      logger.debug("setDispositifToEquipier line updated = "+nbLineUpdated);

  }
}