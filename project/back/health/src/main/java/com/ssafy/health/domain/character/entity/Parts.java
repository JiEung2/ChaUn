package com.ssafy.health.domain.character.entity;

import com.ssafy.health.common.entity.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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

    private String name;
    private PartsType partsType;
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
