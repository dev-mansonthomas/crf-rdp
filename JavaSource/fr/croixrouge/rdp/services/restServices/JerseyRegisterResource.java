package fr.croixrouge.rdp.services.restServices;

import fr.croixrouge.rdp.services.restServices.homepage.EquipiersGestion;
import fr.croixrouge.rdp.services.restServices.homepage.Homepage;
import fr.croixrouge.rdp.services.restServices.monitor.commons.CreditsAndChangeLogDwrService;
import fr.croixrouge.rdp.services.restServices.monitor.commons.InterventionListService;
import org.glassfish.hk2.utilities.binding.AbstractBinder;
import org.glassfish.jersey.jackson.JacksonFeature;
import org.glassfish.jersey.media.multipart.MultiPartFeature;
import org.glassfish.jersey.server.ResourceConfig;

import fr.croixrouge.rdp.services.restServices.homepage.LieuEditor;

import javax.servlet.http.HttpSession;

public class JerseyRegisterResource extends ResourceConfig
{
  public JerseyRegisterResource()
  {
    //CRF-RDP app
    register(LieuEditor.class);
    register(EquipiersGestion.class);
    register(Homepage.class);

    register(CreditsAndChangeLogDwrService.class);
    register(InterventionListService.class);
    register(JacksonFeature.class);
    register(MultiPartFeature.class);

    packages(true, "fr.croixrouge.rdp.model.monitor");
    
    //swagger
    register(com.wordnik.swagger.jersey.listing.ApiListingResourceJSON.class);
    register(com.wordnik.swagger.jersey.listing.JerseyApiDeclarationProvider.class);
    register(com.wordnik.swagger.jersey.listing.JerseyResourceListingProvider.class);

    //register httpsession factory with HK2 (dependency management too)
    register(new AbstractBinder()
    {
      @Override
      protected void configure()
      {
        bindFactory(HttpSessionFactory.class).to(HttpSession.class);
      }
    });

  }
}
