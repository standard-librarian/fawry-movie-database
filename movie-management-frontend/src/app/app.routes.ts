import { Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { authGuard } from './auth/guards/auth.guard';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/services/auth.service';

export const routes: Routes = [
  { 
    path: 'login',
    component: LoginComponent,
    canActivate: [() => {
      const auth = inject(AuthService);
      const router = inject(Router);
      
      if (auth.isAuthenticated()) {
        const role = auth.getUserRole();
        if (role === 'ADMIN') {
          router.navigate(['/admin']);
        } else {
          router.navigate(['/movies']);
        }
        return false;
      }
      return true;
    }]
  },
  { 
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [() => authGuard('ADMIN')]
  },
  { 
    path: 'movies',
    loadChildren: () => import('./movies/movies.module').then(m => m.MoviesModule),
    canActivate: [() => authGuard()]
  },
  { 
    path: '', 
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { 
    path: '**', 
    redirectTo: '/login'
  }
];
