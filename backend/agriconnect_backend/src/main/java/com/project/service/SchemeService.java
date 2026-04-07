package com.project.service;

import com.project.model.Scheme;
import com.project.repo.SchemeRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SchemeService {

    private final SchemeRepo repo;

    public SchemeService(SchemeRepo repo) {
        this.repo = repo;
    }

    public List<Scheme> getAll() {
        return repo.findAll();
    }

    public Scheme save(Scheme s) {
        return repo.save(s);
    }
}