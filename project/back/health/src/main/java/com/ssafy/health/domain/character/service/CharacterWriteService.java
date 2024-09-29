package com.ssafy.health.domain.character.service;

import com.ssafy.health.common.s3.service.S3Service;
import com.ssafy.health.domain.body.BodyType.entity.BodyType;
import com.ssafy.health.domain.body.BodyType.repository.BodyTypeRepository;
import com.ssafy.health.domain.character.dto.request.CharacterSaveRequestDto;
import com.ssafy.health.domain.character.dto.response.CharacterSaveSuccessDto;
import com.ssafy.health.domain.character.entity.Character;
import com.ssafy.health.domain.character.respository.CharacterRepository;
import com.ssafy.health.domain.character.respository.PartsRepository;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Transactional
public class CharacterWriteService {

    private final S3Service s3Service;
    private final PartsRepository partsRepository;
    private final BodyTypeRepository bodyTypeRepository;
    private final CharacterRepository characterRepository;

    public CharacterSaveSuccessDto saveCharacter(CharacterSaveRequestDto requestDto, MultipartFile characterImage, MultipartFile characterFile)
            throws IOException {
        String savedCharacterImage = s3Service.uploadFile(characterImage);
        String savedCharacterFile = s3Service.uploadFile(characterFile);

        BodyType bodyType = bodyTypeRepository.findById(requestDto.getBodyTypeId()).orElseThrow();

        characterRepository.save(Character.builder()
                .gender(requestDto.getGender())
                .bodyType(bodyType)
                .characterImage(savedCharacterImage)
                .characterFile(savedCharacterFile)
                .build());

        return new CharacterSaveSuccessDto();
    }

}
