package fr.croixrouge.rdp.services.equipier;

import java.sql.Types;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.jdbc.core.JdbcTemplate;

import fr.croixrouge.rdp.model.monitor.Equipier;
import fr.croixrouge.rdp.model.monitor.rowMapper.EquipierRowMapper;
import fr.croixrouge.rdp.services.dispositif.DispositifService;

public class EquipierServiceImpl implements EquipierService 
{
  private JdbcTemplate      jdbcTemplate;
  private DispositifService dispositifService;
  private static Logger     logger = Logger.getLogger(EquipierServiceImpl.class);
  
  public EquipierServiceImpl(JdbcTemplate jdbcTemplate, DispositifService dispositifService)
  {
    this.jdbcTemplate      = jdbcTemplate;
    this.dispositifService = dispositifService;

    if(logger.isDebugEnabled())
      logger.debug("constructor called");
  }
  
  private final static String selectForEquipier = 
    "SELECT e.id_equipier         ,                  \n"+
    "       e.id_dispositif       ,                  \n"+
    "       e.num_nivol           ,                  \n"+
    "       e.equipier_is_male    ,                  \n"+
    "       e.nom                 ,                  \n"+
    "       e.prenom              ,                  \n"+
    "       e.mobile              ,                  \n"+
    "       e.email               ,                  \n"+
    "       e.DH_debut            ,                  \n"+
    "       e.DH_fin              ,                  \n"+
    "       d.id_delegation       ,                  \n"+
    "       d.nom         as nom_delegation         ,\n"+
    "       d.departement as departement_delegation ,\n"+
    "       e.autre_delegation    ,                  \n"+
    "       e.id_role_equipier1   ,                  \n"+
    "       e.id_role_equipier2   ,                  \n"+
    "       e.id_role_dans_dispositif                \n"+
    "FROM   equipier      e  ,                       \n"+
    "       delegation    d                          \n";
  
  private final static  String queryForGetEquipiersForDispositif = 
    selectForEquipier +
    "WHERE  e.id_delegation      = d.id_delegation   \n"+
    "AND    e.id_dispositif      = ?                 \n";
  
  @SuppressWarnings("unchecked")  
  public List<Equipier> getEquipiersForDispositif(int regulationId, int idDispositif) throws Exception
  {
    if(logger.isDebugEnabled())
      logger.debug("Getting EquipiersForDispositif '"+idDispositif+"'");
    

    List<Equipier> equipierListTmp = this.dispositifService.getEquipierIdAndRoleOfDispositif (regulationId, idDispositif);
    int            typeDispositif  = this.dispositifService.getIdTypeDispositif              (regulationId, idDispositif);
    List<Equipier> equiperList     = new ArrayList<Equipier>(equipierListTmp.size());
    
    if(typeDispositif == 1 || typeDispositif == 2)
    {
      for (Equipier equipier : equipierListTmp)
      { 
        Equipier tmpEquipier = this.getEquipier(equipier.getIdEquipier());
        
        tmpEquipier.setIdRoleDansDispositif(equipier.getIdRoleDansDispositif());
        tmpEquipier.setEquipierRank        (equipier.getEquipierRank        ());
        
        equiperList.add(tmpEquipier);
      }
    }
    else if(typeDispositif != 5)//5=N/A
    {
      Object [] os    = {idDispositif};
      int    [] types = {Types.INTEGER};
     
      equipierListTmp = jdbcTemplate.query( queryForGetEquipiersForDispositif , 
                                         os    , 
                                         types , 
                                         new EquipierRowMapper());
    }

    
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
  

  
  private final static String queryForGetEquipiersByNivol = 
    selectForEquipier+
    "WHERE  id_dispositif = 0                        \n"+
    "AND    (     e.id_role_equipier1 = ?            \n"+
    "         OR  e.id_role_equipier2 = ?            \n"+
    "       )                                        \n"+
    "AND    e.id_delegation      = d.id_delegation   \n"+
    "AND    e.num_nivol          LIKE ?              \n";

  private final static String queryForGetEquipiersByNivolForCFAPSE = 
    selectForEquipier+
    "WHERE  id_dispositif = 0                        \n"+
    "AND    (     e.id_role_equipier1 <= ?           \n"+
    "         OR  e.id_role_equipier2 <= ?           \n"+
    "       )                                        \n"+
    "AND    e.id_delegation      = d.id_delegation   \n"+
    "AND    e.num_nivol          LIKE ?              \n";
  
  @SuppressWarnings("unchecked")  
  public List<Equipier> getEquipiersByNivol(String nivol, int equipierType) 
  {
    
    if(logger.isDebugEnabled())
      logger.debug("Getting EquipiersByNivol '"+nivol+"%'");


    
    Object [] os    =  new Object[]{equipierType,equipierType,nivol+"%"};
                      
    int    [] types =  new int[]{Types.INTEGER, Types.INTEGER, Types.CHAR};
   
    List<Equipier> equipierList = jdbcTemplate.query( equipierType == 4?queryForGetEquipiersByNivolForCFAPSE:queryForGetEquipiersByNivol , 
                                                      os    , 
                                                      types , 
                                                      new EquipierRowMapper());
    
    return equipierList;
  }
  
  
  private final static String queryForGetEquipiersByNom = 
    selectForEquipier+
    "WHERE  id_dispositif = 0                        \n"+
    "AND    (     e.id_role_equipier1 <= ?            \n"+
    "         OR  e.id_role_equipier2 <= ?            \n"+
    "       )                                        \n"+
    "AND    e.id_delegation      = d.id_delegation   \n"+
    "AND    e.nom                LIKE ?              \n";
  
  @SuppressWarnings("unchecked")  
  public List<Equipier> getEquipiersByNom(String nom, int equipierType)
  {
    if(logger.isDebugEnabled())
      logger.debug("Getting EquipiersByNom '"+nom+"%', equipierType='"+equipierType+"'");

    

    
    Object [] os    = new Object[]{equipierType, equipierType,nom+"%"};
        
        
    int    [] types =  new int[]{Types.INTEGER, Types.INTEGER, Types.CHAR};

   
    List<Equipier> equipierList = jdbcTemplate.query( queryForGetEquipiersByNom , 
                                                      os    , 
                                                      types , 
                                                      new EquipierRowMapper());
    
    return equipierList;
  }
  
  private final static String queryForSetDispositifToEquipier =
    "UPDATE equipier                     \n" +
    "SET    id_dispositif           = ?, \n" +
    "       id_role_dans_dispositif = ?  \n" +
    "WHERE  id_equipier             = ?  \n";
  
  public void setDispositifToEquipier(int idEquipier, int idDispositif, int idRoleDansDispositif)
  {
    Object [] os     = new Object[]{idDispositif  , idRoleDansDispositif, idEquipier   };
    int    [] types  = new int   []{Types.INTEGER , Types.INTEGER       , Types.INTEGER};
    
    int nbLineUpdated = jdbcTemplate.update(queryForSetDispositifToEquipier, os, types);
    
    if(logger.isDebugEnabled())
      logger.debug("setDispositifToEquipier line updated = "+nbLineUpdated);

  }
}