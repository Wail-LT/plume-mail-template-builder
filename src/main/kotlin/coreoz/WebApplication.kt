package coreoz

import com.coreoz.plume.jersey.guice.JerseyGuiceFeature
import com.google.inject.Guice
import com.google.inject.Injector
import com.google.inject.Stage
import coreoz.guice.ApplicationModule
import coreoz.jersey.GrizzlySetup
import org.glassfish.grizzly.GrizzlyFuture
import org.glassfish.grizzly.http.server.HttpServer
import org.glassfish.jersey.server.ResourceConfig
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import java.time.Duration
import java.util.concurrent.TimeUnit
import kotlin.system.exitProcess

/**
 * The application entry point, where it all begins.
 */
object WebApplication {
    private val logger: Logger = LoggerFactory.getLogger(WebApplication::class.java)

    // maximal waiting time for the last process to execute after the JVM received a kill signal
    val GRACEFUL_SHUTDOWN_TIMEOUT: Duration = Duration.ofSeconds(60)

    @kotlin.jvm.JvmStatic
    fun main(args: Array<String>) {
        try {
            val startTimestamp: Long = System.currentTimeMillis()

            // initialize all application objects with Guice
            val injector: Injector = Guice.createInjector(Stage.PRODUCTION, ApplicationModule())
            val jerseyResourceConfig: ResourceConfig = injector.getInstance(ResourceConfig::class.java)
            // enable Jersey to create objects through Guice Injector instance
            jerseyResourceConfig.register(JerseyGuiceFeature(injector))
            // starts the server
            val httpServer: HttpServer = GrizzlySetup.start(
                jerseyResourceConfig,
                System.getProperty("http.port"),
                System.getProperty("http.address"),
            )

            // Add a shutdown hook to execute some code when the JVM receive a kill signal before it stops
            addShutDownListener(httpServer)
            // If Plume Scheduler / Wisp is used, uncomment next line
            // addShutDownListerner(httpServer, injector.getInstance(Scheduler.class));
            logger.info("Server started in {} ms", System.currentTimeMillis() - startTimestamp)
        } catch (e: Throwable) {
            logger.error("Failed to start server", e)
            // This line is important, because during initialization some libraries change the main thread type
            // to daemon, which mean that even if the project is completely down, the JVM is not stopped.
            // Stopping the JVM is important to enable production supervision tools to detect and restart the project.
            exitProcess(1)
        }
    }

    private fun addShutDownListener(httpServer: HttpServer) { // If scheduler is used, add arg: Scheduler scheduler
        Runtime.getRuntime().addShutdownHook(
            Thread(
                Runnable {
                    logger.info("Stopping signal received, shutting down server and scheduler...")
                    val grizzlyServerShutdownFuture: GrizzlyFuture<HttpServer> = httpServer.shutdown(
                        GRACEFUL_SHUTDOWN_TIMEOUT.toSeconds(),
                        TimeUnit.SECONDS,
                    )
                    try {
                        logger.info(
                            "Waiting for server to shut down... Shutdown timeout is {} seconds",
                            GRACEFUL_SHUTDOWN_TIMEOUT.toSeconds(),
                        )
                        // If scheduler is used, uncomment next line
                        // scheduler.gracefullyShutdown(GRACEFUL_SHUTDOWN_TIMEOUT);
                        grizzlyServerShutdownFuture.get()
                    } catch (e: Exception) {
                        logger.error("Error while shutting down server.", e)
                    }
                    logger.info("Server and scheduler stopped.")
                },
                "shutdownHook",
            ),
        )
    }
}
