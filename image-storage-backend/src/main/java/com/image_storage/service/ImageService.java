package com.image_storage.service;


import com.image_storage.entity.Image;
import com.image_storage.repostiory.ImageRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.lang.management.MemoryUsage;
import java.util.List;

@Service
public class ImageService {
    private final ImageRepository imageRepository;

    public ImageService(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    public Image saveImage(MultipartFile file) throws Exception {
Image image = new Image(
file.getOriginalFilename(),
file.getContentType(),
file.getBytes());
return imageRepository.save(image);


    }
    public Image getImage(Long id){
        return imageRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Image not found"));
    }
    public List<Image> getImagesByName(String name) {
        return imageRepository.findByNameContainingIgnoreCase(name);    }
    public List<Image> getAllImages() {
        return imageRepository.findAll();
    }

    public void deleteImage(Long id) {
        imageRepository.deleteById(id);
    }
}
