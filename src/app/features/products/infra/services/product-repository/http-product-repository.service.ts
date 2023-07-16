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

  private getApiEndpointUrl(endpoint: string) {
    return `${this.config?.env?.platziHttpApiUrl}${endpoint}`;
  }
}