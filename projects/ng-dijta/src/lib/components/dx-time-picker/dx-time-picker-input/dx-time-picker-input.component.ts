import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectorRef, Component, EventEmitter, HostBinding, Inject, Injector, Input, Optional, Output, TemplateRef, forwardRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgControl, ValidationErrors, Validator, Validators } from '@angular/forms';
import { UIConfigWrapper, UI_COMPONENT_CONFIG } from '../../../core/UI/service/input/ui-component.config';
import { ClockMode } from '../interfaces-and-types';
import moment from 'moment';
@Component({
  selector: 'dx-time-picker-input',
  templateUrl: './dx-time-picker-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DxTimePickerInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DxTimePickerInputComponent),
      multi: true
    }
  ],
})
export class DxTimePickerInputComponent implements ControlValueAccessor, Validator {
  @Output() blur: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  @Input() disabled: boolean = false;
  @Input() noneLabel: boolean = false;
  @Input() viewOnly: boolean = false;
  @Input() readonly: boolean = false;
  @Input() outline: 'floating' | 'none-floating' | 'outer-label' = 'none-floating';
  @Input() labelPosition: 'left' | 'top' = 'top';

  /* Use a custom template for the ok button */
  @Input()
  okButtonTemplate: TemplateRef<DxTimePickerInputComponent> | null = null;
  /* Use a custom template for the cancel button */
  @Input()
  cancelButtonTemplate: TemplateRef<DxTimePickerInputComponent> | null =
    null;

  /** Override the label of the ok button. */
  @Input() okLabel = 'Ok';
  /** Override the label of the cancel button. */
  @Input() cancelLabel = 'Cancel';
  /** Override the ante meridiem abbreviation. */
  @Input() anteMeridiemAbbreviation = 'am';
  /** Override the post meridiem abbreviation. */
  @Input() postMeridiemAbbreviation = 'pm';

  /** Sets the clock mode, 12-hour or 24-hour clocks are supported. */
  @Input() mode: ClockMode = '12h';
  @Input() color = 'primary';
  @Input() disableDialogOpenOnClick = true;
  @Input() strict = true;
  _minDate: Date | undefined;
  @Input() get minDate() {
    return this._minDate
  };

  set minDate(date: any) {
    if (date) {
      const hrs = date?.split(':')[0];
      this._minDate = moment().hours(Number(hrs)).toDate()
    }
  }
  @Input() maxDate!: Date;


  // To set outer label error view
  @Input() outerLabelErrorType: 'astrict-error' | 'filled-error' = 'filled-error';
  // Pass tooltips info to input
  @Input() tooltip: string | undefined;

  value: Date | undefined;

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

  control: FormControl = new FormControl();

  static nextId = 0;
  @HostBinding()
  id = `dx-input-timepicker-${DxTimePickerInputComponent.nextId++}`;

  constructor(
    @Optional() @Inject(UI_COMPONENT_CONFIG) config: UIConfigWrapper,
    public injector: Injector,
    private readonly cd: ChangeDetectorRef) {
    this.outline = config?.value?.outline ?? 'none-floating';
  }
  onChange: Function = () => { };
  onTouched: Function = () => { };

  // To bind component with controller
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

  inputChange(event: Date): void {
    this.value = event;
    this.onChange(moment(event).format('HH:mm:ss'));
  }

  writeValue(value: string): void {
    if (value) {
      let [hours, minutes, seconds] = value.split(':').map(Number);
      this.value = moment().set({
        hours: hours,
        minutes: minutes,
        seconds: seconds
      }).toDate()

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
    if (this.required) {
      control.setValidators([Validators.required]);
      control.updateValueAndValidity();
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
