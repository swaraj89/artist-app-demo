package io.github.swaraj89.spotify_artist_batch_loader.dto;

import io.github.swaraj89.spotify_artist_batch_loader.constants.ARTIST_TYPE;
import io.github.swaraj89.spotify_artist_batch_loader.constants.GENDER;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateArtistRequestDto {
    @NotNull
    private String artistName;

    @NotNull(message = "Gender must not be blank")
    private GENDER gender;

    @NotBlank(message = "Country of origin must not be null")
    private String countryOfOrigin;

    @NotBlank(message = "Primary language must not be null")
    private String primaryLanguage;
    @NotBlank(message = "Primary genre must not be null")
    private String primaryGenre;
    @NotNull(message = "Artist type must not be null")
    private ARTIST_TYPE artistType;

    @NotNull(message = "Debut year must not be null")
    @Min(value = 1980, message = "Debut year must be greater than or equal to 1980")
    @Max(value = 2026, message = "Debut year must be less than or equal to the current year")
    private Integer debutYear;
}
