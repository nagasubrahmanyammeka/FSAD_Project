package com.project.controller;

import com.project.model.Users;
import com.project.repo.UserRepo;
import com.project.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("http://localhost:5173")
public class AuthController {

    @Autowired
    private UserService service;

    @Autowired
    private UserRepo userRepo;

    // ✅ REGISTER
    @PostMapping("/register")
    public Users register(@RequestBody Users user) {
        return service.register(user);
    }

    // ✅ LOGIN (FIXED)
    @PostMapping("/login")
    public Users login(@RequestBody Users loginData) {

        Optional<Users> userOpt = userRepo.findByUsername(loginData.getUsername());

        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        Users user = userOpt.get();

        // ✅ PASSWORD CHECK (safe)
        if (user.getPassword() == null ||
            loginData.getPassword() == null ||
            !user.getPassword().trim().equals(loginData.getPassword().trim())) {
            throw new RuntimeException("Invalid password");
        }

        // ✅ ROLE CHECK (FIXED - NO CASE ISSUES)
        if (user.getRole() == null ||
        	    loginData.getRole() == null ||
        	    user.getRole() != loginData.getRole()) {
        	    throw new RuntimeException("Invalid role");
        	}

        return user;
    }
}