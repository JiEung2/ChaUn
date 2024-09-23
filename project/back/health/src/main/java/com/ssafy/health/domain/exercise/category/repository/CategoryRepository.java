package com.ssafy.health.domain.exercise.category.repository;

import com.ssafy.health.domain.exercise.category.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {

}
