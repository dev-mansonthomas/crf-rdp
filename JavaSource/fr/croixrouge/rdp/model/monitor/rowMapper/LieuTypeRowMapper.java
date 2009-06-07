package fr.croixrouge.rdp.model.monitor.rowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import fr.croixrouge.rdp.model.monitor.LieuType;

public class LieuTypeRowMapper implements RowMapper
{

  public Object mapRow(ResultSet rs, int rowNum) throws SQLException
  {
    LieuType lieuType = new LieuType();
    
    lieuType.setIdTypeLieu     (rs.getInt   ("id_type_lieu"    ));
    lieuType.setLabelTypeLieu  (rs.getString("label_type_lieu" ));
    lieuType.setIconClassLieu  (rs.getString("icon_class_lieu" ));
    lieuType.setIconLieu       (rs.getString("icon_lieu"       ));
    lieuType.setIconGmapInit   (rs.getString("icon_gmap_init"  ));
    
    return lieuType;
  }

}
