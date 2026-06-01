import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  OnInit,
  Component,
  EventEmitter,
  Inject,
  Input,
  LOCALE_ID,
  Optional,
  Output,
  Self,
  ViewEncapsulation,
  HostBinding
} from '@angular/core';
import { ControlValueAccessor, NgControl, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import {
  UIConfigWrapper,
  UI_COMPONENT_CONFIG
} from '../../core/UI/service/input/ui-component.config';

@Component({
  selector: 'dx-input-chips',
  templateUrl: './dx-input-chips.component.html',
  styleUrls: ['./dx-input-chips.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DxInputChipsComponent
  implements OnInit, ControlValueAccessor {
  @Output() blur: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() noneLabel: boolean = false;
  @Input() noneBorder: boolean = false;

  @Input() outline: 'floating' | 'none-floating' | 'outer-label' = 'none-floating';
  @Input() addOnBlur = true;
  @Input() visible = true;
  @Input() selectable = true;
  @Input() removable = true;
  chips: string[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  onChange: Function = () => { };
  onTouched: Function = () => { };

  static nextId = 0;
  @HostBinding()
  id = `dx-input-chips-${DxInputChipsComponent.nextId++}`;
  constructor(
    @Self() @Optional() public control: NgControl,
    @Optional() @Inject(UI_COMPONENT_CONFIG) config: UIConfigWrapper,
    @Optional() @Inject(LOCALE_ID) public locale: string,
  ) {
    this.control && (this.control.valueAccessor = this);
    this.outline = config?.value?.outline ?? 'none-floating';
  }

  ngOnInit(): void {
    this.control.control?.addValidators(Validators.pattern(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/))
    this.control.control?.updateValueAndValidity();
    if (this.control.control?.invalid) {
      this.control.control?.markAsTouched();
    }
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our chips
    if ((value || '').trim()) {
      this.chips.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: string): void {
    const index = this.chips.indexOf(fruit);

    if (index >= 0) {
      this.chips.splice(index, 1);
    }
  }

  inputChange(event: string[]): void {
    this.chips = event;
    this.onChange(this.chips);
  }

  writeValue(value: string[]): void {
    this.onTouched();
    this.chips = this.control.value;
    this.chips = value;
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

  onBlur(value: FocusEvent): void {
    this.blur.emit(value);
    if (this.onTouched) {
      this.onTouched(value);
    }
  }

}
