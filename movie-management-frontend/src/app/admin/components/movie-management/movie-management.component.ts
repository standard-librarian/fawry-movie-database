import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MovieDialogComponent } from './movie-dialog.component';

interface Movie {
  id?: number;
  title: string;
  year: number;
  description: string;
  posterUrl: string;
  rating: number;
}

@Component({
  selector: 'app-movie-management',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="container">
      <h1>Movie Management</h1>
      <button mat-raised-button color="primary" (click)="addMovie()">
        <mat-icon>add</mat-icon>
        Add Movie
      </button>

      <table mat-table [dataSource]="movies" class="mat-elevation-z8">
        <ng-container matColumnDef="title">
          <th mat-header-cell *matHeaderCellDef>Title</th>
          <td mat-cell *matCellDef="let movie">{{movie.title}}</td>
        </ng-container>

        <ng-container matColumnDef="year">
          <th mat-header-cell *matHeaderCellDef>Year</th>
          <td mat-cell *matCellDef="let movie">{{movie.year}}</td>
        </ng-container>

        <ng-container matColumnDef="rating">
          <th mat-header-cell *matHeaderCellDef>Rating</th>
          <td mat-cell *matCellDef="let movie">{{movie.rating}}</td>
        </ng-container>

        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Actions</th>
          <td mat-cell *matCellDef="let movie">
            <button mat-icon-button color="primary" (click)="editMovie(movie)">
              <mat-icon>edit</mat-icon>
            </button>
            <button mat-icon-button color="warn" (click)="deleteMovie(movie)">
              <mat-icon>delete</mat-icon>
            </button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
    }

    table {
      width: 100%;
      margin-top: 20px;
    }

    button {
      margin-bottom: 20px;
    }
  `]
})
export class MovieManagementComponent implements OnInit {
  movies: Movie[] = [];
  displayedColumns: string[] = ['title', 'year', 'rating', 'actions'];

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    // TODO: Implement movie service to fetch movies
    // For now, using mock data
    this.movies = [
      { id: 1, title: 'Sample Movie 1', year: 2023, description: 'A sample movie', posterUrl: 'https://example.com/poster1.jpg', rating: 8.5 },
      { id: 2, title: 'Sample Movie 2', year: 2023, description: 'Another sample movie', posterUrl: 'https://example.com/poster2.jpg', rating: 7.5 }
    ];
  }

  addMovie(): void {
    const dialogRef = this.dialog.open(MovieDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // TODO: Implement movie service to add movie
        this.movies.push({ ...result, id: this.movies.length + 1 });
        this.movies = [...this.movies];
      }
    });
  }

  editMovie(movie: Movie): void {
    const dialogRef = this.dialog.open(MovieDialogComponent, {
      width: '500px',
      data: movie
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // TODO: Implement movie service to update movie
        const index = this.movies.findIndex(m => m.id === movie.id);
        this.movies[index] = { ...result, id: movie.id };
        this.movies = [...this.movies];
      }
    });
  }

  deleteMovie(movie: Movie): void {
    // TODO: Implement confirmation dialog
    // TODO: Implement movie service to delete movie
    const index = this.movies.findIndex(m => m.id === movie.id);
    this.movies.splice(index, 1);
    this.movies = [...this.movies];
  }
}