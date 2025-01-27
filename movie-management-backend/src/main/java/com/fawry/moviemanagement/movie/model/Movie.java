package com.fawry.moviemanagement.movie.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "movies")
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 255)
    private String title;

    private Integer year;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Size(max = 255)
    private String posterUrl;

    @Size(max = 100)
    private String director;

    @ElementCollection
    private List<String> cast = new ArrayList<>();

    @ElementCollection
    private List<String> genre = new ArrayList<>();

    private String imdbId;

    @Column(name = "average_rating")
    private Double averageRating = 0.0;

    @Column(name = "total_ratings")
    private Integer totalRatings = 0;

    public Movie(String title, Integer year, String description, String posterUrl) {
        this.title = title;
        this.year = year;
        this.description = description;
        this.posterUrl = posterUrl;
    }
}