package io.github.swaraj89.spotify_artist_batch_loader.artist;

import io.github.swaraj89.spotify_artist_batch_loader.dto.CreateArtistRequestDto;
import io.github.swaraj89.spotify_artist_batch_loader.dto.UpdateArtistRequestDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.PagedModel;
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
    public ResponseEntity<PagedModel<Artist>> getAllArtists(
            @PageableDefault(size = 10, page = 0, sort = "artistName", direction = Sort.Direction.ASC) Pageable pageable,
            @RequestParam(required = false) String country,
            @RequestParam(required = false) String artistName) {

        log.info("Fetching artists, country={}, artistName={}", country, artistName);
        Page<Artist> artistPage = artistService.getFilteredArtists(country, artistName, pageable);

        return ResponseEntity.ok(new PagedModel<Artist>(artistPage));
    }

    @GetMapping("/countries")
    public ResponseEntity<List<String>> getDistinctCountries() {
        log.info("Fetching distinct countries");
        return ResponseEntity.ok(artistService.getDistinctCountries());
    }

    @GetMapping("/{artistId}")
    public ResponseEntity<Artist> getArtistById(@PathVariable String artistId) {
        log.info("Fetching artist by ID: {}", artistId);
        Artist artist = artistService.getArtistById(artistId);
        return ResponseEntity.ok(artist);
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
