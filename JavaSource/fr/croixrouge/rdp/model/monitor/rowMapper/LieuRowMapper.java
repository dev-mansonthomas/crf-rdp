package fr.croixrouge.rdp.model.monitor.rowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import fr.croixrouge.rdp.model.monitor.Lieu;

public class LieuRowMapper implements RowMapper<Lieu>
{

  public Lieu mapRow(ResultSet rs, int rowNum) throws SQLException
  {
    Lieu lieu = new Lieu();
    
    lieu.setIdLieu            (rs.getInt   ("id_lieu"             ));
    lieu.setIdTypeLieu        (rs.getInt   ("id_type_lieu"        ));
    lieu.setIcon              (rs.getString("icon"                ));
    lieu.setIconGmapInit      (rs.getString("icon_gmap_init"      ));
    lieu.setNom               (rs.getString("nom"                 ));
    lieu.setAddresse          (rs.getString("addresse"            ));
    lieu.setCodePostal        (rs.getString("code_postal"         ));
    lieu.setVille             (rs.getString("ville"               ));
    lieu.setGoogleCoordsLat   (rs.getFloat ("google_coords_lat"   ));
    lieu.setGoogleCoordsLong  (rs.getFloat ("google_coords_long"  ));
    lieu.setInfoComplementaire(rs.getString("info_complementaire" ));
    
    return lieu;
  }
}
