package io.github.swaraj89.spotify_artist_batch_loader.constants;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum ARTIST_TYPE {
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
