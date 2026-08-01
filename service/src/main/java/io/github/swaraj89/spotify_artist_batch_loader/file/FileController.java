package io.github.swaraj89.spotify_artist_batch_loader.file;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/files")
@AllArgsConstructor
public class FileController {

    private final FileService fileService;

    @GetMapping
    public ResponseEntity<Iterable<FileEntity>> getAllFiles() {
        Iterable<FileEntity> files = fileService.getAllFiles();
        return ResponseEntity.ok(files);
    }


    @GetMapping("/{fileId}")
    public ResponseEntity<FileEntity> getFileById(@PathVariable String fileId) {
        FileEntity fileEntity = fileService.getFileById(fileId);
        return ResponseEntity.ok(fileEntity);
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) throws IOException {
        FileEntity uploadedFile = fileService.saveFile(file);
        return ResponseEntity.ok(uploadedFile.getFileId());
    }

}
