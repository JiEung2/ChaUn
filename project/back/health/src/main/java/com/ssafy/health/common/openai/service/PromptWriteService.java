package com.ssafy.health.common.openai.service;

import com.ssafy.health.common.openai.dto.ChatGPTRequest;
import com.ssafy.health.common.openai.dto.ChatGPTResponse;
import com.ssafy.health.common.openai.dto.RecommendedExerciseDto;
import com.ssafy.health.common.openai.dto.RecommendedExerciseListDto;
import com.ssafy.health.common.security.SecurityUtil;
import com.ssafy.health.domain.account.entity.FavoredExercise;
import com.ssafy.health.domain.account.entity.User;
import com.ssafy.health.domain.account.exception.UserNotFoundException;
import com.ssafy.health.domain.account.repository.FavoredRepository;
import com.ssafy.health.domain.account.repository.UserRepository;
import com.ssafy.health.domain.recommendation.entity.RecommendedExercise;
import com.ssafy.health.domain.recommendation.repository.RecommendedExerciseRepository;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class PromptWriteService {
    @Value("${openai.model}")
    private String model;

    @Value("${openai.api.url}")
    private String apiURL;

    private final RestTemplate template;
    private final UserRepository userRepository;
    private final FavoredRepository favoredRepository;
    private final RecommendedExerciseRepository recommendedExerciseRepository;

    public RecommendedExerciseListDto requestExerciseRecommendations() {
        String prompt = getPrompt();

        ChatGPTRequest request = new ChatGPTRequest(model, prompt);
        ChatGPTResponse chatGPTResponse = template.postForObject(apiURL, request, ChatGPTResponse.class);

        List<RecommendedExercise> recommendedExercises = parseChatGPTResponse(chatGPTResponse);
        saveRecommendedExercises(recommendedExercises);

        List<RecommendedExerciseDto> recommendedExerciseDtoList = recommendedExercises.stream()
                .map(RecommendedExerciseDto::fromEntity)
                .collect(Collectors.toList());

        return RecommendedExerciseListDto.builder()
                .recommendedExerciseList(recommendedExerciseDtoList)
                .build();
    }

    private String getPrompt() {
        String previousRecommendations = getPreviousRecommendations();
        String favoredExercises = getFavoredExercise();
        String prompt = "I need 5 exercise recommendations, considering that I enjoy the following exercises. ";

        if (favoredExercises != null && !favoredExercises.isEmpty()) {
            prompt += "\nI enjoy the following exercises: " + favoredExercises + ". Please recommend exercises that complement these.";
        } else {
            prompt += "\nI have not specified any favorite exercises. Please recommend a balanced mix of strength and non-strength exercises.";
        }

        if (previousRecommendations != null && !previousRecommendations.isEmpty()) {
            prompt += "\nPreviously recommended exercises: " + previousRecommendations;
            prompt += "Please try to exclude the exercises I have previously received as recommendations.";
        }

        prompt += "Please provide 2 strength exercises and 3 non-strength exercises. " +
                "Only list them in the following format, without any additional comments or explanations:" +
                "\nExercise: [exercise name]" +
                "\nReason: [I would like you to provide a reason for each recommendation, explaining how it helps with the exercises I frequently enjoy.]" +
                "\nDescription: [brief exercise description or method]" +
                "\n\nRepeat this format for each exercise. Answer in Korean.";
        System.out.println(prompt);
        return prompt;
    }

    private String getPreviousRecommendations() {
        List<RecommendedExercise> exerciseList = recommendedExerciseRepository.findByUserId(
                SecurityUtil.getCurrentUserId());
        if (exerciseList.isEmpty()) {
            return null;
        }

        return exerciseList.stream()
                .map(RecommendedExercise::getExerciseName)
                .collect(Collectors.joining(", "));
    }

    private String getFavoredExercise() {
        List<FavoredExercise> favoredExerciseList = favoredRepository.findByUserId(SecurityUtil.getCurrentUserId());
        if (favoredExerciseList.isEmpty()) {
            return null;
        }

        return favoredExerciseList.stream()
                .map(favoredExercise -> favoredExercise.getExercise().getName())
                .collect(Collectors.joining(", "));
    }

    private List<RecommendedExercise> parseChatGPTResponse(ChatGPTResponse chatGPTResponse) {
        String responseContent = chatGPTResponse.getChoices().get(0).getMessage().getContent();
        String[] exerciseEntries = responseContent.split("\n\n");  // 엔터로 구분된 각각의 운동 정보를 나눔

        User user = userRepository.findById(SecurityUtil.getCurrentUserId()).orElseThrow(UserNotFoundException::new);

        return Arrays.stream(exerciseEntries)
                .map(entry -> {
                    String[] lines = entry.split("\n");

                    String exerciseName = lines.length > 0 ? lines[0].replace("Exercise: ", "").trim() : "Unknown Exercise";
                    String reason = lines.length > 1 ? lines[1].replace("Reason: ", "").trim() : "No reason provided";
                    String description = lines.length > 2 ? lines[2].replace("Description: ", "").trim() : "No description provided";

                    return RecommendedExercise.builder()
                            .user(user)
                            .exerciseName(exerciseName)
                            .reason(reason)
                            .description(description)
                            .build();
                })
                .collect(Collectors.toList());
    }

    private void saveRecommendedExercises(List<RecommendedExercise> recommendedExercises) {
        recommendedExerciseRepository.saveAll(recommendedExercises);
    }
}
