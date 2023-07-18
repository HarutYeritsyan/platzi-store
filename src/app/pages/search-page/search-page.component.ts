import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, combineLatest, map, switchMap, tap } from 'rxjs';
import { Product, ProductCategory } from '@features/products/domain/models/product.model';
import { ProductService } from '@features/products/application/usecases/product.service';
import { SearchbarComponent } from '@core/infra/ui/components/searchbar/searchbar.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataWithCompletionStatus, withCompletionStatus } from '@core/utils/rxjs-utils';

interface VM {
  products: DataWithCompletionStatus<Product[]>;
  availableCategoriesForFilter: DataWithCompletionStatus<ProductCategory[]>;
}

@Component({
  selector: 'ps-search-page',
  standalone: true,
  imports: [CommonModule, SearchbarComponent, RouterModule, FormsModule],
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  vm$?: Observable<VM>;

  searchText = '';
  selectedCategoryIdForFilter?: number;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.vm$ = combineLatest({
      products: this.getSearchedProducts(),
      availableCategoriesForFilter: withCompletionStatus(this.productService.getCategories())
    });
  }

  searchProducts() {
    this.updateSearchQueryParams();
  }

  private updateSearchQueryParams() {
    this.router.navigate(['buscador'], {
      queryParams: {
        title: this.searchText,
        categoryId: this.selectedCategoryIdForFilter
      }
    });
  }

  private getSearchedProducts() {
    return this.getSearchTermAndFiltersFromQueryParams().pipe(
      switchMap(searchParams => withCompletionStatus(this.productService.searchProducts(searchParams.title, { categoryId: searchParams.categoryId })))
    );
  }

  private getSearchTermAndFiltersFromQueryParams() {
    return this.route.queryParams.pipe(
      map(params => {
        const parsedCategoryIdQueryParam = parseInt(params?.['categoryId'] as string);
        return {
          title: params?.['title'] as string,
          categoryId: isNaN(parsedCategoryIdQueryParam) ? undefined : parsedCategoryIdQueryParam,
        };
      }),
      tap(params => {
        this.searchText = params?.title;
        this.selectedCategoryIdForFilter = params?.categoryId;
      })
    );
  }
}
