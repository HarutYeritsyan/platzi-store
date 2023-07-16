import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ProductRepository } from '@features/products/ports/product-repository.port';
import { Product } from '@features/products/domain/models/product.model';
import { CONFIG } from '@core/infra/config/tokens/config.token';
import { Config } from '@core/infra/config/models/config.model';

@Injectable({
  providedIn: 'root'
})
export class HttpProductRepositoryService implements ProductRepository {
  
  constructor(
    @Inject(CONFIG) private readonly config: Config,
    private http: HttpClient
  ) { }

  getProducts() {
    const url = this.getApiEndpointUrl('/products');
    return this.http.get<Product[]>(url);
  }

  getProductsByTitle(title: string) {
    return this.getProductsByFilters({ title });
  }

  getProductsByPriceRange(priceMin?: number, priceMax?: number) {
    return this.getProductsByFilters({ priceMin, priceMax });
  }

  getProductsByCategoryId(categoryId: string) {
    return this.getProductsByFilters({ categoryId });
  }

  getProduct(id: string) {
    const url = this.getApiEndpointUrl(`/products/${id}`);
    return this.http.get<Product>(url);
  }

  private getProductsByFilters(filters: Partial<{
    title: string;
    priceMin: number;
    priceMax: number;
    categoryId: string;
  }>) {
    const url = this.getApiEndpointUrl('/products');
    return this.http.get<Product[]>(url, { params: filters });
  }

  private getApiEndpointUrl(endpoint: string) {
    return `${this.config?.env?.platziHttpApiUrl}${endpoint}`;
  }
}