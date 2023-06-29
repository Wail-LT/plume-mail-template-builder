package coreoz.guice

import com.coreoz.plume.admin.guice.GuiceAdminWsWithDefaultsModule
import com.coreoz.plume.conf.guice.GuiceConfModule
import com.coreoz.plume.db.querydsl.guice.GuiceQuerydslModule
import com.coreoz.plume.jersey.guice.GuiceJacksonModule
import com.google.inject.AbstractModule
import coreoz.jersey.JerseyConfigProvider
import org.glassfish.jersey.server.ResourceConfig

/**
 * Group the Guice modules to install in the application
 */
class ApplicationModule : AbstractModule() {
    override fun configure() {
        install(GuiceConfModule())
        install(GuiceJacksonModule())
        // database & Querydsl installation
        install(GuiceQuerydslModule());
        install(GuiceAdminWsWithDefaultsModule())

        // prepare Jersey configuration
        bind(ResourceConfig::class.java).toProvider(JerseyConfigProvider::class.java)
    }
}
