package com.project.controller;

import com.project.model.Feedback;
import com.project.service.FeedbackService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
@CrossOrigin("http://localhost:5173")
@Tag(name = "Feedback Management", description = "Endpoints for submitting and viewing user feedback")
public class FeedbackController {

    private final FeedbackService service;

    public FeedbackController(FeedbackService service) {
        this.service = service;
    }

    @Operation(
        summary = "Get all feedback", 
        description = "Retrieves a list of all feedback entries submitted by users."
    )
    @GetMapping
    public List<Feedback> getAll() {
        return service.getAll();
    }

    @Operation(
        summary = "Submit new feedback", 
        description = "Saves a new feedback entry to the database."
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Feedback submitted successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid feedback data provided")
    })
    @PostMapping
    public Feedback add(@RequestBody Feedback f) {
        return service.save(f);
    }
}