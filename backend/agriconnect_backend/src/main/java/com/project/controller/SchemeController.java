package com.project.controller;

import com.project.model.Scheme;
import com.project.service.SchemeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/schemes")
@CrossOrigin("http://localhost:5173")
public class SchemeController {

    private final SchemeService service;

    public SchemeController(SchemeService service) {
        this.service = service;
    }

    @GetMapping
    public List<Scheme> getAll() {
        return service.getAll();
    }

    @PostMapping
    public Scheme add(@RequestBody Scheme s) {
        return service.save(s);
    }
}