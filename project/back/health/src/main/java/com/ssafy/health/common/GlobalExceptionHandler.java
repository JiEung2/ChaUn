package com.ssafy.health.common;

import com.ssafy.health.common.oauth.exception.ExpiredRefreshToken;
import com.ssafy.health.common.oauth.exception.InvalidRefreshToken;
import com.ssafy.health.common.oauth.exception.NotFoundRefreshTokenException;
import com.ssafy.health.domain.account.exception.*;
import com.ssafy.health.domain.attendance.exception.AttendanceAlreadyExistsException;
import com.ssafy.health.domain.battle.exception.BattleNotFoundException;
import com.ssafy.health.domain.body.BodyHistory.exception.BodyHistoryNotFoundException;
import com.ssafy.health.domain.crew.exception.CrewNotFoundException;
import com.ssafy.health.domain.exercise.exception.ExerciseNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // 404 - Not Found

    @ExceptionHandler(NotFoundRefreshTokenException.class)
    public ResponseEntity<ApiResponse<Void>> handleNotFoundRefreshTokenException(NotFoundRefreshTokenException e) {
        ApiResponse<Void> response = ApiResponse.error(e.getStatus(), e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

    @ExceptionHandler(DrinkNotFoundException.class)
    public ResponseEntity<ApiResponse<Void>> handleDrinkNotFoundException(DrinkNotFoundException e) {
        ApiResponse<Void> response = ApiResponse.error(e.getStatus(), e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

    @ExceptionHandler(MealNotFoundException.class)
    public ResponseEntity<ApiResponse<Void>> handleMealNotFoundException(MealNotFoundException e) {
        ApiResponse<Void> response = ApiResponse.error(e.getStatus(), e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

    @ExceptionHandler(SnackNotFoundException.class)
    public ResponseEntity<ApiResponse<Void>> handleSnackNotFoundException(SnackNotFoundException e) {
        ApiResponse<Void> response = ApiResponse.error(e.getStatus(), e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ApiResponse<Void>> handleUserNotFoundException(UserNotFoundException e) {
        ApiResponse<Void> response = ApiResponse.error(e.getStatus(), e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

    @ExceptionHandler(BattleNotFoundException.class)
    public ResponseEntity<ApiResponse<Void>> handleBattleNotFoundException(BattleNotFoundException e) {
        ApiResponse<Void> response = ApiResponse.error(e.getStatus(), e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

    @ExceptionHandler(BodyHistoryNotFoundException.class)
    public ResponseEntity<ApiResponse<Void>> handleBodyHistoryNotFoundException(BodyHistoryNotFoundException e) {
        ApiResponse<Void> response = ApiResponse.error(e.getStatus(), e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

    @ExceptionHandler(CrewNotFoundException.class)
    public ResponseEntity<ApiResponse<Void>> handleCrewNotFoundException(CrewNotFoundException e) {
        ApiResponse<Void> response = ApiResponse.error(e.getStatus(), e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

    @ExceptionHandler(ExerciseNotFoundException.class)
    public ResponseEntity<ApiResponse<Void>> handleExerciseNotFoundException(ExerciseNotFoundException e) {
        ApiResponse<Void> response = ApiResponse.error(e.getStatus(), e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

    // 400 - Bad Request

    @ExceptionHandler(ExpiredRefreshToken.class)
    public ResponseEntity<ApiResponse<Void>> handleExpiredRefreshToken(final ExpiredRefreshToken e) {
        ApiResponse<Void> response = ApiResponse.error(e.getStatus(), e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    @ExceptionHandler(InvalidRefreshToken.class)
    public ResponseEntity<ApiResponse<Void>> handleInvalidRefreshToken(final InvalidRefreshToken e) {
        ApiResponse<Void> response = ApiResponse.error(e.getStatus(), e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    @ExceptionHandler(InsufficientCoinsException.class)
    public ResponseEntity<ApiResponse<Void>> handleInsufficientCoinsException(final InsufficientCoinsException e) {
        ApiResponse<Void> response = ApiResponse.error(e.getStatus(), e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    // 409 - CONFLICT

    @ExceptionHandler(NicknameDuplicateException.class)
    public ResponseEntity<ApiResponse<Void>> handleNicknameDuplicateException(final NicknameDuplicateException e) {
        ApiResponse<Void> response = ApiResponse.error(e.getStatus(), e.getMessage());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
    }

    @ExceptionHandler(AttendanceAlreadyExistsException.class)
    public ResponseEntity<ApiResponse<Void>> handleAttendanceAlreadyExistsException(final AttendanceAlreadyExistsException e) {
        ApiResponse<Void> response = ApiResponse.error(e.getStatus(), e.getMessage());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
    }
}