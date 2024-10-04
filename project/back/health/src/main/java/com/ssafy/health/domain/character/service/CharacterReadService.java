package com.ssafy.health.domain.character.service;

import com.ssafy.health.common.security.SecurityUtil;
import com.ssafy.health.domain.character.dto.response.CharacterResponseDto;
import com.ssafy.health.domain.character.dto.response.CharacterSnapshotResponseDto;
import com.ssafy.health.domain.character.dto.response.PartsInfoDto;
import com.ssafy.health.domain.character.dto.response.PartsListDto;
import com.ssafy.health.domain.character.entity.Character;
import com.ssafy.health.domain.character.entity.CharacterSet;
import com.ssafy.health.domain.character.entity.CharacterSnapshot;
import com.ssafy.health.domain.character.entity.Parts;
import com.ssafy.health.domain.character.exception.CharacterNotFoundException;
import com.ssafy.health.domain.character.exception.CharacterSetNotFoundException;
import com.ssafy.health.domain.character.respository.CharacterRepository;
import com.ssafy.health.domain.character.respository.CharacterSetRepository;
import com.ssafy.health.domain.character.respository.CharacterSnapshotRepository;
import com.ssafy.health.domain.character.respository.PartsRepository;
import java.util.List;
import java.util.stream.Collectors;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CharacterReadService {

    private final PartsRepository partsRepository;
    private final CharacterRepository characterRepository;
    private final CharacterSetRepository characterSetRepository;
    private final CharacterSnapshotRepository characterSnapshotRepository;

    public CharacterResponseDto getMyCharacter() {
        return getCharacterInfo(SecurityUtil.getCurrentUserId());
    }

    public CharacterResponseDto getCharacter(Long userId) {
        return getCharacterInfo(userId);
    }

    public CharacterResponseDto getCharacterInfo(Long userId){
        CharacterSet characterSet = characterSetRepository.findByUserId(userId).orElseThrow(CharacterSetNotFoundException::new);
        Long id = 0L;
        if(characterSet.getParts().getId() == 1){
            id = characterSet.getCharacter().getId();
        }
        else{
            id = characterSet.getCharacter().getId() + characterSet.getParts().getId();
        }
        Character character = characterRepository.findById(id).orElseThrow(CharacterNotFoundException::new);

        return CharacterResponseDto.builder().characterUrl(character.getCharacterFile())
                .bodyTypeId(character.getBodyType().getId()).build();
    }

    public PartsListDto getParts(){
        List<Parts> partsList = partsRepository.findAll();
        List<PartsInfoDto> partsInfoDtoList = partsList.stream().map(PartsInfoDto::fromEntity).toList();

        return PartsListDto.builder().partsList(partsInfoDtoList).build();
    }

    public CharacterSnapshotResponseDto getCharacterSnapshot(){
        List<CharacterSnapshot> snapshotList = characterSnapshotRepository.findByUserIdOrderByCreatedAtDesc(SecurityUtil.getCurrentUserId());

        List<CharacterSnapshotResponseDto.SnapshotInfo> limitedSnapshots = snapshotList.stream()
                .limit(10)
                .map(snapshot -> CharacterSnapshotResponseDto.SnapshotInfo.builder()
                        .snapshotUrl(snapshot.getCharacterSnapshotUrl())
                        .createdAt(snapshot.getCreatedAt())
                        .build())
                .collect(Collectors.toList());

        return CharacterSnapshotResponseDto.builder()
                .snapshots(limitedSnapshots)
                .build();
    }

}
