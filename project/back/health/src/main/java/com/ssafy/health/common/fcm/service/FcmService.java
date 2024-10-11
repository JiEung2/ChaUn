package com.ssafy.health.common.fcm.service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.ssafy.health.common.fcm.dto.request.FcmRequestDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;

@Slf4j
@Service
public class FcmService {

    public void sendMessageToDevice(FcmRequestDto fcmRequestDto)
            throws InterruptedException, ExecutionException {

        Message message = messageBuilder(fcmRequestDto);
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        String jsonOutput = gson.toJson(message);
        String response = FirebaseMessaging.getInstance().sendAsync(message).get();

        log.info("Sent message to token {}, {} payload {}", fcmRequestDto.getToken(), response, jsonOutput);
    }

    private Message messageBuilder(FcmRequestDto fcmRequestDto) {
        Notification notification = Notification.builder()
                .setTitle(fcmRequestDto.getTitle())
                .setBody(fcmRequestDto.getBody())
                .build();
        return Message.builder()
                .setNotification(notification)
                .setToken(fcmRequestDto.getToken())
                .build();
    }
}
