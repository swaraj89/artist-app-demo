package io.github.swaraj89.spotify_artist_batch_loader.batch;

import io.github.swaraj89.spotify_artist_batch_loader.artist.Artist;
import io.github.swaraj89.spotify_artist_batch_loader.constants.ARTIST_TYPE;
import io.github.swaraj89.spotify_artist_batch_loader.constants.GENDER;
import org.springframework.batch.infrastructure.item.ItemProcessor;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class ArtistItemProcessor implements ItemProcessor<ArtistCsvRow, Artist> {
    @Override
    public Artist process(ArtistCsvRow item) throws Exception {
        Artist artist = new Artist();
        artist.setArtistName(item.getArtistName());
        artist.setGender(GENDER.valueOf(item.getSex().toUpperCase()));
        artist.setCountryOfOrigin(item.getCountryOfOrigin());
        artist.setPrimaryLanguage(item.getPrimaryLanguage());
        artist.setPrimaryGenre(item.getPrimaryGenre());
        artist.setArtistType(ARTIST_TYPE.valueOf(item.getArtistType().toUpperCase()));
        artist.setDebutYear(item.getDebutYear() != null ? item.getDebutYear() : null);

        artist.setTotalStreams(BigDecimal.valueOf(item.getTotalStreams()));
        artist.setLeadStreams(BigDecimal.valueOf(item.getLeadStreams()));
        artist.setFeatureStreams(BigDecimal.valueOf(item.getFeatureStreams()));
        artist.setSoloStreams(BigDecimal.valueOf(item.getSoloStreams()));
        artist.setPercentOfSoloStreams(BigDecimal.valueOf(item.getPercentOfSoloStreams()));
        artist.setCollaborativeStreams(BigDecimal.valueOf(item.getCollaborativeStreams()));
        artist.setPercentOfCollaborativeStreams(BigDecimal.valueOf(item.getPercentOfCollaborativeStreams()));

        return artist;
    }
}
