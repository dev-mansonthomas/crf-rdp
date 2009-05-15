package fr.croixrouge.irp.model.monitor.rowMapper;

import java.text.SimpleDateFormat;


public class RowMapperHelper
{
  protected	SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
	
  public static String getString(String string)
  {
    if(string == null)
      return "";
    return string;
  }
}
