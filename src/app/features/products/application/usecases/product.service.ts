import { Inject, Injectable } from '@angular/core';
import { PRODUCT_REPOSITORY } from '@features/products/ports/product-repository.port.token';
import { ProductRepository } from '@features/products/ports/product-repository.port';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  constructor(
    @Inject(PRODUCT_REPOSITORY) private readonly productRepository: ProductRepository
  ) { }

  getProducts() {
    return this.productRepository.getProducts();
  }
}