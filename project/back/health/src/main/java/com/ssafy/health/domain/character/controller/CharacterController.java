package com.ssafy.health.domain.character.controller;

import com.ssafy.health.common.ApiResponse;
import com.ssafy.health.domain.character.dto.request.CharacterSaveRequestDto;
import com.ssafy.health.domain.character.dto.request.PartsSaveRequestDto;
import com.ssafy.health.domain.character.dto.response.CharacterResponseDto;
import com.ssafy.health.domain.character.dto.response.CharacterSaveSuccessDto;
import com.ssafy.health.domain.character.dto.response.PartsSaveSuccessDto;
import com.ssafy.health.domain.character.service.CharacterReadService;
import com.ssafy.health.domain.character.service.CharacterWriteService;
import jakarta.validation.Valid;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class CharacterController {

    private final CharacterReadService characterReadService;
    private final CharacterWriteService characterWriteService;

    @PostMapping("/character")
    public ApiResponse<CharacterSaveSuccessDto> saveBodySurvey(
            @Valid @RequestPart("characterSaveRequestDto") CharacterSaveRequestDto characterSaveRequestDto,
            @RequestPart("characterImage") MultipartFile characterImage,
            @RequestPart("characterFile") MultipartFile characterFile) throws IOException {
        return ApiResponse.success(
                characterWriteService.saveCharacter(characterSaveRequestDto, characterImage, characterFile));
    }

    @PostMapping("/parts")
    public ApiResponse<PartsSaveSuccessDto> saveParts(
            @Valid @RequestPart("partsSaveRequestDto") PartsSaveRequestDto partsSaveRequestDto,
            @RequestPart("partImage") MultipartFile partImage) throws IOException {
        return ApiResponse.success(characterWriteService.saveParts(partsSaveRequestDto, partImage));
    }

    @GetMapping("/users/my/character")
    public ApiResponse<CharacterResponseDto> getMyCharacter() {
        return ApiResponse.success(characterReadService.getMyCharacter());
    }

    @GetMapping("/users/{user_id}/character")
    public ApiResponse<CharacterResponseDto> getCharacter(@PathVariable("user_id") Long userId) {
        return ApiResponse.success(characterReadService.getCharacter(userId));
    }
}
