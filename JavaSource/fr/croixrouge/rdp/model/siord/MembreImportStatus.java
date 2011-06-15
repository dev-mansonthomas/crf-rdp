package fr.croixrouge.rdp.model.siord;

import java.io.Serializable;

public class MembreImportStatus implements Serializable
{
  private static final long serialVersionUID = -6339611147809107521L;
  
  private int    idImport   ;
  private int    idStatus   ;
  private String commentaire;
  public MembreImportStatus()
  {
    
  }
  public MembreImportStatus( int    idImport    ,
                             int    idStatus    ,
                             String commentaire )
  {
    this.idImport     = idImport    ;
    this.idStatus     = idStatus    ;
    this.commentaire  = commentaire ;
  }
  
  
  public int getIdImport()
  {
    return idImport;
  }
  public void setIdImport(int idImport)
  {
    this.idImport = idImport;
  }
  public int getIdStatus()
  {
    return idStatus;
  }
  public void setIdStatus(int idStatus)
  {
    this.idStatus = idStatus;
  }
  public String getCommentaire()
  {
    return commentaire;
  }
  public void setCommentaire(String commentaire)
  {
    this.commentaire = commentaire;
  }
}
