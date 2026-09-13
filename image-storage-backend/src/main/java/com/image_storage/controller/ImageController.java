package com.image_storage.controller;

import com.image_storage.dto.ImageResponse;
import com.image_storage.entity.Image;
import com.image_storage.service.ImageService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@RestController
@RequestMapping("/api/images")
public class ImageController {

    private final ImageService imageService;

    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(
            @RequestParam("file") MultipartFile file) throws Exception {

        Image savedImage = imageService.saveImage(file);

        return ResponseEntity.ok(
                "Image uploaded successfully. ID: " + savedImage.getId()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<byte[]>getImage(@PathVariable Long id) {
        Image image = imageService.getImage(id);
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(image.getType()))
                .body(image.getData());
    }
    @GetMapping("/name/{name}")
    public ResponseEntity<List<ImageResponse>> getImagesByName(
            @PathVariable String name) {

        List<ImageResponse> images = imageService.getImagesByName(name)
                .stream()
                .map(image -> new ImageResponse(
                        image.getId(),
                        image.getName(),
                        image.getType(),
        (long) image.getData().length
                ))
                .toList();

        return ResponseEntity.ok(images);
    }
    @GetMapping
    public ResponseEntity<List<ImageResponse>> getAllImages() {

        List<ImageResponse> images = imageService.getAllImages()
                .stream()
                .map(image -> new ImageResponse(
                        image.getId(),
                        image.getName(),
                        image.getType(),
        (long) image.getData().length
                ))
                .toList();

        return ResponseEntity.ok(images);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteImage(@PathVariable Long id) {

        imageService.deleteImage(id);

        return ResponseEntity.ok(
                "Image deleted successfully. ID: " + id
        );
    }


}

