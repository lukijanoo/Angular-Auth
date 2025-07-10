import { Routes } from '@angular/router';
import { authRedirectGuard } from './guards/auth-redirect-guard';
import { authGuard } from './guards/auth-guard';

export const appRoutes: Routes = [
  {
    path: '',
    canActivate: [authRedirectGuard],
    loadComponent: () => import('./components/landing/landing.component').then(m => m.LandingComponent)
  },
  {
    path: 'login',
    canActivate: [authRedirectGuard],
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'sign-up',
    canActivate: [authRedirectGuard],
    loadComponent: () => import('./components/sign-up/sign-up.component').then(m => m.SignUpComponent)
  },
  {
    path: 'home',
    canActivate: [authGuard],
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent),
  },
];