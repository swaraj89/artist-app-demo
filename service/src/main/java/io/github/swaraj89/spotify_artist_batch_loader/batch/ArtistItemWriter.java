package io.github.swaraj89.spotify_artist_batch_loader.batch;

import io.github.swaraj89.spotify_artist_batch_loader.artist.Artist;
import io.github.swaraj89.spotify_artist_batch_loader.artist.ArtistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.infrastructure.item.Chunk;
import org.springframework.batch.infrastructure.item.ItemWriter;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ArtistItemWriter implements ItemWriter<Artist> {

    private final ArtistRepository artistRepository;

    @Override
    public void write(Chunk<? extends Artist> items) {
        artistRepository.saveAll(items);
    }
}