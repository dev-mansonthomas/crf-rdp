package fr.croixrouge.rdp.services.restServices;

import fr.croixrouge.rdp.services.restServices.homepage.EquipiersGestion;
import org.glassfish.jersey.server.ResourceConfig;

import fr.croixrouge.rdp.services.restServices.homepage.LieuEditor;

public class JerseyRegisterResource extends ResourceConfig
{
  public JerseyRegisterResource()
  {
    //CRF-RDP app
    register(LieuEditor.class);
    register(EquipiersGestion.class);

    packages(true, "fr.croixrouge.rdp.model.monitor");
    
    //swagger
    register(com.wordnik.swagger.jersey.listing.ApiListingResourceJSON.class);
    register(com.wordnik.swagger.jersey.listing.JerseyApiDeclarationProvider.class);
    register(com.wordnik.swagger.jersey.listing.JerseyResourceListingProvider.class);

  }
}
