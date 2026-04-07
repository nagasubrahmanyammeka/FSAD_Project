package com.project.repo;

import com.project.model.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedbackRepo extends JpaRepository<Feedback, Long> {

    // ❌ REMOVE THIS (CAUSE OF ERROR)
    // List<Feedback> findByEmail(String email);

}