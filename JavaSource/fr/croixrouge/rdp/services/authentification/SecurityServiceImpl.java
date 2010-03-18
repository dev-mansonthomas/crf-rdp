package fr.croixrouge.rdp.services.authentification;

import java.security.Principal;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import fr.croixrouge.rdp.model.monitor.User;
import fr.croixrouge.rdp.services.user.UserService;
import fr.croixrouge.utilities.web.security.SecurityRealm;

public class SecurityServiceImpl implements SecurityRealm
{
	
	private static final Log           logger       = LogFactory.getLog(SecurityServiceImpl.class);
	
	private UserService                userService  = null;
	public SecurityServiceImpl( UserService   userService )
	{
	  this.userService  = userService ;
  }
 	



  
	public Principal authenticate(String username, String password) 
	{
	  logger.debug("User '"+username+"' is attempting to login");
		
	  User user = userService.authenticateUser(username, password);
		
	  if(user == null)
    {
      logger.warn("No user '"+username+"'");
      return null;
    }
		
		//TODO : fetch role
		
		
		
		if(  user.getPassword() != null        && 
		    !user.getPassword().equals("")     && 
		     user.getPassword().length() == 32 && 
		     user.getPassword().equals(user.getChallengePassword()) &&
		     user.isEnabled())
			return new SecurityPrincipal(user);

		logger.warn("Wrong password for user '"+username+"'");

		return null;
	}
	
	public boolean isUserInRole(Principal principal, String rolename)
	{//reimplement
		if(principal == null)
			return false;
		
		//Integer tmpInt       = this.roles.get(rolename);
		//int     wantedRoleId = tmpInt==null?0:tmpInt;
		
		return true;//((SecurityPrincipal)principal).getUser().getIdRole() <= wantedRoleId; 
	}


}
