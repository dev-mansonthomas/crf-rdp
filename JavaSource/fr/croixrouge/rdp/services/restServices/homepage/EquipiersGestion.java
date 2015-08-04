package fr.croixrouge.rdp.services.restServices.homepage;

import com.wordnik.swagger.annotations.Api;
import com.wordnik.swagger.annotations.ApiOperation;
import com.wordnik.swagger.annotations.ApiParam;
import fr.croixrouge.rdp.model.monitor.Equipier;
import fr.croixrouge.rdp.model.monitor.EquipierRole;
import fr.croixrouge.rdp.model.monitor.User;
import fr.croixrouge.rdp.model.monitor.dwr.FilterObject;
import fr.croixrouge.rdp.model.monitor.dwr.GridSearchFilterAndSortObject;
import fr.croixrouge.rdp.model.monitor.dwr.ListRange;
import fr.croixrouge.rdp.model.monitor.dwr.SortObject;
import fr.croixrouge.rdp.services.equipier.EquipierService;
import fr.croixrouge.rdp.services.user.UserService;
import fr.croixrouge.rdp.services.utilities.UtilitiesService;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Component;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.ArrayList;
import java.util.List;

@Component
@Path("/equpier")
@Produces(MediaType.APPLICATION_JSON)
@Api(value="EquipierEditor", description="Allow to do CRUD+Search operation on Equipier")

public class EquipiersGestion
{
  private static Log          logger              = LogFactory.getLog(EquipiersGestion.class);
  
  private EquipierService         equipierService  = null;
  private UserService             userService      = null;
  private UtilitiesService        utilitiesService = null;
  
  public EquipiersGestion(EquipierService   equipierService ,
                          UserService       userService     ,
                          UtilitiesService  utilitiesService)
  {
    this.equipierService    = equipierService  ;
    this.userService        = userService      ;
    this.utilitiesService   = utilitiesService;

    if(logger.isDebugEnabled())
      logger.debug("constructor called");
  }



  @GET
  @Path("/search")
  @ApiOperation(value="Perform a paginated search on equipiers")
  public ListRange<Equipier> getEquipierList(  @ApiParam(value="start"     ,required=true , defaultValue="0"  ) @QueryParam("start"     ) @DefaultValue("0"  ) int start	,
                                               @ApiParam(value="limit"     ,required=true , defaultValue="10" ) @QueryParam("limit"     ) @DefaultValue("10" ) int limit	,
                                               @ApiParam(value="sortField" ,required=true , defaultValue="nom") @QueryParam("sortField" ) @DefaultValue("nom") String  sortField,
                                               @ApiParam(value="sortAsc"   ,required=false) @QueryParam("sortAsc"   ) boolean sortAsc     ,
                                               @ApiParam(value="nom"            ,required=false) @QueryParam("nom"       			) String 	nom          	,
                                               @ApiParam(value="prenom"         ,required=false) @QueryParam("prenom"			    ) String 	prenom   			,
                                               @ApiParam(value="nivol"          ,required=false) @QueryParam("nivol"					) String  nivol					,
                                               @ApiParam(value="equipierIsMale" ,required=false) @QueryParam("equipierIsMale"	) Boolean equipierIsMale,
                                               @ApiParam(value="idRoleEquipier" ,required=false) @QueryParam("idRoleEquipier"	) Integer idRoleEquipier,
                                               @ApiParam(value="email"          ,required=false) @QueryParam("email"					) String  email					,
                                               @ApiParam(value="mobile"         ,required=false) @QueryParam("mobile"					) String  mobile				,
                                               @ApiParam(value="enabled"        ,required=false) @QueryParam("enabled"				) Boolean enabled				,
                                               @ApiParam(value="idDelegation"   ,required=false) @QueryParam("idDelegation"		) Integer idDelegation	 ) throws Exception
  {
    GridSearchFilterAndSortObject gsfaso = new GridSearchFilterAndSortObject();
    gsfaso.setStart(start);
    gsfaso.setLimit(limit);
    List<FilterObject> filters = new ArrayList<>(9);

    
    if(nom != null)
    {
      filters.add(new FilterObject("NOM", nom, FilterObject.COMP_LIKE));
    }
    if(prenom != null)
    {
      filters.add(new FilterObject("PRENOM", prenom, FilterObject.COMP_LIKE));
    }
    if(nivol != null)
    {
      filters.add(new FilterObject("nivol", nivol, FilterObject.COMP_LIKE));
    }
    if(mobile != null)
    {
      filters.add(new FilterObject("MOBILE", mobile, FilterObject.COMP_LIKE));
    }
    if(email != null)
    {
      filters.add(new FilterObject("EMAIL", email, FilterObject.COMP_LIKE));
    }

    if(equipierIsMale != null)
    {
      filters.add(new FilterObject("EQUIPIER_IS_MALE", equipierIsMale?"1":"0", FilterObject.COMP_EQUAL));
    }

    if(enabled != null)
    {
      filters.add(new FilterObject("ENABLED", enabled?"1":"0", FilterObject.COMP_EQUAL));
    }

    if(idRoleEquipier != null)
    {
      filters.add(new FilterObject("ID_ROLE_EQUIPIER", idRoleEquipier+"", FilterObject.COMP_EQUAL));
    }
    if(idDelegation != null)
    {
      filters.add(new FilterObject("ID_DELEGATION", idDelegation+"", FilterObject.COMP_EQUAL));
    }

    gsfaso.setFilters(filters.toArray(new FilterObject[filters.size()]));


    if(sortField != null)
    {
      gsfaso.setSingleSort(new SortObject(sortField, sortAsc));
    }

    try
    {  
      return  this.equipierService.getEquipiers(gsfaso);    
    }
    catch (Exception e)
    {
      logger.error("Erreur lors de la récupération de la liste des équipiers", e);
      throw e;
    }
    
  }

