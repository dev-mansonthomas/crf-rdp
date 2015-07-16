package fr.croixrouge.rdp.services.restServices.homepage;

import com.wordnik.swagger.annotations.Api;
import com.wordnik.swagger.annotations.ApiOperation;
import com.wordnik.swagger.annotations.ApiParam;
import fr.croixrouge.rdp.model.monitor.Lieu;
import fr.croixrouge.rdp.model.monitor.dwr.FilterObject;
import fr.croixrouge.rdp.model.monitor.dwr.GridSearchFilterAndSortObject;
import fr.croixrouge.rdp.model.monitor.dwr.ListRange;
import fr.croixrouge.rdp.model.monitor.dwr.SortObject;
import fr.croixrouge.rdp.services.lieu.LieuService;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Component;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.ArrayList;
import java.util.List;

@Component
@Path("/lieu")
@Produces(MediaType.APPLICATION_JSON)
@Api(value="LieuEditor", description="Allow to do CRUD+Search operation on Lieu")
public class LieuEditor
{
  private static Log          logger              = LogFactory.getLog(LieuEditor.class);
  
  private LieuService                         lieuService               = null;
  
  public LieuEditor( LieuService lieuService )
  {
    this.lieuService               = lieuService              ; 

    if(logger.isDebugEnabled())
      logger.debug("constructor called");
  }
 
  @GET
  @Path("/search")
  @ApiOperation(value="Perform a paginated search on lieux")
  public ListRange<Lieu> getLieux( 	@ApiParam(value="start"     ,required=true , defaultValue="0" ) @QueryParam("start"     ) @DefaultValue("0" ) int start	,
                                    @ApiParam(value="limit"     ,required=true , defaultValue="10") @QueryParam("limit"     ) @DefaultValue("10") int limit	,
                                    @ApiParam(value="sortField" ,required=true , defaultValue="id") @QueryParam("sortField" ) @DefaultValue("id") String  sortField,
                                    @ApiParam(value="sortAsc"   ,required=false) @QueryParam("sortAsc"   ) boolean sortAsc     ,
                                    @ApiParam(value="nom"       ,required=false) @QueryParam("nom"       ) String nom				   ,  
                                    @ApiParam(value="codePostal",required=false) @QueryParam("codePostal") String codePostal	 ,
                                    @ApiParam(value="idTypeLieu",required=false) @QueryParam("idTypeLieu") int    idTypeLieu   ) throws Exception
  {
	  GridSearchFilterAndSortObject gsfaso = new GridSearchFilterAndSortObject();
	  gsfaso.setStart(start);
	  gsfaso.setLimit(limit);
	  List<FilterObject> filters = new ArrayList<FilterObject>(3);
	  
	  if(nom != null)
	  {
	    filters.add(new FilterObject("nom", nom, FilterObject.COMP_LIKE));
	  }
	  if(codePostal != null)
    {
      filters.add(new FilterObject("codePostal", codePostal, FilterObject.COMP_LIKE));
    }
	  
	  if(idTypeLieu != 0)
    {
      filters.add(new FilterObject("idTypeLieu", idTypeLieu+"", FilterObject.COMP_EQUAL));
    }
	  
	  gsfaso.setFilters(filters.toArray(new FilterObject[filters.size()]));
	  
	  
	  if(sortField != null)
	  {
	    gsfaso.setSingleSort(new SortObject(sortField, sortAsc));
	  }

    try
    {
      return  this.lieuService.getLieux(gsfaso);
    }
    catch (Exception e)
    {
      logger.error("Erreur lors de la récupération de la liste des lieux avec la recherche "+gsfaso, e);
      throw e;
    }
  }
  

