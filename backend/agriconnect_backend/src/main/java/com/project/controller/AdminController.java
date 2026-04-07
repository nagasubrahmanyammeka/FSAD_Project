package com.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import com.project.model.Users;
import com.project.repo.UserRepo;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin("http://localhost:5173")
@Tag(name = "Admin User Management", description = "Endpoints for managing system users by administrators")
public class AdminController {

    @Autowired
    private UserRepo userRepo;

    @Operation(summary = "Get all users", description = "Retrieves a list of all registered users in the database")
    @GetMapping("/users")
    public List<Users> getAllUsers() {
        return userRepo.findAll();
    }

    @Operation(summary = "Delete user", description = "Removes a user from the database by their unique ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "User successfully deleted"),
        @ApiResponse(responseCode = "404", description = "User not found")
    })
    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable Long id) {
        userRepo.deleteById(id);
    }

    @Operation(summary = "Update user details", description = "Updates the profile information of an existing user")
    @PutMapping("/users/{id}")
    public Users updateUser(@PathVariable Long id, @RequestBody Users updatedUser) {
        Users user = userRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setName(updatedUser.getName());
        user.setUsername(updatedUser.getUsername());
        user.setEmail(updatedUser.getEmail());
        user.setPhone(updatedUser.getPhone());
        user.setLocation(updatedUser.getLocation());
        user.setRole(updatedUser.getRole());

        return userRepo.save(user);
    }
}