package io.github.swaraj89.spotify_artist_batch_loader.artist;

import io.github.swaraj89.spotify_artist_batch_loader.constants.ARTIST_TYPE;
import io.github.swaraj89.spotify_artist_batch_loader.constants.GENDER;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "artist")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Artist {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private  String artistId;

    @NotNull
    private String artistName;

    @Enumerated(EnumType.STRING)
    private GENDER gender;
    private String countryOfOrigin;
    private String primaryLanguage;
    private String primaryGenre;

    @Enumerated(EnumType.STRING)
    private ARTIST_TYPE artistType;

    private Integer debutYear;
    private BigDecimal totalStreams;
    private BigDecimal leadStreams;
    private BigDecimal featureStreams;
    private BigDecimal soloStreams;
    private BigDecimal percentOfSoloStreams;
    private BigDecimal collaborativeStreams;
    private BigDecimal percentOfCollaborativeStreams;
}
