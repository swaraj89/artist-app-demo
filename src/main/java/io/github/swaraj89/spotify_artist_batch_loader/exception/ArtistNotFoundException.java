package io.github.swaraj89.spotify_artist_batch_loader.exception;

public class ArtistNotFoundException extends RuntimeException {
    public ArtistNotFoundException(String artistId) {
        super(String.format("Artist with ID '%s' not found.", artistId));
    }
}
