package com.ssafy.health.domain.character.entity;

import com.ssafy.health.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Parts extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private PartsType partsType;
    private String name;
    private Integer cost;
    private String partsImage;

    @Builder
    public Parts(String name, PartsType partsType, Integer cost, String partsImage) {
        this.name = name;
        this.partsType = partsType;
        this.cost = cost;
        this.partsImage = partsImage;
    }
}
