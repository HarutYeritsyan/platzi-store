import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ProductRepository } from '@features/products/ports/product-repository.port';
import { Product, ProductCategory } from '@features/products/domain/models/product.model';
import { CONFIG } from '@core/infra/config/tokens/config.token';
import { Config } from '@core/infra/config/models/config.model';
import { filterObjectAttributes } from '@core/utils/utils';

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

  getProduct(id: string) {
    const url = this.getApiEndpointUrl(`/products/${id}`);
    return this.http.get<Product>(url);
  }

  searchProducts(title: string, filters?: Partial<{
    priceMin: number;
    priceMax: number;
    categoryId: number;
  }>) {
    return this.getProductsByFilters({ title, ...filters });
  }

  private getProductsByFilters(filters: Partial<{
    title: string;
    priceMin: number;
    priceMax: number;
    categoryId: number;
  }>) {
    const url = this.getApiEndpointUrl('/products');
    const definedFilters = filterObjectAttributes(filters, (attribute) => attribute != null);
    return this.http.get<Product[]>(url, { params: definedFilters });
  }

  getCategories() {
    const url = this.getApiEndpointUrl('/categories');
    return this.http.get<ProductCategory[]>(url);
  }

  private getApiEndpointUrl(endpoint: string) {
    return `${this.config?.env?.platziHttpApiUrl}${endpoint}`;
  }
}