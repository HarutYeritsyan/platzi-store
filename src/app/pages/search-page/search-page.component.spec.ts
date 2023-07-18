import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPageComponent } from './search-page.component';
import { ProductService } from '@features/products/application/usecases/product.service';

import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('SearchPageComponent', () => {
  let component: SearchPageComponent;
  let fixture: ComponentFixture<SearchPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SearchPageComponent],
      providers: [
        {
          provide: ProductService,
          useValue: {
            searchProducts: () => of([]),
            getCategories: () => of([])
          }
        },
        {
          provide: ActivatedRoute,
          useValue:  {
            queryParams: of({
              title: 'prueba'
            })
          }
        }
      ]
    });
    fixture = TestBed.createComponent(SearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
