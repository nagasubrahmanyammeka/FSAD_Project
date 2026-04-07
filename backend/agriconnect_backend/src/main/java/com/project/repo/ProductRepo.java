package com.project.repo;

import com.project.model.Product;
import com.project.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductRepo extends JpaRepository<Product, Long> {
    
}