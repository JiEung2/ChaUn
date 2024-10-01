package com.ssafy.health.domain.character.service;

import com.ssafy.health.common.security.SecurityUtil;
import com.ssafy.health.domain.character.dto.response.CharacterResponseDto;
import com.ssafy.health.domain.character.dto.response.PartsInfoDto;
import com.ssafy.health.domain.character.dto.response.PartsListDto;
import com.ssafy.health.domain.character.entity.Character;
import com.ssafy.health.domain.character.entity.CharacterSet;
import com.ssafy.health.domain.character.entity.Parts;
import com.ssafy.health.domain.character.exception.CharacterNotFoundException;
import com.ssafy.health.domain.character.exception.CharacterSetNotFoundException;
import com.ssafy.health.domain.character.respository.CharacterRepository;
import com.ssafy.health.domain.character.respository.CharacterSetRepository;
import com.ssafy.health.domain.character.respository.PartsRepository;
import java.util.List;
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

    public CharacterResponseDto getMyCharacter() {
        return CharacterResponseDto.builder()
                .characterUrl(getCharacterUrl(SecurityUtil.getCurrentUserId())).build();
    }

    public CharacterResponseDto getCharacter(Long userId) {
        return CharacterResponseDto.builder()
                .characterUrl(getCharacterUrl(userId)).build();
    }

    public String getCharacterUrl(Long userId){
        CharacterSet characterSet = characterSetRepository.findByUserId(userId).orElseThrow(CharacterSetNotFoundException::new);
        Long id = 0L;
        if(characterSet.getParts().getId() == 1){
            id = characterSet.getCharacter().getId();
        }
        else{
            id = characterSet.getCharacter().getId() + characterSet.getParts().getId();
        }
        Character character = characterRepository.findById(id).orElseThrow(CharacterNotFoundException::new);

        return character.getCharacterFile();
    }

    public PartsListDto getParts(){
        List<Parts> partsList = partsRepository.findAll();
        List<PartsInfoDto> partsInfoDtoList = partsList.stream().map(PartsInfoDto::fromEntity).toList();

        return PartsListDto.builder().partsList(partsInfoDtoList).build();
    }

}
