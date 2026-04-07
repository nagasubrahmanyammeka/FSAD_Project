package com.project.repo;

import com.project.model.Scheme;
import org.springframework.data.jpa.repository.JpaRepository;


public interface SchemeRepo extends JpaRepository<Scheme, Long> {
	
}