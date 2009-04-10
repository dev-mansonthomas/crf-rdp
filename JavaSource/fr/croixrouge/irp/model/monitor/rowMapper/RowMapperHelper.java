package fr.croixrouge.irp.model.monitor.rowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;

import fr.croixrouge.irp.model.monitor.MonitorBean;


public class RowMapperHelper
{
  protected	SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
	
  public static String getString(String string)
  {
    if(string == null)
      return "";
    return string;
  }
  
  public static void mapRow(ResultSet rs, int rowNum, MonitorBean monitorBean) throws SQLException
  {
    monitorBean.setHash   (rs.getString("hash"));
    monitorBean.setRowNum (rowNum);
  }
  
}
