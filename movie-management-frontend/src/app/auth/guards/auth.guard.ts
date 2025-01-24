import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard = (requiredRole?: string) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    // Store the attempted URL for redirection after login
    const currentUrl = router.getCurrentNavigation()?.initialUrl.toString();
    if (currentUrl) {
      sessionStorage.setItem('redirectUrl', currentUrl);
    }
    router.navigate(['/login']);
    return false;
  }

  if (requiredRole) {
    const userRole = authService.getUserRole();
    if (userRole !== requiredRole) {
      router.navigate(['/unauthorized']);
      return false;
    }
  }

  return true;
};