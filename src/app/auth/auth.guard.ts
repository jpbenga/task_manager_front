import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    if (state.url === '/login') {
      return router.createUrlTree(['/tasks/list']);
    }
    return true;
  }

  return router.createUrlTree(['/login']);
};
