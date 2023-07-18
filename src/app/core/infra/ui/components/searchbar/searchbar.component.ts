import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ps-searchbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SearchbarComponent,
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchbarComponent implements ControlValueAccessor {

  @Input() placeholder = 'Buscar...';
  @Input() buttonText = 'Buscar';

  @Output() doSearch = new EventEmitter<string>();

  value = '';

  private onChange?: (value: string) => void
  private onTouched?: () => void

  onSearch() {
    this.doSearch.emit(this.value);
  }

  setInputValue(value: string) {
    this.value = value;
    this.onChange?.(value);
  }

  onInputBlur() {
    this.onTouched?.();
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
