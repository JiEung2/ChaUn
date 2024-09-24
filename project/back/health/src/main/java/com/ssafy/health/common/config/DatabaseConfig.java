package com.ssafy.health.common.config;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.ssafy.health.domain.account.repository.RecommendedCrewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.autoconfigure.mongo.MongoProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Configuration
@EnableJpaRepositories(basePackages = "com.ssafy.health")
@EnableMongoRepositories(basePackageClasses = {
    RecommendedCrewRepository.class,
})
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
        return MongoClients.create(mongoProperties.getUri());
    }

    @Bean
    public MongoTemplate mongoTemplate(MongoClient mongoClient, MongoProperties mongoProperties) {
        return new MongoTemplate(mongoClient, mongoProperties.getDatabase());
    }
}
