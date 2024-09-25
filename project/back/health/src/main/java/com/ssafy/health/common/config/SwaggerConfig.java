package com.ssafy.health.common.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@OpenAPIDefinition(
        info = @Info(
                title = "Health API Docs",
                description = "<h3>Health API Reference for Developers</h3> SSAFY 특화 프로젝트 health API <br>",
                version = "v1",
                contact = @Contact(
                        name = "박지응, 김민영, 김민주, 박민철, 송준혁, 인호현",
                        email = "wldmd5007@naver.com"
                )
        )
)
@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI openAPI() {
        String securitySchemeName = "access";
        SecurityRequirement securityRequirement = new SecurityRequirement().addList(securitySchemeName);
        Components components = new Components()
                .addSecuritySchemes(securitySchemeName, new SecurityScheme()
                        .name(securitySchemeName)
                        .type(SecurityScheme.Type.APIKEY)  // HTTP 대신 APIKEY 사용
                        .in(SecurityScheme.In.HEADER));  // 헤더에 정의

        return new OpenAPI()
                .addSecurityItem(securityRequirement)
                .components(components);
    }
}
