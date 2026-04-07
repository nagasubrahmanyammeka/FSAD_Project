package com.project.service;

import com.project.model.Content;
import com.project.repo.ContentRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContentService {

    private final ContentRepo repo;

    public ContentService(ContentRepo repo) {
        this.repo = repo;
    }

    public Content save(Content content) {
        return repo.save(content);
    }

    public List<Content> getAll() {
        return repo.findAll();
    }
}