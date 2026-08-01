package io.github.swaraj89.spotify_artist_batch_loader.artist;

import lombok.Data;

@Data
public class ArtistCsvRow {
    private String artistName;
    private String sex;
    private String countryOfOrigin;
    private String primaryLanguage;
    private String primaryGenre;
    private String artistType;
    private int debutYear;
    private double totalStreams;
    private double leadStreams;
    private double featureStreams;
    private double soloStreams;
    private double percentOfSoloStreams;
    private double collaborativeStreams;
    private double percentOfCollaborativeStreams;
}
