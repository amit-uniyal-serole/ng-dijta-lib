import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  HostBinding,
  HostListener,
  Inject,
  Injector,
  Input,
  LOCALE_ID,
  Optional,
  Output,
  Self,
  ViewEncapsulation,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NgControl,
  NG_VALUE_ACCESSOR,
  Validators,
  Validator,
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
} from '@angular/forms';
import { Moment } from 'moment';
import { DateDefault } from '../../core/UI/constant/currency-default';
import {
  UIConfigWrapper,
  UI_COMPONENT_CONFIG,
} from '../../core/UI/service/input/ui-component.config';
import { DatePickerModel } from './daterange.model';

@Component({
  selector: 'dx-daterange',
  templateUrl: './dx-daterange.component.html',
  styleUrls: ['./dx-daterange.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DxDaterangeComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DxDaterangeComponent),
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.None,
})
export class DxDaterangeComponent<D> implements ControlValueAccessor, Validator {
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  @Input() maxDate!: Date;
  @Input() minDate!: Date;
  @Input() disabled = false;
  @Input() viewOnly: boolean = false;
  @Input() readonly: boolean = false;
  @Input() noneLabel = false;
  @Input() noneBorder: boolean = false;
  @Input() outline: 'floating' | 'none-floating' | 'outer-label' = 'none-floating';
  static nextId = 0;
  @HostBinding()
  id = `dx-input-daterange-${DxDaterangeComponent.nextId++}`;
  @Output() onDateChange: EventEmitter<DatePickerModel<D>> = new EventEmitter<
    DatePickerModel<D>
  >();

  onChange: Function = () => { };
  onTouched: Function = () => { };
  format: string = 'YYYY/MM/DD';

  control: FormControl = new FormControl();
  @Input() outerLabelErrorType: 'astrict-error' | 'filled-error' = 'filled-error';

  @Input() startDateRequird: boolean | undefined;
  @Input() endDateRequird: boolean | undefined;

  @Input()
  get required(): boolean {
    return this._required ?? this.control?.hasValidator(Validators.required) ?? false;
  }
  // To set required 
  set required(value: BooleanInput) {
    this._required = coerceBooleanProperty(value);
  }
  protected _required: boolean | undefined;
  ctrRequired: boolean | undefined;

  @HostListener('focusout', ['$event.target'])
  onFocusout() {
    this.onTouched();
  }

  constructor(
    @Optional() @Inject(LOCALE_ID) public locale: string,
    public injector: Injector,
    private readonly cd: ChangeDetectorRef,
    @Optional() @Inject(UI_COMPONENT_CONFIG) config: UIConfigWrapper
  ) {
    this.outline = config?.value?.outline ?? 'none-floating';
    this.format = `${config?.value?.dateFormat ?? DateDefault.DEFAULT_DATE_PICKER_FORMAT}`;
  }

  ngAfterViewInit(): void {
    const ngControl: NgControl = this.injector.get(NgControl);
    if (ngControl) {
      setTimeout(() => {
        this.control = ngControl.control as FormControl;
        this.control.markAsUntouched();
        this.ctrRequired = this.control.hasValidator(Validators.required);
        this.cd.detectChanges();
      });
    }
  }
  inputChange(event: string): void {
    this.onChange(this.range.value);
  }
  inputChangeEnd(event: string): void {
    this.onChange(this.range.value);
  }

  setRequiredValidation(isRequired: boolean): void {
    if (isRequired) {
      this.range.controls['start'].setValidators(Validators.required);
      this.range.controls['end'].setValidators(Validators.required);
    } else {
      this.range.controls['start'].setValidators(null);
      this.range.controls['end'].setValidators(null);
    }
    this.range.controls['start'].updateValueAndValidity();
    this.range.controls['end'].updateValueAndValidity();
  }
  writeValue(value: any): void {
    if (value) {
      this.range.patchValue(value);
    }
  }

  registerOnChange(fn: (value: any) => void) {
    this.range.valueChanges.subscribe(fn);
    this.onChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  dateChange(): void {

    const origin = this.range.value;

    if (origin.start) {

      this.range.patchValue({
        start: this.makeDateFromStart(origin.start instanceof Date ? origin.start : (origin.start as Moment).toDate()),
      });
    }
    if (origin.end) {
      this.range.patchValue({
        end: this.makeDateFromEnd(origin.end instanceof Date ? origin.end : (origin.end as Moment).toDate())
      });
    }

    this.writeValue(this.range.value);
  }

  private makeDateFromStart(date: Date): Date {
    return date;
  }
  private makeDateFromEnd(date: Date): Date {
    if (date) {
      const origin = date;
      origin.setHours(11);
      origin.setMinutes(59);
      origin.setSeconds(59);
    }
    return date;
  }
  validate(control: AbstractControl): ValidationErrors | null {
    if (!this.ctrRequired) {
      this.ctrRequired = control.hasValidator(Validators.required);
      this.cd.detectChanges();
    }
    if (!control.hasValidator(Validators.required)) {
      this.ctrRequired = control.hasValidator(Validators.required);
      this.cd.detectChanges();
    }
    return null;
  }
}
