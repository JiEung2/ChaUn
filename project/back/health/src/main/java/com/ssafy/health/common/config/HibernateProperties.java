package com.ssafy.health.common.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Setter
@Getter
@Configuration
@ConfigurationProperties(prefix = "spring.jpa.properties.hibernate")
public class HibernateProperties {
    private String hbm2Ddl;
    private String formatSql;
    private String dialect;
}