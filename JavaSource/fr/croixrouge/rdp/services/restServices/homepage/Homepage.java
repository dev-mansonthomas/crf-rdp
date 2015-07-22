package fr.croixrouge.rdp.services.restServices.homepage;

import com.wordnik.swagger.annotations.Api;
import com.wordnik.swagger.annotations.ApiOperation;
import com.wordnik.swagger.annotations.ApiParam;
import fr.croixrouge.rdp.model.monitor.Regulation;
import fr.croixrouge.rdp.model.monitor.dwr.ListRange;
import fr.croixrouge.rdp.services.equipier.EquipierService;
import fr.croixrouge.rdp.services.regulation.RegulationService;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpSession;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Component
@Path("/homepage")
@Produces(MediaType.APPLICATION_JSON)
@Api(value="Homepage", description="Allow to list regulation and choose one regulation")
public class Homepage
{
  private static Log          logger              = LogFactory.getLog(Homepage.class);
  
  private RegulationService                       regulationService             = null;
 
  
  public Homepage(RegulationService                       regulationService             , 
                  EquipierService                         equipierService               )
  {
    this.regulationService             = regulationService            ;
    if(logger.isDebugEnabled())
      logger.debug("constructor called");
  }

  @GET
  @Path("/listRegulation")
  @ApiOperation(value="List opened regulation ")
  public ListRange<Regulation>getOpenRegulationList() throws Exception
  {
    List<Regulation> list = this.regulationService.getRegulations(true);
    return new ListRange<>(list.size(), list);
  }

  @PUT
  @Path("/chooseRegulation")
  @ApiOperation(value="Set the regulation on which the connected user will work")
  public void setRegulation(@ApiParam(value="idRegulation",required=true) @QueryParam("idRegulation")int idRegulation) throws Exception
  {
    //TODO get session
    HttpSession session = (HttpSession)  new Object();
    session.setAttribute("regulation", this.regulationService.getRegulation(idRegulation));
  }
}
