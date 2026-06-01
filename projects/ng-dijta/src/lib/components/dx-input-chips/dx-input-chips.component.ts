import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  LOCALE_ID,
  Optional,
  Output,
  ViewEncapsulation,
  Injector,
  ChangeDetectorRef,
  forwardRef,
  HostBinding
} from '@angular/core';
import { ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import {
  UIConfigWrapper,
  UI_COMPONENT_CONFIG
} from '../../core/UI/service/input/ui-component.config';

@Component({
  selector: 'dx-input-chips',
  templateUrl: './dx-input-chips.component.html',
  styleUrls: ['./dx-input-chips.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DxInputChipsComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DxInputChipsComponent),
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.None,
})
export class DxInputChipsComponent
  implements ControlValueAccessor {
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
  @Input() currencyFormat: "wide" | "narrow" = "narrow";
  @Input() currencyPosition: "left" | "right" = "left";
  @Input() readonly: boolean = false;
  @Input() viewOnly: boolean = false;
  @Input() outerLabelErrorType: 'astrict-error' | 'filled-error' = 'filled-error';
  @Input() labelPosition: 'left' | 'top' = 'top';
  chips: string[] = [];
  @Input() noErrorSpace: boolean = false;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  onChange: Function = () => { };
  onTouched: Function = () => { };

  static nextId = 0;
  @HostBinding()
  id = `dx-input-chips-${DxInputChipsComponent.nextId++}`;
  constructor(
    @Optional() @Inject(UI_COMPONENT_CONFIG) config: UIConfigWrapper,
    @Optional() @Inject(LOCALE_ID) public locale: string,
    public injector: Injector,
    private readonly cd: ChangeDetectorRef
  ) {
    this.outline = config?.value?.outline ?? 'none-floating';
  }


  add(event: MatChipInputEvent): void {
    this.chips.push(event.value);

    // Clear the input value
    // event.chipInput!.clear();
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
