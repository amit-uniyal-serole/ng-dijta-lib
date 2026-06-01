import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Inject,
  Injector,
  Input,
  LOCALE_ID,
  OnChanges,
  OnInit,
  Optional,
  Output,
  SimpleChanges,
  ViewEncapsulation,
  forwardRef
} from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgControl, ValidationErrors, Validator, Validators } from '@angular/forms';
import {
  UIConfigWrapper,
  UI_COMPONENT_CONFIG
} from '../../core/UI/service/input/ui-component.config';

@Component({
  selector: 'dx-number',
  templateUrl: './dx-number.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DxNumberComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DxNumberComponent),
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.None,
})

export class DxNumberComponent
  implements OnInit, OnChanges, ControlValueAccessor, Validator {
  @Output() blur: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  @Input() disabled: boolean = false;
  @Input() noneLabel: boolean = false;
  @Input() viewOnly: boolean = false;
  @Input() readonly: boolean = false;
  @Input() noneBorder: boolean = false;
  @Input() mask: string = '';
  @Input() outline: 'floating' | 'none-floating' | 'outer-label' = 'none-floating';
  @Input() placeholder: string = 'Number';
  @Input() pattern!: string;
  @Input() labelPosition: 'left' | 'top' = 'top';
  control: FormControl = new FormControl();
  @Input() outerLabelErrorType: 'astrict-error' | 'filled-error' = 'filled-error';
  @Input() precision = 0;
  @Input() tabIndex:number | undefined;
  // Pass tooltips info to input
  @Input() tooltip: string | undefined;
  static nextId = 0;
  @HostBinding()
  @Input() id = `dx-input-number-${DxNumberComponent.nextId++}`;
  // To set minimum length of input
  @Input() minLength!: number;

  // To set maximum length of input
  @Input() maxLength!: number;

  @Input() seprater = false;

  // To get required 
  @Input()
  get required(): boolean {
    return this._required ?? this.control?.hasValidator(Validators.required) ?? false;
  }
  // To set required 
  set required(value: BooleanInput) {
    this._required = coerceBooleanProperty(value);
  }
  protected _required: boolean | undefined;

  value = '';
  standard = true;
  precisionVal: string | number | undefined;
  currencyLetters = Object.entries({ K: 1000, M: Math.pow(10, 6), B: Math.pow(10, 9), T: Math.pow(10, 12), Q: Math.pow(10, 15) })

  @HostListener('focusout', ['$event.target'])
  onFocusout() {
    this.onTouched();
  }

  onChange: Function = () => { };
  onTouched: Function = () => { };
  constructor(
    @Optional() @Inject(UI_COMPONENT_CONFIG) config: UIConfigWrapper,
    @Optional() @Inject(LOCALE_ID) public locale: string,
    public injector: Injector,
    private readonly cd: ChangeDetectorRef,
  ) {
    this.outline = config?.value?.outline ?? 'none-floating';
  }

  ngOnInit(): void {
    this.control?.addValidators(Validators.pattern(/^[KMTQ0-9]\d*(\.\d+)?$/));
    if (this.minLength) {
      this.control?.addValidators(Validators.minLength(this.minLength));
    }
    if (this.maxLength) {
      this.control?.addValidators(Validators.maxLength(this.maxLength));
    }
    this.control?.updateValueAndValidity();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.disabled?.currentValue !== changes?.disabled?.previousValue) {
      if (changes.disabled.currentValue) {
        this.control?.disable();
      } else {
        this.control?.enable();
      }
    }
  }

  ngAfterViewInit(): void {
    const ngControl: NgControl = this.injector.get(NgControl);
    if (ngControl) {
      setTimeout(() => {
        this.control = ngControl.control as FormControl;
        this.control.markAsUntouched();
        this.precisionVal = this.control.value;
        this.required =
          this.required ?? this.control.hasValidator(Validators.required);
        this.cd.detectChanges();
      });
    }
  }

  get invalid(): boolean {
    return !!this.control.invalid;
  }

  get showError(): boolean {
    if (!this.control) {
      return false;
    }

    const { dirty, touched } = this.control;

    return this.invalid ? (dirty || touched)! : false;
  }

  inputChange(event: string): void {
    this.value = event;
    this.onChange(this.value);
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

  onBlur(value: FocusEvent): void {
    this.blur.emit(value);
    if (this.onTouched) {
      this.onTouched(value);
    }
  }
  validate(control: AbstractControl): ValidationErrors | null {
    if (!this.required) {
      this.required = control.hasValidator(Validators.required);
      this.cd.detectChanges();
    }
    if (!control.hasValidator(Validators.required)) {
      this.required = control.hasValidator(Validators.required);
      this.cd.detectChanges();
    }
    return null;
  }

}
