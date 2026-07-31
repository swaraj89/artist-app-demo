package io.github.swaraj89.spotify_artist_batch_loader.dto;

import lombok.Data;

import java.util.Map;

@Data
public class ValidationErrorResponseDto {
    private int status;
    private String message;
    private Map<String, String> errors;
    private long timestamp;
}