  @GET
  @Path("/{idEquipier}")
  @ApiOperation(value="Get the full details of one Equipier object")
  public Equipier getEquipier(@ApiParam(value="idEquipier"    ,required=true) @PathParam ("idEquipier")  int idEquipier) throws Exception
  {
    try
    {
      return this.equipierService.getEquipier(idEquipier);
    }
    catch(Exception e)
    {
      logger.error("Erreur lors de la récupération de l'équipier dont l'id est '"+idEquipier+"'", e);
      throw e;
    }
  }

  @GET
  @Path("/{idEquipier}/roles")
  @ApiOperation(value="Get the roles of one Equipier object")
  public List<EquipierRole>getEquipierRoles(@ApiParam(value="idEquipier"    ,required=true) @PathParam ("idEquipier")int idEquipier) throws Exception
  {
    
    try
    {
      List<EquipierRole> list = this.equipierService.getEquipierRoles(idEquipier);
      return list;
    }
    catch (Exception e)
    {
      logger.error("Erreur lors de la récupération de la liste des Roles d'un équipier", e);
      throw e;
    }
  }

  @PUT
  @Path("/{idEquipier}/enable")
  @ApiOperation(value="enable or disable one equipier (equipier can't be deleted)")
  public void enableEquipier(@ApiParam(value="idEquipier"    ,required=true) @PathParam ("idEquipier")int idEquipier,
                             @ApiParam(value="enable"        ,required=true) @QueryParam("enable"    )boolean enable) throws Exception
  {
    try
    {
      this.equipierService.setEnableDisableEquipier(idEquipier, enable);
    }
    catch (Exception e)
    {
      logger.error("Erreur lors de la récupération de la liste des équipiers", e);
      throw e;
    }
  }

  @POST
  @Consumes("application/json")
  @ApiOperation(value="Create a new Equipier")
  @Path("/create")
  public void createEquipier(@ApiParam(value="equipier"    ,required=true) Equipier equipier) throws Exception
  {
    try
    {
      int idEquipier = this.equipierService.createEquipier(equipier);
      equipier.setIdEquipier(idEquipier);
    }
    catch (Exception e)
    {
      logger.error("Error while creating an equipier",e);
      throw e;
    }
  }

