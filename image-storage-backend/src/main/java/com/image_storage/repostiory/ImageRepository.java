package com.image_storage.repostiory;

import com.image_storage.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ImageRepository extends JpaRepository<Image, Long> {
    List<Image> findByNameContainingIgnoreCase(String name);
}