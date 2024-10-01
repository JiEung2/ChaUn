package com.ssafy.health.domain.character.controller;

import com.ssafy.health.common.ApiResponse;
import com.ssafy.health.domain.character.dto.response.CharacterResponseDto;
import com.ssafy.health.domain.character.dto.response.PartsListDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.PathVariable;

@Tag(name = "캐릭터 컨트롤러", description = "캐릭터, 파츠, 세트를 생성, 조회, 수정하는 회원 캐릭터를 관리하는 클래스")
public interface CharacterControllerApi {

    @Operation(
            summary = "본인의 캐릭터 조회",
            description = "본인의 캐릭터 url을 조회합니다."
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "캐릭터 조회 완료",
                    content = @Content(mediaType = "application/json",
                            examples = @ExampleObject(value = """
                                    {
                                      "status": 200,
                                      "message": "",
                                      "data": {
                                        "characterUrl": "character-url.jpg"
                                      }
                                    }"""
                            ))
            ),
    })
    ApiResponse<CharacterResponseDto> getMyCharacter();

    @Operation(
            summary = "회원의 캐릭터 조회",
            description = "회원의 아이디를 통해 해당 회원의 캐릭터 url을 조회합니다."
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "캐릭터 조회 완료",
                    content = @Content(mediaType = "application/json",
                            examples = @ExampleObject(value = """
                                    {
                                      "status": 200,
                                      "message": "",
                                      "data": {
                                        "characterUrl": "character-url.jpg"
                                      }
                                    }"""
                            ))
            ),
    })
    ApiResponse<CharacterResponseDto> getCharacter(@PathVariable("user_id") Long userId);

    @Operation(
            summary = "나의 캐릭터에 파츠 장착/해제",
            description = "나의 캐릭터에 파츠를 장착 및 해제합니다."
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "파츠 처리 완료",
                    content = @Content(mediaType = "application/json",
                            examples = @ExampleObject(value = """
                                    {
                                      "status": 200,
                                      "message": "",
                                      "data": {
                                        "characterUrl": "character-url.jpg"
                                      }
                                    }"""
                            ))
            ),
    })
    ApiResponse<CharacterResponseDto> applyParts(@PathVariable("parts_id") Long partsId);

    @Operation(
            summary = "파츠 조회",
            description = "존재하는 모든 파츠를 조회합니다."
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "파츠 조회 완료",
                    content = @Content(mediaType = "application/json",
                            examples = @ExampleObject(value = """
                                    {
                                      "status": 200,
                                      "message": "",
                                      "data": {
                                        "partsList": [
                                          {
                                            "id": 1,
                                            "name": "Helmet",
                                            "cost": 100,
                                            "partsImage": "https://example.com/images/helmet.png"
                                          },
                                          {
                                            "id": 2,
                                            "name": "Armor",
                                            "cost": 200,
                                            "partsImage": "https://example.com/images/armor.png"
                                          }
                                        ]
                                      }
                                    }"""
                            ))
            ),
    })
    ApiResponse<PartsListDto> getParts();

}
