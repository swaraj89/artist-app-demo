package io.github.swaraj89.spotify_artist_batch_loader.artist;

import com.fasterxml.jackson.annotation.JsonCreator;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@AllArgsConstructor
enum GENDER {
    MALE ("Male"),
    FEMALE ("Female"),
    OTHER ("Other");

    private final String sex;

    @JsonCreator
    public static GENDER fromString(String value) {
        for (GENDER gender : GENDER.values()) {
            if (gender.sex.equalsIgnoreCase(value)) {
                return gender;
            }
        }
        throw new IllegalArgumentException("Invalid gender value: " + value);
    }
}

@AllArgsConstructor
enum ARTIST_TYPE {
    SOLO("Solo"),
    BAND("Band"),
    DUO("Duo");

    private final String artistType;

    @JsonCreator
    public static ARTIST_TYPE fromString(String value) {
        for (ARTIST_TYPE type : ARTIST_TYPE.values()) {
            if (type.artistType.equalsIgnoreCase(value)) {
                return type;
            }
        }
        throw new IllegalArgumentException("Invalid artist type value: " + value);
    }
}

@Getter
@Setter
@RequiredArgsConstructor
@ToString
public class CreateArtistRequestDto {
    @NotNull
    private String artistName;

    @NotNull
    private GENDER gender;

    @NotNull
    private String countryOfOrigin;

    @NotNull
    private String primaryLanguage;
    @NotNull
    private String primaryGenre;
    @NotNull
    private ARTIST_TYPE artistType;

    @NotNull
    @Min(value = 1980, message = "Debut year must be greater than or equal to 1980")
    @Max(value = 2026, message = "Debut year must be less than or equal to the current year")
    private Integer debutYear;
}
