package com.project.controller;

import com.project.model.Content;
import com.project.service.ContentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.*;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/content")
@CrossOrigin("http://localhost:5173")
@Tag(name = "Content Management", description = "Endpoints for uploading and retrieving files/content")
public class ContentController {

    private final ContentService service;
    private final String uploadDir = "uploads/";

    public ContentController(ContentService service) {
        this.service = service;
    }

    @Operation(
        summary = "Upload content with a file",
        description = "Uploads a file to the server and saves associated metadata (title, description, user info) to the database."
    )
    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public com.project.model.Content uploadContent(
            @Parameter(description = "Uploader's name") @RequestParam("name") String name,
            @Parameter(description = "Uploader's email") @RequestParam("email") String email,
            @Parameter(description = "Title of the content") @RequestParam("title") String title,
            @Parameter(description = "Detailed description") @RequestParam("description") String description,
            @Parameter(description = "The file to upload") @RequestParam("file") MultipartFile file
    ) throws IOException {

        // Create folder if not exists
        File dir = new File(uploadDir);
        if (!dir.exists()) dir.mkdirs();

        String filePath = uploadDir + file.getOriginalFilename();
        file.transferTo(new File(filePath));

        com.project.model.Content content = new com.project.model.Content();
        content.setTitle(title);
        content.setDescription(description);
        content.setFileName(file.getOriginalFilename());
        content.setFileType(file.getContentType());
        content.setFilePath(filePath);

        return service.save(content);
    }

    @Operation(summary = "Get all content", description = "Retrieves a list of all uploaded content metadata")
    @GetMapping
    public List<com.project.model.Content> getAll() {
        return service.getAll();
    }
}