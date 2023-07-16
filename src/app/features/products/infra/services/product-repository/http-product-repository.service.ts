import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductRepository } from '@features/products/ports/product-repository.port';
import { Product } from '@features/products/domain/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class HttpProductRepositoryService implements ProductRepository {

  private static readonly API_URL = 'https://api.escuelajs.co/api/v1';
  
  constructor(
    private http: HttpClient
  ) { }

  getProducts() {
    const url = this.getApiEndpointUrl('/products');
    return this.http.get<Product[]>(url);
  }

  private getApiEndpointUrl(endpoint: string) {
    return `${HttpProductRepositoryService.API_URL}${endpoint}`;
  }
}