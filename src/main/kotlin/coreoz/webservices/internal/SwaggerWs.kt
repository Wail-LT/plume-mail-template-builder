package coreoz.webservices.internal

import com.coreoz.plume.jersey.security.basic.BasicAuthenticator
import com.coreoz.plume.jersey.security.permission.PublicApi
import com.fasterxml.jackson.core.JsonProcessingException
import coreoz.services.configuration.ConfigurationService
import io.swagger.v3.core.util.Yaml
import io.swagger.v3.jaxrs2.integration.JaxrsOpenApiContextBuilder
import io.swagger.v3.oas.integration.SwaggerConfiguration
import io.swagger.v3.oas.integration.api.OpenApiContext
import io.swagger.v3.oas.models.OpenAPI
import io.swagger.v3.oas.models.servers.Server
import javax.inject.Inject
import javax.inject.Singleton
import javax.ws.rs.GET
import javax.ws.rs.Path
import javax.ws.rs.Produces
import javax.ws.rs.container.ContainerRequestContext
import javax.ws.rs.core.Context
import javax.ws.rs.core.MediaType

@Path("/swagger")
@Singleton
@PublicApi
class SwaggerWs
@Inject
private constructor(private val configurationService: ConfigurationService) {
    private val swaggerDefinition: String
    private val basicAuthenticator: BasicAuthenticator<String>

    init {
        // Basic configuration
        val openApiConfig: SwaggerConfiguration = SwaggerConfiguration()
            .resourcePackages(setOf("coreoz.webservices.api"))
            .sortOutput(true)
            .openAPI(
                OpenAPI().servers(
                    listOf(
                        Server()
                            .url("/api")
                            .description("API kotlin"),
                    ),
                ),
            )

        // Generation of the OpenApi object
        val context: OpenApiContext = JaxrsOpenApiContextBuilder<JaxrsOpenApiContextBuilder<*>>()
            .openApiConfiguration(openApiConfig)
            .buildContext(true)
        // the OpenAPI object can be changed to add security definition
        // or to alter the generated mapping
        val openApi: OpenAPI = context.read()

        // serialization of the Swagger definition
        swaggerDefinition = Yaml.mapper().writeValueAsString(openApi)

        // require authentication to access the API documentation
        basicAuthenticator = BasicAuthenticator.fromSingleCredentials(
            configurationService.swaggerAccessUsername(),
            configurationService.swaggerAccessPassword(),
            "API kotlin",
        )
    }

    @Produces(MediaType.APPLICATION_JSON)
    @GET
    @kotlin.Throws(JsonProcessingException::class)
    operator fun get(@Context requestContext: ContainerRequestContext?): String {
        basicAuthenticator.requireAuthentication(requestContext)
        return swaggerDefinition
    }
}
