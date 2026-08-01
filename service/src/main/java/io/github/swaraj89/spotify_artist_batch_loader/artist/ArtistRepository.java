package io.github.swaraj89.spotify_artist_batch_loader.artist;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArtistRepository extends JpaRepository<Artist, String>, JpaSpecificationExecutor<Artist> {

    @Query("SELECT DISTINCT a.countryOfOrigin FROM Artist a ORDER BY a.countryOfOrigin")
    List<String> findDistinctCountries();
}
