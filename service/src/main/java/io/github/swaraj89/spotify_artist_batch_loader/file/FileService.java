package io.github.swaraj89.spotify_artist_batch_loader.file;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Instant;
import java.util.List;

@Service
public class FileService {

    private final Path rootLocation = Paths.get("uploads");
    private final FileRepository repository;

    public FileService(FileRepository repository) throws IOException {
        this.repository = repository;
        // Create the uploads directory if it doesn't exist
        File uploadDir = rootLocation.toFile();
        if (!uploadDir.exists()) {
            boolean created = uploadDir.mkdirs();
            if (!created) {
                throw new IOException("Could not create upload directory: " + rootLocation);
            }
        }
    }

    private String getFileExtension(String filename) {
        int lastIndexOfDot = filename.lastIndexOf('.');
        if (lastIndexOfDot == -1) {
            return ""; // empty extension
        }
        return filename.substring(lastIndexOfDot);
    }

    private Boolean isValidFileExtension(String extension) {
        return extension.equalsIgnoreCase(".csv") || extension.equalsIgnoreCase(".json");
    }

    public FileEntity saveFile(MultipartFile file) throws IOException {
        String extension = getFileExtension(file.getOriginalFilename());

        if (!isValidFileExtension(extension)) {
            throw new IOException("Invalid file extension: " + extension);
        }

        Path destinationFile = rootLocation.resolve(Paths.get(file.getOriginalFilename())).normalize().toAbsolutePath();
        if (!destinationFile.getParent().equals(rootLocation.toAbsolutePath())) {
            throw new IOException("Cannot store file outside current directory.");
        }

        file.transferTo(destinationFile.toFile());
        FileEntity uploadedFile = new FileEntity();

        uploadedFile.setName(file.getOriginalFilename());
        uploadedFile.setSize(String.valueOf(file.getSize()));
        uploadedFile.setType(extension);
        uploadedFile.setPath(destinationFile.toString());
        uploadedFile.setStatus("UPLOADED");
        uploadedFile.setUpdatedAt(Instant.now().toEpochMilli());
        uploadedFile.setCreatedAt(Instant.now().toEpochMilli());

        repository.save(uploadedFile);

        return uploadedFile;
    }

    public FileEntity getFileById(String fileId) {
        return repository.findById(fileId)
                .orElseThrow(() -> new RuntimeException("File not found with id: " + fileId));
    }

    public void deleteFileById(String fileId) {
        FileEntity fileEntity = repository.findById(fileId)
                .orElseThrow(() -> new RuntimeException("File not found with id: " + fileId));

        // Delete the physical file
        File fileToDelete = new File(fileEntity.getPath());
        if (fileToDelete.exists()) {
            boolean deleted = fileToDelete.delete();
            if (!deleted) {
                throw new RuntimeException("Failed to delete the physical file: " + fileEntity.getPath());
            }
        }

        // Delete the database record
        repository.deleteById(fileId);
    }

    public List<FileEntity> getAllFiles() {
        return (List<FileEntity>) repository.findAll();
    }

}
