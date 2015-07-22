package fr.croixrouge.rdp.services.restServices.monitor.commons;

import com.wordnik.swagger.annotations.Api;
import com.wordnik.swagger.annotations.ApiOperation;
import com.wordnik.swagger.annotations.ApiParam;
import fr.croixrouge.rdp.model.monitor.InterventionTicket;
import fr.croixrouge.rdp.model.monitor.dwr.FilterObject;
import fr.croixrouge.rdp.model.monitor.dwr.GridSearchFilterAndSortObject;
import fr.croixrouge.rdp.model.monitor.dwr.ListRange;
import fr.croixrouge.rdp.model.monitor.dwr.SortObject;
import fr.croixrouge.rdp.services.intervention.InterventionService;
import fr.croixrouge.rdp.services.utilities.UtilitiesServiceImpl;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Component;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Component
@Path("/interventionScopedSearch")
@Produces(MediaType.APPLICATION_JSON)
@Api(value="InterventionSearch", description="Allow to search intervention with a scope of either a Dispositif or an Equipier")
public class InterventionListService
{
  private static Log          logger              = LogFactory.getLog(InterventionListService.class);
  private InterventionService interventionService = null;
  
  public InterventionListService(InterventionService interventionService)
  {
    this.interventionService = interventionService;
  }



  /*
  * {searchScope} : 'EQUIPIER' or 'DISPOSITIF'
  * {searchScopeId} : idEquipier or idDispositif, can't be 0
  * */
  @GET
  @Path("/{searchScope}/{searchScopeId}")
  @ApiOperation(value="Perform a paginated search on intervention, with a scope of an Equipier or a Dispositif")
  public ListRange<InterventionTicket> getInterventionList(@ApiParam(value="searchScope"   ,required=true) @PathParam("searchScope"  ) String  searchScope  ,
                                                           @ApiParam(value="searchScopeId" ,required=true) @PathParam("searchScopeId") Integer searchScopeId,
                                                           @ApiParam(value="start"         ,required=true , defaultValue="0" ) @QueryParam("start"     ) @DefaultValue("0" ) int start	,
                                                           @ApiParam(value="limit"         ,required=true , defaultValue="10") @QueryParam("limit"     ) @DefaultValue("10") int limit	,
                                                           @ApiParam(value="sortField"     ,required=true , defaultValue="id") @QueryParam("sortField" ) @DefaultValue("id") String  sortField,
                                                           @ApiParam(value="sortAsc"       ,required=false) @QueryParam("sortAsc"       ) boolean sortAsc      ,
                                                           @ApiParam(value="dateEntre"     ,required=false) @QueryParam("dateEntre"     ) Date    dateEntre		 ,
                                                           @ApiParam(value="dateEt"        ,required=false) @QueryParam("dateEt"        ) Date    dateEt			 ,
                                                           @ApiParam(value="motif"         ,required=false) @QueryParam("motif"         ) String  motif				 ,
                                                           @ApiParam(value="origine"       ,required=false) @QueryParam("origine"       ) String  origine		   ,
                                                           @ApiParam(value="nom"           ,required=false) @QueryParam("nom"           ) String  nom				   ,
                                                           @ApiParam(value="sex"           ,required=false) @QueryParam("sex"           ) Boolean sex				   ,
                                                           @ApiParam(value="age"           ,required=false) @QueryParam("age"           ) Integer age				   ,
                                                           @ApiParam(value="codePostal"    ,required=false) @QueryParam("codePostal"    ) Integer codePostal	 ,
                                                           @ApiParam(value="idRoleEquipier",required=false) @QueryParam("idRoleEquipier") Integer idRoleEquipier
                                                           ) throws Exception
  {
    SimpleDateFormat sdf = new SimpleDateFormat(UtilitiesServiceImpl.dateSDF);

    GridSearchFilterAndSortObject gsfaso = new GridSearchFilterAndSortObject();
    gsfaso.setStart(start);
    gsfaso.setLimit(limit);
    List<FilterObject> filters = new ArrayList<>(10);

    if(!(searchScope.equals("EQUIPIER") || searchScope.equals("DISPOSITIF")))
    {
      throw new IllegalArgumentException("searchScope must be 'EQUIPIER' or 'DISPOSITIF'");
    }
    if(searchScopeId == 0)
    {
      throw new IllegalArgumentException("searchScopeId must not be 0 or null");
    }
    //set the scope of the search
    filters.add(new FilterObject(searchScope, searchScopeId+"", FilterObject.COMP_LIKE));

    if(dateEntre != null)
    {
      filters.add(new FilterObject("DATE_ENTRE", sdf.format(dateEntre), FilterObject.COMP_SUPOREQUAL));
    }
    if(dateEt != null)
    {
      filters.add(new FilterObject("DATE_ET"   , sdf.format(dateEt)   , FilterObject.COMP_INFOREQUAL));
    }

    if(motif != null)
    {
      filters.add(new FilterObject("motif", motif, FilterObject.COMP_EQUAL));
    }

    if(origine != null)
    {
      filters.add(new FilterObject("origine", origine, FilterObject.COMP_EQUAL));
    }

    if(nom != null)
    {
      filters.add(new FilterObject("nom", nom, FilterObject.COMP_LIKE));
    }

    if(sex != null)
    {
      filters.add(new FilterObject("sex", sex?"1":"0", FilterObject.COMP_EQUAL));
    }

    if(age != null)
    {
      filters.add(new FilterObject("age", age+"", FilterObject.COMP_AROUND));
    }

    if(codePostal != null)
    {
      filters.add(new FilterObject("codePostal", codePostal+"", FilterObject.COMP_AROUND));
    }

    if(idRoleEquipier != null)
    {
      filters.add(new FilterObject("ROLE_EQUIPIER", idRoleEquipier+"", FilterObject.COMP_EQUAL));
    }

    gsfaso.setFilters(filters.toArray(new FilterObject[filters.size()]));

    if(sortField != null)
    {
      gsfaso.setSingleSort(new SortObject(sortField, sortAsc));
    }


    ListRange<InterventionTicket> interventions = null;
    try
    {  
      interventions = this.interventionService.searchInterventions(gsfaso);    
    }
    catch (Exception e)
    {
      logger.error("Erreur lors de la récupération de la liste des interventions", e);
      throw e;
    }
    return interventions;
  }
}
