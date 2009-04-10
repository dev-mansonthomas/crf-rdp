package fr.croixrouge.irp.model.monitor.rowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import fr.croixrouge.irp.model.monitor.UserRole;

public class UserRoleRowMapper extends RowMapperHelper implements RowMapper
{
	
	private boolean withLabel = false;
	public UserRoleRowMapper(boolean withLabel)
	{
		this.withLabel= withLabel;
	}
	
	
  public Object mapRow(ResultSet resultSet, int rowNum) throws SQLException
  {
    UserRole    userRole    = new UserRole  ();
    
    userRole.setId(resultSet.getInt   ("id_role"  ));
    userRole.setCode      (resultSet.getString("code_role"));   
    
    if(withLabel)
    	userRole.setLabel     (resultSet.getString("label_role"));
     

    return userRole;
  }

}
