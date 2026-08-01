package io.github.swaraj89.spotify_artist_batch_loader.constants;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum GENDER {
    MALE("MALE"),
    FEMALE("FEMALE"),
    MIXED("MIXED"),
    OTHER("OTHER");

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