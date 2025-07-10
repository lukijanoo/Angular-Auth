import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  return authService.currentUser$.pipe(
    take(1),
    map(user => {
      // Check if a user object EXISTS (meaning they are logged in)
      if (user) {
        // If they are logged in, ALLOW access to the private page
        return true;
      }

      // If there is NO user, BLOCK access and redirect to the landing page
      return router.createUrlTree(['/']);
    })
  );
};