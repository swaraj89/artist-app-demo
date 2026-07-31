package io.github.swaraj89.spotify_artist_batch_loader.artist;

import io.github.swaraj89.spotify_artist_batch_loader.dto.CreateArtistRequestDto;
import io.github.swaraj89.spotify_artist_batch_loader.dto.UpdateArtistRequestDto;
import io.github.swaraj89.spotify_artist_batch_loader.exception.ArtistNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ArtistService {
    private final ArtistRepository artistRepository;

    public Artist createArtist(CreateArtistRequestDto createArtistRequestDto) {
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


    public List<Artist> getAllArtists() {
        ArrayList<Artist> artists = new ArrayList<>();
        artistRepository.findAll().forEach(artists::add);
        return artists;
    }

    public Artist getArtistById(String artistId) {
        return artistRepository.findById(artistId)
                .orElseThrow(() -> new ArtistNotFoundException(artistId));
    }

    public void deleteArtistById(String artistId) {
        Artist artist = artistRepository.findById(artistId)
                .orElseThrow(() -> new ArtistNotFoundException(artistId));

        artistRepository.deleteById(artistId);
    }

    public void updateArtistById(String artistId, UpdateArtistRequestDto updateArtistRequestDto) {
        Artist existingArtist = artistRepository.findById(artistId)
                .orElseThrow(() -> new ArtistNotFoundException(artistId));

        // Update fields if they are provided in the request
        if (updateArtistRequestDto.getArtistName() != null) {
            existingArtist.setArtistName(updateArtistRequestDto.getArtistName());
        }
        if (updateArtistRequestDto.getGender() != null) {
            existingArtist.setGender(updateArtistRequestDto.getGender());
        }
        if (updateArtistRequestDto.getCountryOfOrigin() != null) {
            existingArtist.setCountryOfOrigin(updateArtistRequestDto.getCountryOfOrigin());
        }
        if (updateArtistRequestDto.getPrimaryLanguage() != null) {
            existingArtist.setPrimaryLanguage(updateArtistRequestDto.getPrimaryLanguage());
        }
        if (updateArtistRequestDto.getPrimaryGenre() != null) {
            existingArtist.setPrimaryGenre(updateArtistRequestDto.getPrimaryGenre());
        }
        if (updateArtistRequestDto.getArtistType() != null) {
            existingArtist.setArtistType(updateArtistRequestDto.getArtistType());
        }
        if (updateArtistRequestDto.getDebutYear() != null) {
            existingArtist.setDebutYear(updateArtistRequestDto.getDebutYear());
        }

        artistRepository.save(existingArtist);
    }
}
