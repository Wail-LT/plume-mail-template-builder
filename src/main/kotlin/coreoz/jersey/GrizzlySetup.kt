package coreoz.jersey

import com.coreoz.plume.jersey.grizzly.GrizzlyErrorPageHandler
import org.glassfish.grizzly.http.server.CLStaticHttpHandler
import org.glassfish.grizzly.http.server.HttpServer
import org.glassfish.jersey.grizzly2.httpserver.GrizzlyHttpServerFactory
import org.glassfish.jersey.server.ResourceConfig
import org.slf4j.bridge.SLF4JBridgeHandler
import java.io.IOException
import java.net.URI
import javax.ws.rs.core.UriBuilder

/**
 * Configure and start a Grizzly server
 */
object GrizzlySetup {
    private const val DEFAULT_HTTP_PORT = 8080
    private const val DEFAULT_HTTP_HOST = "0.0.0.0"

    @kotlin.Throws(IOException::class)
    fun start(jerseyResourceConfig: ResourceConfig?, httpPort: String?, httpHost: String?): HttpServer {
        // replace JUL logger (used by Grizzly) by SLF4J logger
        SLF4JBridgeHandler.removeHandlersForRootLogger()
        SLF4JBridgeHandler.install()
        val httpPortToUse = if (httpPort == null) DEFAULT_HTTP_PORT else httpPort.toInt()
        val httpHostToUse = httpHost ?: DEFAULT_HTTP_HOST

        // create the server
        val baseUri: URI = UriBuilder.fromUri("http://$httpHostToUse/api").port(httpPortToUse).build()
        val httpServer: HttpServer = GrizzlyHttpServerFactory.createHttpServer(
            baseUri,
            jerseyResourceConfig, // the server have to be started after the configuration is complete,
            // else the custom error page generator won't be used
            false,
        )

        // minimal error page to avoid leaking server information
        httpServer.getServerConfiguration().setDefaultErrorPageGenerator(GrizzlyErrorPageHandler())

        // webjars for swagger ui
        val webJarHandler = CLStaticHttpHandler(
            GrizzlySetup::class.java.getClassLoader(),
            "META-INF/resources/webjars/",
        )
        webJarHandler.setFileCacheEnabled(false)
        httpServer.getServerConfiguration().addHttpHandler(webJarHandler, "/webjars/")

        // static resources
        val httpHandler = CLStaticHttpHandler(
            GrizzlySetup::class.java.getClassLoader(),
            "/statics/",
        )
        // enable to view changes on a dev environnement when the project is run in debug mode ;
        // in production, statics assets should be served by apache or nginx
        httpHandler.setFileCacheEnabled(false)
        httpServer.getServerConfiguration().addHttpHandler(httpHandler)
        httpServer.start()
        return httpServer
    }
}
