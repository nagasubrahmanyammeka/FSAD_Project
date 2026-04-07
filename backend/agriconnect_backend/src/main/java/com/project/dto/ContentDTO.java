package com.project.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ContentDTO {
	private Long id;
	private String name;
	private String email;
    private String title;
    private String description;
    private String fileName;
    private String fileType;
    private String filePath;

}
