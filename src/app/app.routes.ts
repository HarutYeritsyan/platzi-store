import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./pages/home-page/home-page.component').then(m => m.HomePageComponent)
  },
  {
    path: 'buscador',
    loadComponent: () => import('./pages/search-page/search-page.component').then(m => m.SearchPageComponent)
  },
  {
    path: 'productos/:id',
    loadComponent: () => import('./pages/product-page/product-page.component').then(m => m.ProductPageComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
] as Routes;