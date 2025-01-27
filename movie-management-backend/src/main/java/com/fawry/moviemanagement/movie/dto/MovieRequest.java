package com.fawry.moviemanagement.movie.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MovieRequest {
    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Description is required")
    private String description;

    @NotNull(message = "Release year is required")
    private Integer releaseYear;

    @NotBlank(message = "Genre is required")
    private String genre;

    @NotBlank(message = "Director is required")
    private String director;

    @NotNull(message = "Rating is required")
    private Double rating;
}