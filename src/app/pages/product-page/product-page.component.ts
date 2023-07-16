import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '@features/products/domain/models/product.model';
import { Observable, catchError, combineLatest, filter, map, of, switchMap } from 'rxjs';
import { ProductService } from '../../features/products/application/usecases/product.service';
import { ActivatedRoute } from '@angular/router';

interface VM {
  product: {
    data?: Product,
    error?: unknown
  }
}

@Component({
  selector: 'ps-product-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  vm$?: Observable<VM>;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.vm$ = combineLatest({
      product: this.getProductDetail()
    });
  }

  private getProductDetail() {
    return this.getProductId().pipe(
      map(id => id ?? ''),
      filter(id => !!id),
      switchMap(id => this.getProductDetailWithCompletionStatus(id))
    );
  }

  private getProductId() {
    return this.route.paramMap.pipe(
      map(paramMap => paramMap.get('id'))
    );
  }

  private getProductDetailWithCompletionStatus(id: string) {
    return this.productService.getProduct(id).pipe(
      map(data => ({ data })),
      catchError(error => of({ error }))
    );
  }
}
