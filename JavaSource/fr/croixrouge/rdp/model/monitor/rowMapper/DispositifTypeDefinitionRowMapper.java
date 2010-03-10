package fr.croixrouge.rdp.model.monitor.rowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import fr.croixrouge.rdp.model.monitor.DispositifTypeDefinition;

public class DispositifTypeDefinitionRowMapper extends RowMapperHelper implements RowMapper<DispositifTypeDefinition>
{
  public DispositifTypeDefinition mapRow(ResultSet rs, int rowNum) throws SQLException
  {
    DispositifTypeDefinition dispositifTypeDefinition = new DispositifTypeDefinition();

    dispositifTypeDefinition.setIdTypeDispositif(rs.getInt("id_dispositif_type" ));
    dispositifTypeDefinition.setIdRole          (rs.getInt("id_role"            ));
    dispositifTypeDefinition.setNombreMin       (rs.getInt("nombre_min"         ));
    dispositifTypeDefinition.setNombreMax       (rs.getInt("nombre_max"         ));

    return dispositifTypeDefinition;
  }
}