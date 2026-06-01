import { Component, EventEmitter, forwardRef, HostBinding, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'dx-toggle',
  templateUrl: './dx-toggle.component.html',
  styleUrls: ['./dx-toggle.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DxToggleComponent),
      multi: true,
    },
  ],
  encapsulation: ViewEncapsulation.None
})
export class DxToggleComponent implements ControlValueAccessor {

  @Output() blur: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() labelTouchSensitive: boolean = true;
  @Input() tabIndex!: number;
  value: boolean = false;
  @Input() labelPosition: 'before' | 'after' = 'after';
  static nextId = 0;
  @HostBinding()
  @Input() id = `dx-toggle-${DxToggleComponent.nextId++}`;

  onChange: Function = () => { };
  onTouched: Function = () => { };
  checked = false;

  inputChange(event: boolean): void {
    this.value = event;
    this.onChange(this.value);
  }

  writeValue(value: boolean): void {
    this.value = value;
  }

  registerOnChange(fn: Function): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
