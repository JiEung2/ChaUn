package com.ssafy.health.common.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestTemplate;

@Component
@RequiredArgsConstructor
public class RequestUtil {

    private final ObjectMapper objectMapper;

    public <T, R> ResponseEntity<R> sendPostRequest(String url, T requestDto, Class<R> responseType)
            throws JsonProcessingException {

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String jsonBody = objectMapper.writeValueAsString(requestDto);
        HttpEntity<String> request = new HttpEntity<>(jsonBody, headers);

        try {
            return restTemplate.exchange(url, HttpMethod.POST, request, responseType);
        } catch (ResourceAccessException e) {
            throw new ResourceAccessException(e.getMessage());
        }
    }
}
