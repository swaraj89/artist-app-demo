package io.github.swaraj89.spotify_artist_batch_loader.dto;

import io.github.swaraj89.spotify_artist_batch_loader.constants.ARTIST_TYPE;
import io.github.swaraj89.spotify_artist_batch_loader.constants.GENDER;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class UpdateArtistRequestDto {

    @Pattern(regexp = ".*\\S.*", message = "Artist name must not be blank")
    private String artistName;

    private GENDER gender;

    private String countryOfOrigin;

    private String primaryLanguage;
    private String primaryGenre;
    private ARTIST_TYPE artistType;

    @Min(value = 1980, message = "Debut year must be greater than or equal to 1980")
    @Max(value = 2026, message = "Debut year must be less than or equal to the current year")
    private Integer debutYear;
}