  @GET
  @Path("/{idLieu}")
  @ApiOperation(value="Get the full details of one lieu object")
  public Lieu getLieu(@ApiParam(value="idLieu",required=true) @PathParam("idLieu") int idLieu) throws Exception
  {
    
    try
    {  
      return  this.lieuService.getLieu(idLieu);    
    }
    catch (Exception e)
    {
      logger.error("Erreur lors de la récupération du lieu '"+idLieu+"'", e);
      throw e;
    }
  }
  @PUT
  @Path("/{idLieu}/enable")
  @ApiOperation(value="enable one lieu")
  public void enableLieu (@ApiParam(value="idLieu",required=true) @PathParam ("idLieu") int idLieu) throws Exception
  {
    
    try
    {  
      this.lieuService.setEnableStatusOnLieu(idLieu, true);    
    }
    catch (Exception e)
    {
      logger.error("Erreur lors de l'activation du lieu '"+idLieu+"'", e);
      throw e;
    }
  }
  @PUT
  @Path("/{idLieu}/disable")
  @ApiOperation(value="disable one lieu")
  public void disableLieu(@ApiParam(value="idLieu",required=true) @PathParam ("idLieu") int idLieu) throws Exception
  {
    
    try
    {  
      this.lieuService.setEnableStatusOnLieu(idLieu, false);
    }
    catch (Exception e)
    {
      logger.error("Erreur lors de l'activation du lieu '"+idLieu+"'", e);
      throw e;
    }
  }
  @DELETE
  @Path("/{idLieu}")
  @ApiOperation(value="delete one lieu")
  public void deleteLieu(@ApiParam(value="idLieu",required=true) @PathParam ("idLieu") int idLieu) throws Exception
  {
    
    try
    {  
      this.lieuService.deleteLieu(idLieu);  
    }
    catch (Exception e)
    {
      String msg = "Erreur lors de la suppression du lieu '"+idLieu+"'. Ce lieu a peut etre été référencé dans l'application, vous ne pouvez que le désactiver";
      logger.error(msg, e);


      throw new Exception(msg + "\n\n" +e.getMessage());
    }
  }
  @POST
  @ApiOperation(value="Create an empty lieu and return the lieuId (DB primary key)")
  public Lieu createNewEmptyLieu() throws Exception
  {
    
    try
    {  
      return new Lieu(this.lieuService.createNewEmptyLieu());
    }
    catch (Exception e)
    {
      logger.error("Erreur lors de la création d'un nouveau lieu", e);
      throw e;
    }
  }
  
  @PUT
  @Path("/{idLieu}/updateGoogleCoordinates")
  @ApiOperation(value="update google coordinates of one lieu")
  public void updateGoogleCoordinates(@ApiParam(value="latitude" ,required=true) @QueryParam("latitude" ) float latitude, 
                                      @ApiParam(value="longitude",required=true) @QueryParam("longitude") float longitude, 
                                      @ApiParam(value="idLieu"   ,required=true) @PathParam ("idLieu"   ) int   idLieu) throws Exception
  {
    
    try
    {
      this.lieuService.updateGoogleCoordinates(latitude, longitude, idLieu);
    }
    catch(Exception e)
    {
      throw e;
    }
  }
  @PUT
  @Path("/{idLieu}/updateIntegerField")
  @ApiOperation(value="update an integer field of one lieu")
  public void updateIntegerField( @ApiParam(value="idLieu"    ,required=true) @PathParam ("idLieu"    ) int    idLieu, 
                                  @ApiParam(value="fieldName" ,required=true) @QueryParam("fieldName" ) String fieldName, 
                                  @ApiParam(value="fieldValue",required=true) @QueryParam("fieldValue") int    fieldValue) throws Exception
  {
    
    try
    {
      this.lieuService.updateIntegerField(idLieu, fieldName, fieldValue);
    }
    catch(Exception e)
    {
      logger.error("Error while updating integer field on lieu id='"+idLieu+"' fieldName='"+fieldName+"' fieldValue='"+fieldValue+"'",e);
      throw e;
    }
    
  }
  
  @PUT
  @Path("/{idLieu}/updateStringField")
  @ApiOperation(value="update a String field of one lieu")
  public void updateStringField ( @ApiParam(value="idLieu"    ,required=true) @PathParam ("idLieu"    ) int    idLieu, 
                                  @ApiParam(value="fieldName" ,required=true) @QueryParam("fieldName" ) String fieldName, 
                                  @ApiParam(value="fieldValue",required=true) @QueryParam("fieldValue") String fieldValue) throws Exception
  {
    
    try
    {
      this.lieuService.updateStringField(idLieu, fieldName, fieldValue);
    }
    catch(Exception e)
    {
      logger.error("Error while updating String field on lieu id='"+idLieu+"' fieldName='"+fieldName+"' fieldValue='"+fieldValue+"'",e);
      throw e;
    }
  }
}
