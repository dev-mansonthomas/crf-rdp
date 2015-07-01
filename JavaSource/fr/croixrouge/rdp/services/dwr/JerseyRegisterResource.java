package fr.croixrouge.rdp.services.dwr;

import org.glassfish.jersey.server.ResourceConfig;

import fr.croixrouge.rdp.services.dwr.homepage.LieuEditor;

public class JerseyRegisterResource extends ResourceConfig
{
  public JerseyRegisterResource()
  {
   
    register(LieuEditor.class);
    
    //swagger
    register(com.wordnik.swagger.jersey.listing.ApiListingResourceJSON.class);
    register(com.wordnik.swagger.jersey.listing.JerseyApiDeclarationProvider.class);
    register(com.wordnik.swagger.jersey.listing.JerseyResourceListingProvider.class);

  }
}
