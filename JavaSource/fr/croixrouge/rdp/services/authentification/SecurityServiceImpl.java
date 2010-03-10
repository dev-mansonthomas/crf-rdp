package fr.croixrouge.rdp.services.authentification;

import java.security.Principal;
import java.sql.Types;
import java.util.Hashtable;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;

import fr.croixrouge.rdp.model.monitor.User;
import fr.croixrouge.rdp.model.monitor.UserRole;
import fr.croixrouge.rdp.model.monitor.rowMapper.UserRoleRowMapper;
import fr.croixrouge.rdp.model.monitor.rowMapper.UserRowMapper;
import fr.croixrouge.utilities.web.security.SecurityRealm;

public class SecurityServiceImpl implements SecurityRealm, InitializingBean
{
	
	private static final Log           logger       = LogFactory.getLog(SecurityServiceImpl.class);
	private JdbcTemplate               jdbcTemplate = null;
	private Hashtable<String, Integer> roles        = null;
	
	public SecurityServiceImpl(JdbcTemplate jdbcTemplate)
	{
	  this.jdbcTemplate = jdbcTemplate;
  }
 	

  private final static String queryForAuthenticate = 
    "SELECT   u.id_user, u.num_nivol, u.user_is_male, u.nom, u.prenom, u.email, u.mobile, u.autre_delegation, u.id_delegation, \n" +
    "         d.nom AS delegation_nom, d.departement AS delegation_departement,u.id_role, r.label_role, u.password, md5(?) as challenge_password\n"+
    "FROM     `user` u, `delegation` d, `user_role` r \n"+
    "WHERE    u.num_nivol        = ?               \n"+
    "AND      u.id_delegation    = d.id_delegation \n"+
    "AND      u.id_role          = r.id_role       \n";  

  
	public Principal authenticate(String username, String password) 
	{
	  logger.debug("User '"+username+"' is attempting to login");
		Object[] os 	  = new Object[]{password     , username     };
		int   [] types	= new int   []{Types.VARCHAR, Types.VARCHAR};
		
		
		User user = null;
		try
		{
			user = (User)jdbcTemplate.queryForObject(queryForAuthenticate, os, types, new UserRowMapper(true));	
		}
		catch(EmptyResultDataAccessException e)
		{
			
		}
		if(user == null)
		{
			logger.warn("No user '"+username+"'");
			return null;
		}
		
		
		if(  user.getPassword() != null        && 
		    !user.getPassword().equals("")     && 
		     user.getPassword().length() == 32 && 
		     user.getPassword().equals(user.getChallengePassword()))
			return new SecurityPrincipal(user);

		logger.warn("Wrong password for user '"+username+"'");

		return null;
	}
	
	public boolean isUserInRole(Principal principal, String rolename)
	{
		if(principal == null)
			return false;
		
		Integer tmpInt       = this.roles.get(rolename);
		int     wantedRoleId = tmpInt==null?0:tmpInt;
		
		return ((SecurityPrincipal)principal).getUser().getIdRole() <= wantedRoleId; 
	}

	private final static String queryForAfterPropertiesSet = 
    "SELECT r.code_role, r.id_role\n" +
    "FROM   user_role r\n";
  
	public void afterPropertiesSet() throws Exception 
	{
		List <UserRole> rolesList = jdbcTemplate.query(queryForAfterPropertiesSet, null, null, new UserRoleRowMapper(false));
		
		this.roles = new Hashtable<String, Integer>(rolesList.size());
		
		for (UserRole role : rolesList) 
			this.roles.put(role.getCode(), role.getId());
	}
}
