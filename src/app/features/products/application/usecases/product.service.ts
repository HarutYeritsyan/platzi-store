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

  searchProductsByTitle(title: string) {
    return this.productRepository.searchProducts(title);
  }

  searchProducts(title: string, filters?: {
    categoryId?: number;
    priceMin?: number;
    priceMax?: number;
  }) {
    return this.productRepository.searchProducts(title, filters);
  }

  getProduct(id: string) {
    return this.productRepository.getProduct(id);
  }

  getCategories() {
    return this.productRepository.getCategories();
  }
}