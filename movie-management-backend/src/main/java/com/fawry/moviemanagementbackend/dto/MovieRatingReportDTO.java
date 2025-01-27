package com.fawry.moviemanagementbackend.dto;

import lombok.Data;

@Data
public class MovieRatingReportDTO {
    private String movieTitle;
    private Double rating;
    private String genre;
    private Integer releaseYear;
    private String director;
    
    // Default constructor
    public MovieRatingReportDTO() {}
    
    // All-args constructor
    public MovieRatingReportDTO(String movieTitle, Double rating, String genre, Integer releaseYear, String director) {
        this.movieTitle = movieTitle;
        this.rating = rating;
        this.genre = genre;
        this.releaseYear = releaseYear;
        this.director = director;
    }
}