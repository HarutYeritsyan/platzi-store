import { Routes } from '@angular/router';

export default [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    loadComponent: () => import('./pages/home-page/home-page.component').then(m => m.HomePageComponent)
  },
  {
    path: '**',
    redirectTo: 'home'
  }
] as Routes;