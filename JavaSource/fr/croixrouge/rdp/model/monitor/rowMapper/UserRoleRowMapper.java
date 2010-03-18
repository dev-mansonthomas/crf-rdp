package fr.croixrouge.rdp.model.monitor.rowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import fr.croixrouge.rdp.model.monitor.UserRole;

public class UserRoleRowMapper extends RowMapperHelper implements RowMapper<UserRole>
{
	
	private boolean withLabel = false;
	private boolean withCode  = false;
	
	public UserRoleRowMapper(boolean withLabel, boolean withCode)
	{
		this.withLabel= withLabel;
		this.withCode = withCode;
	}
	
	
  public UserRole mapRow(ResultSet resultSet, int rowNum) throws SQLException
  {
    UserRole    userRole    = new UserRole  ();
    
    userRole.setId(resultSet.getInt   ("id_role"  ));
    if(withCode)
      userRole.setCode      (resultSet.getString("code_role"));   
    
    if(withLabel)
    	userRole.setLabel     (resultSet.getString("label_role"));
     

    return userRole;
  }

}
