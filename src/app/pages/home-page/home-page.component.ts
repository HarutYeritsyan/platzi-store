import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '@features/products/domain/models/product.model';
import { ProductService } from '@features/products/application/usecases/product.service';
import { Observable, catchError, combineLatest, map, of } from 'rxjs';

interface VM {
  products: { data?: Product[]; error?: unknown; }
}

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  vm$?: Observable<VM>;

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.vm$ = combineLatest({
      products: this.getProductsWithErrorStatus()
    });
  }

  private getProductsWithErrorStatus() {
    return this.productService.getProducts().pipe(
      map(data => ({ data })),
      catchError(error =>  of({ error }))
    )
  }
}
