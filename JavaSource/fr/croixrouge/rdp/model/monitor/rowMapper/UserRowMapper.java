package fr.croixrouge.rdp.model.monitor.rowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import fr.croixrouge.rdp.model.monitor.Equipier;
import fr.croixrouge.rdp.model.monitor.User;

public class UserRowMapper extends RowMapperHelper implements RowMapper<User>
{
	private boolean withPassword = false;
	private boolean withEquipier = false;
	public UserRowMapper(boolean withPassword, boolean withEquipier)
	{
		this.withPassword= withPassword;
		this.withEquipier= withEquipier;
	}
	
	
  public User mapRow(ResultSet resultSet, int rowNum) throws SQLException
  {
    User        user        = new User      ();
    
    user.setIdUser          	(resultSet.getInt     ("id_user"          ));
    user.setIdEquipier        (resultSet.getInt     ("id_equipier"      ));
    user.setEnabled           (resultSet.getBoolean ("enabled"          ));
    if(this.withEquipier)
    {
      Equipier equipier = new EquipierRowMapper(false, true).mapRow(resultSet, rowNum);
      user.setEquipier(equipier);
    }
    
    if(withPassword)
    {
      user.setPassword			     (resultSet.getString("password" 			       ));
	    user.setChallengePassword	 (resultSet.getString("challenge_password"   ));	
    }


    return user;
  }
}
