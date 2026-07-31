package io.github.swaraj89.spotify_artist_batch_loader.exception;

import io.github.swaraj89.spotify_artist_batch_loader.dto.ErrorResponseDto;
import io.github.swaraj89.spotify_artist_batch_loader.dto.ValidationErrorResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import tools.jackson.databind.exc.InvalidFormatException;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestControllerAdvice
public class ArtistControllerAdvice {

    @ExceptionHandler(ArtistNotFoundException.class)
    public ResponseEntity<ErrorResponseDto> handleArtistNotFoundException(ArtistNotFoundException ex) {
        ErrorResponseDto errorResponse = new ErrorResponseDto();
        errorResponse.setMessage(ex.getMessage());
        errorResponse.setStatus(404);
        errorResponse.setTimestamp(System.currentTimeMillis());

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ValidationErrorResponseDto> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex) {
        ValidationErrorResponseDto errorResponse = new ValidationErrorResponseDto();
        Map<String, String> errors = new HashMap<>();

        errorResponse.setMessage("Validation failed for one or more fields");
        errorResponse.setStatus(HttpStatus.BAD_REQUEST.value());
        errorResponse.setTimestamp(System.currentTimeMillis());

        ex.getBindingResult().getFieldErrors().forEach(fieldError -> {
            log.info("Field: " + fieldError.getField() + ", Message: " + fieldError.getDefaultMessage());
            errors.put(fieldError.getField(), fieldError.getDefaultMessage());
        });

        errorResponse.setErrors(errors);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
    }


    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ValidationErrorResponseDto> handleHttpMessageNotReadableException(HttpMessageNotReadableException ex) {
        ValidationErrorResponseDto errorResponse = new ValidationErrorResponseDto();
        Map<String, String> errors = new HashMap<>();

        Throwable cause = ex.getCause();
        if (cause instanceof InvalidFormatException ife && !ife.getPath().isEmpty()) {
            String fieldName = ife.getPath().get(0).getPropertyName();
            Object invalidValue = ife.getValue();
            Class<?> targetType = ife.getTargetType();

            String message;
            if (targetType.isEnum()) {
                message = String.format("'%s' is not valid. Allowed values: %s",
                        invalidValue, Arrays.toString(targetType.getEnumConstants()));
            } else {
                message = String.format("'%s' is not a valid value for this field", invalidValue);
            }
            errors.put(fieldName, message);
        } else {
            errors.put("body", "Malformed JSON request body");
        }

        errorResponse.setMessage("Validation failed for one or more fields");
        errorResponse.setStatus(HttpStatus.BAD_REQUEST.value());
        errorResponse.setTimestamp(System.currentTimeMillis());
        errorResponse.setErrors(errors);

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
    }
}
