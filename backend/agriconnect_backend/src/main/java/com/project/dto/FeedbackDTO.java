package com.project.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FeedbackDTO {
	private Long id;
    private String name;
    private String email;
    private String message;

}
