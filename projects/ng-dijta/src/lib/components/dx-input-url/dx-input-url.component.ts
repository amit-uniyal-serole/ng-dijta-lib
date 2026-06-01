import { BooleanInput, coerceBooleanProperty } from "@angular/cdk/coercion";
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
  ViewEncapsulation,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  Validators,
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidationErrors,
  FormControl,
  NgControl,
} from '@angular/forms';
import { KeyValueModel } from '../../core/UI/model/keyValue';

import {
  UIConfigWrapper,
  UI_COMPONENT_CONFIG,
} from '../../core/UI/service/input/ui-component.config';

@Component({
  selector: "dx-input-url",
  template: `
    <div
      class="ngdx-field-wrapper"
      [class.none-label]="noneLabel"
      [ngClass]="outline"
      [class.display-view]="viewOnly"
      [class.dx-disable]="disabled"
      [class.left-align-label]="labelPosition === 'left'"
      [class.required]="required || ctrRequired" 
      [class]="outerLabelErrorType">
      <mat-label class="dx-outer-label" *ngIf="outline === 'outer-label'">
        <span class="dx-outer-label d-flex align-items-center">
          <ng-content select="[dxLabel]"></ng-content>
          <span *ngIf="required || ctrRequired" class="astrict">*</span>
        </span>
      </mat-label>
      <mat-form-field appearance="outline" floatLabel="always">
        <mat-label *ngIf="outline !== 'outer-label'" class="dx-input-label">
            <ng-content select="dx-label"></ng-content>
        </mat-label>
        <span matPrefix>
        <span class="material-icons">
        link
        </span>
          <ng-content select="dx-prefix"></ng-content>
        </span>
        <input
            dxNoLeadingTrailingSpaces
            type="url"
            matInput
            dxUrlValidator
            [custom]="customUrlValidation"
            [ngModel]="value"
             [tabIndex]="tabIndex"
            (ngModelChange)="inputChange($event)"
            (blur)="onBlur($event)"
            [readonly]="readonly || viewOnly || disabled"
            [minlength]="minLength"
            [maxlength]="maxLength"
            [placeholder]="tooltip"
            ngDefaultControl
            [required]="required || ctrRequired"
            [id]="id"
            [formControl]="control"
          />
        <span matSuffix>
          <ng-content select="dx-suffix"></ng-content>
        </span>
        <mat-hint>
          <ng-content select="dx-hint"> </ng-content>
        </mat-hint>
        <mat-error>
          <ng-content select="dx-error"></ng-content>          
          <span *ngIf="control?.errors?.['NoleadingTrailingSpaces'];else inValidUrlRef" class="space-error">{{ 'Please remove any extra spaces from the start or end of your URL.' }}</span>
          <ng-template #inValidUrlRef>
            <span *ngIf="control?.errors?.urlInvalid">URL Invalid</span>  
          </ng-template>
        </mat-error>
      </mat-form-field>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DxInputUrlComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DxInputUrlComponent),
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.None,
})
export class DxInputUrlComponent implements ControlValueAccessor, Validator {

  @Output() onClickOption: EventEmitter<KeyValueModel> =
    new EventEmitter<KeyValueModel>();
  @Output() blur: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  @Input() disabled: boolean = false;
  @Input() noneLabel: boolean = false;
  @Input() mask: string = "";
  @Input() outline: "floating" | "none-floating" | "outer-label" =
    "none-floating";
  @Input() readonly: boolean = false;
  @Input() viewOnly: boolean = false;
  @Input() outerLabelErrorType: 'astrict-error' | 'filled-error' = 'filled-error';
  @Input() tabIndex!: number;
  @Input() customUrlValidation = false;
  // Pass tooltips info to input
  @Input() tooltip: string | undefined;
  ctrRequired: boolean | undefined;
  static nextId = 0;
  @HostBinding()
  id = `dx-input-url-${DxInputUrlComponent.nextId++}`;

  // To set minimum length of input
  @Input() minLength!: number;

  // To set maximum length of input
  @Input() maxLength!: number;
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

  control: FormControl = new FormControl();

  @Input() value: string | undefined;
  @Input() labelPosition: 'left' | 'top' = 'top';
  @HostListener("focusout", ["$event.target"]) onFocusout() {
    this.onTouched();
  }

  onChange: Function = () => { };
  onTouched: Function = () => { };

  constructor(
    @Optional() @Inject(UI_COMPONENT_CONFIG) config: UIConfigWrapper,
    @Inject(LOCALE_ID) public locale: string,
    public injector: Injector,
    private readonly cd: ChangeDetectorRef
  ) {
    this.outline = config?.value?.outline ?? "none-floating";
  }

  // To bind component with controller
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

  ngOnInit() {
    if (this.minLength) {
      this.control?.addValidators(Validators.minLength(this.minLength));
    }
    if (this.maxLength) {
      this.control?.addValidators(Validators.maxLength(this.maxLength));
    }
    this.control?.updateValueAndValidity();
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

  onBlur(value: FocusEvent): void {
    this.blur.emit(value);
    if (this.onTouched) {
      this.onTouched(value);
    }
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
