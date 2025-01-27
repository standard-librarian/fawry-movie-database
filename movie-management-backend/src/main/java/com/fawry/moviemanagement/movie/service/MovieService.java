package com.fawry.moviemanagement.movie.service;

import com.fawry.moviemanagement.movie.dto.MovieRequest;
import com.fawry.moviemanagement.movie.dto.MovieResponse;
import com.fawry.moviemanagement.movie.model.Movie;
import com.fawry.moviemanagement.movie.repository.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MovieService {
    private final MovieRepository movieRepository;

    public Page<MovieResponse> getAllMovies(Pageable pageable) {
        return movieRepository.findAll(pageable)
            .map(this::mapToMovieResponse);
    }

    public MovieResponse getMovieById(Long id) {
        Movie movie = movieRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Movie not found"));
        return mapToMovieResponse(movie);
    }

    public MovieResponse createMovie(MovieRequest request) {
        Movie movie = new Movie();
        movie.setTitle(request.getTitle());
        movie.setDescription(request.getDescription());
        movie.setYear(request.getReleaseYear());
        movie.getGenre().add(request.getGenre());
        movie.setDirector(request.getDirector());
        movie.setAverageRating(request.getRating());

        Movie savedMovie = movieRepository.save(movie);
        return mapToMovieResponse(savedMovie);
    }

    public MovieResponse updateMovie(Long id, MovieRequest request) {
        Movie movie = movieRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Movie not found"));

        movie.setTitle(request.getTitle());
        movie.setDescription(request.getDescription());
        movie.setYear(request.getReleaseYear());
        movie.getGenre().clear();
        movie.getGenre().add(request.getGenre());
        movie.setDirector(request.getDirector());
        movie.setAverageRating(request.getRating());

        Movie updatedMovie = movieRepository.save(movie);
        return mapToMovieResponse(updatedMovie);
    }

    public void deleteMovie(Long id) {
        if (!movieRepository.existsById(id)) {
            throw new RuntimeException("Movie not found");
        }
        movieRepository.deleteById(id);
    }

    private MovieResponse mapToMovieResponse(Movie movie) {
        return new MovieResponse(
            movie.getId(),
            movie.getTitle(),
            movie.getDescription(),
            movie.getYear(),
            movie.getGenre().isEmpty() ? null : movie.getGenre().get(0),
            movie.getDirector(),
            movie.getAverageRating()
        );
    }
}