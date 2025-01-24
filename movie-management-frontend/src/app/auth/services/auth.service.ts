import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private tokenKey = 'auth_token';

  constructor() {
    this.loadStoredUser();
  }

  private loadStoredUser(): void {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      const user = this.parseJwt(token);
      this.currentUserSubject.next(user);
    }
  }

  login(email: string, password: string): Observable<AuthResponse> {
    // Mock response for testing
    const mockResponse: AuthResponse = {
      token: 'mock-jwt-token',
      user: {
        id: '1',
        email: email,
        role: email.includes('admin') ? 'ADMIN' : 'USER'
      }
    };

    return of(mockResponse).pipe(
      delay(1000),
      tap(response => {
        localStorage.setItem(this.tokenKey, response.token);
        this.currentUserSubject.next(response.user);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getUserRole(): string {
    const user = this.currentUserSubject.value;
    return user?.role || '';
  }

  private parseJwt(token: string): any {
    try {
      // For mock purposes, just return a basic user object
      return {
        id: '1',
        email: 'user@example.com',
        role: 'USER'
      };
    } catch (e) {
      return null;
    }
  }
}