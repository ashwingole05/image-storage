package com.image_storage.dto;

public record ImageResponse(
        Long id,
        String name,
        String type,
        Long size
) {
}