  @PUT
  @Consumes("application/json")
  @ApiOperation(value="Update an Equipier")
  @Path("/update")
  public void modifyEquipier(@ApiParam(value="equipier"    ,required=true) Equipier equipier) throws Exception
  {

    try
    {
      this.equipierService.modifyEquipier(equipier);
    }
    catch(DuplicateKeyException dke)
    {
      logger.error("Erreur lors de la modification de l'équipier "+equipier,dke);
      throw new Exception("un des champs identifiant de l'équipier (nivol, mobile, mail) existe déjà chez un autre équipier. "+dke.getMessage());
    }
    catch (Exception e)
    {
      logger.error("Error while updating equipier",e);
      throw e;
    }
  }




  @GET
  @Path("/{idEquipier}/user")
  @ApiOperation(value="Get the User Object of the equipier Id")
  public User getEquipierUserFromIdEquipier(@ApiParam(value="idEquipier"    ,required=true) @PathParam ("idEquipier")int idEquipier) throws Exception
  {
    
    try
    {
      User user = this.userService.getUserFromIdEquipier(idEquipier); 
      return user;
    }
    catch (Exception e)
    {
      logger.error("Error while getting user with idEquipier='"+idEquipier+"'",e);
      throw e;
    }
  }

  @POST
  @Path("/{idEquipier}/user/{idUser}")
  @ApiOperation(value="if idUser=0 and active=true, create a new user and activate it. if idUser!=0 update its status")
  public User changeStatus(@ApiParam(value="idEquipier" ,required=true) @PathParam ("idEquipier")int      idEquipier,
                           @ApiParam(value="idUser"     ,required=true) @PathParam ("idUser"    )int      idUser,
                           @ApiParam(value="active"     ,required=true) @QueryParam("active"    )boolean  active
                          ) throws Exception
  {
    if(idUser == 0 && !active)
      throw new IllegalArgumentException("IdUser=0 => on ne peut pas desactiver un équipier qui n'est pas un utilisateur");

    try
    {
      
      if(idUser == 0 )  // si on est ici, c'est qu'active est a true (cf throw new ... au dessus)
      {
        User user = new User();
        user.setIdEquipier(idEquipier);
        user.setPassword(this.utilitiesService.generatePassword());
        
        this.userService.createUser(user);
        
        //TODO : mail du password
        
        
        return user;
      }
      
      this.userService.updateUserStatus(idUser, active);
      return this.userService.getUserFromIdEquipier(idEquipier);
    }
    catch (Exception e)
    {
      logger.error("Error while getting user with idEquipier='"+idEquipier+"'",e);
      throw e;
    }
  }

  @PUT
  @Path("/user/{idUser}/role/{idRole}")
  @ApiOperation(value="edit a role attribute for a user")
  public User updateRoleForUser(@ApiParam(value="idUser"        ,required=true) @PathParam ("idUser"    )int idUser,
                                @ApiParam(value="idRole"        ,required=true) @PathParam ("idRole"    )int idRole,
                                @ApiParam(value="active"        ,required=true) @QueryParam("active"    )boolean active) throws Exception
  {
    
    
    if(idUser == 0)
      throw new IllegalArgumentException("IdUser=0 can't set a role to a non existing user");
    if(idRole == 0)
      throw new IllegalArgumentException("idRole=0 can't set a role with id=0");


    try
    {
      this.userService.updateUserRole(idUser, idRole, active);
      return this.userService.getUser(idUser);
    }
    catch (Exception e)
    {
      logger.error("Error while updating role to user with idUser='"+idUser+"'",e);
      throw e;
    }
  }

  @PUT
  @Path("/user/{idUser}/password")
  @ApiOperation(value="Get the User Object of one Equipier object")
  public User generateNewPassword(@ApiParam(value="idUser"        ,required=true) @PathParam ("idUser"    )int idUser) throws Exception
  {
    
    
    if(idUser == 0 )
      throw new IllegalArgumentException("IdUser=0 => can't generate new password to non existing user");

    try
    {
      
      String password = this.utilitiesService.generatePassword();
      
      this.userService.updateUserPassword(idUser, password);
      
      //TODO mail du password
      User user = this.userService.getUser(idUser);
      user.setPassword(password);
      return user;
    }
    catch (Exception e)
    {
      logger.error("Error while generating new password for user with idUser='"+idUser+"'",e);
      throw e;
    }
  }
}
