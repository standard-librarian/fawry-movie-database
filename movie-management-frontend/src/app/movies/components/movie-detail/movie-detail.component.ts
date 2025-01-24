import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
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
  director?: string;
  cast?: string[];
  genre?: string[];
}

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="container" *ngIf="movie; else loading">
      <mat-card class="movie-detail-card">
        <div class="content-wrapper">
          <div class="poster-section">
            <img [src]="movie.posterUrl" [alt]="movie.title">
          </div>
          <div class="info-section">
            <mat-card-header>
              <mat-card-title>{{movie.title}}</mat-card-title>
              <mat-card-subtitle>{{movie.year}}</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <div class="rating">
                <mat-icon>star</mat-icon>
                <span>{{movie.rating}}</span>
              </div>
              <p class="description">{{movie.description}}</p>
              <div *ngIf="movie.director" class="detail-item">
                <strong>Director:</strong> {{movie.director}}
              </div>
              <div *ngIf="movie.cast?.length" class="detail-item">
                <strong>Cast:</strong> {{movie.cast?.join(', ')}}
              </div>
              <div *ngIf="movie.genre?.length" class="detail-item">
                <strong>Genres:</strong> {{movie.genre?.join(', ')}}
              </div>
            </mat-card-content>
            <mat-card-actions>
              <button mat-button (click)="goBack()">Back to Movies</button>
            </mat-card-actions>
          </div>
        </div>
      </mat-card>
    </div>
    <ng-template #loading>
      <div class="loading-container">
        <mat-spinner></mat-spinner>
      </div>
    </ng-template>
  `,
  styles: [`
    .container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .movie-detail-card {
      padding: 20px;
    }
    .content-wrapper {
      display: flex;
      gap: 30px;
    }
    .poster-section img {
      max-width: 300px;
      border-radius: 8px;
    }
    .info-section {
      flex: 1;
    }
    .rating {
      display: flex;
      align-items: center;
      gap: 5px;
      margin: 10px 0;
    }
    mat-icon {
      color: #ffd700;
    }
    .description {
      margin: 20px 0;
      line-height: 1.6;
    }
    .detail-item {
      margin: 10px 0;
    }
    .loading-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 400px;
    }
    @media (max-width: 768px) {
      .content-wrapper {
        flex-direction: column;
      }
      .poster-section img {
        max-width: 100%;
      }
    }
  `]
})
export class MovieDetailComponent implements OnInit {
  movie: Movie | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // TODO: Implement movie service to fetch movie details
    const movieId = this.route.snapshot.paramMap.get('id');
    // Simulated data
    this.movie = {
      id: 1,
      title: 'Sample Movie',
      year: 2023,
      description: 'This is a detailed description of the movie that will be replaced with real data from the API. It includes information about the plot, critical reception, and other interesting facts about the movie.',
      posterUrl: 'https://via.placeholder.com/300x450',
      rating: 4.5,
      director: 'John Doe',
      cast: ['Actor 1', 'Actor 2', 'Actor 3'],
      genre: ['Action', 'Adventure', 'Sci-Fi']
    };
  }

  goBack(): void {
    window.history.back();
  }
}