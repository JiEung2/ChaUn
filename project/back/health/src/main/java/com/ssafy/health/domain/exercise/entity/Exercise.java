package com.ssafy.health.domain.exercise.entity;

import com.ssafy.health.common.entity.BaseEntity;
import com.ssafy.health.domain.exercise.category.entity.Category;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Entity
@Getter
public class Exercise extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String name;

    @NotNull
    private Float met;

    private String description;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}
