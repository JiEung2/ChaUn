package com.ssafy.health.domain.character.service;

import com.ssafy.health.common.s3.service.S3Service;
import com.ssafy.health.common.security.SecurityUtil;
import com.ssafy.health.domain.account.entity.User;
import com.ssafy.health.domain.account.exception.UserNotFoundException;
import com.ssafy.health.domain.account.repository.UserRepository;
import com.ssafy.health.domain.body.BodyType.entity.BodyType;
import com.ssafy.health.domain.body.BodyType.exception.BodyTypeNotFoundException;
import com.ssafy.health.domain.body.BodyType.repository.BodyTypeRepository;
import com.ssafy.health.domain.character.dto.request.CharacterSaveRequestDto;
import com.ssafy.health.domain.character.dto.request.PartsSaveRequestDto;
import com.ssafy.health.domain.character.dto.response.CharacterResponseDto;
import com.ssafy.health.domain.character.dto.response.CharacterSaveSuccessDto;
import com.ssafy.health.domain.character.dto.response.CharacterSnapshotSuccessDto;
import com.ssafy.health.domain.character.dto.response.PartsSaveSuccessDto;
import com.ssafy.health.domain.character.entity.Character;
import com.ssafy.health.domain.character.entity.CharacterSet;
import com.ssafy.health.domain.character.entity.CharacterSnapshot;
import com.ssafy.health.domain.character.entity.Parts;
import com.ssafy.health.domain.character.exception.CharacterNotFoundException;
import com.ssafy.health.domain.character.exception.CharacterSetNotFoundException;
import com.ssafy.health.domain.character.exception.PartsNotFoundException;
import com.ssafy.health.domain.character.respository.CharacterRepository;
import com.ssafy.health.domain.character.respository.CharacterSetRepository;
import com.ssafy.health.domain.character.respository.CharacterSnapshotRepository;
import com.ssafy.health.domain.character.respository.PartsRepository;
import java.io.IOException;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Transactional
public class CharacterWriteService {

    private final S3Service s3Service;
    private final UserRepository userRepository;
    private final PartsRepository partsRepository;
    private final BodyTypeRepository bodyTypeRepository;
    private final CharacterRepository characterRepository;
    private final CharacterReadService characterReadService;
    private final CharacterSetRepository characterSetRepository;
    private final CharacterSnapshotRepository characterSnapshotRepository;

    public CharacterSaveSuccessDto saveCharacter(CharacterSaveRequestDto requestDto, MultipartFile characterImage, MultipartFile characterFile)
            throws IOException {
        String savedCharacterImage = s3Service.uploadFile(characterImage);
        String savedCharacterFile = s3Service.uploadFile(characterFile);

        BodyType bodyType = bodyTypeRepository.findById(requestDto.getBodyTypeId()).orElseThrow(
                BodyTypeNotFoundException::new);

        characterRepository.save(Character.builder()
                .gender(requestDto.getGender())
                .bodyType(bodyType)
                .characterImage(savedCharacterImage)
                .characterFile(savedCharacterFile)
                .build());

        return new CharacterSaveSuccessDto();
    }

    public PartsSaveSuccessDto saveParts(PartsSaveRequestDto requestDto, MultipartFile partImage) throws IOException {
        String savedPartImage = s3Service.uploadFile(partImage);

        partsRepository.save(Parts.builder()
                .name(requestDto.getName())
                .partsType(requestDto.getPartsType())
                .cost(requestDto.getCost())
                .partsImage(savedPartImage)
                .build());

        return new PartsSaveSuccessDto();
    }

    public CharacterSet createPersonalCharacter(User user, Long bodyTypeId) {
        Optional<CharacterSet> optionalCharacterSet = characterSetRepository.findByUserId(user.getId());
        Character character = characterRepository.findById(bodyTypeId).orElseThrow(CharacterNotFoundException::new);

        CharacterSet characterSet = null;

        if (optionalCharacterSet.isPresent()) {
            characterSet.updateCharacter(character);
        }
        else{
            Parts parts = partsRepository.findById(1L).orElseThrow(PartsNotFoundException::new);
            return characterSetRepository.save(CharacterSet.builder()
                    .user(user)
                    .character(character)
                    .parts(parts)
                    .build());
        }

        return characterSetRepository.save(characterSet);
    }

    public CharacterResponseDto applyParts(Long partsId) {
        CharacterSet characterSet = characterSetRepository.findByUserId(SecurityUtil.getCurrentUserId()).orElseThrow(
                CharacterSetNotFoundException::new);

        if (characterSet.getParts().getId().equals(partsId)) {
            characterSet.updateParts(getBasicParts());
        }
        else{
            Parts parts = partsRepository.findById(partsId).orElseThrow(PartsNotFoundException::new);
            characterSet.updateParts(parts);
        }
        characterSetRepository.save(characterSet);

        return characterReadService.getCharacterInfo(SecurityUtil.getCurrentUserId());
    }

    public Parts getBasicParts() {
        return partsRepository.findById(1L).orElseThrow(PartsNotFoundException::new);
    }

    public CharacterSnapshotSuccessDto saveSnapshot(MultipartFile snapshot) throws IOException {
        String snapshotUrl = s3Service.uploadFile(snapshot);
        User user = userRepository.findById(SecurityUtil.getCurrentUserId()).orElseThrow(UserNotFoundException::new);
        characterSnapshotRepository.save(CharacterSnapshot.builder().user(user).characterSnapshotUrl(snapshotUrl).build());
        return new CharacterSnapshotSuccessDto();
    }
}
