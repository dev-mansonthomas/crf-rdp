package fr.croixrouge.rdp.model.monitor;

import java.io.Serializable;

public class Position implements Serializable
{
  private static final long serialVersionUID = -2726196106007826179L;
  
  private String          rue             ;
  private String          codePostal      ;
  private String          ville           ;
  private float           googleCoordsLat ;
  private float           googleCoordsLong;
  private boolean         empty                = true;
  
  public void setRue(String rue)
  {
    this.rue = rue != null?rue.trim():null;
    empty = !(!empty || this.rue != null && !this.rue.equals(""));
  }
  public void setCodePostal(String codePostal)
  {
    this.codePostal = codePostal!= null?codePostal.trim():null;
    empty = !(!empty || this.codePostal != null && !this.codePostal.equals(""));
  }
  public void setVille(String ville)
  {
    this.ville = ville!=null?ville.trim():null;
    empty = !(!empty || this.ville != null && !this.ville.equals(""));
  }
  
  @Override
  public String toString()
  {
    StringBuffer sb = new StringBuffer("{rue:{" );
    
    sb.append(this.rue               );
    sb.append("},codePostal:{"       );
    sb.append(this.codePostal        );
    sb.append("},ville:{"            );
    sb.append(this.ville             );
    sb.append("},googleCoordsLat:{"  );
    sb.append(this.googleCoordsLat   );
    sb.append("},googleCoordsLong:{" );
    sb.append(this.googleCoordsLong  );
    sb.append("}}"                   );

    return sb.toString();
  }
  public void setGoogleCoordsLat(float googleCoordsLat)
  {
    this.googleCoordsLat = googleCoordsLat;
  }
  public void setGoogleCoordsLong(float googleCoordsLong)
  {
    this.googleCoordsLong = googleCoordsLong;
  }
  public void setEmpty(boolean empty)
  {
    this.empty = empty;
  }
  
  
  public String getRue()
  {
    return rue;
  }
  public String getCodePostal()
  {
    return codePostal;
  }
  public String getVille()
  {
    return ville;
  }
  public float getGoogleCoordsLat()
  {
    return googleCoordsLat;
  }
  public float getGoogleCoordsLong()
  {
    return googleCoordsLong;
  }
  public boolean isEmpty()
  {
    return empty;
  }
}
