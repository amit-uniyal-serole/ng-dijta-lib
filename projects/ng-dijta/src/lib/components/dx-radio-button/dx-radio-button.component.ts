import { Component, EventEmitter, HostBinding, Input, Optional, Output, Self, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { KeyValueModel } from '../../core/UI/model/keyValue';
import { onRadioChange } from './dx-radio-button.model';

export type DISPLAY_TYPE = 'horizantal' | 'vertical';

@Component({
  selector: 'dx-radio-button',
  templateUrl: './dx-radio-button.component.html',
  styleUrls: ['./dx-radio-button.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DxRadioButtonComponent implements ControlValueAccessor {

  @Input() options!: KeyValueModel[];
  @Input() displayType?: DISPLAY_TYPE;
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() viewOnly: boolean = false;
  @Input() readonly: boolean = false;
  @Output() onRadioChange: EventEmitter<onRadioChange> = new EventEmitter<onRadioChange>();

  value: string = '';

  static nextId = 0;
  @HostBinding()
  id = `dx-input-radio-${DxRadioButtonComponent.nextId++}`;

  onChange: Function = () => { };
  onTouched: Function = () => { };
  constructor(
    @Self() @Optional() public control: NgControl,
  ) {
    this.control && (this.control.valueAccessor = this);
  }
  inputChange(event: string): void {
    this.value = event;
    this.onChange(this.value);
  }

  writeValue(value: string): void {
    this.value = value;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.disabled?.currentValue !== changes?.disabled?.previousValue) {
      if (changes.disabled.currentValue) {
        this.control.control?.disable();
      } else {
        this.control.control?.enable();
      }
    }
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

  onOptionSelect(evt: MatRadioChange): void {
    const payload: onRadioChange = {
      value: evt?.value,
    };
    this.onRadioChange.emit(payload);
  }
}
