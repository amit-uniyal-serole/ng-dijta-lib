import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputSetting } from '../../interfaces/dx-additional.interface';
@Component({
  selector: 'dx-table-input',
  templateUrl: './dx-table-input.component.html',
  styleUrls: ['./dx-table-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DxTableInputComponent),
      multi: true,
    },
  ],
})
export class DxTableInputComponent<T> implements OnInit, ControlValueAccessor {
  @Input() setting!: InputSetting;
  @Input() key!: string;
  @Output() onUpdate: EventEmitter<void> = new EventEmitter<void>();
  // Step 3: Copy paste this stuff here
  onChange: Function = () => {}
  onTouch: Function = () => {}
  showInput!: boolean;

  ngOnInit(): void {
    if(this.setting?.hidenFields) {
      this.showInput = this.setting?.hidenFields?.some((item: string) => item === this.key)
    }
  }

  registerOnChange(fn: Function): void {
    this.onChange = fn;
    
  }
  registerOnTouched(fn: Function): void {
    this.onTouch = fn;
  }

  // Step 4: Define what should happen in this component, if something changes outside
  input!: string;
  writeValue(input: string) {
    this.input = input;
  }
  change():void {
    this.onUpdate.emit();
  }
}
