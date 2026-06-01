import { Component, EventEmitter, HostBinding, HostListener, Inject, Input, Optional, Output, Self, ViewEncapsulation, } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { InputDatePickerModel } from '../../core';
import { UIConfigWrapper, UI_COMPONENT_CONFIG } from '../../core/UI/service/input/ui-component.config';


@Component({
  selector: 'dx-input-datepicker',
  templateUrl: './dx-input-datepicker.component.html',
  styleUrls: ['./dx-input-datepicker.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DxInputDatePickerComponent<D> implements ControlValueAccessor {
  @Input() maxDate!: Date;
  @Input() minDate!: Date;
  @Input() disabled: boolean = false;
  @Input() noneBorder: boolean = false;
  @Input() required!: boolean;
  @Input() noneLabel: boolean = false;
  @Input() outline: 'floating' | 'none-floating' | 'outer-label' = 'none-floating';
  @Output() onDateChange: EventEmitter<InputDatePickerModel<D>> = new EventEmitter<InputDatePickerModel<D>>();
  @Input() placeholder: string = 'Select Date';
  value: string = '';

  onChange: Function = () => { };
  onTouched: Function = () => { };

  static nextId = 0;
  @HostBinding()
  id = `dx-input-datepicker-${DxInputDatePickerComponent.nextId++}`;

  @HostListener('focusout', ['$event.target'])
  onFocusout() {
    this.onTouched();
  }

  constructor(
    @Self() @Optional() public control: NgControl,
    @Optional() @Inject(UI_COMPONENT_CONFIG) config: UIConfigWrapper
  ) {
    this.control && (this.control.valueAccessor = this);
    this.outline = config?.value?.outline ?? 'none-floating';
  }
  inputChange(event: string): void {
    this.value = event;
    this.onChange(this.value);
    if (this.value && (this.minDate || this.maxDate)) {
      if (!this.isValidDate(new Date(this.value))) {
        this.control.control?.setErrors({ invalid: true });
      } else {
        this.control.control?.setErrors(null);
      }
    }
  }

  writeValue(value: string): void {
    this.onTouched();
    this.value = this.control.value;
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

  dateChange(evtName: string, evt: MatDatepickerInputEvent<D>): void {
    const payload: InputDatePickerModel<D> = {
      name: evtName,
      data: evt,
    };
    this.onDateChange.emit(payload);
  }

  isValidDate(date: Date): boolean {
    try {
      if (date >= this.minDate) {
        return true;
      } else if (date <= this.maxDate) {
        return true;
      } else {
        return false;
      }
    } catch (TypeError) {
      return false;
    }

  }
}
