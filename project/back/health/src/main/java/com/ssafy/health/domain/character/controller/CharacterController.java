package com.ssafy.health.domain.character.controller;

import com.ssafy.health.common.ApiResponse;
import com.ssafy.health.domain.character.dto.request.CharacterSaveRequestDto;
import com.ssafy.health.domain.character.dto.request.PartsSaveRequestDto;
import com.ssafy.health.domain.character.dto.response.CharacterSaveSuccessDto;
import com.ssafy.health.domain.character.dto.response.PartsSaveSuccessDto;
import com.ssafy.health.domain.character.service.CharacterWriteService;
import jakarta.validation.Valid;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class CharacterController {

    private final CharacterWriteService characterWriteService;

    @PostMapping("/character")
    public ApiResponse<CharacterSaveSuccessDto> saveBodySurvey(
            @Valid @RequestPart("characterSaveRequestDto") CharacterSaveRequestDto characterSaveRequestDto,
            @RequestPart("characterImage") MultipartFile characterImage,
            @RequestPart("characterFile") MultipartFile characterFile) throws IOException {
        return ApiResponse.success(
                characterWriteService.saveCharacter(characterSaveRequestDto, characterImage, characterFile));
    }

}
