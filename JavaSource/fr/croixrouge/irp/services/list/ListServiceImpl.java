package fr.croixrouge.irp.services.list;

import java.util.Hashtable;
import java.util.List;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.jdbc.core.JdbcTemplate;

import fr.croixrouge.irp.model.monitor.Delegation;
import fr.croixrouge.irp.model.monitor.DispositifEtat;
import fr.croixrouge.irp.model.monitor.DispositifType;
import fr.croixrouge.irp.model.monitor.EquipierRole;
import fr.croixrouge.irp.model.monitor.InterventionMotif;
import fr.croixrouge.irp.model.monitor.InterventionOrigine;
import fr.croixrouge.irp.model.monitor.UserRole;
import fr.croixrouge.irp.model.monitor.rowMapper.DelegationRowMapper;
import fr.croixrouge.irp.model.monitor.rowMapper.DispositifEtatRowMapper;
import fr.croixrouge.irp.model.monitor.rowMapper.DispositifTypeRowMapper;
import fr.croixrouge.irp.model.monitor.rowMapper.EquipierRoleRowMapper;
import fr.croixrouge.irp.model.monitor.rowMapper.InterventionEtatRowMapper;
import fr.croixrouge.irp.model.monitor.rowMapper.InterventionMotifRowMapper;
import fr.croixrouge.irp.model.monitor.rowMapper.InterventionOrigineRowMapper;
import fr.croixrouge.irp.model.monitor.rowMapper.UserRoleRowMapper;

public class ListServiceImpl implements ListService, InitializingBean
{
  @SuppressWarnings("unchecked")
  private Hashtable<String, List> allList = null;
  private JdbcTemplate jdbcTemplate;
  
  
  public ListServiceImpl(JdbcTemplate jdbcTemplate)
  {
    this.jdbcTemplate = jdbcTemplate;  
  }

  public void afterPropertiesSet() throws Exception
  {
    this.getAllListInit();
  }

  private final static String queryForGetTypesDispositif =
    "SELECT id_type, label_type \n"+
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
    this.allList = new Hashtable<String, List>(6)
    {
      private static final long serialVersionUID = 5456339591578590644L;
      {
        this.put("EtatsDispositif"       , getEtatsDispositif       ());
        this.put("MotifsIntervention"    , getMotifsIntervention    ());
        this.put("EtatsIntervention"     , getEtatsIntervention     ());
        this.put("OriginesIntervention"  , getOriginesIntervention  ());
        this.put("RolesEquipier"         , getRolesEquipier         ());
        this.put("RolesUser"             , getRolesUser             ());
        this.put("TypesDispositif"       , getTypesDispositif       ());
        this.put("Delegations"           , getDelegations           ());
      }
    };
  }
  
  @SuppressWarnings("unchecked")
  public Hashtable<String, List> getAllList()
  {
    return allList;
  }
}
