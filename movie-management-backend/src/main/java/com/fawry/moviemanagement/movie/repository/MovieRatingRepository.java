package com.fawry.moviemanagement.movie.repository;

import com.fawry.moviemanagement.auth.model.User;
import com.fawry.moviemanagement.movie.model.Movie;
import com.fawry.moviemanagement.movie.model.MovieRating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MovieRatingRepository extends JpaRepository<MovieRating, Long> {
    Optional<MovieRating> findByUserAndMovie(User user, Movie movie);
    boolean existsByUserAndMovie(User user, Movie movie);
}