package com.project.model;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum Role {
    ADMIN,
    FARMER,
    EXPERT,
    PUBLIC;

    @JsonCreator
    public static Role fromString(String value) {
        return Role.valueOf(value.toUpperCase());
    }
}