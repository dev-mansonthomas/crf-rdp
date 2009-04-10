package fr.croixrouge.irp.model.monitor;

import java.io.Serializable;
import java.text.SimpleDateFormat;

public abstract class CrfDto implements Serializable
{
  private static final long serialVersionUID = -3019110120869741708L;
  protected static final SimpleDateFormat dateFormatter = new SimpleDateFormat("dd/MM/yyyy HH:ss");
}
