package coreoz.db

import com.coreoz.plume.conf.guice.GuiceConfModule
import com.coreoz.plume.db.querydsl.generation.IdBeanSerializer
import com.coreoz.plume.db.transaction.TransactionManager
import com.google.inject.Guice
import com.google.inject.Injector
import com.querydsl.codegen.EntityType
import com.querydsl.sql.Configuration
import com.querydsl.sql.SQLTemplates
import com.querydsl.sql.codegen.DefaultNamingStrategy
import com.querydsl.sql.codegen.MetaDataExporter
import com.querydsl.sql.types.JSR310InstantType
import com.querydsl.sql.types.JSR310LocalDateType
import com.querydsl.sql.types.JSR310LocalTimeType
import com.querydsl.sql.types.JSR310ZonedDateTimeType
import com.querydsl.sql.types.Type
import java.io.File
import java.sql.SQLException
import java.util.*

/**
 * Generate Querydsl classes for the database layer.
 *
 * Run the [.main] method from your IDE to regenerate Querydsl classes.
 */
object QuerydslGenerator {
    private const val TABLES_PREFIX = "plm_"
    const val intAccuracy = 9
    const val bigintAccuracy = 19

    @kotlin.jvm.JvmStatic
    fun main(args: Array<String>) {
        val configuration = Configuration(SQLTemplates.DEFAULT)
        configuration.register(classType(JSR310InstantType::class.java))
        configuration.register(classType(JSR310LocalDateType::class.java))
        configuration.register(classType(JSR310LocalTimeType::class.java))
        configuration.register(classType(JSR310ZonedDateTimeType::class.java))

        configuration.registerNumeric(1, 0, Boolean::class.java)
        configuration.registerNumeric(intAccuracy, 0, Long::class.java)
        configuration.registerNumeric(bigintAccuracy, 0, Long::class.java)

        val exporter = MetaDataExporter()
        exporter.setPackageName("coreoz.db.generated")
        exporter.setTargetFolder(File("src/main/java"))
        exporter.setTableNamePattern(TABLES_PREFIX + "%")
        exporter.setNamingStrategy(object : DefaultNamingStrategy() {
            @Deprecated("")
            override fun getClassName(tableName: String): String {
                // uncomment if you are using plume file
                // if("plm_file".equalsIgnoreCase(tableName)) {
                //     return FileEntityQuerydsl.class.getName();
                // }
                return super.getClassName(tableName.substring(TABLES_PREFIX.length))
            }

            override fun getDefaultVariableName(entityType: EntityType): String {
                val variableName = getClassName(entityType.getData().get("table").toString())
                return variableName.substring(0, 1).toLowerCase(Locale.ENGLISH) + variableName.substring(1)
            }
        })
        val beanSerializer: IdBeanSerializer = IdBeanSerializer().setUseJacksonAnnotation(true)
        beanSerializer.setAddToString(true)
        exporter.setBeanSerializer(beanSerializer)
        exporter.setColumnAnnotations(true)
        exporter.setConfiguration(configuration)
        val injector: Injector = Guice.createInjector(GuiceConfModule())
        injector.getInstance(TransactionManager::class.java).execute { connection ->
            try {
                exporter.export(connection.getMetaData())
            } catch (e: SQLException) {
                e.printStackTrace()
            }
        }
    }

    private fun classType(classType: Class<*>): Type<*> {
        return try {
            classType.getConstructor().newInstance() as Type<*>
        } catch (e: Exception) {
            throw RuntimeException(e)
        }
    }
}
