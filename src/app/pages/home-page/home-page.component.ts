import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchbarComponent } from '@core/infra/ui/components/searchbar/searchbar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'ps-home-page',
  standalone: true,
  imports: [CommonModule, SearchbarComponent],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

  constructor(
    private readonly router: Router
  ) { }

  searchProductsByTitle(title: string) {
    this.router.navigate(['buscador'], {
      queryParams: {
        title
      }
    });
  }
}
