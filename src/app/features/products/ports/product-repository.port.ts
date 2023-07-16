import { Observable } from 'rxjs';
import { Product } from '@features/products/domain/models/product.model';

export interface ProductRepository {
  getProducts(): Observable<Product[]>;
  getProductsByTitle(title: string): Observable<Product[]>;
  getProductsByPriceRange(priceMin?: number, priceMax?: number): Observable<Product[]>;
  getProductsByCategoryId(categoryId: string): Observable<Product[]>;
  getProduct(id: string): Observable<Product>;
}