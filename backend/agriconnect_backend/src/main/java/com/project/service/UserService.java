package com.project.service;

import com.project.model.Users;
import com.project.repo.UserRepo;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepo repo;

    public UserService(UserRepo repo) {
        this.repo = repo;
    }

    public Users register(Users user) {

        if (repo.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        return repo.save(user);
    }

    public Users login(String email, String password, String role) {

        Users user = repo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Invalid password");
        }

        if (!user.getRole().equals(role)) {
            throw new RuntimeException("Invalid role");
        }

        return user;
    }
}