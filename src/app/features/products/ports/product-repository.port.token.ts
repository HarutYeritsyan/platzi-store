import { InjectionToken, inject } from '@angular/core';
import { ProductRepository } from './product-repository.port';
import { HttpProductRepositoryService } from '@features/products/infra/services/product-repository/http-product-repository.service';

export const PRODUCT_REPOSITORY = new InjectionToken<ProductRepository>('ProductRepository', {
  providedIn: 'root',
  factory: () => inject(HttpProductRepositoryService)
})