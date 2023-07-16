import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ps-searchbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchbarComponent {

  @Input() searchTerm = '';
  @Output() doSearch = new EventEmitter<string>();

  onSearch(searchText: string) {
    this.doSearch.emit(searchText);
  }
}
