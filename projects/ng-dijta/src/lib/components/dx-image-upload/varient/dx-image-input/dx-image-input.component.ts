import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectorRef, Component, EventEmitter, HostBinding, Inject, Injector, Input, Optional, Output, forwardRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgControl, ValidationErrors, Validator, Validators } from '@angular/forms';
import { AdapterDataModel, DxFileUploadType } from '../../model/dx-image-upload.model';
import {
  UI_COMPONENT_CONFIG,
  UIConfigWrapper,
} from '../../../../core/UI/service/input/ui-component.config';

@Component({
  selector: 'dx-image-input',
  templateUrl: './dx-image-input.component.html',
  styleUrls: ['./dx-image-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DxImageInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DxImageInputComponent),
      multi: true
    }
  ],
})
export class DxImageInputComponent implements ControlValueAccessor, Validator {
  @Output() blur: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  @Input() disabled: boolean = false;
  @Input() noneLabel: boolean = false;
  @Input() viewOnly: boolean = false;
  @Input() readonly: boolean = false;
  @Input() noneBorder: boolean = false;
  @Input() tabIndex:number | undefined;
  @Input() row: number = 2;
  @Input() outline: 'floating' | 'none-floating' | 'outer-label' = 'none-floating';
  @Input() labelPosition: 'left' | 'top' = 'top';
  @Input() uploadBtnTitle: string = "Browse File";
  // To set minimum length of input
  @Input() minLength!: number;

  // To set maximum length of input
  @Input() maxLength!: number;
  // To set outer label error view
  @Input() outerLabelErrorType: 'astrict-error' | 'filled-error' = 'filled-error';
  // Pass tooltips info to input
  @Input() tooltip: string | undefined;
  @Input() placeholder: string | undefined = '';
  @Input() adapterData!: AdapterDataModel;
  /** Max size of selected file in MB. Default: no limit */
  @Input()
  fileMaxSize!: number;
  /** Max count of file in multi-upload. Default: no limit */
  @Input()
  fileMaxCount!: number;
  /** Total Max size limit of all files in MB. Default: no limit */
  @Input()
  totalMaxSize!: number;
  value: string = '';
  @Input() enableAutoUpload: boolean = false;
  @Input() uploadType: DxFileUploadType = 'single';
  @Input() fileTypes: string[] = [];
  // To get required 
  @Input()
  get required(): boolean {
    return this._required ?? this.control?.hasValidator(Validators.required) ?? false;
  }
  // To set required 
  set required(value: BooleanInput) {
    this._required = coerceBooleanProperty(value);
  }
  static nextId = 0;
  @HostBinding()
  id = `dx-input-image-${DxImageInputComponent.nextId++}`;
  protected _required: boolean | undefined;

  control: FormControl = new FormControl();
  ctrRequired: boolean | undefined;

  constructor(
    @Optional() @Inject(UI_COMPONENT_CONFIG) config: UIConfigWrapper,
    public injector: Injector,
    private readonly cd: ChangeDetectorRef) {
  }
  onChange: Function = () => { };
  onTouched: Function = () => { };

  // To bind component with controller
  ngAfterViewInit(): void {
    const ngControl: NgControl | null = this.injector.get(NgControl, null);

    if (ngControl?.control instanceof FormControl) {
      setTimeout(() => {
      this.control = ngControl.control as FormControl;
      this.control?.markAsUntouched();
      this.ctrRequired = this.control?.hasValidator(Validators.required);
      this.cd.detectChanges();
      });
    } else {
      // fallback if not bound to form control
      this.control = new FormControl();
    }
  }

  inputChange(event: string): void {
    this.value = event;
    this.onChange(this.value);
  }

  writeValue(value: string): void {
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
    if (!this.ctrRequired) {
      this.ctrRequired = control.hasValidator(Validators.required);
      this.cd.detectChanges()
      this.cd.detectChanges();
    }
    if (!control.hasValidator(Validators.required)) {
      this.ctrRequired = control.hasValidator(Validators.required);
      this.cd.detectChanges()
      this.cd.detectChanges();
    }
    return null;
  }
}
