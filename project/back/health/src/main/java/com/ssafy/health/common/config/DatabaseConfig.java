package com.ssafy.health.common.config;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.autoconfigure.mongo.MongoProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.*;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Configuration
@EnableJpaRepositories(basePackages = "com.ssafy.health",
        excludeFilters = @ComponentScan.Filter(
                type = FilterType.ASSIGNABLE_TYPE,
                classes = {
                        MongoRepository.class
                }
        ))
@EnableMongoRepositories(basePackages = "com.ssafy.health",
        includeFilters = @ComponentScan.Filter(
                type = FilterType.ASSIGNABLE_TYPE,
                classes = {
                        MongoRepository.class
                }
        ))
@EnableConfigurationProperties({
        DataSourceProperties.class, MongoProperties.class, HibernateProperties.class
})
public class DatabaseConfig {

    @Autowired
    private HibernateProperties hibernateProperties;

    @Primary
    @Bean
    @ConfigurationProperties(prefix = "spring.datasource")
    public DataSourceProperties mySqlProperties() {
        return new DataSourceProperties();
    }

    @Primary
    @Bean
    public DataSource mySqlSource(DataSourceProperties mySqlProperties) {
        return mySqlProperties.initializeDataSourceBuilder()
                .driverClassName(mySqlProperties.getDriverClassName())
                .url(mySqlProperties.getUrl())
                .username(mySqlProperties.getUsername())
                .password(mySqlProperties.getPassword())
                .build();
    }

    @Primary
    @Bean
    public LocalContainerEntityManagerFactoryBean entityManagerFactory(
            EntityManagerFactoryBuilder builder, DataSource dataSource) {

        Map<String, Object> properties = new HashMap<>();
        properties.put("hibernate.hbm2ddl.auto", hibernateProperties.getHbm2Ddl());
        properties.put("hibernate.format_sql", hibernateProperties.getFormatSql());

        return builder.dataSource(dataSource)
                .packages("com.ssafy.health")
                .persistenceUnit("MySQL")
                .properties(properties)
                .build();
    }

    @Primary
    @Bean
    public PlatformTransactionManager transactionManager(
            LocalContainerEntityManagerFactoryBean entityManagerFactory) {
        return new JpaTransactionManager(Objects.requireNonNull(entityManagerFactory.getObject()));
    }

    @Bean
    public MongoClient mongoClient(MongoProperties mongoProperties) {

        String connectionString = String.format(
                "mongodb://%s:%s@%s:%d/%s?authSource=%s",
                mongoProperties.getUsername(),
                String.valueOf(mongoProperties.getPassword()),
                mongoProperties.getHost(),
                mongoProperties.getPort(),
                mongoProperties.getDatabase(),
                mongoProperties.getAuthenticationDatabase()
        );

        return MongoClients.create(MongoClientSettings.builder()
                .applyConnectionString(new ConnectionString(connectionString))
                .build());
    }

    @Bean
    public MongoTemplate mongoTemplate(MongoClient mongoClient, MongoProperties mongoProperties) {
        return new MongoTemplate(mongoClient, mongoProperties.getDatabase());
    }
}
