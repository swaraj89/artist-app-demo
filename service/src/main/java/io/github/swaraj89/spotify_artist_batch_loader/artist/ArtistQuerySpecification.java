package io.github.swaraj89.spotify_artist_batch_loader.artist;

import org.springframework.data.jpa.domain.Specification;

public class ArtistQuerySpecification {
    public static Specification<Artist> hasCountry(String country) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(criteriaBuilder.lower(root.get("countryOfOrigin")), country.toLowerCase());
    }

    public static Specification<Artist> hasArtistName(String name) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.like(criteriaBuilder.lower(root.get("artistName")), "%" + name.toLowerCase() + "%");
    }
}
