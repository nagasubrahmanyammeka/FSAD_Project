package com.project.repo;

import com.project.model.Content;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContentRepo extends JpaRepository<Content, Long> {
}