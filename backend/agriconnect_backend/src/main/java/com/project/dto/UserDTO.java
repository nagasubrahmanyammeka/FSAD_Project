package com.project.dto;

import com.project.model.Role;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {
    private Long id;
    private String name;
    private String username;
    private String email;
    private String password;
    private Long phone;
    private String location;
    private Role role;


}
