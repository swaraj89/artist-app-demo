package io.github.swaraj89.spotify_artist_batch_loader.artist;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArtistRepository extends CrudRepository<Artist, String> { }
