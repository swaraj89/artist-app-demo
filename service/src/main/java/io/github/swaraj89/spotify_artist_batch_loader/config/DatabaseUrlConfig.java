package io.github.swaraj89.spotify_artist_batch_loader.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.net.URI;
import java.net.URISyntaxException;

@Configuration
public class DatabaseUrlConfig {

    @Bean
    @ConditionalOnProperty(name = "spring.datasource.url", havingValue = "${DATABASE_URL}", matchIfMissing = false)
    public String databaseUrlOverride(@Value("${DATABASE_URL}") String databaseUrl) throws URISyntaxException {
        URI uri = new URI(databaseUrl);
        System.setProperty("SPRING_DATASOURCE_URL", "jdbc:postgresql://" + uri.getHost() + ":" + (uri.getPort() == -1 ? 5432 : uri.getPort()) + uri.getPath());
        System.setProperty("SPRING_DATASOURCE_USERNAME", uri.getUserInfo() != null ? uri.getUserInfo().split(":")[0] : "");
        System.setProperty("SPRING_DATASOURCE_PASSWORD", uri.getUserInfo() != null && uri.getUserInfo().contains(":") ? uri.getUserInfo().split(":", 2)[1] : "");
        return databaseUrl;
    }
}
