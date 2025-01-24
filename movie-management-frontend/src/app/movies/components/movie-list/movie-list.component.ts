import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

interface Movie {
  id: number;
  title: string;
  year: number;
  description: string;
  posterUrl: string;
  rating: number;
}

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="container">
      <h1>Movies</h1>
      <div class="movie-grid">
        <mat-card *ngFor="let movie of movies" class="movie-card">
          <img mat-card-image [src]="movie.posterUrl" [alt]="movie.title">
          <mat-card-content>
            <h2>{{movie.title}}</h2>
            <p>{{movie.year}}</p>
            <p class="description">{{movie.description}}</p>
            <div class="rating">
              <mat-icon>star</mat-icon>
              <span>{{movie.rating}}</span>
            </div>
          </mat-card-content>
          <mat-card-actions>
            <button mat-button [routerLink]="['/movies', movie.id]">View Details</button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
    }
    .movie-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 20px;
      padding: 20px;
    }
    .movie-card {
      max-width: 250px;
    }
    .description {
      height: 60px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .rating {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    mat-icon {
      color: #ffd700;
    }
  `]
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];

  constructor() {}

  ngOnInit(): void {
    // TODO: Implement movie service to fetch movies
    this.movies = [
      {
        id: 1,
        title: 'Sample Movie',
        year: 2023,
        description: 'This is a sample movie description that will be replaced with real data from the API.',
        posterUrl: 'https://via.placeholder.com/300x450',
        rating: 4.5
      }
    ];
  }
}