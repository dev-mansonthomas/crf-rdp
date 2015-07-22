package fr.croixrouge.rdp.model.monitor.rowMapper;

import fr.croixrouge.rdp.services.utilities.UtilitiesServiceImpl;

import java.text.SimpleDateFormat;


public class RowMapperHelper
{
  protected SimpleDateFormat dateFormat = new SimpleDateFormat(UtilitiesServiceImpl.dateTimeSDF);

  public static String getString(String string)
  {
    if (string == null)
      return "";
    return string;
  }
}
