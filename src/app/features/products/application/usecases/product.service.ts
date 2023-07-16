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

  getProductsByTitle(title: string) {
    return this.productRepository.getProductsByTitle(title);
  }

  getProductsByPriceRange(priceMin?: number, priceMax?: number) {
    return this.productRepository.getProductsByPriceRange(priceMin, priceMax);
  }

  getProductsByCategoryId(categoryId: string) {
    return this.productRepository.getProductsByCategoryId(categoryId);
  }

  getProduct(id: string) {
    return this.productRepository.getProduct(id);
  }
}