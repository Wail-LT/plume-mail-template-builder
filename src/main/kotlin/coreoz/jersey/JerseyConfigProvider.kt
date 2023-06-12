package coreoz.jersey

import com.coreoz.plume.jersey.errors.WsJacksonJsonProvider
import com.coreoz.plume.jersey.errors.WsResultExceptionMapper
import com.coreoz.plume.jersey.java8.TimeParamProvider
import com.coreoz.plume.jersey.security.permission.PublicApi
import com.coreoz.plume.jersey.security.permission.RequireExplicitAccessControlFeature
import com.fasterxml.jackson.databind.ObjectMapper
import org.glassfish.jersey.server.ResourceConfig
import javax.inject.Inject
import javax.inject.Provider
import javax.inject.Singleton

/**
 * Jersey configuration
 */
@Singleton
class JerseyConfigProvider
@Inject
private constructor(private val objectMapper: ObjectMapper?) : Provider<ResourceConfig?> {
    private val config: ResourceConfig
    override fun get(): ResourceConfig {
        return config
    }

    init {
        config = ResourceConfig()

        // this package will be scanned by Jersey to discover web-service classes
        config.packages("coreoz.webservices")

        // filters configuration
        // handle errors and exceptions
        config.register(WsResultExceptionMapper::class.java)
        // require explicit access control on API
        config.register(RequireExplicitAccessControlFeature.accessControlAnnotations(PublicApi::class.java))
        // to debug web-service requests
        // register(LoggingFeature.class);

        // java 8
        config.register(TimeParamProvider::class.java)

        // WADL is like swagger for jersey
        // by default it should be disabled to prevent leaking API documentation
        config.property("jersey.config.server.wadl.disableWadl", true)

        // Disable automatique relative location URI resolution
        // By default it transform a relative location to an absolute location
        config.property("jersey.config.server.headers.location.relative.resolution.disabled", true)

        // jackson mapper configuration
        val jacksonProvider = WsJacksonJsonProvider()
        jacksonProvider.setMapper(objectMapper)
        config.register(jacksonProvider)
    }
}
