import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  HostBinding,
  Injector,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NgControl,
  ValidationErrors,
  Validator,
  Validators
} from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'dx-checkbox',
  templateUrl: './dx-checkbox.component.html',
  styleUrls: ['./dx-checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DxCheckboxComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DxCheckboxComponent),
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.None,
})
export class DxCheckboxComponent implements ControlValueAccessor, Validator {
  static nextId = 0;

  @HostBinding()
  @Input() id = `dx-checkbox-${DxCheckboxComponent.nextId++}`;

  @Output() onInputChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() blur: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();

  @Input() readonly = false;
  @Input() viewOnly = false;
  @Input() tabIndex: number | undefined;
  /**
   * Placement of the projected `<dx-label>` relative to the checkbox box.
   * `left` and `right` map to Material's `labelPosition="before|after"`;
   * `top` stacks the label above the checkbox using a flex column.
   * @default 'right'
   */
  @Input() labelPosition: 'left' | 'right' | 'top' = 'right';

  /** Maps the public `labelPosition` to Material's `labelPosition` token. */
  get matLabelPosition(): 'before' | 'after' {
    return this.labelPosition === 'left' ? 'before' : 'after';
  }

  value: boolean = false;

  // Form control instance
  control: FormControl = new FormControl();

  private _inputDisabled = false;
  private _formControlDisabled = false;

  @Input()
  set disabled(value: boolean) {
    this._inputDisabled = coerceBooleanProperty(value);
    this.cd.detectChanges();
  }
  get disabled(): boolean {
    return this._inputDisabled || this._formControlDisabled;
  }

  @Input()
  get required(): boolean {
    return this._required ?? false;
  }
  set required(value: BooleanInput) {
    this._required = coerceBooleanProperty(value);
  }
  protected _required: boolean | undefined;

  ctrRequired: boolean | undefined;

  onChange: Function = () => {};
  onTouched: Function = () => {};

  constructor(
    private readonly cd: ChangeDetectorRef,
    public injector: Injector
  ) {}

  ngAfterViewInit(): void {
    const ngControl: NgControl | null = this.injector.get(NgControl, null);
    if (ngControl) {
      setTimeout(() => {
        this.control = ngControl.control as FormControl;
        this._formControlDisabled = this.control.disabled;
        this.ctrRequired = this.control.hasValidator(Validators.required);
        this.cd.detectChanges();
      });
    }
  }

  inputChange(event: boolean): void {
    this.value = event;
    this.onChange(this.value);
  }

  onInputChangeEvent(event: MatCheckboxChange): void {
    this.onInputChange.emit(event.checked);
    this.inputChange(event.checked);
  }

  writeValue(value: boolean): void {
    this.value = value;
    this.cd.detectChanges();
  }

  registerOnChange(fn: Function): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._formControlDisabled = isDisabled;
    this.cd.detectChanges();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (!this.ctrRequired) {
      this.ctrRequired = control.hasValidator(Validators.required);
      this.cd.detectChanges();
    }
    return null;
  }
}
