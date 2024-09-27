package com.ssafy.health.common.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Slf4j
@Component
@RequiredArgsConstructor
public class RequestUtil {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public <T, R> ResponseEntity<R> sendPostRequest(String url, T requestDto, Class<R> responseType)
            throws JsonProcessingException {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String jsonBody = objectMapper.writeValueAsString(requestDto);
        HttpEntity<String> request = new HttpEntity<>(jsonBody, headers);

        return restTemplate.exchange(url, HttpMethod.POST, request, responseType);
    }

    @Configuration
    static class RestTemplateConfig {

        @Bean
        public RestTemplate restTemplate() {
            return new RestTemplate();
        }

        @Bean
        public ObjectMapper objectMapper() {
            return new ObjectMapper();
        }
    }
}
