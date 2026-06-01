import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectorRef, Component, EventEmitter, forwardRef, HostBinding, HostListener, Inject, Input, Optional, Output, ViewChild, ViewEncapsulation, } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators, AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DateDefault } from '../../core/UI/constant/currency-default';
import { UIConfigWrapper, UI_COMPONENT_CONFIG } from '../../core/UI/service/input/ui-component.config';
import { DatetimePickerModel } from './datetime-picker.model';
import { NgxMatDatetimepicker } from '../../core/datetime-picker';


@Component({
  selector: 'dx-datetime-picker',
  templateUrl: './dx-datetime-picker.component.html',
  styleUrls: ['./dx-datetime-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DxDatetimePickerComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DxDatetimePickerComponent),
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.None
})
export class DxDatetimePickerComponent<D> implements ControlValueAccessor, Validator {
  @ViewChild('picker') toPicker!: NgxMatDatetimepicker<Date>;

  @Input() date!: Date;
  @Input() showSpinners = true;
  @Input() showSeconds = false;
  @Input() touchUi = false;
  @Input() enableMeridian = true;
  @Input() minDate!: Date;
  @Input() maxDate!: Date;
  @Input() stepHour = 1;
  @Input() stepMinute = 1;
  @Input() stepSecond = 1;
  @Input() color: ThemePalette = 'primary';
  @Input() disabled: boolean = false;
  @Input() noneLabel: boolean = false;
  @Input() viewOnly: boolean = false;
  @Input() readonly: boolean = false;
  @Input() outline: 'floating' | 'none-floating' | 'outer-label' = 'none-floating';
  @Output() onDateChange: EventEmitter<DatetimePickerModel<D>> = new EventEmitter<DatetimePickerModel<D>>();
  @Input() defaultTime = [];
  @Input() tabIndex:number | undefined;
  @Input() startAt!: Date;
  @Input() labelPosition: 'left' | 'top' = 'top';
  static nextId = 0;
  @HostBinding()
  id = `dx-input-datetime-${DxDatetimePickerComponent.nextId++}`;
  value: string = '';
  format: string = 'YYYY/MM/DD  hh:mm:ss';
  onChange: Function = () => { };
  onTouched: Function = () => { };
  control: FormControl = new FormControl();
  @Input() outerLabelErrorType: 'astrict-error' | 'filled-error' = 'filled-error';
  ctrRequired: boolean | undefined;

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

  @HostListener('focusout', ['$event.target'])
  onFocusout() {
    this.onTouched();
  }

  constructor(
    private readonly cd: ChangeDetectorRef,
    @Optional() @Inject(UI_COMPONENT_CONFIG) config: UIConfigWrapper
  ) {
    this.outline = config?.value?.outline ?? 'none-floating';
    this.format = `${config?.value?.dateFormat ?? DateDefault.DEFAULT_DATE_PICKER_FORMAT} ${config?.value?.timeFormat ?? DateDefault.DEFAULT_TIME_PICKER_FORMAT}`;
  }
  ngAfterViewInit(): void {
    if (this.startAt) {
      this.toPicker.startAt = this.startAt;
    }
  }

  inputChange(event: string): void {
    this.value = event;
    this.onChange(this.value);
  }

  writeValue(value: string): void {
    this.onTouched();
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
    const payload: DatetimePickerModel<D> = {
      name: evtName,
      data: evt,
    };
    this.onDateChange.emit(payload);
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
