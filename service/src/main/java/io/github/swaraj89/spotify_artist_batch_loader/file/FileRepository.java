package io.github.swaraj89.spotify_artist_batch_loader.file;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FileRepository extends CrudRepository<FileEntity, String> {
}
