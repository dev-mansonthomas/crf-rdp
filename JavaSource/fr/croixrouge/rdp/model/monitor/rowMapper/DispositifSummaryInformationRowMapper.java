package fr.croixrouge.rdp.model.monitor.rowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import fr.croixrouge.rdp.model.monitor.DispositifSummaryInformation;

public class DispositifSummaryInformationRowMapper  extends RowMapperHelper implements RowMapper<DispositifSummaryInformation>
{

  @Override
  public DispositifSummaryInformation mapRow(ResultSet rs, int rowNum) throws SQLException
  {
    DispositifSummaryInformation dispositifSummaryInformation = new DispositifSummaryInformation();
    
    dispositifSummaryInformation.setIdDispositif      (rs.getInt("id_dispositif"));
    dispositifSummaryInformation.setIdEtatDispositif  (rs.getInt("id_etat_dispositif"));
    dispositifSummaryInformation.setIdVehicule        (rs.getInt("id_vehicule"));
    
    return dispositifSummaryInformation;
  }
  

}
