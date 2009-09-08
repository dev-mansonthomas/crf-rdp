package fr.croixrouge.rdp.services.list;

import java.util.Hashtable;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.jdbc.core.JdbcTemplate;

import fr.croixrouge.rdp.model.monitor.Delegation;
import fr.croixrouge.rdp.model.monitor.DispositifEtat;
import fr.croixrouge.rdp.model.monitor.DispositifType;
import fr.croixrouge.rdp.model.monitor.EquipierRole;
import fr.croixrouge.rdp.model.monitor.InterventionMotif;
import fr.croixrouge.rdp.model.monitor.InterventionOrigine;
import fr.croixrouge.rdp.model.monitor.UserRole;
import fr.croixrouge.rdp.model.monitor.rowMapper.DelegationRowMapper;
import fr.croixrouge.rdp.model.monitor.rowMapper.DispositifEtatRowMapper;
import fr.croixrouge.rdp.model.monitor.rowMapper.DispositifTypeRowMapper;
import fr.croixrouge.rdp.model.monitor.rowMapper.EquipierRoleRowMapper;
import fr.croixrouge.rdp.model.monitor.rowMapper.InterventionEtatRowMapper;
import fr.croixrouge.rdp.model.monitor.rowMapper.InterventionMotifAnnulationRowMapper;
import fr.croixrouge.rdp.model.monitor.rowMapper.InterventionMotifRowMapper;
import fr.croixrouge.rdp.model.monitor.rowMapper.InterventionOrigineRowMapper;
import fr.croixrouge.rdp.model.monitor.rowMapper.UserRoleRowMapper;

public class ListServiceImpl implements ListService, InitializingBean
{
  @SuppressWarnings("unchecked")
  private Hashtable<String, List> allList = null;
  private JdbcTemplate jdbcTemplate;
  
  private static  Log           logger            = LogFactory.getLog(ListServiceImpl.class);
  
  public ListServiceImpl(JdbcTemplate jdbcTemplate)
  {
    this.jdbcTemplate = jdbcTemplate;
    
    if(logger.isDebugEnabled())
      logger.debug("constructor called");
  }

  public void afterPropertiesSet() throws Exception
  {
    this.getAllListInit();
  }

  private final static String queryForGetTypesDispositif =
    "SELECT id_type, label_type, nombre_equipier_max, id_role_leader \n"+
    "FROM   dispositif_type d   \n"+
    "ORDER BY id_type ASC       \n";
  @SuppressWarnings("unchecked")
  public List<DispositifType> getTypesDispositif()
  {
    return this.jdbcTemplate.query(queryForGetTypesDispositif, new Object[]{}, new int[]{}, new DispositifTypeRowMapper());
  }

  
  
  private final static String queryForGetEtatsDispositif =
    "SELECT id_etat, label_etat \n" +
    "FROM   dispositif_etat d   \n" +
    "ORDER BY id_etat ASC       \n";
  @SuppressWarnings("unchecked")
  public List<DispositifEtat> getEtatsDispositif()
  {
    return this.jdbcTemplate.query(queryForGetEtatsDispositif,new Object[]{}, new int[]{}, new DispositifEtatRowMapper());
  }
  
  
  
  private final static String queryForGetRolesEquipier =
    "SELECT id_role, label_role \n" +
    "FROM   equipier_role       \n" +
    "ORDER BY id_role ASC       \n";
  @SuppressWarnings("unchecked")
  public List<EquipierRole> getRolesEquipier()
  {
    return this.jdbcTemplate.query(queryForGetRolesEquipier,new Object[]{}, new int[]{}, new EquipierRoleRowMapper());
  }

  
  
  private final static String queryForGetRolesUser =
    "SELECT id_role, label_role, code_role  \n" +
    "FROM   user_role                       \n" +
    "ORDER BY id_role ASC                   \n";
  @SuppressWarnings("unchecked")
  public List<UserRole> getRolesUser()
  {
    return this.jdbcTemplate.query(queryForGetRolesUser,new Object[]{}, new int[]{}, new UserRoleRowMapper(true));
  }
  
  
  
  private final static String queryForGetMotifsIntervention =
    "SELECT id_motif, label_motif \n" +
    "FROM   intervention_motif    \n" +
    "ORDER BY id_motif ASC        \n";
  @SuppressWarnings("unchecked")
  public List<InterventionMotif> getMotifsIntervention()
  {
    return this.jdbcTemplate.query(queryForGetMotifsIntervention,new Object[]{}, new int[]{}, new InterventionMotifRowMapper());
  }
  
  private final static String queryForGetMotifsAnnulationIntervention =
    "SELECT id_motif_annulation, label_motif_annulation \n" +
    "FROM   intervention_motif_annulation    \n" +
    "ORDER BY id_motif_annulation ASC        \n";
  @SuppressWarnings("unchecked")
  public List<InterventionMotif> getMotifsAnnulationIntervention()
  {
    return this.jdbcTemplate.query(queryForGetMotifsAnnulationIntervention,new Object[]{}, new int[]{}, new InterventionMotifAnnulationRowMapper());
  }
  
  private final static String queryForGetOriginesIntervention =
    "SELECT   id_origine, label_origine \n" +
    "FROM     intervention_origine      \n" +
    "ORDER BY id_origine ASC            \n";
  @SuppressWarnings("unchecked")
  public List<InterventionOrigine> getOriginesIntervention()
  {
    return this.jdbcTemplate.query(queryForGetOriginesIntervention,new Object[]{}, new int[]{}, new InterventionOrigineRowMapper());
  }
  
  
  
  private final static String queryForGetDelegations =
    "SELECT   id_delegation, nom, departement \n" +
    "FROM     delegation d                    \n" +
    "ORDER BY id_delegation ASC               \n";
  @SuppressWarnings("unchecked")
  public List<Delegation> getDelegations()
  {
    return this.jdbcTemplate.query(queryForGetDelegations,new Object[]{}, new int[]{}, new DelegationRowMapper());
  }
  
  private final static String queryForGetEtatsIntervention =
    "SELECT   id_etat, label_etat\n" +
    "FROM     intervention_etat  \n" +
    "ORDER BY id_etat ASC        \n";
  @SuppressWarnings("unchecked")
  public List<Delegation> getEtatsIntervention()
  {
    return this.jdbcTemplate.query(queryForGetEtatsIntervention,new Object[]{}, new int[]{}, new InterventionEtatRowMapper());
  }
  
  
  @SuppressWarnings("unchecked")
  public void getAllListInit()
  {
    this.allList = new Hashtable<String, List>(8)
    {
      private static final long serialVersionUID = 5456339591578590644L;
      {
        this.put("EtatsDispositif"       , getEtatsDispositif             ());
        this.put("MotifsIntervention"    , getMotifsIntervention          ());
        this.put("EtatsIntervention"     , getEtatsIntervention           ());
        this.put("OriginesIntervention"  , getOriginesIntervention        ());
        this.put("RolesEquipier"         , getRolesEquipier               ());
        this.put("RolesUser"             , getRolesUser                   ());
        this.put("TypesDispositif"       , getTypesDispositif             ());
        this.put("Delegations"           , getDelegations                 ());
        this.put("MotifsAnnulation"      , getMotifsAnnulationIntervention());
      }
    };
  }
  
  @SuppressWarnings("unchecked")
  public Hashtable<String, List> getAllList()
  {
    return allList;
  }
}
