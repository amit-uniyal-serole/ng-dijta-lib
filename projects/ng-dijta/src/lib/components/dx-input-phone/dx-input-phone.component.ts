import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectorRef, Component, EventEmitter, HostBinding, Inject, Injector, Input, LOCALE_ID, OnChanges, Optional, Output, SimpleChanges, ViewEncapsulation, forwardRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgControl, ValidationErrors, Validator, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UIConfigWrapper, UI_COMPONENT_CONFIG } from '../../core/UI/service/input/ui-component.config';
import { Country } from './phone-contact/model/country.model';
import { PhoneNumberFormat } from './phone-contact/model/phone-number-format.model';


@Component({
  selector: 'dx-input-phone',
  templateUrl: './dx-input-phone.component.html',
  styleUrls: ['./dx-input-phone.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DxInputPhoneComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DxInputPhoneComponent),
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.None,
})
export class DxInputPhoneComponent implements ControlValueAccessor, OnChanges, Validator {
  @Output() blur: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  @Input() disabled: boolean = false;
  @Input() noneLabel: boolean = false;
  @Input() viewOnly: boolean = false;
  @Input() readonly: boolean = false;
  @Input() outline: 'floating' | 'none-floating' | 'outer-label' = 'none-floating';
  value: string = '';
  @Input() outerLabelErrorType: 'astrict-error' | 'filled-error' = 'filled-error';
  @Input() noneBorder: boolean = false;
  @Input() preferredCountries: Array<string> = [];
  @Input() enablePlaceholder = true;
  @Input() inputPlaceholder: string | undefined;
  @Input() cssClass: string | undefined;
  @Input() name: string | undefined;
  @Input() onlyCountries: Array<string> = [];
  @Input() errorStateMatcher: ErrorStateMatcher = new ErrorStateMatcher();
  @Input() enableSearch = false;
  @Input() searchPlaceholder: string | undefined;
  @Input() describedBy = '';
  @Input() errorMessage = '';
  @Input() invalidErrorMessage: string | undefined;
  @Input() tabIndex: number | undefined;
  static nextId = 0;
  @HostBinding()
  @Input() id = `dx-input-phone-${DxInputPhoneComponent.nextId++}`;

  @Output() countryChanged = new EventEmitter<Country>();

  private _format: PhoneNumberFormat = 'default';
  @Input()
  get format(): PhoneNumberFormat {
    return this._format;
  }

  set format(value: PhoneNumberFormat) {
    this._format = value;
  }



  // Pass tooltips info to input
  @Input() tooltip: string | undefined;

  @Input()
  get required(): boolean {
    return this._required ?? this.control?.hasValidator(Validators.required) ?? false;
  }
  // To set required 
  set required(value: BooleanInput) {
    this._required = coerceBooleanProperty(value);
  }
  protected _required: boolean | undefined;
  @Input() labelPosition: 'left' | 'top' = 'top';
  control: FormControl = new FormControl();
  constructor(
    @Optional() @Inject(UI_COMPONENT_CONFIG) public config: UIConfigWrapper,
    @Inject(LOCALE_ID) public locale: string,
    public injector: Injector,
    private readonly cd: ChangeDetectorRef
  ) {
    this.outline = config?.value?.outline ?? 'none-floating';
  }
  onChange: Function = () => { };
  onTouched: Function = () => { };

  inputChange(event: string): void {
    this.value = event;
    this.onChange(this.value);
  }

  ngAfterViewInit(): void {
    const ngControl: NgControl = this.injector.get(NgControl);
    if (ngControl) {
      setTimeout(() => {
        this.control = ngControl.control as FormControl;
        this.control.markAsUntouched();
        this.required =
          this.required ?? this.control.hasValidator(Validators.required);
        this.cd.detectChanges();
      });
    }
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
  writeValue(value: string | number): void {
    if (value) {
      if (typeof (value) === 'string') {
        this.value = value?.toString()?.includes('+') ? value : '+' + value?.toString();
      }
      if (typeof (value) === 'number') {
        this.value = '+' + value?.toString()
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

  onCountryChanged(event: Country | undefined): void {
    this.countryChanged.emit(event);
  }

}