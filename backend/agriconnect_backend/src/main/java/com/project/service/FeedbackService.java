package com.project.service;

import com.project.model.Feedback;
import com.project.repo.FeedbackRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackService {

    private final FeedbackRepo repo;

    public FeedbackService(FeedbackRepo repo) {
        this.repo = repo;
    }

    public List<Feedback> getAll() {
        return repo.findAll();
    }

    public Feedback save(Feedback f) {
        return repo.save(f);
    }
}