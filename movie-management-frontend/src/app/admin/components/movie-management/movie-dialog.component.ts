import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

interface Movie {
  id?: number;
  title: string;
  year: number;
  description: string;
  posterUrl: string;
  rating: number;
}

@Component({
  selector: 'app-movie-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <h2 mat-dialog-title>{{data ? 'Edit' : 'Add'}} Movie</h2>
    <mat-dialog-content>
      <form [formGroup]="movieForm">
        <mat-form-field appearance="outline">
          <mat-label>Title</mat-label>
          <input matInput formControlName="title" placeholder="Enter movie title">
          <mat-error *ngIf="movieForm.get('title')?.hasError('required')">
            Title is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Year</mat-label>
          <input matInput type="number" formControlName="year" placeholder="Enter release year">
          <mat-error *ngIf="movieForm.get('year')?.hasError('required')">
            Year is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Description</mat-label>
          <textarea matInput formControlName="description" placeholder="Enter movie description"></textarea>
          <mat-error *ngIf="movieForm.get('description')?.hasError('required')">
            Description is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Poster URL</mat-label>
          <input matInput formControlName="posterUrl" placeholder="Enter poster URL">
          <mat-error *ngIf="movieForm.get('posterUrl')?.hasError('required')">
            Poster URL is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Rating</mat-label>
          <input matInput type="number" formControlName="rating" placeholder="Enter rating (0-10)">
          <mat-error *ngIf="movieForm.get('rating')?.hasError('required')">
            Rating is required
          </mat-error>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-raised-button color="primary" (click)="onSubmit()" [disabled]="movieForm.invalid">
        {{data ? 'Update' : 'Add'}}
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    form {
      display: flex;
      flex-direction: column;
      gap: 16px;
      min-width: 400px;
      padding: 16px 0;
    }

    mat-form-field {
      width: 100%;
    }

    textarea {
      min-height: 100px;
    }
  `]
})
export class MovieDialogComponent {
  movieForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<MovieDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Movie | null
  ) {
    this.movieForm = this.fb.group({
      title: [data?.title || '', Validators.required],
      year: [data?.year || new Date().getFullYear(), Validators.required],
      description: [data?.description || '', Validators.required],
      posterUrl: [data?.posterUrl || '', Validators.required],
      rating: [data?.rating || 0, [Validators.required, Validators.min(0), Validators.max(10)]]
    });
  }

  onSubmit(): void {
    if (this.movieForm.valid) {
      this.dialogRef.close(this.movieForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}