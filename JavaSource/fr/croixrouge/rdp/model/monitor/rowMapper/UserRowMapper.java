package fr.croixrouge.rdp.model.monitor.rowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import fr.croixrouge.rdp.model.monitor.Delegation;
import fr.croixrouge.rdp.model.monitor.User;

public class UserRowMapper extends RowMapperHelper implements RowMapper<User>
{
	
	private boolean withPassword = false;
	public UserRowMapper(boolean withPassword)
	{
		this.withPassword= withPassword;
	}
	
	
  public User mapRow(ResultSet resultSet, int rowNum) throws SQLException
  {
    User        user        = new User      ();
    Delegation  delegation  = new Delegation();
    
    user.setDelegation(delegation );
    
    user.setIdUser          	(resultSet.getInt   ("id_user"          ));
    
    user.setHomme             (resultSet.getBoolean("user_is_male"));
    
    user.setNom             	(resultSet.getString("nom"              ));
    user.setPrenom          	(resultSet.getString("prenom"           ));
    user.setMobile            (resultSet.getString("mobile"            ));
    user.setEmail             (resultSet.getString("email"            ));
    user.setNivol        	    (resultSet.getString("num_nivol"        ));
    user.setAutreDelegation 	(resultSet.getString("autre_delegation" ));
    
    if(withPassword)
    {
      user.setPassword			     (resultSet.getString("password" 			       ));
	    user.setChallengePassword	 (resultSet.getString("challenge_password"   ));	
    }
    
    delegation.setIdDelegation(resultSet.getInt   ("id_delegation"  ));
    delegation.setNom         (resultSet.getString("delegation_nom" ));
    delegation.setDepartement (resultSet.getString("delegation_departement" ));
    user.setIdRole            (resultSet.getInt   ("id_role"   ));

    return user;
  }
}
