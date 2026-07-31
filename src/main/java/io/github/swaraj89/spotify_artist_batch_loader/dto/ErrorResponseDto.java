package io.github.swaraj89.spotify_artist_batch_loader.dto;

import lombok.Data;

@Data
public class ErrorResponseDto {
    private String message;
    private int status;
    private long timestamp;
}
