import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, catchError, combineLatest, filter, map, of, switchMap } from 'rxjs';
import { Product } from '@features/products/domain/models/product.model';
import { ProductService } from '@features/products/application/usecases/product.service';
import { SearchbarComponent } from '@core/infra/ui/components/searchbar/searchbar.component';
import { ActivatedRoute, Router } from '@angular/router';

interface VM {
  products: {
    data?: Product[];
    error?: unknown;
  };
}

@Component({
  selector: 'ps-search-page',
  standalone: true,
  imports: [CommonModule, SearchbarComponent],
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  vm$?: Observable<VM>;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.vm$ = combineLatest({
      products: this.getSearchedProductsByTitle()
    });
  }

  searchProductsByTitle(title: string) {
    this.router.navigate(['buscador'], {
      queryParams: {
        title
      }
    });
  }

  getSearchedProductsByTitle() {
    return this.getSearchTerm().pipe(
      filter(title => !!title?.length),
      switchMap(title => this.getProductsWithCompletionStatus(title))
    );
  }

  getSearchTerm() {
    return this.route.queryParams.pipe(
      map(params => params?.['title'] as string)
    );
  }

  private getProductsWithCompletionStatus(title: string) {
    return this.productService.getProductsByTitle(title).pipe(
      map(data => ({ data })),
      catchError(error =>  of({ error }))
    );
  }
}
