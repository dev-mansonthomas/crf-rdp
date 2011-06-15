package fr.croixrouge.rdp.model.siord.rowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import fr.croixrouge.rdp.model.monitor.rowMapper.RowMapperHelper;
import fr.croixrouge.rdp.model.siord.Membre;

public class MembreRowMapper  extends RowMapperHelper implements RowMapper<Membre>
{
  private boolean siordDbSelect = false;
  
  public MembreRowMapper(boolean siordDbSelect)
  {
    this.siordDbSelect = siordDbSelect;
  }
  
  
  @Override
  public Membre mapRow(ResultSet rs, int rowNum) throws SQLException
  {
    Membre membre = new Membre();

    if(!this.siordDbSelect)
    {
      membre.setIdImport    (rs.getInt   ("id_synchro_siord"));  
    }
    
    membre.setId            (rs.getInt   ("id"            ));
    membre.setLogin         (rs.getString("login"         ));
    membre.setPwd           (rs.getString("pwd"           ));
    membre.setNom           (rs.getString("nom"           ));
    membre.setPrenom        (rs.getString("prenom"        ));
    membre.setDroits        (rs.getInt   ("droits"        ));
    membre.setTelephone     (rs.getString("telephone"     ));
    membre.setEmail         (rs.getString("email"         ));
    membre.setNivol         (rs.getString("nivol"         ));
    membre.setActivation    (rs.getString("activation"    ));
    membre.setSexe          (rs.getString("sexe"          ));
    membre.setDroitsCadre   (rs.getInt   ("droits_cadre"  ));
    membre.setIdDelUrgence  (rs.getInt   ("id_del_urgence"));
    //id delegation du siord, artificiellement alimenter par jointure lors de la requete sur la base du siord
    membre.setIdDelegation  (rs.getInt   ("id_delegation" ));
    
    membre.setDateCreation      (rs.getDate  ("date_creation"     ));
    membre.setDateModification  (rs.getDate  ("date_modification" ));
    
    return membre;
  }
}
