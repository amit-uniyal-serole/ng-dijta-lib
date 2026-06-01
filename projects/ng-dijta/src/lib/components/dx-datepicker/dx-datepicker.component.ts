import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectorRef, Component, EventEmitter, forwardRef, HostBinding, HostListener, Inject, Injector, Input, Optional, Output, Self, ViewEncapsulation, } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, NG_VALUE_ACCESSOR, Validators, NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';
import { Moment } from 'moment';
import { DateDefault } from '../../core/UI/constant/currency-default';
import { UIConfigWrapper, UI_COMPONENT_CONFIG } from '../../core/UI/service/input/ui-component.config';
import { DatePickerModel } from './datepicker.model';


@Component({
  selector: 'dx-datepicker',
  templateUrl: './dx-datepicker.component.html',
  styleUrls: ['./dx-datepicker.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DxDatepickerComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DxDatepickerComponent),
      multi: true
    }
  ],
})
export class DxDatepickerComponent<D> implements ControlValueAccessor, Validator {
  @Input() maxDate!: Date;
  @Input() minDate!: Date;
  @Input() disabled: boolean = false;
  @Input() noneLabel: boolean = false;
  @Input() viewOnly: boolean = false;
  @Input() readonly: boolean = false;
  @Input() outline: 'floating' | 'none-floating' | 'outer-label' = 'none-floating';
  @Input() labelPosition: 'left' | 'top' = 'top';
  @Input() tabIndex:number | undefined;
  @Output() onDateChange: EventEmitter<DatePickerModel<D>> = new EventEmitter<DatePickerModel<D>>();
  control: FormControl = new FormControl();
  @Input() outerLabelErrorType: 'astrict-error' | 'filled-error' = 'filled-error';
  @Input() noneBorder: boolean = false;
  // Pass tooltips info to input
  @Input() tooltip: string | undefined;
  static nextId = 0;
  @HostBinding()
  @Input() id = `dx-input-date-${DxDatepickerComponent.nextId++}`;
  value: Date | undefined;
  format: string = 'YYYY/MM/DD';
  onChange: Function = () => { };
  onTouched: Function = () => { };

  // To get required 
  @Input()
  get required(): boolean {
    return this._required ?? false;
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
    @Optional()
    @Inject(UI_COMPONENT_CONFIG) config: UIConfigWrapper,
    public injector: Injector,
    private readonly cd: ChangeDetectorRef,
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
  writeValue(value: Date): void {
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
  dataChange(event: Moment) {
    this.onChange(event);
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
