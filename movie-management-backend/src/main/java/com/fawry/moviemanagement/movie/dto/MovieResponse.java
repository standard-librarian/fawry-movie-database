package com.fawry.moviemanagement.movie.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MovieResponse {
    private Long id;
    private String title;
    private String description;
    private Integer releaseYear;
    private String genre;
    private String director;
    private Double rating;
}