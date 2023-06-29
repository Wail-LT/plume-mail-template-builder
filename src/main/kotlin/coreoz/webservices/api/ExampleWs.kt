package coreoz.webservices.api

import com.coreoz.plume.jersey.security.permission.PublicApi
import coreoz.services.configuration.ConfigurationService
import coreoz.webservices.api.data.Test
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.Parameter
import io.swagger.v3.oas.annotations.tags.Tag
import javax.inject.Inject
import javax.inject.Singleton
import javax.ws.rs.Consumes
import javax.ws.rs.GET
import javax.ws.rs.Path
import javax.ws.rs.PathParam
import javax.ws.rs.Produces
import javax.ws.rs.core.MediaType

@Path("/example")
@Tag(name = "example", description = "Manage exemple web-services")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@PublicApi
@Singleton
class ExampleWs
@Inject
private constructor(private val configurationService: ConfigurationService) {

    @GET
    @Path("/test/{name}")
    @Operation(description = "Example web-service")
    fun test(@Parameter(required = true) @PathParam("name") name: String): Test {
        return Test("hello $name")
    }
}
