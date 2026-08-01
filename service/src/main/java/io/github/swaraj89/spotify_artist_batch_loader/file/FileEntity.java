package io.github.swaraj89.spotify_artist_batch_loader.file;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class FileEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String fileId;

    private String name;
    private String size;
    private String type;
    private String path;
    private String status;
    private long createdAt;
    private long updatedAt;
}
