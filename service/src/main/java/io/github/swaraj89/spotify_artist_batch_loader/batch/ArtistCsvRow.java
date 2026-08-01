package io.github.swaraj89.spotify_artist_batch_loader.batch;

import lombok.Data;

@Data
public class ArtistCsvRow {
    private String artistName;
    private String sex;
    private String countryOfOrigin;
    private String primaryLanguage;
    private String primaryGenre;
    private String artistType;
    private Integer debutYear;
    private Double totalStreams;
    private Double leadStreams;
    private Double featureStreams;
    private Double soloStreams;
    private Double percentOfSoloStreams;
    private Double collaborativeStreams;
    private Double percentOfCollaborativeStreams;
}
