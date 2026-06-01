import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  HostListener,
  Inject,
  Injector,
  Input,
  Optional,
  Output,
  Self,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { InputDatePickerModel } from '../../core';
import {
  UIConfigWrapper,
  UI_COMPONENT_CONFIG,
} from '../../core/UI/service/input/ui-component.config';
import { DobValidators } from '../../utils';
import { DobConfig } from './model/dx-input-dob.model';

@Component({
  selector: 'dx-input-dob',
  templateUrl: './dx-input-dob.component.html',
  styleUrls: ['./dx-input-dob.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DxInputDOBComponent),
      multi: true,
    },
  ],
  encapsulation: ViewEncapsulation.None,
})
export class DxInputDOBComponent<D> implements ControlValueAccessor {
  todayDate: Date = new Date();
  @Input() maxDate: Date = this.todayDate;
  @Input() minDate!: Date;
  @Input() disabled = false;
  @Input() noneLabel = false;
  @Input() viewOnly: boolean = false;
  @Input() readonly: boolean = false;
  @Input() outline: 'floating' | 'none-floating' | 'outer-label' =
    'none-floating';
  @Output() onDateChange: EventEmitter<InputDatePickerModel<D>> =
    new EventEmitter<InputDatePickerModel<D>>();
  @Input() placeholder = 'Date of Birth';
  @Input() icon = 'cake';
  @Input() dobConfig!: DobConfig;
  @Input() enableAgeValidator!: boolean;
  value = '';
  @Input() outerLabelErrorType: 'astrict-error' | 'filled-error' = 'filled-error';
  @Input() labelPosition: 'left' | 'top' = 'top';
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

  onChange: Function = () => { };
  onTouched: Function = () => { };

  @HostListener('focusout', ['$event.target'])
  onFocusout() {
    this.onTouched();
  }

  constructor(
    @Optional() @Inject(UI_COMPONENT_CONFIG) config: UIConfigWrapper,
    public injector: Injector,
    private readonly cd: ChangeDetectorRef
  ) {
    this.outline = config?.value?.outline ?? 'none-floating';

  }
  inputChange(event: string): void {
    this.value = event;
    this.onChange(this.value);
    if (this.enableAgeValidator && this.value) {
      this.control?.setErrors(
        DobValidators.AgeValidator(this.value as unknown as Date, this.dobConfig?.error, this.dobConfig?.minAge)
      );
    }
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

  dateChange(evtName: string, evt: MatDatepickerInputEvent<D>): void {
    const payload: InputDatePickerModel<D> = {
      name: evtName,
      data: evt,
    };
    this.onDateChange.emit(payload);
  }
}
