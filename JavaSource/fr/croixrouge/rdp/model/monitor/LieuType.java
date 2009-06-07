package fr.croixrouge.rdp.model.monitor;

import java.io.Serializable;

public class LieuType implements Serializable
{
  private static final long serialVersionUID = -8723547344856886637L;
  
  private int    idTypeLieu     ;
  private int    numOrdre       ;
  private String labelTypeLieu  ;
  private String iconClassLieu  ;
  private String iconLieu       ;
  private String iconGmapInit   ;
  
  public String getIconGmapInit()
  {
    return iconGmapInit;
  }
  public void setIconGmapInit(String iconGmapInit)
  {
    this.iconGmapInit = iconGmapInit;
  }
  public int getIdTypeLieu()
  {
    return idTypeLieu;
  }
  public String getLabelTypeLieu()
  {
    return labelTypeLieu;
  }
  public String getIconLieu()
  {
    return iconLieu;
  }
  public void setIdTypeLieu(int idTypeLieu)
  {
    this.idTypeLieu = idTypeLieu;
  }
  public void setLabelTypeLieu(String labelTypeLieu)
  {
    this.labelTypeLieu = labelTypeLieu;
  }
  public void setIconLieu(String iconLieu)
  {
    this.iconLieu = iconLieu;
  }
  public int getNumOrdre()
  {
    return numOrdre;
  }
  public void setNumOrdre(int numOrdre)
  {
    this.numOrdre = numOrdre;
  }
  public String getIconClassLieu()
  {
    return iconClassLieu;
  }
  public void setIconClassLieu(String iconClassLieu)
  {
    this.iconClassLieu = iconClassLieu;
  }
 
}
