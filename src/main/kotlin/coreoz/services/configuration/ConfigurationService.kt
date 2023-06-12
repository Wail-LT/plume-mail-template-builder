package coreoz.services.configuration

import com.typesafe.config.Config
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class ConfigurationService
@Inject
private constructor(private val config: Config) {

    fun hello(): String {
        return config.getString("hello")
    }

    fun swaggerAccessUsername(): String {
        return config.getString("swagger.access.username")
    }

    fun swaggerAccessPassword(): String {
        return config.getString("swagger.access.password")
    }
}
