import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

export const authRedirectGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  return authService.currentUser$.pipe(
    take(1),
    map(user => {
      // Check if a user object EXISTS (meaning they are logged in)
      if (user) {
        // If they are logged in, BLOCK access and redirect to '/home'
        return router.createUrlTree(['/home']);
      }

      // If there is NO user, ALLOW access to the public page
      return true;
    })
  );
};