package coreoz.services.flyway

import com.coreoz.plume.db.transaction.TransactionManager
import org.flywaydb.core.Flyway
import javax.inject.Inject
import javax.inject.Singleton
import javax.sql.DataSource

@Singleton
class FlywayService
@Inject
private constructor(){
    fun migrate(dataSource: DataSource) {
        // execution des migrations de la BDD
        Flyway.configure()
            .dataSource(dataSource)
            .locations("/db/migration")
            .outOfOrder(true)
            .load()
            .migrate()
    }
}
