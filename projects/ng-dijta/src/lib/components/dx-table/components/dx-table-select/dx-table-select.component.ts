import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { KeyValueModel } from '../../../../core/UI/model/keyValue';
import { Observable } from 'rxjs';

@Component({
  selector: 'dx-table-select',
  templateUrl: './dx-table-select.component.html',
  styleUrls: ['./dx-table-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DxTableSelectComponent),
      multi: true,
    },
  ],
})
export class DxTableSelectComponent implements ControlValueAccessor {
  selectedValue: any;
  @Input() options!: Observable<KeyValueModel[]>; // Dropdown options

  // Function to call when the value changes
  private onChange: (value: any) => void = () => { };

  // Function to call when the input is touched
  private onTouched: () => void = () => { };

  // Register the function to call when the control's value changes
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // Register the function to call when the control is touched
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // Write a new value to the element
  writeValue(value: any): void {
    this.selectedValue = value;
  }

  // Set the disabled state
  setDisabledState?(isDisabled: boolean): void {
    // Handle disabling the dropdown if needed
  }

  // Handle value change from the dropdown
  onSelectionChange(value: any) {
    this.selectedValue = value;
    this.onChange(value);  // Notify Angular Forms of the value change
    this.onTouched();      // Notify Angular Forms that the control is touched
  }
}
