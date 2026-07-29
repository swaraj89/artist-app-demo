package io.github.swaraj89.spotify_artist_batch_loader.artist;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<?> getAllArtists() {
        log.info("Fetching all artists");
        return ResponseEntity.ok(artistService.getAllArtists());
    }

}
