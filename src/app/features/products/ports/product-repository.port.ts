import { Observable } from 'rxjs';
import { Product } from '@features/products/domain/models/product.model';

export interface ProductRepository {
  getProducts(): Observable<Product[]>;
}