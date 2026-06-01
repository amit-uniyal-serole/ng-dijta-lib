import { Component, EventEmitter, HostBinding, Input, Optional, Output, Self, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'dx-checkbox',
  templateUrl: './dx-checkbox.component.html',
  styleUrls: ['./dx-checkbox.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DxCheckboxComponent implements ControlValueAccessor {

  static nextId = 0;
  @HostBinding()
  @Input() id = `dx-checkbox-${DxCheckboxComponent.nextId++}`;
  @Output() onInputChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() blur: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() viewOnly: boolean = false;
  @Input() tabIndex: number | undefined;
  value: boolean = false;

  onChange: Function = () => { };
  onTouched: Function = () => { };

  constructor(
    @Self() @Optional() public control: NgControl,
  ) {
    this.control && (this.control.valueAccessor = this);
  }

  inputChange(event: boolean): void {
    this.value = event;
    this.onChange(this.value);
  }

  onInputChangeEvent(event: MatCheckboxChange): void {
    this.onInputChange.emit(event.checked)
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