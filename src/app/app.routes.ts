import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./pages/home-page/home-page.component').then(m => m.HomePageComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
] as Routes;