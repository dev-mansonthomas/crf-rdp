package fr.croixrouge.rdp.model.monitor;

import fr.croixrouge.rdp.services.utilities.UtilitiesServiceImpl;

import java.io.Serializable;
import java.text.SimpleDateFormat;

public abstract class CrfDto implements Serializable
{
  private static final   long             serialVersionUID = -3019110120869741708L;
  protected static final SimpleDateFormat dateFormatter    = new SimpleDateFormat(UtilitiesServiceImpl.dateTimeSDF);
}
