package io.github.swaraj89.spotify_artist_batch_loader.artist;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class ArtistService {
    private final ArtistRepository artistRepository;

    public Artist createArtist(CreateArtistRequestDto createArtistRequestDto) {
        // Implementation for creating an artist
        Artist artist = new Artist();
        artist.setArtistName(createArtistRequestDto.getArtistName());
        artist.setGender(createArtistRequestDto.getGender());
        artist.setCountryOfOrigin(createArtistRequestDto.getCountryOfOrigin());
        artist.setPrimaryLanguage(createArtistRequestDto.getPrimaryLanguage());
        artist.setPrimaryGenre(createArtistRequestDto.getPrimaryGenre());
        artist.setArtistType(createArtistRequestDto.getArtistType());
        artist.setDebutYear(createArtistRequestDto.getDebutYear());

        return artistRepository.save(artist);
    }


    public ArrayList<Artist> getAllArtists() {
        ArrayList<Artist> artists = new ArrayList<>();
        artistRepository.findAll().forEach(artists::add);
        return artists;
    }
}
