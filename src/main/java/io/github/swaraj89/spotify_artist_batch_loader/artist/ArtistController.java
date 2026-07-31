package io.github.swaraj89.spotify_artist_batch_loader.artist;

import io.github.swaraj89.spotify_artist_batch_loader.dto.CreateArtistRequestDto;
import io.github.swaraj89.spotify_artist_batch_loader.dto.UpdateArtistRequestDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/artists")
@RequiredArgsConstructor
public class ArtistController {

    private final ArtistService artistService;

    @PostMapping
    public ResponseEntity<String> createArtist(@Valid @RequestBody CreateArtistRequestDto createArtistRequestDto) {

        log.info("Creating artist: {}", createArtistRequestDto.toString());

        Artist artist = artistService.createArtist(createArtistRequestDto);

        return ResponseEntity.ok(artist.getArtistId());
    }

    @GetMapping
    public ResponseEntity<List<Artist>> getAllArtists() {
        log.info("Fetching all artists");
        return ResponseEntity.ok(artistService.getAllArtists());
    }

    @GetMapping("/{artistId}")
    public ResponseEntity<Artist> getArtistById(@PathVariable String artistId) {
        log.info("Fetching artist by ID: {}", artistId);

        return ResponseEntity.ok(artistService.getArtistById(artistId));
    }

    @DeleteMapping("/{artistId}")
    public ResponseEntity<Void> deleteArtistById(@PathVariable String artistId) {
        log.info("Deleting artist by ID: {}", artistId);

        artistService.deleteArtistById(artistId);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{artistId}")
    public ResponseEntity<Void> updateArtistById(@PathVariable String artistId, @Valid @RequestBody UpdateArtistRequestDto updateArtistRequestDto) {
        log.info("Updating artist by ID: {}", artistId);

        artistService.updateArtistById(artistId, updateArtistRequestDto);

        return ResponseEntity.noContent().build();
    }
}
