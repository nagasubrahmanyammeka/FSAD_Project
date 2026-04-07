package com.project.repo;

import com.project.model.Guidance;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GuidanceRepo extends JpaRepository<Guidance, Long> {
}