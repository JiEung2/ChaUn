package com.ssafy.health.domain.exercise.service;

import com.ssafy.health.domain.exercise.category.entity.Category;
import com.ssafy.health.domain.exercise.category.repository.CategoryRepository;
import com.ssafy.health.domain.exercise.dto.response.ExerciseAndCategoryDto;
import com.ssafy.health.domain.exercise.repository.ExerciseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ExerciseReadService {

    private final ExerciseRepository exerciseRepository;
    private final CategoryRepository categoryRepository;

    public List<ExerciseAndCategoryDto> getExerciseAndCategory() {
        List<Category> categories = categoryRepository.findAll();

        return categories.stream().map(category -> {
            List<ExerciseAndCategoryDto.ExerciseDetailDto> exerciseDetailDtoList = exerciseRepository.findByCategory(category)
                    .stream()
                    .map(exercise -> ExerciseAndCategoryDto.ExerciseDetailDto.builder()
                            .id(exercise.getId())
                            .name(exercise.getName())
                            .description(exercise.getDescription())
                            .build())
                    .collect(Collectors.toList());

            return ExerciseAndCategoryDto.builder()
                    .categoryName(category.getName())
                    .exercises(exerciseDetailDtoList)
                    .build();
        }).collect(Collectors.toList());
    }
}
