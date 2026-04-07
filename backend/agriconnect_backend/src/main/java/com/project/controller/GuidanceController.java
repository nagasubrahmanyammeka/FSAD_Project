package com.project.controller;

import com.project.model.Guidance;
import com.project.repo.GuidanceRepo;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/guidance")
@CrossOrigin(origins = "*")
// @Tag groups these endpoints under "Guidance" in the Swagger UI
@Tag(name = "Guidance Management", description = "Endpoints for creating and retrieving guidance records")
public class GuidanceController {

    @Autowired
    private GuidanceRepo guidanceRepo;

    @Operation(
        summary = "Save new guidance", 
        description = "Persists a new guidance record into the database."
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Guidance saved successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid input provided")
    })
    @PostMapping
    public Guidance saveGuidance(@RequestBody Guidance guidance) {
        return guidanceRepo.save(guidance);
    }

    @Operation(
        summary = "Get all guidance records", 
        description = "Returns a list of all guidance entries stored in the system."
    )
    @GetMapping
    public List<Guidance> getAllGuidance() {
        return guidanceRepo.findAll();
    }
}